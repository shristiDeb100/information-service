import React, { useState } from "react";
import "./contactdetailsform.css";

const ContactDetailsForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    serviceId: "",
    designation: "",
    email: "",
    contactNumber: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <div className="contact-details-form-container">
      <h2>Contact Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name:
            <input type="text" name="id" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            District:
            <input type="text" name="name" value={formData.district} onChange={handleChange} />
          </label>
        </div>

        <div className="form-row">
          <label>
          Sub District:
            <input type="text" name="serviceId" value={formData.subDistrict} onChange={handleChange} />
          </label>
          <label>
            Designation:
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
          </label>
        </div>


        <div className="form-row
        ">
          <label>
              Block:
            <input name="address" value={formData.block} onChange={handleChange}/>
          </label>
          <label>
              Service Name:
            <input name="name" value={formData.name} onChange={handleChange}/>
          </label>
        </div>

        <button type="submit">Submit Contact Details</button>
      </form>
    </div>
  );
};

export default ContactDetailsForm;
