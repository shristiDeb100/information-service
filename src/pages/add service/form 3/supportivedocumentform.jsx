import React, { useState, useEffect } from "react";
import "./suportivedocumentform.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SupportiveDocumentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    serviceId: "",
    serviceType: "",
    documents: [{ documentType: "", validProof: "" }],
  });

  // Auto-populate fields from previous forms
  useEffect(() => {
    if (location.state) {
      const { serviceData, previousFormData } = location.state;
      setFormData((prev) => ({
        ...prev,
        id: serviceData?.id || previousFormData?.id || "",
        serviceType:
          serviceData?.serviceType || previousFormData?.serviceType || "",
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
    console.log("Supportive Document Submitted:", formData);
    // Handle submission logic
  };

  const handleBack = () => {
    navigate("/add-service/process-form", { state: location.state });
  };

  return (
    <div className="supportive-form-container">
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
        <h2>
          <u>Supportive Document Form</u>
        </h2>
        <div style={{ width: "60px" }}></div> {/* Spacer for centering */}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Service Number:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>

        {/* Dynamic Documents Section */}
        <div
          style={{
            marginBottom: "1.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "1rem",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: "0.7rem",
              color: "#374151",
            }}
          >
            Documents
          </div>
          {formData.documents.map((doc, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                marginBottom: "0.7rem",
              }}
            >
              <input
                type="number"
                value={idx + 1}
                readOnly
                style={{
                  width: "60px",
                  background: "#e5e7eb",
                  border: "1px solid #cbd5e1",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
                title="Serial Number"
              />
              <input
                type="text"
                name="documentType"
                value={doc.documentType}
                onChange={(e) => handleDocumentChange(idx, e)}
                placeholder="Document Type"
                required
                style={{
                  minWidth: "120px",
                  maxWidth: "200px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "4px",
                  padding: "0.3rem 0.5rem",
                }}
              />
              <textarea
                name="validProof"
                value={doc.validProof}
                onChange={(e) => handleDocumentChange(idx, e)}
                placeholder="Valid Proof"
                required
                rows={2}
                style={{
                  minWidth: "200px",
                  maxWidth: "350px",
                  resize: "horizontal",
                  border: "1px solid #cbd5e1",
                  borderRadius: "4px",
                  padding: "0.5rem",
                }}
              />
              {idx === formData.documents.length - 1 && (
                <button
                  type="button"
                  onClick={addDocument}
                  style={{
                    fontSize: "1.2rem",
                    padding: "0 0.3rem",
                    height: "32px",
                    width: "32px",
                    lineHeight: "1",
                    borderRadius: "50%",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        <Link
          to="/add-service/contact-details-form"
          state={{
            serviceData: formData,
            previousFormData: location.state?.serviceData,
            initialFormData: location.state?.previousFormData,
            // Preserve all form data from previous forms
            form1Data: location.state?.previousFormData,
            form2Data: location.state?.serviceData,
            form3Data: formData,
            // Preserve process steps from previous form
            processSteps:
              location.state?.processSteps ||
              location.state?.serviceData?.steps,
          }}
        >
          <button type="submit">Submit Documents</button>
        </Link>
      </form>
    </div>
  );
};

export default SupportiveDocumentForm;
