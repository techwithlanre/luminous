import { ABOUT_CONTENT, HERO_CONTENT, INDUSTRIES, PORTFOLIO, PRICING_SECTIONS, SERVICES } from '../../constants';

export type SiteDoc = {
  id: string;
  title: string;
  url: string;
  text: string;
};

const CONTACT = {
  email: 'hello@cloudomsystems.com',
  address: 'Block 1 Flat 5, Ijebu Ode Close, Area 2. Garki Abuja',
  website: 'https://www.cloudomsystems.com',
};

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && t.length <= 32);
}

function scoreDoc(queryTerms: string[], docTerms: Set<string>): number {
  let score = 0;
  for (const t of queryTerms) {
    if (docTerms.has(t)) score += 2;
  }
  return score;
}

export function getSiteDocs(): SiteDoc[] {
  const servicesText = SERVICES.map((s) => `• ${s.title}: ${s.description}`).join('\n');
  const industriesText = INDUSTRIES.map((i) => `• ${i.name}: ${i.description}`).join('\n');
  const pricingText = PRICING_SECTIONS.map((sec) => {
    const cards = sec.cards
      .map((c) => {
        const meta = [c.price, c.subtitle].filter(Boolean).join(' · ');
        const feats = c.features.map((f) => `  • ${f}`).join('\n');
        return `• ${c.title}${meta ? ` (${meta})` : ''}\n${feats}`;
      })
      .join('\n');
    return `${sec.title} ${sec.highlightWord}\n${cards}`;
  }).join('\n\n');

  const portfolioText = PORTFOLIO.map((p) => {
    const stack = p.techStack?.length ? `Tech: ${p.techStack.join(', ')}` : '';
    return `• ${p.title} (${p.category}): ${p.description}\n  Problem: ${p.problem ?? ''}\n  Solution: ${p.solution ?? ''}\n  Outcome: ${p.outcome ?? ''}\n  ${stack}`.trim();
  }).join('\n\n');

  return [
    {
      id: 'company_overview',
      title: 'Cloudom Systems overview',
      url: '/',
      text:
        `Cloudom Systems is a digital product agency.\n` +
        `Headline: ${HERO_CONTENT.headlineStart} ${HERO_CONTENT.headlineEnd}\n` +
        `Subheadline: ${HERO_CONTENT.subheadline}\n` +
        `About: ${ABOUT_CONTENT.p1}\n${ABOUT_CONTENT.p2}\n` +
        `Website: ${CONTACT.website}`,
    },
    {
      id: 'services',
      title: 'Services',
      url: '/services',
      text: servicesText + '\n\n' + pricingText,
    },
    {
      id: 'industries',
      title: 'Industries',
      url: '/#industries',
      text: industriesText,
    },
    {
      id: 'portfolio',
      title: 'Work portfolio',
      url: '/#portfolio',
      text: portfolioText,
    },
    {
      id: 'blog',
      title: 'Blog',
      url: '/blog',
      text:
        `The blog is powered by Hashnode and rendered on the site.\n` +
        `Blog URLs look like /blog/:slug.\n` +
        `If a user asks for a specific post, suggest visiting the Blog page if needed.`,
    },
    {
      id: 'careers',
      title: 'Careers',
      url: '/careers',
      text:
        `Careers are pulled from GitHub Issues labeled "job" in a public repo.\n` +
        `Roles are listed at /careers and details at /careers/:id.\n` +
        `Applicants can apply via the Apply button on the job detail page.`,
    },
    {
      id: 'contact',
      title: 'Contact',
      url: '/#contact',
      text:
        `Email: ${CONTACT.email}\n` +
        `Headquarters: ${CONTACT.address}\n` +
        `For inquiries, users can use the contact form on the site or email directly.`,
    },
    {
      id: 'legal',
      title: 'Legal pages',
      url: '/privacy',
      text: `Legal pages available: /privacy and /terms.`,
    },
  ];
}

export function buildContextForQuery(query: string, maxDocs: number = 5): string {
  const docs = getSiteDocs();
  const qTerms = normalize(query);
  const scored = docs
    .map((d) => {
      const terms = new Set(normalize(`${d.title}\n${d.text}`));
      return { doc: d, score: scoreDoc(qTerms, terms) };
    })
    .sort((a, b) => b.score - a.score);

  const chosen = scored.filter((s) => s.score > 0).slice(0, maxDocs).map((s) => s.doc);
  const fallback = chosen.length ? chosen : docs.slice(0, Math.min(maxDocs, docs.length));

  return fallback
    .map((d) => `${d.title}\nURL: ${d.url}\n${d.text}`.trim())
    .join('\n\n');
}
