import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-0"
    >
      <section id="home">
        <HeroSection />
      </section>
      
      <section id="projects" className="section-padding bg-gray-50/50 dark:bg-slate-900/50">
        <ProjectsSection />
      </section>

      <section id="education" className="section-padding">
        <EducationSection />
      </section>

      <section id="achievements" className="section-padding bg-gray-50/50 dark:bg-slate-900/50">
        <AchievementsSection />
      </section>

      <section id="contact" className="section-padding">
        <ContactSection />
      </section>
    </motion.div>
  );
};

export default Home;
