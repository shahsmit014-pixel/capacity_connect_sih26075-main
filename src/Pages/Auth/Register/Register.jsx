import { useState } from "react";
import { useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

// Zero-dependency SVG Icons for complete reusability across any React project
const Icons = {
  Logo: () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="9" fill="#171717" />
      <circle cx="11" cy="11" r="3.5" fill="#FFD45A" />
      <circle cx="21" cy="11" r="3.5" fill="#FFFFFF" />
      <circle cx="16" cy="21" r="3.5" fill="#FFD45A" />
      <path
        d="M11 11L21 11M11 11L16 21M21 11L16 21"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  User: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Lock: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  ),
  Check: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#171717"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Google: () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  ),
  Apple: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.05 1.69-.92 2.71 1 .08 2.02-.45 2.6-1.2" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  Users: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export default function Register({
  onNavigateToLogin,
  onRegisterSuccess,
  imageSrc,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();

  // Email format validation helper
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Phone validation helper (accepts digits, international prefix, separators)
  const isValidPhone = (phone) => {
    const digits = phone.replace(/[^0-9]/g, "");
    return digits.length >= 8 && digits.length <= 15;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear specific field error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (min. 8 digits)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms & Conditions";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate registration API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (onRegisterSuccess) {
        onRegisterSuccess(formData);
      }
    }, 600);
  };

  const handleSocialClick = (provider) => {
    window.alert(`Connect with ${provider} is ready for integration.`);
  };

  const heroImage =
    imageSrc ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="cc-reg-page-wrapper">
      <div className="cc-reg-backdrop" aria-hidden="true" />
      <button
        type="button"
        className="cc-reg-back-link"
        onClick={() => navigate("/")}
        aria-label="Back to Capacity Connect"
      >
        <span aria-hidden="true">←</span>
        <span>Back to Capacity Connect</span>
      </button>
      <div className="cc-reg-auth-container">
        {/* Left Side: Authentication Form */}
        <div className="cc-reg-form-pane">
          {/* Capacity Connect Branding */}
          <div className="cc-reg-brand">
            <Icons.Logo />
            <div className="cc-reg-brand-text">
              <span className="cc-reg-brand-name">Capacity</span>
              <span className="cc-reg-brand-highlight">Connect</span>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="cc-reg-header-block">
            <h1 className="cc-reg-heading">Create your account</h1>
            <p className="cc-reg-subtitle">
              Connect, collaborate and grow with Capacity Connect.
            </p>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="cc-reg-social-group">
            <button
              type="button"
              className="cc-reg-social-btn"
              onClick={() => handleSocialClick("Google")}
              aria-label="Sign up with Google"
            >
              <Icons.Google />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="cc-reg-social-btn"
              onClick={() => handleSocialClick("Apple")}
              aria-label="Sign up with Apple"
            >
              <Icons.Apple />
              <span>Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="cc-reg-divider">
            <span className="cc-reg-divider-line" />
            <span className="cc-reg-divider-text">or register with email</span>
            <span className="cc-reg-divider-line" />
          </div>

          {/* Submission Success Alert */}
          {submitSuccess && (
            <div className="cc-reg-success-banner">
              <span className="cc-reg-success-icon">✓</span>
              <span>
                Account created successfully! Welcome to Capacity Connect.
              </span>
            </div>
          )}

          {/* Registration Form */}
          <form className="cc-reg-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name Input */}
            <div className="cc-reg-field-group">
              <label className="cc-reg-label" htmlFor="reg-fullName">
                Full Name
              </label>
              <div className="cc-reg-input-wrapper">
                <span className="cc-reg-input-icon">
                  <Icons.User />
                </span>
                <input
                  id="reg-fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`cc-reg-input ${errors.fullName ? "has-error" : ""}`}
                />
              </div>
              {errors.fullName && (
                <span className="cc-reg-error-text">{errors.fullName}</span>
              )}
            </div>

            {/* Email Input */}
            <div className="cc-reg-field-group">
              <label className="cc-reg-label" htmlFor="reg-email">
                Email Address
              </label>
              <div className="cc-reg-input-wrapper">
                <span className="cc-reg-input-icon">
                  <Icons.Mail />
                </span>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`cc-reg-input ${errors.email ? "has-error" : ""}`}
                />
              </div>
              {errors.email && (
                <span className="cc-reg-error-text">{errors.email}</span>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="cc-reg-field-group">
              <label className="cc-reg-label" htmlFor="reg-phone">
                Phone Number
              </label>
              <div className="cc-reg-input-wrapper">
                <span className="cc-reg-input-icon">
                  <Icons.Phone />
                </span>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`cc-reg-input ${errors.phone ? "has-error" : ""}`}
                />
              </div>
              {errors.phone && (
                <span className="cc-reg-error-text">{errors.phone}</span>
              )}
            </div>

            {/* Password Input */}
            <div className="cc-reg-field-group">
              <label className="cc-reg-label" htmlFor="reg-password">
                Password
              </label>
              <div className="cc-reg-input-wrapper">
                <span className="cc-reg-input-icon">
                  <Icons.Lock />
                </span>
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className={`cc-reg-input ${errors.password ? "has-error" : ""}`}
                />
                <button
                  type="button"
                  className="cc-reg-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
              </div>
              {errors.password && (
                <span className="cc-reg-error-text">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="cc-reg-field-group">
              <label className="cc-reg-label" htmlFor="reg-confirmPassword">
                Confirm Password
              </label>
              <div className="cc-reg-input-wrapper">
                <span className="cc-reg-input-icon">
                  <Icons.Lock />
                </span>
                <input
                  id="reg-confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`cc-reg-input ${errors.confirmPassword ? "has-error" : ""}`}
                />
                <button
                  type="button"
                  className="cc-reg-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="cc-reg-error-text">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="cc-reg-terms-group">
              <label className="cc-reg-checkbox-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="cc-reg-checkbox-hidden"
                />
                <span
                  className={`cc-reg-custom-checkbox ${
                    formData.terms ? "checked" : ""
                  } ${errors.terms ? "checkbox-error" : ""}`}
                >
                  {formData.terms && <Icons.Check />}
                </span>
                <span className="cc-reg-terms-text">
                  I agree to the{" "}
                  <span className="cc-reg-terms-highlight">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="cc-reg-terms-highlight">Privacy Policy</span>
                </span>
              </label>
              {errors.terms && (
                <span className="cc-reg-error-text">{errors.terms}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cc-reg-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Switch to Login Text */}
          <p className="cc-reg-auth-switch">
            Already have an account?{" "}
            <a
              href="/login"
              className="cc-reg-auth-switch-link"
              onClick={(e) => {
                if (onNavigateToLogin) {
                  e.preventDefault();
                  onNavigateToLogin();
                }
              }}
            >
              Login
            </a>
          </p>
        </div>

        {/* Right Side: Professional Teamwork Visual with Floating UI Cards */}
        <div className="cc-reg-visual-pane">
          <img
            src={heroImage}
            alt="Capacity Connect Team Collaboration"
            className="cc-reg-hero-image"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="cc-reg-hero-overlay" />

          {/* Live Status Pill */}
          <div className="cc-reg-live-pill">
            <span className="cc-reg-pulse-dot" />
            <span>Capacity Hub • Live</span>
          </div>

          {/* Floating UI Cards */}
          <div className="cc-reg-floating-cards">
            {/* Card 1: Meeting Card */}
            <div className="cc-reg-float-card cc-reg-float-card-1">
              <div className="cc-reg-card-header">
                <span className="cc-reg-card-icon">
                  <Icons.Clock />
                </span>
                <span className="cc-reg-card-label">Upcoming Sync</span>
              </div>
              <h4 className="cc-reg-card-title">
                Sprint Architecture & Planning
              </h4>
              <p className="cc-reg-card-sub">
                <Icons.Calendar /> Today, 10:30 AM • Conf Room A
              </p>
            </div>

            {/* Card 2: Task / Productivity Card */}
            <div className="cc-reg-float-card cc-reg-float-card-2">
              <div className="cc-reg-card-header">
                <span className="cc-reg-card-icon">
                  <Icons.TrendingUp />
                </span>
                <span className="cc-reg-card-label">Capacity Utilization</span>
              </div>
              <div className="cc-reg-stat-row">
                <span className="cc-reg-stat-val">94.2%</span>
                <span className="cc-reg-stat-badge">+18.4%</span>
              </div>
              <div className="cc-reg-progress-track">
                <div
                  className="cc-reg-progress-fill"
                  style={{ width: "94.2%" }}
                />
              </div>
            </div>

            {/* Card 3: Calendar / Milestone Card */}
            <div className="cc-reg-float-card cc-reg-float-card-3">
              <div className="cc-reg-card-header">
                <span className="cc-reg-card-icon">
                  <Icons.Calendar />
                </span>
                <span className="cc-reg-card-label">Milestone Active</span>
              </div>
              <h4 className="cc-reg-card-title">SIH Hackathon Phase 1</h4>
              <p className="cc-reg-card-sub">
                All deliverables submitted on track
              </p>
            </div>

            {/* Card 4: Small Avatar Circles */}
            <div className="cc-reg-float-card cc-reg-float-card-4">
              <div className="cc-reg-card-header">
                <span className="cc-reg-card-icon">
                  <Icons.Users />
                </span>
                <span className="cc-reg-card-label">Collaborators</span>
              </div>
              <div className="cc-reg-avatar-cluster">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Avatar"
                  className="cc-reg-avatar-circle"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Avatar"
                  className="cc-reg-avatar-circle"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Avatar"
                  className="cc-reg-avatar-circle"
                />
                <span className="cc-reg-avatar-counter">+12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
