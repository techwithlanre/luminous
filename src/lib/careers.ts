type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

export type CareerJob = {
  id: string;
  number: number;
  title: string;
  state: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
  url: string;
  bodyMarkdown: string;
  bodyHtml?: string | null;
  labels: string[];
  applyUrl?: string | null;
  location?: string | null;
  employmentType?: string | null;
};

export function getCareersRepo(): string | null {
  const repo = (import.meta as any).env?.VITE_CAREERS_GITHUB_REPO as string | undefined;
  if (!repo) return null;
  return repo.trim() || null;
}

export function getCareersDefaultApplyUrl(): string | null {
  const url = (import.meta as any).env?.VITE_CAREERS_APPLY_URL as string | undefined;
  if (!url) return null;
  return url.trim() || null;
}

function readCache<T>(key: string, ttlMs: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; value: T };
    if (!parsed?.ts || typeof parsed.ts !== 'number') return null;
    if (Date.now() - parsed.ts > ttlMs) return null;
    return parsed.value ?? null;
  } catch (e) {
    return null;
  }
}

function writeCache<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), value }));
  } catch (e) {}
}

function parseApplyUrl(bodyMarkdown: string): string | null {
  const m = bodyMarkdown.match(/^\s*(?:Apply|Apply here|Application)\s*:\s*(\S+)\s*$/im);
  if (!m?.[1]) return null;
  const val = m[1].trim();
  if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('mailto:')) return val;
  return null;
}

function parseLocation(bodyMarkdown: string): string | null {
  const m = bodyMarkdown.match(/^\s*(?:Location)\s*:\s*(.+)\s*$/im);
  return m?.[1]?.trim() || null;
}

function parseEmploymentType(bodyMarkdown: string): string | null {
  const m = bodyMarkdown.match(/^\s*(?:Type|Employment Type)\s*:\s*(.+)\s*$/im);
  return m?.[1]?.trim() || null;
}

function normalizeIssueState(state: unknown): CareerJob['state'] {
  return String(state).toLowerCase() === 'closed' ? 'closed' : 'open';
}

async function githubRequest<T>(url: string, accept: string): Promise<T> {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: accept,
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub request failed (${res.status})`);
  }

  return (await res.json()) as T;
}

export async function getCareerJobs(params: {
  repo: string;
  cacheTtlMs?: number;
}): Promise<CareerJob[]> {
  const cacheTtlMs = params.cacheTtlMs ?? 5 * 60 * 1000;
  const cacheKey = `careers_jobs_${params.repo}`;
  const cached = readCache<CareerJob[]>(cacheKey, cacheTtlMs);
  if (cached) return cached;

  const [owner, name] = params.repo.split('/');
  if (!owner || !name) throw new Error('Invalid careers repo');

  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/issues?state=open&labels=job&per_page=100&sort=created&direction=desc`;
  const issues = await githubRequest<any[]>(url, 'application/vnd.github.v3.html+json');

  const jobs: CareerJob[] = issues
    .filter((it) => it && !it.pull_request)
    .map((it) => {
      const bodyMarkdown = String(it.body ?? '');
      const applyUrl = parseApplyUrl(bodyMarkdown) || getCareersDefaultApplyUrl();
      const labels = Array.isArray(it.labels)
        ? it.labels
            .map((l: any) => (typeof l === 'string' ? l : l?.name))
            .filter(Boolean)
            .map((s: any) => String(s))
        : [];

      return {
        id: String(it.id),
        number: Number(it.number),
        title: String(it.title ?? ''),
        state: normalizeIssueState(it.state),
        createdAt: String(it.created_at ?? ''),
        updatedAt: String(it.updated_at ?? ''),
        url: String(it.html_url ?? ''),
        bodyMarkdown,
        bodyHtml: it.body_html ? String(it.body_html) : null,
        labels,
        applyUrl,
        location: parseLocation(bodyMarkdown),
        employmentType: parseEmploymentType(bodyMarkdown),
      };
    })
    .filter((j) => j.title && j.number);

  writeCache(cacheKey, jobs);
  return jobs;
}

export async function getCareerJobByNumber(params: {
  repo: string;
  number: number;
  cacheTtlMs?: number;
}): Promise<CareerJob> {
  const cacheTtlMs = params.cacheTtlMs ?? 10 * 60 * 1000;
  const cacheKey = `careers_job_${params.repo}_${params.number}`;
  const cached = readCache<CareerJob>(cacheKey, cacheTtlMs);
  if (cached) return cached;

  const [owner, name] = params.repo.split('/');
  if (!owner || !name) throw new Error('Invalid careers repo');

  const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/issues/${params.number}`;
  const it = await githubRequest<any>(url, 'application/vnd.github.v3.html+json');
  if (!it || it.pull_request) throw new Error('Job not found');

  const bodyMarkdown = String(it.body ?? '');
  const applyUrl = parseApplyUrl(bodyMarkdown) || getCareersDefaultApplyUrl();
  const labels = Array.isArray(it.labels)
    ? it.labels
        .map((l: any) => (typeof l === 'string' ? l : l?.name))
        .filter(Boolean)
        .map((s: any) => String(s))
    : [];

  const job: CareerJob = {
    id: String(it.id),
    number: Number(it.number),
    title: String(it.title ?? ''),
    state: normalizeIssueState(it.state),
    createdAt: String(it.created_at ?? ''),
    updatedAt: String(it.updated_at ?? ''),
    url: String(it.html_url ?? ''),
    bodyMarkdown,
    bodyHtml: it.body_html ? String(it.body_html) : null,
    labels,
    applyUrl,
    location: parseLocation(bodyMarkdown),
    employmentType: parseEmploymentType(bodyMarkdown),
  };

  writeCache(cacheKey, job);
  return job;
}
