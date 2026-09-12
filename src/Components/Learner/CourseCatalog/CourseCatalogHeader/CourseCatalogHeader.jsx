import React from "react";
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiLayers,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";

import "./CourseCatalogHeader.css";

const featureItems = [
  {
    id: 1,
    icon: <FiBookOpen />,
    title: "Expert-led",
    description: "Quality content",
    variant: "cyan",
  },
  {
    id: 2,
    icon: <FiBarChart2 />,
    title: "Career relevant",
    description: "Build in-demand skills",
    variant: "green",
  },
  {
    id: 3,
    icon: <FiUsers />,
    title: "Flexible learning",
    description: "Learn at your pace",
    variant: "violet",
  },
  {
    id: 4,
    icon: <FiShield />,
    title: "Verified certificates",
    description: "Showcase your growth",
    variant: "amber",
  },
];

const CourseCatalogHeader = ({
  totalCourses = 18,
  activeLearners = "1.2K+",
  completedCourses = 12,
}) => {
  return (
    <section
      className="course-catalog-header"
      aria-labelledby="course-catalog-title"
    >
      {/* =====================================================
          MAIN HEADER
          ===================================================== */}
      <Card variant="default" className="course-catalog-header__hero">
        {/* Decorative Ocean Background */}
        <div className="course-catalog-header__ocean" aria-hidden="true">
          <div className="course-catalog-header__ocean-glow" />

          <div className="course-catalog-header__sun" />

          <div className="course-catalog-header__orbital course-catalog-header__orbital--one" />

          <div className="course-catalog-header__orbital course-catalog-header__orbital--two" />

          <div className="course-catalog-header__wave course-catalog-header__wave--one" />
          <div className="course-catalog-header__wave course-catalog-header__wave--two" />
          <div className="course-catalog-header__wave course-catalog-header__wave--three" />

          <div className="course-catalog-header__lighthouse">
            <span className="course-catalog-header__lighthouse-light" />
            <span className="course-catalog-header__lighthouse-top" />
            <span className="course-catalog-header__lighthouse-body" />
            <span className="course-catalog-header__lighthouse-base" />
          </div>

          <div className="course-catalog-header__bird course-catalog-header__bird--one" />
          <div className="course-catalog-header__bird course-catalog-header__bird--two" />
        </div>

        <div className="course-catalog-header__hero-content">
          {/* =================================================
              LEFT CONTENT
              ================================================= */}
          <div className="course-catalog-header__intro">
            <span className="course-catalog-header__eyebrow">LEARNING</span>

            <h1
              id="course-catalog-title"
              className="course-catalog-header__title"
            >
              Course Catalog
            </h1>

            <p className="course-catalog-header__description">
              Explore courses designed to build practical skills and strengthen
              your professional capabilities.
            </p>

            {/* Feature Highlights */}
            <div className="course-catalog-header__features">
              {featureItems.map((feature) => (
                <div
                  key={feature.id}
                  className={`course-catalog-feature course-catalog-feature--${feature.variant}`}
                >
                  <div className="course-catalog-feature__icon">
                    {feature.icon}
                  </div>

                  <div className="course-catalog-feature__content">
                    <strong>{feature.title}</strong>

                    <span>{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT STAT AREA
              ================================================= */}
          <div className="course-catalog-header__stats">
            <div className="course-catalog-header__main-stat">
              <strong>{totalCourses}</strong>

              <span>Courses Available</span>
            </div>

            <div className="course-catalog-header__stat-divider" />

            <div className="course-catalog-header__small-stats">
              <div className="course-catalog-header__small-stat">
                <div className="course-catalog-header__small-stat-icon">
                  <FiUsers />
                </div>

                <div>
                  <strong>{activeLearners}</strong>
                  <span>Active learners</span>
                </div>
              </div>

              <div className="course-catalog-header__small-stat">
                <div className="course-catalog-header__small-stat-icon">
                  <FiCheckCircle />
                </div>

                <div>
                  <strong>{completedCourses}</strong>
                  <span>Completed by you</span>
                </div>
              </div>
            </div>

            <div className="course-catalog-header__message">
              <FiCompass />

              <span>
                Expand your knowledge.
                <br />
                Protect our ocean.
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* =====================================================
          CATALOG CONTEXT BAR
          Actual search/filter controls will be placed here
          by CourseFilters.
          ===================================================== */}
      <div className="course-catalog-header__context">
        <div className="course-catalog-header__context-left">
          <div className="course-catalog-header__context-icon">
            <FiLayers />
          </div>

          <div className="course-catalog-header__context-text">
            <strong>Explore all learning opportunities</strong>

            <span>Find the right course for your next skill milestone.</span>
          </div>
        </div>

        <div className="course-catalog-header__context-info">
          <Badge variant="info" size="sm">
            {totalCourses} Courses
          </Badge>

          <div className="course-catalog-header__context-time">
            <FiClock />
            <span>Learn at your own pace</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCatalogHeader;
