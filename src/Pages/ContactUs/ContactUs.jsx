import React, { useState } from 'react';
import './ContactUs.css';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiHelpCircle, 
  FiMessageSquare, 
  FiSearch, 
  FiArrowRight 
} from 'react-icons/fi';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Learner',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* PUBLIC HEADER NAVIGATION */}
      <nav className="public-nav">
        <div className="nav-brand">
          <div className="brand-logo-icon"></div>
          <div>
            <span className="brand-title">CAPACITY CONNECT</span>
            <span className="brand-tagline">LEARN • DEVELOP • GROW</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#explore">Explore ▾</a>
          <a href="/about">About</a>
          <a href="#resources">Resources ▾</a>
          <a href="/contact" className="active">Contact Us</a>
        </div>
        <div className="nav-actions">
          <a href="/login" className="btn-login">Login</a>
          <a href="/register" className="btn-signup">Sign Up</a>
        </div>
      </nav>

      {/* HERO SECTION WITH SEARCH BAR */}
      <section className="contact-hero">
        <div className="hero-search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search FAQs, platform support, help topics..." />
          <button className="btn-search">Search <FiArrowRight /></button>
        </div>

        <div className="popular-tags">
          <span className="tag-label">HELP TOPICS</span>
          <span className="tag">Account Access</span>
          <span className="tag">Course Enrollment</span>
          <span className="tag">Skill Gap Assessment</span>
          <span className="tag">Knowledge Hub Uploads</span>
        </div>

        <div className="hero-pillars-bar">
          <span>SUPPORT</span>
          <span className="dot">•</span>
          <span>ASSISTANCE</span>
          <span className="dot">•</span>
          <span>FEEDBACK</span>
        </div>
      </section>

      {/* MAIN WHITE CARD CONTAINER */}
      <main className="contact-main-card">
        <section className="overview-section">
          <span className="section-eyebrow">— REACH OUT TO US —</span>
          <h1 className="main-heading">Get in Touch with Capacity Connect</h1>
          <p className="main-subheading">
            Have questions about competency mapping, trainer approvals, or platform access? 
            Our support team is here to assist you[cite: 11].
          </p>
        </section>

        {/* CONTACT CARDS GRID */}
        <div className="contact-info-grid">
          <div className="info-card">
            <div className="info-icon blue"><FiMail /></div>
            <h3>Email Us</h3>
            <p>Direct your inquiries to our dedicated portal support desk.</p>
            <span className="info-detail">support@capacityconnect.gov.in</span>
          </div>

          <div className="info-card green">
            <div className="info-icon green"><FiPhone /></div>
            <h3>Call Us</h3>
            <p>Mon-Fri from 9:00 AM to 6:00 PM IST for immediate assistance.</p>
            <span className="info-detail">+91 (079) 1800-266-075</span>
          </div>

          <div className="info-card purple">
            <div className="info-icon purple"><FiMapPin /></div>
            <h3>Headquarters</h3>
            <p>Capacity Building & Knowledge Sharing Management Hub.</p>
            <span className="info-detail">New Delhi / Ahmedabad, India</span>
          </div>
        </div>

        {/* TWO COLUMN FORM & FAQ SECTION */}
        <div className="contact-content-grid">
          {/* LEFT FORM */}
          <div className="form-container">
            <h2 className="content-title">Send Us a Message</h2>
            {submitted ? (
              <div className="success-message">
                <FiMessageSquare className="success-icon" />
                <h3>Thank you for reaching out!</h3>
                <p>Your message has been submitted. Our team will review your query and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      placeholder="e.g. Rahul Sharma" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="e.g. rahul@org.in" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                      <option value="Learner">Learner / Employee</option>
                      <option value="Trainer">Trainer / Instructor</option>
                      <option value="Admin">Administrator</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="e.g. Course Approval Issue" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Describe your query or issue in detail..." 
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  Send Message <FiSend />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT FAQ ACCORDION */}
          <div className="faq-container">
            <h2 className="content-title">Frequently Asked Questions</h2>
            
            <div className="faq-list">
              <div className="faq-item">
                <h4><FiHelpCircle /> How is my skill gap calculated?</h4>
                <p>Skill gaps are automatically calculated by taking your target competency level minus your current verified skill level[cite: 11].</p>
              </div>

              <div className="faq-item">
                <h4><FiHelpCircle /> How do I request Trainer access?</h4>
                <p>You can request a Trainer account during registration or submit a role update request through your Learner account settings[cite: 11].</p>
              </div>

              <div className="faq-item">
                <h4><FiHelpCircle /> Who approves Knowledge Hub resources?</h4>
                <p>Uploaded guides, PDFs, and video resources are reviewed and approved by Platform Administrators before becoming publicly visible[cite: 11].</p>
              </div>

              <div className="faq-item">
                <h4><FiHelpCircle /> Are completion certificates verifiable?</h4>
                <p>Yes, all certificates earned upon passing course quizzes are issued with unique system IDs for organizational verification[cite: 11].</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}