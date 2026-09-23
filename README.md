# AI Resume Analyzer

An AI/NLP based resume analysis system that compares a candidate's
resume with a given job description.

## Features

- PDF resume upload
- Resume text extraction
- Text cleaning
- Automatic skill extraction
- Job description skill extraction
- Resume-JD skill matching
- TF-IDF based text representation
- Cosine similarity calculation
- Missing skill detection
- Resume improvement suggestions
- React dashboard

## Tech Stack

### Frontend
- React
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Multer

### AI / NLP
- TF-IDF
- Cosine Similarity
- Rule-based skill extraction

### Database
- MongoDB planned for persistent analysis history

## How It Works

1. User uploads a PDF resume.
2. Backend extracts text from the PDF.
3. Extracted text is cleaned.
4. Skills are identified from the resume.
5. User provides a job description.
6. Required skills are extracted from the job description.
7. Resume skills are compared with required skills.
8. TF-IDF and cosine similarity calculate textual similarity.
9. The system identifies missing skills.
10. The frontend displays the analysis and suggestions.

## Run Locally

### Backend

```bash
cd server
npm install
node server.js