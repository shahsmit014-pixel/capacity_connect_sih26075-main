import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiTrendingUp,
  FiCircle,
} from "react-icons/fi";

import "./LearningProgress.css";

/* =========================================================
   STATIC DATA

   Temporary dashboard data.
   Later this will come from the API.
========================================================= */

const learningStats = [
  {
    id: 1,
    label: "Total Courses",
    value: "18",
    icon: FiBookOpen,
    variant: "ocean",
  },
  {
    id: 2,
    label: "Completed",
    value: "12",
    icon: FiCheckCircle,
    variant: "success",
  },
  {
    id: 3,
    label: "In Progress",
    value: "4",
    icon: FiClock,
    variant: "violet",
  },
  {
    id: 4,
    label: "Not Started",
    value: "2",
    icon: FiCircle,
    variant: "neutral",
  },
];

/* =========================================================
   LEARNING ACTIVITY DATA

   7-day static activity.
========================================================= */

const activityData = [
  {
    day: "Mon",
    hours: 1.2,
    height: 40,
    variant: "ocean",
  },
  {
    day: "Tue",
    hours: 2.4,
    height: 80,
    variant: "violet",
  },
  {
    day: "Wed",
    hours: 2.7,
    height: 90,
    variant: "green",
  },
  {
    day: "Thu",
    hours: 1.5,
    height: 50,
    variant: "orange",
  },
  {
    day: "Fri",
    hours: 1.6,
    height: 54,
    variant: "cyan",
  },
  {
    day: "Sat",
    hours: 2.8,
    height: 94,
    variant: "green",
  },
  {
    day: "Sun",
    hours: 0.8,
    height: 28,
    variant: "coral",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getProgressTheme = (progress) => {
  if (progress < 40) {
    return "low";
  }

  if (progress < 70) {
    return "medium";
  }

  return "high";
};

/* =========================================================
   LEARNING PROGRESS
========================================================= */

const LearningProgress = ({
  progress = 68,
  totalCourses = 18,
  completedCourses = 12,
}) => {
  const progressTheme = getProgressTheme(progress);

  return (
    <section
      className="learning-progress"
      aria-labelledby="learning-progress-title"
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="learning-progress__header">
        <div className="learning-progress__heading">
          <span className="learning-progress__eyebrow">
            YOUR LEARNING JOURNEY
          </span>

          <h2 id="learning-progress-title" className="learning-progress__title">
            Learning Progress
          </h2>

          <p className="learning-progress__subtitle">
            Your overall learning journey at a glance.
          </p>
        </div>

        <div className="learning-progress__period">
          <FiActivity aria-hidden="true" />

          <span>Last 7 days</span>

          <span className="learning-progress__period-dot" aria-hidden="true" />
        </div>
      </div>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div className="learning-progress__body">
        {/* =================================================
            OVERALL PROGRESS
        ================================================= */}

        <div className="learning-progress__overview">
          {/* ===============================================
              CIRCULAR PROGRESS
          =============================================== */}

          <div
            className={`learning-progress__circle-wrap learning-progress__circle-wrap--${progressTheme}`}
            style={{
              "--progress": `${progress}%`,
            }}
          >
            <div className="learning-progress__circle">
              <div className="learning-progress__circle-content">
                <strong className="learning-progress__circle-value">
                  {progress}%
                </strong>

                <span className="learning-progress__circle-label">
                  Overall Progress
                </span>
              </div>
            </div>
          </div>

          {/* ===============================================
              PROGRESS DETAILS
          =============================================== */}

          <div className="learning-progress__details">
            {/* -------------------------------------------
                STAT MINI CARDS
            ------------------------------------------- */}

            <div className="learning-progress__mini-stats">
              {learningStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    className={`learning-progress__mini-stat learning-progress__mini-stat--${stat.variant}`}
                    key={stat.id}
                  >
                    <div className="learning-progress__mini-icon">
                      <Icon aria-hidden="true" />
                    </div>

                    <div className="learning-progress__mini-content">
                      <strong>{stat.value}</strong>

                      <span>{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* -------------------------------------------
                OVERALL HORIZONTAL PROGRESS
            ------------------------------------------- */}

            <div className="learning-progress__bar-section">
              <div className="learning-progress__bar-header">
                <span>Course completion</span>

                <strong>
                  {completedCourses} of {totalCourses} courses completed
                </strong>
              </div>

              <div className="learning-progress__bar">
                <div
                  className={`learning-progress__bar-fill learning-progress__bar-fill--${progressTheme}`}
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="learning-progress__bar-footer">
                <span>Keep building your learning momentum.</span>

                <strong>{progress}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIVITY CHART
        ================================================= */}

        <div className="learning-progress__activity">
          <div className="learning-progress__activity-header">
            <div>
              <span className="learning-progress__activity-label">
                LEARNING ACTIVITY
              </span>

              <h3>Weekly activity</h3>
            </div>

            <span className="learning-progress__activity-total">12h 30m</span>
          </div>

          {/* ===============================================
              CHART
          =============================================== */}

          <div className="learning-progress__chart">
            {/* Y AXIS */}

            <div className="learning-progress__y-axis">
              <span>3h</span>
              <span>2h</span>
              <span>1h</span>
              <span>0</span>
            </div>

            {/* CHART AREA */}

            <div className="learning-progress__chart-area">
              {/* GRID */}

              <div className="learning-progress__chart-grid" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>

              {/* BARS */}

              <div className="learning-progress__bars">
                {activityData.map((item) => (
                  <div className="learning-progress__bar-column" key={item.day}>
                    <div className="learning-progress__bar-value">
                      {item.hours}h
                    </div>

                    <div className="learning-progress__bar-track">
                      <div
                        className={`learning-progress__activity-bar learning-progress__activity-bar--${item.variant}`}
                        style={{
                          height: `${item.height}%`,
                        }}
                      />
                    </div>

                    <span className="learning-progress__day">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===============================================
              ACTIVITY FOOTER
          =============================================== */}

          <div className="learning-progress__activity-footer">
            <div className="learning-progress__time">
              <div className="learning-progress__time-icon">
                <FiClock aria-hidden="true" />
              </div>

              <div>
                <span>Total Learning Time</span>

                <strong>12h 30m</strong>
              </div>
            </div>

            <div className="learning-progress__comparison">
              <FiTrendingUp aria-hidden="true" />

              <strong>+2h</strong>

              <span>vs last week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProgress;
