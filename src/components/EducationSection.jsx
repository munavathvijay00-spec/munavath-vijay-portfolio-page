import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const EducationSection = () => {
  const { education } = usePortfolio();

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Educational Journey</h2>
        <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 relative"
          >
            {/* Timeline Line */}
            {index !== education.length - 1 && (
              <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-800" />
            )}

            <div className="flex-shrink-0 w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary-600 z-10">
              <GraduationCap size={28} />
            </div>

            <div className="glass p-8 rounded-2xl flex-grow hover:border-primary-500/50 transition-colors shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="text-2xl font-bold">{edu.institution}</h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-4 py-1 rounded-full w-fit">
                  <Calendar size={14} />
                  {edu.year}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                <Award size={18} className="text-primary-500" />
                <span>Result: {edu.marks}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
