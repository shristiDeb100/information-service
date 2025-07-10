import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./publishDetails.css";

const PublishDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceDetails, setServiceDetails] = useState(null);

  // Load service details from location state or localStorage
  useEffect(() => {
    if (location.state?.serviceData) {
      // Use the actual service data passed from home page
      setServiceDetails(location.state.serviceData);
    } else if (location.state?.serviceNum) {
      // Fallback: load from localStorage if service data not passed
      const savedServices = JSON.parse(
        localStorage.getItem("publishedServices") || "[]"
      );
      const service = savedServices.find(
        (s) => s.serviceNum === location.state.serviceNum
      );
      if (service) {
        setServiceDetails(service);
      }
    }
  }, [location.state]);

  const handleBack = () => {
    navigate("/home");
  };

  if (!serviceDetails) {
    return (
      <div className="publish-details-container">
        <div className="loading-section">
          <h2>Loading service details...</h2>
          <button onClick={handleBack} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="publish-details-container">
      <div className="header-section">
        <button onClick={handleBack} className="back-btn">
          ← Back to Home
        </button>
        <h1>Service Details</h1>
      </div>

      <div className="service-overview">
        <div className="service-header">
          <h2>{serviceDetails.serviceName}</h2>
          <span
            className={`status-badge ${
              serviceDetails.status?.toLowerCase() || "active"
            }`}
          >
            {serviceDetails.status || "Active"}
          </span>
        </div>
        <p className="service-summary">{serviceDetails.serviceSummary}</p>
        <div className="service-meta">
          <span>Service #{serviceDetails.serviceNum}</span>
          <span>Published: {serviceDetails.publishedDate}</span>
          <span>Views: {serviceDetails.views || 0}</span>
          <span>Applications: {serviceDetails.applications || 0}</span>
        </div>
      </div>

      <div className="details-sections">
        {/* Basic Information */}
        <div className="detail-section">
          <h3>Basic Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Service Type:</label>
              <span>{serviceDetails.serviceType || "Not specified"}</span>
            </div>
            <div className="info-item">
              <label>Application Mode:</label>
              <span>{serviceDetails.applicationMode || "Not specified"}</span>
            </div>
            {serviceDetails.url && (
              <div className="info-item">
                <label>Application URL:</label>
                <a
                  href={serviceDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {serviceDetails.url}
                </a>
              </div>
            )}
            {serviceDetails.address && (
              <div className="info-item">
                <label>Application Address:</label>
                <span>{serviceDetails.address}</span>
              </div>
            )}
          </div>

          <div className="eligibility-section">
            <h4>Eligibility</h4>
            <p>{serviceDetails.eligibility || "Not specified"}</p>
          </div>
        </div>

        {/* Process Steps */}
        {serviceDetails.processSteps &&
          serviceDetails.processSteps.length > 0 && (
            <div className="detail-section">
              <h3>Process Steps</h3>
              <div className="steps-container">
                {serviceDetails.processSteps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">{step.stepNo}</div>
                    <div className="step-content">
                      <p>{step.processDetails}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Required Documents */}
        {serviceDetails.documents && serviceDetails.documents.length > 0 && (
          <div className="detail-section">
            <h3>Required Documents</h3>
            <div className="documents-container">
              {serviceDetails.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="doc-number">{index + 1}</div>
                  <div className="doc-content">
                    <h4>{doc.documentType}</h4>
                    <p>{doc.validProof}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Details */}
        {serviceDetails.contactDetails && (
          <div className="detail-section">
            <h3>Contact Information</h3>
            <div className="contact-grid">
              {serviceDetails.contactDetails.district && (
                <div className="contact-item">
                  <label>District:</label>
                  <span>{serviceDetails.contactDetails.district}</span>
                </div>
              )}
              {serviceDetails.contactDetails.subDistrict && (
                <div className="contact-item">
                  <label>Sub District:</label>
                  <span>{serviceDetails.contactDetails.subDistrict}</span>
                </div>
              )}
              {serviceDetails.contactDetails.designation && (
                <div className="contact-item">
                  <label>Designation:</label>
                  <span>{serviceDetails.contactDetails.designation}</span>
                </div>
              )}
              {serviceDetails.contactDetails.email && (
                <div className="contact-item">
                  <label>Email:</label>
                  <span>{serviceDetails.contactDetails.email}</span>
                </div>
              )}
              {serviceDetails.contactDetails.contactNumber && (
                <div className="contact-item">
                  <label>Contact Number:</label>
                  <span>{serviceDetails.contactDetails.contactNumber}</span>
                </div>
              )}
              {serviceDetails.contactDetails.address && (
                <div className="contact-item">
                  <label>Address:</label>
                  <span>{serviceDetails.contactDetails.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Process Details */}
        {(serviceDetails.newProcess ||
          serviceDetails.updateProcess ||
          serviceDetails.lostProcess ||
          serviceDetails.surrenderProcess) && (
          <div className="detail-section">
            <h3>Process Details</h3>
            <div className="process-grid">
              {serviceDetails.newProcess && (
                <div className="process-item">
                  <h4>New Process</h4>
                  <p>{serviceDetails.newProcess}</p>
                </div>
              )}
              {serviceDetails.updateProcess && (
                <div className="process-item">
                  <h4>Update Process</h4>
                  <p>{serviceDetails.updateProcess}</p>
                </div>
              )}
              {serviceDetails.lostProcess && (
                <div className="process-item">
                  <h4>Lost Process</h4>
                  <p>{serviceDetails.lostProcess}</p>
                </div>
              )}
              {serviceDetails.surrenderProcess && (
                <div className="process-item">
                  <h4>Surrender Process</h4>
                  <p>{serviceDetails.surrenderProcess}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Document Details */}
        {(serviceDetails.newDocument ||
          serviceDetails.updateDocument ||
          serviceDetails.lostDocument ||
          serviceDetails.surrenderDocument) && (
          <div className="detail-section">
            <h3>Document Details</h3>
            <div className="document-details-grid">
              {serviceDetails.newDocument && (
                <div className="document-detail-item">
                  <h4>New Document</h4>
                  <p>{serviceDetails.newDocument}</p>
                </div>
              )}
              {serviceDetails.updateDocument && (
                <div className="document-detail-item">
                  <h4>Update Document</h4>
                  <p>{serviceDetails.updateDocument}</p>
                </div>
              )}
              {serviceDetails.lostDocument && (
                <div className="document-detail-item">
                  <h4>Lost Document</h4>
                  <p>{serviceDetails.lostDocument}</p>
                </div>
              )}
              {serviceDetails.surrenderDocument && (
                <div className="document-detail-item">
                  <h4>Surrender Document</h4>
                  <p>{serviceDetails.surrenderDocument}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishDetails;
