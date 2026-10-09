import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Lock,
  CheckSquare,
  Square,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { Opportunity, UserProfile } from '../../types';

interface ConsentModalProps {
  opportunity: Opportunity | null;
  userProfile: UserProfile;
  onClose: () => void;
  onApproveAndApply: (opp: Opportunity, selectedFields: string[]) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  opportunity,
  userProfile,
  onClose,
  onApproveAndApply,
}) => {
  if (!opportunity) return null;

  const defaultFields = [
    { id: 'name', label: 'Full Legal Name', value: userProfile.personal.name, defaultChecked: true },
    { id: 'education', label: 'Academic Qualification & CGPA', value: `${userProfile.education.degree} (${userProfile.education.cgpa} CGPA)`, defaultChecked: true },
    { id: 'skills', label: 'Verified Skills Stack', value: userProfile.skills.map((s) => s.name).join(', '), defaultChecked: true },
    { id: 'resume', label: 'Selected Resume PDF', value: userProfile.documents.resumeName, defaultChecked: true },
    { id: 'phone', label: 'Personal Phone Number', value: userProfile.personal.phone, defaultChecked: false },
    { id: 'email', label: 'Verified Email Address', value: userProfile.personal.email, defaultChecked: false },
    { id: 'certificates', label: 'Certifications & Proofs', value: `${userProfile.achievements.length} verified credentials`, defaultChecked: false },
    { id: 'projects', label: 'Complete Project Repository List', value: `${userProfile.experience.length} projects & internships`, defaultChecked: false },
  ];

  const [selectedFields, setSelectedFields] = useState<string[]>(
    defaultFields.filter((f) => f.defaultChecked).map((f) => f.label)
  );

  const toggleField = (fieldLabel: string) => {
    if (selectedFields.includes(fieldLabel)) {
      setSelectedFields(selectedFields.filter((f) => f !== fieldLabel));
    } else {
      setSelectedFields([...selectedFields, fieldLabel]);
    }
  };

  const handleApprove = () => {
    onApproveAndApply(opportunity, selectedFields);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-scaleIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Data-Sharing Preview & Consent</h2>
              <div className="text-xs text-slate-400">Step 2 of Application Approval Flow</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs max-h-[70vh] overflow-y-auto">
          {/* Target Organization Info */}
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="font-semibold text-white block">{opportunity.organization}</span>
                <span className="text-[11px] text-slate-400">{opportunity.title}</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Verified Entity
            </span>
          </div>

          {/* Privacy Notice */}
          <div className="text-slate-300 leading-relaxed space-y-1">
            <p className="font-semibold text-white">Select Information to Share</p>
            <p className="text-[11px] text-slate-400">
              Only checked attributes will be transmitted. Unchecked items remain strictly hidden from {opportunity.organization}.
            </p>
          </div>

          {/* Checkbox List */}
          <div className="space-y-2 border border-slate-800 rounded-xl p-3 bg-slate-900/40">
            {defaultFields.map((field) => {
              const isChecked = selectedFields.includes(field.label);
              return (
                <div
                  key={field.id}
                  onClick={() => toggleField(field.label)}
                  className={`p-2.5 rounded-lg border transition cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-indigo-950/30 border-indigo-500/40 text-slate-200'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-xs">{field.label}</div>
                    <div className="text-[11px] text-slate-400">{field.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explicit Count Notice */}
          <div className="p-3.5 rounded-xl bg-indigo-950/50 border border-indigo-500/30 flex items-center gap-3">
            <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="text-indigo-200 text-xs leading-relaxed">
              You are about to share <strong className="text-white font-extrabold">{selectedFields.length} pieces of information</strong> with <span className="text-white font-semibold">{opportunity.organization}</span> for the purpose of job application review.
            </div>
          </div>
        </div>

        {/* Footer with Approve & Apply Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            disabled={selectedFields.length === 0}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve & Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
