import "./../styles/ATSReport.css";

function ATSReport() {
  const report = JSON.parse(localStorage.getItem("atsReport"));

  if (!report) {
    return <h2 style={{ textAlign: "center" }}>No ATS Report Found</h2>;
  }

  const { parsed_resume, ats_score } = report;

  let scoreLabel = "";
  let scoreColor = "";

  if (ats_score.overall >= 90) {
    scoreLabel = "Excellent Resume";
    scoreColor = "#16a34a";
  } else if (ats_score.overall >= 75) {
    scoreLabel = "Good Resume";
    scoreColor = "#2563eb";
  } else if (ats_score.overall >= 60) {
    scoreLabel = "Average Resume";
    scoreColor = "#f59e0b";
  } else {
    scoreLabel = "Needs Improvement";
    scoreColor = "#dc2626";
  }

  return (
    <div className="report-container">

      {/* Header */}

      <div className="header">
        <h1>PlacePro AI</h1>
        <p>AI Powered Resume Analyzer</p>
        <p>Resume analyzed successfully using PlacePro AI</p>
      </div>

      {/* Circular ATS Score */}

      <div className="score-card">

        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
        >
          {/* Background Circle */}

          <circle
            cx="110"
            cy="110"
            r="90"
            stroke="#e5e7eb"
            strokeWidth="14"
            fill="none"
          />

          {/* Progress Circle */}

          <circle
            cx="110"
            cy="110"
            r="90"
            stroke={scoreColor}
            strokeWidth="14"
            fill="none"
            strokeDasharray={565}
            strokeDashoffset={565 - (565 * ats_score.overall) / 100}
            strokeLinecap="round"
            transform="rotate(-90 110 110)"
          />

          {/* Score */}

          <text
            x="110"
            y="102"
            textAnchor="middle"
            fontSize="42"
            fontWeight="bold"
            fill={scoreColor}
          >
            {ats_score.overall}
          </text>

          <text
            x="110"
            y="132"
            textAnchor="middle"
            fontSize="18"
            fill="#666"
          >
            /100
          </text>
        </svg>

        <h2 style={{ color: scoreColor }}>
          {scoreLabel}
        </h2>

        <p>AI Resume Analysis</p>

      </div>

      <div className="grid">

        {/* Score Breakdown */}

        <div className="card">

          <h2>ATS Score Breakdown</h2>

          <p>Contact {ats_score.contact}/15</p>

          <div className="progress">
            <div
              className="fill"
              style={{ width: `${(ats_score.contact / 15) * 100}%` }}
            ></div>
          </div>

          <p>Skills {ats_score.skills}/30</p>

          <div className="progress">
            <div
              className="fill"
              style={{ width: `${(ats_score.skills / 30) * 100}%` }}
            ></div>
          </div>

          <p>Education {ats_score.education}/20</p>

          <div className="progress">
            <div
              className="fill"
              style={{ width: `${(ats_score.education / 20) * 100}%` }}
            ></div>
          </div>

          <p>Projects {ats_score.projects}/25</p>

          <div className="progress">
            <div
              className="fill"
              style={{ width: `${(ats_score.projects / 25) * 100}%` }}
            ></div>
          </div>

          <p>Experience {ats_score.experience}/10</p>

          <div className="progress">
            <div
              className="fill"
              style={{ width: `${(ats_score.experience / 10) * 100}%` }}
            ></div>
          </div>

        </div>

        {/* Suggestions */}

        <div className="card">

          <h2>Suggestions</h2>

          {ats_score.suggestions.length > 0 ? (
            ats_score.suggestions.map((item, index) => (
              <div key={index} className="suggestion">
                ✅ {item}
              </div>
            ))
          ) : (
            <div className="suggestion">
              🎉 Great! No suggestions. Your resume looks excellent.
            </div>
          )}

        </div>

        {/* Candidate Details */}

        <div className="card info">

          <h2>Candidate Details</h2>

          <p>👤 <b>{parsed_resume.name}</b></p>
          <p>📧 {parsed_resume.email}</p>
          <p>📱 {parsed_resume.phone}</p>

        </div>

        {/* Skills & Projects */}

        <div className="card">

          <h2>Technical Skills</h2>

          <div className="badges">

            {parsed_resume.skills.map((skill, index) => (
              <div key={index} className="badge">
                {skill}
              </div>
            ))}

          </div>

          <h2 style={{ marginTop: "35px" }}>
            Projects
          </h2>

          {parsed_resume.projects.map((project, index) => (
            <div key={index} className="project">
              📁 {project}
            </div>
          ))}

        </div>

      </div>
    <div
  style={{
    textAlign: "center",
    marginTop: "40px",
    width: "100%"
  }}
>
  <button
    onClick={() => {
      window.location.href = "/job-match";
    }}
    style={{
      padding: "14px 30px",
      fontSize: "16px",
      border: "none",
      borderRadius: "10px",
      background: "#2563eb",
      color: "white",
      cursor: "pointer"
    }}
  >
    Next → Job Description Matching
  </button>
</div>
    </div>
  );
}

export default ATSReport;