import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiPlayCircle,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../Reusable_components/Card/Card";
import Badge from "../../../Reusable_components/Badge/Badge";
import ProgressBar from "../../../Reusable_components/ProgressBar/ProgressBar";

import "./RecommendationCard.css";

/*
|--------------------------------------------------------------------------
| STATIC RECOMMENDATION DATA
|--------------------------------------------------------------------------
| Temporary data for the dashboard.
| Later this will come from the recommendation API.
|--------------------------------------------------------------------------
*/

const featuredCourse = {
  id: 1,
  title: "Backend Development Fundamentals",
  category: "Backend Development",
  level: "Intermediate",
  duration: "6 weeks",
  modules: 8,
  learners: 1240,
  rating: 4.8,
  match: 96,
  skillGap: "Backend Development",
  gapLevel: 3,
  description:
    "Build strong backend foundations through APIs, server architecture, databases, and practical development workflows.",
  accent: "warm",
};

const recommendedCourses = [
  {
    id: 2,
    title: "Advanced React Development",
    category: "Frontend Development",
    level: "Intermediate",
    duration: "4 weeks",
    modules: 6,
    rating: 4.7,
    match: 91,
    reason: "Supports your React skill gap",
    icon: "⚛",
    accent: "violet",
  },
  {
    id: 3,
    title: "REST API Design",
    category: "Backend Development",
    level: "Intermediate",
    duration: "3 weeks",
    modules: 5,
    rating: 4.6,
    match: 87,
    reason: "Recommended for backend growth",
    icon: "API",
    accent: "mint",
  },
  {
    id: 4,
    title: "PostgreSQL Essentials",
    category: "Database",
    level: "Beginner",
    duration: "3 weeks",
    modules: 5,
    rating: 4.5,
    match: 82,
    reason: "Strengthen your database foundation",
    icon: "DB",
    accent: "peach",
  },
];

const RecommendationCard = ({
  onViewAllRecommendations,
  onStartLearning,
  onViewCourse,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const getProgressVariant = (match) => {
    if (match >= 90) {
      return "success";
    }

    if (match >= 85) {
      return "info";
    }

    return "warning";
  };

  return (
    <section
      className="recommendation-section"
      aria-labelledby="recommendation-section-title"
    >
      {/* ============================================================
          SECTION HEADER
      ============================================================ */}

      <div className="recommendation-section__header">
        <div className="recommendation-section__heading">
          <span className="recommendation-section__eyebrow">
            PERSONALIZED LEARNING
          </span>

          <h2
            id="recommendation-section-title"
            className="recommendation-section__title"
          >
            Recommended Training
          </h2>

          <p className="recommendation-section__description">
            Courses selected to help you strengthen your skill gaps and move
            closer to your target competency.
          </p>
        </div>

        <button
          type="button"
          className="recommendation-section__view-all"
          onClick={onViewAllRecommendations}
        >
          <span>View All Recommendations</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      {/* ============================================================
          FEATURED RECOMMENDATION
      ============================================================ */}

      <Card variant="default" className="recommendation-featured-card">
        <div className="recommendation-featured-card__layout">
          {/* --------------------------------------------------------
              COURSE VISUAL
          -------------------------------------------------------- */}

          <div className="recommendation-featured-card__visual">
            <div className="recommendation-featured-card__visual-icon">
              <FiLayers aria-hidden="true" />
            </div>

            <span className="recommendation-featured-card__visual-label">
              PRIORITY TRAINING
            </span>

            <div className="recommendation-featured-card__visual-pattern">
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* --------------------------------------------------------
              COURSE CONTENT
          -------------------------------------------------------- */}

          <div className="recommendation-featured-card__content">
            <div className="recommendation-featured-card__top">
              <div className="recommendation-featured-card__title-area">
                <div className="recommendation-featured-card__badges">
                  <Badge variant="warning" size="sm">
                    Recommended
                  </Badge>

                  <Badge variant="info" size="sm">
                    {featuredCourse.level}
                  </Badge>
                </div>

                <h3>{featuredCourse.title}</h3>

                <p className="recommendation-featured-card__category">
                  {featuredCourse.category}
                </p>
              </div>

              <div className="recommendation-featured-card__match">
                <strong>{featuredCourse.match}%</strong>
                <span>Skill Match</span>
              </div>
            </div>

            <p className="recommendation-featured-card__description">
              {featuredCourse.description}
            </p>

            {/* ------------------------------------------------------
                COURSE META
            ------------------------------------------------------ */}

            <div className="recommendation-featured-card__meta">
              <div className="recommendation-meta-item">
                <FiClock aria-hidden="true" />

                <span>{featuredCourse.duration}</span>
              </div>

              <div className="recommendation-meta-item">
                <FiBookOpen aria-hidden="true" />

                <span>{featuredCourse.modules} Modules</span>
              </div>

              <div className="recommendation-meta-item">
                <FiUsers aria-hidden="true" />

                <span>{featuredCourse.learners.toLocaleString()} Learners</span>
              </div>

              <div className="recommendation-meta-item recommendation-meta-item--rating">
                <FiStar aria-hidden="true" />

                <span>{featuredCourse.rating}</span>
              </div>
            </div>

            {/* ------------------------------------------------------
                MATCH PROGRESS
            ------------------------------------------------------ */}

            <div className="recommendation-featured-card__progress">
              <div className="recommendation-featured-card__progress-header">
                <span>Why this course is recommended</span>

                <strong>{featuredCourse.match}% match</strong>
              </div>

              <ProgressBar
                value={featuredCourse.match}
                max={100}
                variant="success"
                appearance="solid"
                size="sm"
                radius="pill"
                animated
              />
            </div>

            {/* ------------------------------------------------------
                REASON + ACTION
            ------------------------------------------------------ */}

            <div className="recommendation-featured-card__bottom">
              <div className="recommendation-featured-card__reason">
                <FiTarget aria-hidden="true" />

                <span>
                  Recommended because your{" "}
                  <strong>{featuredCourse.skillGap}</strong> gap is{" "}
                  {featuredCourse.gapLevel} levels.
                </span>
              </div>

              <button
                type="button"
                className="recommendation-featured-card__action"
                onClick={onStartLearning}
              >
                <span>Start Learning</span>
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ============================================================
          OTHER RECOMMENDATIONS
      ============================================================ */}

      <div className="recommendation-courses-grid">
        {recommendedCourses.map((course) => (
          <Card
            variant="default"
            className={`recommendation-course-card recommendation-course-card--${course.accent}`}
            key={course.id}
          >
            {/* ------------------------------------------------------
                COURSE TOP
            ------------------------------------------------------ */}

            <div className="recommendation-course-card__top">
              <div
                className={`recommendation-course-card__icon recommendation-course-card__icon--${course.accent}`}
              >
                {course.icon}
              </div>

              <Badge
                variant={
                  course.match >= 90
                    ? "success"
                    : course.match >= 85
                      ? "info"
                      : "warning"
                }
                size="sm"
              >
                {course.match}% Match
              </Badge>
            </div>

            {/* ------------------------------------------------------
                COURSE INFO
            ------------------------------------------------------ */}

            <div className="recommendation-course-card__content">
              <h3>{course.title}</h3>

              <p className="recommendation-course-card__category">
                {course.category}
              </p>

              <div className="recommendation-course-card__tags">
                <Badge variant="default" size="sm">
                  {course.level}
                </Badge>

                <span>
                  <FiClock aria-hidden="true" />
                  {course.duration}
                </span>

                <span>
                  <FiBookOpen aria-hidden="true" />
                  {course.modules} Modules
                </span>
              </div>

              {/* ----------------------------------------------------
                  MATCH PROGRESS
              ---------------------------------------------------- */}

              <div className="recommendation-course-card__progress">
                <div className="recommendation-course-card__progress-header">
                  <span>Skill relevance</span>

                  <strong>{course.match}%</strong>
                </div>

                <ProgressBar
                  value={course.match}
                  max={100}
                  variant={getProgressVariant(course.match)}
                  appearance="solid"
                  size="sm"
                  radius="pill"
                  animated
                />
              </div>

              {/* ----------------------------------------------------
                  REASON
              ---------------------------------------------------- */}

              <div className="recommendation-course-card__reason">
                <FiTrendingUp aria-hidden="true" />

                <span>{course.reason}</span>
              </div>
            </div>

            {/* ------------------------------------------------------
                COURSE FOOTER
            ------------------------------------------------------ */}

            <div className="recommendation-course-card__footer">
              <div className="recommendation-course-card__rating">
                <FiStar aria-hidden="true" />

                <span>{course.rating}</span>
              </div>

              <button
                type="button"
                className="recommendation-course-card__action"
                onClick={() => onViewCourse?.(course)}
              >
                <span>View Course</span>

                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* ============================================================
          BOTTOM INSIGHT
      ============================================================ */}

      <div className="recommendation-section__insight">
        <div className="recommendation-section__insight-content">
          <span className="recommendation-section__insight-icon">
            <FiCheckCircle aria-hidden="true" />
          </span>

          <div>
            <strong>Recommendations are personalized for you</strong>

            <span>
              Your skill profile and competency gaps help prioritize relevant
              training.
            </span>
          </div>
        </div>

        <button
          type="button"
          className="recommendation-section__insight-action"
          onClick={onViewAllRecommendations}
        >
          Explore More
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default RecommendationCard;
