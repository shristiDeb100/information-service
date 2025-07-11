import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pendingDetails.css";

const PendingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceDetails, setServiceDetails] = useState(null);

  // Mock pending services data (should match Home.jsx structure)
  const mockPendingServices = {
    101: {
      serviceNum: 101,
      serviceName: "Digital Health ID Registration",
      serviceSummary:
        "Create your unique digital health identity for seamless healthcare access",
      status: "Pending",
      submittedDate: "2024-01-20",
      reviewTime: "2-3 days",
    },
    102: {
      serviceNum: 102,
      serviceName: "Startup India Registration",
      serviceSummary:
        "Register your startup for government benefits and support programs",
      status: "Pending",
      submittedDate: "2024-01-18",
      reviewTime: "5-7 days",
    },
    103: {
      serviceNum: 103,
      serviceName: "PM Fasal Bima Yojana",
      serviceSummary:
        "Crop insurance scheme for farmers to protect against natural calamities",
      status: "Pending",
      submittedDate: "2024-01-19",
      reviewTime: "3-4 days",
    },
    104: {
      serviceNum: 104,
      serviceName: "Skill India Certification",
      serviceSummary:
        "Get certified in various skills for better employment opportunities",
      status: "Pending",
      submittedDate: "2024-01-17",
      reviewTime: "4-5 days",
    },
    105: {
      serviceNum: 105,
      serviceName: "PM Ujjwala Yojana",
      serviceSummary:
        "Free LPG connection for women from below poverty line households",
      status: "Pending",
      submittedDate: "2024-01-16",
      reviewTime: "6-8 days",
    },
    106: {
      serviceNum: 106,
      serviceName: "Digital Locker Service",
      serviceSummary:
        "Store and share important documents securely in digital format",
      status: "Pending",
      submittedDate: "2024-01-15",
      reviewTime: "2-3 days",
    },
  };

  useEffect(() => {
    const serviceNum = location.state?.serviceNum || 101;
    const details = mockPendingServices[serviceNum];
    if (details) {
      setServiceDetails(details);
    }
  }, [location]);

  if (!serviceDetails) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading pending service details...</p>
      </div>
    );
  }

  return (
    <div className="pending-details-page">
      <div className="page-header">
        <h1 className="pending-details-title">Pending Service Details</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <div className="details-container">
        <div className="details-section">
          <h2>Service Overview</h2>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="label">Service Name:</span>
              <span className="value">{serviceDetails.serviceName}</span>
            </div>
            <div className="overview-item">
              <span className="label">Status:</span>
              <span className="status-badge pending">Pending</span>
            </div>
          </div>
        </div>
        <div className="details-section">
          <h2>Service Summary</h2>
          <p className="summary-text">{serviceDetails.serviceSummary}</p>
        </div>
        <div className="details-section">
          <h2>Submission Details</h2>
          <div className="submission-details">
            <div className="detail-item">
              <span className="label">Submitted Date:</span>
              <span className="value">{serviceDetails.submittedDate}</span>
            </div>
            <div className="detail-item">
              <span className="label">Estimated Review Time:</span>
              <span className="value">{serviceDetails.reviewTime}</span>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="review-btn" onClick={() => navigate("/")}>
            Mark as Reviewed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingDetails;
