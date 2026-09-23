function ScoreCircle({ score, label }) {
  return (
    <div className="score-card">

      <div
        className="score-circle"
        style={{
          "--score": `${score * 3.6}deg`,
        }}
      >
        <div className="score-circle-inner">
          <strong>{score}%</strong>
          <span>score</span>
        </div>
      </div>

      <div className="score-content">
        <h3>{label}</h3>

        <p>
          {label === "Skill Match"
            ? "Required skills found in your resume"
            : "Content similarity between resume and JD"}
        </p>
      </div>

    </div>
  );
}


function SkillPill({ skill, type }) {
  return (
    <span className={`skill-pill ${type}`}>
      <span>
        {type === "matched" ? "✓" : "×"}
      </span>

      {skill}
    </span>
  );
}


function ResultCard({ result }) {
  if (!result) {
    return null;
  }

  return (
    <section className="results-card">

      <div className="results-header">

        <div>
          <div className="result-eyebrow">
            ANALYSIS COMPLETE
          </div>

          <h2>Resume analysis</h2>

          <p>
            Here's how your resume compares with the target role.
          </p>
        </div>

        <div className="result-badge">
          AI ANALYZED
        </div>

      </div>


      <div className="score-grid">

        <ScoreCircle
          score={result.matchPercentage}
          label="Skill Match"
        />

        <ScoreCircle
          score={result.similarityScore}
          label="Resume-JD Similarity"
        />

      </div>


      <div className="skills-grid">

        <div className="skill-panel">

          <div className="skill-panel-header">
            <div>
              <span className="panel-icon matched">
                ✓
              </span>

              <div>
                <h3>Matched skills</h3>
                <p>
                  Skills detected in your resume
                </p>
              </div>
            </div>

            <span className="skill-count">
              {result.matchedSkills.length}
            </span>
          </div>


          <div className="skill-list">

            {result.matchedSkills.length === 0 ? (
              <p className="empty-state">
                No matching skills found.
              </p>
            ) : (
              result.matchedSkills.map((skill) => (
                <SkillPill
                  key={skill}
                  skill={skill}
                  type="matched"
                />
              ))
            )}

          </div>

        </div>


        <div className="skill-panel">

          <div className="skill-panel-header">
            <div>
              <span className="panel-icon missing">
                +
              </span>

              <div>
                <h3>Skills to improve</h3>
                <p>
                  Skills detected in the job description
                </p>
              </div>
            </div>

            <span className="skill-count">
              {result.missingSkills.length}
            </span>
          </div>


          <div className="skill-list">

            {result.missingSkills.length === 0 ? (
              <p className="empty-state">
                No missing skills detected.
              </p>
            ) : (
              result.missingSkills.map((skill) => (
                <SkillPill
                  key={skill}
                  skill={skill}
                  type="missing"
                />
              ))
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ResultCard;