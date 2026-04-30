import React from 'react';
import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { profile } = usePortfolio();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t dark:border-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              {profile.name.split(' ')[0]}<span className="text-gray-900 dark:text-white">.dev</span>
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xs text-sm">
              Creating digital experiences that make an impact.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
              <FaGithub size={20} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
