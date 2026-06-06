import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform values into degrees of rotation
  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 150 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 w-full h-full ${className}`}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="w-full h-full relative z-10">
        {children}
      </div>
      {/* Background layer for the tilt effect */}
      <div className="absolute inset-0 z-0 bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[2.5rem] shadow-xl" />
    </motion.div>
  );
};

export default TiltCard;
