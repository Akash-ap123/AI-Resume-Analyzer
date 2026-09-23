import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import AnalyzeButton from "./components/AnalyzeButton";

function App() {
  return (
    <div className="app-shell">

      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark">AI</div>

          <div>
            <div className="brand-name">ResumeAI</div>
            <div className="brand-subtitle">
              Intelligent Resume Analysis
            </div>
          </div>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          AI Analysis Engine
        </div>
      </nav>

      <main className="main-container">

        <section className="hero-section">

          <div className="hero-content">

            <div className="eyebrow">
              AI-POWERED CAREER INTELLIGENCE
            </div>

            <h1>
              Know how well your resume
              <span> matches the job.</span>
            </h1>

            <p>
              Upload your resume, add a job description, and get
              an intelligent analysis of your skills, relevance,
              and improvement opportunities.
            </p>

          </div>

          <div className="hero-stat">
            <div className="stat-number">AI</div>
            <div className="stat-label">
              NLP Powered
            </div>
          </div>

        </section>


        <section className="workspace">

          <div className="workspace-header">

            <div>
              <span className="section-number">01</span>

              <div>
                <h2>Prepare your analysis</h2>
                <p>
                  Provide your resume and target job description.
                </p>
              </div>
            </div>

          </div>


          <div className="input-grid">

            <div className="glass-card">
              <ResumeUpload />
            </div>

            <div className="glass-card">
              <JobDescription />
            </div>

          </div>


          <AnalyzeButton />

        </section>

      </main>

    </div>
  );
}

export default App;