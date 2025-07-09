import React, { useState } from "react";
import "./Newapplication.css";
import { Link } from "react-router-dom";

const NewApplicationForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    serviceType: "",
    eligibility: "",
    applicationMode: "",
    url: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      applicationMode: value,
      url: value === "Online" || value === "Both" ? prev.url : "",
      address: value === "Offline" || value === "Both" ? prev.address : ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>New Application Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Service Name:</label>
          <input
            type="text"
            name="id"
            placeholder="Enter service name"
            value={formData.id}
            onChange={handleChange}
            required
          />
       

          <label>Service Summary:</label>
          <textarea
            name="serviceSummary"
            placeholder="Enter service Summary"
            value={formData.serviceSummary || ""}
            onChange={handleChange}
            required
          />
          <label>Application Mode:</label>
<div className="application-mode-container">
          <div className="application-mode-group">
            <label>
              <input
                type="radio"
                name="applicationMode"
                value="Online"
                checked={formData.applicationMode === "Online"}
                onChange={handleModeChange}
              /> Online
            </label>
            <label>
              <input
                type="radio"
                name="applicationMode"
                value="Offline"
                checked={formData.applicationMode === "Offline"}
                onChange={handleModeChange}
              /> Offline
            </label>
            <label>
              <input
                type="radio"
                name="applicationMode"
                value="Both"
                checked={formData.applicationMode === "Both"}
                onChange={handleModeChange}
              /> Both
            </label>
          </div>
          </div>


          {/* Conditional fields for Application Mode */}
          {(formData.applicationMode === "Online" || formData.applicationMode === "Both") && (
            <div className="conditional-field">
              <label>Application URL:</label>
              <input
                type="url"
                name="url"
                placeholder="Enter application URL"
                value={formData.url}
                onChange={handleChange}
                required={formData.applicationMode === "Online" || formData.applicationMode === "Both"}
              />
            </div>
          )}
          {(formData.applicationMode === "Offline" || formData.applicationMode === "Both") && (
            <div className="conditional-field">
              <label>Application Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter application address"
                value={formData.address}
                onChange={handleChange}
                required={formData.applicationMode === "Offline" || formData.applicationMode === "Both"}
              />
            </div>
          )}

          <label>Service Type:</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Driving License">Driving License</option>
            <option value="Voter ID">Voter ID</option>
          </select>

          <label>Eligibility:</label>
          <textarea
            name="eligibility"
            placeholder="Enter eligibility details..."
            value={formData.eligibility}
            onChange={handleChange}
            required
          />
          <Link to="/add-service/process-form" style={{ textDecoration: "none", color: "white" }}>
            <button type="submit">Create</button></Link>
        </form>
      </div>
    </div>
  );
};

export default NewApplicationForm;
