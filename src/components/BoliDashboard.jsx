import React, { useState } from "react";

function BoliDashboard() {
  // No hardcoded fake data — bolis will be loaded from backend
  const [bolis] = useState([]);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="container animate-slide-in" style={{ padding: "40px 0" }}>

      {/* Page Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="maroon-badge" style={{ marginBottom: "10px" }}>Live Bidding Platform</span>
        <h2 style={{ fontSize: "2.5rem" }}>Ghee Boli Portal</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "680px", margin: "10px auto 0 auto" }}>
          Participate transparently in temple Boli (auction) ceremonies. Your winning bid directly funds
          temple activities, Jivdaya (animal welfare), and Pathshala education.
        </p>
      </div>

      {/* What is Boli — informational section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "25px",
        marginBottom: "50px"
      }}>
        {[
          {
            icon: "🚩",
            title: "Shantidhara Boli",
            desc: "Bid for the privilege of performing the sacred Shantidhara Abhishek — the auspicious first pouring of the morning ritual."
          },
          {
            icon: "🪔",
            title: "Aarti & Mangal Dipo",
            desc: "Bid for the honour of performing the evening Aarti — waving the main lamps before the Tirthankara idol."
          },
          {
            icon: "⛳",
            title: "Dhwaja Arohan",
            desc: "A high-value annual Boli for the privilege of hoisting the sacred flag (Dhwaja) on top of the temple's Shikhar."
          },
          {
            icon: "🎭",
            title: "Panch Kalyanak Roles",
            desc: "During consecration festivals, bid for the revered roles of Tirthankara parents, Indra, or Indrani in the procession."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="glass-panel gold-gradient-border"
            style={{
              padding: "25px",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--accent-maroon)" }}>{item.title}</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Auctions Area */}
      <div className="glass-panel gold-gradient-border" style={{
        padding: "50px 40px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        textAlign: "center"
      }}>
        <span style={{ fontSize: "3.5rem" }}>🔔</span>
        <h3 style={{ fontSize: "1.6rem", margin: "18px 0 10px 0" }}>No Live Auctions Right Now</h3>
        <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 25px auto", fontSize: "0.95rem" }}>
          Boli sessions are scheduled by registered temples. Once a temple posts an auction, it will appear here in real time. Check back soon or register your temple to create one.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <button className="btn-maroon" onClick={() => alert("Login to get notified when a Boli goes live.")}>
            🔔 Notify Me When Live
          </button>
          <button className="btn-outline-gold" onClick={() => alert("Redirecting to temple registration...")}>
            Register Your Temple
          </button>
        </div>
      </div>

    </div>
  );
}

export default BoliDashboard;
