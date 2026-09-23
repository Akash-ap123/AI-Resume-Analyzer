function Suggestions({ result }) {
  if (!result) {
    return null;
  }

  return (
    <section className="suggestions-card">

      <div className="suggestion-heading">

        <div className="suggestion-icon">
          ✦
        </div>

        <div>
          <div className="result-eyebrow">
            AI INSIGHTS
          </div>

          <h2>Improve your resume</h2>

          <p>
            Focus on the following areas to make your resume
            more relevant to this role.
          </p>
        </div>

      </div>


      {result.missingSkills.length === 0 ? (

        <div className="perfect-match">
          <strong>
            All detected job skills are present.
          </strong>

          <p>
            Your resume contains the skills identified
            from this job description.
          </p>
        </div>

      ) : (

        <div className="suggestion-list">

          {result.missingSkills.map((skill, index) => (

            <div
              className="suggestion-item"
              key={skill}
            >

              <span className="suggestion-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <strong>
                  Consider adding experience with {skill}
                </strong>

                <p>
                  If you have relevant projects, coursework,
                  certifications or experience, highlight them
                  in your resume.
                </p>
              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Suggestions;