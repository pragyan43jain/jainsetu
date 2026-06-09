import React, { useState } from "react";

const DONATION_CAUSES = [
  {
    id: "jivdaya",
    title: "Jivdaya & Pinjrapole Support",
    desc: "Fund bird-feeding towers (Chabutras), animal shelters, and medical camps for cattle and birds, which is central to Jain Ahimsa values.",
    icon: "🕊️",
    suggestedAmounts: [1100, 2100, 5100, 11000],
    highlight: "Sponsor feed for 1 cow for a month: ₹2,100"
  },
  {
    id: "sadharmik",
    title: "Sadharmik Bhakti (Mutual Aid)",
    desc: "Direct financial assistance, medical insurance support, and educational scholarships for underprivileged families in our community.",
    icon: "🤝",
    suggestedAmounts: [2100, 5100, 11000, 21000],
    highlight: "Medical aid sponsorship: ₹11,000"
  },
  {
    id: "gyandan",
    title: "Gyan Dan & Pathshala Fund",
    desc: "Support local kids' Pathshalas, salaries for religious teachers, and digitizing historic scriptures (Shastra Bhandars).",
    icon: "📚",
    suggestedAmounts: [1100, 5100, 11000, 15000],
    highlight: "Sponsor a child's annual pathshala education: ₹5,100"
  },
  {
    id: "jirnodhar",
    title: "Jirnodhar & Temple Restoration",
    desc: "Contributions for marble restoration, carving repairs, maintenance of structural domes (Shikhars), and lighting.",
    icon: "🕌",
    suggestedAmounts: [5100, 11000, 21000, 51000],
    highlight: "Sponsor a carved marble tile: ₹5,100"
  }
];

function DonationHub() {
  const [selectedCause, setSelectedCause] = useState(DONATION_CAUSES[0]);
  const [donorName, setDonorName] = useState("");
  const [gotra, setGotra] = useState("");
  const [sanghName, setSanghName] = useState("");
  const [city, setCity] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(DONATION_CAUSES[0].suggestedAmounts[1]);
  
  // Checkout flow states
  const [checkoutStep, setCheckoutStep] = useState("form"); // form, processing, qr, success
  const [txId, setTxId] = useState("");

  const handleSelectCause = (cause) => {
    setSelectedCause(cause);
    setSelectedAmount(cause.suggestedAmounts[1]);
    setCustomAmount("");
  };

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const initiatePayment = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    
    if (!donorName.trim()) {
      alert("Please enter donor name.");
      return;
    }
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter or select a valid donation amount.");
      return;
    }

    setCheckoutStep("processing");
    
    // Simulate generation of UPI QR code
    setTimeout(() => {
      const randomTx = "JS" + Math.floor(100000 + Math.random() * 900000);
      setTxId(randomTx);
      setCheckoutStep("qr");
    }, 1500);
  };

  const handleConfirmPayment = () => {
    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("success");
    }, 2000);
  };

  const handleReset = () => {
    setDonorName("");
    setGotra("");
    setSanghName("");
    setCity("");
    setCustomAmount("");
    setSelectedAmount(selectedCause.suggestedAmounts[1]);
    setCheckoutStep("form");
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);
  };

  const getFinalAmount = () => {
    return customAmount ? parseInt(customAmount, 10) : selectedAmount;
  };

  return (
    <div className="container animate-slide-in" style={{ padding: "40px 0" }}>
      {/* Page Title */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="maroon-badge" style={{ marginBottom: "10px" }}>Secure E-Donations</span>
        <h2 style={{ fontSize: "2.5rem" }}>Community Donation Hub</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "700px", margin: "10px auto 0 auto" }}>
          Contribute securely to traditional Jain causes with 100% auditable accounting and automated digital receipts.
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: "35px",
        flexWrap: "wrap"
      }}>
        {/* Left Side: Select Causes */}
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3 style={{ fontSize: "1.2rem", borderBottom: "2px solid var(--border-gold)", paddingBottom: "10px" }}>
            Select Donation Cause
          </h3>
          
          {DONATION_CAUSES.map((cause) => {
            const isSelected = selectedCause.id === cause.id;
            return (
              <div
                key={cause.id}
                onClick={() => handleSelectCause(cause)}
                className="glass-panel gold-gradient-border"
                style={{
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  boxShadow: isSelected ? "var(--shadow-glow)" : "var(--shadow-sm)",
                  border: isSelected ? "1.5px solid var(--primary-gold)" : "1px solid var(--border-gold)",
                  transition: "all 0.3s ease",
                  backgroundColor: isSelected ? "#fffbf2" : "#ffffff"
                }}
              >
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <span style={{ fontSize: "2rem" }}>{cause.icon}</span>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", color: isSelected ? "var(--accent-maroon)" : "var(--text-main)" }}>
                      {cause.title}
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }} className="line-clamp-2">
                      {cause.desc.substring(0, 85)}...
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Donation & Payment Form */}
        <div style={{ flex: "2 1 600px" }}>
          <div className="glass-panel gold-gradient-border" style={{
            padding: "35px",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            minHeight: "520px"
          }}>
            
            {/* Step 1: Data Form */}
            {checkoutStep === "form" && (
              <form onSubmit={initiatePayment}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ fontSize: "2rem" }}>{selectedCause.icon}</span>
                  <div>
                    <h3 style={{ fontSize: "1.4rem", color: "var(--accent-maroon)" }}>{selectedCause.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{selectedCause.desc}</p>
                  </div>
                </div>

                <div className="gold-gradient-bg" style={{
                  padding: "12px 18px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px dashed var(--primary-gold)",
                  marginBottom: "25px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--accent-maroon)"
                }}>
                  💡 {selectedCause.highlight}
                </div>

                {/* Amount Selection */}
                <div style={{ marginBottom: "25px" }}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "10px" }}>
                    Select Donation Amount
                  </label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
                    {selectedCause.suggestedAmounts.map((amt) => {
                      const isAmtSelected = selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          className={isAmtSelected ? "btn-maroon" : "btn-outline-gold"}
                          onClick={() => handleAmountSelect(amt)}
                          style={{
                            padding: "10px 20px",
                            fontSize: "0.9rem",
                            borderRadius: "var(--radius-sm)",
                            flex: "1 1 calc(25% - 10px)",
                            minWidth: "100px"
                          }}
                        >
                          {formatCurrency(amt)}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontWeight: 600 }}>
                      Custom Amount: ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Enter other amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      style={{
                        width: "100%",
                        padding: "12px 12px 12px 145px",
                        borderRadius: "var(--radius-md)",
                        border: "2px solid var(--border-gold)",
                        outline: "none",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem"
                      }}
                    />
                  </div>
                </div>

                {/* Donor Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "25px" }} className="donor-grid">
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "5px" }}>
                      Donor Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Doshi"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-sm)",
                        border: "1.5px solid var(--border-gold)",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "5px" }}>
                      Gotra / Family Lineage
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Singhal / Oswal"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-sm)",
                        border: "1.5px solid var(--border-gold)",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "5px" }}>
                      Jain Sangh Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shankheshwar Sangh"
                      value={sanghName}
                      onChange={(e) => setSanghName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-sm)",
                        border: "1.5px solid var(--border-gold)",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "5px" }}>
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-sm)",
                        border: "1.5px solid var(--border-gold)",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-gold" style={{ width: "100%" }}>
                  Proceed to Pay {formatCurrency(getFinalAmount() || 0)}
                </button>
              </form>
            )}

            {/* Step 2: Processing Loader */}
            {checkoutStep === "processing" && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "450px"
              }}>
                <div className="animate-float" style={{
                  width: "60px",
                  height: "60px",
                  border: "5px solid var(--border-gold)",
                  borderTop: "5px solid var(--accent-maroon)",
                  borderRadius: "50%",
                  animation: "pulse-gold 1.5s infinite"
                }} />
                <h3 style={{ marginTop: "25px", fontSize: "1.2rem" }}>Secure Gateway Connecting...</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "5px" }}>
                  Please do not reload this page or close the browser.
                </p>
              </div>
            )}

            {/* Step 3: QR Code Generator */}
            {checkoutStep === "qr" && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px 0"
              }}>
                <h3 style={{ color: "var(--accent-maroon)", marginBottom: "5px" }}>Scan QR Code to Pay</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
                  Use any BHIM UPI App (GPay, PhonePe, Paytm) to complete payment.
                </p>

                {/* Styled SVGs mimicking a premium QR Code */}
                <div className="gold-gradient-border" style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  marginBottom: "20px"
                }}>
                  <svg width="180" height="180" viewBox="0 0 100 100">
                    {/* Outer anchor points */}
                    <rect x="5" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
                    <rect x="11" y="11" width="13" height="13" fill="black" />
                    <rect x="70" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
                    <rect x="76" y="11" width="13" height="13" fill="black" />
                    <rect x="5" y="70" width="25" height="25" fill="none" stroke="black" strokeWidth="6" />
                    <rect x="11" y="76" width="13" height="13" fill="black" />

                    {/* QR Code Dots & Patterns */}
                    <path d="M40 5 H45 V10 H40 Z M50 15 H55 V25 H50 Z M60 5 H65 V15 H60 Z M40 25 H45 V30 H40 Z" fill="black" />
                    <path d="M5 40 H15 V45 H5 Z M20 40 H30 V50 H20 Z M35 40 H40 V45 H35 Z M45 40 H55 V45 H45 Z" fill="black" />
                    <path d="M70 40 H80 V45 H70 Z M85 40 H95 V50 H85 Z" fill="black" />
                    <path d="M40 50 H50 V60 H40 Z M60 50 H75 V55 H60 Z M80 50 H95 V60 H80 Z" fill="black" />
                    <path d="M40 70 H50 V75 H40 Z M55 70 H65 V80 H55 Z M80 70 H95 V75 H80 Z" fill="black" />
                    <path d="M40 85 H60 V90 H40 Z M65 80 H75 V95 H65 Z M85 85 H95 V90 H85 Z" fill="black" />

                    {/* Center Jain Swastika Emblem in Maroon */}
                    <rect x="42" y="42" width="16" height="16" fill="white" />
                    <path d="M46 45 H54 V47 H48 V52 H46 Z M54 48 H52 V53 H47 V55 H54 Z" fill="var(--accent-maroon)" />
                  </svg>
                </div>

                <div style={{ marginBottom: "25px" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-main)" }}>
                    Amount: {formatCurrency(getFinalAmount())}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    UPI Reference / Txn ID: <code style={{ backgroundColor: "#eee", padding: "2px 6px", borderRadius: "4px" }}>{txId}</code>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button className="btn-maroon" onClick={handleConfirmPayment}>
                    Simulate Payment Done
                  </button>
                  <button className="btn-outline-gold" onClick={() => setCheckoutStep("form")}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Success Receipt */}
            {checkoutStep === "success" && (
              <div style={{
                textAlign: "center",
                padding: "20px 0"
              }} className="animate-celebration">
                <span style={{ fontSize: "4rem" }}>🙏</span>
                <h3 style={{ fontSize: "1.8rem", color: "var(--accent-maroon)", margin: "15px 0" }}>JainSetu Receipt</h3>
                
                <div style={{
                  maxWidth: "400px",
                  margin: "0 auto 30px auto",
                  border: "1.5px solid var(--border-gold)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "white",
                  padding: "25px",
                  textAlign: "left",
                  boxShadow: "var(--shadow-sm)",
                  backgroundImage: "radial-gradient(var(--border-gold) 1.5px, transparent 1.5px)",
                  backgroundSize: "20px 20px"
                }}>
                  <h4 style={{ textAlign: "center", borderBottom: "1.5px solid var(--border-gold)", paddingBottom: "10px", marginBottom: "15px", color: "var(--primary-gold-dark)" }}>
                    TRANSACTION CONFIRMED
                  </h4>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Receipt No:</span>
                    <strong style={{ fontFamily: "monospace" }}>{txId}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Date:</span>
                    <strong>{new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Donor Name:</span>
                    <strong>{donorName}</strong>
                  </div>
                  {gotra && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                      <span style={{ color: "var(--text-muted)" }}>Gotra:</span>
                      <strong>{gotra}</strong>
                    </div>
                  )}
                  {sanghName && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                      <span style={{ color: "var(--text-muted)" }}>Sangh Name:</span>
                      <strong>{sanghName}</strong>
                    </div>
                  )}
                  {city && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                      <span style={{ color: "var(--text-muted)" }}>City:</span>
                      <strong>{city}</strong>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "10px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Cause Sponsoring:</span>
                    <strong>{selectedCause.title}</strong>
                  </div>

                  <div style={{
                    borderTop: "1.5px solid var(--border-gold)",
                    paddingTop: "12px",
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.1rem"
                  }}>
                    <span style={{ fontWeight: 700 }}>Total Sponsered:</span>
                    <strong style={{ color: "var(--accent-maroon)" }}>{formatCurrency(getFinalAmount())}</strong>
                  </div>
                </div>

                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "450px", margin: "0 auto 25px auto" }}>
                  An 80G tax exemption tax certificate has been sent to your registered mobile and email. Devotee list has been sent to temple admins.
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  <button className="btn-maroon" onClick={() => window.print()}>
                    🖨️ Print Receipt
                  </button>
                  <button className="btn-outline-gold" onClick={handleReset}>
                    New Contribution
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .donor-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default DonationHub;
