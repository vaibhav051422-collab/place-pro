import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const report = JSON.parse(localStorage.getItem("atsReport"));

  const atsScore = report?.ats_score?.overall || "Not Available";

  const [placement, setPlacement] = useState(null);

  useEffect(() => {

    const fetchPlacement = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await api.get(
          "/api/placement/readiness",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setPlacement(res.data);

      } catch (err) {

        console.error(err);

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
          fontFamily: "Arial"
        }}
      >

        <h1>Welcome Back 👋</h1>

        <p>Your AI Placement Dashboard</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
            marginTop: "35px"
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

          {/* Placement Readiness */}

          <div className="dashboard-card">

            <h2>Placement Readiness</h2>

            <h1>

              {
                placement
                  ? `${placement.placement_score}%`
                  : "..."
              }

            </h1>

            <p>

              {
                placement
                  ? "Interview Readiness"
                  : "Loading..."
              }

            </p>

          </div>

        </div>

        <div
          style={{
            marginTop: "60px"
          }}
        >

          <h2>Quick Actions</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "20px"
            }}
          >

            <button
              onClick={() => navigate("/upload")}
            >
              Upload Resume
            </button>

            <button
              onClick={() => navigate("/report")}
            >
              ATS Report
            </button>

            <button
              onClick={() => navigate("/job-match")}
            >
              Job Match
            </button>

          </div>

        </div>

        {

          placement && (

            <div
              style={{
                marginTop: "50px"
              }}
            >

              <div className="dashboard-card">

                <h2>Strengths</h2>

                <ul>

                  {

                    placement.strengths.map((item, index) => (

                      <li key={index}>
                        ✅ {item}
                      </li>

                    ))

                  }

                </ul>

                <h2
                  style={{
                    marginTop: "30px"
                  }}
                >
                  Recommendations
                </h2>

                <ul>

                  {

                    placement.recommendations.map((item, index) => (

                      <li key={index}>
                        💡 {item}
                      </li>

                    ))

                  }

                </ul>

              </div>

            </div>

          )

        }

      </div>

    </>

  );

}

export default Dashboard;