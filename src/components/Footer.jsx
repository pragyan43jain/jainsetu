import React from "react";

function Footer({ setActiveTab }) {
  return (
    <footer style={{
      backgroundColor: "#1f1a11",
      color: "#eae5d8",
      padding: "60px 0 30px 0",
      borderTop: "3px solid var(--primary-gold)",
      marginTop: "auto"
    }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "40px",
        marginBottom: "40px"
      }}>
        {/* About column */}
        <div>
          <h3 style={{ color: "var(--primary-gold-light)", marginBottom: "15px", fontSize: "1.3rem" }}>
            JainSetu
          </h3>
          <p style={{ fontSize: "0.85rem", lineHeight: "1.7", color: "#b5af9f", marginBottom: "15px" }}>
            Connecting Jain temples, devotees, and trusts across India through transparent digitalization. Bringing traditional bidding systems (Boli) online.
          </p>
          <div style={{ display: "flex", gap: "10px", fontSize: "1.2rem" }}>
            <span>🕊️</span> <span>🪔</span> <span>🙏</span>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "1rem" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem" }}>
            {[
              { id: "home", label: "Home Base" },
              { id: "boli", label: "Live Ghee Boli" },
              { id: "donations", label: "Donation Hub" },
              { id: "temples", label: "Temples Directory" }
            ].map((link) => (
              <li 
                key={link.id} 
                onClick={() => setActiveTab(link.id)}
                style={{ 
                  marginBottom: "10px", 
                  cursor: "pointer", 
                  color: "#b5af9f",
                  transition: "color 0.2s" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-gold-light)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#b5af9f"}
              >
                {link.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Guidelines / Help */}
        <div>
          <h4 style={{ color: "#ffffff", marginBottom: "15px", fontSize: "1rem" }}>Help & Rules</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", color: "#b5af9f" }}>
            <li style={{ marginBottom: "10px" }}>Boli Bidding Guidelines</li>
            <li style={{ marginBottom: "10px" }}>Tax Exemption (80G) Info</li>
            <li style={{ marginBottom: "10px" }}>Temple Compliance & Audits</li>
            <li style={{ marginBottom: "10px" }}>Trustee Board Terms</li>
          </ul>
        </div>

        {/* Sacred Quote */}
        <div style={{
          borderLeft: "2px solid var(--primary-gold)",
          paddingLeft: "20px"
        }}>
          <h4 style={{ color: "var(--primary-gold-light)", marginBottom: "10px", fontSize: "1rem" }}>
            Ahimsa Parmo Dharma
          </h4>
          <p style={{
            fontSize: "0.85rem",
            fontStyle: "italic",
            lineHeight: "1.6",
            color: "#d1cbbd"
          }}>
            "All breathing, existing, living, sentient creatures should not be slain, nor treated with violence, nor abused, nor tormented, nor driven away."
          </p>
          <span style={{ fontSize: "0.75rem", display: "block", marginTop: "10px", color: "var(--primary-gold)" }}>
            — Lord Mahavira (Acharanga Sutra)
          </span>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        paddingTop: "20px",
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#857f72"
      }}>
        <p>© 2026 JainSetu Foundation. All Rights Reserved. Designed with reverence for the community.</p>
      </div>
    </footer>
  );
}

export default Footer;
