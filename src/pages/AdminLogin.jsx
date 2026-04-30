import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = usePortfolio();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </button>

        <div className="glass p-8 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
            Please enter your password to edit your portfolio.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <input
                type="password"
                required
                autoFocus
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border ${error ? 'border-red-500' : 'border-transparent focus:border-primary-500'} outline-none transition-all`}
              />
              {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
            </div>

            <button type="submit" className="w-full btn-primary py-4">
              Unlock Dashboard
            </button>
          </form>
          
          <p className="mt-8 text-center text-xs text-gray-400">
            Tip: Default password is "admin"
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
