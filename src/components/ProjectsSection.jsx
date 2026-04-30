import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectsSection = () => {
  const { projects } = usePortfolio();

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
        <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary-600 transition-colors"
                >
                  <FaGithub size={18} />
                  <span>Repository</span>
                </a>
                <div className="ml-auto p-2 glass rounded-full group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <ExternalLink size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
