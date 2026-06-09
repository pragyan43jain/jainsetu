import React, { useState } from "react";

const REGISTERED_TEMPLES = [
  {
    id: 1,
    name: "Shree Shankheshwar Parshwanath Tirth",
    location: "Patdi, Gujarat",
    sect: "Svetambara",
    type: "Pilgrimage",
    desc: "A legendary and ancient pilgrimage temple housing the highly miraculous blue-tinted idol of Shree Shankheshwar Parshwanath.",
    hasActiveBoli: true,
    established: "Approx. 1000+ years old",
    image: "🕌"
  },
  {
    id: 2,
    name: "Shree Mahavirji Digambar Atishaya Kshetra",
    location: "Karauli, Rajasthan",
    sect: "Digambara",
    type: "Pilgrimage",
    desc: "A major, highly revered center of devotion featuring a 1000-year-old clay-colored idol of Lord Mahavir excavated from the soil.",
    hasActiveBoli: true,
    established: "17th Century",
    image: "🛕"
  },
  {
    id: 3,
    name: "Palitana Shatrunjaya Hill Tirth",
    location: "Bhavnagar, Gujarat",
    sect: "Svetambara",
    type: "Pilgrimage",
    desc: "The world's largest temple city containing over 863 marble-carved shrines on top of the sacred Shatrunjaya Hills.",
    hasActiveBoli: false,
    established: "Ancient/Historic",
    image: "🏔️"
  },
  {
    id: 4,
    name: "Shree Sammed Shikharji Tirth",
    location: "Giridih, Jharkhand",
    sect: "All Sects",
    type: "Pilgrimage",
    desc: "The most sacred salvation place (Nirvana Bhumi) where 20 out of 24 Tirthankaras attained final liberation.",
    hasActiveBoli: false,
    established: "Immortal Tirth",
    image: "⛰️"
  },
  {
    id: 5,
    name: "Ranakpur Chaumukha Adinath Temple",
    location: "Pali, Rajasthan",
    sect: "Svetambara",
    type: "Historic",
    desc: "World-famous architectural wonder built on 1,444 uniquely carved marble pillars where no two carvings are alike.",
    hasActiveBoli: false,
    established: "15th Century",
    image: "🏛️"
  },
  {
    id: 6,
    name: "Shree Shantinath Digambar Jain Temple",
    location: "Pune, Maharashtra",
    sect: "Digambara",
    type: "Local",
    desc: "A beautiful, active local community center and temple housing high-energy morning Abhishek and children's Pathshalas.",
    hasActiveBoli: true,
    established: "2012",
    image: "⛩️"
  }
];

function TempleExplorer({ setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSect, setSelectedSect] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredTemples = REGISTERED_TEMPLES.filter((temple) => {
    const matchesSearch = temple.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          temple.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSect = selectedSect === "All" || temple.sect === selectedSect || temple.sect === "All Sects";
    const matchesType = selectedType === "All" || temple.type === selectedType;

    return matchesSearch && matchesSect && matchesType;
  });

  return (
    <div className="container animate-slide-in" style={{ padding: "40px 0" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="maroon-badge" style={{ marginBottom: "10px" }}>Registered Directory</span>
        <h2 style={{ fontSize: "2.5rem" }}>Explore Jain Temples</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "700px", margin: "10px auto 0 auto" }}>
          Browse historic pilgrimages and local Jain community centers registered under JainSetu.
        </p>
      </div>

      {/* Filter Options */}
      <div className="glass-panel gold-gradient-border" style={{
        padding: "25px",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        marginBottom: "35px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        {/* Search */}
        <div style={{ flex: "2 1 300px" }}>
          <input
            type="text"
            placeholder="🔍 Search temples by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-gold)",
              outline: "none",
              fontSize: "0.95rem"
            }}
          />
        </div>

        {/* Sect Filter */}
        <div style={{ flex: "1 1 150px" }}>
          <select
            value={selectedSect}
            onChange={(e) => setSelectedSect(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 15px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-gold)",
              outline: "none",
              background: "white",
              fontWeight: 600
            }}
          >
            <option value="All">All Sects / Panths</option>
            <option value="Svetambara">Svetambara</option>
            <option value="Digambara">Digambara</option>
          </select>
        </div>

        {/* Type Filter */}
        <div style={{ flex: "1 1 150px" }}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 15px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-gold)",
              outline: "none",
              background: "white",
              fontWeight: 600
            }}
          >
            <option value="All">All Types</option>
            <option value="Pilgrimage">Pilgrimage (Tirth)</option>
            <option value="Historic">Historic Architecture</option>
            <option value="Local">Local Mandir</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      {filteredTemples.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "30px"
        }}>
          {filteredTemples.map((temple) => (
            <div
              key={temple.id}
              className="glass-panel gold-gradient-border"
              style={{
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease"
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
              {/* Card Header graphic style */}
              <div className="gold-gradient-bg" style={{
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
                borderBottom: "1.5px solid var(--border-gold)",
                position: "relative"
              }}>
                {temple.image}
                <span className="maroon-badge" style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "15px",
                  fontSize: "0.7rem",
                  padding: "2px 8px"
                }}>
                  {temple.sect}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "25px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "between" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "5px" }}>{temple.name}</h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--primary-gold-dark)", fontWeight: 600, marginBottom: "12px" }}>
                    📍 {temple.location} | Est: {temple.established}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "20px" }}>
                    {temple.desc}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid var(--border-gold)", paddingTop: "15px", display: "flex", gap: "10px" }}>
                  {temple.hasActiveBoli ? (
                    <button
                      className="btn-maroon"
                      style={{ flex: 1, fontSize: "0.85rem", padding: "10px 0" }}
                      onClick={() => setActiveTab("boli")}
                    >
                      ⚡ Live Boli Open
                    </button>
                  ) : (
                    <button
                      className="btn-outline-gold"
                      style={{ flex: 1, fontSize: "0.85rem", padding: "10px 0" }}
                      onClick={() => setActiveTab("boli")}
                    >
                      Bidding Schedule
                    </button>
                  )}
                  <button
                    className="btn-gold"
                    style={{ flex: 1, fontSize: "0.85rem", padding: "10px 0" }}
                    onClick={() => setActiveTab("donations")}
                  >
                    🤝 Donate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "50px 20px",
          border: "2.5px dashed var(--border-gold)",
          borderRadius: "var(--radius-lg)",
          color: "var(--text-muted)"
        }}>
          <span style={{ fontSize: "3rem" }}>🔍</span>
          <h3 style={{ marginTop: "15px" }}>No Temples Found</h3>
          <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>
            Try adjusting your search keywords or filter settings.
          </p>
        </div>
      )}
    </div>
  );
}

export default TempleExplorer;
