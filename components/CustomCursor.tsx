import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      
      const clickables = document.querySelectorAll('a, button, input, textarea, select, .cursor-pointer');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          borderColor: linkHovered ? '#FF4D00' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1500, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;