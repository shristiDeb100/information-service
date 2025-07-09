import React, { useState } from 'react';
import './pendingservice.css'; // create a matching CSS file

const PendingService = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    serviceDetail: '',
    processDetail: '',
    documentDetail: ''
  });

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData({ serviceDetail: '', processDetail: '', documentDetail: '' }); // reset
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`For: ${selectedOption}`, formData);
    alert("Submitted successfully!");
  };

  return (
    <div className="pending-service-container">
      <h2>Pending Service Type</h2>

      <div className="option-group">
        <label><input type="radio" name="option" value="New" onChange={handleChange} checked={selectedOption === 'New'} /> New</label>
        <label><input type="radio" name="option" value="Lost" onChange={handleChange} checked={selectedOption === 'Lost'} /> Lost</label>
        <label><input type="radio" name="option" value="Update" onChange={handleChange} checked={selectedOption === 'Update'} /> Update</label>
        <label><input type="radio" name="option" value="Surrender" onChange={handleChange} checked={selectedOption === 'Surrender'} /> Surrender</label>
      </div>

      {selectedOption && (
        <form onSubmit={handleSubmit} className="detail-form">
          <h3>Provide details for: <span className="selected-type">{selectedOption}</span></h3>

          <label>
            Service Details:
            <textarea name="serviceDetail" value={formData.serviceDetail} onChange={handleInput} placeholder={`Enter service details for ${selectedOption}`} />
          </label>

          <label>
            Add Process:
            <textarea name="processDetail" value={formData.processDetail} onChange={handleInput} placeholder={`Enter process for ${selectedOption}`} />
          </label>

          <label>
            Supportive Document:
            <textarea name="documentDetail" value={formData.documentDetail} onChange={handleInput} placeholder={`Enter documents for ${selectedOption}`} />
          </label>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PendingService;
