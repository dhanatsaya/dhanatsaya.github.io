import React, { useState } from 'react';
import {
  UserCheck,
  GraduationCap,
  Code2,
  Briefcase,
  Award,
  Compass,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { UserProfile, SkillItem } from '../../types';

interface PortfolioViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onTriggerRecalculation: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  userProfile,
  onUpdateProfile,
  onTriggerRecalculation,
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'skills' | 'experience' | 'achievements' | 'career' | 'documents'>('skills');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillItem['category']>('Technical');
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: SkillItem = {
      id: `sk_${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: Number(newSkillLevel),
    };

    const updated: UserProfile = {
      ...userProfile,
      skills: [...userProfile.skills, newSkill],
    };

    onUpdateProfile(updated);
    setNewSkillName('');
    setShowAddSkill(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    onTriggerRecalculation();
  };

  const handleRemoveSkill = (id: string) => {
    const updated: UserProfile = {
      ...userProfile,
      skills: userProfile.skills.filter((s) => s.id !== id),
    };
    onUpdateProfile(updated);
    onTriggerRecalculation();
  };

  const handleToggleDiscovery = () => {
    const updated: UserProfile = {
      ...userProfile,
      optInRecruiterDiscovery: !userProfile.optInRecruiterDiscovery,
    };
    onUpdateProfile(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div className="flex items-center gap-4">
          <img
            src={userProfile.personal.avatar}
            alt={userProfile.personal.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">{userProfile.personal.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Single Verified Portfolio
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {userProfile.education.degree} in {userProfile.education.branch} • {userProfile.education.college}
            </p>
          </div>
        </div>

        {/* Recruiter Discovery Toggle */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div>
            <div className="text-xs font-semibold text-slate-200">Recruiter Discovery</div>
            <div className="text-[10px] text-slate-400">Opt-in to anonymous discovery</div>
          </div>
          <button
            onClick={handleToggleDiscovery}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              userProfile.optInRecruiterDiscovery ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                userProfile.optInRecruiterDiscovery ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4" />
          <span>Portfolio updated! AI Opportunity Engine has automatically recalculated your matching scores across all portals.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'skills', label: 'Skills & Proficiencies', icon: Code2, count: userProfile.skills.length },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'personal', label: 'Personal Info', icon: UserCheck },
          { id: 'experience', label: 'Experience & Projects', icon: Briefcase, count: userProfile.experience.length },
          { id: 'achievements', label: 'Certificates & Awards', icon: Award, count: userProfile.achievements.length },
          { id: 'career', label: 'Career Preferences', icon: Compass },
          { id: 'documents', label: 'Documents & Resumes', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {/* 1. Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Verified Skills & Tools</h2>
              <p className="text-xs text-slate-400">
                These skills directly fuel the transparent AI Matching Engine across Private Jobs, Internships, and Government posts.
              </p>
            </div>
            <button
              onClick={() => setShowAddSkill(!showAddSkill)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>

          {/* Add Skill Form Modal */}
          {showAddSkill && (
            <form onSubmit={handleAddSkill} className="p-4 rounded-xl glass-panel border border-indigo-500/40 space-y-3">
              <div className="font-semibold text-xs text-indigo-300">Add New Skill to Unified Portfolio</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. React, Docker, DSA"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Technical">Technical</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Domain Skills">Domain Skills</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Proficiency ({newSkillLevel}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                    className="w-full accent-indigo-500 mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSkill(false)}
                  className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow"
                >
                  Save & Recalculate AI Matches
                </button>
              </div>
            </form>
          )}

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {userProfile.skills.map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl glass-card flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{s.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {s.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-28 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">{s.level}%</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveSkill(s.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 transition"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Education Tab */}
      {activeTab === 'education' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" /> Academic Qualifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-300">Undergraduate Degree</div>
              <div className="text-sm font-extrabold text-white">{userProfile.education.degree} - {userProfile.education.branch}</div>
              <div className="text-xs text-slate-300">{userProfile.education.college}</div>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>CGPA: <strong className="text-emerald-400">{userProfile.education.cgpa} / 10.0</strong></span>
                <span>Graduation: <strong className="text-white">{userProfile.education.graduationYear}</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-300">Higher Secondary School</div>
              <div className="text-sm font-extrabold text-white">{userProfile.education.school}</div>
              <div className="text-xs text-slate-400">Board: State Board Higher Secondary Education</div>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Stream: <strong className="text-white">Computer Science & Maths</strong></span>
                <span>Percentage: <strong className="text-emerald-400">94.2%</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Personal Info Tab */}
      {activeTab === 'personal' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" /> Personal & Identity Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Full Legal Name</span>
              <span className="font-bold text-white text-sm">{userProfile.personal.name}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Date of Birth</span>
              <span className="font-bold text-white text-sm">{userProfile.personal.dob}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Location</span>
              <span className="font-bold text-white text-sm">{userProfile.personal.location}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Email Address</span>
              <span className="font-bold text-white text-sm">{userProfile.personal.email}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Phone Number</span>
              <span className="font-bold text-white text-sm">{userProfile.personal.phone}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Privacy Protection</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Masked until explicit consent
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Experience & Project Portfolio</h2>
          <div className="space-y-3">
            {userProfile.experience.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl glass-card space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-sm text-white">{exp.title}</h3>
                    <p className="text-xs text-indigo-300 font-medium">{exp.organization}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{exp.duration}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Certifications & Awards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userProfile.achievements.map((ach) => (
              <div key={ach.id} className="p-4 rounded-xl glass-card space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold uppercase">
                    {ach.type}
                  </span>
                  <span className="text-xs text-slate-400">{ach.year}</span>
                </div>
                <h3 className="font-bold text-sm text-white">{ach.title}</h3>
                <p className="text-xs text-slate-400">Issued by {ach.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Career Preferences Tab */}
      {activeTab === 'career' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" /> Career Preferences & Target Aspirations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Primary Career Goal</span>
              <span className="font-extrabold text-white text-sm">{userProfile.career.careerGoal}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Salary Expectation</span>
              <span className="font-extrabold text-emerald-400 text-sm">{userProfile.career.salaryPreference}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Preferred Work Mode</span>
              <span className="font-bold text-white">{userProfile.career.workModePreference}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Target Locations</span>
              <span className="font-bold text-white">{userProfile.career.preferredLocations.join(', ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. Documents Tab */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Verified Documents & Uploads
          </h2>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <div>
                <div className="text-xs font-bold text-white">{userProfile.documents.resumeName}</div>
                <div className="text-[10px] text-slate-400">Updated: {userProfile.documents.resumeUpdated} • Verified by OCR</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
              Active Resume
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
