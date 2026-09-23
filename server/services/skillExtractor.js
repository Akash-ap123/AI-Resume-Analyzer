const skillsList = [
  "python",
  "java",
  "javascript",
  "c++",
  "c",
  "react",
  "react.js",
  "node.js",
  "node",
  "express",
  "mongodb",
  "sql",
  "html",
  "css",
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "ai",
  "data science",
  "data structures",
  "algorithms",
  "git",
  "github",
  "docker",
  "tensorflow",
  "pytorch",
  "natural language processing",
  "nlp",
  "communication",
  "leadership",
  "teamwork",
  "problem solving"
];

const extractSkills = (text) => {
  if (!text) {
    return [];
  }

  const lowerText = text.toLowerCase();

  const foundSkills = [];

  skillsList.forEach((skill) => {
    const skillPattern = new RegExp(
      `\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i"
    );

    if (skillPattern.test(lowerText)) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
};

module.exports = extractSkills;