
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  theme?: 'light' | 'dark' | 'primary';
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0, theme = 'light' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child = {
    hidden: { 
      y: "120%",
      opacity: 0,
      rotate: 5
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.6
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span 
          key={index} 
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span 
            variants={child} 
            className={`inline-block ${
              theme === 'primary' ? 'text-primary' : 
              theme === 'dark' ? 'text-black' : 'text-white'
            }`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
