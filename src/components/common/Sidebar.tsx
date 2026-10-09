import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Briefcase,
  Landmark,
  GraduationCap,
  BookOpen,
  FileCheck2,
  ShieldCheck,
  Bot,
  Zap,
  Building2,
  Sliders,
  FileText,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  currentRole: UserRole;
  applicationsCount: number;
  activeConsentsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  currentRole,
  applicationsCount,
  activeConsentsCount,
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'My Portfolio', icon: UserCheck, badge: 'Verified' },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase, badge: 'AI Matched' },
    { id: 'government', label: 'Government', icon: Landmark, badge: 'Verified' },
    { id: 'education', label: 'Higher Education', icon: GraduationCap },
    { id: 'learning', label: 'Learning & Skill Gaps', icon: BookOpen },
    { id: 'applications', label: 'Application Tracker', icon: FileCheck2, count: applicationsCount },
    { id: 'privacy', label: 'Privacy & Consent', icon: ShieldCheck, count: activeConsentsCount },
    { id: 'assistant', label: 'AI Career Assistant', icon: Bot, isAi: true },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'automation', label: 'Automation Engine', icon: Zap },
  ];

  const roleSpecificItems = [
    { id: 'recruiter', label: 'Recruiter Portal', icon: Building2, forRole: 'RECRUITER' },
    { id: 'college', label: 'College / Institution', icon: GraduationCap, forRole: 'COLLEGE_ADMIN' },
    { id: 'admin', label: 'Scoring Formula Settings', icon: Sliders, forRole: 'SUPER_ADMIN' },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/70 backdrop-blur-xl flex flex-col justify-between p-3 select-none">
      <div className="space-y-6">
        {/* Core Navigation */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1">
            Platform Navigation
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'text-white'
                          : item.isAi
                          ? 'text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Portals & Management Navigation */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1">
            Dedicated Portals
          </div>
          <div className="space-y-1">
            {roleSpecificItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const isCurrentRoleMatch = currentRole === item.forRole;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isCurrentRoleMatch
                      ? 'bg-slate-800/80 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  {isCurrentRoleMatch && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active Role" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Unified Authorized Data</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          Created once. Accessed everywhere with explicit consent.
        </p>
      </div>
    </aside>
  );
};
