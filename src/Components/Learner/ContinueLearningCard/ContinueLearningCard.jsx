import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiPlay,
  FiTarget,
} from "react-icons/fi";

import Card from "../../../Reusable_components/Card/Card";
import Badge from "../../../Reusable_components/Badge/Badge";
import ProgressBar from "../../../Reusable_components/ProgressBar/ProgressBar";

import "./ContinueLearningCard.css";

/*
|--------------------------------------------------------------------------
| STATIC DATA
|--------------------------------------------------------------------------
| Temporary dashboard data.
| Later this will come from the learner learning/progress API.
|--------------------------------------------------------------------------
*/

const currentLearning = {
  courseTitle: "Backend Development Fundamentals",
  category: "Backend Development",
  level: "Intermediate",
  moduleNumber: 4,
  totalModules: 8,
  moduleTitle: "REST API & Server Architecture",
  progress: 65,
  completedModules: 3,
  remainingModules: 5,
  remainingTime: "42 min",
  description:
    "Continue where you left off and strengthen your backend development fundamentals through practical learning.",
};

const upcomingModules = [
  {
    id: 1,
    number: 4,
    title: "REST API & Server Architecture",
    duration: "42 min",
    status: "Current",
    variant: "current",
  },
  {
    id: 2,
    number: 5,
    title: "Database Integration",
    duration: "38 min",
    status: "Next",
    variant: "next",
  },
  {
    id: 3,
    number: 6,
    title: "Authentication & Security",
    duration: "45 min",
    status: "Locked",
    variant: "locked",
  },
];

const ContinueLearningCard = ({ onContinueLearning, onViewCourse }) => {
  return (
    <section
      className="continue-learning-section"
      aria-labelledby="continue-learning-title"
    >
      {/* ============================================================
          SECTION HEADER
      ============================================================ */}

      <div className="continue-learning-section__header">
        <div className="continue-learning-section__heading">
          <span className="continue-learning-section__eyebrow">
            KEEP LEARNING
          </span>

          <h2
            id="continue-learning-title"
            className="continue-learning-section__title"
          >
            Continue Learning
          </h2>

          <p className="continue-learning-section__description">
            Pick up where you left off and keep moving toward your learning
            goals.
          </p>
        </div>

        <button
          type="button"
          className="continue-learning-section__view-course"
          onClick={onViewCourse}
        >
          <span>View Course</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      {/* ============================================================
          MAIN LEARNING CARD
      ============================================================ */}

      <Card variant="default" className="continue-learning-card">
        <div className="continue-learning-card__layout">
          {/* ========================================================
              COURSE VISUAL
          ======================================================== */}

          <div className="continue-learning-card__visual">
            <div className="continue-learning-card__visual-top">
              <span className="continue-learning-card__visual-badge">
                <FiBookOpen aria-hidden="true" />
              </span>

              <Badge variant="info" size="sm">
                {currentLearning.level}
              </Badge>
            </div>

            <div className="continue-learning-card__visual-content">
              <span>MODULE</span>

              <strong>{currentLearning.moduleNumber}</strong>

              <small>OF {currentLearning.totalModules}</small>
            </div>

            <div
              className="continue-learning-card__visual-lines"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* ========================================================
              COURSE CONTENT
          ======================================================== */}

          <div className="continue-learning-card__content">
            <div className="continue-learning-card__course-header">
              <div className="continue-learning-card__course-heading">
                <span className="continue-learning-card__category">
                  {currentLearning.category}
                </span>

                <h3>{currentLearning.courseTitle}</h3>
              </div>

              <div className="continue-learning-card__progress-score">
                <strong>{currentLearning.progress}%</strong>

                <span>Completed</span>
              </div>
            </div>

            <p className="continue-learning-card__description">
              {currentLearning.description}
            </p>

            {/* ======================================================
                CURRENT MODULE
            ====================================================== */}

            <div className="continue-learning-card__current-module">
              <div className="continue-learning-card__module-icon">
                <FiPlay aria-hidden="true" />
              </div>

              <div className="continue-learning-card__module-content">
                <span className="continue-learning-card__module-label">
                  CONTINUE FROM
                </span>

                <strong>{currentLearning.moduleTitle}</strong>

                <div className="continue-learning-card__module-meta">
                  <span>Module {currentLearning.moduleNumber}</span>

                  <span>
                    <FiClock aria-hidden="true" />
                    {currentLearning.remainingTime}
                  </span>
                </div>
              </div>
            </div>

            {/* ======================================================
                COURSE PROGRESS
            ====================================================== */}

            <div className="continue-learning-card__progress">
              <div className="continue-learning-card__progress-header">
                <span>Course progress</span>

                <strong>{currentLearning.progress}%</strong>
              </div>

              <ProgressBar
                value={currentLearning.progress}
                max={100}
                variant="info"
                appearance="solid"
                size="sm"
                radius="pill"
                animated
              />

              <div className="continue-learning-card__progress-footer">
                <span>
                  {currentLearning.completedModules} of{" "}
                  {currentLearning.totalModules} modules completed
                </span>

                <span>
                  {currentLearning.remainingModules} modules remaining
                </span>
              </div>
            </div>

            {/* ======================================================
                ACTION
            ====================================================== */}

            <div className="continue-learning-card__action-row">
              <div className="continue-learning-card__goal">
                <FiTarget aria-hidden="true" />

                <span>Keep going — you're making steady progress.</span>
              </div>

              <button
                type="button"
                className="continue-learning-card__continue-button"
                onClick={onContinueLearning}
              >
                <FiPlay aria-hidden="true" />

                <span>Continue Learning</span>

                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* ============================================================
          UPCOMING MODULES
      ============================================================ */}

      <Card variant="default" className="continue-learning-modules-card">
        <div className="continue-learning-modules-card__header">
          <div>
            <span className="continue-learning-section__eyebrow">
              LEARNING PATH
            </span>

            <h3>Up Next</h3>
          </div>

          <span className="continue-learning-modules-card__module-count">
            {currentLearning.totalModules} Modules
          </span>
        </div>

        <div className="continue-learning-modules">
          {upcomingModules.map((module) => (
            <div
              className={`continue-learning-module continue-learning-module--${module.variant}`}
              key={module.id}
            >
              {/* Module number */}

              <div className="continue-learning-module__number">
                {module.number}
              </div>

              {/* Module content */}

              <div className="continue-learning-module__content">
                <div className="continue-learning-module__title-row">
                  <h4>{module.title}</h4>

                  <Badge
                    variant={
                      module.variant === "current"
                        ? "info"
                        : module.variant === "next"
                          ? "success"
                          : "default"
                    }
                    size="sm"
                  >
                    {module.status}
                  </Badge>
                </div>

                <div className="continue-learning-module__meta">
                  <span>
                    <FiClock aria-hidden="true" />
                    {module.duration}
                  </span>

                  {module.variant === "current" && (
                    <span>
                      <FiCheckCircle aria-hidden="true" />
                      In progress
                    </span>
                  )}

                  {module.variant === "next" && (
                    <span>
                      <FiLayers aria-hidden="true" />
                      Coming next
                    </span>
                  )}
                </div>
              </div>

              {/* Module action */}

              {module.variant !== "locked" && (
                <button
                  type="button"
                  className="continue-learning-module__action"
                  onClick={
                    module.variant === "current"
                      ? onContinueLearning
                      : onViewCourse
                  }
                  aria-label={`${module.status} module: ${module.title}`}
                >
                  <FiArrowRight aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ============================================================
          BOTTOM INSIGHT
      ============================================================ */}

      <div className="continue-learning-section__insight">
        <div className="continue-learning-section__insight-content">
          <span className="continue-learning-section__insight-icon">
            <FiCheckCircle aria-hidden="true" />
          </span>

          <div>
            <strong>You're on your way to completing this course</strong>

            <span>
              Complete the remaining modules to move closer to your next
              certificate.
            </span>
          </div>
        </div>

        <span className="continue-learning-section__insight-progress">
          {currentLearning.progress}%
        </span>
      </div>
    </section>
  );
};

export default ContinueLearningCard;
