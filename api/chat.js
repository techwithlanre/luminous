function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

async function postJson(url, apiKey, body) {
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  const text = await r.text().catch(() => '');
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch (e) {}
  return { ok: r.ok, status: r.status, text, json: parsed };
}

async function deepseekChatCompletion(params) {
  const { apiKey, model, messages, temperature, topP, maxTokens } = params;
  const baseUrl = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, '');
  const endpoints = [`${baseUrl}/chat/completions`, `${baseUrl}/v1/chat/completions`];

  const body = {
    model,
    messages,
    temperature,
    top_p: topP,
    max_tokens: maxTokens,
    stream: false,
  };

  let last = null;
  for (const url of endpoints) {
    const r = await postJson(url, apiKey, body);
    last = { url, ...r };
    if (r.ok) return last;
    if (r.status !== 404) break;
  }
  return last;
}

export default async function handler(req, res) {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!DEEPSEEK_API_KEY) {
    return json(res, 500, { error: 'Server is missing DEEPSEEK_API_KEY' });
  }

  let payload;
  try {
    const raw = await readBody(req);
    payload = raw ? JSON.parse(raw) : {};
  } catch (e) {
    return json(res, 400, { error: 'Invalid JSON' });
  }

  const messages = Array.isArray(payload?.messages) ? payload.messages : [];
  const context = typeof payload?.context === 'string' ? payload.context : '';
  const pageUrl = typeof payload?.pageUrl === 'string' ? payload.pageUrl : '';

  const lastUser = [...messages].reverse().find((m) => m && m.role === 'user' && typeof m.content === 'string');
  if (!lastUser?.content) {
    return json(res, 400, { error: 'Missing user message' });
  }

  const systemInstruction =
    `You are Cloudom Systems AI Support.\n` +
    `Speak naturally, like a helpful support rep.\n` +
    `Never mention "context", "prompt", "system", "policy", or "instructions".\n` +
    `Do not say "based on the provided context" or similar.\n` +
    `Use only the information provided in the COMPANY INFO below.\n` +
    `If the answer is not in COMPANY INFO, say you’re not sure and suggest contacting hello@cloudomsystems.com.\n` +
    `Do not use Markdown formatting (no **bold**, no headings). Use plain text.\n` +
    `When listing items, use simple bullets like "•". Keep lines short.\n` +
    `When giving instructions, provide steps.\n` +
    (pageUrl ? `Current page URL: ${pageUrl}\n` : '') +
    (context ? `\nCOMPANY INFO:\n${context}\n` : '');

  const history = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({
      role: m.role,
      content: String(m.content),
    }));

  try {
    const model = (process.env.DEEPSEEK_MODEL || 'deepseek-chat').trim();
    const r = await deepseekChatCompletion({
      apiKey: DEEPSEEK_API_KEY,
      model,
      messages: [{ role: 'system', content: systemInstruction }, ...history],
      temperature: 0.4,
      topP: 0.9,
      maxTokens: 600,
    });

    if (!r || !r.ok) {
      const details = r?.json || r?.text || '';
      return json(res, 502, { error: 'Upstream error', details: JSON.stringify(details).slice(0, 2000) });
    }

    const text = r?.json?.choices?.[0]?.message?.content;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return json(res, 502, { error: 'Empty model response' });
    }

    return json(res, 200, { text: text.trim() });
  } catch (e) {
    return json(res, 502, { error: 'Request failed' });
  }
}
