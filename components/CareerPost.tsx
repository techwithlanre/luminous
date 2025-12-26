import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { getCareerJobByNumber, getCareersRepo, type CareerJob } from '../src/lib/careers';
import { sanitizeHtml } from '../src/lib/hashnode';

type CareerPostProps = {
  id: string;
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

function buildMailto(subject: string): string {
  const to = 'hello@cloudomsystems.com';
  const params = new URLSearchParams({ subject });
  return `mailto:${to}?${params.toString()}`;
}

const CareerPost: React.FC<CareerPostProps> = ({ id, onBack }) => {
  const repo = useMemo(() => getCareersRepo(), []);
  const [job, setJob] = useState<CareerJob | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Careers | Cloudom Systems';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (!job?.title) return;
    document.title = `${job.title} | Careers | Cloudom Systems`;
  }, [job?.title]);

  useEffect(() => {
    if (!repo) return;
    const num = Number(id);
    if (!Number.isFinite(num)) return;

    let cancelled = false;
    (async () => {
      setStatus('loading');
      setErrorMessage('');
      try {
        const data = await getCareerJobByNumber({ repo, number: num });
        if (cancelled) return;
        setJob({
          ...data,
          bodyHtml: data.bodyHtml ? sanitizeHtml(data.bodyHtml) : null,
        });
        setStatus('idle');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load role');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [repo, id]);

  if (!repo) {
    return (
      <section className="pt-40 pb-20 bg-dark min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Role not configured</h1>
            <p className="text-gray-400">
              Set <span className="text-white">VITE_CAREERS_GITHUB_REPO</span> to enable careers listings.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-between gap-4 mb-10">
            <a
              href="/careers"
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                onBack();
              }}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              aria-label="Back to careers"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </a>

            <a
              href={`https://github.com/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
              aria-label="Open jobs repo on GitHub"
            >
              <span>{repo}</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {status === 'loading' && <div className="text-gray-400">Loading role…</div>}

          {status === 'error' && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-300">
              <div className="text-white font-heading font-bold mb-2">Couldn’t load role</div>
              <div className="text-gray-400 text-sm">{errorMessage}</div>
            </div>
          )}

          {status === 'idle' && job && (
            <article>
              <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 mt-6">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={16} />
                    Posted {formatDate(job.createdAt)}
                  </span>
                  {job.location && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                  )}
                </div>

                {job.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.labels.map((l) => (
                      <span
                        key={l}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a
                    href={job.applyUrl || buildMailto(`Application: ${job.title}`)}
                    target={job.applyUrl?.startsWith('http') ? '_blank' : undefined}
                    rel={job.applyUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center rounded-full bg-primary-dark px-6 py-3 font-bold text-white hover:bg-primary-dark/90 transition-colors"
                    aria-label="Apply for this role"
                  >
                    Apply now
                  </a>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:border-primary/30 transition-colors"
                    aria-label="View job source on GitHub"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </header>

              {job.bodyHtml ? (
                <div className="hashnode-content text-gray-200" dangerouslySetInnerHTML={{ __html: job.bodyHtml }} />
              ) : (
                <pre className="whitespace-pre-wrap text-gray-300 bg-white/5 border border-white/10 rounded-2xl p-6">
                  {job.bodyMarkdown}
                </pre>
              )}
            </article>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerPost;
