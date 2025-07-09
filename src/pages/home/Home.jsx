import React from "react";
import "./Home.css";

const stats = [
  { count: "3680+", label: "Total services" },
  { count: "570+", label: "available services" },
  { count: "3100+", label: "official sites" },
];

const categories = [
  { img: "aadhaar.png", count: "500+", title: "Aadhar & Identity" },
  { img: "health.png", count: "420+", title: "Healthcare & Wellness" },
  { img: "education.png", count: "310+", title: "Education & Scholarships" },
  { img: "bank.png", count: "200+", title: "Banking & Finance" },
  { img: "jobs.png", count: "150+", title: "Employment & Skills" },
  { img: "housing.png", count: "180+", title: "Housing & Utilities" },
  { img: "pension.png", count: "120+", title: "Pension & Senior Support" },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>#INFORMATIONCENTER / #KNOWLEDGEFORYOU</h1>
        <button>Explore Information →</button>
      </div>

      <div className="stats-section">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <h2>{stat.count}</h2>
            <p>{stat.label} →</p>
          </div>
        ))}
      </div>

      <div className="filter-buttons">
        <button className="active">Categories</button>
        <button>States/UTs</button>
        <button>Departments</button>
      </div>

      <div className="categories-section">
        <h2>Find information based on categories</h2>
        <div className="category-cards">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx}>
              <img src={`/assets/${cat.img}`} alt={cat.title} />
              <p className="count">{cat.count} Services</p>
              <h3>{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
