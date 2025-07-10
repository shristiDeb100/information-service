import React, { useState } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
  };

  const handleProfile = () => {
    // Add profile navigation logic here
    console.log("Profile clicked");
  };

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "16px 32px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        height: "70px",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          >
            🏛️
          </span>
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "1px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              color: "white",
            }}
          >
            Information Services
          </h1>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <span>🔔</span>
          <span>Notifications</span>
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.1)",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={handleProfileClick}
          >
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
            <div style={{ fontSize: "14px", fontWeight: 500 }}>John Doe</div>
            <span style={{ fontSize: "12px" }}>▼</span>
          </div>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                border: "1px solid rgba(0,0,0,0.1)",
                minWidth: "160px",
                zIndex: 1001,
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: "#333",
                  fontSize: "14px",
                  borderBottom: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={handleProfile}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                <span>👤</span>
                Profile
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  color: "#dc3545",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                <span>🚪</span>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
