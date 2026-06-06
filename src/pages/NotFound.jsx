import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-9xl font-black bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-6">Reality Distortion Field Active</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-10">
          The page you're looking for has been moved, deleted, or possibly never existed in this dimension.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1"
        >
          <Home size={20} />
          Return to Base
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
