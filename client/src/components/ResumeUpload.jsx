import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setMessage("Uploading resume...");

      const response = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Upload failed");
        return;
      }

      setMessage("Resume uploaded successfully");

    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="input-card-content">

      <div className="card-top">

        <div className="card-icon resume-icon">
          CV
        </div>

        <div>
          <div className="card-label">STEP 01</div>

          <h3>Upload your resume</h3>

          <p>
            Upload your latest resume in PDF format.
          </p>
        </div>

      </div>


      <label className="upload-zone">

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        <div className="upload-icon">
          ↑
        </div>

        <div className="upload-title">
          {file
            ? file.name
            : "Drop your resume here"}
        </div>

        <div className="upload-description">
          {file
            ? "PDF selected and ready to analyze"
            : "or click to browse from your computer"}
        </div>

        <span className="file-type">
          PDF • MAX 10MB
        </span>

      </label>


      {file && (
        <div className="selected-file">

          <div className="file-info">
            <div className="file-symbol">
              PDF
            </div>

            <div>
              <strong>{file.name}</strong>
              <span>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>

          <span className="ready-badge">
            READY
          </span>

        </div>
      )}


      <button
        className="secondary-button"
        onClick={handleUpload}
      >
        Upload Resume
        <span>→</span>
      </button>


      {message && (
        <div
          className={
            message.includes("successfully")
              ? "success-message"
              : "input-message"
          }
        >
          {message}
        </div>
      )}

    </div>
  );
}

export default ResumeUpload;