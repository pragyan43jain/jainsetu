import React from "react";
import templeImage from "../assets/temple.png";

function Hero({ setActiveTab }) {
  return (
    <div className="animate-slide-in">
      {/* Hero Core */}
      <section style={{ padding: "60px 0 40px 0" }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          gap: "50px",
          flexWrap: "wrap-reverse"
        }}>
          {/* Left Text Box */}
          <div style={{ flex: "1 1 500px" }}>
            <div className="gold-badge" style={{ marginBottom: "15px" }}>
              <span style={{ fontSize: "1.1rem" }}>🪔</span> Digitalizing Jain Traditions
            </div>
            
            <h2 style={{
              fontSize: "3rem",
              lineHeight: "1.15",
              marginBottom: "20px",
              background: "linear-gradient(135deg, var(--text-main) 30%, var(--primary-gold-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Connecting Temples, Devotees, and Traditions
            </h2>

            <p style={{
              fontSize: "1.1rem",
              color: "var(--text-muted)",
              lineHeight: "1.8",
              marginBottom: "35px"
            }}>
              Welcome to <strong>JainSetu</strong>. Experience complete transparency, community connection, and devotion. 
              Participate in live temple rituals like <strong>Shantidhara</strong> and <strong>Dhwaja Boli</strong>, 
              support vital community initiatives directly, and stay updated with Jain festivals across India.
            </p>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <button 
                className="btn-maroon animate-pulse-red" 
                onClick={() => setActiveTab("boli")}
              >
                <span>🚩</span> Participate in Live Boli
              </button>
              
              <button 
                className="btn-gold" 
                onClick={() => setActiveTab("donations")}
              >
                <span>🤝</span> Online Donations
              </button>
              
              <button 
                className="btn-outline-gold" 
                onClick={() => setActiveTab("temples")}
              >
                <span>🕌</span> Explore Temples
              </button>
            </div>
          </div>

          {/* Right Image Box */}
          <div style={{ 
            flex: "1 1 400px",
            display: "flex",
            justifyContent: "center"
          }}>
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
                alt="Jain Temple Marble Carvings" 
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

      {/* Stats Section */}
      <section style={{ padding: "40px 0" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px"
          }}>
            {[
              { val: "500+", lbl: "Temples Registered", desc: "Across India & abroad", icon: "🕌" },
              { val: "24/7", lbl: "Live Boli Auctions", desc: "Shantidhara, Aarti & Dhwaja", icon: "🚩" },
              { val: "₹12.5 Cr+", lbl: "Funds Transferred", desc: "100% transparent tracking", icon: "💰" },
              { val: "10,000+", lbl: "Active Devotees", desc: "Interconnected community", icon: "👥" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="glass-panel gold-gradient-border"
                style={{
                  padding: "25px",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{stat.icon}</div>
                <h3 style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, var(--accent-maroon) 0%, var(--primary-gold-dark) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "5px"
                }}>{stat.val}</h3>
                <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "4px" }}>
                  {stat.lbl}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview / Portals */}
      <section className="gold-gradient-bg" style={{ padding: "80px 0", borderTop: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="maroon-badge" style={{ marginBottom: "10px" }}>Our Portals</div>
            <h2 style={{ fontSize: "2.5rem" }}>Dual Portal Experience</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "10px auto 0 auto" }}>
              Tailored services for our community members as well as temple trusts and administrative committees.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "35px"
          }}>
            {/* User Card */}
            <div className="glass-panel gold-gradient-border" style={{
              padding: "40px",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "between"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🧑‍💻</div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "15px" }}>Devotee Portal</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "25px", fontSize: "0.95rem" }}>
                  Access ritual programs and participate from anywhere in the world. Enjoy automated updates, tax-exemption receipts, and clear live stream bidding.
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "30px" }}>
                  {["Browse registered temples nationwide", "Participate in Live Ghee Boli", "Secure payments & instant receipts", "View community news & calendar"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--primary-gold)", fontWeight: "bold" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-outline-gold" style={{ width: "100%" }} onClick={() => setActiveTab("boli")}>
                Access Devotee Portal
              </button>
            </div>

            {/* Temple Trust Card */}
            <div className="glass-panel gold-gradient-border" style={{
              padding: "40px",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-md)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "between"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>⛩️</div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "15px" }}>Temple Admin Portal</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "25px", fontSize: "0.95rem" }}>
                  Digitalize your temple's finance and ritual bidding system. Streamline public announcements, keep auditable bid ledgers, and manage special donation initiatives.
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "30px" }}>
                  {["List and manage live/silent Boli items", "Accept specific purpose e-donations", "Publish temple events & updates", "Generate financial compliance sheets"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--accent-maroon)", fontWeight: "bold" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-maroon" style={{ width: "100%" }} onClick={() => onOpenLogin("temple")}>
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
