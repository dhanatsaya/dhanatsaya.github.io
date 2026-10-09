import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  BarChart2,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface CollegeDashboardViewProps {
  userProfile: UserProfile;
}

export const CollegeDashboardView: React.FC<CollegeDashboardViewProps> = ({
  userProfile,
}) => {
  const [selectedDept, setSelectedDept] = useState('CSE');

  const deptData = [
    { code: 'CSE', name: 'Computer Science & Engineering', students: 240, readiness: '86%', avgCgpa: 8.42, placed: '72%' },
    { code: 'IT', name: 'Information Technology', students: 180, readiness: '83%', avgCgpa: 8.25, placed: '68%' },
    { code: 'ECE', name: 'Electronics & Communication', students: 210, readiness: '79%', avgCgpa: 8.18, placed: '61%' },
    { code: 'EEE', name: 'Electrical & Electronics', students: 160, readiness: '74%', avgCgpa: 7.95, placed: '55%' },
    { code: 'MECH', name: 'Mechanical Engineering', students: 220, readiness: '71%', avgCgpa: 7.80, placed: '49%' },
    { code: 'CIVIL', name: 'Civil Engineering', students: 140, readiness: '68%', avgCgpa: 7.65, placed: '42%' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">College / Institution Portal</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase">
                Anna University (CEG)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Authorized institutional view. Monitor department-wide skill distributions, job readiness benchmarks, and counselling records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>Student Consent Active</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-card">
          <div className="flex justify-between items-center text-slate-400 mb-1 text-xs">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">1,150</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Across 6 Engineering Depts</div>
        </div>

        <div className="p-4 rounded-xl glass-card">
          <div className="flex justify-between items-center text-slate-400 mb-1 text-xs">
            <span>Avg Job Readiness</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">82.4%</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">+5.8% from last semester</div>
        </div>

        <div className="p-4 rounded-xl glass-card">
          <div className="flex justify-between items-center text-slate-400 mb-1 text-xs">
            <span>Active Internships</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">412</div>
          <div className="text-[11px] text-slate-400 mt-0.5">35.8% batch participation</div>
        </div>

        <div className="p-4 rounded-xl glass-card">
          <div className="flex justify-between items-center text-slate-400 mb-1 text-xs">
            <span>Counselling Sessions</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">186</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Faculty internal remarks</div>
        </div>
      </div>

      {/* Department Analytics Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-amber-400" />
            Department Performance & Placement Readiness
          </h2>
          <span className="text-xs text-slate-400">Class of 2026 Cohort</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Department</th>
                <th className="p-3">Students</th>
                <th className="p-3">Avg CGPA</th>
                <th className="p-3">Readiness Index</th>
                <th className="p-3">Placement / Offers</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/50">
              {deptData.map((d) => (
                <tr key={d.code} className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">
                    {d.name} <span className="text-slate-400 font-normal">({d.code})</span>
                  </td>
                  <td className="p-3 text-slate-300">{d.students}</td>
                  <td className="p-3 font-semibold text-emerald-400">{d.avgCgpa}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                      {d.readiness}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200">{d.placed}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedDept(d.code)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      View Batch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Details & Counselling Notes (Section 24) */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Staff & Counsellor Confidential Remarks ({selectedDept})
          </h3>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-400" /> Section 24: Internal remarks remain private from recruiters
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
          <div className="font-semibold text-indigo-300">
            Student #{userProfile.id} ({userProfile.personal.name}):
          </div>
          <p>
            "Consistently strong algorithmic acumen (8.8 CGPA). Recommended for higher studies (IIT Madras M.Tech AI) or Tier-1 product software development. Advised to complete React & DSA certification before November campus drive."
          </p>
        </div>
      </div>
    </div>
  );
};
