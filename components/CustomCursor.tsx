import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  // Only enable on devices that support hover + fine pointer and when user didn't request reduced motion
  const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsHover || reduceMotion) return null;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const borderColor = useMotionValue('#ffffff');

  const target = useRef({ x: -100, y: -100, scale: 1, border: '#ffffff' });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX - 16;
      target.current.y = e.clientY - 16;
      startLoop();
    };

    const onMouseDown = () => {
      target.current.scale = 0.8;
      startLoop();
    };
    const onMouseUp = () => {
      target.current.scale = 1;
      startLoop();
    };

    // Use pointer events delegation to detect hover over interactive elements efficiently
    const onPointerOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, input, textarea, select, .cursor-pointer');
      if (el) {
        target.current.scale = 1.5;
        target.current.border = '#FF4D00';
      }
      startLoop();
    };

    const onPointerOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, input, textarea, select, .cursor-pointer');
      if (!el) {
        target.current.scale = 1;
        target.current.border = '#ffffff';
      }
      startLoop();
    };

    const loop = () => {
      const curX = x.get();
      const curY = y.get();
      const nx = curX + (target.current.x - curX) * 0.2;
      const ny = curY + (target.current.y - curY) * 0.2;
      x.set(nx);
      y.set(ny);
      scale.set(scale.get() + (target.current.scale - scale.get()) * 0.2);
      borderColor.set(target.current.border);

      // stop the loop if we are already very close to the target
      if (Math.abs(nx - target.current.x) < 0.5 && Math.abs(ny - target.current.y) < 0.5) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, scale, borderColor }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ x, y }}
        transition={{ type: 'spring', stiffness: 1500, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;