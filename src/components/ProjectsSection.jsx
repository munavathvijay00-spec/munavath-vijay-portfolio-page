import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useSoundEffects } from '../context/SoundContext';
import GitHubStats from './GitHubStats';

const ProjectsSection = () => {
  const { projects } = usePortfolio();
  const { playHover, playClick } = useSoundEffects();

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
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

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px] max-w-7xl mx-auto">
        {/* Main Projects */}
        {projects.map((project, index) => {
          // Bento layout logic: vary sizes based on index
          const isLarge = index === 0;
          const isWide = index === 1;
          
          let gridClasses = "md:col-span-2 md:row-span-1";
          if (isLarge) gridClasses = "md:col-span-4 md:row-span-2";
          else if (isWide) gridClasses = "md:col-span-2 md:row-span-2";

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onMouseEnter={playHover}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative glass rounded-[2.5rem] overflow-hidden flex flex-col ${gridClasses}`}
            >
              {/* Project Image Background */}
              {project.image && (
                <div className="absolute inset-0 z-0">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>
              )}

              <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                    <ExternalLink size={24} className="text-primary-500" />
                  </div>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900 text-white rounded-full hover:bg-primary-600 transition-all duration-300 shadow-xl"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-primary-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className={`font-black mb-3 group-hover:text-primary-600 transition-colors leading-tight ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-2 text-sm md:text-base mb-6">
                    {project.description}
                  </p>
                  
                  <Link 
                    to={`/project/${project.id}`}
                    onClick={playClick}
                    className="inline-flex items-center gap-2 text-sm font-black text-primary-500 uppercase tracking-widest group/link"
                  >
                    View Case Study <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hover Overlay Line */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-primary-500 w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          );
        })}

        {/* GitHub Stats Card */}
        <GitHubStats />
      </div>
    </div>
  );
};

export default ProjectsSection;
