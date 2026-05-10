import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub, FaCheckCircle, FaExclamationCircle, FaLightbulb } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { projects } = usePortfolio();
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!project) navigate('/');
    }, [project, navigate]);

    if (!project) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <Link to="/#projects" className="inline-flex items-center gap-2 text-primary-500 font-black uppercase tracking-widest text-sm mb-12 hover:gap-4 transition-all">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.techStack.map(tech => (
                                <span key={tech} className="px-4 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-black uppercase tracking-widest border border-primary-500/20">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-12">
                            {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-6">
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                                <FaGithub size={20} /> View Source
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full" />
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <img src={project.image} alt={project.title} className="w-full h-auto" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-10 glass rounded-[3rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl w-fit mb-6">
                            <FaExclamationCircle size={24} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">The Problem</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {project.problem || "No problem statement provided."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 glass rounded-[3rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="p-4 bg-primary-500/10 text-primary-500 rounded-2xl w-fit mb-6">
                            <FaLightbulb size={24} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">The Solution</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {project.solution || "No solution description provided."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 glass rounded-[3rem] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl w-fit mb-6">
                            <FaCheckCircle size={24} />
                        </div>
                        <h3 className="text-2xl font-black mb-4">Key Challenges</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {project.challenges || "No challenges mentioned."}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
