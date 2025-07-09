import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div style={{
      background: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      margin: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <input
        type="text"
        placeholder="Search services..."
        onChange={(e) => onSearch(e.target.value)} // send input up
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
};

export default SearchBar;
