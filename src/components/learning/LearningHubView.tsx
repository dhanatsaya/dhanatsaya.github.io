import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { UserProfile, SkillGap, Assessment } from '../../types';

interface LearningHubViewProps {
  userProfile: UserProfile;
  skillGaps: SkillGap[];
  assessments: Assessment[];
  onSkillAssessed: (skillName: string, newLevel: number) => void;
  setActiveView: (view: string) => void;
}

export const LearningHubView: React.FC<LearningHubViewProps> = ({
  userProfile,
  skillGaps,
  assessments,
  onSkillAssessed,
  setActiveView,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  const roadmapSteps = [
    { step: 1, title: 'JavaScript & Modern ES6+', status: 'COMPLETED', desc: 'Closures, Promises, Event Loop, Async/Await' },
    { step: 2, title: 'React 18 & Component Patterns', status: 'IN_PROGRESS', desc: 'Hooks, State Management, Reconciliation, Next.js basics' },
    { step: 3, title: 'Data Structures & Algorithms (Core)', status: 'RECOMMENDED', desc: 'Hash Maps, Binary Trees, Dynamic Programming, Graphs' },
    { step: 4, title: 'Node.js & Backend Microservices', status: 'UPCOMING', desc: 'REST APIs, Express, PostgreSQL / MongoDB integration' },
    { step: 5, title: 'Full Stack Capstone System', status: 'UPCOMING', desc: 'End-to-end production deployment with Docker & CI/CD' },
  ];

  const handleStartQuiz = (assessment: Assessment) => {
    setActiveQuiz(assessment);
    setSelectedAnswers({});
    setQuizFinished(false);
    setScorePercentage(0);
  };

  const handleSelectAnswer = (questionId: number, optionIdx: number) => {
    if (quizFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    let correct = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const percent = Math.round((correct / activeQuiz.questions.length) * 100);
    setScorePercentage(percent);
    setQuizFinished(true);

    if (percent >= activeQuiz.passingScore) {
      onSkillAssessed(activeQuiz.skill, Math.max(85, percent));
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-black text-white">Learning & Skill Development Hub</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
              Bridge Education to Jobs
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Close verified skill gaps identified by the AI Opportunity Engine. Complete interactive benchmarks to automatically level up your portfolio and elevate match ratings.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Target Goal: <strong className="text-white">{userProfile.career.careerGoal}</strong></span>
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="p-6 rounded-2xl glass-panel border border-indigo-500/40 space-y-5 animate-scaleIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Interactive Skill Benchmark
              </span>
              <h2 className="text-lg font-bold text-white">{activeQuiz.title}</h2>
            </div>
            <button
              onClick={() => setActiveQuiz(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          {!quizFinished ? (
            <div className="space-y-4">
              {activeQuiz.questions.map((q, qIndex) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-[10px]">
                      {qIndex + 1}
                    </span>
                    <span>{q.question}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIndex) => {
                      const isSelected = selectedAnswers[q.id] === oIndex;
                      return (
                        <button
                          key={oIndex}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, oIndex)}
                          className={`p-2.5 rounded-lg border text-left transition ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-500'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit & Score</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
              <div className="inline-flex p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Benchmark Complete!</h3>
                <p className="text-sm text-slate-300 mt-1">
                  You scored <strong className="text-indigo-400 text-base">{scorePercentage}%</strong> (Passing score: {activeQuiz.passingScore}%)
                </p>
              </div>

              {scorePercentage >= activeQuiz.passingScore ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs inline-block text-left max-w-md">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Portfolio Level Up & Automation Triggered!
                  </div>
                  <p className="leading-relaxed">
                    <strong>{activeQuiz.skill}</strong> has been automatically added/upgraded to <strong>{Math.max(85, scorePercentage)}%</strong> in your Unified Portfolio. Opportunity matches have recalculated!
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs inline-block text-left max-w-md">
                  Review the recommended learning resources below and retry when ready.
                </div>
              )}

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => handleStartQuiz(activeQuiz)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retry
                </button>
                <button
                  onClick={() => {
                    setActiveQuiz(null);
                    setActiveView('opportunities');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Check Boosted Opportunities
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid: Skill Gaps vs Career Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Identified Skill Gaps & Assessments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Active Skill Gaps
            </h2>
            <span className="text-xs text-slate-400">Based on target opportunity requisitions</span>
          </div>

          <div className="space-y-3">
            {skillGaps.map((gap) => {
              const quizForSkill = assessments.find((a) => a.skill === gap.skill);
              return (
                <div key={gap.skill} className="p-4 rounded-xl glass-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-white">{gap.skill}</h3>
                      <span className="text-[11px] text-slate-400">{gap.category}</span>
                    </div>
                    {quizForSkill && (
                      <button
                        onClick={() => handleStartQuiz(quizForSkill)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition"
                      >
                        <Play className="w-3.5 h-3.5" /> Take Test
                      </button>
                    )}
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Current: <strong className="text-white">{gap.currentProficiency}%</strong></span>
                      <span>Target: <strong className="text-emerald-400">{gap.targetProficiency}%</strong></span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
                      <div className="bg-amber-500 h-2" style={{ width: `${gap.currentProficiency}%` }} />
                      <div className="bg-emerald-500/30 h-2" style={{ width: `${gap.targetProficiency - gap.currentProficiency}%` }} />
                    </div>
                  </div>

                  {/* Curated courses */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400">Recommended Modules:</div>
                    {gap.courses.map((c, i) => (
                      <div key={i} className="text-xs flex items-center justify-between p-2 rounded-lg bg-slate-900/60 text-slate-300">
                        <span className="truncate pr-2 font-medium">{c.title}</span>
                        <span className="text-[10px] text-indigo-400 shrink-0">{c.provider} • {c.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Career Roadmap */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Automated Learning Roadmap
            </h2>
            <span className="text-xs text-slate-400">Software Developer Track</span>
          </div>

          <div className="space-y-3">
            {roadmapSteps.map((step) => {
              const isCompleted = step.status === 'COMPLETED';
              const isInProgress = step.status === 'IN_PROGRESS';
              return (
                <div
                  key={step.step}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                    isInProgress
                      ? 'bg-indigo-950/40 border-indigo-500/50'
                      : isCompleted
                      ? 'bg-slate-900/40 border-emerald-500/30'
                      : 'bg-slate-900/30 border-slate-800'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isInProgress
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">{step.title}</h3>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : isInProgress
                            ? 'bg-indigo-500/20 text-indigo-300'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {step.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Career Path progression diagram preview (Section 4) */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Multi-Year Career Progression Path
            </span>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
              <span className="text-indigo-400 font-bold">Software Dev</span>
              <span>→</span>
              <span>Senior Dev</span>
              <span>→</span>
              <span>Tech Lead</span>
              <span>→</span>
              <span>Architect</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
