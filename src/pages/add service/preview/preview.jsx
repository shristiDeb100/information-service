import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./preview.css";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allFormData, setAllFormData] = useState({});

  useEffect(() => {
    if (location.state) {
      // Collect all form data from previous forms
      const completeData = {
        // Basic Information (from Form 1)
        serviceName:
          location.state?.form1Data?.id ||
          location.state?.serviceData?.id ||
          location.state?.previousFormData?.id ||
          location.state?.initialFormData?.id ||
          location.state?.originalFormData?.id ||
          "",
        serviceSummary:
          location.state?.form1Data?.serviceSummary ||
          location.state?.serviceData?.serviceSummary ||
          location.state?.previousFormData?.serviceSummary ||
          location.state?.initialFormData?.serviceSummary ||
          location.state?.originalFormData?.serviceSummary ||
          "",
        serviceType:
          location.state?.form1Data?.serviceType ||
          location.state?.serviceData?.serviceType ||
          location.state?.previousFormData?.serviceType ||
          location.state?.initialFormData?.serviceType ||
          location.state?.originalFormData?.serviceType ||
          "",
        eligibility:
          location.state?.form1Data?.eligibility ||
          location.state?.serviceData?.eligibility ||
          location.state?.previousFormData?.eligibility ||
          location.state?.initialFormData?.eligibility ||
          location.state?.originalFormData?.eligibility ||
          "",
        applicationMode:
          location.state?.form1Data?.applicationMode ||
          location.state?.serviceData?.applicationMode ||
          location.state?.previousFormData?.applicationMode ||
          location.state?.initialFormData?.applicationMode ||
          location.state?.originalFormData?.applicationMode ||
          "",
        url:
          location.state?.form1Data?.url ||
          location.state?.serviceData?.url ||
          location.state?.previousFormData?.url ||
          location.state?.initialFormData?.url ||
          location.state?.originalFormData?.url ||
          "",
        address:
          location.state?.form1Data?.address ||
          location.state?.serviceData?.address ||
          location.state?.previousFormData?.address ||
          location.state?.initialFormData?.address ||
          location.state?.originalFormData?.address ||
          "",

        // Process Steps (from Form 2)
        processSteps:
          location.state?.processSteps ||
          location.state?.form2Data?.steps ||
          location.state?.serviceData?.steps ||
          location.state?.previousFormData?.steps ||
          [],

        // Documents (from Form 3)
        documents:
          location.state?.form3Data?.documents ||
          location.state?.serviceData?.documents ||
          location.state?.previousFormData?.documents ||
          [],

        // Contact Details (from Form 4)
        contactDetails:
          location.state?.form4Data ||
          location.state?.serviceData ||
          location.state?.currentFormData ||
          {},

        // Publish Details (from current form)
        publishDetails: location.state?.currentFormData || {},
      };

      setAllFormData(completeData);
    }
  }, [location.state]);

  const handleEdit = () => {
    // Navigate back to the last form with all data
    navigate("/add-service/publish-service-details", { state: location.state });
  };

  const handlePublish = () => {
    // Navigate to publish form with all data
    navigate("/add-service/publishServiceDetail", { state: location.state });
  };

  const handleBack = () => {
    // Navigate back to the previous form
    navigate("/add-service/contact-details-form", { state: location.state });
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>📋 Service Preview</h1>
        <p>Review all the information before publishing your service</p>
      </div>

      <div className="preview-content">
        {/* Basic Information Section */}
        <div className="preview-section">
          <div className="section-header">
            <h2>📝 Basic Information</h2>
          </div>
          <div className="section-content">
            <div className="info-grid">
              <div className="info-item">
                <label>Service Name:</label>
                <span>{allFormData.serviceName || "Not provided"}</span>
              </div>
              <div className="info-item">
                <label>Service Type:</label>
                <span>{allFormData.serviceType || "Not provided"}</span>
              </div>
              <div className="info-item full-width">
                <label>Service Summary:</label>
                <span>{allFormData.serviceSummary || "Not provided"}</span>
              </div>
              <div className="info-item full-width">
                <label>Eligibility:</label>
                <span>{allFormData.eligibility || "Not provided"}</span>
              </div>
              <div className="info-item">
                <label>Application Mode:</label>
                <span>{allFormData.applicationMode || "Not provided"}</span>
              </div>
              <div className="info-item">
                <label>URL:</label>
                <span>{allFormData.url || "Not provided"}</span>
              </div>
              <div className="info-item full-width">
                <label>Address:</label>
                <span>{allFormData.address || "Not provided"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps Section */}
        <div className="preview-section">
          <div className="section-header">
            <h2>⚙️ Process Steps</h2>
          </div>
          <div className="section-content">
            {allFormData.processSteps && allFormData.processSteps.length > 0 ? (
              <div className="steps-list">
                {allFormData.processSteps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <h4>Step {index + 1}</h4>
                      <p>
                        {step.processDetails ||
                          step.description ||
                          "No description provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No process steps provided</p>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="preview-section">
          <div className="section-header">
            <h2>📄 Required Documents</h2>
          </div>
          <div className="section-content">
            {allFormData.documents && allFormData.documents.length > 0 ? (
              <div className="documents-list">
                {allFormData.documents.map((doc, index) => (
                  <div key={index} className="document-item">
                    <div className="doc-number">{index + 1}</div>
                    <div className="doc-content">
                      <h4>Document {index + 1}</h4>
                      <p>
                        <strong>Type:</strong>{" "}
                        {doc.documentType || "Not specified"}
                      </p>
                      <p>
                        <strong>Valid Proof:</strong>{" "}
                        {doc.validProof || "Not specified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No documents specified</p>
            )}
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="preview-section">
          <div className="section-header">
            <h2>📞 Contact Details</h2>
          </div>
          <div className="section-content">
            <div className="info-grid">
              <div className="info-item">
                <label>Phone Number:</label>
                <span>
                  {allFormData.contactDetails?.phoneNumber ||
                    allFormData.contactDetails?.contactNumber ||
                    "Not provided"}
                </span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>
                  {allFormData.contactDetails?.email || "Not provided"}
                </span>
              </div>
              <div className="info-item">
                <label>District:</label>
                <span>
                  {allFormData.contactDetails?.district || "Not provided"}
                </span>
              </div>
              <div className="info-item">
                <label>Sub District:</label>
                <span>
                  {allFormData.contactDetails?.subDistrict || "Not provided"}
                </span>
              </div>
              <div className="info-item full-width">
                <label>Office Address:</label>
                <span>
                  {allFormData.contactDetails?.officeAddress ||
                    allFormData.contactDetails?.address ||
                    "Not provided"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Publish Details Section */}
        <div className="preview-section">
          <div className="section-header">
            <h2>🚀 Publish Details</h2>
          </div>
          <div className="section-content">
            <div className="info-grid">
              <div className="info-item">
                <label>Status:</label>
                <span
                  className={`status-badge ${
                    allFormData.publishDetails?.isActive ? "active" : "inactive"
                  }`}
                >
                  {allFormData.publishDetails?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Process Details */}
            <div className="process-details">
              <h4>Process Details</h4>
              <div className="process-grid">
                <div className="process-item">
                  <label>New Process:</label>
                  <span>
                    {allFormData.publishDetails?.newProcess || "Not provided"}
                  </span>
                </div>
                <div className="process-item">
                  <label>Update Process:</label>
                  <span>
                    {allFormData.publishDetails?.updateProcess ||
                      "Not provided"}
                  </span>
                </div>
                <div className="process-item">
                  <label>Lost Process:</label>
                  <span>
                    {allFormData.publishDetails?.lostProcess || "Not provided"}
                  </span>
                </div>
                <div className="process-item">
                  <label>Surrender Process:</label>
                  <span>
                    {allFormData.publishDetails?.surrenderProcess ||
                      "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div className="document-details">
              <h4>Document Details</h4>
              <div className="document-grid">
                <div className="document-item">
                  <label>New Document:</label>
                  <span>
                    {allFormData.publishDetails?.newDocument || "Not provided"}
                  </span>
                </div>
                <div className="document-item">
                  <label>Update Document:</label>
                  <span>
                    {allFormData.publishDetails?.updateDocument ||
                      "Not provided"}
                  </span>
                </div>
                <div className="document-item">
                  <label>Lost Document:</label>
                  <span>
                    {allFormData.publishDetails?.lostDocument || "Not provided"}
                  </span>
                </div>
                <div className="document-item">
                  <label>Surrender Document:</label>
                  <span>
                    {allFormData.publishDetails?.surrenderDocument ||
                      "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="preview-actions">
        <button onClick={handleBack} className="btn-secondary">
          ← Back
        </button>
        <button onClick={handleEdit} className="btn-edit">
          Edit
        </button>
        <button onClick={handlePublish} className="btn-publish">
          Publish Service
        </button>
      </div>
    </div>
  );
};

export default Preview;
