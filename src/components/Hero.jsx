import React from "react";
import templeImage from "../assets/temple.png";

function Hero({ setActiveTab, onOpenLogin }) {
  return (
    <div className="animate-slide-in">

      {/* ── Hero Banner ── */}
      <section style={{ padding: "60px 0 50px 0" }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          gap: "50px",
          flexWrap: "wrap-reverse"
        }}>

          {/* Left: Text */}
          <div style={{ flex: "1 1 480px" }}>
            <div className="gold-badge" style={{ marginBottom: "15px" }}>
              <span style={{ fontSize: "1.1rem" }}>🪔</span> Digitalizing Jain Traditions
            </div>

            <h1 style={{
              fontSize: "3rem",
              lineHeight: "1.15",
              marginBottom: "20px",
              background: "linear-gradient(135deg, var(--text-main) 30%, var(--primary-gold-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Your Jain Community,<br />Now Fully Digital
            </h1>

            <p style={{
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              lineHeight: "1.85",
              marginBottom: "35px"
            }}>
              Welcome to <strong>JainSetu</strong> — the digital home for Jain temples and their community.
              Participate in live bidding ceremonies like <strong>Shantidhara</strong> and <strong>Dhwaja Boli</strong>,
              support sacred causes online, and explore registered temples across India.
            </p>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <button className="btn-maroon" onClick={() => setActiveTab("boli")}>
                <span>🚩</span> Boli Portal
              </button>
              <button className="btn-gold" onClick={() => setActiveTab("donations")}>
                <span>🤝</span> Donate
              </button>
              <button className="btn-outline-gold" onClick={() => setActiveTab("temples")}>
                <span>🕌</span> Temples
              </button>
            </div>
          </div>

          {/* Right: Temple Image */}
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
            <div className="gold-gradient-border animate-float" style={{
              borderRadius: "var(--radius-lg)",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.4)",
              boxShadow: "var(--shadow-lg)",
              width: "100%",
              maxWidth: "500px",
              overflow: "hidden"
            }}>
              <img
                src={templeImage}
                alt="Jain Temple"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "calc(var(--radius-lg) - 6px)",
                  display: "block"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Dual Portal Cards ── */}
      <section className="gold-gradient-bg" style={{
        padding: "70px 0",
        borderTop: "1px solid var(--border-gold)",
        borderBottom: "1px solid var(--border-gold)"
      }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "45px" }}>
            <div className="maroon-badge" style={{ marginBottom: "10px" }}>Our Portals</div>
            <h2 style={{ fontSize: "2.4rem" }}>Two Portals, One Platform</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "580px", margin: "10px auto 0 auto" }}>
              Tailored experiences for devotees and temple committees alike.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "35px"
          }}>
            {/* Devotee Card */}
            <div className="glass-panel gold-gradient-border" style={{
              padding: "38px",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🧑‍💻</div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Devotee Portal</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "22px", fontSize: "0.93rem" }}>
                  Participate in live Ghee Boli sessions, donate to specific Jain causes,
                  and receive 80G tax-exemption receipts — all from one place.
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
                  {[
                    "Browse registered Jain temples",
                    "Participate in Live Ghee Boli",
                    "Secure payments & instant receipts",
                    "View temple events & calendar"
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "11px", fontSize: "0.88rem" }}>
                      <span style={{ color: "var(--primary-gold)", fontWeight: "bold" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-outline-gold" style={{ width: "100%", marginTop: "auto" }} onClick={() => setActiveTab("boli")}>
                Enter Devotee Portal
              </button>
            </div>

            {/* Temple Admin Card */}
            <div className="glass-panel gold-gradient-border" style={{
              padding: "38px",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>⛩️</div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Temple Admin Portal</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "22px", fontSize: "0.93rem" }}>
                  Digitalize your temple's bidding system, manage donation drives,
                  publish events, and maintain auditable financial ledgers.
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}>
                  {[
                    "List and manage live Boli sessions",
                    "Accept purpose-specific e-donations",
                    "Publish events & announcements",
                    "Generate compliance reports"
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "11px", fontSize: "0.88rem" }}>
                      <span style={{ color: "var(--accent-maroon)", fontWeight: "bold" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-maroon" style={{ width: "100%", marginTop: "auto" }} onClick={() => onOpenLogin("temple")}>
                Register Your Temple
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Hero;
