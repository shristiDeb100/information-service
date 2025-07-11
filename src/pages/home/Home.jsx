import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar";
import SearchBar from "../../components/dashboard/searchbar";

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
  const [searchQuery, setSearchQuery] = useState("");
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
      if (location.state.scrollTo === "top") {
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveTab("published"); // Default to published tab when going to top
      } else {
        setActiveTab(location.state.scrollTo);
      }

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

  // Delete service function
  const handleDeleteService = (serviceNum, serviceName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${serviceName}"?`
    );
    if (confirmDelete) {
      setPublishedServices((prev) =>
        prev.filter((service) => service.serviceNum !== serviceNum)
      );
      alert(`Service "${serviceName}" has been deleted successfully!`);
    }
  };

  return (
    <div className="home-layout">
      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Main Layout with Sidebar */}
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar-container">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <div className="content-header">
            <div className="header-content">
              <h1 className="main-title">Information Services Dashboard</h1>
              <p className="subtitle">
                Manage and monitor government services efficiently
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-container">
            {stats.map((stat, idx) => (
              <div className="stat-card-new" key={idx}>
                <div className="stat-icon-new">📊</div>
                <div className="stat-content">
                  <div className="stat-number">{stat.count}</div>
                  <div className="stat-label-new">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="tab-container">
            <div className="tab-buttons">
              <button
                className={`tab-btn-new ${
                  activeTab === "published" ? "active" : ""
                }`}
                onClick={() => setActiveTab("published")}
              >
                <span className="tab-icon">📂</span>
                Published Services
              </button>
              <button
                className={`tab-btn-new ${
                  activeTab === "pending" ? "active" : ""
                }`}
                onClick={() => setActiveTab("pending")}
              >
                <span className="tab-icon">⏳</span>
                Pending Services
              </button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="content-sections">
            {activeTab === "published" && (
              <div className="services-section">
                <div className="section-header">
                  <h2>Published Services</h2>
                  <span className="service-count">
                    {publishedServices.length} services
                  </span>
                </div>
                <div className="services-grid-new">
                  {publishedServices.map((service) => (
                    <div className="service-card-new" key={service.serviceNum}>
                      <div className="card-header">
                        <div className="service-number-new">
                          #{service.serviceNum}
                        </div>
                        <div className="card-actions">
                          <div className="status-badge active">
                            {service.status}
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteService(
                                service.serviceNum,
                                service.serviceName
                              )
                            }
                            title="Delete Service"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 className="service-title-new">
                          {service.serviceName}
                        </h3>
                        <p className="service-description-new">
                          {service.serviceSummary}
                        </p>
                      </div>
                      <div className="card-stats">
                        <div className="stat-item-new">
                          <span className="stat-icon-small">👁️</span>
                          <span className="stat-text">
                            {service.views} views
                          </span>
                        </div>
                        <div className="stat-item-new">
                          <span className="stat-icon-small">📝</span>
                          <span className="stat-text">
                            {service.applications} applications
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="publish-date-new">
                          Published: {service.publishedDate}
                        </div>
                        <button
                          className="view-details-btn-new"
                          onClick={() =>
                            navigate("/publishDetails", {
                              state: {
                                serviceNum: service.serviceNum,
                                serviceData: service,
                              },
                            })
                          }
                        >
                          View Details
                          <span className="arrow-new">→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "pending" && (
              <div className="services-section">
                <div className="section-header">
                  <h2>Pending Services</h2>
                  <span className="service-count">
                    {pendingServices.length} services
                  </span>
                </div>
                <div className="services-grid-new">
                  {pendingServices.map((service) => (
                    <div
                      className="service-card-new pending"
                      key={service.serviceNum}
                    >
                      <div className="card-header">
                        <div className="service-number-new">
                          #{service.serviceNum}
                        </div>
                        <div className="card-actions">
                          <div className="status-badge pending">
                            {service.status}
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteService(
                                service.serviceNum,
                                service.serviceName
                              )
                            }
                            title="Delete Service"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 className="service-title-new">
                          {service.serviceName}
                        </h3>
                        <p className="service-description-new">
                          {service.serviceSummary}
                        </p>
                      </div>
                      <div className="pending-info-new">
                        <div className="info-item-new">
                          <span className="info-icon-new">📅</span>
                          <div className="info-content">
                            <span className="info-label-new">Submitted</span>
                            <span className="info-value-new">
                              {service.submittedDate}
                            </span>
                          </div>
                        </div>
                        <div className="info-item-new">
                          <span className="info-icon-new">⏱️</span>
                          <div className="info-content">
                            <span className="info-label-new">Review Time</span>
                            <span className="info-value-new">
                              {service.reviewTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="submit-date-new">
                          Submitted: {service.submittedDate}
                        </div>
                        <button
                          className="review-btn-new"
                          onClick={() =>
                            navigate("/pendingDetails", {
                              state: { serviceNum: service.serviceNum },
                            })
                          }
                        >
                          Review Service
                          <span className="arrow-new">→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
