import React from "react";
import services from "../../data/services"; // or however you're importing the data

const MainContent = ({ searchQuery }) => {
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "20px",
      justifyContent: "center"
    }}>
      {filteredServices.length > 0 ? (
        filteredServices.map((service, idx) => (
          <div key={idx} style={{
            background: "white",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "pointer"
          }}>
            <h3 style={{ color: "#2563eb", marginBottom: "10px" }}>{service.name}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>{service.about.slice(0, 70)}...</p>
            <p style={{ color: "#1d4ed8", fontSize: "13px", marginTop: "10px" }}>Click to know more</p>
          </div>
        ))
      ) : (
        <p style={{ color: "#999" }}>No services match your search.</p>
      )}
    </div>
  );
};

export default MainContent;
