import React, { useState } from "react";
import "./suportivedocumentform.css";
import { Link } from "react-router-dom";

const SupportiveDocumentForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    serviceId: "",
    serviceType: "",
    documents: [
      { documentType: '', validProof: '' },
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      documents: [...prev.documents, { documentType: '', validProof: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Supportive Document Submitted:", formData);
    // Handle submission logic
  };

  return (
    <div className="supportive-form-container">
      <h2>
         <u>Supportive Document Form</u>
      </h2>
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
        <div style={{ marginBottom: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem', background: '#f8fafc' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.7rem', color: '#374151' }}>
            Documents
          </div>
          {formData.documents.map((doc, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.7rem' }}>
              <input
                type="number"
                value={idx + 1}
                readOnly
                style={{ width: '60px', background: '#e5e7eb', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center', fontWeight: 600 }}
                title="Serial Number"
              />
              <input
                type="text"
                name="documentType"
                value={doc.documentType}
                onChange={(e) => handleDocumentChange(idx, e)}
                placeholder="Document Type"
                required
                style={{ minWidth: '120px', maxWidth: '200px', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.3rem 0.5rem' }}
              />
              <textarea
                name="validProof"
                value={doc.validProof}
                onChange={(e) => handleDocumentChange(idx, e)}
                placeholder="Valid Proof"
                required
                rows={2}
                style={{ minWidth: '200px', maxWidth: '350px', resize: 'horizontal', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.5rem' }}
              />
              {idx === formData.documents.length - 1 && (
                <button type="button" onClick={addDocument} style={{ fontSize: '1.2rem', padding: '0 0.3rem', height: '32px', width: '32px', lineHeight: '1', borderRadius: '50%', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' }}>+</button>
              )}
            </div>
          ))}
        </div>

        <Link to="/add-service/contact-details-form">
        <button type="submit">Submit Documents</button></Link>
      </form>
    </div>
  );
};

export default SupportiveDocumentForm;