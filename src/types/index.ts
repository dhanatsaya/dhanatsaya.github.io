export type UserRole = 'STUDENT' | 'RECRUITER' | 'COLLEGE_ADMIN' | 'SUPER_ADMIN';

export interface PersonalInfo {
  name: string;
  dob: string;
  location: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface EducationInfo {
  school: string;
  college: string;
  degree: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Technical' | 'Soft Skills' | 'Domain Skills';
  level: number; // 0 - 100
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  type: 'Internship' | 'Project' | 'Work Experience';
  duration: string;
  description: string;
  technologies: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  type: 'Certification' | 'Hackathon' | 'Award' | 'Publication';
  issuer: string;
  year: number;
  credentialUrl?: string;
}

export interface CareerPreferences {
  interestedRoles: string[];
  preferredSectors: string[];
  preferredLocations: string[];
  careerGoal: string;
  salaryPreference: string;
  workModePreference: 'Remote' | 'Hybrid' | 'On-site' | 'Any';
}

export interface UserDocuments {
  resumeName: string;
  resumeUpdated: string;
  portfolioUrl: string;
  certificatesCount: number;
}

export interface UserProfile {
  id: string;
  personal: PersonalInfo;
  education: EducationInfo;
  skills: SkillItem[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  career: CareerPreferences;
  documents: UserDocuments;
  optInRecruiterDiscovery: boolean;
}

export interface MatchFactorBreakdown {
  skillsScore: number;
  educationScore: number;
  experienceScore: number;
  certScore: number;
  interestScore: number;
  locationScore: number;
  careerPrefScore: number;
  totalScore: number;
}

export interface MatchingWeights {
  skills: number;          // e.g. 0.30
  education: number;       // e.g. 0.20
  experience: number;      // e.g. 0.10
  certification: number;   // e.g. 0.10
  interest: number;        // e.g. 0.10
  location: number;        // e.g. 0.10
  careerPreference: number;// e.g. 0.10
}

export type OpportunityType = 'private_job' | 'internship' | 'government' | 'higher_education';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  sector: string;
  requiredEducation: string;
  requiredSkills: string[];
  experienceYears: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  deadline: string;
  description: string;
  officialUrl?: string;
  verified: boolean;
  vacancies?: number;
  examDetails?: {
    examName: string;
    examDate: string;
    syllabus: string[];
    selectionStages: string[];
    admitCardDate?: string;
  };
  cutoffDetails?: {
    expectedCutoff: number;
    eligibilityRank?: string;
    courseDuration: string;
  };
  // Dynamic matched properties calculated by AI Matching Engine:
  matchScore?: number;
  factors?: MatchFactorBreakdown;
  matchedReasons?: string[];
  missingSkills?: string[];
  recommendation?: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  organizationId: string;
  orgName: string;
  opportunityId: string;
  opportunityTitle: string;
  sharedFields: string[];
  purpose: string;
  timestamp: string;
  status: 'ACTIVE' | 'REVOKED';
  revokedAt?: string;
  revocationReason?: string;
}

export interface PrivacySetting {
  id: string;
  key: string;
  title: string;
  description: string;
  granted: boolean;
}

export type ApplicationStatus =
  | 'Recommended'
  | 'Viewed'
  | 'Interested'
  | 'Reviewing'
  | 'Consent Approved'
  | 'Applied'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview'
  | 'Selected'
  | 'Rejected';

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  organization: string;
  type: OpportunityType;
  appliedDate: string;
  status: ApplicationStatus;
  consentId?: string;
  statusHistory: {
    status: ApplicationStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface SkillGap {
  skill: string;
  category: string;
  currentProficiency: number;
  targetProficiency: number;
  relatedOpportunitiesCount: number;
  courses: {
    title: string;
    provider: string;
    duration: string;
    level: string;
  }[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  skill: string;
  category: string;
  durationMinutes: number;
  questions: AssessmentQuestion[];
  passingScore: number;
}

export interface AutomationEvent {
  id: string;
  timestamp: string;
  eventType:
    | 'PROFILE_UPDATED'
    | 'NEW_OPPORTUNITY'
    | 'DEADLINE_APPROACHING'
    | 'SKILL_GAP_DETECTED'
    | 'APPLICATION_STATUS_CHANGED'
    | 'CONSENT_REVOKED'
    | 'ASSESSMENT_COMPLETED';
  title: string;
  description: string;
  triggeredAction: string;
}
