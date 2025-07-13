import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import AccountHome from "./components/AccountHome";
import Navigation from "./components/Navigation";
import "./App.css";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {!isAuthenticated ? <LoginForm /> : <AccountHome />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
