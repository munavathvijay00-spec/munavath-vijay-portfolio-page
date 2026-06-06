import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import MagneticButton from './MagneticButton';
import Typewriter from './Typewriter';

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

  // Dynamic parallax calculation could be added via useScroll, but using simple CSS or motion is fine here.
  
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute min-w-full min-h-full object-cover scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screens-416-large.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-primary-400 text-xs font-black tracking-[0.2em] uppercase">Currently Building: PowerPulse</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter text-white">
            I BUILD SECURE <br />
            <span className="bg-gradient-to-r from-primary-400 via-emerald-400 to-primary-600 bg-clip-text text-transparent">TOKENIZATION ENGINES</span> <br />
            & DYNAMIC DASHBOARDS.
          </motion.h1>

          <motion.div variants={itemVariants} className="text-xl text-gray-400 max-w-lg mb-12 font-medium leading-relaxed">
            I'm <span className="text-white font-bold">{profile.name}</span>, a <Typewriter words={["Frontend Engineer", "Solidity Developer", "UI/UX Designer"]} /> building for fintech startups.
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
            <MagneticButton>
              <a href="#projects" className="btn-primary group">
                Explore My Work
              </a>
            </MagneticButton>
            <MagneticButton>
              <a 
                href={profile.resumeLink || '/resume.pdf'} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!profile.resumeLink) {
                    e.preventDefault();
                    alert("Resume hasn't been uploaded yet!");
                  }
                }}
                className="px-8 py-4 glass rounded-2xl border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Download CV
              </a>
            </MagneticButton>
            <div className="flex gap-4 p-2 glass rounded-2xl border border-white/5">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-primary-400 transition-all">
                <FaGithub size={22} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-primary-400 transition-all">
                <FaLinkedin size={22} />
              </a>
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-primary-400 transition-all">
                <FaTwitter size={22} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:flex justify-end"
        >
          <div className="relative w-[500px] h-[500px]">
            {/* Geometric Shapes */}
            <div className="absolute top-0 right-0 w-full h-full border border-white/5 rounded-[3rem] rotate-6" />
            <div className="absolute top-0 right-0 w-full h-full border border-primary-500/20 rounded-[3rem] -rotate-3" />
            
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden glass-morphism shadow-2xl group">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-primary-500/20">
                  <span className="text-[12rem] font-black">{profile.name.charAt(0)}</span>
                </div>
              )}
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-bold text-lg mb-1">Let's build something</p>
                <p className="text-gray-400 text-sm">Based in {profile.location || 'India'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
