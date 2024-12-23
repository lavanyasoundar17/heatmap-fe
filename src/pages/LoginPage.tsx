import React, { useState } from "react";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLoginSuccess = (userData: any) => {
    console.log("Login successful:", userData);
    setSuccessMessage("Logged in successfully!");
    setTimeout(() => setSuccessMessage(null), 5000); // Hide after 5 seconds
  };

  return (
    <div>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
