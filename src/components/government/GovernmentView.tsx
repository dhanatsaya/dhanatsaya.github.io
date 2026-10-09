import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Calendar,
  BookOpen,
  FileText,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  IndianRupee,
} from 'lucide-react';
import { Opportunity, UserProfile } from '../../types';

interface GovernmentViewProps {
  opportunities: Opportunity[];
  userProfile: UserProfile;
  onSelectBreakdown: (opp: Opportunity) => void;
  onOpenConsent: (opp: Opportunity) => void;
}

export const GovernmentView: React.FC<GovernmentViewProps> = ({
  opportunities,
  userProfile,
  onSelectBreakdown,
  onOpenConsent,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'opportunities' | 'exams' | 'calendar' | 'syllabus'>('opportunities');

  const govtOpportunities = opportunities.filter((o) => o.type === 'government');

  const upcomingExams = [
    {
      name: 'ISRO ICRB Centralised Scientist/Engineer Recruitment',
      date: '13 Dec 2026',
      status: 'Admit Card Expected 01-Dec',
      eligibility: 'B.E CSE 65%+ (Matched)',
      seats: 42,
    },
    {
      name: 'TNPSC Combined Technical Services Exam (CTS 2026)',
      date: '10 Jan 2027',
      status: 'Application Active',
      eligibility: 'B.E CSE / ECE (Matched)',
      seats: 68,
    },
    {
      name: 'SBI Specialist Cadre Officer (SCO IT)',
      date: '24 Jan 2027',
      status: 'Registration Live',
      eligibility: 'B.E CSE / IT (Matched)',
      seats: 110,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Government Opportunities & Career Portal</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Source Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Central & State Government technical postings, PSU engineering recruitment, and public sector banking exams matched with your single verified academic portfolio.
          </p>
        </div>

        {/* Warning pill as required by GovCareer spec in Section 25 */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 max-w-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Notice: Always verify criteria against the official gazette notification before final fee submission.</span>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'opportunities', label: 'Verified Postings', icon: Landmark, count: govtOpportunities.length },
          { id: 'exams', label: 'Exam Preparation & Syllabus', icon: BookOpen },
          { id: 'calendar', label: 'Recruitment Calendar', icon: Calendar, count: upcomingExams.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
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

      {/* 1. Verified Postings Tab */}
      {activeSubTab === 'opportunities' && (
        <div className="space-y-4">
          {govtOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/50 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5" />
                      {opp.organization}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      Verified Notification
                    </span>
                    <span className="text-xs text-slate-500">• {opp.sector}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white">{opp.title}</h3>
                </div>

                <div className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center gap-2 self-start">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{opp.matchScore}% Match Score</span>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[11px]">Salary Scale</span>
                  <span className="font-bold text-emerald-400">{opp.salary}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Vacancies</span>
                  <span className="font-bold text-white">{opp.vacancies || 'Multiple'} Positions</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Application Deadline</span>
                  <span className="font-bold text-amber-300">{opp.deadline}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Eligibility Check</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Qualified ({userProfile.education.degree} CSE)
                  </span>
                </div>
              </div>

              {/* Exam Info if available */}
              {opp.examDetails && (
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-indigo-300 font-semibold">
                    <span>Exam: {opp.examDetails.examName}</span>
                    <span className="text-slate-400">Exam Date: <strong>{opp.examDetails.examDate}</strong></span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-slate-400">Syllabus Focus:</span>
                    {opp.examDetails.syllabus.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onSelectBreakdown(opp)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Factor Scoring & Eligibility Analysis</span>
                </button>

                <div className="flex items-center gap-2">
                  {opp.officialUrl && (
                    <a
                      href={opp.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Official Gazette
                    </a>
                  )}
                  <button
                    onClick={() => onOpenConsent(opp)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5"
                  >
                    <span>Autofill & Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Exams & Syllabus Tab */}
      {activeSubTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Syllabus & Core Subject Blueprint
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardized Computer Science syllabus aligned with GATE, ISRO ICRB, and State Technical Services.
            </p>
            <div className="space-y-2 text-xs">
              {[
                { topic: 'Computer Networks', weight: '15%', hours: '20 Hrs Study Plan' },
                { topic: 'Operating Systems & Concurrency', weight: '15%', hours: '25 Hrs Study Plan' },
                { topic: 'Database Management Systems & SQL', weight: '20%', hours: '30 Hrs Study Plan' },
                { topic: 'Data Structures & Algorithms', weight: '25%', hours: '45 Hrs Study Plan' },
                { topic: 'Theory of Computation & Compilers', weight: '15%', hours: '20 Hrs Study Plan' },
                { topic: 'General Aptitude & Reasoning', weight: '10%', hours: '15 Hrs Study Plan' },
              ].map((item) => (
                <div key={item.topic} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between">
                  <span className="font-semibold text-white">{item.topic}</span>
                  <span className="text-indigo-400 font-mono">{item.weight} • {item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Previous Papers & Mock Assessments
            </h3>
            <div className="space-y-2.5 text-xs">
              {[
                { title: 'ISRO ICRB 2024 Computer Science Question Paper', size: '2.4 MB PDF', solved: true },
                { title: 'ISRO ICRB 2023 Technical Paper & Answer Key', size: '3.1 MB PDF', solved: true },
                { title: 'TNPSC Assistant System Engineer 2024 Model Test', size: '1.8 MB PDF', solved: true },
                { title: 'Full Length Comprehensive 100-Question Mock Test 1', size: 'Online Test', solved: false },
              ].map((paper, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{paper.title}</div>
                    <div className="text-[10px] text-slate-400">{paper.size} • Verified Solutions Included</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 text-[11px] font-bold border border-indigo-500/30">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Calendar Tab */}
      {activeSubTab === 'calendar' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Central & State Exam Schedule (2026 - 2027)
          </h3>
          <div className="space-y-3">
            {upcomingExams.map((exam, i) => (
              <div key={i} className="p-4 rounded-xl glass-card border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">{exam.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>Seats: <strong className="text-white">{exam.seats}</strong></span>
                    <span>• {exam.eligibility}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-400 block">{exam.date}</span>
                    <span className="text-[10px] text-slate-400">{exam.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
