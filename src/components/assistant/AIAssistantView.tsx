import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { UserProfile, Opportunity } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

interface AIAssistantViewProps {
  userProfile: UserProfile;
  opportunities: Opportunity[];
  onOpenOpportunity: (opp: Opportunity) => void;
  setActiveView: (view: string) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  userProfile,
  opportunities,
  onOpenOpportunity: _onOpenOpportunity,
  setActiveView,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello ${userProfile.personal.name}! I am your unified **AI Opportunity Assistant**. Rather than checking separate portals, I synthesize your authorized single portfolio with our full catalog of Private Jobs, Higher Education, Government Exams, and Learning Paths. How can I guide you today?`,
      timestamp: '10:30 AM',
      suggestions: [
        'Which jobs match my portfolio?',
        'Which government opportunities can I consider?',
        'Why is Junior Software Developer only 91% match?',
        'What skills am I missing?',
        'Which courses and colleges fit my preferences?',
        'Compare Software Developer vs Government Scientist',
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const generateAnswer = (query: string): { reply: string; nextSuggestions?: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('job') || q.includes('private')) {
      return {
        reply: `Based on your **B.E Computer Science** degree and verified skills in **Python (90%)**, **Java (85%)**, and **SQL (80%)**, your highest matching private positions are:\n\n1. **Junior Software Developer at ABC Technologies** — **91% Match** (Requires Java, Python, SQL, React; located in Chennai)\n2. **Software Developer at Zoho Corporation** — **88% Match** (Core Platforms, Chennai)\n3. **Python Backend Developer at Freshworks** — **86% Match** (Microservices & APIs)\n\nAll three honor your preference for Chennai / Hybrid work mode!`,
        nextSuggestions: ['Why is Junior Software Developer only 91% match?', 'What skills am I missing?'],
      };
    }

    if (q.includes('govt') || q.includes('government') || q.includes('exam') || q.includes('isro')) {
      return {
        reply: `Here are the top verified Government & PSU opportunities matching your profile:\n\n1. **ISRO Scientist / Engineer ‘SC’ (Computer Science)** — **85% Match** (Level 10 Pay ₹85,000/mo, Exam date: 13-Dec-2026, Requires B.E CSE 65%+)\n2. **TNPSC Assistant System Engineer (Technical Services)** — **84% Match** (State Govt, Pay Level 15)\n3. **SBI Specialist Cadre Officer - IT** — **82% Match** (Banking Scale I, ₹13.8 LPA)\n\n*(Reminder: Ensure you review the official notification gazette before deadline closure).*`,
        nextSuggestions: ['Tell me about the ISRO ICRB syllabus', 'Which opportunities are closing soon?'],
      };
    }

    if (q.includes('why') || q.includes('91%') || q.includes('factor') || q.includes('breakdown')) {
      return {
        reply: `**Why Junior Software Developer at ABC Technologies is a 91% Match:**\n\n• **Skills (27/30 pts)**: You have Python, Java, SQL verified; missing React in core proficiency.\n• **Education (20/20 pts)**: Your B.E in CSE from Anna University (8.8 CGPA) completely matches B.E/B.Tech/MCA.\n• **Experience (7/10 pts)**: Full Stack intern experience at TechVision Labs demonstrates practical capability.\n• **Location (10/10 pts)**: Chennai matches your preferred location exactly.\n• **Career Alignment (9/10 pts)**: Aligns with your "Software Developer" goal.\n\n**To reach 98% match:** Complete our interactive React benchmark in the Learning Hub!`,
        nextSuggestions: ['Take me to Learning Hub to learn React', 'What skills am I missing?'],
      };
    }

    if (q.includes('missing') || q.includes('skill gap')) {
      return {
        reply: `Across our target Software Developer and AI engineering requisitions, here are your **top 3 missing skills**:\n\n1. ⚠️ **React / Modern Frontend** (Current: 20% | Target: 85%)\n2. ⚠️ **Data Structures & Algorithms** (Current: 45% | Target: 90%)\n3. ⚠️ **Git & CI/CD Pipelines** (Current: 40% | Target: 85%)\n\nCompleting these in our Learning Hub will significantly elevate both corporate placement rankings and technical exam scores!`,
        nextSuggestions: ['Take React skill assessment now', 'Which courses and colleges fit my preferences?'],
      };
    }

    if (q.includes('course') || q.includes('college') || q.includes('m.tech') || q.includes('higher education')) {
      return {
        reply: `Given your **8.8 CGPA** in B.E CSE, your top postgraduate recommendations are:\n\n1. **M.Tech in AI & Data Science at IIT Madras** — Research fellowship ₹12,400/mo (GATE score / Merit ranking)\n2. **M.E in Software Engineering at Anna University (CEG)** — Autonomous premier department with subsidized fee structure\n3. **M.Tech in Cloud Computing at PSG College of Technology** (Coimbatore)\n\nYour cutoff likelihood is in the **Top 95th Percentile** for state universities!`,
        nextSuggestions: ['Open Cutoff Calculator', 'Compare Software Developer vs Government Scientist'],
      };
    }

    if (q.includes('compare') || q.includes('path') || q.includes('vs')) {
      return {
        reply: `**Career Path Comparison for your Profile:**\n\n**Path A: Private Software Developer (ABC Tech / Zoho)**\n• Starting CTC: ₹6.0 - 9.5 LPA\n• Growth: Senior Dev → Tech Lead → Architect within 6 years\n• Focus: Fast shipping, distributed microservices, modern frontend/cloud stack\n\n**Path B: Government Scientist / Engineer (ISRO / TNPSC)**\n• Starting Pay: Level 10 (~₹85,000/mo + HRA, medical, pensions)\n• Stability & National Prestige: High mission impact on satellite launches & telemetry\n• Selection: Single ICRB national exam + rigorous technical interview`,
        nextSuggestions: ['Which opportunities are closing soon?', 'Which jobs match my portfolio?'],
      };
    }

    if (q.includes('closing') || q.includes('deadline')) {
      return {
        reply: `**Opportunities Closing Soon:**\n\n1. 🚨 **AI & ML Intern at Hyperion AI Labs** — Deadline: **15-Nov-2026** (in 6 days)\n2. 🚨 **ISRO Scientist/Engineer ‘SC’** — Deadline: **18-Nov-2026** (in 9 days)\n3. 🚨 **Junior Software Developer at ABC Technologies** — Deadline: **20-Nov-2026**\n\nSubmit your consent-backed application early to avoid last-day gateway congestion!`,
        nextSuggestions: ['Which jobs match my portfolio?', 'Which government opportunities can I consider?'],
      };
    }

    return {
      reply: `I analyzed your query: "${query}" across your verified portfolio and all opportunity modules. Your profile is strongest in Python, Java, and Core CSE engineering. You can explore private software engineering roles, prepare for ISRO/TNPSC technical exams, or apply for M.Tech admissions!`,
      nextSuggestions: ['Which jobs match my portfolio?', 'What skills am I missing?', 'Which opportunities are closing soon?'],
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Now',
    };

    const { reply, nextSuggestions } = generateAnswer(text);

    const assistantMsg: Message = {
      id: `ai_${Date.now() + 1}`,
      sender: 'assistant',
      text: reply,
      timestamp: 'Now',
      suggestions: nextSuggestions,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputQuery('');
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-2xl glass-panel border border-indigo-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white">Unified AI Opportunity Assistant</h1>
            <p className="text-xs text-slate-400">
              Personalized advisory across Jobs, Higher Education, Government Exams & Skill Roadmaps.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Authorized Access Only</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-4 md:p-6 space-y-4 h-[550px] flex flex-col justify-between">
        {/* Messages scrollable area */}
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-2 max-w-xl ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-md ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Suggestion Chips */}
                  {m.suggestions && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            if (s.includes('Learning Hub')) {
                              setActiveView('learning');
                            } else {
                              handleSend(s);
                            }
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-indigo-300 transition text-left"
                        >
                          ⚡ {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative pt-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything: Which jobs match me? Why is this opportunity 91%? What skills to learn?..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-3.5 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
