import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const sidebarStyle = {
  width: "240px",
  background: "#111827",
  color: "white",
  padding: "24px 0 24px 0",
  fontFamily: "sans-serif",
  minHeight: "100vh",
  boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
};

const headerStyle = {
  marginBottom: "32px",
  fontSize: "22px",
  fontWeight: 700,
  borderBottom: "1px solid #374151",
  paddingBottom: "16px",
  textAlign: "center",
  letterSpacing: "1px",
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  fontSize: "16px",
  margin: 0,
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 32px",
  cursor: "pointer",
  borderRadius: "6px",
  transition: "background 0.2s",
  textDecoration: "none",
  color: "white",
  margin: "4px 0",
};

const navItemHoverStyle = {
  background: "#1f2937",
};

const navItemActiveStyle = {
  background: "#2563eb",
  color: "white",
};

const Sidebar = () => {
  // Helper to handle hover effect
  const [hovered, setHovered] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/", { state: { scrollTo: "top" } });
  };

  const handlePublishedServicesClick = () => {
    navigate("/", { state: { scrollTo: "published" } });
  };

  const handlePendingServicesClick = () => {
    navigate("/", { state: { scrollTo: "pending" } });
  };

  const navItems = [
    {
      label: "Home",
      icon: "🏠",
      onClick: handleHomeClick,
      isCustom: true,
    },
    {
      label: "Published Services",
      icon: "📂",
      onClick: handlePublishedServicesClick,
      isCustom: true,
    },
    {
      label: "Pending Services",
      icon: "⏳",
      onClick: handlePendingServicesClick,
      isCustom: true,
    },
    { label: "Contact Us", icon: "📞", to: "/contact" },
    {
      label: "Add New Service",
      icon: "➕",
      to: "/add-service/new-application",
    },
  ];

  // Function to determine if a nav item is active
  const isActive = (item) => {
    if (item.label === "Home" && location.pathname === "/") {
      return true;
    }
    if (
      item.label === "Published Services" &&
      location.pathname === "/" &&
      location.state?.scrollTo === "published"
    ) {
      return true;
    }
    if (
      item.label === "Pending Services" &&
      location.pathname === "/" &&
      location.state?.scrollTo === "pending"
    ) {
      return true;
    }
    if (
      item.label === "Add New Service" &&
      location.pathname.startsWith("/add-service")
    ) {
      return true;
    }
    if (item.label === "Contact Us" && location.pathname === "/contact") {
      return true;
    }
    return false;
  };

  return (
    <nav style={sidebarStyle}>
      <ul style={navListStyle}>
        {navItems.map((item, idx) => {
          const isItemActive = isActive(item);
          return (
            <li key={item.label} style={{ padding: 0 }}>
              {item.isCustom ? (
                <div
                  style={{
                    ...navItemStyle,
                    ...(isItemActive ? navItemActiveStyle : {}),
                    ...(hovered === idx && !isItemActive
                      ? navItemHoverStyle
                      : {}),
                  }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={item.onClick}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ) : (
                <Link
                  to={item.to}
                  style={{
                    ...navItemStyle,
                    ...(isItemActive ? navItemActiveStyle : {}),
                    ...(hovered === idx && !isItemActive
                      ? navItemHoverStyle
                      : {}),
                  }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
