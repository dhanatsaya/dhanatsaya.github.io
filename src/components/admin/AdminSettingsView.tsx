import React from 'react';
import {
  Sliders,
  Zap,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Play,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { MatchingWeights, AutomationEvent } from '../../types';

interface AdminSettingsViewProps {
  weights: MatchingWeights;
  onUpdateWeights: (newWeights: MatchingWeights) => void;
  automationEvents: AutomationEvent[];
  onSimulateEvent: (type: any, title: string, desc: string, action: string) => void;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({
  weights,
  onUpdateWeights,
  automationEvents,
  onSimulateEvent,
}) => {
  const currentTotal = Math.round(
    (weights.skills +
      weights.education +
      weights.experience +
      weights.certification +
      weights.interest +
      weights.location +
      weights.careerPreference) *
      100
  );

  const handleWeightChange = (key: keyof MatchingWeights, valPercent: number) => {
    const updated = {
      ...weights,
      [key]: valPercent / 100,
    };
    onUpdateWeights(updated);
  };

  const handleResetDefaults = () => {
    onUpdateWeights({
      skills: 0.30,
      education: 0.20,
      experience: 0.10,
      certification: 0.10,
      interest: 0.10,
      location: 0.10,
      careerPreference: 0.10,
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Platform Settings & Scoring Engine</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold">
              Admin Governance
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Configure global deterministic matching weights (Section 7) and monitor the central event-driven automation engine (Section 20 & 21).
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold border border-slate-700 flex items-center gap-1.5 self-start"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Default Weights
        </button>
      </div>

      {/* Module 1: Deterministic Matching Formula Configuration (Section 7) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Dynamic Deterministic Scoring Formula Weights
            </h2>
            <p className="text-xs text-slate-400">
              Modifying these factors instantly recalculates match percentages across all student dashboards and opportunities.
            </p>
          </div>

          <div
            className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${
              currentTotal === 100
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            Total Weights: {currentTotal}% {currentTotal === 100 ? '✓ Balanced' : '⚠️ Must sum to 100%'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'skills' as const, label: 'Skills Overlap & Proficiencies', val: weights.skills, desc: 'Technical & programming competencies' },
            { key: 'education' as const, label: 'Education & Degree Qualification', val: weights.education, desc: 'B.E/B.Tech, CGPA, graduation cutoffs' },
            { key: 'experience' as const, label: 'Experience & Projects', val: weights.experience, desc: 'Internships, project depth & duration' },
            { key: 'certification' as const, label: 'Industry Certifications', val: weights.certification, desc: 'Oracle, AWS, GCP, verified credentials' },
            { key: 'interest' as const, label: 'Student Interests & Sector Fit', val: weights.interest, desc: 'AI, software development, cloud domains' },
            { key: 'location' as const, label: 'Location & Work Mode Fit', val: weights.location, desc: 'Chennai, Tamil Nadu, Remote preferences' },
            { key: 'careerPreference' as const, label: 'Career Goal Alignment', val: weights.careerPreference, desc: 'Aspirations & target role match' },
          ].map((item) => (
            <div key={item.key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">{item.label}</span>
                <span className="font-extrabold text-indigo-400 text-sm">
                  {Math.round(item.val * 100)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={Math.round(item.val * 100)}
                onChange={(e) => handleWeightChange(item.key, Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Module 2: Live Automation Engine (Section 20 & 21) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Event-Driven Automation Engine
            </h2>
            <p className="text-xs text-slate-400">
              Asynchronous event dispatcher responding to profile updates, new jobs, deadlines, and revocations.
            </p>
          </div>
        </div>

        {/* Simulation Buttons (Section 21) */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Simulate Real-time Automation Triggers
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() =>
                onSimulateEvent(
                  'PROFILE_UPDATED',
                  'Profile Skills Updated',
                  'User added React & AWS skills to portfolio',
                  'Recalculated 10 opportunity match scores'
                )
              }
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 font-medium transition"
            >
              <Play className="w-3.5 h-3.5 text-indigo-400" /> Recalculate Matches
            </button>

            <button
              onClick={() =>
                onSimulateEvent(
                  'NEW_OPPORTUNITY',
                  'New Job Published: AI Research Engineer',
                  'Google DeepMind published new Bangalore requisition',
                  'Auto-matched Bavanitha S at 89% score'
                )
              }
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 font-medium transition"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" /> Ingest Opportunity
            </button>

            <button
              onClick={() =>
                onSimulateEvent(
                  'DEADLINE_APPROACHING',
                  'Deadline Alert: ISRO Exam Closes in 3 Days',
                  'Automatic reminder rule triggered for applicant',
                  'Dispatched high-priority SMS & app alert'
                )
              }
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 font-medium transition"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" /> 3-Day Deadline Alert
            </button>

            <button
              onClick={() =>
                onSimulateEvent(
                  'CONSENT_REVOKED',
                  'Consent Revocation Token Invalidation',
                  'Consent token CONSENT-2026-000245 revoked by user',
                  'Invalidated enterprise API access tokens'
                )
              }
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 font-medium transition"
            >
              <Play className="w-3.5 h-3.5 text-rose-400" /> Invalidate Tokens
            </button>
          </div>
        </div>

        {/* Automation Feed List */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            System Automation Event Log
          </span>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {automationEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{evt.title}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                      {evt.eventType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{evt.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {evt.triggeredAction}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{evt.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
