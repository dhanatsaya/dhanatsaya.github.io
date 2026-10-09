import React, { useState, useMemo } from 'react';
import {
  UserRole,
  UserProfile,
  Opportunity,
  Application,
  ConsentRecord,
  PrivacySetting,
  MatchingWeights,
  AutomationEvent,
} from './types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_OPPORTUNITIES,
  INITIAL_CONSENT_RECORDS,
  INITIAL_PRIVACY_SETTINGS,
  INITIAL_APPLICATIONS,
  INITIAL_SKILL_GAPS,
  INTERACTIVE_ASSESSMENTS,
  INITIAL_AUTOMATION_EVENTS,
} from './data/mockData';
import { evaluateOpportunityMatch, DEFAULT_MATCHING_WEIGHTS } from './services/matchingEngine';

import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { OpportunityFinderView } from './components/opportunities/OpportunityFinderView';
import { MatchBreakdownModal } from './components/opportunities/MatchBreakdownModal';
import { ConsentModal } from './components/privacy/ConsentModal';
import { PrivacyCenterView } from './components/privacy/PrivacyCenterView';
import { ApplicationTrackerView } from './components/applications/ApplicationTrackerView';
import { LearningHubView } from './components/learning/LearningHubView';
import { GovernmentView } from './components/government/GovernmentView';
import { HigherEducationView } from './components/education/HigherEducationView';
import { AIAssistantView } from './components/assistant/AIAssistantView';
import { RecruiterPortalView } from './components/recruiter/RecruiterPortalView';
import { CollegeDashboardView } from './components/college/CollegeDashboardView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';
import { ResumeAnalyzerView } from './components/resume/ResumeAnalyzerView';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');
  const [activeView, setActiveView] = useState<string>('dashboard');

  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [matchingWeights, setMatchingWeights] = useState<MatchingWeights>(DEFAULT_MATCHING_WEIGHTS);
  const [baseOpportunities, setBaseOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>(INITIAL_CONSENT_RECORDS);
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>(INITIAL_PRIVACY_SETTINGS);
  const [automationEvents, setAutomationEvents] = useState<AutomationEvent[]>(INITIAL_AUTOMATION_EVENTS);

  // Modals
  const [breakdownOpportunity, setBreakdownOpportunity] = useState<Opportunity | null>(null);
  const [consentOpportunity, setConsentOpportunity] = useState<Opportunity | null>(null);

  // Dynamic Matching: Recompute match scores whenever profile or weights change!
  const scoredOpportunities = useMemo(() => {
    return baseOpportunities.map((opp) => {
      const evaluation = evaluateOpportunityMatch(userProfile, opp, matchingWeights);
      return {
        ...opp,
        matchScore: evaluation.matchScore,
        factors: evaluation.factors,
        matchedReasons: evaluation.matchedReasons,
        missingSkills: evaluation.missingSkills,
        recommendation: evaluation.recommendation,
      };
    });
  }, [baseOpportunities, userProfile, matchingWeights]);

  // Keep breakdownOpportunity updated if open
  const currentBreakdownOpp = useMemo(() => {
    if (!breakdownOpportunity) return null;
    return scoredOpportunities.find((o) => o.id === breakdownOpportunity.id) || breakdownOpportunity;
  }, [breakdownOpportunity, scoredOpportunities]);

  // Handlers
  const handleApproveAndApply = (opp: Opportunity, selectedFields: string[]) => {
    const consentId = `CONSENT-2026-${Math.floor(Math.random() * 900000 + 100000)}`;

    const newConsent: ConsentRecord = {
      id: consentId,
      userId: userProfile.id,
      organizationId: `org_${opp.organization.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      orgName: opp.organization,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      sharedFields: selectedFields,
      purpose: 'Job Application Screening & Verification',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'ACTIVE',
    };

    const newApplication: Application = {
      id: `app_${Date.now()}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      organization: opp.organization,
      type: opp.type,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: 'Applied',
      consentId: consentId,
      statusHistory: [
        {
          status: 'Recommended',
          timestamp: 'Earlier today',
          note: `AI Matched at ${opp.matchScore}%`,
        },
        {
          status: 'Consent Approved',
          timestamp: 'Just now',
          note: `Authorized ${selectedFields.length} attributes (${selectedFields.slice(0, 2).join(', ')}...)`,
        },
        {
          status: 'Applied',
          timestamp: 'Just now',
          note: 'Application submitted successfully',
        },
      ],
    };

    const newEvent: AutomationEvent = {
      id: `auto_${Date.now()}`,
      timestamp: 'Just now',
      eventType: 'APPLICATION_STATUS_CHANGED',
      title: `Application Submitted: ${opp.title}`,
      description: `Dispatched authorized portfolio package to ${opp.organization} under ${consentId}.`,
      triggeredAction: 'Recorded cryptographic consent audit log.',
    };

    setConsentRecords((prev) => [newConsent, ...prev]);
    setApplications((prev) => [newApplication, ...prev]);
    setAutomationEvents((prev) => [newEvent, ...prev]);
    setActiveView('applications');
  };

  const handleRevokeConsent = (consentId: string, reason: string) => {
    setConsentRecords((prev) =>
      prev.map((c) => {
        if (c.id === consentId) {
          return {
            ...c,
            status: 'REVOKED',
            revokedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            revocationReason: reason,
          };
        }
        return c;
      })
    );

    const newEvent: AutomationEvent = {
      id: `auto_${Date.now()}`,
      timestamp: 'Just now',
      eventType: 'CONSENT_REVOKED',
      title: `Consent Revoked: ${consentId}`,
      description: `Revocation initiated by candidate. Reason: "${reason}".`,
      triggeredAction: 'Invalidated active API data access tokens.',
    };
    setAutomationEvents((prev) => [newEvent, ...prev]);
  };

  const handleTogglePrivacySetting = (id: string) => {
    setPrivacySettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, granted: !s.granted } : s))
    );
  };

  const handleSkillAssessed = (skillName: string, newLevel: number) => {
    // Check if skill exists in profile; if so update, otherwise add
    setUserProfile((prev) => {
      const exists = prev.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
      if (exists) {
        return {
          ...prev,
          skills: prev.skills.map((s) =>
            s.name.toLowerCase() === skillName.toLowerCase()
              ? { ...s, level: Math.max(s.level, newLevel) }
              : s
          ),
        };
      } else {
        return {
          ...prev,
          skills: [
            ...prev.skills,
            { id: `sk_${Date.now()}`, name: skillName, category: 'Technical', level: newLevel },
          ],
        };
      }
    });

    const newEvent: AutomationEvent = {
      id: `auto_${Date.now()}`,
      timestamp: 'Just now',
      eventType: 'ASSESSMENT_COMPLETED',
      title: `Skill Level Up: ${skillName} (${newLevel}%)`,
      description: `Completed interactive technical benchmark successfully.`,
      triggeredAction: 'Recalculated opportunity match rankings dynamically.',
    };
    setAutomationEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateApplicationStatus = (appId: string, newStatus: any, note: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            statusHistory: [
              ...app.statusHistory,
              {
                status: newStatus,
                timestamp: 'Just now',
                note,
              },
            ],
          };
        }
        return app;
      })
    );

    const newEvent: AutomationEvent = {
      id: `auto_${Date.now()}`,
      timestamp: 'Just now',
      eventType: 'APPLICATION_STATUS_CHANGED',
      title: `Application Status Advanced: ${newStatus}`,
      description: note,
      triggeredAction: 'Notified candidate & updated tracker pipeline.',
    };
    setAutomationEvents((prev) => [newEvent, ...prev]);
  };

  const handleAddOpportunity = (newOpp: Opportunity) => {
    setBaseOpportunities((prev) => [newOpp, ...prev]);
    const newEvent: AutomationEvent = {
      id: `auto_${Date.now()}`,
      timestamp: 'Just now',
      eventType: 'NEW_OPPORTUNITY',
      title: `New Opportunity Created: ${newOpp.title}`,
      description: `Published by ${newOpp.organization}. Ingested into matching engine.`,
      triggeredAction: 'Automatically ranked eligible candidate pool.',
    };
    setAutomationEvents((prev) => [newEvent, ...prev]);
  };

  const handleSimulateEvent = (type: any, title: string, desc: string, action: string) => {
    const newEvent: AutomationEvent = {
      id: `auto_${Date.now()}`,
      timestamp: 'Just now',
      eventType: type,
      title,
      description: desc,
      triggeredAction: action,
    };
    setAutomationEvents((prev) => [newEvent, ...prev]);
  };

  const activeConsentsCount = consentRecords.filter((c) => c.status === 'ACTIVE').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        userProfile={userProfile}
        automationEvents={automationEvents}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          currentRole={currentRole}
          applicationsCount={applications.length}
          activeConsentsCount={activeConsentsCount}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-slate-900/50 to-slate-950">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeView === 'dashboard' && (
              <DashboardView
                userProfile={userProfile}
                opportunities={scoredOpportunities}
                applications={applications}
                setActiveView={setActiveView}
                onSelectOpportunity={(opp) => setBreakdownOpportunity(opp)}
              />
            )}

            {activeView === 'portfolio' && (
              <PortfolioView
                userProfile={userProfile}
                onUpdateProfile={setUserProfile}
                onTriggerRecalculation={() => {
                  handleSimulateEvent(
                    'PROFILE_UPDATED',
                    'Portfolio Updated by Candidate',
                    'Recalculated match scores against all opportunities.',
                    'Match breakdown caches flushed & updated.'
                  );
                }}
              />
            )}

            {activeView === 'opportunities' && (
              <OpportunityFinderView
                opportunities={scoredOpportunities}
                applications={applications}
                onSelectBreakdown={(opp) => setBreakdownOpportunity(opp)}
                onOpenConsent={(opp) => setConsentOpportunity(opp)}
              />
            )}

            {activeView === 'government' && (
              <GovernmentView
                opportunities={scoredOpportunities}
                userProfile={userProfile}
                onSelectBreakdown={(opp) => setBreakdownOpportunity(opp)}
                onOpenConsent={(opp) => setConsentOpportunity(opp)}
              />
            )}

            {activeView === 'education' && (
              <HigherEducationView
                opportunities={scoredOpportunities}
                userProfile={userProfile}
                onSelectBreakdown={(opp) => setBreakdownOpportunity(opp)}
                onOpenConsent={(opp) => setConsentOpportunity(opp)}
              />
            )}

            {activeView === 'learning' && (
              <LearningHubView
                userProfile={userProfile}
                skillGaps={INITIAL_SKILL_GAPS}
                assessments={INTERACTIVE_ASSESSMENTS}
                onSkillAssessed={handleSkillAssessed}
                setActiveView={setActiveView}
              />
            )}

            {activeView === 'applications' && (
              <ApplicationTrackerView
                applications={applications}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                setActiveView={setActiveView}
              />
            )}

            {activeView === 'privacy' && (
              <PrivacyCenterView
                privacySettings={privacySettings}
                onTogglePrivacySetting={handleTogglePrivacySetting}
                consentRecords={consentRecords}
                onRevokeConsent={handleRevokeConsent}
              />
            )}

            {activeView === 'assistant' && (
              <AIAssistantView
                userProfile={userProfile}
                opportunities={scoredOpportunities}
                onOpenOpportunity={(opp) => setBreakdownOpportunity(opp)}
                setActiveView={setActiveView}
              />
            )}

            {activeView === 'resume' && (
              <ResumeAnalyzerView userProfile={userProfile} />
            )}

            {activeView === 'automation' && (
              <AdminSettingsView
                weights={matchingWeights}
                onUpdateWeights={setMatchingWeights}
                automationEvents={automationEvents}
                onSimulateEvent={handleSimulateEvent}
              />
            )}

            {activeView === 'recruiter' && (
              <RecruiterPortalView
                opportunities={scoredOpportunities}
                userProfile={userProfile}
                consentRecords={consentRecords}
                applications={applications}
                onAddOpportunity={handleAddOpportunity}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
              />
            )}

            {activeView === 'college' && (
              <CollegeDashboardView userProfile={userProfile} />
            )}

            {activeView === 'admin' && (
              <AdminSettingsView
                weights={matchingWeights}
                onUpdateWeights={setMatchingWeights}
                automationEvents={automationEvents}
                onSimulateEvent={handleSimulateEvent}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <MatchBreakdownModal
        opportunity={currentBreakdownOpp}
        onClose={() => setBreakdownOpportunity(null)}
        onOpenConsent={(opp) => {
          setBreakdownOpportunity(null);
          setConsentOpportunity(opp);
        }}
        weights={matchingWeights}
      />

      <ConsentModal
        opportunity={consentOpportunity}
        userProfile={userProfile}
        onClose={() => setConsentOpportunity(null)}
        onApproveAndApply={handleApproveAndApply}
      />
    </div>
  );
}
