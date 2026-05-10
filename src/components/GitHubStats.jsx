import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

const GitHubStats = () => {
    const { profile } = usePortfolio();
    // Use the username from the profile or a default
    const username = profile.name.toLowerCase().replace(/\s/g, '') || "munavathvijay";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1 glass rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5"
        >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl group-hover:bg-primary-500/40 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-slate-900 rounded-2xl">
                    <FaGithub size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="font-black text-xl leading-none mb-1">GitHub Activity</h3>
                    <p className="text-xs text-primary-500 font-bold uppercase tracking-widest">Live Stats</p>
                </div>
            </div>

            <div className="space-y-4">
                <img 
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=10b981&icon_color=10b981&text_color=94a3b8&bg_color=00000000`} 
                    alt="GitHub Stats"
                    className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="flex gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1"><FaStar size={12} /> 120+</span>
                    <span className="flex items-center gap-1"><FaCodeBranch size={12} /> 450+</span>
                </div>
                <a 
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-primary-500 hover:underline uppercase tracking-widest"
                >
                    View Profile
                </a>
            </div>
        </motion.div>
    );
};

export default GitHubStats;
