import React, { useState, useEffect } from "react";
import "./contactdetailsform.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ContactDetailsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    serviceId: "",
    designation: "",
    email: "",
    contactNumber: "",
    address: "",
    district: "",
    subDistrict: "",
    phoneNumber: "",
    officeAddress: "",
  });

  // Auto-populate fields from previous forms
  useEffect(() => {
    if (location.state) {
      const { serviceData, previousFormData, initialFormData } = location.state;
      setFormData((prev) => ({
        ...prev,
        id:
          serviceData?.id || previousFormData?.id || initialFormData?.id || "",
        name:
          serviceData?.id || previousFormData?.id || initialFormData?.id || "", // Service name
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  const handleBack = () => {
    navigate("/add-service/supportive-document-form", {
      state: location.state,
    });
  };

  return (
    <div className="contact-details-form-container">
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
            color: "white",
            width: "100px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          ← Back
        </button>
        <h2>Contact Details Form</h2>
        <div style={{ width: "60px" }}></div> {/* Spacer for centering */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Service Name:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            District:
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Sub District:
            <input
              type="text"
              name="subDistrict"
              value={formData.subDistrict}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Designation:
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <h2>Official Contact</h2>

        <div className="form-row">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Office Address:
            <textarea
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Link
            to="/add-service/publishServiceDetail"
            state={{
              serviceData: formData,
              previousFormData: location.state?.serviceData,
              initialFormData: location.state?.previousFormData,
              originalFormData: location.state?.initialFormData,
              // Preserve all form data from previous forms
              form1Data: location.state?.initialFormData,
              form2Data: location.state?.previousFormData,
              form3Data: location.state?.serviceData,
              form4Data: formData,
              // Add contact details to the main service data
              contactDetails: formData,
              // Preserve process steps from previous forms
              processSteps:
                location.state?.processSteps ||
                location.state?.serviceData?.steps,
              // Add scroll to top flag
              scrollToTop: true,
            }}
          >
            <button
              type="submit"
              style={{
                padding: "0.6rem 1.5rem",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ContactDetailsForm;
