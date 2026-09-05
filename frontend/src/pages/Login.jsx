import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const res = await api.post(
        "/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Clear previous user's cached data
      localStorage.removeItem("dashboardData");
      localStorage.removeItem("atsReport");

      // Save login info
      localStorage.setItem("token", res.data.access_token);

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.detail || "Login Failed"
      );
    }
  };

  return (
    <div className="auth-shell page-shell">
      <div className="page-grid-bg" />
      <div className="soft-glow" />
      <div className="soft-glow secondary" />

      <div className="auth-card glass-panel auth-card--split">
        <div className="auth-aside">
          <span className="pill">Placement readiness suite</span>
          <h1 className="auth-title">PlacePro AI</h1>
          <p className="auth-subtitle">
            A focused workspace for resume analysis, company matching,
            and placement prep.
          </p>

          <div className="auth-points">
            <div className="auth-point">
              <strong>Resume score</strong>
              <span>See how your CV performs before you apply.</span>
            </div>

            <div className="auth-point">
              <strong>AI guidance</strong>
              <span>Get targeted suggestions for interviews and skills.</span>
            </div>

            <div className="auth-point">
              <strong>Placement ready</strong>
              <span>Track what matters with a cleaner, bigger interface.</span>
            </div>
          </div>
        </div>

        <div className="auth-form-panel glass-panel">
          <div className="auth-form-head">
            <span className="pill">Welcome back</span>
            <h2 className="auth-panel-title">Sign in to continue</h2>
            <p className="auth-subtitle">
              Use the email and password you registered with.
            </p>
          </div>

          <div className="auth-form">
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

            <button className="btn-primary auth-submit" onClick={handleLogin}>
              Login
            </button>

            <button className="btn-ghost auth-secondary" onClick={() => navigate("/register")}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;