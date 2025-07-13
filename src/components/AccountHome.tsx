import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AccountHome: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="account-home">
      <div className="welcome-message">
        <h1>Welcome to your Savings Tracker</h1>
        <p className="user-status">User "{user?.name}" is logged in</p>
      </div>
    </div>
  );
};

export default AccountHome;
