import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { getCareerJobs, getCareersRepo, type CareerJob } from '../src/lib/careers';

type CareersProps = {
  onOpenJob: (id: string) => void;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

function isPlainLeftClick(e: React.MouseEvent): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

const Careers: React.FC<CareersProps> = ({ onOpenJob }) => {
  const repo = useMemo(() => getCareersRepo(), []);
  const [jobs, setJobs] = useState<CareerJob[]>([]);
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
    if (!repo) return;
    let cancelled = false;

    (async () => {
      setStatus('loading');
      setErrorMessage('');
      try {
        const data = await getCareerJobs({ repo });
        if (cancelled) return;
        setJobs(data);
        setStatus('idle');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load jobs');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [repo]);

  if (!repo) {
    return (
      <section className="pt-40 pb-20 bg-dark min-h-screen">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">Careers</h1>
            <p className="text-gray-400">
              Set <span className="text-white">VITE_CAREERS_GITHUB_REPO</span> to a public GitHub repo like{' '}
              <span className="text-white">owner/repo</span>.
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
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-3">Careers</h1>
              <p className="text-gray-400 max-w-2xl">
                Open roles pulled from a public GitHub repo. Apply directly from each listing.
              </p>
            </div>
            <a
              href={`https://github.com/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors w-fit"
              aria-label="Open jobs repo on GitHub"
            >
              <span>{repo}</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {status === 'loading' && (
            <div className="text-gray-400">Loading roles…</div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-300">
              <div className="text-white font-heading font-bold mb-2">Couldn’t load roles</div>
              <div className="text-gray-400 text-sm">{errorMessage}</div>
            </div>
          )}

          {status === 'idle' && jobs.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-gray-300">
              <div className="text-white font-heading font-bold mb-2">No open roles right now</div>
              <div className="text-gray-400 text-sm">Check back soon.</div>
            </div>
          )}

          {jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job, idx) => (
                <motion.article
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.25) }}
                  className="rounded-[2rem] overflow-hidden bg-surface border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <a
                    href={`/careers/${encodeURIComponent(String(job.number))}`}
                    onClick={(e) => {
                      if (!isPlainLeftClick(e)) return;
                      e.preventDefault();
                      onOpenJob(String(job.number));
                    }}
                    className="block h-full p-7"
                    aria-label={`Open ${job.title}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-white font-heading font-bold text-2xl leading-snug">
                        {job.title}
                      </h2>
                      <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 whitespace-nowrap">
                        Open
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 mt-4">
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
                      <div className="flex flex-wrap gap-2 mt-5">
                        {job.labels.slice(0, 6).map((l) => (
                          <span
                            key={l}
                            className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    )}
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

export default Careers;

