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

    <div style={{ padding: 40 }}>

      <h1>PlacePro AI</h1>

      <h2>Create Account</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Already have an account? Login
      </button>

    </div>

  );
}

export default Register;