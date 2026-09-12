import React from 'react';
import './AboutUs.css';
import { 
  FiBookOpen, 
  FiTrendingUp, 
  FiShare2, 
  FiUserCheck, 
  FiAward, 
  FiTarget, 
  FiArrowRight,
  FiPlayCircle,
  FiSearch
} from 'react-icons/fi';

export default function AboutUs() {
  return (
    <div className="about-page">
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
          <a href="/about" className="active">About</a>
          <a href="#resources">Resources ▾</a>
          <a href="#how-it-works">How It Works</a>
        </div>
        <div className="nav-actions">
          <a href="/login" className="btn-login">Login</a>
          <a href="/register" className="btn-signup">Sign Up</a>
        </div>
      </nav>

      {/* HERO SECTION WITH SEARCH BAR */}
      <section className="about-hero">
        <div className="hero-search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search courses, skills, resources..." />
          <button className="btn-search">Search <FiArrowRight /></button>
        </div>

        <div className="popular-tags">
          <span className="tag-label">POPULAR</span>
          <span className="tag">Data Analysis</span>
          <span className="tag">Remote Sensing</span>
          <span className="tag">Ocean Science</span>
          <span className="tag">Leadership</span>
          <span className="tag">Project Management</span>
        </div>

        <div className="hero-cta-group">
          <a href="/register" className="btn-hero-primary">
            Explore Capacity Connect <FiArrowRight />
          </a>
          <button className="btn-hero-secondary">
            <FiPlayCircle /> See how it works
          </button>
        </div>

        <div className="hero-pillars-bar">
          <span>LEARN</span>
          <span className="dot">•</span>
          <span>DEVELOP</span>
          <span className="dot">•</span>
          <span>GROW</span>
        </div>
      </section>

      {/* MAIN WHITE CARD CONTAINER */}
      <main className="about-main-card">
        {/* SECTION 1: SYSTEM OVERVIEW */}
        <section className="overview-section">
          <span className="section-eyebrow">— THE CAPACITY CONNECT ECOSYSTEM —</span>
          <h1 className="main-heading">What is Capacity Connect?</h1>
          <p className="main-subheading">
            A connected learning and capability ecosystem that brings people, knowledge, and development 
            opportunities together — helping individuals learn with purpose, build meaningful capabilities, and 
            discover what comes next[cite: 11].
          </p>
        </section>

        {/* SECTION 2: THE THREE PILLARS */}
        <section className="pillars-section">
          <h2 className="section-title">Built Upon Three Core Pillars</h2>
          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-wrapper blue">
                <FiBookOpen />
              </div>
              <h3>1. Organizational Training</h3>
              <p>Discover structured courses, engage with interactive modules, complete assessments, and build practical skills[cite: 11].</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper green">
                <FiTrendingUp />
              </div>
              <h3>2. Competency Development</h3>
              <p>Map your current skill levels, identify competency gaps against targets, and access personalized learning paths[cite: 11].</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper purple">
                <FiShare2 />
              </div>
              <h3>3. Knowledge Sharing</h3>
              <p>Access an approved central repository of best practices, technical guides, video tutorials, and reference documentation[cite: 11].</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS STEP-BY-STEP */}
        <section className="workflow-section">
          <h2 className="section-title">How It Works: Continuous Growth Cycle</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">01</div>
              <h4>Skill Gap Mapping</h4>
              <p>Assess your current competency profile against target organizational benchmarks[cite: 11].</p>
            </div>

            <div className="step-arrow"><FiArrowRight /></div>

            <div className="step-item">
              <div className="step-number">02</div>
              <h4>Targeted Learning</h4>
              <p>Receive rule-based course recommendations designed to close identified skill gaps[cite: 11].</p>
            </div>

            <div className="step-arrow"><FiArrowRight /></div>

            <div className="step-item">
              <div className="step-number">03</div>
              <h4>Assessment & Verification</h4>
              <p>Complete module quizzes, earn verifiable completion certificates, and level up[cite: 11].</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PLATFORM ROLES */}
        <section className="roles-section">
          <h2 className="section-title">Designed for Every Organizational Role</h2>
          <div className="roles-grid">
            <div className="role-box">
              <div className="role-header">
                <FiUserCheck className="role-icon" />
                <h3>Learners & Employees</h3>
              </div>
              <p>Track skill gaps, enroll in targeted courses, consume materials, and download certificates[cite: 11].</p>
            </div>

            <div className="role-box">
              <div className="role-header">
                <FiAward className="role-icon" />
                <h3>Trainers & Instructors</h3>
              </div>
              <p>Build course modules, design assessments, upload Knowledge Hub guides, and monitor learner progress[cite: 11].</p>
            </div>

            <div className="role-box">
              <div className="role-header">
                <FiTarget className="role-icon" />
                <h3>Administrators</h3>
              </div>
              <p>Manage organizational skill catalogues, approve content, oversee users, and track analytics[cite: 11].</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}