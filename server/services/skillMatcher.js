const matchSkills = (resumeSkills, requiredSkills) => {
  const resumeSet = new Set(
    resumeSkills.map((skill) => skill.toLowerCase())
  );

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    const normalizedSkill = skill.toLowerCase();

    if (resumeSet.has(normalizedSkill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const totalRequiredSkills = requiredSkills.length;

  const matchPercentage =
    totalRequiredSkills === 0
      ? 0
      : Math.round(
          (matchedSkills.length / totalRequiredSkills) * 100
        );

  return {
    matchedSkills,
    missingSkills,
    matchPercentage,
  };
};

module.exports = matchSkills;