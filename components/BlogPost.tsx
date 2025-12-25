import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react';
import { getHashnodePostBySlug, getHashnodePublicationHost, sanitizeHtml, type HashnodePost } from '../src/lib/hashnode';

type BlogPostProps = {
  slug: string;
  onBack: () => void;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

function isPlainLeftClick(e: React.MouseEvent): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onBack }) => {
  const host = useMemo(() => getHashnodePublicationHost(), []);
  const [post, setPost] = useState<HashnodePost | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!host || !slug) return;
    let cancelled = false;

    (async () => {
      setStatus('loading');
      setErrorMessage('');
      try {
        const data = await getHashnodePostBySlug({ host, slug });
        if (cancelled) return;
        setPost({ ...data, contentHtml: sanitizeHtml(data.contentHtml) });
        setStatus('idle');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load post');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [host, slug]);

  return (
    <section className="pt-40 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-between gap-4 mb-10">
            <a
              href="/blog"
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                onBack();
              }}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              aria-label="Back to blog"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </a>

            {host && (
              <a
                href={`https://${host}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                aria-label="Open Hashnode publication"
              >
                <span>{host}</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          {status === 'loading' && (
            <div className="text-gray-400">Loading post…</div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-300">
              <div className="text-white font-heading font-bold mb-2">Couldn’t load post</div>
              <div className="text-gray-400 text-sm">{errorMessage}</div>
            </div>
          )}

          {status === 'idle' && post && (
            <article>
              <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                  {post.title}
                </h1>
                {post.subtitle && (
                  <p className="text-gray-400 mt-4 text-lg">{post.subtitle}</p>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 mt-6">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(post.publishedAt)}
                  </span>
                  {post.readTimeInMinutes != null && (
                    <span className="inline-flex items-center gap-2">
                      <Clock size={16} />
                      {post.readTimeInMinutes} min read
                    </span>
                  )}
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                      aria-label="Open original post on Hashnode"
                    >
                      <span>Original</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {post.tags.map((t) => (
                      <span
                        key={t.slug}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                )}

                {post.coverImageUrl && (
                  <div className="mt-10 rounded-[2rem] overflow-hidden border border-white/10 bg-black">
                    <img src={post.coverImageUrl} alt="" className="w-full h-auto" loading="lazy" />
                  </div>
                )}
              </header>

              <div className="hashnode-content text-gray-200" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPost;

