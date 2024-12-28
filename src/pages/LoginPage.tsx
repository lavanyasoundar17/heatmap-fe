import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../modal/user";
import "../styles/Login.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/homePage");
    } catch (err: AxiosError) {
      if (err.status === 403 || err.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Travel Heatmap</h1>
      <form>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </form>

      <p>
        New user? <a href="/register">Create an account</a>
      </p>
    </div>
  );
};

export default LoginPage;
