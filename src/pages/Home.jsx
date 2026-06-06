import React from 'react';
import HeroSection from '../components/HeroSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import AchievementsSection from '../components/AchievementsSection';
import SkillsSection from '../components/SkillsSection';
import DevLogSection from '../components/DevLogSection';
import ContactSection from '../components/ContactSection';
import BlockchainShowcase from '../components/BlockchainShowcase';
import { motion } from 'framer-motion';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

const Home = () => {
  useKeyboardNavigation(['home', 'experience', 'projects', 'skills', 'devlog', 'education', 'achievements', 'contact']);

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

      <section id="experience" className="section-padding bg-gray-50/50 dark:bg-slate-900/50">
        <ExperienceSection />
      </section>
      
      <section id="projects" className="section-padding bg-gray-50/50 dark:bg-slate-900/50">
        <ProjectsSection />
      </section>

      <section id="web3" className="section-padding bg-slate-950">
        <BlockchainShowcase />
      </section>

      <section id="skills" className="section-padding">
        <SkillsSection />
      </section>

      <section id="devlog" className="section-padding bg-slate-950">
        <DevLogSection />
      </section>

      <section id="education" className="section-padding bg-gray-50/50 dark:bg-slate-900/50">
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
