import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ""))) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitStatus({ loading: true, success: false, error: null });
    
    try {
      // Replace with your actual API endpoint for contact form
      await axios.post("/api/contact", formData);
      
      setSubmitStatus({
        loading: false,
        success: true,
        error: null,
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
      
      // Redirect to thank you page or show success message
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Failed to submit the form. Please try again later.",
      });
      console.error("Contact form submission error:", error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">
          Have questions about blood donation? Need help? We're here for you!
        </p>
        
        {submitStatus.success ? (
          <div className="success-message">
            <h3>Thank you for contacting us!</h3>
            <p>We have received your message and will get back to you soon.</p>
            <p>Redirecting to home page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error-input" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? "error-input" : ""}
              />
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "error-input" : ""}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={errors.message ? "error-input" : ""}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={submitStatus.loading}
            >
              {submitStatus.loading ? "Sending..." : "Send Message"}
            </button>
            
            {submitStatus.error && (
              <div className="error-message form-error">
                {submitStatus.error}
              </div>
            )}
          </form>
        )}
      </div>
      
      <div className="contact-info-container">
        <h3>Our Contact Information</h3>
        <div className="contact-info-item">
          <i className="fa fa-map-marker"></i>
          <div>
            <h4>Address</h4>
            <p>123 Blood Donation Street, Medical District, City, State 12345</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <i className="fa fa-phone"></i>
          <div>
            <h4>Phone</h4>
            <p>+1 (123) 456-7890</p>
            <p>+1 (098) 765-4321</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <i className="fa fa-envelope"></i>
          <div>
            <h4>Email</h4>
            <p>contact@blooddonation.org</p>
            <p>support@blooddonation.org</p>
          </div>
        </div>
        
        <div className="contact-info-item">
          <i className="fa fa-clock-o"></i>
          <div>
            <h4>Working Hours</h4>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 1:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        
        <div className="social-media">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fa fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;