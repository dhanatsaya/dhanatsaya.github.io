import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Eye,
  Calendar,
} from 'lucide-react';
import { Opportunity, UserProfile, ConsentRecord, Application } from '../../types';

interface RecruiterPortalViewProps {
  opportunities: Opportunity[];
  userProfile: UserProfile;
  consentRecords: ConsentRecord[];
  applications: Application[];
  onAddOpportunity: (newOpp: Opportunity) => void;
  onUpdateApplicationStatus: (appId: string, status: any, note: string) => void;
}

export const RecruiterPortalView: React.FC<RecruiterPortalViewProps> = ({
  opportunities,
  userProfile,
  consentRecords,
  applications,
  onAddOpportunity,
  onUpdateApplicationStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'candidates' | 'create' | 'applications'>('candidates');
  const [accessRequested, setAccessRequested] = useState(false);

  // Form states for creating opportunity
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState('IT & Software Services');
  const [requiredEducation, setRequiredEducation] = useState('B.E / B.Tech / MCA');
  const [requiredSkills, setRequiredSkills] = useState('Java, Python, SQL, React');
  const [experienceYears, setExperienceYears] = useState('0–2 years');
  const [location, setLocation] = useState('Chennai, Tamil Nadu');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [salary, setSalary] = useState('₹4,00,000 – ₹7,00,000 LPA');
  const [deadline, setDeadline] = useState('2026-11-20');
  const [createdNotice, setCreatedNotice] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newOpp: Opportunity = {
      id: `opp_recruiter_${Date.now()}`,
      title,
      organization: 'ABC Technologies',
      type: 'private_job',
      sector,
      requiredEducation,
      requiredSkills: requiredSkills.split(',').map((s) => s.trim()),
      experienceYears,
      location,
      workMode,
      salary,
      deadline,
      description: 'Enterprise software engineering role.',
      verified: true,
    };

    onAddOpportunity(newOpp);
    setTitle('');
    setCreatedNotice(true);
    setTimeout(() => setCreatedNotice(false), 3000);
    setActiveTab('candidates');
  };

  const abcApplications = applications.filter((a) => a.organization.includes('ABC'));
  const activeAbcConsents = consentRecords.filter(
    (c) => c.orgName.includes('ABC') && c.status === 'ACTIVE'
  );

  return (
    <div className="space-y-6">
      {/* Recruiter Header */}
      <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">ABC Technologies Recruiter Portal</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                Verified Enterprise Recruiter
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Privacy-preserving candidate discovery & application management. Candidate personal contact details remain protected until explicit approval.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('create')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Post New Opportunity
          </button>
        </div>
      </div>

      {createdNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Opportunity published successfully! Matching Engine automatically ingested and ranked eligible candidates.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'candidates', label: 'Candidate Search (Consent-Filtered)', icon: Users },
          { id: 'applications', label: 'Applicant Pipeline & Consents', icon: Clock, count: abcApplications.length },
          { id: 'create', label: 'Create Opportunity Requisition', icon: Plus },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* 1. Candidate Search Tab (Privacy-Preserving Section 12) */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>
              Showing candidates who opted into <strong>Recruiter Discovery</strong>. Full contact and documents unlocked upon consent approval.
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> RBAC Protected
            </span>
          </div>

          {/* Candidate Card */}
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base border border-indigo-500/30">
                  {userProfile.personal.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-white">
                      {activeAbcConsents.length > 0 ? userProfile.personal.name : 'Candidate #10245 (Verified)'}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      91% Opportunity Fit
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {userProfile.education.degree} in {userProfile.education.branch} • {userProfile.education.college}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Academic CGPA</span>
                <span className="text-base font-extrabold text-emerald-400">{userProfile.education.cgpa} / 10.0</span>
              </div>
            </div>

            {/* Skills & Badges */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-400 block">Verified Technical Competencies:</span>
              <div className="flex flex-wrap gap-1.5">
                {userProfile.skills.map((s) => (
                  <span key={s.id} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Details Privacy Notice */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                {activeAbcConsents.length > 0 ? (
                  <span className="text-emerald-400 font-semibold">
                    Authorized Contact Shared: {userProfile.personal.email} • {userProfile.personal.phone}
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Phone & Email hidden by student privacy settings. Access request required.
                  </span>
                )}
              </div>

              {activeAbcConsents.length === 0 && (
                <button
                  onClick={() => setAccessRequested(true)}
                  disabled={accessRequested}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs"
                >
                  {accessRequested ? 'Access Request Sent' : 'Request Resume & Contact'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Applicant Pipeline Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-3">
          {abcApplications.map((app) => (
            <div key={app.id} className="p-4 rounded-xl glass-card border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-white">{app.opportunityTitle}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Applicant: <strong>{userProfile.personal.name}</strong></span>
                    <span>• Applied: {app.appliedDate}</span>
                    <span className="text-emerald-400 font-mono text-[10px]">• Consent: {app.consentId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {app.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onUpdateApplicationStatus(app.id, 'Interview', 'Interview slot confirmed for 14-Oct')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" /> Schedule Interview
                </button>
                <button
                  onClick={() => onUpdateApplicationStatus(app.id, 'Selected', 'Offer letter generated')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Extend Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Create Opportunity Tab (Section 11) */}
      {activeTab === 'create' && (
        <form onSubmit={handleCreate} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            Create Opportunity Requisition (Section 11)
          </h2>
          <p className="text-xs text-slate-400">
            Publish an opportunity into the AI Opportunity Connect engine. The deterministic matching engine will instantly match eligible candidates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Opportunity Position Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Junior Software Developer"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Sector</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Required Education</label>
              <input
                type="text"
                value={requiredEducation}
                onChange={(e) => setRequiredEducation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Location & Work Mode</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  required
                />
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Salary Range / CTC</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Application Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Experience Years</label>
              <input
                type="text"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Publish Opportunity to Platform
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
