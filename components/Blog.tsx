import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { getHashnodePosts, getHashnodePublicationHost, type HashnodePostListItem } from '../src/lib/hashnode';

type BlogProps = {
  onOpenPost: (slug: string) => void;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

function isPlainLeftClick(e: React.MouseEvent): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

const Blog: React.FC<BlogProps> = ({ onOpenPost }) => {
  const host = useMemo(() => getHashnodePublicationHost(), []);
  const [posts, setPosts] = useState<HashnodePostListItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!host) return;
    let cancelled = false;

    (async () => {
      setStatus('loading');
      setErrorMessage('');
      try {
        const data = await getHashnodePosts({ host, first: 24 });
        if (cancelled) return;
        setPosts(data);
        setStatus('idle');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load posts');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [host]);

  if (!host) {
    return (
      <section className="pt-40 pb-20 bg-dark min-h-screen">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Blog</h1>
            <p className="text-gray-400">
              Set <span className="text-white">VITE_HASHNODE_PUBLICATION_HOST</span> to your Hashnode publication hostname.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-3">Blog</h1>
              <p className="text-gray-400 max-w-2xl">
                Posts fetched from Hashnode and rendered on this site.
              </p>
            </div>
            <a
              href={`https://${host}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors w-fit"
              aria-label="Open Hashnode publication"
            >
              <span>{host}</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {status === 'loading' && (
            <div className="text-gray-400">Loading posts…</div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-300">
              <div className="text-white font-heading font-bold mb-2">Couldn’t load posts</div>
              <div className="text-gray-400 text-sm">{errorMessage}</div>
            </div>
          )}

          {status === 'idle' && posts.length === 0 && (
            <div className="text-gray-400">No posts yet.</div>
          )}

          {posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3) }}
                  className="rounded-[2rem] overflow-hidden bg-surface border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <a
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    onClick={(e) => {
                      if (!isPlainLeftClick(e)) return;
                      e.preventDefault();
                      onOpenPost(post.slug);
                    }}
                    className="block h-full"
                    aria-label={`Open ${post.title}`}
                  >
                    {post.coverImageUrl && (
                      <div className="h-48 w-full overflow-hidden bg-black">
                        <img
                          src={post.coverImageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-7 flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-2">
                          <Calendar size={14} />
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.readTimeInMinutes != null && (
                          <span className="inline-flex items-center gap-2">
                            <Clock size={14} />
                            {post.readTimeInMinutes} min
                          </span>
                        )}
                      </div>

                      <div>
                        <h2 className="text-white font-heading font-bold text-xl leading-snug">
                          {post.title}
                        </h2>
                        {post.brief && (
                          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                            {post.brief}
                          </p>
                        )}
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {post.tags.slice(0, 5).map((t) => (
                            <span
                              key={t.slug}
                              className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
