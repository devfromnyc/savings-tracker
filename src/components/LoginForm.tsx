import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password) return;
    const accountsRaw = localStorage.getItem("accounts");
    let accounts: Record<string, { password: string }> = {};
    if (accountsRaw) {
      try {
        accounts = JSON.parse(accountsRaw);
      } catch {}
    }
    if (accounts[name]) {
      // Account exists, check password
      if (accounts[name].password === password) {
        setError(null);
        login(name, password);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } else {
      // Create new account
      accounts[name] = { password };
      localStorage.setItem("accounts", JSON.stringify(accounts));
      setError(null);
      login(name, password);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Savings Tracker</h2>
        <p>Please enter your name and password to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>
          {error && (
            <div style={{ color: "#e11d48", fontSize: 14, marginBottom: 8 }}>
              {error}
            </div>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
