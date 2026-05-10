import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const ExperienceSection = () => {
  const { experience } = usePortfolio();

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary-500 font-black tracking-[0.2em] text-xs mb-4 uppercase"
          >
            Career Path
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-black text-white">Work <span className="text-primary-500">History</span></h2>
        </div>
        <p className="text-gray-400 max-w-sm text-sm font-medium">
          A track record of building impactful software and solving complex problems across diverse industries.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className="group relative grid md:grid-cols-[1fr_2px_2fr] gap-12"
            >
              {/* Left Side: Duration */}
              <div className="md:text-right pt-2">
                <div className="inline-flex items-center gap-2 text-primary-500 font-black uppercase tracking-widest text-xs mb-2">
                  <Calendar size={14} />
                  {exp.duration}
                </div>
                <h4 className="text-gray-500 text-sm font-bold">{exp.company}</h4>
              </div>

              {/* Middle: Timeline Dot/Line */}
              <div className="hidden md:flex flex-col items-center relative">
                <div className="w-4 h-4 rounded-full border-2 border-primary-500 bg-slate-950 z-10 group-hover:scale-125 group-hover:bg-primary-500 transition-all duration-500" />
                <div className="w-[1px] h-full bg-gradient-to-b from-primary-500/50 to-transparent absolute top-4" />
              </div>

              {/* Right Side: Content */}
              <div className="pb-16">
                <div className="glass-morphism p-10 rounded-[2.5rem] border border-white/5 hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden group/card">
                  {/* Decorative Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-primary-500/10 rounded-2xl text-primary-500">
                        <Briefcase size={24} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary-400 transition-colors">
                        {exp.role}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 leading-relaxed text-lg mb-6 font-medium">
                      {exp.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary-500/60 text-xs font-black uppercase tracking-widest">
                      <MapPin size={14} />
                      {exp.location || 'Remote'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
