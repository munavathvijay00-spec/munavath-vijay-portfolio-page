import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

const INITIAL_DATA = {
  profile: {
    name: "Munavath Vijay",
    role: "Full Stack Developer",
    bio: "Passionate student and developer focused on building clean, accessible, and high-performance web applications.",
    photo: null,
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  projects: [
    {
      id: '1',
      title: "WorldMoniter",
      description: "The World Moniter project is a web-based monitoring system designed to collect, display, and track information from different sources in one place.",
      techStack: ["React", "D3.js", "Tailwind", "Vite"],
      githubLink: "https://github.com",
      image: "/projects/world_monitor.png",
      problem: "Monitoring global data in real-time is complex and often requires multiple disconnected tools.",
      solution: "Created a unified dashboard that aggregates diverse data streams into a single, intuitive geographical interface.",
      challenges: "Synchronizing high-frequency data updates without impacting browser performance."
    },
    {
      id: '2',
      title: "NFT-MARKETPLACE",
      description: "NFTs are unique digital assets stored on a blockchain that represent ownership of a specific item or piece of content.",
      techStack: ["React", "Solidity", "Web3.js"],
      githubLink: "https://github.com",
      image: "/projects/nft_marketplace.png",
      problem: "Digital artists lack secure, decentralized ways to monetize their creative work.",
      solution: "Developed a secure marketplace using smart contracts to facilitate trustless art trading and ownership verification.",
      challenges: "Implementing a seamless wallet connection experience for non-technical users."
    },
    {
      id: '3',
      title: "TOKENIZATION",
      description: "Tokenization is the process of converting real-world assets, data, or rights into digital tokens on a blockchain.",
      techStack: ["Vite", "Ether.js", "TypeScript"],
      githubLink: "https://github.com",
      image: "/projects/tokenization.png",
      problem: "Illiquid assets like real estate or gold are difficult to trade in smaller increments.",
      solution: "Built a fractional ownership platform that breaks down physical assets into tradable digital tokens.",
      challenges: "Ensuring regulatory compliance and secure off-chain asset verification."
    }
  ],
  education: [
    {
      id: '1',
      institution: "State University",
      year: "2021 - Present",
      marks: "3.8 CGPA"
    }
  ],
  achievements: [
    {
      id: '1',
      title: "Google Cloud Certified",
      image: null
    }
  ],
  contactInfo: {
    email: "munavathvijay00@gmail.com",
    location: "Hyderabad, Telangana",
    phone: "7013906794"
  },
  skills: [
    { id: '1', name: 'React', category: 'Frontend' },
    { id: '2', name: 'Node.js', category: 'Backend' },
    { id: '3', name: 'Tailwind CSS', category: 'Design' }
  ],
  experience: [
    {
      id: '1',
      role: "Junior Developer",
      company: "Tech Solutions Inc.",
      duration: "2023 - Present",
      description: "Working on building modern web applications using React and Node.js."
    }
  ],
  devLog: [
    {
      id: '1',
      date: "May 10, 2026",
      title: "Started Portfolio Upgrade",
      content: "Today I began a major overhaul of my portfolio, implementing a new Bento Grid layout and a premium color palette."
    }
  ],
  adminPassword: "admin" // Simple default password
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Merge saved data with INITIAL_DATA to ensure all keys exist
      return { ...INITIAL_DATA, ...parsedData };
    }
    return INITIAL_DATA;
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateProfile = (profile) => setData(prev => ({ ...prev, profile }));
  const updateSocials = (socials) => setData(prev => ({ ...prev, profile: { ...prev.profile, socials } }));
  
  const addProject = (project) => setData(prev => ({ ...prev, projects: [...prev.projects, { ...project, id: Date.now().toString() }] }));
  const editProject = (id, updatedProject) => setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? updatedProject : p) }));
  const deleteProject = (id) => setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

  const addEducation = (edu) => setData(prev => ({ ...prev, education: [...prev.education, { ...edu, id: Date.now().toString() }] }));
  const editEducation = (id, updatedEdu) => setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? updatedEdu : e) }));
  const deleteEducation = (id) => setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  const addAchievement = (achievement) => setData(prev => ({ ...prev, achievements: [...prev.achievements, { ...achievement, id: Date.now().toString() }] }));
  const editAchievement = (id, updatedAchievement) => setData(prev => ({ ...prev, achievements: prev.achievements.map(a => a.id === id ? updatedAchievement : a) }));
  const deleteAchievement = (id) => setData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
  const updateContactInfo = (contactInfo) => setData(prev => ({ ...prev, contactInfo }));

  const addSkill = (skill) => setData(prev => ({ ...prev, skills: [...prev.skills, { ...skill, id: Date.now().toString() }] }));
  const deleteSkill = (id) => setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));

  const addExperience = (exp) => setData(prev => ({ ...prev, experience: [...prev.experience, { ...exp, id: Date.now().toString() }] }));
  const editExperience = (id, updatedExp) => setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? updatedExp : e) }));
  const deleteExperience = (id) => setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  const addDevLog = (log) => setData(prev => ({ ...prev, devLog: [{ ...log, id: Date.now().toString(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...prev.devLog] }));
  const deleteDevLog = (id) => setData(prev => ({ ...prev, devLog: prev.devLog.filter(l => l.id !== id) }));

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const login = (password) => {
    if (password === data.adminPassword) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <PortfolioContext.Provider value={{
      ...data,
      theme,
      isLoggedIn,
      updateProfile,
      updateSocials,
      addProject,
      editProject,
      deleteProject,
      addEducation,
      editEducation,
      deleteEducation,
      addAchievement,
      editAchievement,
      deleteAchievement,
      updateContactInfo,
      addSkill,
      deleteSkill,
      addExperience,
      editExperience,
      deleteExperience,
      addDevLog,
      deleteDevLog,
      toggleTheme,
      login,
      logout
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
