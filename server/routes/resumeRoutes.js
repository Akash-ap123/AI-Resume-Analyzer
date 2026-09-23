const analyzeResume = require("../services/analysisService");
const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const extractTextFromPDF = require("../services/pdfParser");
const cleanResumeText = require("../services/textCleaner");
const extractSkills = require("../services/skillExtractor");
const matchSkills = require("../services/skillMatcher");

const router = express.Router();

let resumeData = {
  text: "",
  skills: [],
};

let jobData = {
  text: "",
  skills: [],
};
// Resume upload
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("File received:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume",
      });
    }

    const text = await extractTextFromPDF(req.file.path);

    const cleanedText = cleanResumeText(text);

    const skills = extractSkills(cleanedText);

    resumeData = {
      text: cleanedText,
      skills: skills,
    };

    console.log("RAW TEXT:");
    console.log(text);

    console.log("CLEANED TEXT:");
    console.log(cleanedText);

    console.log("EXTRACTED SKILLS:");
    console.log(skills);

    res.status(200).json({
      message: "Resume uploaded and analyzed successfully",
      fileName: req.file.filename,
      text: cleanedText,
      skills: skills,
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: "Could not process resume",
      error: error.message,
    });
  }
});


// Job description
router.post("/job-description", (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription || !jobDescription.trim()) {
    return res.status(400).json({
      message: "Job description is required",
    });
  }

  const requiredSkills = extractSkills(jobDescription);

  jobData = {
    text: jobDescription,
    skills: requiredSkills,
  };

  console.log("JOB DESCRIPTION:");
  console.log(jobDescription);

  console.log("REQUIRED SKILLS:");
  console.log(requiredSkills);

  res.status(200).json({
    message: "Job description analyzed successfully",
    jobDescription: jobDescription,
    requiredSkills: requiredSkills,
  });
});

router.post("/analyze", (req, res) => {
  try {
    if (resumeData.skills.length === 0) {
      return res.status(400).json({
        message: "Please upload a resume first",
      });
    }

    if (jobData.skills.length === 0) {
      return res.status(400).json({
        message: "Please submit a job description first",
      });
    }

    const analysis = analyzeResume(
      resumeData,
      jobData
    );

    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: analysis,
    });

  } catch (error) {
    console.error("ANALYSIS ERROR:", error);

    res.status(500).json({
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
});
module.exports = router;