import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PublishServiceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    documents: [{ documentType: "", validProof: "" }],
    isActive: true,
    new: false,
    update: false,
    lost: false,
    surrender: false,
    processName: "",
    newProcess: "",
    updateProcess: "",
    lostProcess: "",
    surrenderProcess: "",
    newDocument: "",
    updateDocument: "",
    lostDocument: "",
    surrenderDocument: "",
  });

  // Auto-populate fields from previous forms
  useEffect(() => {
    if (location.state) {
      const {
        serviceData,
        previousFormData,
        initialFormData,
        originalFormData,
      } = location.state;

      // Get service name from any of the previous forms
      const serviceName =
        serviceData?.id ||
        previousFormData?.id ||
        initialFormData?.id ||
        originalFormData?.id ||
        "";

      setFormData((prev) => ({
        ...prev,
        id: serviceName,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newDocs = prev.documents.map((doc, i) =>
        i === index ? { ...doc, [name]: value } : doc
      );
      return { ...prev, documents: newDocs };
    });
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, { documentType: "", validProof: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect all form data from previous forms
    const completeServiceData = {
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
        location.state?.form4Data || location.state?.serviceData || {},

      // Publish Details (from current form)
      isActive: formData.isActive,
      newProcess: formData.newProcess,
      updateProcess: formData.updateProcess,
      lostProcess: formData.lostProcess,
      surrenderProcess: formData.surrenderProcess,
      newDocument: formData.newDocument,
      updateDocument: formData.updateDocument,
      lostDocument: formData.lostDocument,
      surrenderDocument: formData.surrenderDocument,

      // Metadata
      serviceNum: Date.now(), // Generate unique service number
      status: formData.isActive ? "Active" : "Inactive",
      publishedDate: new Date().toISOString().split("T")[0],
      views: 0,
      applications: 0,
    };

    // Save to localStorage
    const existingServices = JSON.parse(
      localStorage.getItem("publishedServices") || "[]"
    );
    existingServices.push(completeServiceData);
    localStorage.setItem("publishedServices", JSON.stringify(existingServices));

    // Show success message
    alert("Service published successfully!");

    // Navigate to home page with the new service data
    navigate("/home", {
      state: {
        scrollTo: "published",
        newService: completeServiceData,
      },
    });
  };

  const handleBack = () => {
    navigate("/add-service/contact-details-form", { state: location.state });
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: "2rem",
      }}
    >
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
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            width: "100px",
          }}
        >
          ← Back
        </button>
        <h2 style={{ textAlign: "center", margin: 0 }}>
          <u>Publish Service Detail</u>
        </h2>
        <div style={{ width: "60px" }}></div> {/* Spacer for centering */}
      </div>

      {/* Display Service Name if available */}
      {formData.id && (
        <div
          style={{
            background: "#f0f9ff",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            border: "1px solid #0ea5e9",
          }}
        >
          <strong>Service Name:</strong> {formData.id}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Service Status Section */}
        <div style={{ margin: "1rem 0" }}>
          <span style={{ fontWeight: 600, marginRight: "1rem" }}>
            Service Status:
          </span>
          <label style={{ marginRight: "1.5rem" }}>
            <input
              type="radio"
              name="isActive"
              value="true"
              required
              checked={formData.isActive === true}
              onChange={() =>
                setFormData((prev) => ({ ...prev, isActive: true }))
              }
            />{" "}
            Active
          </label>
          <label>
            <input
              type="radio"
              name="isActive"
              value="false"
              required
              checked={formData.isActive === false}
              onChange={() =>
                setFormData((prev) => ({ ...prev, isActive: false }))
              }
            />{" "}
            Deactive
          </label>
        </div>

        {/* Process Section */}
        <div
          style={{
            margin: "1rem 0",
          }}
        >
          <label
            style={{
              fontWeight: 600,
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Process:
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>
                Lost :
              </label>
              <textarea
                name="lostProcess"
                value={formData.lostProcess || ""}
                onChange={handleChange}
                placeholder="Enter lost process details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>
                Update :
              </label>
              <textarea
                name="updateProcess"
                value={formData.updateProcess || ""}
                onChange={handleChange}
                placeholder="Enter update process details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>New :</label>
              <textarea
                name="newProcess"
                value={formData.newProcess || ""}
                onChange={handleChange}
                placeholder="Enter new process details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>
                Surrender :
              </label>
              <textarea
                name="surrenderProcess"
                value={formData.surrenderProcess || ""}
                onChange={handleChange}
                placeholder="Enter surrender process details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {/* Document Section */}
        <div
          style={{
            margin: "1rem 0",
          }}
        >
          <label
            style={{
              fontWeight: 600,
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Document:
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>
                Lost :
              </label>
              <textarea
                name="lostDocument"
                value={formData.lostDocument || ""}
                onChange={handleChange}
                placeholder="Enter lost document details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>
                Update :
              </label>
              <textarea
                name="updateDocument"
                value={formData.updateDocument || ""}
                onChange={handleChange}
                placeholder="Enter update document details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>New</label>
              <textarea
                name="newDocument"
                value={formData.newDocument || ""}
                onChange={handleChange}
                placeholder="Enter new document details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.9rem", color: "#666" }}>
                Surrender :
              </label>
              <textarea
                name="surrenderDocument"
                value={formData.surrenderDocument || ""}
                onChange={handleChange}
                placeholder="Enter surrender document details..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

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
          Publish Service
        </button>
      </form>
    </div>
  );
};

export default PublishServiceDetail;
