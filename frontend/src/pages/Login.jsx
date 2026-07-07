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

    localStorage.setItem("token", res.data.access_token);

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
    <div style={{ padding: "40px" }}>
      <h1>PlacePro AI</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
  Login
</button>

<br />
<br />

<button onClick={() => navigate("/register")}>
  Create New Account
</button>
    </div>
  );
}

export default Login;