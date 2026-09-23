const cleanResumeText = (text) => {
  if (!text) {
    return "";
  }

  let cleanedText = text;

  // PDF extraction mein kabhi-kabhi letters ke beech
  // unnecessary spaces aa jaate hain tab hatate hai aise.
  cleanedText = cleanedText.replace(
    /(?<![A-Za-z])(?:[A-Za-z]\s){2,}[A-Za-z](?![A-Za-z])/g,
    (match) => match.replace(/\s+/g, "")
  );

  // Multiple spaces ko single space
  cleanedText = cleanedText.replace(/[ \t]+/g, " ");

  // Har line ko trim
  cleanedText = cleanedText
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  // Multiple blank lines remove
  cleanedText = cleanedText.replace(/\n{2,}/g, "\n");

  return cleanedText.trim();
};

module.exports = cleanResumeText;