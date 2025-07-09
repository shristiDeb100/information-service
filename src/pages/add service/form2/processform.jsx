import React, { useState } from 'react';
import './processform.css';
import { Link } from 'react-router-dom';

const ProcessForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    serviceId: '',
    serviceType: '',
    steps: [
      { stepNo: '1', processDetails: '' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newSteps = prev.steps.map((step, i) =>
        i === index ? { ...step, [name]: value } : step
      );
      return { ...prev, steps: newSteps };
    });
  };

  const addStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, { stepNo: '', processDetails: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Process Form:', formData);
    // You can add API call here
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2> Process Entry Form</h2>
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
          <div style={{ marginBottom: '1rem' }}>
            <label>Steps:</label>
            {formData.steps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <input
                  type="number"
                  name="stepNo"
                  value={step.stepNo}
                  onChange={(e) => handleStepChange(idx, e)}
                  placeholder="Step No."
                  required
                  style={{ width: '110px' }}
                />
                <textarea
                  name="processDetails"
                  value={step.processDetails}
                  onChange={(e) => handleStepChange(idx, e)}
                  placeholder="Step Detail"
                  required
                  rows={2}
                  style={{ flex: 1, minWidth: '300px', maxWidth: '500px', resize: 'horizontal' }}
                />
                {idx === formData.steps.length - 1 && (
                  <button type="button" onClick={addStep} style={{ fontSize: '1.2rem', padding: '0 0.3rem', height: '32px', width: '32px', lineHeight: '1', borderRadius: '50%' }}>+</button>
                )}
              </div>
            ))}
          </div>

      

          <Link to="/add-service/supportive-document-form"> <button type="submit">Submit Process</button></Link>  
        </form>
      </div>
    </div>
  );
};

export default ProcessForm;
