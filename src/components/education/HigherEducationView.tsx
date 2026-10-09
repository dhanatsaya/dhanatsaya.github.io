import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  Compass,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Building,
  Award,
} from 'lucide-react';
import { Opportunity, UserProfile } from '../../types';

interface HigherEducationViewProps {
  opportunities: Opportunity[];
  userProfile: UserProfile;
  onSelectBreakdown: (opp: Opportunity) => void;
  onOpenConsent: (opp: Opportunity) => void;
}

export const HigherEducationView: React.FC<HigherEducationViewProps> = ({
  opportunities,
  userProfile,
  onSelectBreakdown,
  onOpenConsent,
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'cutoff' | 'counselling'>('courses');
  const [testScore, setTestScore] = useState<number>(userProfile.education.cgpa * 10);
  const [selectedExamType, setSelectedExamType] = useState('TANCET');

  const eduOpportunities = opportunities.filter((o) => o.type === 'higher_education');

  const collegesList = [
    {
      name: 'College of Engineering Guindy (Anna University)',
      location: 'Chennai, Tamil Nadu',
      programs: ['M.E Software Engineering', 'M.E Computer Science', 'M.Tech IT'],
      cutoffThreshold: 85,
      fellowship: 'TNSCST Merit Fellowship',
    },
    {
      name: 'Indian Institute of Technology Madras (IITM)',
      location: 'Chennai, Tamil Nadu',
      programs: ['M.Tech AI & Data Science', 'MS by Research (CSE)'],
      cutoffThreshold: 90,
      fellowship: 'MoE Fellowship ₹12,400/mo',
    },
    {
      name: 'PSG College of Technology',
      location: 'Coimbatore, Tamil Nadu',
      programs: ['M.Tech Cloud Computing', 'M.E Computer Science'],
      cutoffThreshold: 80,
      fellowship: 'Industry Sponsored Assistantship',
    },
    {
      name: 'National Institute of Technology Tiruchirappalli (NITT)',
      location: 'Trichy, Tamil Nadu',
      programs: ['M.Tech Data Analytics', 'M.Tech CSE'],
      cutoffThreshold: 88,
      fellowship: 'Institute Stipend Eligible',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Higher Education & AI Counselling</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
              Postgraduate Pathways
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Discover premier Masters programs, calculate your cutoff eligibility, and receive AI-guided academic counselling based on your undergraduate performance ({userProfile.education.cgpa} CGPA).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-purple-300 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span>Undergraduate: <strong>{userProfile.education.degree} CSE</strong></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'courses', label: 'Recommended Masters & Courses', icon: GraduationCap, count: eduOpportunities.length },
          { id: 'cutoff', label: 'Cutoff Calculator', icon: Calculator },
          { id: 'counselling', label: 'AI Counselling Questionnaire', icon: Compass },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
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

      {/* 1. Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {eduOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/50 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      {opp.organization}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
                      Institute of Eminence
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-white">{opp.title}</h3>
                </div>

                <div className="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold text-xs flex items-center gap-2 self-start">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{opp.matchScore}% Academic Fit</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[11px]">Fellowship Stipend</span>
                  <span className="font-bold text-emerald-400">{opp.salary}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Duration</span>
                  <span className="font-bold text-white">{opp.cutoffDetails?.courseDuration || '2 Years'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Eligibility Benchmark</span>
                  <span className="font-bold text-purple-300">{opp.cutoffDetails?.eligibilityRank || 'GATE / Merit'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onSelectBreakdown(opp)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Factor Scoring & Qualification Breakdown</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenConsent(opp)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition flex items-center gap-1.5"
                  >
                    <span>Apply for Counselling</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Cutoff Calculator Tab */}
      {activeTab === 'cutoff' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-400" />
              Interactive Cutoff Calculator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Input your normalized score, TANCET percentile, or GATE score to calculate verified institutional cutoff probabilities.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Counselling Exam Type</label>
                <select
                  value={selectedExamType}
                  onChange={(e) => setSelectedExamType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="TANCET">TANCET (Tamil Nadu Common Entrance Test)</option>
                  <option value="GATE">GATE (Graduate Aptitude Test in Engineering)</option>
                  <option value="CGPA">Normalized B.E UG CGPA (Scaled to 100)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Your Score / Percentile: <strong className="text-purple-400">{testScore}</strong>
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={testScore}
                  onChange={(e) => setTestScore(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
                Current B.E CGPA ({userProfile.education.cgpa}) maps to an estimated score of <strong>88.0%</strong>.
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <h3 className="font-bold text-sm text-white">Eligible Institutions at Score {testScore}</h3>
            {collegesList.map((col) => {
              const isEligible = testScore >= col.cutoffThreshold;
              return (
                <div
                  key={col.name}
                  className={`p-4 rounded-xl border transition ${
                    isEligible
                      ? 'bg-slate-900/80 border-emerald-500/40'
                      : 'bg-slate-900/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{col.name}</h4>
                      <div className="text-xs text-slate-400">{col.location}</div>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-extrabold uppercase border ${
                        isEligible
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      {isEligible ? 'High Probability' : 'Above Threshold'}
                    </span>
                  </div>

                  <div className="mt-2 text-xs flex flex-wrap gap-1.5">
                    {col.programs.map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Counselling Tab */}
      {activeTab === 'counselling' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            AI Academic Advisory & Counselling
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-300">Direct Masters vs Corporate Career:</span>
              <p className="text-slate-300 leading-relaxed">
                With your strong technical foundation in Python, Java, and 8.8 CGPA, you are equally competitive for direct junior engineering placements or sponsored M.Tech / M.E programs with research stipends.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Target Specialization Recommendation:</span>
              <p className="text-slate-300 leading-relaxed">
                Your stated interest in <strong>AI</strong> and <strong>Software Development</strong> makes M.Tech in Artificial Intelligence & Data Science (IIT Madras) or M.E in Software Engineering (Anna University CEG) ideal 100% academic matches.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
