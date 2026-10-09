import React from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ResumeAnalyzerViewProps {
  userProfile: UserProfile;
}

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  userProfile,
}) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">AI Resume & Portfolio Analyzer</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
              OCR & ATS Parsing Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Automated verification comparing your uploaded resume with your Unified Portfolio data and target employer applicant tracking system (ATS) benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" /> Upload New Version
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: ATS Score & Status (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">{userProfile.documents.resumeName}</h2>
              <p className="text-xs text-slate-400">Last verified: {userProfile.documents.resumeUpdated}</p>
            </div>

            {/* Score Ring */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-3xl font-black text-emerald-400">88 / 100</div>
              <div className="text-xs font-bold text-slate-200 mt-1">ATS Compatibility Rating</div>
              <div className="text-[11px] text-slate-400">Optimized for Enterprise ATS Filters</div>
            </div>

            <div className="space-y-2 text-xs text-left pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">File Format:</span>
                <span className="text-white font-mono">PDF (Text-Selectable)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Section Headers:</span>
                <span className="text-emerald-400 font-semibold">100% Parsable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Privacy:</span>
                <span className="text-indigo-400 font-semibold">Protected by Consent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Keyword Matches & Recommendations (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Extracted Skills & Keywords
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Python (Core & OOP)',
                'Java (SE 11 Certified)',
                'SQL & Relational DB',
                'FastAPI Microservices',
                'Machine Learning Pipeline',
                'HTML5 & Modern CSS',
                'Smart India Hackathon Finalist',
                'Git Version Control',
              ].map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              High-Impact Resume Improvements Suggested by AI
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-300">Quantify Engineering Results:</div>
                <p className="text-slate-300 leading-relaxed">
                  Include metric impact in your <em>AI Smart Health Predictor</em> project (e.g. "Achieved 94.2% diagnostic accuracy on a dataset of 12,000 clinical records").
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-300">Add Target Cloud Keywords:</div>
                <p className="text-slate-300 leading-relaxed">
                  Mention Docker containerization and cloud hosting on Google Cloud to qualify for 6 additional Tier-1 backend roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
