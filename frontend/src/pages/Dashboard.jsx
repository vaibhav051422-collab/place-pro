import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const report = JSON.parse(localStorage.getItem("atsReport"));

  const atsScore = report?.ats_score?.overall || "Not Available";

  const [placement, setPlacement] = useState({
    placement_score: 0,
    strengths: [],
    recommendations: [],
  });

  useEffect(() => {
    const fetchPlacement = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/api/placement/readiness", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlacement({
          placement_score: res.data.placement_score || 0,
          strengths: res.data.strengths || [],
          recommendations: res.data.recommendations || [],
        });
      } catch (err) {
        console.error(err);

        setPlacement({
          placement_score: 0,
          strengths: [],
          recommendations: [],
        });
      }
    };

    fetchPlacement();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          fontFamily: "Arial",
        }}
      >
        <h1>Welcome Back 👋</h1>

        <p>Your AI Placement Dashboard</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
            marginTop: "35px",
          }}
        >
          {/* Resume */}

          <div className="dashboard-card">
            <h2>Resume</h2>
            <h1>📄</h1>
            <p>Uploaded</p>
          </div>

          {/* ATS */}

          <div className="dashboard-card">
            <h2>ATS Score</h2>
            <h1>{atsScore}</h1>
            <p>/100</p>
          </div>

          {/* Job Match */}

          <div className="dashboard-card">
            <h2>Job Match</h2>
            <h1>💼</h1>
            <p>Analyze Anytime</p>
          </div>

          {/* Placement */}

          <div className="dashboard-card">
            <h2>Placement Readiness</h2>

            <h1>{placement.placement_score}%</h1>

            <p>
              {placement.placement_score > 0
                ? "Interview Readiness"
                : "Loading..."}
            </p>
          </div>
        </div>

        {/* Quick Actions */}

        <div
          style={{
            marginTop: "60px",
          }}
        >
          <h2>Quick Actions</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button onClick={() => navigate("/upload")}>
              Upload Resume
            </button>

            <button onClick={() => navigate("/report")}>
              ATS Report
            </button>

            <button onClick={() => navigate("/career-match")}>
              Career Match
            </button>
          </div>
        </div>

        {/* Placement Details */}

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <div className="dashboard-card">
            <h2>Strengths</h2>

            {placement.strengths.length === 0 ? (
              <p>No strengths available.</p>
            ) : (
              <ul>
                {placement.strengths.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            )}

            <h2
              style={{
                marginTop: "30px",
              }}
            >
              Recommendations
            </h2>

            {placement.recommendations.length === 0 ? (
              <p>No recommendations available.</p>
            ) : (
              <ul>
                {placement.recommendations.map((item, index) => (
                  <li key={index}>💡 {item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;