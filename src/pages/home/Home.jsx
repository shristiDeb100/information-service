import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate, useLocation } from "react-router-dom";

const stats = [
  { count: "3680+", label: "Total services" },
  { count: "570+", label: "available services" },
  { count: "3100+", label: "official sites" },
];

// Default published services data (fallback)
const defaultPublishedServices = [
  {
    serviceNum: 1,
    serviceName: "Aadhaar Card Update",
    serviceSummary: "Update your Aadhaar card details online with ease",
    status: "Active",
    publishedDate: "2024-01-15",
    views: 1250,
    applications: 89,
  },
  {
    serviceNum: 2,
    serviceName: "PAN Card Application",
    serviceSummary: "Apply for new PAN card or update existing one",
    status: "Active",
    publishedDate: "2024-01-10",
    views: 980,
    applications: 67,
  },
  {
    serviceNum: 3,
    serviceName: "Ayushman Bharat Scheme",
    serviceSummary: "Healthcare coverage for economically weaker sections",
    status: "Active",
    publishedDate: "2024-01-08",
    views: 2100,
    applications: 156,
  },
  {
    serviceNum: 4,
    serviceName: "PM Kisan Samman Nidhi",
    serviceSummary: "Direct income support for farmers",
    status: "Active",
    publishedDate: "2024-01-05",
    views: 890,
    applications: 45,
  },
  {
    serviceNum: 5,
    serviceName: "Student Scholarship Portal",
    serviceSummary: "Apply for various government scholarships",
    status: "Active",
    publishedDate: "2024-01-12",
    views: 1650,
    applications: 234,
  },
  {
    serviceNum: 6,
    serviceName: "PM Awas Yojana",
    serviceSummary: "Housing for all scheme application",
    status: "Active",
    publishedDate: "2024-01-03",
    views: 1100,
    applications: 78,
  },
];

// Dummy pending services data
const pendingServices = [
  {
    serviceNum: 101,
    serviceName: "Digital Health ID Registration",
    serviceSummary:
      "Create your unique digital health identity for seamless healthcare access",
    status: "Pending",
    submittedDate: "2024-01-20",
    reviewTime: "2-3 days",
  },
  {
    serviceNum: 102,
    serviceName: "Startup India Registration",
    serviceSummary:
      "Register your startup for government benefits and support programs",
    status: "Pending",
    submittedDate: "2024-01-18",
    reviewTime: "5-7 days",
  },
  {
    serviceNum: 103,
    serviceName: "PM Fasal Bima Yojana",
    serviceSummary:
      "Crop insurance scheme for farmers to protect against natural calamities",
    status: "Pending",
    submittedDate: "2024-01-19",
    reviewTime: "3-4 days",
  },
  {
    serviceNum: 104,
    serviceName: "Skill India Certification",
    serviceSummary:
      "Get certified in various skills for better employment opportunities",
    status: "Pending",
    submittedDate: "2024-01-17",
    reviewTime: "4-5 days",
  },
  {
    serviceNum: 105,
    serviceName: "PM Ujjwala Yojana",
    serviceSummary:
      "Free LPG connection for women from below poverty line households",
    status: "Pending",
    submittedDate: "2024-01-16",
    reviewTime: "6-8 days",
  },
  {
    serviceNum: 106,
    serviceName: "Digital Locker Service",
    serviceSummary:
      "Store and share important documents securely in digital format",
    status: "Pending",
    submittedDate: "2024-01-15",
    reviewTime: "2-3 days",
  },
];

// Service Management Form Data
const serviceManagementData = {
  basicInfo: {
    serviceName: "",
    serviceSummary: "",
    serviceType: "",
    eligibility: "",
    applicationMode: "",
    url: "",
    address: "",
  },
  processSteps: [{ stepNo: "1", processDetails: "" }],
  documents: [{ documentType: "", validProof: "" }],
  publishDetails: {
    isActive: true,
    newProcess: "",
    updateProcess: "",
    lostProcess: "",
    surrenderProcess: "",
    newDocument: "",
    updateDocument: "",
    lostDocument: "",
    surrenderDocument: "",
  },
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [formData, setFormData] = useState(serviceManagementData);
  const [publishedServices, setPublishedServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load published services from localStorage
  useEffect(() => {
    const savedServices = JSON.parse(
      localStorage.getItem("publishedServices") || "[]"
    );
    if (savedServices.length > 0) {
      setPublishedServices(savedServices);
    } else {
      setPublishedServices(defaultPublishedServices);
    }
  }, []);

  // Handle scroll state from navigation and new service
  useEffect(() => {
    if (location.state?.scrollTo) {
      setActiveTab(location.state.scrollTo);

      // If there's a new service, add it to the list
      if (location.state?.newService) {
        setPublishedServices((prev) => [location.state.newService, ...prev]);
        // Clear the state to prevent it from persisting
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.state, navigate, location.pathname]);

  const handleFormChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addProcessStep = () => {
    setFormData((prev) => ({
      ...prev,
      processSteps: [
        ...prev.processSteps,
        { stepNo: String(prev.processSteps.length + 1), processDetails: "" },
      ],
    }));
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, { documentType: "", validProof: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complete Service Data:", formData);
    setShowServiceForm(false);
  };

  return (
    <div className="home-container">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          margin: "16px 0 24px 0",
          padding: "8px 20px",

          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "18px" }}>←</span> Back
      </button>

      <div className="hero-section">
        <h1>#INFORMATIONCENTER / #KNOWLEDGEFORYOU</h1>
        <button onClick={() => setShowServiceForm(true)}>
          Add New Service →
        </button>
      </div>

      <div className="stats-section">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <h2>{stat.count}</h2>
            <p>{stat.label} →</p>
          </div>
        ))}
      </div>

      <div className="service-tabs">
        <button
          className={`tab-button ${activeTab === "published" ? "active" : ""}`}
          onClick={() => setActiveTab("published")}
        >
          Published Services
        </button>
        <button
          className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Services
        </button>
      </div>

      {activeTab === "published" && (
        <div className="published-services-section">
          <h2>Published Services</h2>
          <div className="services-grid">
            {publishedServices.map((service) => (
              <div className="service-card" key={service.serviceNum}>
                <div className="service-header">
                  <div className="service-number">#{service.serviceNum}</div>
                  <span
                    className={`service-status ${service.status.toLowerCase()}`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.serviceName}</h3>
                  <p className="service-description">
                    {service.serviceSummary}
                  </p>
                </div>
                <div className="service-stats">
                  <div className="stat-item">
                    <div className="stat-icon">👁️</div>
                    <div className="stat-info">
                      <span className="stat-value">{service.views}</span>
                      <span className="stat-label">Views</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">📝</div>
                    <div className="stat-info">
                      <span className="stat-value">{service.applications}</span>
                      <span className="stat-label">Applications</span>
                    </div>
                  </div>
                </div>
                <div className="service-footer">
                  <div className="publish-info">
                    <span className="publish-date">
                      Published: {service.publishedDate}
                    </span>
                  </div>
                  <button
                    className="view-details-btn"
                    onClick={() =>
                      navigate("/home/publishDetails", {
                        state: {
                          serviceNum: service.serviceNum,
                          serviceData: service,
                        },
                      })
                    }
                  >
                    <span>View Details</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "pending" && (
        <div className="pending-services-section">
          <h2>Pending Services</h2>
          <div className="services-grid">
            {pendingServices.map((service) => (
              <div
                className="service-card pending-card"
                key={service.serviceNum}
              >
                <div className="service-header">
                  <div className="service-number">#{service.serviceNum}</div>
                  <div className="header-right">
                    <span
                      className={`service-status ${service.status.toLowerCase()}`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.serviceName}</h3>
                  <p className="service-description">
                    {service.serviceSummary}
                  </p>
                </div>
                <div className="pending-info">
                  <div className="info-item">
                    <div className="info-icon">📅</div>
                    <div className="info-details">
                      <span className="info-label">Submitted</span>
                      <span className="info-value">
                        {service.submittedDate}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">⏱️</div>
                    <div className="info-details">
                      <span className="info-label">Review Time</span>
                      <span className="info-value">{service.reviewTime}</span>
                    </div>
                  </div>
                </div>
                <div className="service-footer">
                  <div className="submit-info">
                    <span className="submit-date">
                      Submitted: {service.submittedDate}
                    </span>
                  </div>
                  <button
                    className="review-btn"
                    onClick={() =>
                      navigate("/pendingDetails", {
                        state: { serviceNum: service.serviceNum },
                      })
                    }
                  >
                    <span>Review Service</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Service Management Form */}
      {showServiceForm && (
        <div className="service-form-overlay">
          <div className="service-form-container">
            <div className="form-header">
              <h2>Service Management Form</h2>
              <button
                className="close-btn"
                onClick={() => setShowServiceForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="comprehensive-form">
              {/* Basic Information Section */}
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Service Name:</label>
                    <input
                      type="text"
                      value={formData.basicInfo.serviceName}
                      onChange={(e) =>
                        handleFormChange(
                          "basicInfo",
                          "serviceName",
                          e.target.value
                        )
                      }
                      placeholder="Enter service name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Service Type:</label>
                    <select
                      value={formData.basicInfo.serviceType}
                      onChange={(e) =>
                        handleFormChange(
                          "basicInfo",
                          "serviceType",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="">Select service type</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Summary:</label>
                  <textarea
                    value={formData.basicInfo.serviceSummary}
                    onChange={(e) =>
                      handleFormChange(
                        "basicInfo",
                        "serviceSummary",
                        e.target.value
                      )
                    }
                    placeholder="Enter service summary"
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Eligibility:</label>
                  <textarea
                    value={formData.basicInfo.eligibility}
                    onChange={(e) =>
                      handleFormChange(
                        "basicInfo",
                        "eligibility",
                        e.target.value
                      )
                    }
                    placeholder="Enter eligibility criteria"
                    rows={3}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Application Mode:</label>
                    <select
                      value={formData.basicInfo.applicationMode}
                      onChange={(e) =>
                        handleFormChange(
                          "basicInfo",
                          "applicationMode",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="">Select mode</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Application URL:</label>
                    <input
                      type="url"
                      value={formData.basicInfo.url}
                      onChange={(e) =>
                        handleFormChange("basicInfo", "url", e.target.value)
                      }
                      placeholder="Enter application URL"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Application Address:</label>
                  <input
                    type="text"
                    value={formData.basicInfo.address}
                    onChange={(e) =>
                      handleFormChange("basicInfo", "address", e.target.value)
                    }
                    placeholder="Enter application address"
                  />
                </div>
              </div>

              {/* Process Steps Section */}
              <div className="form-section">
                <h3>Process Steps</h3>
                {formData.processSteps.map((step, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">{step.stepNo}</div>
                    <textarea
                      value={step.processDetails}
                      onChange={(e) => {
                        const newSteps = [...formData.processSteps];
                        newSteps[index].processDetails = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          processSteps: newSteps,
                        }));
                      }}
                      placeholder="Enter step details"
                      rows={2}
                      required
                    />
                    {index === formData.processSteps.length - 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={addProcessStep}
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Documents Section */}
              <div className="form-section">
                <h3>Required Documents</h3>
                {formData.documents.map((doc, index) => (
                  <div key={index} className="document-item">
                    <div className="doc-number">{index + 1}</div>
                    <input
                      type="text"
                      value={doc.documentType}
                      onChange={(e) => {
                        const newDocs = [...formData.documents];
                        newDocs[index].documentType = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          documents: newDocs,
                        }));
                      }}
                      placeholder="Document type"
                      required
                    />
                    <textarea
                      value={doc.validProof}
                      onChange={(e) => {
                        const newDocs = [...formData.documents];
                        newDocs[index].validProof = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          documents: newDocs,
                        }));
                      }}
                      placeholder="Valid proof details"
                      rows={2}
                      required
                    />
                    {index === formData.documents.length - 1 && (
                      <button
                        type="button"
                        className="add-btn"
                        onClick={addDocument}
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Publish Details Section */}
              <div className="form-section">
                <h3>Publish Details</h3>

                <div className="form-group">
                  <label>Service Status:</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        checked={formData.publishDetails.isActive === true}
                        onChange={() =>
                          handleFormChange("publishDetails", "isActive", true)
                        }
                      />
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={formData.publishDetails.isActive === false}
                        onChange={() =>
                          handleFormChange("publishDetails", "isActive", false)
                        }
                      />
                      Inactive
                    </label>
                  </div>
                </div>

                <div className="process-details-grid">
                  <div className="process-group">
                    <h4>Process Details</h4>
                    <div className="form-group">
                      <label>New Process:</label>
                      <textarea
                        value={formData.publishDetails.newProcess}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "newProcess",
                            e.target.value
                          )
                        }
                        placeholder="Enter new process details"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Update Process:</label>
                      <textarea
                        value={formData.publishDetails.updateProcess}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "updateProcess",
                            e.target.value
                          )
                        }
                        placeholder="Enter update process details"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Lost Process:</label>
                      <textarea
                        value={formData.publishDetails.lostProcess}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "lostProcess",
                            e.target.value
                          )
                        }
                        placeholder="Enter lost process details"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Surrender Process:</label>
                      <textarea
                        value={formData.publishDetails.surrenderProcess}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "surrenderProcess",
                            e.target.value
                          )
                        }
                        placeholder="Enter surrender process details"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="document-group">
                    <h4>Document Details</h4>
                    <div className="form-group">
                      <label>New Document:</label>
                      <textarea
                        value={formData.publishDetails.newDocument}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "newDocument",
                            e.target.value
                          )
                        }
                        placeholder="Enter new document details"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Update Document:</label>
                      <textarea
                        value={formData.publishDetails.updateDocument}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "updateDocument",
                            e.target.value
                          )
                        }
                        placeholder="Enter update document details"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Lost Document:</label>
                      <textarea
                        value={formData.publishDetails.lostDocument}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "lostDocument",
                            e.target.value
                          )
                        }
                        placeholder="Enter lost document details"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Surrender Document:</label>
                      <textarea
                        value={formData.publishDetails.surrenderDocument}
                        onChange={(e) =>
                          handleFormChange(
                            "publishDetails",
                            "surrenderDocument",
                            e.target.value
                          )
                        }
                        placeholder="Enter surrender document details"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowServiceForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Publish Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
