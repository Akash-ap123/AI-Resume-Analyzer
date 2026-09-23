import { useState } from "react";
import ResultCard from "./ResultCard";
import Suggestions from "./Suggestions";

function AnalyzeButton() {
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleAnalyze = async () => {
    try {
      setMessage("Running AI analysis...");

      const response = await fetch(
        "http://localhost:5000/api/resume/analyze",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setResult(data.analysis);
      setMessage("");

      setTimeout(() => {
        document
          .getElementById("analysis-results")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);

    } catch (error) {
      console.error(error);
      setMessage("Analysis failed. Please try again.");
    }
  };

  return (
    <div className="analysis-area">

      <div className="analysis-divider">
        <span></span>
        <div className="analysis-label">
          READY TO ANALYZE
        </div>
        <span></span>
      </div>


      <button
        className="primary-analysis-button"
        onClick={handleAnalyze}
      >
        <span className="button-icon">✦</span>

        Analyze Resume

        <span className="button-arrow">→</span>
      </button>


      {message && (
        <div className="analysis-status">
          <span className="loading-dot"></span>
          {message}
        </div>
      )}


      {result && (
        <div id="analysis-results">

          <ResultCard result={result} />

          <Suggestions result={result} />

        </div>
      )}

    </div>
  );
}

export default AnalyzeButton;