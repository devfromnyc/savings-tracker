import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Savings Tracker</h1>
        </div>
        {user && (
          <div className="nav-user">
            <span className="user-name">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
