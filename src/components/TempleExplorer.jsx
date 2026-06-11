import React, { useState } from "react";

function TempleExplorer({ setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSect, setSelectedSect] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Temples will be populated from the backend database
  const temples = [];

  return (
    <div className="container animate-slide-in" style={{ padding: "40px 0" }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="maroon-badge" style={{ marginBottom: "10px" }}>Registered Directory</span>
        <h2 style={{ fontSize: "2.5rem" }}>Explore Jain Temples</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "650px", margin: "10px auto 0 auto" }}>
          Browse Jain temples registered under JainSetu. Temple trusts can register to list their
          active Boli sessions and receive community donations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel gold-gradient-border" style={{
        padding: "22px 25px",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        marginBottom: "35px",
        display: "flex",
        gap: "18px",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <div style={{ flex: "2 1 280px" }}>
          <input
            type="text"
            placeholder="🔍  Search by temple name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 16px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-gold)",
              outline: "none",
              fontSize: "0.93rem",
              fontFamily: "var(--font-body)"
            }}
          />
        </div>

        <div style={{ flex: "1 1 150px" }}>
          <select
            value={selectedSect}
            onChange={(e) => setSelectedSect(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-gold)",
              outline: "none",
              background: "white",
              fontWeight: 600,
              fontFamily: "var(--font-body)"
            }}
          >
            <option value="All">All Sects</option>
            <option value="Svetambara">Svetambara</option>
            <option value="Digambara">Digambara</option>
          </select>
        </div>

        <div style={{ flex: "1 1 150px" }}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-gold)",
              outline: "none",
              background: "white",
              fontWeight: 600,
              fontFamily: "var(--font-body)"
            }}
          >
            <option value="All">All Types</option>
            <option value="Pilgrimage">Pilgrimage (Tirth)</option>
            <option value="Historic">Historic</option>
            <option value="Local">Local Mandir</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        border: "2.5px dashed var(--border-gold)",
        borderRadius: "var(--radius-lg)",
        color: "var(--text-muted)"
      }}>
        <span style={{ fontSize: "3.5rem" }}>🕌</span>
        <h3 style={{ marginTop: "18px", fontSize: "1.5rem", color: "var(--text-main)" }}>
          No Temples Registered Yet
        </h3>
        <p style={{ fontSize: "0.92rem", marginTop: "10px", maxWidth: "480px", margin: "10px auto 0 auto" }}>
          Jain temples and trusts can register with JainSetu to list their Boli sessions, accept donations,
          and publish events. Be the first in your community to go digital.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "28px", flexWrap: "wrap" }}>
          <button className="btn-maroon" onClick={() => alert("Temple registration form coming soon!")}>
            Register Your Temple
          </button>
          <button className="btn-outline-gold" onClick={() => setActiveTab("home")}>
            Back to Home
          </button>
        </div>
      </div>

    </div>
  );
}

export default TempleExplorer;
