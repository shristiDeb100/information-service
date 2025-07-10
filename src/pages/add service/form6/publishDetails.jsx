import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./publishDetails.css";

const PublishDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceDetails, setServiceDetails] = useState(null);

  // Mock detailed service data
  const mockServiceDetails = {
    1: {
      basicInfo: {
        serviceName: "Aadhaar Card Update",
        serviceSummary:
          "Update your Aadhaar card details online with ease. This service allows citizens to update their personal information, address, and other details in their Aadhaar card through the official UIDAI portal.",
        serviceType: "Aadhar Card",
        eligibility:
          "Indian citizens with valid Aadhaar number. Must be 18 years or older. Valid proof of identity and address required.",
        applicationMode: "Online",
        url: "https://uidai.gov.in/aadhaar-update",
        address: "",
      },
      processSteps: [
        {
          stepNo: "1",
          processDetails:
            "Visit the official UIDAI website and click on 'Update Aadhaar'",
        },
        {
          stepNo: "2",
          processDetails:
            "Enter your Aadhaar number and the OTP sent to your registered mobile number",
        },
        {
          stepNo: "3",
          processDetails:
            "Select the field you want to update (name, address, photo, etc.)",
        },
        {
          stepNo: "4",
          processDetails: "Upload the required supporting documents",
        },
        {
          stepNo: "5",
          processDetails:
            "Submit the application and note the Update Request Number (URN)",
        },
        {
          stepNo: "6",
          processDetails: "Track your application status using the URN",
        },
      ],
      documents: [
        {
          documentType: "Proof of Identity",
          validProof:
            "PAN Card, Passport, Driving License, or any government-issued photo ID",
        },
        {
          documentType: "Proof of Address",
          validProof:
            "Utility bills, Bank statements, Rental agreement, or any government-issued address proof",
        },
        {
          documentType: "Proof of Date of Birth",
          validProof:
            "Birth certificate, School certificate, or any government-issued document showing date of birth",
        },
      ],
      publishDetails: {
        isActive: true,
        newProcess:
          "Apply for new Aadhaar card through enrollment centers with required documents",
        updateProcess:
          "Update existing Aadhaar details online or at enrollment centers",
        lostProcess:
          "Report lost Aadhaar and apply for reprint with valid ID proof",
        surrenderProcess:
          "Surrender Aadhaar if duplicate or incorrect information found",
        newDocument:
          "Birth certificate, address proof, photo ID, and biometric data",
        updateDocument:
          "Original Aadhaar card, supporting documents for changes",
        lostDocument:
          "Valid photo ID proof and police complaint (if applicable)",
        surrenderDocument: "Original Aadhaar card and reason for surrender",
      },
    },
    2: {
      basicInfo: {
        serviceName: "PAN Card Application",
        serviceSummary:
          "Apply for new PAN card or update existing one. The Permanent Account Number (PAN) is a unique 10-digit alphanumeric identifier issued by the Income Tax Department.",
        serviceType: "PAN Card",
        eligibility:
          "Any individual, company, firm, or organization can apply for PAN. Valid proof of identity, address, and date of birth required.",
        applicationMode: "Both",
        url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
        address:
          "NSDL e-Gov, 4th Floor, Trade World, A Wing, Kamala Mills Compound, Lower Parel, Mumbai - 400013",
      },
      processSteps: [
        {
          stepNo: "1",
          processDetails:
            "Visit the NSDL or UTIITSL website for PAN application",
        },
        {
          stepNo: "2",
          processDetails:
            "Fill the PAN application form (Form 49A for Indian citizens)",
        },
        {
          stepNo: "3",
          processDetails: "Upload required documents and photograph",
        },
        { stepNo: "4", processDetails: "Pay the application fee online" },
        {
          stepNo: "5",
          processDetails:
            "Submit the application and note the acknowledgment number",
        },
        {
          stepNo: "6",
          processDetails:
            "Track application status and receive PAN card by post",
        },
      ],
      documents: [
        {
          documentType: "Proof of Identity",
          validProof: "Aadhaar Card, Passport, Driving License, or Voter ID",
        },
        {
          documentType: "Proof of Address",
          validProof:
            "Utility bills, Bank statements, or any government-issued address proof",
        },
        {
          documentType: "Proof of Date of Birth",
          validProof: "Birth certificate, School certificate, or Passport",
        },
        {
          documentType: "Photograph",
          validProof: "Recent passport-size photograph (3.5cm x 2.5cm)",
        },
      ],
      publishDetails: {
        isActive: true,
        newProcess:
          "Apply for new PAN card through online portal or authorized centers",
        updateProcess: "Update PAN details online with supporting documents",
        lostProcess: "Apply for duplicate PAN card with valid ID proof",
        surrenderProcess: "Surrender PAN if duplicate or incorrect information",
        newDocument:
          "Identity proof, address proof, date of birth proof, and photograph",
        updateDocument:
          "Original PAN card and supporting documents for changes",
        lostDocument:
          "Valid photo ID proof and police complaint (if applicable)",
        surrenderDocument: "Original PAN card and reason for surrender",
      },
    },
    3: {
      basicInfo: {
        serviceName: "Ayushman Bharat Scheme",
        serviceSummary:
          "Healthcare coverage for economically weaker sections. This scheme provides health coverage up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
        serviceType: "Healthcare",
        eligibility:
          "Families identified as deprived rural households and certain occupational categories of urban workers' families as per SECC database.",
        applicationMode: "Both",
        url: "https://pmjay.gov.in/",
        address: "Ministry of Health and Family Welfare, Government of India",
      },
      processSteps: [
        {
          stepNo: "1",
          processDetails:
            "Check eligibility using your mobile number or ration card number",
        },
        {
          stepNo: "2",
          processDetails:
            "Visit the official PM-JAY website or nearest Common Service Center",
        },
        {
          stepNo: "3",
          processDetails: "Provide required family details and documents",
        },
        {
          stepNo: "4",
          processDetails: "Submit the application for verification",
        },
        {
          stepNo: "5",
          processDetails: "Receive confirmation and e-card via SMS/email",
        },
        {
          stepNo: "6",
          processDetails:
            "Use the e-card for cashless treatment at empaneled hospitals",
        },
      ],
      documents: [
        {
          documentType: "Aadhaar Card",
          validProof: "All family members' Aadhaar cards for identification",
        },
        {
          documentType: "Ration Card",
          validProof: "Current ration card showing family composition",
        },
        {
          documentType: "Income Certificate",
          validProof: "Income certificate from competent authority",
        },
        {
          documentType: "Caste Certificate",
          validProof: "Caste certificate if applicable",
        },
      ],
      publishDetails: {
        isActive: true,
        newProcess:
          "Apply for new Ayushman Bharat card through online portal or CSC centers",
        updateProcess:
          "Update family details and add/remove members through portal",
        lostProcess:
          "Apply for duplicate card with valid ID proof and police complaint",
        surrenderProcess: "Surrender card if family becomes ineligible",
        newDocument:
          "Aadhaar cards, ration card, income certificate, and family photos",
        updateDocument: "Original card and supporting documents for changes",
        lostDocument: "Valid ID proof and police complaint (if applicable)",
        surrenderDocument: "Original card and reason for surrender",
      },
    },
  };

  useEffect(() => {
    // Get service details from location state or URL params
    const serviceNum = location.state?.serviceNum || 1;
    const details = mockServiceDetails[serviceNum];
    if (details) {
      setServiceDetails({ ...details, serviceNum });
    }
  }, [location]);

  if (!serviceDetails) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading service details...</p>
      </div>
    );
  }

  return (
    <div className="publish-details-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Service Details</h1>
      </div>

      <div className="details-container">
        {/* Service Overview */}
        <div className="details-section">
          <h2>Service Overview</h2>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="label">Service Name:</span>
              <span className="value">
                {serviceDetails.basicInfo.serviceName}
              </span>
            </div>
            <div className="overview-item">
              <span className="label">Service Type:</span>
              <span className="value">
                {serviceDetails.basicInfo.serviceType}
              </span>
            </div>
            <div className="overview-item">
              <span className="label">Application Mode:</span>
              <span className="value">
                {serviceDetails.basicInfo.applicationMode}
              </span>
            </div>
            <div className="overview-item">
              <span className="label">Status:</span>
              <span className="status-badge active">Active</span>
            </div>
          </div>
        </div>

        {/* Service Summary */}
        <div className="details-section">
          <h2>Service Summary</h2>
          <p className="summary-text">
            {serviceDetails.basicInfo.serviceSummary}
          </p>
        </div>

        {/* Eligibility */}
        <div className="details-section">
          <h2>Eligibility Criteria</h2>
          <p className="eligibility-text">
            {serviceDetails.basicInfo.eligibility}
          </p>
        </div>

        {/* Application Details */}
        <div className="details-section">
          <h2>Application Details</h2>
          <div className="application-details">
            {serviceDetails.basicInfo.url && (
              <div className="detail-item">
                <span className="label">Application URL:</span>
                <a
                  href={serviceDetails.basicInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="url-link"
                >
                  {serviceDetails.basicInfo.url}
                </a>
              </div>
            )}
            {serviceDetails.basicInfo.address && (
              <div className="detail-item">
                <span className="label">Application Address:</span>
                <span className="value">
                  {serviceDetails.basicInfo.address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Process Steps */}
        <div className="details-section">
          <h2>Application Process</h2>
          <div className="process-steps">
            {serviceDetails.processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.stepNo}</div>
                <div className="step-content">
                  <p>{step.processDetails}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="details-section">
          <h2>Required Documents</h2>
          <div className="documents-list">
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

        {/* Process Details */}
        <div className="details-section">
          <h2>Process Details</h2>
          <div className="process-details-grid">
            <div className="process-group">
              <h3>Application Processes</h3>
              <div className="process-item">
                <span className="process-label">New:</span>
                <p>{serviceDetails.publishDetails.newProcess}</p>
              </div>
              <div className="process-item">
                <span className="process-label">Update:</span>
                <p>{serviceDetails.publishDetails.updateProcess}</p>
              </div>
              <div className="process-item">
                <span className="process-label">Lost:</span>
                <p>{serviceDetails.publishDetails.lostProcess}</p>
              </div>
              <div className="process-item">
                <span className="process-label">Surrender:</span>
                <p>{serviceDetails.publishDetails.surrenderProcess}</p>
              </div>
            </div>

            <div className="document-group">
              <h3>Document Requirements</h3>
              <div className="process-item">
                <span className="process-label">New:</span>
                <p>{serviceDetails.publishDetails.newDocument}</p>
              </div>
              <div className="process-item">
                <span className="process-label">Update:</span>
                <p>{serviceDetails.publishDetails.updateDocument}</p>
              </div>
              <div className="process-item">
                <span className="process-label">Lost:</span>
                <p>{serviceDetails.publishDetails.lostDocument}</p>
              </div>
              <div className="process-item">
                <span className="process-label">Surrender:</span>
                <p>{serviceDetails.publishDetails.surrenderDocument}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="edit-btn"
            onClick={() => navigate("/edit-service")}
          >
            Edit Service
          </button>
          <button
            className="publish-btn"
            onClick={() => navigate("/publish-service")}
          >
            Publish Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishDetails;
