import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Building2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  History,
  FileText,
} from 'lucide-react';
import { ConsentRecord, PrivacySetting } from '../../types';

interface PrivacyCenterViewProps {
  privacySettings: PrivacySetting[];
  onTogglePrivacySetting: (id: string) => void;
  consentRecords: ConsentRecord[];
  onRevokeConsent: (consentId: string, reason: string) => void;
}

export const PrivacyCenterView: React.FC<PrivacyCenterViewProps> = ({
  privacySettings,
  onTogglePrivacySetting,
  consentRecords,
  onRevokeConsent,
}) => {
  const [revokingConsent, setRevokingConsent] = useState<ConsentRecord | null>(null);
  const [revocationReason, setRevocationReason] = useState('Application cycle concluded');

  const handleConfirmWithdraw = () => {
    if (revokingConsent) {
      onRevokeConsent(revokingConsent.id, revocationReason);
      setRevokingConsent(null);
    }
  };

  const activeCount = consentRecords.filter((c) => c.status === 'ACTIVE').length;
  const revokedCount = consentRecords.filter((c) => c.status === 'REVOKED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Privacy & Consent Center</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Unauthorized Data Sharing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Organizations and institutions only access authorized profile attributes with explicit, cryptographic-logged user consent. You can withdraw access at any time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <div className="text-xl font-extrabold text-emerald-400">{activeCount}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Active Consents</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <div className="text-xl font-extrabold text-slate-400">{revokedCount}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Revoked Access</div>
          </div>
        </div>
      </div>

      {/* Module 1: Who Can Access My Data? (Permissions Checklist) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Who can access my data?</h2>
          </div>
          <span className="text-[11px] text-slate-400">Institutional & Platform Access Permissions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {privacySettings.map((setting) => (
            <div
              key={setting.id}
              onClick={() => onTogglePrivacySetting(setting.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 ${
                setting.granted
                  ? 'bg-slate-900/70 border-indigo-500/40'
                  : 'bg-slate-900/30 border-slate-800 text-slate-400'
              }`}
            >
              <div className="space-y-1">
                <div className="font-bold text-white text-xs flex items-center gap-2">
                  <span>{setting.title}</span>
                  {setting.granted ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                      Authorized
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-semibold">
                      Blocked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{setting.description}</p>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition duration-300 shrink-0 ${
                  setting.granted ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                    setting.granted ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Module 2: Active Data Consents & Audit Trail */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Specific Organization Consent Records</h2>
          </div>
          <span className="text-xs text-slate-400">Section 17 & 18 Audit Trail</span>
        </div>

        <div className="space-y-3">
          {consentRecords.map((c) => (
            <div
              key={c.id}
              className={`p-5 rounded-2xl glass-card border transition space-y-3 ${
                c.status === 'ACTIVE'
                  ? 'border-slate-800 hover:border-slate-700'
                  : 'border-slate-800/40 opacity-70 bg-slate-950/40'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono text-xs font-bold">
                    {c.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {c.orgName}
                    </h3>
                    <p className="text-[11px] text-slate-400">Opportunity: {c.opportunityTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                      c.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {c.status}
                  </span>

                  {c.status === 'ACTIVE' && (
                    <button
                      onClick={() => setRevokingConsent(c)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Withdraw Access
                    </button>
                  )}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-400 block text-[11px]">Authorized Information Shared:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {c.sharedFields.map((f) => (
                      <span key={f} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] border border-slate-700">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Authorized Purpose:</span>
                  <span className="text-slate-200 font-medium block mt-1">{c.purpose}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Consent Timestamp:</span>
                  <div className="flex items-center gap-1 text-slate-300 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Revoked info if status is revoked */}
              {c.status === 'REVOKED' && (
                <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>
                    Access Revoked on <strong>{c.revokedAt}</strong>. Reason: {c.revocationReason}. All data tokens invalidated.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal for Consent Withdrawal (Section 18) */}
      {revokingConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Withdraw Data Access?</h3>
                <p className="text-xs text-slate-400">Revocation is permanent & immediate</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <strong className="text-white">{revokingConsent.orgName}</strong> will no longer have access to information controlled by consent record <strong className="text-indigo-300">{revokingConsent.id}</strong>.
            </p>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Reason for Revocation</label>
              <input
                type="text"
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                placeholder="Reason..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRevokingConsent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdraw}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Withdraw Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
