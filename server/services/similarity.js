const natural = require("natural");

const calculateSimilarity = (resumeText, jobDescription) => {
  if (!resumeText || !jobDescription) {
    return 0;
  }

  const tfidf = new natural.TfIdf();

  // Resume ko first document add karte hain
  tfidf.addDocument(resumeText.toLowerCase());

  // Job description ko second document
  tfidf.addDocument(jobDescription.toLowerCase());

  const terms = new Set();

  // Dono documents ke important terms collect
  tfidf.listTerms(0).forEach((item) => {
    terms.add(item.term);
  });

  tfidf.listTerms(1).forEach((item) => {
    terms.add(item.term);
  });

  const termList = Array.from(terms);

  const resumeVector = [];
  const jobVector = [];

  termList.forEach((term) => {
    let resumeScore = 0;
    let jobScore = 0;

    tfidf.tfidfs(term, (documentIndex, score) => {
      if (documentIndex === 0) {
        resumeScore = score;
      }

      if (documentIndex === 1) {
        jobScore = score;
      }
    });

    resumeVector.push(resumeScore);
    jobVector.push(jobScore);
  });

  // Dot product
  let dotProduct = 0;

  for (let i = 0; i < termList.length; i++) {
    dotProduct += resumeVector[i] * jobVector[i];
  }

  // Vector magnitudes
  const resumeMagnitude = Math.sqrt(
    resumeVector.reduce(
      (sum, value) => sum + value * value,
      0
    )
  );

  const jobMagnitude = Math.sqrt(
    jobVector.reduce(
      (sum, value) => sum + value * value,
      0
    )
  );

  if (resumeMagnitude === 0 || jobMagnitude === 0) {
    return 0;
  }

  // Cosine similarity
  const cosineSimilarity =
    dotProduct /
    (resumeMagnitude * jobMagnitude);

  // Convert 0-1 into percentage
  return Math.round(cosineSimilarity * 100);
};

module.exports = calculateSimilarity;