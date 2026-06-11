import React, { useState } from "react";
import logoImage from "../assets/logo.png";

function Navbar({ activeTab, setActiveTab, onOpenLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass-panel gold-gradient-border" style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "12px 0",
      boxShadow: "var(--shadow-sm)"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px"
      }}>

        {/* Logo + Brand Name */}
        <div
          onClick={() => setActiveTab("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            flexShrink: 0
          }}
        >
          <img
            src={logoImage}
            alt="JainSetu Logo"
            style={{
              width: "42px",
              height: "42px",
              objectFit: "contain",
              borderRadius: "8px"
            }}
          />
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
              fontSize: "0.55rem",
              color: "var(--text-muted)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginTop: "-2px",
              fontWeight: 600
            }}>Digitalizing Jain Community</div>
          </div>
        </div>

        {/* Mobile hamburger toggle */}
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
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold-dark)" strokeWidth="2.5">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>

        {/* Center Nav Links + Right-side Auth Buttons */}
        <div
          className={`nav-menu-container ${menuOpen ? "open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "30px",
            flex: 1
          }}
        >
          {/* Nav Links */}
          <ul style={{
            display: "flex",
            listStyle: "none",
            gap: "22px",
            margin: 0,
            padding: 0
          }} className="nav-links-list">
            {[
              { id: "home",      label: "Home"       },
              { id: "boli",      label: "Boli Portal" },
              { id: "donations", label: "Donations"   },
              { id: "temples",   label: "Temples"     }
            ].map((link) => (
              <li
                key={link.id}
                onClick={() => { setActiveTab(link.id); setMenuOpen(false); }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.92rem",
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

          {/* Auth Buttons — pushed to far right */}
          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }} className="nav-buttons-container">
            <button
              className="btn-outline-gold"
              onClick={() => onOpenLogin("user")}
              style={{ padding: "7px 14px", fontSize: "0.8rem" }}
            >
              User Login
            </button>
            <button
              className="btn-gold"
              onClick={() => onOpenLogin("temple")}
              style={{ padding: "7px 14px", fontSize: "0.8rem" }}
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
