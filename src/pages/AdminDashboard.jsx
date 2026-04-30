import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, GraduationCap, Trophy, Share2, 
  Plus, Trash2, Edit2, LogOut, Camera, Save, X 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const AdminDashboard = () => {
  const { 
    isLoggedIn, logout, profile, projects, education, achievements,
    updateProfile, updateSocials, addProject, editProject, deleteProject,
    addEducation, editEducation, deleteEducation,
    addAchievement, editAchievement, deleteAchievement
  } = usePortfolio();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin/login');
  }, [isLoggedIn, navigate]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotoUpload = async (e, type, id = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 1MB for LocalStorage safety)
    if (file.size > 1024 * 1024) {
      alert('Image is too large. Please select an image under 1MB.');
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      
      if (type === 'profile') {
        updateProfile({ ...profile, photo: base64 });
      } else if (type === 'achievement') {
        const ach = achievements.find(a => a.id === id);
        editAchievement(id, { ...ach, image: base64 });
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo. Please try a different image.");
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your portfolio content here.</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'projects', icon: Briefcase, label: 'Projects' },
              { id: 'education', icon: GraduationCap, label: 'Education' },
              { id: 'achievements', icon: Trophy, label: 'Achievements' },
              { id: 'socials', icon: Share2, label: 'Social Links' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-medium ${
                  activeTab === tab.id 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                    : 'glass hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="glass p-8 rounded-3xl min-h-[600px]">
              {activeTab === 'profile' && (
                <ProfileForm profile={profile} updateProfile={updateProfile} handlePhotoUpload={handlePhotoUpload} />
              )}
              {activeTab === 'projects' && (
                <ProjectsManager projects={projects} addProject={addProject} editProject={editProject} deleteProject={deleteProject} />
              )}
              {activeTab === 'education' && (
                <EducationManager education={education} addEducation={addEducation} editEducation={editEducation} deleteEducation={deleteEducation} />
              )}
              {activeTab === 'achievements' && (
                <AchievementsManager 
                  achievements={achievements} 
                  addAchievement={addAchievement} 
                  editAchievement={editAchievement} 
                  deleteAchievement={deleteAchievement}
                  handlePhotoUpload={handlePhotoUpload}
                />
              )}
              {activeTab === 'socials' && (
                <SocialsForm socials={profile.socials} updateSocials={updateSocials} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for forms

const ProfileForm = ({ profile, updateProfile, handlePhotoUpload }) => {
  const [formData, setFormData] = useState(profile);

  // Sync internal state when profile prop changes (e.g. after photo upload)
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center gap-8 mb-12">
        <div className="relative group">
          <div className="w-32 h-32 rounded-2xl overflow-hidden glass shadow-inner">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gray-100 dark:bg-slate-800 text-gray-400">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>
          <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center text-white rounded-2xl">
            <Camera size={24} />
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'profile')} />
          </label>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1">Profile Photo</h3>
          <p className="text-sm text-gray-500">Upload a professional headshot.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Full Name</label>
          <input 
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 ring-primary-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Current Role</label>
          <input 
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 ring-primary-500"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold">Bio</label>
        <textarea 
          rows="4"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border-none outline-none focus:ring-2 ring-primary-500 resize-none"
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
        />
      </div>
      <button type="submit" className="btn-primary w-fit flex items-center gap-2">
        <Save size={18} /> Save Profile
      </button>
    </form>
  );
};

const ProjectsManager = ({ projects, addProject, editProject, deleteProject }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', techStack: '', githubLink: '' });

  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: '', githubLink: '' });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      ...formData,
      techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map(s => s.trim()) : formData.techStack
    };
    
    if (editingId) {
      editProject(editingId, { ...project, id: editingId });
    } else {
      addProject(project);
    }
    resetForm();
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <input 
            placeholder="Project Title"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-none"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input 
            placeholder="GitHub Repository URL"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-none"
            value={formData.githubLink}
            onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
            required
          />
        </div>
        <textarea 
          placeholder="Project Description"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-none"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <input 
          placeholder="Tech Stack (comma separated: React, Tailwind, Vite)"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-none"
          value={formData.techStack}
          onChange={(e) => setFormData({...formData, techStack: e.target.value})}
          required
        />
        <div className="flex gap-4">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> {editingId ? 'Update' : 'Add'} Project
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-200 dark:bg-slate-700 rounded-xl">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Existing Projects</h3>
        {projects.map(project => (
          <div key={project.id} className="flex items-center justify-between p-4 glass rounded-xl">
            <div>
              <p className="font-bold">{project.title}</p>
              <p className="text-sm text-gray-500">{project.techStack.join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setEditingId(project.id);
                  setFormData({ ...project, techStack: project.techStack.join(', ') });
                }}
                className="p-2 text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => deleteProject(project.id)}
                className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simplified versions of other managers to save space, but functional
const EducationManager = ({ education, addEducation, editEducation, deleteEducation }) => {
  const [formData, setFormData] = useState({ institution: '', year: '', marks: '' });
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Education History</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <input placeholder="Institution" className="px-4 py-2 glass rounded-lg" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
          <input placeholder="Year" className="px-4 py-2 glass rounded-lg" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
          <input placeholder="CGPA/Marks" className="px-4 py-2 glass rounded-lg" value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})} />
        </div>
        <button onClick={() => { addEducation(formData); setFormData({institution:'', year:'', marks:''}) }} className="btn-primary w-fit">Add Education</button>
      </div>
      <div className="space-y-4">
        {education.map(edu => (
          <div key={edu.id} className="flex justify-between items-center p-4 glass rounded-xl">
            <div><p className="font-bold">{edu.institution}</p><p className="text-sm">{edu.year} • {edu.marks}</p></div>
            <button onClick={() => deleteEducation(edu.id)} className="p-2 text-red-500"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AchievementsManager = ({ achievements, addAchievement, editAchievement, deleteAchievement, handlePhotoUpload }) => {
  const [formData, setFormData] = useState({ title: '' });
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Achievements & Certificates</h3>
        <div className="flex gap-4">
          <input placeholder="Title" className="flex-grow px-4 py-2 glass rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <button onClick={() => { addAchievement(formData); setFormData({title:''}) }} className="btn-primary">Add</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map(ach => (
          <div key={ach.id} className="p-4 glass rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-bold">{ach.title}</p>
              <button onClick={() => deleteAchievement(ach.id)} className="text-red-500"><Trash2 size={18}/></button>
            </div>
            <div className="relative h-32 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
              {ach.image ? <img src={ach.image} className="w-full h-full object-cover"/> : <Camera size={24} className="opacity-20"/>}
              <label className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 bg-black/20 flex items-center justify-center text-white font-bold">
                Upload Image
                <input type="file" className="hidden" onChange={e => handlePhotoUpload(e, 'achievement', ach.id)}/>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SocialsForm = ({ socials, updateSocials }) => {
  const [formData, setFormData] = useState(socials);
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold">Social Media Links</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">GitHub URL</label>
          <input className="w-full px-4 py-3 glass rounded-xl" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">LinkedIn URL</label>
          <input className="w-full px-4 py-3 glass rounded-xl" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Twitter URL</label>
          <input className="w-full px-4 py-3 glass rounded-xl" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
        </div>
      </div>
      <button onClick={() => updateSocials(formData)} className="btn-primary">Save Social Links</button>
    </div>
  );
};

export default AdminDashboard;
