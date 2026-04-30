import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ZoomIn } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AchievementsSection = () => {
  const { achievements } = usePortfolio();

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Milestones & Awards</h2>
        <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative glass rounded-2xl overflow-hidden aspect-video cursor-pointer"
          >
            {achievement.image ? (
              <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full bg-primary-50 dark:bg-slate-800 flex flex-col items-center justify-center p-6 text-center">
                <Trophy size={48} className="text-primary-600 mb-4 opacity-20" />
                <span className="text-gray-400 italic">No certificate image uploaded</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">{achievement.title}</h3>
              <div className="flex items-center gap-2 text-primary-400 text-sm font-medium">
                <ZoomIn size={16} />
                <span>View Certificate</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
