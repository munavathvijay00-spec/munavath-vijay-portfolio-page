import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import TechStackPhysics from './TechStackPhysics';
import SkillsRadar from './SkillsRadar';

const SkillsSection = () => {
  const { skills } = usePortfolio();

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500 font-black tracking-[0.2em] text-xs mb-4 uppercase"
          >
            Technical Arsenal
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-black text-white">Expertise & <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">Skills</span></h2>
        </div>
        <p className="text-gray-400 max-w-sm text-sm font-medium">
          A comprehensive toolkit focused on building high-performance, scalable, and beautiful user experiences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16 items-start">
        <div className="lg:col-span-1">
          <SkillsRadar />
        </div>
        
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-[2rem]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span 
                    key={skill.id}
                    className="px-3 py-1.5 bg-slate-800/50 text-gray-300 border border-white/5 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <TechStackPhysics />
    </div>
  );
};

export default SkillsSection;
