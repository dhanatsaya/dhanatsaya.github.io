import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Building2,
  MapPin,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Briefcase,
  Landmark,
  GraduationCap,
} from 'lucide-react';
import { Opportunity, OpportunityType, Application } from '../../types';

interface OpportunityFinderViewProps {
  opportunities: Opportunity[];
  applications: Application[];
  onSelectBreakdown: (opp: Opportunity) => void;
  onOpenConsent: (opp: Opportunity) => void;
}

export const OpportunityFinderView: React.FC<OpportunityFinderViewProps> = ({
  opportunities,
  applications,
  onSelectBreakdown,
  onOpenConsent,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const typeTabs: { id: string; label: string; icon: any; count: number }[] = [
    { id: 'all', label: 'All Opportunities', icon: Sparkles, count: opportunities.length },
    { id: 'private_job', label: 'Private Jobs', icon: Briefcase, count: opportunities.filter((o) => o.type === 'private_job').length },
    { id: 'internship', label: 'Internships', icon: Clock, count: opportunities.filter((o) => o.type === 'internship').length },
    { id: 'government', label: 'Government & Exams', icon: Landmark, count: opportunities.filter((o) => o.type === 'government').length },
    { id: 'higher_education', label: 'Higher Education', icon: GraduationCap, count: opportunities.filter((o) => o.type === 'higher_education').length },
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = selectedType === 'all' || opp.type === selectedType;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Unified Opportunity Finder</h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              AI Powered
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Personalized matches dynamically scored across Higher Education, Private Jobs, Internships, and Central/State Government exams.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, skills, orgs..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {typeTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Opportunity List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => {
          const existingApp = applications.find((a) => a.opportunityId === opp.id);
          const score = opp.matchScore || 80;
          const scoreBadgeColor =
            score >= 85
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : score >= 75
              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30';

          return (
            <div
              key={opp.id}
              className="p-5 rounded-2xl glass-card border border-slate-800/90 hover:border-indigo-500/50 transition space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {opp.organization}
                    </span>
                    {opp.verified && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Post
                      </span>
                    )}
                    <span className="text-xs text-slate-500">• Sector: {opp.sector}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white">{opp.title}</h3>
                </div>

                {/* Score Pill */}
                <div className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-2 shrink-0 self-start ${scoreBadgeColor}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{score}% Match Score</span>
                </div>
              </div>

              {/* Specs & Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opp.location} ({opp.workMode})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{opp.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Deadline: {opp.deadline}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Required: </span>
                  <span className="font-semibold text-white">{opp.requiredEducation}</span>
                </div>
              </div>

              {/* Transparent Why matching snippet */}
              <div className="space-y-1.5 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 text-slate-400">
                  <span className="font-bold text-slate-300">Required Skills:</span>
                  {opp.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {opp.missingSkills && opp.missingSkills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-amber-300 pt-1">
                    <span className="font-medium text-slate-400">Missing from portfolio:</span>
                    {opp.missingSkills.map((sk) => (
                      <span key={sk} className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                        ⚠️ {sk}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectBreakdown(opp)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Factor Score Breakdown & Reasons</span>
                </button>

                <div className="flex items-center gap-2">
                  {existingApp ? (
                    <span className="px-3.5 py-2 rounded-xl bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Status: {existingApp.status}
                    </span>
                  ) : (
                    <button
                      onClick={() => onOpenConsent(opp)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
                    >
                      <span>Apply with Consent</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
