import React, { useState, useEffect } from "react";
import "./processform.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProcessForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    serviceId: "",
    serviceType: "",
    steps: [{ stepNo: "1", processDetails: "" }],
  });

  // Auto-populate fields from previous form
  useEffect(() => {
    if (location.state && location.state.serviceData) {
      const { serviceData } = location.state;
      setFormData((prev) => ({
        ...prev,
        id: serviceData.id || "",
        serviceType: serviceData.serviceType || "",
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    if (name === "stepNo") return; // Prevent manual editing
    setFormData((prev) => {
      const newSteps = prev.steps.map((step, i) =>
        i === index ? { ...step, [name]: value } : step
      );
      return { ...prev, steps: newSteps };
    });
  };

  const addStep = () => {
    setFormData((prev) => {
      const lastStepNo =
        prev.steps.length > 0
          ? parseInt(prev.steps[prev.steps.length - 1].stepNo, 10)
          : 0;
      return {
        ...prev,
        steps: [
          ...prev.steps,
          { stepNo: String(lastStepNo + 1), processDetails: "" },
        ],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Process Form:", formData);
    // You can add API call here
  };

  const handleBack = () => {
    navigate("/add-service/new-application");
  };

  return (
    <div className="form-wrapper">
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
          <h2>Process Entry Form</h2>
          <div style={{ width: "60px" }}></div> {/* Spacer for centering */}
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <label>
            Service Name:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter Service Name"
              required
            />
          </label>

          {/* Dynamic Steps Section - moved here */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Steps:</label>
            {formData.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#1976d2",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginRight: "1rem",
                    border: "2px solid rgb(4, 4, 4)",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {step.stepNo}
                </span>
                <textarea
                  name="processDetails"
                  value={step.processDetails}
                  onChange={(e) => handleStepChange(idx, e)}
                  placeholder="Step Detail"
                  required
                  rows={2}
                  style={{
                    flex: 1,
                    minWidth: "300px",
                    maxWidth: "500px",
                    resize: "horizontal",
                  }}
                />
                {idx === formData.steps.length - 1 && (
                  <button
                    type="button"
                    onClick={addStep}
                    style={{
                      fontSize: "1.2rem",
                      padding: "0 0.3rem",
                      height: "32px",
                      width: "32px",
                      lineHeight: "1",
                      borderRadius: "50%",
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <Link
            to="/add-service/supportive-document-form"
            state={{
              serviceData: formData,
              previousFormData: location.state?.serviceData,
              // Preserve all form data from previous forms
              form1Data: location.state?.serviceData,
              form2Data: formData,
              // Add process steps to the main service data
              processSteps: formData.steps,
            }}
          >
            <button type="submit">Submit Process</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProcessForm;
