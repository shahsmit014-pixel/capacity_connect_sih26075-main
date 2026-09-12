import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiChevronDown,
  FiCompass,
  FiGlobe,
  FiMenu,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiX,
} from "react-icons/fi";

import Button from "../../Reusable_components/Button/Button";
import Dropdown from "../../Reusable_components/Dropdown/Dropdown";
import SearchBar from "../../Reusable_components/SearchBar/SearchBar";
import ProgressBar from "../../Reusable_components/ProgressBar/ProgressBar";
import Card from "../../Reusable_components/Card/Card";
import Badge from "../../Reusable_components/Badge/Badge";

import backdropImage from "../../assets/Images/landing_backdrop_8.avif";
import learningImage from "../../assets/Images/platform-feature1.jpg";
import standingImage from "../../assets/Images/platform-feature2.jpg";
import knowledgeImage from "../../assets/Images/platform-feature3.jpg";
import progressImage from "../../assets/Images/platform-feature4.webp";
import collaborationImage from "../../assets/Images/platform-feature5.jpg";
import competenciesImage from "../../assets/Images/platform-feature6.jpeg";

import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const howItWorksJourneyRef = useRef(null);
  const howItWorksCardRefs = useRef([]);

  const [mobileJourneyHeight, setMobileJourneyHeight] = useState(0);
  const [mobileNodePositions, setMobileNodePositions] = useState([]);

  useEffect(() => {
    const statsSection = document.querySelector(".impact-audience__stats");

    if (!statsSection) return;

    const counters = statsSection.querySelectorAll(".impact-stat__value");

    let hasAnimated = false;

    const animateCounters = () => {
      if (hasAnimated) return;

      hasAnimated = true;

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);

        const duration = 1600;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth ease-out
          const easedProgress = 1 - Math.pow(1 - progress, 4);

          const currentValue = Math.floor(easedProgress * target);

          counter.textContent = `${currentValue}+`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = `${target}+`;
          }
        };

        requestAnimationFrame(updateCounter);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(statsSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateMobileJourney = () => {
      if (!howItWorksJourneyRef.current) return;

      const journey = howItWorksJourneyRef.current;

      const cards = howItWorksCardRefs.current.filter(Boolean);

      if (cards.length !== 4) return;

      const journeyRect = journey.getBoundingClientRect();

      const positions = cards.map((card) => {
        const cardRect = card.getBoundingClientRect();

        return cardRect.top - journeyRect.top + cardRect.height / 2;
      });

      const firstPosition = positions[0];

      const lastPosition = positions[positions.length - 1];

      const railHeight = lastPosition - firstPosition;

      const normalizedPositions = positions.map(
        (position) => position - firstPosition,
      );

      setMobileJourneyHeight(Math.max(railHeight, 1));

      setMobileNodePositions(normalizedPositions);
    };

    updateMobileJourney();

    const resizeObserver = new ResizeObserver(() => {
      updateMobileJourney();
    });

    if (howItWorksJourneyRef.current) {
      resizeObserver.observe(howItWorksJourneyRef.current);
    }

    howItWorksCardRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    window.addEventListener("resize", updateMobileJourney);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("resize", updateMobileJourney);
    };
  }, []);

  /* =========================================================
     NAVBAR SCROLL STATE
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (query) => {
    const value = String(query ?? "").trim();

    if (!value) return;

    console.log("Capacity Connect search:", value);
  };

  const handlePopularSearch = (value) => {
    setSearchValue(value);
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    // Close the mobile menu first, then scroll to the section.
    setMobileOpen(false);

    requestAnimationFrame(() => {
      const navbar = document.querySelector(".landing__navbar");
      const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;

      const targetTop =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        12;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    });
  };

  const handleAction = (action) => {
    console.log(action);

    setMobileOpen(false);
  };

  /* =========================================================
     EXPLORE DROPDOWN
  ========================================================= */

  const exploreItems = [
    {
      id: "courses",
      label: "Courses",
      value: "courses",
      description: "Explore learning opportunities",
      onClick: () => scrollToSection("features"),
    },
    {
      id: "learning-paths",
      label: "Learning Paths",
      value: "learning-paths",
      description: "Follow structured development journeys",
      onClick: () => scrollToSection("features"),
    },
    {
      id: "competencies",
      label: "Competencies",
      value: "competencies",
      description: "Explore capability areas",
      onClick: () => scrollToSection("features"),
    },
    {
      id: "assessment",
      label: "Skill Assessment",
      value: "assessment",
      description: "Understand your current capabilities",
      onClick: () => scrollToSection("features"),
    },
  ];

  /* =========================================================
     RESOURCE DROPDOWN
  ========================================================= */

  const resourceItems = [
    {
      id: "knowledge-hub",
      label: "Knowledge Hub",
      value: "knowledge-hub",
      description: "Explore knowledge and insights",
      onClick: () => scrollToSection("knowledge-hub"),
    },
    {
      id: "guidelines",
      label: "Guidelines & Policies",
      value: "guidelines",
      description: "Official documents and guidance",
      onClick: () => scrollToSection("knowledge-hub"),
    },
    {
      id: "research",
      label: "Research Resources",
      value: "research",
      description: "Research and technical resources",
      onClick: () => scrollToSection("knowledge-hub"),
    },
  ];

  /* =========================================================
     POPULAR SEARCHES
  ========================================================= */

  const popularSearches = [
    "Data Analysis",
    "Remote Sensing",
    "Ocean Science",
    "Leadership",
    "Project Management",
  ];

  return (
    <main className="landing">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="landing__hero"
        style={{
          "--landing-backdrop": `url("${backdropImage}")`,
        }}
      >
        <div className="landing__hero-image" />
        <div className="landing__hero-overlay" />
        <div className="landing__hero-vignette" />

        {/* ===================================================
            MAIN NAVBAR
        ==================================================== */}

        <header
          className={[
            "landing__header",
            isScrolled ? "landing__header--scrolled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="landing__navbar">
            {/* -------------------------------------------------
                LEFT: BRAND
            -------------------------------------------------- */}

            <a
              href="#top"
              className="landing__brand"
              aria-label="Capacity Connect"
            >
              <span className="landing__brand-logo">
                <span className="landing__brand-wave landing__brand-wave--1" />
                <span className="landing__brand-wave landing__brand-wave--2" />
                <span className="landing__brand-wave landing__brand-wave--3" />
              </span>

              <span className="landing__brand-text">
                <strong>CAPACITY CONNECT</strong>

                <small>LEARN. DEVELOP. GROW.</small>
              </span>
            </a>

            {/* -------------------------------------------------
                CENTER: NAVIGATION
            -------------------------------------------------- */}

            <nav className="landing__nav" aria-label="Primary navigation">
              <div className="landing__nav-dropdown">
                <Dropdown
                  items={exploreItems}
                  placeholder="Explore"
                  appearance="dark"
                  variant="ghost"
                  size="sm"
                  width="300px"
                  placement="bottom-start"
                  offset={10}
                  showArrow
                  menuClassName="landing-navbar-dropdown landing-navbar-dropdown--explore"
                  ariaLabel="Explore"
                />
              </div>

              <button
                type="button"
                className="landing__nav-link"
                onClick={() => scrollToSection("about")}
              >
                About
              </button>

              <div className="landing__nav-dropdown">
                <Dropdown
                  items={resourceItems}
                  placeholder="Resources"
                  appearance="dark"
                  variant="ghost"
                  size="sm"
                  width="300px"
                  placement="bottom-start"
                  offset={10}
                  showArrow
                  menuClassName="landing-navbar-dropdown landing-navbar-dropdown--resources"
                  ariaLabel="Resources"
                />
              </div>

              <button
                type="button"
                className="landing__nav-link"
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
              </button>
            </nav>

            {/* -------------------------------------------------
                RIGHT: ACTIONS
            -------------------------------------------------- */}

            <div className="landing__actions">
              <button
                type="button"
                className="landing__login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <Button
                variant="primary"
                size="sm"
                rounded="full"
                className="landing__signup"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </div>

            {/* -------------------------------------------------
                MOBILE
            -------------------------------------------------- */}

            <button
              type="button"
              className="landing__mobile-button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* =================================================
              MOBILE MENU
          ================================================== */}

          {mobileOpen && (
            <div className="landing__mobile-menu">
              <button type="button" onClick={() => handleAction("Explore")}>
                Explore
                <FiChevronDown />
              </button>

              <button type="button" onClick={() => scrollToSection("about")}>
                About
              </button>

              <button type="button" onClick={() => handleAction("Resources")}>
                Resources
                <FiChevronDown />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
              </button>

              <div className="landing__mobile-actions">
                <Button
                  variant="glass"
                  size="md"
                  rounded="full"
                  fullWidth
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  rounded="full"
                  fullWidth
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* ===================================================
            HERO CONTENT
        ==================================================== */}

        <div className="landing__content">
          {/* Government line */}

          <div className="landing__eyebrow">
            <span className="landing__eyebrow-line" />

            <span>GOVERNMENT OF INDIA</span>

            <b>•</b>

            <span>MINISTRY OF EARTH SCIENCES</span>

            <span className="landing__eyebrow-line" />
          </div>

          {/* Heading */}

          <h1 className="landing__title">
            <span>Empower your skills.</span>

            <span className="landing__title-gradient">
              Shape what comes next.
            </span>
          </h1>

          {/* Description */}

          <p className="landing__description">
            One connected learning ecosystem for building capabilities,
            discovering knowledge
            <br className="landing__description-break" />
            and growing a future-ready workforce.
          </p>

          {/* Search */}

          <div className="landing__search-wrapper">
            <SearchBar
              value={searchValue}
              onChange={(value) => {
                if (typeof value === "string") {
                  setSearchValue(value);
                } else {
                  setSearchValue(value?.target?.value ?? "");
                }
              }}
              onSearch={handleSearch}
              placeholder="Search courses, skills, resources..."
              appearance="glass"
              variant="default"
              size="xl"
              shape="pill"
              fullWidth
              bordered
              shadow={false}
              glow={false}
              animated
              searchOnEnter
            />
          </div>

          {/* Popular searches */}

          <div className="landing__popular">
            <span className="landing__popular-label">POPULAR</span>

            <div className="landing__popular-items">
              {popularSearches.map((item) => (
                <button
                  type="button"
                  className="landing__popular-pill"
                  key={item}
                  onClick={() => handlePopularSearch(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}

          <div className="landing__cta">
            <Button
              variant="primary"
              size="lg"
              rounded="lg"
              rightIcon={<FiArrowRight />}
              className="landing__primary-button"
              onClick={() => scrollToSection("about")}
            >
              Explore Capacity Connect
            </Button>

            <button
              type="button"
              className="landing__how"
              onClick={() => scrollToSection("how-it-works")}
            >
              <span className="landing__play">
                <FiPlay />
              </span>

              <span>See how it works</span>
            </button>
          </div>
        </div>

        {/* ===================================================
            BOTTOM INFORMATION
        ==================================================== */}

        <div className="landing__bottom">
          <div className="landing__bottom-rule" />

          <div className="landing__bottom-columns">
            <div className="landing__bottom-column">
              <strong>LEARN</strong>

              <span>Curated courses &amp; pathways</span>
            </div>

            <div className="landing__bottom-column">
              <strong>DEVELOP</strong>

              <span>Competency-led growth</span>
            </div>

            <div className="landing__bottom-column">
              <strong>GROW</strong>

              <span>A future-ready workforce</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 2 — WHAT IS CAPACITY CONNECT?
          
          IMPORTANT:
          This section is completely redesigned.
          The Hero/Header above remains untouched.
      ====================================================== */}

      <section className="landing__about" id="about">
        {/* ===================================================
            GALAXY / ORBITAL BACKGROUND
        ==================================================== */}

        <div className="capacity-galaxy" aria-hidden="true">
          <div className="capacity-galaxy__glow capacity-galaxy__glow--one" />
          <div className="capacity-galaxy__glow capacity-galaxy__glow--two" />

          <div className="capacity-galaxy__stars">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="capacity-galaxy__orbit capacity-galaxy__orbit--outer" />
          <div className="capacity-galaxy__orbit capacity-galaxy__orbit--middle" />
          <div className="capacity-galaxy__orbit capacity-galaxy__orbit--inner" />
        </div>

        {/* ===================================================
            SECTION CONTAINER
        ==================================================== */}

        <div className="capacity-section">
          {/* =================================================
              INTRODUCTION
          ================================================== */}

          <header className="capacity-intro">
            <div className="capacity-intro__eyebrow">
              <span className="capacity-intro__line" />

              <span>THE CAPACITY CONNECT ECOSYSTEM</span>

              <span className="capacity-intro__line" />
            </div>

            <h2 className="capacity-intro__title">
              What is{" "}
              <span className="capacity-intro__title-highlight">
                Capacity Connect?
              </span>
            </h2>

            <p className="capacity-intro__description">
              Capacity Connect brings learning, capability development and
              future opportunities into one connected ecosystem — helping people
              understand where they are, build what they need and discover where
              they can go next.
            </p>
          </header>

          {/* =================================================
              ECOSYSTEM SYSTEM
              
              This is NOT a normal card grid.
              It is a connected orbital system.
          ================================================== */}

          <div className="capacity-system">
            {/* ------------------------------------------------
                CENTRAL HUB
            ------------------------------------------------- */}

            <div className="capacity-system__hub">
              <div className="capacity-system__hub-orbit" />

              <div className="capacity-system__hub-inner">
                <div className="capacity-system__hub-icon">
                  <FiGlobe />
                </div>

                <span className="capacity-system__hub-label">CAPACITY</span>

                <strong>CONNECT</strong>

                <span className="capacity-system__hub-caption">
                  One connected ecosystem
                </span>
              </div>
            </div>

            {/* ------------------------------------------------
                CONNECTION LINES
            ------------------------------------------------- */}

            <div
              className="capacity-system__connection capacity-system__connection--learn"
              aria-hidden="true"
            >
              <span />
            </div>

            <div
              className="capacity-system__connection capacity-system__connection--develop"
              aria-hidden="true"
            >
              <span />
            </div>

            <div
              className="capacity-system__connection capacity-system__connection--discover"
              aria-hidden="true"
            >
              <span />
            </div>

            {/* =================================================
                LEARN
            ================================================== */}

            <article className="capacity-lane capacity-lane--learn">
              <div className="capacity-lane__index">01</div>

              <div className="capacity-lane__icon">
                <FiBookOpen />
              </div>

              <div className="capacity-lane__content">
                <div className="capacity-lane__eyebrow">LEARN</div>

                <h3>Build knowledge.</h3>

                <p>
                  Discover courses, learning pathways and trusted resources
                  aligned with your development goals.
                </p>

                <div className="capacity-lane__topics">
                  <span>Courses</span>
                  <i />
                  <span>Learning Paths</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  rounded="full"
                  rightIcon={<FiArrowRight />}
                  className="capacity-lane__action"
                  onClick={() => handleAction("Explore learning")}
                >
                  Explore learning
                </Button>
              </div>
            </article>

            {/* =================================================
                DEVELOP
            ================================================== */}

            <article className="capacity-lane capacity-lane--develop">
              <div className="capacity-lane__index">02</div>

              <div className="capacity-lane__icon">
                <FiTarget />
              </div>

              <div className="capacity-lane__content">
                <div className="capacity-lane__eyebrow">DEVELOP</div>

                <h3>Build capability.</h3>

                <p>
                  Understand your strengths, identify gaps and focus on the
                  competencies that create meaningful growth.
                </p>

                <div className="capacity-lane__topics">
                  <span>Competencies</span>
                  <i />
                  <span>Assessment</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  rounded="full"
                  rightIcon={<FiArrowRight />}
                  className="capacity-lane__action"
                  onClick={() => handleAction("Build capability")}
                >
                  Build capability
                </Button>
              </div>
            </article>

            {/* =================================================
                DISCOVER
            ================================================== */}

            <article className="capacity-lane capacity-lane--discover">
              <div className="capacity-lane__index">03</div>

              <div className="capacity-lane__icon">
                <FiCompass />
              </div>

              <div className="capacity-lane__content">
                <div className="capacity-lane__eyebrow">DISCOVER</div>

                <h3>Find what comes next.</h3>

                <p>
                  Explore knowledge, opportunities and development directions
                  that connect learning with future goals.
                </p>

                <div className="capacity-lane__topics">
                  <span>Knowledge</span>
                  <i />
                  <span>Opportunities</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  rounded="full"
                  rightIcon={<FiArrowRight />}
                  className="capacity-lane__action"
                  onClick={() => handleAction("Discover opportunities")}
                >
                  Discover opportunities
                </Button>
              </div>
            </article>
          </div>

          {/* =================================================
              THE JOURNEY
          ================================================== */}

          {/* =================================================
              FINAL STATEMENT
          ================================================== */}

          <div className="capacity-statement">
            <div className="capacity-statement__line" />

            <div className="capacity-statement__content">
              <span className="capacity-statement__small">
                EVERYTHING CONNECTS
              </span>

              <h3>
                Learn.
                <span> Develop.</span>
                <span> Discover.</span>
                <strong> Grow.</strong>
              </h3>

              <p>
                One ecosystem. One journey. A clearer path from knowledge to
                capability and opportunity.
              </p>
            </div>

            <div className="capacity-statement__line" />
          </div>
        </div>
      </section>

      {/* ================================================================
    SECTION 3 — PLATFORM FEATURES
    ================================================================ */}

      <section className="landing__features" id="features">
        <div className="platform-features">
          {/* ============================================================
        INTRO
        ============================================================ */}

          <header className="platform-features__intro">
            <div className="platform-features__eyebrow">
              <span className="platform-features__eyebrow-line" />
              <span>PLATFORM FEATURES</span>
              <span className="platform-features__eyebrow-line" />
            </div>

            <h2 className="platform-features__title">
              Everything you need to grow
              <br />
              <span>with purpose.</span>
            </h2>

            <p className="platform-features__description">
              Learn, assess, discover and develop through one connected platform
              designed to turn knowledge into capability.
            </p>
          </header>

          {/* ============================================================
        FEATURE JOURNEY
        ============================================================ */}

          <div className="platform-features__journey">
            {/* ==========================================================
          CONTINUOUS SVG WAVE
          ========================================================== */}

            <svg
              className="platform-features__wave"
              viewBox="0 0 1000 1700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="capacityFeatureWave"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4A8DFF" />
                  <stop offset="28%" stopColor="#27B9F4" />
                  <stop offset="52%" stopColor="#20D5D0" />
                  <stop offset="74%" stopColor="#2698F5" />
                  <stop offset="100%" stopColor="#315FE8" />
                </linearGradient>

                <filter
                  id="capacityFeatureGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="10" result="blur" />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Soft glow behind the main ribbon */}

              <path
                className="platform-features__wave-glow"
                d="
            M 500 55
            C 645 115, 735 165, 585 270
            C 420 385, 385 420, 555 510
            C 710 592, 735 650, 565 760
            C 405 865, 390 920, 550 1010
            C 710 1100, 735 1160, 565 1270
            C 420 1365, 405 1440, 500 1515
            C 555 1555, 580 1590, 600 1645
          "
              />

              {/* Main S-shaped ribbon */}

              <path
                className="platform-features__wave-main"
                d="
            M 500 55
            C 645 115, 735 165, 585 270
            C 420 385, 385 420, 555 510
            C 710 592, 735 650, 565 760
            C 405 865, 390 920, 550 1010
            C 710 1100, 735 1160, 565 1270
            C 420 1365, 405 1440, 500 1515
            C 555 1555, 580 1590, 600 1645
          "
              />
            </svg>

            {/* ==========================================================
          STEP 01 — LEARNING
          ========================================================== */}

            <article className="platform-feature platform-feature--left">
              <div className="platform-feature__content">
                <div className="platform-feature__number">01</div>

                <div className="platform-feature__icon">
                  <FiBookOpen />
                </div>

                <div className="platform-feature__copy">
                  <span className="platform-feature__category">LEARNING</span>

                  <h3>Learn with direction.</h3>

                  <p>
                    Discover curated courses and structured learning paths
                    aligned with your goals and development needs.
                  </p>

                  <div className="platform-feature__tags">
                    <span>Courses</span>
                    <span>Learning Paths</span>
                    <span>Curated Content</span>
                  </div>

                  <button type="button" className="platform-feature__link">
                    Explore learning
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="platform-feature__visual platform-feature__visual--ship">
                <img src={learningImage} alt="Research vessel" />
              </div>

              <div className="platform-feature__annotation">
                <span className="platform-feature__annotation-line" />
                <span>
                  EXPLORE
                  <br />
                  LEARN
                  <br />
                  BUILD
                </span>
              </div>
            </article>

            {/* ==========================================================
          STEP 02 — ASSESSMENT
          ========================================================== */}

            <article className="platform-feature platform-feature--right">
              <div className="platform-feature__visual platform-feature__visual--ocean">
                {/* Add image path later */}

                <img src={standingImage} alt="Research vessel" />
              </div>

              <div className="platform-feature__content">
                <div className="platform-feature__number">02</div>

                <div className="platform-feature__icon">
                  <FiTarget />
                </div>

                <div className="platform-feature__copy">
                  <span className="platform-feature__category">ASSESSMENT</span>

                  <h3>Know where you stand.</h3>

                  <p>
                    Assess your current capabilities, identify skill gaps and
                    understand where to focus for meaningful growth.
                  </p>

                  <div className="platform-feature__tags">
                    <span>Skill Assessment</span>
                    <span>Gap Analysis</span>
                    <span>Self Evaluation</span>
                  </div>

                  <button type="button" className="platform-feature__link">
                    Assess capabilities
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="platform-feature__annotation platform-feature__annotation--left">
                <span>
                  DEEPER
                  <br />
                  KNOWLEDGE
                  <br />
                  BRIGHTER
                  <br />
                  OCEANS
                </span>

                <span className="platform-feature__annotation-line" />
              </div>
            </article>

            {/* ==========================================================
          STEP 03 — KNOWLEDGE
          ========================================================== */}

            <article className="platform-feature platform-feature--left">
              <div className="platform-feature__content">
                <div className="platform-feature__number">03</div>

                <div className="platform-feature__icon">
                  <FiGlobe />
                </div>

                <div className="platform-feature__copy">
                  <span className="platform-feature__category">KNOWLEDGE</span>

                  <h3>Discover trusted knowledge.</h3>

                  <p>
                    Access research, guidelines, policies and resources from
                    trusted sources in the field of Earth and Ocean Sciences.
                  </p>

                  <div className="platform-feature__tags">
                    <span>Knowledge Hub</span>
                    <span>Research</span>
                    <span>Resources</span>
                  </div>

                  <button type="button" className="platform-feature__link">
                    Explore knowledge
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="platform-feature__visual platform-feature__visual--satellite">
                {/* Add image path later */}

                <img src={knowledgeImage} alt="Research vessel" />
              </div>

              <div className="platform-feature__annotation">
                <span className="platform-feature__annotation-line" />

                <span>
                  DATA
                  <br />
                  INSIGHTS
                  <br />
                  SOLUTIONS
                </span>
              </div>
            </article>

            {/* ==========================================================
          STEP 04 — PROGRESS
          ========================================================== */}

            <article className="platform-feature platform-feature--right">
              <div className="platform-feature__visual platform-feature__visual--ice">
                {/* Add image path later */}

                <img src={progressImage} alt="Research vessel" />
              </div>

              <div className="platform-feature__content">
                <div className="platform-feature__number">04</div>

                <div className="platform-feature__icon">
                  <FiTrendingUp />
                </div>

                <div className="platform-feature__copy">
                  <span className="platform-feature__category">PROGRESS</span>

                  <h3>See your growth clearly.</h3>

                  <p>
                    Track your learning activity, completed goals and capability
                    growth through a clear view of your journey.
                  </p>

                  <div className="platform-feature__tags">
                    <span>Learning Progress</span>
                    <span>Goals</span>
                    <span>Development Journey</span>
                  </div>

                  <button type="button" className="platform-feature__link">
                    View progress
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="platform-feature__annotation platform-feature__annotation--left">
                <span>
                  OUR PLANET
                  <br />
                  OUR
                  <br />
                  RESPONSIBILITY
                </span>

                <span className="platform-feature__annotation-line" />
              </div>
            </article>

            {/* ==========================================================
          STEP 05 — COLLABORATION
          ========================================================== */}

            <article className="platform-feature platform-feature--left">
              <div className="platform-feature__content">
                <div className="platform-feature__number">05</div>

                <div className="platform-feature__icon">
                  <FiUsers />
                </div>

                <div className="platform-feature__copy">
                  <span className="platform-feature__category">
                    COLLABORATION
                  </span>

                  <h3>Grow together.</h3>

                  <p>
                    Connect with peers, trainers and experts to share knowledge,
                    collaborate on projects and learn collectively.
                  </p>

                  <div className="platform-feature__tags">
                    <span>Peers</span>
                    <span>Trainers</span>
                    <span>Knowledge Sharing</span>
                  </div>

                  <button type="button" className="platform-feature__link">
                    Connect &amp; collaborate
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="platform-feature__visual platform-feature__visual--crew">
                {/* Add image path later */}

                <img src={collaborationImage} alt="Research vessel" />
              </div>

              <div className="platform-feature__annotation">
                <span className="platform-feature__annotation-line" />

                <span>
                  PEOPLE
                  <br />
                  IDEAS
                  <br />
                  IMPACT
                </span>
              </div>
            </article>

            {/* ==========================================================
          STEP 06 — COMPETENCIES
          ========================================================== */}

            <article className="platform-feature platform-feature--right">
              <div className="platform-feature__visual platform-feature__visual--lighthouse">
                {/* Add image path later */}

                <img src={competenciesImage} alt="Research vessel" />
              </div>

              <div className="platform-feature__content">
                <div className="platform-feature__number">06</div>

                <div className="platform-feature__icon">
                  <FiAward />
                </div>

                <div className="platform-feature__copy">
                  <span className="platform-feature__category">
                    COMPETENCIES
                  </span>

                  <h3>Build what matters.</h3>

                  <p>
                    Understand the competencies required for your role or goals
                    and focus development where it creates real impact.
                  </p>

                  <div className="platform-feature__tags">
                    <span>Competency Framework</span>
                    <span>Skill Gaps</span>
                    <span>Capability Building</span>
                  </div>

                  <button type="button" className="platform-feature__link">
                    Explore competencies
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              <div className="platform-feature__annotation platform-feature__annotation--left">
                <span>
                  SKILLS
                  <br />
                  PEOPLE
                  <br />
                  A SAFER
                  <br />
                  TOMORROW
                </span>

                <span className="platform-feature__annotation-line" />
              </div>
            </article>
          </div>

          {/* ============================================================
        DEVELOPMENT JOURNEY
        ============================================================ */}

          <div className="platform-development">
            <div className="platform-development__heading">
              <span />
              <p>YOUR DEVELOPMENT JOURNEY</p>
              <span />
            </div>

            <div className="platform-development__flow">
              <div className="platform-development__step">
                <div className="platform-development__icon">
                  <FiBookOpen />
                </div>

                <strong>LEARN</strong>

                <span>Knowledge</span>
              </div>

              <div className="platform-development__arrow">→</div>

              <div className="platform-development__step">
                <div className="platform-development__icon">
                  <FiTarget />
                </div>

                <strong>ASSESS</strong>

                <span>Insights</span>
              </div>

              <div className="platform-development__arrow">→</div>

              <div className="platform-development__step">
                <div className="platform-development__icon">
                  <FiTrendingUp />
                </div>

                <strong>DEVELOP</strong>

                <span>Capabilities</span>
              </div>

              <div className="platform-development__arrow">→</div>

              <div className="platform-development__step">
                <div className="platform-development__icon">
                  <FiAward />
                </div>

                <strong>GROW</strong>

                <span>Impact</span>
              </div>
            </div>

            <div className="platform-development__closing">
              From knowledge to a safer tomorrow.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
    SECTION 4 — HOW IT WORKS
========================================================= */}

      <section className="how-it-works" id="how-it-works">
        {/* ---------- SECTION INTRO ---------- */}

        <div className="how-it-works__intro">
          <span className="how-it-works__eyebrow">HOW IT WORKS</span>

          <h2>
            Your Journey Through <span>Capacity Connect</span>
          </h2>

          <p>
            From understanding where you are to building the capabilities that
            take you where you want to go.
          </p>

          <div className="how-it-works__accent" />
        </div>

        {/* ---------- JOURNEY ---------- */}

        <div className="how-it-works__journey" ref={howItWorksJourneyRef}>
          {/* Background atmospheric elements */}

          <div className="how-it-works__orb how-it-works__orb--one" />
          <div className="how-it-works__orb how-it-works__orb--two" />

          {/* ---------- PROGRESS TRACK ---------- */}

          <div
            className="how-it-works__progress-wrapper"
            style={{
              "--mobile-journey-height":
                mobileJourneyHeight > 0
                  ? `${mobileJourneyHeight}px`
                  : undefined,
            }}
          >
            <ProgressBar
              value={100}
              max={100}
              variant="primary"
              appearance="gradient"
              size="md"
              radius="pill"
              animated={true}
              glow={true}
              gradient="linear-gradient(90deg, #0b8fe7 0%, #28d5eb 52%, #16c7a7 100%)"
              className="how-it-works__progress"
              ariaLabel="Capacity Connect development journey"
            />

            {/* Numbered nodes positioned over ProgressBar */}

            <div
              className="how-it-works__nodes"
              style={{
                "--node-01":
                  mobileNodePositions[0] !== undefined
                    ? `${mobileNodePositions[0]}px`
                    : undefined,

                "--node-02":
                  mobileNodePositions[1] !== undefined
                    ? `${mobileNodePositions[1]}px`
                    : undefined,

                "--node-03":
                  mobileNodePositions[2] !== undefined
                    ? `${mobileNodePositions[2]}px`
                    : undefined,

                "--node-04":
                  mobileNodePositions[3] !== undefined
                    ? `${mobileNodePositions[3]}px`
                    : undefined,
              }}
            >
              <div className="how-it-works__node how-it-works__node--active">
                <span className="how-it-works__node-number">01</span>

                <span className="how-it-works__node-icon">
                  <FiTarget />
                </span>
              </div>

              <div className="how-it-works__node how-it-works__node--active">
                <span className="how-it-works__node-number">02</span>

                <span className="how-it-works__node-icon">
                  <FiCompass />
                </span>
              </div>

              <div className="how-it-works__node how-it-works__node--active">
                <span className="how-it-works__node-number">03</span>

                <span className="how-it-works__node-icon">
                  <FiBookOpen />
                </span>
              </div>

              <div className="how-it-works__node how-it-works__node--active">
                <span className="how-it-works__node-number">04</span>

                <span className="how-it-works__node-icon">
                  <FiTrendingUp />
                </span>
              </div>
            </div>
          </div>

          {/* ---------- STAGE LABELS ---------- */}

          <div className="how-it-works__stage-labels">
            <div className="how-it-works__stage-label">
              <span>01</span>
              <strong>CREATE</strong>
            </div>

            <div className="how-it-works__stage-label">
              <span>02</span>
              <strong>DISCOVER</strong>
            </div>

            <div className="how-it-works__stage-label">
              <span>03</span>
              <strong>LEARN</strong>
            </div>

            <div className="how-it-works__stage-label">
              <span>04</span>
              <strong>GROW</strong>
            </div>
          </div>

          {/* ---------- JOURNEY CARDS ---------- */}

          <div className="how-it-works__cards">
            {/* ================= CREATE ================= */}

            <article
              ref={(element) => {
                howItWorksCardRefs.current[0] = element;
              }}
              className="how-it-works__card how-it-works__card--create"
            >
              <div className="how-it-works__card-top">
                <div className="how-it-works__card-icon">
                  <FiTarget />
                </div>

                <span className="how-it-works__card-index">01</span>
              </div>

              <div className="how-it-works__card-content">
                <span className="how-it-works__card-kicker">CREATE</span>

                <h3>Start with you.</h3>

                <p>
                  Create your profile and tell Capacity Connect about your role,
                  interests and development goals.
                </p>
              </div>

              <div className="how-it-works__card-tags">
                <span>Role</span>

                <span>Interests</span>

                <span>Goals</span>
              </div>

              <button type="button" className="how-it-works__card-action">
                <span>Create your profile</span>
                <FiArrowRight />
              </button>
            </article>

            {/* ================= DISCOVER ================= */}

            <article
              ref={(element) => {
                howItWorksCardRefs.current[1] = element;
              }}
              className="how-it-works__card how-it-works__card--discover"
            >
              <div className="how-it-works__card-top">
                <div className="how-it-works__card-icon">
                  <FiCompass />
                </div>

                <span className="how-it-works__card-index">02</span>
              </div>

              <div className="how-it-works__card-content">
                <span className="how-it-works__card-kicker">DISCOVER</span>

                <h3>Find what fits you.</h3>

                <p>
                  Explore courses, knowledge resources and opportunities aligned
                  with your interests, role and goals.
                </p>
              </div>

              <div className="how-it-works__card-tags">
                <span>Courses</span>

                <span>Knowledge</span>

                <span>Opportunities</span>
              </div>

              <button type="button" className="how-it-works__card-action">
                <span>Explore opportunities</span>
                <FiArrowRight />
              </button>
            </article>

            {/* ================= LEARN ================= */}

            <article
              ref={(element) => {
                howItWorksCardRefs.current[2] = element;
              }}
              className="how-it-works__card how-it-works__card--learn"
            >
              <div className="how-it-works__card-top">
                <div className="how-it-works__card-icon">
                  <FiBookOpen />
                </div>

                <span className="how-it-works__card-index">03</span>
              </div>

              <div className="how-it-works__card-content">
                <span className="how-it-works__card-kicker">LEARN</span>

                <h3>Build real capability.</h3>

                <p>
                  Follow structured learning pathways, develop relevant skills
                  and turn knowledge into practical capability.
                </p>
              </div>

              <div className="how-it-works__card-tags">
                <span>Learning Paths</span>

                <span>Skills</span>

                <span>Practice</span>
              </div>

              <button type="button" className="how-it-works__card-action">
                <span>Start learning</span>
                <FiArrowRight />
              </button>
            </article>

            {/* ================= GROW ================= */}

            <article
              ref={(element) => {
                howItWorksCardRefs.current[3] = element;
              }}
              className="how-it-works__card how-it-works__card--grow"
            >
              <div className="how-it-works__card-top">
                <div className="how-it-works__card-icon">
                  <FiTrendingUp />
                </div>

                <span className="how-it-works__card-index">04</span>
              </div>

              <div className="how-it-works__card-content">
                <span className="how-it-works__card-kicker">GROW</span>

                <h3>See your progress.</h3>

                <p>
                  Track your learning, competencies and development journey as
                  you build toward future opportunities.
                </p>
              </div>

              <div className="how-it-works__card-tags">
                <span>Progress</span>

                <span>Competencies</span>

                <span>Goals</span>
              </div>

              <button type="button" className="how-it-works__card-action">
                <span>View your growth</span>
                <FiArrowRight />
              </button>
            </article>
          </div>
        </div>

        {/* ---------- CONTINUOUS DEVELOPMENT ---------- */}

        <div className="how-it-works__continuation">
          <div className="how-it-works__continuation-heading">
            <span />

            <p>CONTINUOUS DEVELOPMENT</p>

            <span />
          </div>

          <div className="how-it-works__continuation-track">
            <div className="how-it-works__continuation-item">
              <div className="how-it-works__continuation-icon">
                <FiBookOpen />
              </div>

              <strong>Learn</strong>
            </div>

            <FiArrowRight className="how-it-works__continuation-arrow" />

            <div className="how-it-works__continuation-item">
              <div className="how-it-works__continuation-icon">
                <FiTarget />
              </div>

              <strong>Build</strong>
            </div>

            <FiArrowRight className="how-it-works__continuation-arrow" />

            <div className="how-it-works__continuation-item">
              <div className="how-it-works__continuation-icon">
                <FiTrendingUp />
              </div>

              <strong>Measure</strong>
            </div>

            <FiArrowRight className="how-it-works__continuation-arrow" />

            <div className="how-it-works__continuation-item">
              <div className="how-it-works__continuation-icon">
                <FiCompass />
              </div>

              <strong>Improve</strong>
            </div>

            <FiArrowRight className="how-it-works__continuation-arrow" />

            <div className="how-it-works__continuation-item">
              <div className="how-it-works__continuation-icon">
                <FiTrendingUp />
              </div>

              <strong>Grow</strong>
            </div>
          </div>

          <div className="how-it-works__closing">
            <span className="how-it-works__closing-line" />

            <div>
              <h3>Your journey doesn't end here.</h3>

              <p>Learn. Build. Measure. Improve. Grow.</p>
            </div>

            <span className="how-it-works__closing-line" />
          </div>
        </div>
      </section>

      {/* =========================================================
    SECTION 5 — IMPACT / WHO IS IT FOR
========================================================= */}

      <section className="impact-audience" id="who-is-it-for">
        {/* =======================================================
      IMPACT / STATS
  ======================================================= */}

        <div className="impact-audience__intro">
          <span className="impact-audience__eyebrow">IMPACT / STATS</span>

          <h2>
            Connected <span>Impact</span>
          </h2>

          <p>
            Measuring the reach of connected development across people, learning
            and organizations.
          </p>

          <div className="impact-audience__accent" />
        </div>

        <div className="impact-audience__stats">
          {/* STAT 01 */}
          <div className="impact-stat impact-stat--blue">
            <div className="impact-stat__top">
              <span className="impact-stat__index">01</span>

              <div className="impact-stat__icon">
                <FiUsers />
              </div>
            </div>

            <strong className="impact-stat__value" data-target="50">
              0+
            </strong>

            <span className="impact-stat__label">Trainers</span>

            <span className="impact-stat__description">
              Guiding learners through capability development
            </span>
          </div>

          {/* STAT 02 */}
          <div className="impact-stat impact-stat--indigo">
            <div className="impact-stat__top">
              <span className="impact-stat__index">02</span>

              <div className="impact-stat__icon">
                <FiBookOpen />
              </div>
            </div>

            <strong className="impact-stat__value" data-target="100">
              0+
            </strong>

            <span className="impact-stat__label">Learning Resources</span>

            <span className="impact-stat__description">
              Resources supporting continuous learning
            </span>
          </div>

          {/* STAT 03 */}
          <div className="impact-stat impact-stat--teal">
            <div className="impact-stat__top">
              <span className="impact-stat__index">03</span>

              <div className="impact-stat__icon">
                <FiTarget />
              </div>
            </div>

            <strong className="impact-stat__value" data-target="25">
              0+
            </strong>

            <span className="impact-stat__label">Skill Domains</span>

            <span className="impact-stat__description">
              Capability areas connected to real development
            </span>
          </div>

          {/* STAT 04 */}
          <div className="impact-stat impact-stat--green">
            <div className="impact-stat__top">
              <span className="impact-stat__index">04</span>

              <div className="impact-stat__icon">
                <FiAward />
              </div>
            </div>

            <strong className="impact-stat__value" data-target="10">
              0+
            </strong>

            <span className="impact-stat__label">Partner Organizations</span>

            <span className="impact-stat__description">
              Organizations building stronger capabilities
            </span>
          </div>
        </div>

        {/* =======================================================
      CONNECTED IMPACT DIVIDER
  ======================================================= */}

        <div className="impact-audience__bridge">
          <span className="impact-audience__bridge-line" />

          <div className="impact-audience__bridge-core">
            <span />
            <p>CONNECTED IMPACT</p>
            <span />
          </div>

          <span className="impact-audience__bridge-line" />
        </div>

        {/* =======================================================
      WHO IS IT FOR
  ======================================================= */}

        <div className="impact-audience__audience-intro">
          <span className="impact-audience__eyebrow">WHO IS IT FOR?</span>

          <h2>
            Built around the
            <span> capability ecosystem</span>
          </h2>

          <p>
            Capacity Connect brings employees, trainers and organizations into
            one connected development journey.
          </p>
        </div>

        {/* =======================================================
      AUDIENCE ECOSYSTEMS
  ======================================================= */}

        <div className="audience-ecosystems">
          {/* =====================================================
        EMPLOYEES
    ===================================================== */}

          <article className="audience-ecosystem audience-ecosystem--employees">
            <div className="audience-ecosystem__heading">
              <span className="audience-ecosystem__number">01</span>

              <span className="audience-ecosystem__heading-line" />

              <span className="audience-ecosystem__role">EMPLOYEES</span>
            </div>

            <div className="audience-map">
              {/* TOP NODE */}
              <div className="audience-node audience-node--top">
                <FiCompass />

                <span>DISCOVER</span>

                <small>Learning Paths</small>
              </div>

              {/* LEFT NODE */}
              <div className="audience-node audience-node--left">
                <FiTrendingUp />

                <span>SKILLS</span>

                <small>Build Capability</small>
              </div>

              {/* CENTRAL ENTITY */}
              <div className="audience-center">
                <div className="audience-center__halo" />

                <div className="audience-center__orb">
                  <FiUsers />
                </div>

                <strong>EMPLOYEES</strong>

                <span>Learn · Build · Grow</span>
              </div>

              {/* RIGHT NODE */}
              <div className="audience-node audience-node--right">
                <FiTarget />

                <span>GOALS</span>

                <small>Define Direction</small>
              </div>

              {/* BOTTOM NODE */}
              <div className="audience-node audience-node--bottom">
                <FiBarChart2 />

                <span>PROGRESS</span>

                <small>Track Growth</small>
              </div>

              {/* CONNECTIONS */}
              <span className="audience-connector audience-connector--top" />
              <span className="audience-connector audience-connector--left" />
              <span className="audience-connector audience-connector--right" />
              <span className="audience-connector audience-connector--bottom" />
            </div>

            <div className="audience-ecosystem__footer">
              <span>DISCOVER</span>

              <span>→</span>

              <span>LEARN</span>

              <span>→</span>

              <span>BUILD</span>

              <span>→</span>

              <span>PROGRESS</span>
            </div>
          </article>

          {/* =====================================================
        TRAINERS
    ===================================================== */}

          <article className="audience-ecosystem audience-ecosystem--trainers">
            <div className="audience-ecosystem__heading">
              <span className="audience-ecosystem__number">02</span>

              <span className="audience-ecosystem__heading-line" />

              <span className="audience-ecosystem__role">TRAINERS</span>
            </div>

            <div className="audience-map">
              {/* TOP NODE */}
              <div className="audience-node audience-node--top">
                <FiBookOpen />

                <span>CREATE</span>

                <small>Learning Content</small>
              </div>

              {/* LEFT NODE */}
              <div className="audience-node audience-node--left">
                <FiCompass />

                <span>CURATE</span>

                <small>Learning Paths</small>
              </div>

              {/* CENTRAL ENTITY */}
              <div className="audience-center">
                <div className="audience-center__halo" />

                <div className="audience-center__orb">
                  <FiBookOpen />
                </div>

                <strong>TRAINERS</strong>

                <span>Create · Guide · Assess</span>
              </div>

              {/* RIGHT NODE */}
              <div className="audience-node audience-node--right">
                <FiTarget />

                <span>ASSESS</span>

                <small>Measure Skills</small>
              </div>

              {/* BOTTOM NODE */}
              <div className="audience-node audience-node--bottom">
                <FiUsers />

                <span>GUIDE</span>

                <small>Support Learners</small>
              </div>

              {/* CONNECTIONS */}
              <span className="audience-connector audience-connector--top" />
              <span className="audience-connector audience-connector--left" />
              <span className="audience-connector audience-connector--right" />
              <span className="audience-connector audience-connector--bottom" />
            </div>

            <div className="audience-ecosystem__footer">
              <span>CREATE</span>

              <span>→</span>

              <span>CURATE</span>

              <span>→</span>

              <span>GUIDE</span>

              <span>→</span>

              <span>ASSESS</span>
            </div>
          </article>

          {/* =====================================================
        ORGANIZATIONS
    ===================================================== */}

          <article className="audience-ecosystem audience-ecosystem--organizations">
            <div className="audience-ecosystem__heading">
              <span className="audience-ecosystem__number">03</span>

              <span className="audience-ecosystem__heading-line" />

              <span className="audience-ecosystem__role">ORGANIZATIONS</span>
            </div>

            <div className="audience-map">
              {/* TOP NODE */}
              <div className="audience-node audience-node--top">
                <FiUsers />

                <span>ENABLE</span>

                <small>Workforce</small>
              </div>

              {/* LEFT NODE */}
              <div className="audience-node audience-node--left">
                <FiTrendingUp />

                <span>DEVELOP</span>

                <small>Talent</small>
              </div>

              {/* CENTRAL ENTITY */}
              <div className="audience-center">
                <div className="audience-center__halo" />

                <div className="audience-center__orb">
                  <FiAward />
                </div>

                <strong>ORGANIZATIONS</strong>

                <span>Enable · Develop · Grow</span>
              </div>

              {/* RIGHT NODE */}
              <div className="audience-node audience-node--right">
                <FiBarChart2 />

                <span>MEASURE</span>

                <small>Capability Impact</small>
              </div>

              {/* BOTTOM NODE */}
              <div className="audience-node audience-node--bottom">
                <FiTrendingUp />

                <span>GROW</span>

                <small>Build Capacity</small>
              </div>

              {/* CONNECTIONS */}
              <span className="audience-connector audience-connector--top" />
              <span className="audience-connector audience-connector--left" />
              <span className="audience-connector audience-connector--right" />
              <span className="audience-connector audience-connector--bottom" />
            </div>

            <div className="audience-ecosystem__footer">
              <span>ENABLE</span>

              <span>→</span>

              <span>DEVELOP</span>

              <span>→</span>

              <span>MEASURE</span>

              <span>→</span>

              <span>GROW</span>
            </div>
          </article>
        </div>

        {/* =======================================================
      CONNECTED ECOSYSTEM
  ======================================================= */}

        <div className="audience-connected">
          <div className="audience-connected__line" />

          <div className="audience-connected__content">
            <div className="audience-connected__item audience-connected__item--employee">
              <span className="audience-connected__dot" />
              <strong>EMPLOYEES</strong>
            </div>

            <span className="audience-connected__arrow">→</span>

            <div className="audience-connected__item audience-connected__item--trainer">
              <span className="audience-connected__dot" />
              <strong>TRAINERS</strong>
            </div>

            <span className="audience-connected__arrow">→</span>

            <div className="audience-connected__item audience-connected__item--organization">
              <span className="audience-connected__dot" />
              <strong>ORGANIZATIONS</strong>
            </div>
          </div>

          <p>ONE CONNECTED ECOSYSTEM</p>
        </div>
      </section>

      {/* ================================================================
    SECTION 6 — KNOWLEDGE HUB + FINAL CTA
    ================================================================ */}

      {/* ================================================================
    SECTION 6 — KNOWLEDGE HUB + FINAL CTA
    ================================================================ */}

      <section className="cc-kh" id="knowledge-hub">
        {/* ================================================================
      BACKGROUND ATMOSPHERE
      ================================================================ */}

        <div
          className="cc-kh__atmosphere cc-kh__atmosphere--blue"
          aria-hidden="true"
        />

        <div
          className="cc-kh__atmosphere cc-kh__atmosphere--violet"
          aria-hidden="true"
        />

        <div
          className="cc-kh__atmosphere cc-kh__atmosphere--green"
          aria-hidden="true"
        />

        {/* ================================================================
      INTRO
      ================================================================ */}

        <header className="cc-kh__intro">
          <div className="cc-kh__eyebrow">
            <span className="cc-kh__eyebrow-line" />
            <span>KNOWLEDGE HUB</span>
            <span className="cc-kh__eyebrow-line" />
          </div>

          <h2 className="cc-kh__title">
            Explore knowledge.
            <br />
            <span>Build capability.</span>
          </h2>

          <p className="cc-kh__description">
            Explore the knowledge behind better capability through connected
            guidelines, resources and technical content.
          </p>
        </header>

        {/* ================================================================
      KNOWLEDGE CONSTELLATION
      ================================================================ */}

        <div className="cc-kh__constellation">
          {/* ---------------------------------------------------------------
        ORBITAL FIELD
        --------------------------------------------------------------- */}

          <div
            className="cc-kh__field-ring cc-kh__field-ring--outer"
            aria-hidden="true"
          />

          <div
            className="cc-kh__field-ring cc-kh__field-ring--inner"
            aria-hidden="true"
          />

          {/* ---------------------------------------------------------------
        CONNECTION LINES
        --------------------------------------------------------------- */}

          <span
            className="cc-kh__connection cc-kh__connection--guidelines"
            aria-hidden="true"
          />

          <span
            className="cc-kh__connection cc-kh__connection--resources"
            aria-hidden="true"
          />

          <span
            className="cc-kh__connection cc-kh__connection--technical"
            aria-hidden="true"
          />

          {/* ===============================================================
        GUIDELINES
        =============================================================== */}

          <article className="cc-kh-node cc-kh-node--guidelines">
            <span className="cc-kh-node__signal" aria-hidden="true" />

            <Card
              variant="default"
              size="lg"
              rounded="xl"
              hover={true}
              className="cc-kh-card cc-kh-card--guidelines"
              icon={<FiBookOpen />}
              badge="01"
              badgeVariant="primary"
              title="Policies & Standards"
              description="Explore policies, standards and best practices that shape effective capability development."
              meta={
                <span>
                  Policies&nbsp; • &nbsp;Standards&nbsp; • &nbsp;Practices
                </span>
              }
              onAction={() => handleAction("Explore Guidelines")}
              actionText="Explore guidelines"
              actionIcon={<FiArrowRight />}
            />

            <Badge
              variant="neutral"
              appearance="solid"
              size="sm"
              shape="pill"
              showIcon={false}
              className="cc-kh-node__caption-badge cc-kh-node__caption-badge--blue"
            >
              FOUNDATION
            </Badge>
          </article>

          {/* ===============================================================
        RESOURCES
        =============================================================== */}

          <article className="cc-kh-node cc-kh-node--resources">
            <span className="cc-kh-node__signal" aria-hidden="true" />

            <Card
              variant="info"
              size="lg"
              rounded="xl"
              hover={true}
              className="cc-kh-card cc-kh-card--resources"
              icon={<FiBookOpen />}
              badge="02"
              badgeVariant="info"
              title="Learning Materials"
              description="Browse curated documents, learning materials and trusted resources designed for continuous growth."
              meta={
                <span>
                  Documents&nbsp; • &nbsp;Learning&nbsp; • &nbsp;Resources
                </span>
              }
              onAction={() => handleAction("Browse Resources")}
              actionText="Browse resources"
              actionIcon={<FiArrowRight />}
            />

            <Badge
              variant="neutral"
              appearance="solid"
              size="sm"
              shape="pill"
              showIcon={false}
              className="cc-kh-node__caption-badge cc-kh-node__caption-badge--violet"
            >
              DISCOVERY
            </Badge>
          </article>

          {/* ===============================================================
        KNOWLEDGE CORE
        =============================================================== */}

          <div className="cc-kh-core">
            <div className="cc-kh-core__halo" aria-hidden="true" />

            <div
              className="cc-kh-core__orbit cc-kh-core__orbit--one"
              aria-hidden="true"
            />

            <div
              className="cc-kh-core__orbit cc-kh-core__orbit--two"
              aria-hidden="true"
            />

            <div className="cc-kh-core__orb">
              <FiCompass />
            </div>

            <span className="cc-kh-core__label">KNOWLEDGE CORE</span>

            <span className="cc-kh-core__subtext">
              Connect · Understand · Apply
            </span>
          </div>

          {/* ===============================================================
        TECHNICAL CONTENT

        IMPORTANT:
        This is intentionally positioned BELOW the Knowledge Core.
        It no longer sits underneath / behind the circle.
        =============================================================== */}

          <article className="cc-kh-node cc-kh-node--technical">
            <span className="cc-kh-node__signal" aria-hidden="true" />

            <Card
              variant="info"
              size="lg"
              rounded="xl"
              hover={true}
              className="cc-kh-card cc-kh-card--technical"
              icon={<FiGlobe />}
              badge="03"
              badgeVariant="info"
              title="Domain Knowledge"
              description="Discover technical and domain-specific knowledge that strengthens practical capability."
              meta={
                <span>
                  Technical&nbsp; • &nbsp;Domain&nbsp; • &nbsp;Capability
                </span>
              }
              onAction={() => handleAction("Explore Technical Content")}
              actionText="Explore technical content"
              actionIcon={<FiArrowRight />}
            />

            <Badge
              variant="neutral"
              appearance="solid"
              size="sm"
              shape="pill"
              showIcon={false}
              className="cc-kh-node__caption-badge cc-kh-node__caption-badge--green"
            >
              APPLICATION
            </Badge>
          </article>
        </div>

        {/* ================================================================
      KNOWLEDGE JOURNEY
      ================================================================ */}

        <div className="cc-kh-journey">
          <div className="cc-kh-journey__line" aria-hidden="true" />

          <div className="cc-kh-journey__steps">
            <span className="cc-kh-journey__step cc-kh-journey__step--blue">
              <i />
              DISCOVER
            </span>

            <span className="cc-kh-journey__arrow" aria-hidden="true">
              →
            </span>

            <span className="cc-kh-journey__step cc-kh-journey__step--violet">
              <i />
              UNDERSTAND
            </span>

            <span className="cc-kh-journey__arrow" aria-hidden="true">
              →
            </span>

            <span className="cc-kh-journey__step cc-kh-journey__step--green">
              <i />
              APPLY
            </span>
          </div>

          <p>KNOWLEDGE CONNECTED TO CAPABILITY</p>
        </div>

        {/* ================================================================
      FINAL CTA
      ================================================================ */}

        <section className="cc-kh-cta">
          <div className="cc-kh-cta__mesh" aria-hidden="true" />

          <div
            className="cc-kh-cta__glow cc-kh-cta__glow--blue"
            aria-hidden="true"
          />

          <div
            className="cc-kh-cta__glow cc-kh-cta__glow--cyan"
            aria-hidden="true"
          />

          <div
            className="cc-kh-cta__glow cc-kh-cta__glow--green"
            aria-hidden="true"
          />

          <div className="cc-kh-cta__content">
            <span className="cc-kh-cta__eyebrow">READY TO BUILD CAPACITY?</span>

            <h2>
              Turn knowledge into
              <br />
              <span>real capability.</span>
            </h2>

            <p>
              Discover learning opportunities, connect with trainers, and grow
              through one connected ecosystem.
            </p>

            <div className="cc-kh-cta__actions">
              <Button
                variant="primary"
                size="lg"
                rounded="full"
                rightIcon={<FiArrowRight />}
                className="cc-kh-cta__primary"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>

              <Button
                variant="glass"
                size="lg"
                rounded="full"
                className="cc-kh-cta__secondary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="cc-kh-cta__footer">
            <span />
            <small>CAPACITY CONNECT · LEARN · DEVELOP · GROW</small>
            <span />
          </div>
        </section>
      </section>
      {/* ================================================================
    FOOTER — CAPACITY CONNECT
    ================================================================ */}

      <footer className="landing-footer">
        {/* ==============================================================
      FOOTER ATMOSPHERE
      ============================================================== */}

        <div
          className="landing-footer__glow landing-footer__glow--blue"
          aria-hidden="true"
        />

        <div
          className="landing-footer__glow landing-footer__glow--cyan"
          aria-hidden="true"
        />

        <div
          className="landing-footer__glow landing-footer__glow--green"
          aria-hidden="true"
        />

        <div className="landing-footer__grid" aria-hidden="true" />

        {/* ==============================================================
      BRAND / IDENTITY
      ============================================================== */}

        <div className="landing-footer__brand-zone">
          <div className="landing-footer__brand-mark">
            <span className="landing-footer__wave landing-footer__wave--1" />
            <span className="landing-footer__wave landing-footer__wave--2" />
            <span className="landing-footer__wave landing-footer__wave--3" />
          </div>

          <div className="landing-footer__brand">
            <span className="landing-footer__brand-name">CAPACITY CONNECT</span>

            <span className="landing-footer__brand-motto">
              LEARN&nbsp; · &nbsp;DEVELOP&nbsp; · &nbsp;GROW
            </span>
          </div>

          <p className="landing-footer__tagline">
            A connected ecosystem for building knowledge, skills and real-world
            capability.
          </p>

          <Button
            variant="primary"
            size="md"
            rounded="full"
            rightIcon={<FiArrowRight />}
            className="landing-footer__explore"
            onClick={() => scrollToSection("features")}
          >
            Explore Platform
          </Button>
        </div>

        {/* ==============================================================
      NAVIGATION
      ============================================================== */}

        <div className="landing-footer__navigation">
          {/* PLATFORM */}

          <div className="landing-footer__column">
            <div className="landing-footer__column-heading">
              <span className="landing-footer__column-dot landing-footer__column-dot--blue" />
              <span>PLATFORM</span>
            </div>

            <nav className="landing-footer__links" aria-label="Platform links">
              <button type="button" onClick={() => handleAction("Explore")}>
                Explore
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
              >
                How It Works
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction("Opportunities")}
              >
                Opportunities
                <span>→</span>
              </button>

              <button type="button" onClick={() => scrollToSection("about")}>
                About Capacity Connect
                <span>→</span>
              </button>
            </nav>
          </div>

          {/* LEARNING */}

          <div className="landing-footer__column">
            <div className="landing-footer__column-heading">
              <span className="landing-footer__column-dot landing-footer__column-dot--violet" />
              <span>LEARNING</span>
            </div>

            <nav className="landing-footer__links" aria-label="Learning links">
              <button
                type="button"
                onClick={() => handleAction("Learning Hub")}
              >
                Learning Hub
                <span>→</span>
              </button>

              <button type="button" onClick={() => handleAction("Resources")}>
                Resources
                <span>→</span>
              </button>

              <button type="button" onClick={() => handleAction("Guidelines")}>
                Guidelines
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction("Skill Domains")}
              >
                Skill Domains
                <span>→</span>
              </button>
            </nav>
          </div>

          {/* ECOSYSTEM */}

          <div className="landing-footer__column">
            <div className="landing-footer__column-heading">
              <span className="landing-footer__column-dot landing-footer__column-dot--teal" />
              <span>ECOSYSTEM</span>
            </div>

            <nav className="landing-footer__links" aria-label="Ecosystem links">
              <button type="button" onClick={() => handleAction("Trainers")}>
                Trainers
                <span>→</span>
              </button>

              <button type="button" onClick={() => handleAction("Employees")}>
                Employees
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction("Organizations")}
              >
                Organizations
                <span>→</span>
              </button>

              <button type="button" onClick={() => handleAction("Partners")}>
                Partners
                <span>→</span>
              </button>
            </nav>
          </div>

          {/* SUPPORT */}

          <div className="landing-footer__column">
            <div className="landing-footer__column-heading">
              <span className="landing-footer__column-dot landing-footer__column-dot--green" />
              <span>SUPPORT</span>
            </div>

            <nav className="landing-footer__links" aria-label="Support links">
              <button type="button" onClick={() => handleAction("Help Center")}>
                Help Center
                <span>→</span>
              </button>

              <button type="button" onClick={() => handleAction("FAQs")}>
                FAQs
                <span>→</span>
              </button>

              <button type="button" onClick={() => handleAction("Contact")}>
                Contact
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction("Accessibility")}
              >
                Accessibility
                <span>→</span>
              </button>
            </nav>
          </div>
        </div>

        {/* ==============================================================
      CAPABILITY RAIL
      ============================================================== */}

        <div className="landing-footer__rail">
          <div className="landing-footer__rail-line" />

          <div className="landing-footer__rail-step landing-footer__rail-step--blue">
            <span />
            <strong>DISCOVER</strong>
          </div>

          <div className="landing-footer__rail-connector" />

          <div className="landing-footer__rail-step landing-footer__rail-step--violet">
            <span />
            <strong>UNDERSTAND</strong>
          </div>

          <div className="landing-footer__rail-connector" />

          <div className="landing-footer__rail-step landing-footer__rail-step--teal">
            <span />
            <strong>APPLY</strong>
          </div>

          <div className="landing-footer__rail-connector" />

          <div className="landing-footer__rail-step landing-footer__rail-step--green">
            <span />
            <strong>GROW</strong>
          </div>
        </div>

        {/* ==============================================================
      GOVERNMENT / INSTITUTIONAL IDENTITY
      ============================================================== */}

        <div className="landing-footer__institution">
          <div className="landing-footer__institution-mark">
            <FiGlobe />
          </div>

          <div className="landing-footer__institution-copy">
            <span className="landing-footer__institution-country">
              GOVERNMENT OF INDIA
            </span>

            <span className="landing-footer__institution-ministry">
              MINISTRY OF EARTH SCIENCES
            </span>
          </div>

          <div className="landing-footer__institution-divider" />

          <div className="landing-footer__institution-platform">
            <strong>CAPACITY CONNECT</strong>

            <span>Connected capability development ecosystem</span>
          </div>

          <div className="landing-footer__socials">
            <button
              type="button"
              aria-label="LinkedIn"
              onClick={() => handleAction("LinkedIn")}
            >
              in
            </button>

            <button
              type="button"
              aria-label="YouTube"
              onClick={() => handleAction("YouTube")}
            >
              ▶
            </button>

            <button
              type="button"
              aria-label="X"
              onClick={() => handleAction("X")}
            >
              X
            </button>
          </div>
        </div>

        {/* ==============================================================
      LEGAL BAR
      ============================================================== */}

        <div className="landing-footer__legal">
          <span className="landing-footer__copyright">
            © 2026 Capacity Connect
          </span>

          <nav className="landing-footer__legal-links" aria-label="Legal links">
            <button
              type="button"
              onClick={() => handleAction("Privacy Policy")}
            >
              Privacy
            </button>

            <span>·</span>

            <button type="button" onClick={() => handleAction("Terms of Use")}>
              Terms
            </button>

            <span>·</span>

            <button type="button" onClick={() => handleAction("Accessibility")}>
              Accessibility
            </button>
          </nav>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
