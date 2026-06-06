import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useSoundEffects } from '../context/SoundContext';
import TiltCard from './TiltCard';
import MiniBrowserHover from './MiniBrowserHover';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full-stack', 'Design'];

const ProjectsSection = () => {
  const { projects } = usePortfolio();
  const { playHover, playClick } = useSoundEffects();
  const [activeCategory, setActiveCategory] = useState('All');

  // We assign a default category if it doesn't exist to make filtering work out-of-the-box
  const projectsWithCategory = projects.map(p => ({
    ...p,
    category: p.category || (p.techStack.includes('Solidity') ? 'Backend' : 'Frontend')
  }));

  const filtered = activeCategory === 'All' 
    ? projectsWithCategory 
    : projectsWithCategory.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-600 font-bold tracking-widest text-sm mb-4"
        >
          CREATIVE PORTFOLIO
        </motion.p>
        <h2 className="text-4xl md:text-6xl font-black mb-6">Featured <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Projects</span></h2>
        <div className="w-24 h-2 bg-gradient-to-r from-primary-600 to-transparent mx-auto rounded-full" />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-12 justify-center flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { playClick(); setActiveCategory(cat); }}
            onMouseEnter={playHover}
            className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-emerald-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="h-[450px]"
            >
              <TiltCard>
                <div 
                  className="p-8 flex flex-col h-full relative group"
                  onMouseEnter={playHover}
                >
                  {/* Project Image Background */}
                  {project.image && (
                    <div className="absolute inset-0 z-[-1] rounded-[2.5rem] overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-500/10">
                      {project.category}
                    </span>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 text-white rounded-full hover:bg-emerald-500 transition-all duration-300 border border-white/10 hover:border-transparent"
                    >
                      <FaGithub size={18} />
                    </a>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0,3).map(tech => (
                        <span key={tech} className="px-2 py-1 bg-white/5 text-gray-300 rounded text-[10px] font-bold uppercase tracking-tighter">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                         <span className="px-2 py-1 bg-white/5 text-gray-400 rounded text-[10px] font-bold">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                    <h3 className="text-3xl font-black mb-3 group-hover:text-emerald-400 transition-colors leading-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2 text-sm mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Link 
                        to={`/project/${project.id}`}
                        onClick={playClick}
                        className="inline-flex items-center gap-2 text-sm font-black text-emerald-500 uppercase tracking-widest group/link"
                      >
                        Case Study <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      
                      <MiniBrowserHover previewImage={project.image} url="live-demo.com">
                        <span className="text-xs uppercase tracking-widest border-b border-dashed border-emerald-500/50 cursor-pointer">Live Demo</span>
                      </MiniBrowserHover>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
