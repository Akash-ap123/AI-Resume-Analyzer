import { useState } from "react";

function JobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setMessage("Please enter a job description");
      return;
    }

    try {
      setMessage("Processing job description...");

      const response = await fetch(
        "http://localhost:5000/api/resume/job-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed");
        return;
      }

      setMessage("Job description processed successfully");

    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="input-card-content">

      <div className="card-top">

        <div className="card-icon jd-icon">
          JD
        </div>

        <div>
          <div className="card-label">STEP 02</div>

          <h3>Add job description</h3>

          <p>
            Paste the job description for the role you're targeting.
          </p>
        </div>

      </div>


      <div className="textarea-wrapper">

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
        />

        <div className="character-count">
          {jobDescription.length} characters
        </div>

      </div>


      <button
        className="secondary-button"
        onClick={handleSubmit}
      >
        Process Job Description
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

export default JobDescription;