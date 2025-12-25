type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

const HASHNODE_GQL_ENDPOINT = 'https://gql.hashnode.com/';

export type HashnodeTag = { name: string; slug: string };

export type HashnodePostListItem = {
  id: string;
  title: string;
  slug: string;
  url: string;
  brief: string;
  publishedAt: string;
  readTimeInMinutes?: number | null;
  coverImageUrl?: string | null;
  tags: HashnodeTag[];
};

export type HashnodePost = HashnodePostListItem & {
  subtitle?: string | null;
  contentHtml: string;
};

export function getHashnodePublicationHost(): string | null {
  const host = (import.meta as any).env?.VITE_HASHNODE_PUBLICATION_HOST as string | undefined;
  if (!host) return null;
  return host.trim() || null;
}

async function hashnodeRequest<TData>(
  query: string,
  variables: Record<string, unknown>
): Promise<TData> {
  const res = await fetch(HASHNODE_GQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Hashnode request failed (${res.status})`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).filter(Boolean).join(', ') || 'Hashnode error');
  }
  if (!json.data) {
    throw new Error('Hashnode returned no data');
  }
  return json.data;
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

export async function getHashnodePosts(params: {
  host: string;
  first?: number;
  cacheTtlMs?: number;
}): Promise<HashnodePostListItem[]> {
  const first = params.first ?? 20;
  const cacheTtlMs = params.cacheTtlMs ?? 10 * 60 * 1000;
  const cacheKey = `hashnode_posts_${params.host}_${first}`;

  const cached = readCache<HashnodePostListItem[]>(cacheKey, cacheTtlMs);
  if (cached) return cached;

  const query = `
    query PostsByPublication($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              title
              brief
              slug
              url
              publishedAt
              readTimeInMinutes
              coverImage { url }
              tags { name slug }
            }
          }
        }
      }
    }
  `;

  const data = await hashnodeRequest<{
    publication: {
      posts: { edges: Array<{ node: any }> };
    } | null;
  }>(query, { host: params.host, first });

  const posts =
    data.publication?.posts.edges
      .map((e) => e.node)
      .filter(Boolean)
      .map((n) => ({
        id: String(n.id),
        title: String(n.title ?? ''),
        slug: String(n.slug ?? ''),
        url: String(n.url ?? ''),
        brief: String(n.brief ?? ''),
        publishedAt: String(n.publishedAt ?? ''),
        readTimeInMinutes: typeof n.readTimeInMinutes === 'number' ? n.readTimeInMinutes : null,
        coverImageUrl: n.coverImage?.url ? String(n.coverImage.url) : null,
        tags: Array.isArray(n.tags)
          ? n.tags
              .filter(Boolean)
              .map((t: any) => ({ name: String(t.name ?? ''), slug: String(t.slug ?? '') }))
              .filter((t: HashnodeTag) => t.name && t.slug)
          : [],
      })) ?? [];

  writeCache(cacheKey, posts);
  return posts;
}

export async function getHashnodePostBySlug(params: {
  host: string;
  slug: string;
  cacheTtlMs?: number;
}): Promise<HashnodePost> {
  const cacheTtlMs = params.cacheTtlMs ?? 10 * 60 * 1000;
  const cacheKey = `hashnode_post_${params.host}_${params.slug}`;

  const cached = readCache<HashnodePost>(cacheKey, cacheTtlMs);
  if (cached) return cached;

  const query = `
    query PostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          subtitle
          brief
          slug
          url
          publishedAt
          readTimeInMinutes
          coverImage { url }
          tags { name slug }
          content { html }
        }
      }
    }
  `;

  const data = await hashnodeRequest<{
    publication: { post: any } | null;
  }>(query, { host: params.host, slug: params.slug });

  const p = data.publication?.post;
  if (!p) {
    throw new Error('Post not found');
  }

  const post: HashnodePost = {
    id: String(p.id),
    title: String(p.title ?? ''),
    subtitle: p.subtitle ? String(p.subtitle) : null,
    slug: String(p.slug ?? ''),
    url: String(p.url ?? ''),
    brief: String(p.brief ?? ''),
    publishedAt: String(p.publishedAt ?? ''),
    readTimeInMinutes: typeof p.readTimeInMinutes === 'number' ? p.readTimeInMinutes : null,
    coverImageUrl: p.coverImage?.url ? String(p.coverImage.url) : null,
    tags: Array.isArray(p.tags)
      ? p.tags
          .filter(Boolean)
          .map((t: any) => ({ name: String(t.name ?? ''), slug: String(t.slug ?? '') }))
          .filter((t: HashnodeTag) => t.name && t.slug)
      : [],
    contentHtml: String(p.content?.html ?? ''),
  };

  writeCache(cacheKey, post);
  return post;
}

export function sanitizeHtml(html: string): string {
  if (!html) return '';

  const template = document.createElement('template');
  template.innerHTML = html;

  const disallowedTags = new Set(['script', 'iframe', 'object', 'embed', 'link', 'style', 'meta', 'base']);
  const disallowedAttrs = new Set(['srcdoc']);

  const walk = (root: ParentNode) => {
    const elements = Array.from(root.querySelectorAll('*'));
    for (const el of elements) {
      const tag = el.tagName.toLowerCase();
      if (disallowedTags.has(tag)) {
        el.remove();
        continue;
      }

      for (const attr of Array.from(el.attributes)) {
        const name = attr.name.toLowerCase();
        const value = attr.value;

        if (name.startsWith('on') || disallowedAttrs.has(name)) {
          el.removeAttribute(attr.name);
          continue;
        }

        if (name === 'href' || name === 'src') {
          const v = value.trim().toLowerCase();
          if (v.startsWith('javascript:')) {
            el.removeAttribute(attr.name);
            continue;
          }
        }

        if (name === 'style') {
          el.removeAttribute(attr.name);
        }
      }
    }
  };

  walk(template.content);
  return template.innerHTML;
}

