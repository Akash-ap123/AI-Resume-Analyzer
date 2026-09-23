const matchSkills = require("./skillMatcher");
const calculateSimilarity = require("./similarity");

const analyzeResume = (resumeData, jobData) => {
  const skillResult = matchSkills(
    resumeData.skills,
    jobData.skills
  );

  const similarityScore = calculateSimilarity(
    resumeData.text,
    jobData.text
  );

  return {
    matchPercentage: skillResult.matchPercentage,
    similarityScore: similarityScore,
    matchedSkills: skillResult.matchedSkills,
    missingSkills: skillResult.missingSkills,
  };
};

module.exports = analyzeResume;