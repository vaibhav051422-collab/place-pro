import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await api.post("/api/auth/register", {
        name,
        email,
        password
      });

      // Clear any old cached data
      localStorage.removeItem("dashboardData");
      localStorage.removeItem("atsReport");

      alert("Registration Successful!");

      navigate("/");

    } catch (err) {

      if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Registration Failed");
      }

    }

  };

  return (
    <div className="auth-shell page-shell">
      <div className="page-grid-bg" />
      <div className="soft-glow" />
      <div className="soft-glow secondary" />

      <div className="auth-card glass-panel auth-card--split">
        <div className="auth-aside">
          <span className="pill">Create your account</span>
          <h1 className="auth-title">Join PlacePro AI</h1>
          <p className="auth-subtitle">
            Unlock resume analysis, company matching, and AI-powered placement prep.
          </p>

          <div className="auth-points">
            <div className="auth-point">
              <strong>Fast setup</strong>
              <span>Create your account in less than a minute.</span>
            </div>

            <div className="auth-point">
              <strong>Placement tools</strong>
              <span>Use all dashboard features after registration.</span>
            </div>

            <div className="auth-point">
              <strong>Cleaner layout</strong>
              <span>The auth screens now feel larger and easier to use.</span>
            </div>
          </div>
        </div>

        <div className="auth-form-panel glass-panel">
          <div className="auth-form-head">
            <span className="pill">New account</span>
            <h2 className="auth-panel-title">Create your profile</h2>
            <p className="auth-subtitle">
              Add your details below to start using the platform.
            </p>
          </div>

          <div className="auth-form">
            <input
              className="field-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="field-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="field-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="field-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="btn-primary auth-submit" onClick={handleRegister}>
              Register
            </button>

            <button className="btn-ghost auth-secondary" onClick={() => navigate("/")}>
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Register;