import React, { useState, useEffect } from "react";

const INITIAL_BOLIS = [
  {
    id: 1,
    title: "Pratham Shantidhara Boli",
    temple: "Shree Shankheshwar Parshwanath Jain Tirth, Gujarat",
    ritual: "Morning Abhishek & Shantidhara (Auspicious First Pouring)",
    currentBid: 71000,
    highestBidder: "Amit Kumar Jain, Ahmedabad",
    timeLeft: 120, // seconds
    status: "active",
    category: "Svetambara",
    recentBids: [
      { bidder: "Amit Kumar Jain, Ahmedabad", amount: 71000, time: "2 mins ago" },
      { bidder: "Sanjay Shah, Baroda", amount: 65000, time: "4 mins ago" },
      { bidder: "Rahul Doshi, Mumbai", amount: 51000, time: "7 mins ago" }
    ]
  },
  {
    id: 2,
    title: "Aarti & Mangal Dipo Boli",
    temple: "Shree Mahavirji Digambar Jain Atishaya Kshetra, Rajasthan",
    ritual: "Evening Grand Aarti on Mahavir Jayanti Eve",
    currentBid: 31000,
    highestBidder: "Rajendra Sethi, Jaipur",
    timeLeft: 300, // seconds
    status: "active",
    category: "Digambara",
    recentBids: [
      { bidder: "Rajendra Sethi, Jaipur", amount: 31000, time: "30 secs ago" },
      { bidder: "Naveen Sogani, Delhi", amount: 25000, time: "3 mins ago" },
      { bidder: "Kamlesh Pahade, Indore", amount: 21000, time: "8 mins ago" }
    ]
  },
  {
    id: 3,
    title: "Varshik Dhwaja Arohan Boli",
    temple: "Girnar Hill Temple - Tonk 5, Gujarat",
    ritual: "Annual Sacred Flag Hoisting on the Temple Spire",
    currentBid: 251000,
    highestBidder: "Nemkumar Shah, Mumbai",
    timeLeft: 0, // Scheduled
    startTime: "Tomorrow at 09:00 AM",
    status: "upcoming",
    category: "Svetambara",
    recentBids: []
  },
  {
    id: 4,
    title: "Tirthankara Janma Kalyanak Mata-Pita Boli",
    temple: "Shree Shantinath Digambar Temple, Pune",
    ritual: "Privilege to act as Parents of Tirthankara in Panch Kalyanak",
    currentBid: 501000,
    highestBidder: "Motilal Oswal, Mumbai",
    timeLeft: 0,
    status: "closed",
    category: "Digambara",
    winnerName: "Motilal Oswal, Mumbai",
    recentBids: [
      { bidder: "Motilal Oswal, Mumbai", amount: 501000, time: "Closed" },
      { bidder: "Harshad Mehta, Pune", amount: 451000, time: "Closed" }
    ]
  }
];

const BOT_NAMES = [
  "Shrenik Shah, Surat",
  "Ketan Vora, Mumbai",
  "Pankaj Doshi, Pune",
  "Vardhman Jain, Delhi",
  "Shantilal Kothari, Chennai",
  "Pradeep Sanghvi, Bangalore"
];

function BoliDashboard() {
  const [bolis, setBolis] = useState(INITIAL_BOLIS);
  const [selectedBoli, setSelectedBoli] = useState(INITIAL_BOLIS[0]);
  const [userBidAmount, setUserBidAmount] = useState("");
  const [isBidding, setIsBidding] = useState(false);
  const [victoryState, setVictoryState] = useState(false);
  const [bidPlacedFeedback, setBidPlacedFeedback] = useState(false);
  const [simulatedBotBidding, setSimulatedBotBidding] = useState(false);

  // Live Timer Countdown for active bolis
  useEffect(() => {
    const interval = setInterval(() => {
      setBolis((prevBolis) => {
        const updated = prevBolis.map((boli) => {
          if (boli.status === "active" && boli.timeLeft > 0) {
            const nextTime = boli.timeLeft - 1;
            if (nextTime === 0) {
              return { ...boli, timeLeft: 0, status: "closed", winnerName: boli.highestBidder };
            }
            return { ...boli, timeLeft: nextTime };
          }
          return boli;
        });

        // Sync the selected Boli state
        const curSelected = updated.find((b) => b.id === selectedBoli.id);
        if (curSelected) {
          // If the timer just ticked to 0, trigger victory check if the user is the winner
          if (curSelected.timeLeft === 0 && selectedBoli.timeLeft > 0) {
            if (curSelected.highestBidder === "You (Devotee Portal)") {
              setVictoryState(true);
            }
          }
          setSelectedBoli(curSelected);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedBoli]);

  // Simulated bot counter-bidding logic
  useEffect(() => {
    if (selectedBoli.status !== "active") return;

    // Trigger bot bid when user becomes highest bidder
    if (selectedBoli.highestBidder === "You (Devotee Portal)" && !simulatedBotBidding) {
      setSimulatedBotBidding(true);
      const delay = Math.random() * 4000 + 3000; // 3 to 7 seconds delay
      const botTimer = setTimeout(() => {
        // Double check if selected Boli is still active and user is still highest
        setBolis((prevBolis) => {
          return prevBolis.map((boli) => {
            if (boli.id === selectedBoli.id && boli.status === "active") {
              // Bid increment (Auspicious increments)
              const increments = [5100, 11000, 21000];
              const randomInc = increments[Math.floor(Math.random() * increments.length)];
              const newBid = boli.currentBid + randomInc;
              const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
              
              const updatedBoli = {
                ...boli,
                currentBid: newBid,
                highestBidder: botName,
                recentBids: [
                  { bidder: botName, amount: newBid, time: "Just now" },
                  ...boli.recentBids
                ]
              };
              
              // Only trigger if selected is this one
              if (selectedBoli.id === boli.id) {
                setSelectedBoli(updatedBoli);
              }
              return updatedBoli;
            }
            return boli;
          });
        });
        setSimulatedBotBidding(false);
      }, delay);

      return () => clearTimeout(botTimer);
    }
  }, [selectedBoli.highestBidder]);

  const handlePlaceBid = (customAmount = null) => {
    if (selectedBoli.status !== "active" || selectedBoli.timeLeft <= 0) return;

    let bidVal = customAmount;
    if (!bidVal) {
      const parsedVal = parseInt(userBidAmount.replace(/,/g, ""), 10);
      if (isNaN(parsedVal)) {
        alert("Please enter a valid number");
        return;
      }
      bidVal = parsedVal;
    }

    if (bidVal <= selectedBoli.currentBid) {
      alert("Bid must be strictly higher than the current highest bid!");
      return;
    }

    setIsBidding(true);
    // Simulate API roundtrip
    setTimeout(() => {
      const updatedBoli = {
        ...selectedBoli,
        currentBid: bidVal,
        highestBidder: "You (Devotee Portal)",
        recentBids: [
          { bidder: "You (Devotee Portal)", amount: bidVal, time: "Just now" },
          ...selectedBoli.recentBids
        ]
      };

      setBolis((prevBolis) =>
        prevBolis.map((b) => (b.id === selectedBoli.id ? updatedBoli : b))
      );
      setSelectedBoli(updatedBoli);
      setUserBidAmount("");
      setIsBidding(false);
      
      // Trigger short visual popup feedback
      setBidPlacedFeedback(true);
      setTimeout(() => setBidPlacedFeedback(false), 2000);
    }, 400);
  };

  const handleAuspiciousIncrement = (inc) => {
    const nextBid = selectedBoli.currentBid + inc;
    handlePlaceBid(nextBid);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}m : ${remainingSecs.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="container animate-slide-in" style={{ padding: "40px 0" }}>
      {/* Page Heading */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="maroon-badge" style={{ marginBottom: "10px" }}>Live Bidding Platform</span>
        <h2 style={{ fontSize: "2.5rem" }}>Ghee Boli Portal</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "700px", margin: "10px auto 0 auto" }}>
          Participate transparently in temple bidding ceremonies. Top bids fund local temple upgrades, cow shelters, and educational pathshalas.
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap"
      }}>
        {/* Left List of Boli Cards */}
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3 style={{ fontSize: "1.2rem", borderBottom: "2px solid var(--border-gold)", paddingBottom: "10px" }}>
            Auctions Calendar
          </h3>

          {bolis.map((boli) => {
            const isSelected = selectedBoli.id === boli.id;
            return (
              <div
                key={boli.id}
                onClick={() => {
                  setSelectedBoli(boli);
                  setVictoryState(false);
                }}
                className={`glass-panel gold-gradient-border ${isSelected ? "selected" : ""}`}
                style={{
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  boxShadow: isSelected ? "var(--shadow-glow)" : "var(--shadow-sm)",
                  border: isSelected ? "1.5px solid var(--primary-gold)" : "1px solid var(--border-gold)",
                  transition: "all 0.3s ease",
                  transform: isSelected ? "translateX(5px)" : "none"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                  <span className={boli.status === "active" ? "maroon-badge animate-pulse-red" : "gold-badge"} style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                    {boli.status === "active" ? "● LIVE" : boli.status === "upcoming" ? "📅 UPCOMING" : "🏆 CLOSED"}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {boli.category}
                  </span>
                </div>
                
                <h4 style={{ fontSize: "1.05rem", marginBottom: "5px" }}>{boli.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "12px" }}>{boli.temple}</p>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Current Bid</span>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-maroon)" }}>
                      {formatCurrency(boli.currentBid)}
                    </div>
                  </div>
                  <div>
                    {boli.status === "active" ? (
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#d9534f" }}>
                        ⏳ {formatTime(boli.timeLeft)}
                      </span>
                    ) : boli.status === "upcoming" ? (
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--primary-gold-dark)" }}>
                        {boli.startTime}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                        Winner: {boli.winnerName?.split(",")[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Bidding Terminal */}
        <div style={{ flex: "2 1 600px" }}>
          <div className="glass-panel gold-gradient-border" style={{
            padding: "35px",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            minHeight: "550px"
          }}>
            {/* Victory Confetti Overlay */}
            {victoryState && (
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(255, 248, 230, 0.96)",
                borderRadius: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                textAlign: "center",
                padding: "30px",
                border: "3px solid var(--primary-gold)"
              }} className="animate-celebration">
                <span style={{ fontSize: "5rem" }} className="animate-float">🏆</span>
                <h3 style={{ fontSize: "2rem", color: "var(--accent-maroon)", margin: "15px 0" }}>Pranam! You Won the Boli</h3>
                <p style={{ color: "var(--text-main)", fontSize: "1.1rem", maxWidth: "450px", marginBottom: "25px" }}>
                  Your bid of <strong>{formatCurrency(selectedBoli.currentBid)}</strong> for the <em>{selectedBoli.title}</em> has been finalized. 
                  May Lord Parshwanath bring peace and prosperity to your family.
                </p>
                <div style={{ display: "flex", gap: "15px" }}>
                  <button className="btn-maroon" onClick={() => alert("Redirecting to secure gateway...")}>
                    Secure Payment
                  </button>
                  <button className="btn-outline-gold" onClick={() => setVictoryState(false)}>
                    Close
                  </button>
                </div>
                
                {/* Floating particles mimicking confetti */}
                {[...Array(15)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      width: "12px",
                      height: "12px",
                      backgroundColor: index % 3 === 0 ? "var(--primary-gold)" : index % 3 === 1 ? "var(--accent-maroon)" : "#4caf50",
                      borderRadius: index % 2 === 0 ? "50%" : "0%",
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      opacity: 0.6,
                      animation: "float 2s ease-in-out infinite",
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Boli Detail Header */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <span className="gold-badge">{selectedBoli.category} Section</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>ID: #JS-B0{selectedBoli.id}</span>
              </div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "5px", color: "var(--accent-maroon)" }}>{selectedBoli.title}</h2>
              <h4 style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500, marginBottom: "20px" }}>📍 {selectedBoli.temple}</h4>
              
              <div className="gold-gradient-bg" style={{
                padding: "20px",
                borderRadius: "var(--radius-md)",
                border: "1px dashed var(--primary-gold)",
                marginBottom: "30px"
              }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Ritual Purpose
                </span>
                <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-main)", marginTop: "5px" }}>
                  {selectedBoli.ritual}
                </p>
              </div>
            </div>

            {/* Live Bidding Layout */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", marginBottom: "30px" }}>
              {/* Left Bid Board */}
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Current Highest Bid</span>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--accent-maroon)", margin: "5px 0" }}>
                  {formatCurrency(selectedBoli.currentBid)}
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
                  👤 <span style={{ fontWeight: 600 }}>{selectedBoli.highestBidder}</span>
                </div>
                {selectedBoli.status === "active" && (
                  <div style={{ 
                    marginTop: "12px", 
                    fontSize: "0.8rem", 
                    color: selectedBoli.highestBidder === "You (Devotee Portal)" ? "#4caf50" : "#d9534f",
                    fontWeight: 700 
                  }}>
                    {selectedBoli.highestBidder === "You (Devotee Portal)" 
                      ? "✓ You are the highest bidder!" 
                      : simulatedBotBidding 
                        ? "⏳ Another devotee is placing a bid..." 
                        : "⚠️ You have been outbid!"}
                  </div>
                )}
              </div>

              {/* Right Bid Controls */}
              <div>
                {selectedBoli.status === "active" ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Time Remaining</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#d9534f" }} className="animate-pulse-red">
                        LIVE COUNTDOWN
                      </span>
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#d9534f", marginBottom: "20px" }}>
                      {formatTime(selectedBoli.timeLeft)}
                    </div>

                    {/* Quick Bid Increments */}
                    <div style={{ marginBottom: "15px" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                        Quick Auspicious Increments
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {[1100, 5100, 11000].map((inc) => (
                          <button
                            key={inc}
                            className="btn-outline-gold"
                            onClick={() => handleAuspiciousIncrement(inc)}
                            style={{ flex: 1, padding: "8px 0", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                            disabled={isBidding}
                          >
                            +{formatCurrency(inc).replace("₹", "")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Bid Form */}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ position: "relative", flex: 1 }}>
                        <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontWeight: 600 }}>
                          ₹
                        </span>
                        <input
                          type="number"
                          placeholder="Custom bid..."
                          value={userBidAmount}
                          onChange={(e) => setUserBidAmount(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "12px 12px 12px 28px",
                            borderRadius: "var(--radius-md)",
                            border: "2px solid var(--border-gold)",
                            outline: "none",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.95rem"
                          }}
                          disabled={isBidding}
                        />
                      </div>
                      <button 
                        className="btn-maroon"
                        onClick={() => handlePlaceBid()}
                        disabled={isBidding}
                        style={{ padding: "0 20px" }}
                      >
                        {isBidding ? "Placing..." : "Bid"}
                      </button>
                    </div>
                    
                    {bidPlacedFeedback && (
                      <div style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        textAlign: "center",
                        fontWeight: 600
                      }}>
                        🎉 Bid registered successfully!
                      </div>
                    )}
                  </>
                ) : selectedBoli.status === "upcoming" ? (
                  <div style={{
                    textAlign: "center",
                    padding: "30px 20px",
                    border: "1px dashed var(--border-gold)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(207, 168, 56, 0.03)"
                  }}>
                    <span style={{ fontSize: "2rem" }}>📅</span>
                    <h4 style={{ margin: "10px 0 5px 0" }}>Boli Starts Soon</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Opens on: <strong style={{ color: "var(--primary-gold-dark)" }}>{selectedBoli.startTime}</strong>
                    </p>
                    <button className="btn-outline-gold" style={{ marginTop: "15px", fontSize: "0.85rem", padding: "6px 15px" }} onClick={() => alert("Reminder set! We will notify you when it starts.")}>
                      🔔 Remind Me
                    </button>
                  </div>
                ) : (
                  <div style={{
                    textAlign: "center",
                    padding: "30px 20px",
                    border: "1px solid var(--border-gold)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "#f5f5f5"
                  }}>
                    <span style={{ fontSize: "2rem" }}>🏆</span>
                    <h4 style={{ margin: "10px 0 5px 0", color: "var(--text-muted)" }}>Boli Concluded</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Winning Bid: <strong>{formatCurrency(selectedBoli.currentBid)}</strong>
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      Winner: {selectedBoli.winnerName}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bid Log Table */}
            <div>
              <h3 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border-gold)", paddingBottom: "8px", marginBottom: "15px" }}>
                Recent Bid Logs
              </h3>
              {selectedBoli.recentBids.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "150px", overflowY: "auto" }}>
                  {selectedBoli.recentBids.map((bid, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: i === 0 ? "rgba(207, 168, 56, 0.05)" : "transparent",
                        borderRadius: "8px",
                        borderLeft: i === 0 ? "3px solid var(--primary-gold)" : "1.5px solid transparent"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "0.9rem" }}>{i === 0 ? "🥇" : "•"}</span>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: i === 0 ? 600 : 400 }}>
                            {bid.bidder}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{bid.time}</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--accent-maroon)" }}>
                        {formatCurrency(bid.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", padding: "10px" }}>
                  No bids placed yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoliDashboard;
