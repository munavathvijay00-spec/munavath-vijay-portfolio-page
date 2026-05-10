import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Calendar, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const DevLogSection = () => {
    const { devLog } = usePortfolio();

    return (
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-600 font-bold tracking-widest text-sm mb-4"
                    >
                        JOURNAL
                    </motion.p>
                    <h2 className="text-4xl md:text-6xl font-black text-white">Dev<span className="text-primary-500">Log</span></h2>
                </div>
                <p className="text-gray-400 max-w-sm text-sm">
                    A collection of thoughts, technical snippets, and progress updates from my daily coding journey.
                </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
                {devLog.map((log, index) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-8 glass-morphism rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all duration-500"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 border border-primary-500/20">
                                    <Terminal size={20} />
                                </div>
                            </div>
                            
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2 text-primary-500/60 text-xs font-bold uppercase tracking-widest">
                                    <Calendar size={14} />
                                    {log.date}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                                    {log.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {log.content}
                                </p>
                            </div>

                            <div className="flex-shrink-0 flex items-center">
                                <div className="p-3 rounded-full bg-white/5 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DevLogSection;
