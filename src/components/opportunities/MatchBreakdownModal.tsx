import React from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Opportunity, MatchingWeights } from '../../types';

interface MatchBreakdownModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onOpenConsent: (opp: Opportunity) => void;
  weights: MatchingWeights;
}

export const MatchBreakdownModal: React.FC<MatchBreakdownModalProps> = ({
  opportunity,
  onClose,
  onOpenConsent,
  weights,
}) => {
  if (!opportunity) return null;

  const f = opportunity.factors || {
    skillsScore: 85,
    educationScore: 100,
    experienceScore: 70,
    certScore: 80,
    interestScore: 90,
    locationScore: 100,
    careerPrefScore: 90,
    totalScore: opportunity.matchScore || 86,
  };

  const factorRows = [
    { name: 'Skills & Tech Stack', score: f.skillsScore, weight: Math.round(weights.skills * 100) },
    { name: 'Education & Degree', score: f.educationScore, weight: Math.round(weights.education * 100) },
    { name: 'Experience & Projects', score: f.experienceScore, weight: Math.round(weights.experience * 100) },
    { name: 'Certifications', score: f.certScore, weight: Math.round(weights.certification * 100) },
    { name: 'Role Interests', score: f.interestScore, weight: Math.round(weights.interest * 100) },
    { name: 'Location Preference', score: f.locationScore, weight: Math.round(weights.location * 100) },
    { name: 'Career Alignment', score: f.careerPrefScore, weight: Math.round(weights.careerPreference * 100) },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-scaleIn">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Transparent Matching Engine
              </span>
              <span className="text-xs text-slate-400">{opportunity.organization}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{opportunity.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Big Score Callout */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-500/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-xl font-extrabold text-white shadow-lg shadow-indigo-600/40">
                {opportunity.matchScore}%
              </div>
              <div>
                <div className="font-bold text-white text-sm">Deterministic Match Score</div>
                <div className="text-xs text-slate-400">
                  Calculated against authorized single portfolio
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-slate-400">
              Deterministic Weights: <span className="text-emerald-400 font-bold">100% Configured</span>
            </div>
          </div>

          {/* Factor Breakdown Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Factor Scoring Breakdown
            </h3>
            <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Factor</th>
                    <th className="p-2.5">Factor Score</th>
                    <th className="p-2.5">Weight</th>
                    <th className="p-2.5 text-right">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                  {factorRows.map((row) => (
                    <tr key={row.name} className="hover:bg-slate-800/30">
                      <td className="p-2.5 font-medium text-slate-200">{row.name}</td>
                      <td className="p-2.5">
                        <span className="font-bold text-white">{row.score}%</span>
                      </td>
                      <td className="p-2.5 text-slate-400">{row.weight}%</td>
                      <td className="p-2.5 text-right text-indigo-300 font-bold">
                        {((row.score * row.weight) / 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-800/60 font-bold text-white">
                    <td className="p-2.5">TOTAL MATCH</td>
                    <td className="p-2.5">--</td>
                    <td className="p-2.5">100%</td>
                    <td className="p-2.5 text-right text-emerald-400 font-extrabold text-sm">
                      {opportunity.matchScore}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why this matches */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Why This Matches
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs text-slate-300">
              {opportunity.matchedReasons && opportunity.matchedReasons.length > 0 ? (
                opportunity.matchedReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="leading-relaxed">{reason}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-slate-400">
                  <span>✅ Profile qualifications, branch, and preferred skills fulfill job requirements.</span>
                </div>
              )}
            </div>
          </div>

          {/* Missing Skills */}
          {opportunity.missingSkills && opportunity.missingSkills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.missingSkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1"
                  >
                    ⚠️ {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white mb-0.5">AI Recommendation</div>
              <p className="text-xs text-indigo-200 leading-relaxed">
                {opportunity.recommendation || 'Keep your portfolio updated to maintain optimal match rankings.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Protected by Privacy & Consent Engine
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenConsent(opportunity);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <span>Apply with Consent</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
