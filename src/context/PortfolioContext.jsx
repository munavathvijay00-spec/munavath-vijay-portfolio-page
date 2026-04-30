import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

const INITIAL_DATA = {
  profile: {
    name: "John Doe",
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
      title: "Portfolio Website",
      description: "A modern, responsive portfolio built with React and Tailwind CSS.",
      techStack: ["React", "Tailwind", "Framer Motion"],
      githubLink: "https://github.com/example/portfolio"
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
  adminPassword: "admin" // Simple default password
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : INITIAL_DATA;
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
