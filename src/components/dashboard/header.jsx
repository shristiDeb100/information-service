import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Here you would typically clear user session/tokens
      alert("Logged out successfully!");
      navigate("/");
      setShowDropdown(false);
    }
  };

  const handleProfile = () => {
    // Add profile navigation logic here
    console.log("Profile clicked");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".profile-dropdown")) {
      setShowDropdown(false);
    }
  };

  // Add click outside listener
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            Information Services Dashboard
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

        <div style={{ position: "relative" }} className="profile-dropdown">
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
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
            }}
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
            <span
              style={{
                fontSize: "12px",
                transition: "transform 0.2s",
                transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          </div>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                border: "1px solid rgba(0,0,0,0.1)",
                minWidth: "200px",
                zIndex: 1001,
                overflow: "hidden",
              }}
            >
              {/* Profile Info Section */}
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid #f0f0f0",
                  background: "#f8f9fa",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Profile"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #e5e7eb",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "4px",
                      }}
                    >
                      John Doe
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        fontWeight: "500",
                      }}
                    >
                      Administrator
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div
                style={{
                  padding: "8px 0",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    color: "#374151",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "background 0.2s",
                  }}
                  onClick={handleProfile}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>👤</span>
                  <span>My Profile</span>
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    color: "#374151",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>⚙️</span>
                  <span>Settings</span>
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    color: "#dc2626",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "background 0.2s",
                    borderTop: "1px solid #f0f0f0",
                    marginTop: "8px",
                  }}
                  onClick={handleLogout}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#fef2f2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🚪</span>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
