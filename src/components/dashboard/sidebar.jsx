import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{
      width: "240px",
      background: "#111827",
      color: "white",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <h2 style={{ marginBottom: "30px", fontSize: "20px", borderBottom: "1px solid gray", paddingBottom: "10px" }}>
        Information Services
      </h2>
      <ul style={{ listStyle: "none", padding: 0, fontSize: "16px", lineHeight: "2" }}>
      
      <Link to="/home" style={{ color: "white", textDecoration: "none" }}> <li style={{ cursor: "pointer" }}>
          🏠 Home
        </li></Link> 
        <li style={{ cursor: "pointer" }}>
          📂 published services 
        </li>
        <li style={{ cursor: "pointer" }}>
          <Link to="/add-service/new-application" style={{ color: "white", textDecoration: "none" }}>➕Add new service</Link>
        </li>
        <li style={{ cursor: "pointer" }}>
         Pending services
        </li>
        <li style={{ cursor: "pointer" }}>
        📞 Contact Us
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
