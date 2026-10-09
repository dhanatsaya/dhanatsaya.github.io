import React, { useState } from 'react';
import {
  Sparkles,
  Bell,
  ShieldCheck,
  UserCheck,
  Building2,
  GraduationCap,
  Sliders,
  ChevronDown,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { UserRole, AutomationEvent, UserProfile } from '../../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  userProfile: UserProfile;
  automationEvents: AutomationEvent[];
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  userProfile,
  automationEvents,
  activeView: _activeView,
  setActiveView,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string }> = {
    STUDENT: { label: 'Student / Candidate', icon: UserCheck, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    RECRUITER: { label: 'Recruiter (ABC Tech)', icon: Building2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    COLLEGE_ADMIN: { label: 'Institution (Anna Univ)', icon: GraduationCap, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    SUPER_ADMIN: { label: 'Platform Admin', icon: Sliders, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
              AI OPPORTUNITY CONNECT
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Unified Platform
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            One Portfolio. Every Opportunity. Personalized by AI.
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${roleLabels[currentRole].color}`}
            title="Switch User Role to test different portals"
          >
            {React.createElement(roleLabels[currentRole].icon, { className: 'w-4 h-4' })}
            <span className="hidden md:inline">{roleLabels[currentRole].label}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                Switch Active Role / Portal
              </div>
              {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                const ItemIcon = roleLabels[r].icon;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setShowRoleMenu(false);
                      if (r === 'RECRUITER') setActiveView('recruiter');
                      else if (r === 'COLLEGE_ADMIN') setActiveView('college');
                      else if (r === 'SUPER_ADMIN') setActiveView('admin');
                      else setActiveView('dashboard');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                      currentRole === r
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700/60'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4" />
                    <span>{roleLabels[r].label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Real-time Automation Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Live Automation Feed
                </span>
                <span className="text-[11px] text-indigo-400 cursor-pointer hover:underline" onClick={() => { setActiveView('automation'); setShowNotifications(false); }}>
                  View All Events
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {automationEvents.slice(0, 4).map((evt) => (
                  <div key={evt.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-indigo-300 font-semibold mb-1">
                      <span>{evt.title}</span>
                      <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed mb-1.5">
                      {evt.description}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{evt.triggeredAction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Pill */}
        <button
          onClick={() => setActiveView('portfolio')}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/50 transition"
        >
          <img
            src={userProfile.personal.avatar}
            alt={userProfile.personal.name}
            className="w-7 h-7 rounded-full object-cover border border-indigo-400/40"
          />
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-slate-200 leading-none">
              {userProfile.personal.name}
            </div>
            <div className="text-[10px] text-slate-400 leading-none mt-1">
              {userProfile.education.degree} CSE (8.8 CGPA)
            </div>
          </div>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 ml-0.5" title="Verified Portfolio" />
        </button>
      </div>
    </header>
  );
};
