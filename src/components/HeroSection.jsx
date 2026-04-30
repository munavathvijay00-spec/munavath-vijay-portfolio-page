import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const HeroSection = () => {
  const { profile } = usePortfolio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.p variants={itemVariants} className="text-primary-600 font-semibold tracking-wider mb-2">
            WELCOME TO MY WORLD
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">{profile.name}</span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8 font-medium">
            a {profile.role}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mb-10 leading-relaxed">
            {profile.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a href="#projects" className="btn-primary flex items-center gap-2 group">
              View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex gap-4 ml-4">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-primary-600 transition-all">
                <FaGithub size={20} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-primary-600 transition-all">
                <FaLinkedin size={20} />
              </a>
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-primary-600 transition-all">
                <FaTwitter size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-primary-600 rounded-2xl rotate-6 opacity-20" />
            <div className="absolute inset-0 bg-primary-400 rounded-2xl -rotate-3 opacity-20" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass shadow-2xl">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-slate-800 text-gray-400">
                  <span className="text-6xl font-bold">{profile.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
