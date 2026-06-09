import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BoliDashboard from "./components/BoliDashboard";
import DonationHub from "./components/DonationHub";
import TempleExplorer from "./components/TempleExplorer";
import LoginModals from "./components/LoginModals";
import Footer from "./components/Footer";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [loginModal, setLoginModal] = useState({ isOpen: false, mode: "user" });
  const [userSession, setUserSession] = useState(null); // null, or { role: string }

  const handleOpenLogin = (mode) => {
    setLoginModal({ isOpen: true, mode });
  };

  const handleCloseLogin = () => {
    setLoginModal({ isOpen: false, mode: "user" });
  };

  const handleLoginSuccess = (roleName) => {
    setUserSession({
      name: roleName === "Devotee Account" ? "Shri Vardhman Jain" : "Paryushan Temple Trust (REG-GJ-1002)",
      role: roleName
    });
    alert(`Jai Jinendra! Successfully logged in as ${roleName}.`);
  };

  const handleLogout = () => {
    setUserSession(null);
    alert("Logged out successfully.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header Banner for Logged-In Sessions */}
      {userSession && (
        <div style={{
          background: "linear-gradient(90deg, var(--accent-maroon-light), var(--primary-gold))",
          color: "white",
          textAlign: "center",
          padding: "8px 10px",
          fontSize: "0.85rem",
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          boxShadow: "var(--shadow-sm)"
        }}>
          <span>🙏 Jai Jinendra! You are logged in as <strong>{userSession.name} ({userSession.role})</strong></span>
          <button 
            onClick={handleLogout}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 700
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Navigation bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenLogin={handleOpenLogin} 
      />

      {/* Main Content Render */}
      <main style={{ flex: 1 }}>
        {activeTab === "home" && (
          <Hero 
            setActiveTab={setActiveTab} 
            onOpenLogin={handleOpenLogin} 
          />
        )}
        
        {activeTab === "boli" && (
          <BoliDashboard />
        )}
        
        {activeTab === "donations" && (
          <DonationHub />
        )}
        
        {activeTab === "temples" && (
          <TempleExplorer setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Login Modals Overlay */}
      <LoginModals 
        isOpen={loginModal.isOpen} 
        mode={loginModal.mode} 
        onClose={handleCloseLogin} 
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
