import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8080/user/reg", {
        name,
        email,
        password,
      });

      setSuccessMessage("User created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data || "Failed to register");
    }
  };

  return (
    <div className="register-container">
      <h1>Create User Profile</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Create User Profile</button>
      </form>
    </div>
  );
};

export default RegisterPage;
