import React from "react";

const Header = () => {
  return (
    <header
      style={{
        background: "#111827",
        padding: "15px 20px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <h1 style={{ fontSize: "20px" }}>certificate service dashboard </h1>
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Profile"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
        }}
      />
    </header>
  );
};

export default Header;
