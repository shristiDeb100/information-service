import React, { useState } from "react";
import "./Newapplication.css";
import { Link, useNavigate } from "react-router-dom";

const NewApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    serviceType: "",
    eligibility: "",
    applicationMode: "",
    url: "",
    address: "",
    serviceSummary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      applicationMode: value,
      url: value === "Online" || value === "Both" ? prev.url : "",
      address: value === "Offline" || value === "Both" ? prev.address : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = [
      "id",
      "serviceType",
      "eligibility",
      "applicationMode",
      "serviceSummary",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    // Check conditional fields based on application mode
    if (
      formData.applicationMode === "Online" &&
      (!formData.url || formData.url.trim() === "")
    ) {
      missingFields.push("url");
    }
    if (
      formData.applicationMode === "Offline" &&
      (!formData.address || formData.address.trim() === "")
    ) {
      missingFields.push("address");
    }
    if (formData.applicationMode === "Both") {
      if (!formData.url || formData.url.trim() === "")
        missingFields.push("url");
      if (!formData.address || formData.address.trim() === "")
        missingFields.push("address");
    }

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    console.log("Submitted Data:", formData);

    navigate("/add-service/process-form", {
      state: {
        serviceName: formData.id,
        serviceData: formData,
      },
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={handleBack}
            style={{
              padding: "0.5rem 1rem",
              background: "#6b7280",
              width: "100px",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            ← Back
          </button>
          <h2>New Application Form</h2>
          <div style={{ width: "120px" }}></div> {/* Spacer for centering */}
        </div>
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
          <div className="application-mode-group">
            <label htmlFor="applicationMode">Application Mode:</label>
            <select
              id="applicationMode"
              name="applicationMode"
              value={formData.applicationMode}
              onChange={handleModeChange}
              required
            >
              <option value="">Select application mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Conditional fields for Application Mode */}
          {(formData.applicationMode === "Online" ||
            formData.applicationMode === "Both") && (
            <div className="conditional-field">
              <label>Application URL:</label>
              <input
                type="url"
                name="url"
                placeholder="Enter application URL"
                value={formData.url}
                onChange={handleChange}
                required={
                  formData.applicationMode === "Online" ||
                  formData.applicationMode === "Both"
                }
              />
            </div>
          )}
          {(formData.applicationMode === "Offline" ||
            formData.applicationMode === "Both") && (
            <div className="conditional-field">
              <label>Application Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter application address"
                value={formData.address}
                onChange={handleChange}
                required={
                  formData.applicationMode === "Offline" ||
                  formData.applicationMode === "Both"
                }
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
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default NewApplicationForm;
