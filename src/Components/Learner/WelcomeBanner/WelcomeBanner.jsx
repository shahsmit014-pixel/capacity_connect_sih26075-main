import { FiArrowRight, FiAward, FiBookOpen, FiTarget } from "react-icons/fi";

import Button from "../../../Reusable_components/Button/Button";

import "./WelcomeBanner.css";

/* =========================================================
   LEARNER WELCOME BANNER
========================================================= */

const WelcomeBanner = ({ name = "Dev", onProfileClick }) => {
  return (
    <section className="welcome-banner" aria-labelledby="welcome-banner-title">
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div className="welcome-banner__background" aria-hidden="true">
        <span className="welcome-banner__glow welcome-banner__glow--one" />
        <span className="welcome-banner__glow welcome-banner__glow--two" />

        <span className="welcome-banner__wave welcome-banner__wave--one" />
        <span className="welcome-banner__wave welcome-banner__wave--two" />
        <span className="welcome-banner__wave welcome-banner__wave--three" />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="welcome-banner__content">
        {/* Eyebrow */}

        <div className="welcome-banner__eyebrow">
          <span className="welcome-banner__eyebrow-dot" />

          <span>YOUR LEARNING JOURNEY</span>
        </div>

        {/* Heading */}

        <h1 id="welcome-banner-title" className="welcome-banner__title">
          Good morning, {name}!{" "}
          <span
            className="welcome-banner__wave-emoji"
            role="img"
            aria-label="waving hand"
          >
            👋
          </span>
        </h1>

        {/* Description */}

        <p className="welcome-banner__description">
          Continue building your skills and achieve your goals.
        </p>

        {/* Quote */}

        <p className="welcome-banner__quote">
          “Small steps today, big opportunities tomorrow.”
        </p>

        {/* Action */}

        <div className="welcome-banner__action">
          <Button
            variant="primary"
            size="sm"
            rounded="full"
            rightIcon={<FiArrowRight />}
            onClick={onProfileClick}
            className="welcome-banner__button"
          >
            View Profile
          </Button>
        </div>
      </div>

      {/* ===================================================
          RIGHT VISUAL
      =================================================== */}

      <div className="welcome-banner__visual" aria-hidden="true">
        {/* Decorative orbit */}

        <div className="welcome-banner__orbit">
          <span className="welcome-banner__orbit-dot" />
        </div>

        {/* Central learning illustration */}

        <div className="welcome-banner__student">
          <div className="welcome-banner__student-head">
            <span />
          </div>

          <div className="welcome-banner__student-body">
            <div className="welcome-banner__laptop">
              <div className="welcome-banner__laptop-screen">
                <FiBookOpen />
              </div>

              <div className="welcome-banner__laptop-base" />
            </div>
          </div>
        </div>

        {/* Floating card — achievement */}

        <div className="welcome-banner__floating-card welcome-banner__floating-card--achievement">
          <div className="welcome-banner__floating-icon">
            <FiAward />
          </div>

          <div className="welcome-banner__floating-text">
            <strong>Keep growing</strong>

            <span>New achievements await</span>
          </div>
        </div>

        {/* Floating card — skills */}

        <div className="welcome-banner__floating-card welcome-banner__floating-card--skills">
          <div className="welcome-banner__floating-icon">
            <FiTarget />
          </div>

          <div className="welcome-banner__floating-text">
            <strong>Build your skills</strong>

            <span>Stay on your learning path</span>
          </div>
        </div>

        {/* Decorative plant */}

        <div className="welcome-banner__plant">
          <span className="welcome-banner__plant-stem" />

          <span className="welcome-banner__leaf welcome-banner__leaf--one" />
          <span className="welcome-banner__leaf welcome-banner__leaf--two" />
          <span className="welcome-banner__leaf welcome-banner__leaf--three" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
