import React, { useState } from "react";

import Header from "./header";
import Footer from "./footer";
import MainContent from "./maincontent";
import Sidebar from "./sidebar";
import SearchBar from "./searchbar"; // ✅ Make sure this path matches your file

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Search Bar (Horizontal Nav) */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Main Content Row (Sidebar + Main) */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div
          style={{ width: "240px", backgroundColor: "#111827", color: "#fff" }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <MainContent searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
