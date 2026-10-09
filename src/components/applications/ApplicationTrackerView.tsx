import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  Building2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';

interface ApplicationTrackerViewProps {
  applications: Application[];
  onUpdateApplicationStatus: (appId: string, newStatus: ApplicationStatus, note: string) => void;
  setActiveView: (view: string) => void;
}

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  applications,
  onUpdateApplicationStatus,
  setActiveView,
}) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(applications[0] || null);

  const pipelineStages: ApplicationStatus[] = [
    'Recommended',
    'Viewed',
    'Interested',
    'Reviewing',
    'Consent Approved',
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview',
    'Selected',
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    return pipelineStages.indexOf(status);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Central Application Tracker</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
              Unified Across All Sectors
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            One consolidated dashboard tracking private tech jobs, government examination applications, internships, and postgraduate university admissions.
          </p>
        </div>

        <button
          onClick={() => setActiveView('opportunities')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5 self-start md:self-auto"
        >
          <span>Find More Opportunities</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Applications Table + Active Selected Pipeline Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Applications List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            Active Opportunity Submissions ({applications.length})
          </h2>

          <div className="space-y-2.5">
            {applications.map((app) => {
              const isSelected = selectedApp?.id === app.id;
              const typeColor =
                app.type === 'private_job'
                  ? 'text-indigo-400 bg-indigo-500/10'
                  : app.type === 'government'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : app.type === 'higher_education'
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-cyan-400 bg-cyan-500/10';

              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${typeColor}`}>
                        {app.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {app.organization}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{app.opportunityTitle}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>Applied: {app.appliedDate}</span>
                      {app.consentId && (
                        <span className="text-indigo-300 font-mono text-[10px]">
                          • {app.consentId}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {app.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Lifecycle Pipeline (5 cols) */}
        {selectedApp && (
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                10-Stage Status Pipeline
              </span>
              <h3 className="text-base font-extrabold text-white mt-0.5">
                {selectedApp.opportunityTitle}
              </h3>
              <p className="text-xs text-slate-400">{selectedApp.organization}</p>
            </div>

            {/* Visual Pipeline Progress */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {pipelineStages.map((stage, idx) => {
                const currentIdx = getStageIndex(selectedApp.status);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                const historyEntry = selectedApp.statusHistory.find((h) => h.status === stage);

                return (
                  <div key={stage} className="flex items-start gap-3 relative">
                    {/* Connecting line */}
                    {idx < pipelineStages.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 w-0.5 h-8 ${
                          idx < currentIdx ? 'bg-indigo-500' : 'bg-slate-800'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition ${
                        isCurrent
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-indigo-300'
                              : isPassed
                              ? 'text-white'
                              : 'text-slate-500'
                          }`}
                        >
                          {stage}
                        </span>
                        {historyEntry && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {historyEntry.timestamp}
                          </span>
                        )}
                      </div>
                      {historyEntry && (
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {historyEntry.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Advance Status Demo Tool */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>Simulate Status Advance</span>
                <span className="text-[10px] text-indigo-400">Recruiter / System Action</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onUpdateApplicationStatus(
                      selectedApp.id,
                      'Interview',
                      'Technical interview invitation dispatched'
                    )
                  }
                  className="flex-1 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-xs font-medium transition"
                >
                  Move to Interview
                </button>
                <button
                  onClick={() =>
                    onUpdateApplicationStatus(
                      selectedApp.id,
                      'Selected',
                      'Candidate selected! Offer letter generated'
                    )
                  }
                  className="flex-1 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 text-xs font-medium transition"
                >
                  Move to Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
