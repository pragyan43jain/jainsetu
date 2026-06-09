import React, { useState } from "react";

function LoginModals({ isOpen, mode, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(mode === "user" ? "Devotee Account" : "Temple Trust");
      onClose();
      // reset forms
      setIdentifier("");
      setPassword("");
      setOtp("");
      setOtpSent(false);
    }, 1000);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(43, 37, 25, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div 
        className="glass-panel gold-gradient-border" 
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "35px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          backgroundColor: "#ffffff",
          position: "relative"
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "var(--text-muted)",
            lineHeight: 1
          }}
        >
          &times;
        </button>

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <span style={{ fontSize: "2.5rem" }}>{mode === "user" ? "🧑‍💻" : "🕌"}</span>
          <h3 style={{ fontSize: "1.5rem", marginTop: "10px", color: "var(--accent-maroon)" }}>
            {mode === "user" ? "Devotee Portal Login" : "Temple Admin Portal"}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "5px" }}>
            {mode === "user" 
              ? "Access live Shantidhara bidding and download taxation certificates." 
              : "Access temple dashboards, bid ledgers, and manage donations."}
          </p>
        </div>

        {mode === "user" ? (
          // User login form (OTP preferred)
          <form onSubmit={otpSent ? handleSubmit : handleSendOtp}>
            {!otpSent ? (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Enter Mobile Number or Devotee ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--border-gold)",
                    outline: "none"
                  }}
                />
              </div>
            ) : (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Enter 6-Digit OTP (Sent to mobile)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123456"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--border-gold)",
                    outline: "none",
                    letterSpacing: "4px",
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: "1.1rem"
                  }}
                />
              </div>
            )}

            <button type="submit" className="btn-gold" style={{ width: "100%" }} disabled={isLoading}>
              {isLoading 
                ? "Processing..." 
                : !otpSent 
                  ? "Get OTP Verifier" 
                  : "Verify & Enter Portal"}
            </button>

            {!otpSent && (
              <div style={{ textAlign: "center", marginTop: "15px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                By signing in, you agree to JainSetu's Terms of Seva.
              </div>
            )}
          </form>
        ) : (
          // Temple Admin Form (User & Pass/Pin)
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                Temple Registration ID
              </label>
              <input
                type="text"
                placeholder="e.g. REG-GJ-1002"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--border-gold)",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                Temple Admin Passkey
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--border-gold)",
                  outline: "none"
                }}
              />
            </div>

            <button type="submit" className="btn-maroon" style={{ width: "100%" }} disabled={isLoading}>
              {isLoading ? "Validating credentials..." : "Secure Trust Login"}
            </button>

            <div style={{ textAlign: "center", marginTop: "15px", fontSize: "0.8rem" }}>
              <a href="#register" style={{ color: "var(--primary-gold-dark)", fontWeight: 600, textDecoration: "none" }} onClick={() => alert("Registration request forwarded to JainSetu Trustees. We will get in touch with your Temple Committee.")}>
                Request New Temple Registration
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginModals;
