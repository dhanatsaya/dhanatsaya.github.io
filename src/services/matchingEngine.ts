import {
  UserProfile,
  Opportunity,
  MatchingWeights,
  MatchFactorBreakdown,
} from '../types';

export const DEFAULT_MATCHING_WEIGHTS: MatchingWeights = {
  skills: 0.30,
  education: 0.20,
  experience: 0.10,
  certification: 0.10,
  interest: 0.10,
  location: 0.10,
  careerPreference: 0.10,
};

export function evaluateOpportunityMatch(
  profile: UserProfile,
  opportunity: Opportunity,
  weights: MatchingWeights = DEFAULT_MATCHING_WEIGHTS
): {
  matchScore: number;
  factors: MatchFactorBreakdown;
  matchedReasons: string[];
  missingSkills: string[];
  recommendation: string;
} {
  const userSkillNames = profile.skills.map((s) => s.name.toLowerCase());
  const reqSkills = opportunity.requiredSkills.map((s) => s.toLowerCase());

  // 1. Skills Match (30%)
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  opportunity.requiredSkills.forEach((skill) => {
    const isPresent = userSkillNames.some(
      (uSkill) => uSkill === skill.toLowerCase() || uSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(uSkill)
    );
    if (isPresent) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillsScore =
    reqSkills.length > 0
      ? Math.min(100, Math.round((matchedSkills.length / reqSkills.length) * 100))
      : 85;

  // 2. Education Match (20%)
  const eduRequired = opportunity.requiredEducation.toLowerCase();
  const userDegree = profile.education.degree.toLowerCase();
  const userBranch = profile.education.branch.toLowerCase();

  let educationScore = 60;
  if (
    eduRequired.includes('any') ||
    eduRequired.includes('b.e') ||
    eduRequired.includes('b.tech') ||
    eduRequired.includes('graduate') ||
    eduRequired.includes(userDegree) ||
    eduRequired.includes(userBranch)
  ) {
    educationScore = 100;
  } else if (eduRequired.includes('master') || eduRequired.includes('m.tech')) {
    educationScore = profile.education.cgpa >= 8.0 ? 85 : 70;
  }

  // 3. Experience Match (10%)
  const hasInternships = profile.experience.some((e) => e.type === 'Internship');
  const hasProjects = profile.experience.some((e) => e.type === 'Project');
  let experienceScore = 70;
  if (hasInternships && hasProjects) {
    experienceScore = 90;
  } else if (hasInternships || hasProjects) {
    experienceScore = 80;
  }

  // 4. Certification Match (10%)
  const certCount = profile.achievements.filter((a) => a.type === 'Certification').length;
  let certScore = 65;
  if (certCount >= 2) certScore = 95;
  else if (certCount === 1) certScore = 80;

  // 5. Interest Match (10%)
  const oppTitleLower = opportunity.title.toLowerCase();
  const oppSectorLower = opportunity.sector.toLowerCase();
  const userInterests = profile.career.interestedRoles.map((r) => r.toLowerCase());
  const interestMatch = userInterests.some(
    (interest) =>
      oppTitleLower.includes(interest) ||
      interest.includes(oppTitleLower) ||
      oppSectorLower.includes(interest)
  );
  const interestScore = interestMatch ? 95 : 70;

  // 6. Location Match (10%)
  const userLocations = profile.career.preferredLocations.map((l) => l.toLowerCase());
  const oppLocation = opportunity.location.toLowerCase();
  const isRemote = opportunity.workMode === 'Remote';

  let locationScore = 65;
  if (isRemote || userLocations.some((loc) => oppLocation.includes(loc) || loc.includes(oppLocation))) {
    locationScore = 100;
  } else if (oppLocation.includes('india') || oppLocation.includes('tamil nadu')) {
    locationScore = 85;
  }

  // 7. Career Preference Match (10%)
  const goalLower = profile.career.careerGoal.toLowerCase();
  let careerPrefScore = 75;
  if (oppTitleLower.includes(goalLower) || goalLower.includes(oppTitleLower) || oppTitleLower.includes('developer')) {
    careerPrefScore = 95;
  }

  // Calculate Weighted Total Score
  const totalScore = Math.round(
    skillsScore * weights.skills +
    educationScore * weights.education +
    experienceScore * weights.experience +
    certScore * weights.certification +
    interestScore * weights.interest +
    locationScore * weights.location +
    careerPrefScore * weights.careerPreference
  );

  // Generate Transparent Reasons (Why this matches)
  const matchedReasons: string[] = [];

  if (educationScore >= 80) {
    matchedReasons.push(`✅ ${profile.education.degree} in ${profile.education.branch} matches required qualification (${opportunity.requiredEducation})`);
  }

  matchedSkills.forEach((skill) => {
    matchedReasons.push(`✅ ${skill} verified in your portfolio skills`);
  });

  if (careerPrefScore >= 80) {
    matchedReasons.push(`✅ Aligns with your career goal: "${profile.career.careerGoal}"`);
  }

  if (locationScore >= 80) {
    matchedReasons.push(`✅ Location (${opportunity.location} - ${opportunity.workMode}) matches your preference`);
  }

  if (hasProjects) {
    matchedReasons.push(`✅ Hands-on experience demonstrated through academic & personal projects`);
  }

  // Recommendation
  let recommendation = 'Your profile is well-aligned with this opportunity!';
  if (missingSkills.length > 0) {
    const skillsToLearn = missingSkills.slice(0, 3).join(' + ');
    recommendation = `Learn ${skillsToLearn} to increase your match score to ~${Math.min(99, totalScore + 12)}%.`;
  }

  return {
    matchScore: totalScore,
    factors: {
      skillsScore,
      educationScore,
      experienceScore,
      certScore,
      interestScore,
      locationScore,
      careerPrefScore,
      totalScore,
    },
    matchedReasons,
    missingSkills,
    recommendation,
  };
}
