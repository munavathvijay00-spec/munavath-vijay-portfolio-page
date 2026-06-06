import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MiniBrowserHover = ({ previewImage, url, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
        {children}
      </div>

      <AnimatePresence>
        {hovered && previewImage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-slate-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl z-50 pointer-events-none hidden md:block"
          >
            {/* Window header */}
            <div className="bg-slate-800 px-3 py-1.5 flex gap-1 items-center border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {url && <span className="text-[8px] text-gray-500 truncate ml-2">{url}</span>}
            </div>
            {/* Image Preview */}
            <img src={previewImage} alt="Live view mockup" className="w-full h-36 object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiniBrowserHover;
