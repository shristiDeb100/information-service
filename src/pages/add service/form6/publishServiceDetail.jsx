import React, { useState } from "react";

const PublishServiceDetail = () => {
  const [formData, setFormData] = useState({
    id: "",
    documents: [
      { documentType: '', validProof: '' },
    ],
    isActive: true,
    new: false,
    update: false,
    lost: false,
    surrender: false,
    processName: ""
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
    console.log("Publish Service Detail Submitted:", formData);
    // Handle submission logic here
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <u>Publish Service Detail</u>
      </h2>
      <form onSubmit={handleSubmit}>
      
        {/* Service Status Section */}
        <div style={{ margin: '1rem 0' }}>
          <span style={{ fontWeight: 600, marginRight: '1rem' }}>Service Status:</span>
          <label style={{ marginRight: '1.5rem' }}>
            <input
              type="radio"
              name="isActive"
              value="true"
              checked={formData.isActive === true}
              onChange={() => setFormData(prev => ({ ...prev, isActive: true }))}
            /> Active
          </label>
          <label>
            <input
              type="radio"
              name="isActive"
              value="false"
              checked={formData.isActive === false}
              onChange={() => setFormData(prev => ({ ...prev, isActive: false }))}
            /> Deactive
          </label>
        </div>

        <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontWeight: 600, marginRight: '1rem' }}>Process:</span>
            <input
              type="radio"
              name="new"
              value="false"
              checked={formData.new === true}
              onChange={() => setFormData(prev => ({ ...prev, new: !formData.new }))}
            /> 
          <label style={{ marginRight: '1.5rem' }}>
            New
          </label>
          
        </div>

        {/* Dynamic Documents Section */}
      

        <button type="submit" style={{ padding: '0.6rem 1.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
          Publish Service
        </button>
      </form>
    </div>
  );
};

export default PublishServiceDetail;
