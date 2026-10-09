import React from 'react';
import {
  Sparkles,
  Briefcase,
  Landmark,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import { UserProfile, Opportunity, Application } from '../../types';

interface DashboardViewProps {
  userProfile: UserProfile;
  opportunities: Opportunity[];
  applications: Application[];
  setActiveView: (view: string) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  opportunities,
  applications,
  setActiveView,
  onSelectOpportunity,
}) => {
  // Sort opportunities by matchScore descending
  const topRecommendations = [...opportunities]
    .filter((o) => (o.matchScore || 0) >= 70)
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 4);

  const privateJobsCount = opportunities.filter((o) => o.type === 'private_job').length;
  const govtJobsCount = opportunities.filter((o) => o.type === 'government').length;
  const eduCount = opportunities.filter((o) => o.type === 'higher_education').length;
  const internCount = opportunities.filter((o) => o.type === 'internship').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900/80 to-purple-900/50 border border-indigo-500/30 p-6 md:p-8 backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Unified Portfolio Authorized & Live
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {userProfile.personal.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Your verified portfolio is actively matched against higher education, private engineering careers, internships, and verified government exams.
            </p>
          </div>

          {/* Career Readiness Score Badge */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 shadow-inner">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500"
                  strokeDasharray="84, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-bold text-base text-white">84%</span>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Career Readiness</div>
              <div className="text-sm font-bold text-indigo-300 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                High Fit Profile
              </div>
              <div className="text-[10px] text-slate-500">Based on 7 scoring factors</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Opportunity Category Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveView('opportunities')}
          className="glass-card p-4 rounded-xl text-left hover:border-indigo-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Matched
            </span>
          </div>
          <div className="text-2xl font-black text-white">{privateJobsCount}</div>
          <div className="text-xs text-slate-400 group-hover:text-indigo-300 transition">Private Sector Jobs</div>
        </button>

        <button
          onClick={() => setActiveView('government')}
          className="glass-card p-4 rounded-xl text-left hover:border-indigo-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              Verified
            </span>
          </div>
          <div className="text-2xl font-black text-white">{govtJobsCount}</div>
          <div className="text-xs text-slate-400 group-hover:text-emerald-300 transition">Govt & Exams</div>
        </button>

        <button
          onClick={() => setActiveView('education')}
          className="glass-card p-4 rounded-xl text-left hover:border-indigo-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Eligible
            </span>
          </div>
          <div className="text-2xl font-black text-white">{eduCount}</div>
          <div className="text-xs text-slate-400 group-hover:text-purple-300 transition">Higher Education</div>
        </button>

        <button
          onClick={() => setActiveView('opportunities')}
          className="glass-card p-4 rounded-xl text-left hover:border-indigo-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
              Open
            </span>
          </div>
          <div className="text-2xl font-black text-white">{internCount}</div>
          <div className="text-xs text-slate-400 group-hover:text-cyan-300 transition">Internships</div>
        </button>
      </div>

      {/* Main Grid: Recommended Opportunities & Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Recommended Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">
                AI Recommended Opportunities
              </h2>
            </div>
            <button
              onClick={() => setActiveView('opportunities')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
            >
              View All Opportunities <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topRecommendations.map((opp) => (
              <div
                key={opp.id}
                className="glass-card p-4 rounded-xl hover:border-indigo-500/60 transition group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {opp.organization}
                    </span>
                    <span className="text-xs text-slate-400">• {opp.location}</span>
                    <span className="text-xs text-slate-400">• {opp.workMode}</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition">
                    {opp.title}
                  </h3>
                  {/* Transparent Why matching preview */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 pt-1">
                    <span className="font-medium text-slate-300">Why matched:</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                      Python + Java + CSE
                    </span>
                    <span className="text-slate-400 text-[11px]">• Matches preferred career goal</span>
                  </div>
                </div>

                {/* Score & Action */}
                <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-indigo-400">
                      {opp.matchScore}% Match
                    </div>
                    <div className="text-[10px] text-slate-400">Transparent AI Score</div>
                  </div>
                  <button
                    onClick={() => {
                      onSelectOpportunity(opp);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Skill Gap & Active Applications */}
        <div className="space-y-6">
          {/* Skill Gaps Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Detected Skill Gaps
              </h3>
              <button
                onClick={() => setActiveView('learning')}
                className="text-xs text-indigo-400 hover:underline"
              >
                Roadmap
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Target: <strong className="text-slate-200">{userProfile.career.careerGoal}</strong>
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Python (Verified)</span>
                  <span className="text-emerald-400 font-bold">90%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">SQL (Database)</span>
                  <span className="text-indigo-400 font-bold">80%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Data Structures & Alg.</span>
                  <span className="text-amber-400 font-bold">45%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">React (Frontend Framework)</span>
                  <span className="text-rose-400 font-bold">20%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView('learning')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 transition border border-slate-700"
            >
              Take Skill Assessment to Boost Match
            </button>
          </div>

          {/* Active Applications Quick Look */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                Live Application Pipeline
              </h3>
              <button
                onClick={() => setActiveView('applications')}
                className="text-xs text-indigo-400 hover:underline"
              >
                Track All
              </button>
            </div>

            <div className="space-y-2.5">
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-200">{app.opportunityTitle}</div>
                    <div className="text-[11px] text-slate-400">{app.organization}</div>
                  </div>
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>All submissions protected by explicit consent logs.</span>
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
