import React, { useState } from "react";

function Navbar({ activeTab, setActiveTab, onOpenLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass-panel gold-gradient-border" style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "15px 0",
      boxShadow: "var(--shadow-sm)"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "between",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        {/* Elegant SVG Logo & Title */}
        <div 
          onClick={() => setActiveTab("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Parasnath/Prabha-mandal hood backdrop */}
            <circle cx="50" cy="50" r="45" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" stroke="url(#goldGrad)" strokeWidth="0.75" />
            
            {/* Elegant Bridge / Setu lines (double arches) */}
            <path d="M15 65 C 30 40, 70 40, 85 65" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
            <path d="M25 68 C 35 52, 65 52, 75 68" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            
            {/* Stylized Lotus Bloom at the center of the bridge */}
            <path d="M50 34 C44 44, 46 55, 50 55 C54 55, 56 44, 50 34 Z" fill="url(#maroonGrad)" />
            <path d="M50 34 C40 38, 42 48, 48 51 C45 44, 48 38, 50 34 Z" fill="url(#goldGrad)" opacity="0.9" />
            <path d="M50 34 C60 38, 58 48, 52 51 C55 44, 52 38, 50 34 Z" fill="url(#goldGrad)" opacity="0.9" />
            <path d="M50 34 C36 42, 36 52, 45 54 C40 47, 46 40, 50 34 Z" fill="url(#goldGrad)" opacity="0.7" />
            <path d="M50 34 C64 42, 64 52, 55 54 C60 47, 54 40, 50 34 Z" fill="url(#goldGrad)" opacity="0.7" />

            {/* Radiant sunbeams representing Gyan (knowledge) */}
            <line x1="50" y1="12" x2="50" y2="22" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="20" x2="37" y2="27" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="20" x2="63" y2="27" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6c567" />
                <stop offset="50%" stopColor="#cfa838" />
                <stop offset="100%" stopColor="#a88321" />
              </linearGradient>
              <linearGradient id="maroonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b02332" />
                <stop offset="100%" stopColor="#851722" />
              </linearGradient>
            </defs>
          </svg>

          <div>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.6rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, var(--accent-maroon) 0%, var(--primary-gold-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px"
            }}>JainSetu</span>
            <div style={{
              fontSize: "0.6rem",
              color: "var(--text-muted)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginTop: "-3px",
              fontWeight: 600
            }}>Digitalizing Community</div>
          </div>
        </div>

        {/* Mobile menu Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            outline: "none"
          }}
          className="mobile-toggle-btn"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold-dark)" strokeWidth="2.5">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>

        {/* Navigation Menu */}
        <div 
          className={`nav-menu-container ${menuOpen ? "open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "35px"
          }}
        >
          <ul style={{
            display: "flex",
            listStyle: "none",
            gap: "25px",
            margin: 0,
            padding: 0
          }} className="nav-links-list">
            {[
              { id: "home", label: "Home" },
              { id: "boli", label: "Boli Portal" },
              { id: "donations", label: "Donations" },
              { id: "temples", label: "Temples" }
            ].map((link) => (
              <li 
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMenuOpen(false);
                }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  color: activeTab === link.id ? "var(--accent-maroon)" : "var(--text-muted)",
                  position: "relative",
                  padding: "5px 0",
                  transition: "color 0.25s ease"
                }}
                className="nav-link-item"
              >
                {link.label}
                {activeTab === link.id && (
                  <span style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    background: "linear-gradient(90deg, var(--accent-maroon), var(--primary-gold))",
                    borderRadius: "2px"
                  }} />
                )}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: "10px" }} className="nav-buttons-container">
            <button 
              className="btn-outline-gold" 
              onClick={() => onOpenLogin("user")}
              style={{ padding: "8px 18px", fontSize: "0.85rem" }}
            >
              User Login
            </button>
            <button 
              className="btn-gold" 
              onClick={() => onOpenLogin("temple")}
              style={{ padding: "8px 18px", fontSize: "0.85rem" }}
            >
              Temple Login
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle-btn {
            display: block !important;
          }
          .nav-menu-container {
            display: none !important;
            flex-direction: column;
            width: 100%;
            margin-top: 15px;
            gap: 20px !important;
            align-items: flex-start !important;
          }
          .nav-menu-container.open {
            display: flex !important;
          }
          .nav-links-list {
            flex-direction: column;
            width: 100%;
            gap: 15px !important;
          }
          .nav-buttons-container {
            width: 100%;
            flex-direction: column;
          }
          .nav-buttons-container button {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
