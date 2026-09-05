import { useState } from "react";
import api from "../services/api";
import "./../styles/JobMatch.css";

function JobMatch() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  const analyzeJob = async () => {
    if (!description.trim()) {
      alert("Please paste a Job Description.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/api/job/match",
        {
          description: description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Job Matching Failed");
    }
  };

  let scoreColor = "#dc2626";
  let scoreLabel = "Needs Improvement";

  if (result) {
    if (result.match_score >= 90) {
      scoreColor = "#16a34a";
      scoreLabel = "Excellent Match";
    } else if (result.match_score >= 75) {
      scoreColor = "#2563eb";
      scoreLabel = "Good Match";
    } else if (result.match_score >= 60) {
      scoreColor = "#f59e0b";
      scoreLabel = "Average Match";
    }
  }

  return (
    <div className="job-page page-shell">
      <div className="job-grid-bg" />

      <div className="job-container">

        <div className="job-card glass-panel">

          <h1 className="career-title">Job Description Matching</h1>

          <p>
            Paste any company's Job Description below and PlacePro AI will compare it with your resume.
          </p>

          <textarea
            className="job-textarea"
            rows="12"
            placeholder="Paste Job Description Here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="job-action" onClick={analyzeJob}>
            Analyze Match
          </button>

        </div>

        {result && (

          <>
            <div className="job-card glass-panel">

              <div className="score-title" style={{ color: scoreColor }}>
                {result.match_score}%
              </div>

              <h2 style={{ textAlign: "center", color: scoreColor }}>
                {scoreLabel}
              </h2>

            </div>

            <div className="job-card glass-panel">

              <h2 className="section-title">Matched Skills</h2>

              <div className="skill-list">

                {result.matched_skills.length > 0 ? (
                  result.matched_skills.map((skill, index) => (
                    <div key={index} className="good">
                      ✅ {skill}
                    </div>
                  ))
                ) : (
                  <p>No matching skills found.</p>
                )}

              </div>

            </div>

            <div className="job-card glass-panel">

              <h2 className="section-title">Missing Skills</h2>

              <div className="skill-list">

                {result.missing_skills.length > 0 ? (
                  result.missing_skills.map((skill, index) => (
                    <div key={index} className="bad">
                      ❌ {skill}
                    </div>
                  ))
                ) : (
                  <p>
                    {result.match_score === 100
                      ? "🎉 No missing skills. Excellent!"
                      : "Resume needs more matching skills."}
                  </p>
                )}

              </div>

            </div>

            <div className="job-card glass-panel">

              <h2 className="section-title">AI Recommendations</h2>

              {result.match_score === 100 ? (
                <p>🎉 Your resume matches this Job Description perfectly.</p>
              ) : (
                <>
                  {result.missing_skills.map((skill, index) => (
                    <p key={index}>
                      • Learn <b>{skill}</b> and include it in your projects or resume.
                    </p>
                  ))}
                  <p>Improve the missing skills above to increase your match score.</p>
                </>
              )}

            </div>

          </>

        )}

      </div>
    </div>
  );
}

export default JobMatch;