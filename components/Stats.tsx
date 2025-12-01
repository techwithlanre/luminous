import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../constants';

const CountUp: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 20;
      const step = end / (duration / incrementTime);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-surface border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/5">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="p-4"
            >
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-primary uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;