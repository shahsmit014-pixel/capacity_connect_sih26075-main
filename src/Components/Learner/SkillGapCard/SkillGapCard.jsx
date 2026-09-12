import {
  FiAlertCircle,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiChevronRight,
  FiTarget,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

import Card from "../../../Reusable_components/Card/Card";
import Badge from "../../../Reusable_components/Badge/Badge";
import ProgressBar from "../../../Reusable_components/ProgressBar/ProgressBar";

import "./SkillGapCard.css";

/*
|--------------------------------------------------------------------------
| STATIC DATA
|--------------------------------------------------------------------------
| Temporary dashboard data.
| Later this information will come from the Skill Gap API.
|--------------------------------------------------------------------------
*/

const skillGaps = [
  {
    id: 1,
    name: "Backend Development",
    category: "Development",
    currentLevel: 1,
    targetLevel: 4,
    gap: 3,
    status: "Critical Gap",
    variant: "danger",
    icon: "BE",
    description:
      "Building stronger backend fundamentals will significantly improve your development capability.",
    recommendedCourse: "Backend Development Fundamentals",
  },
  {
    id: 2,
    name: "React",
    category: "Frontend Development",
    currentLevel: 3,
    targetLevel: 4,
    gap: 1,
    status: "Near Target",
    variant: "warning",
    icon: "⚛",
    description:
      "You are close to your target level. Focus on advanced React patterns and application architecture.",
    recommendedCourse: "Advanced React Development",
  },
];

const SkillGapCard = ({ onViewSkillGaps, onExploreTraining }) => {
  /*
  |--------------------------------------------------------------------------
  | Derived Data
  |--------------------------------------------------------------------------
  */

  const biggestGap = skillGaps.reduce(
    (largest, skill) => (skill.gap > largest.gap ? skill : largest),
    skillGaps[0],
  );

  const totalGapLevels = skillGaps.reduce(
    (total, skill) => total + skill.gap,
    0,
  );

  const criticalGaps = skillGaps.filter((skill) => skill.gap >= 3).length;

  const onTrackSkills = 4;

  const getLevelPercentage = (level) => {
    return (level / 5) * 100;
  };

  const getGapPercentage = (gap) => {
    return (gap / 5) * 100;
  };

  const getProgressVariant = (gap) => {
    if (gap >= 3) {
      return "danger";
    }

    if (gap >= 2) {
      return "warning";
    }

    return "success";
  };

  return (
    <section
      className="skill-gap-section"
      aria-labelledby="skill-gap-section-title"
    >
      {/* ============================================================
          SECTION HEADER
      ============================================================ */}

      <div className="skill-gap-section__header">
        <div className="skill-gap-section__heading">
          <span className="skill-gap-section__eyebrow">DEVELOPMENT FOCUS</span>

          <h2 id="skill-gap-section-title" className="skill-gap-section__title">
            Skill Gap Summary
          </h2>

          <p className="skill-gap-section__description">
            Identify the skills that need attention and take the next step
            toward your target competency.
          </p>
        </div>

        <button
          type="button"
          className="skill-gap-section__view-all"
          onClick={onViewSkillGaps}
        >
          <span>View All Skill Gaps</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      {/* ============================================================
          TOP GRID
      ============================================================ */}

      <div className="skill-gap-section__top-grid">
        {/* ========================================================
            BIGGEST GAP — DARK CARD
        ======================================================== */}

        <Card variant="navy" className="skill-biggest-gap-card">
          <div className="skill-biggest-gap-card__content">
            <div className="skill-biggest-gap-card__top">
              <div>
                <span className="skill-gap-card__eyebrow skill-gap-card__eyebrow--dark">
                  BIGGEST SKILL GAP
                </span>

                <div className="skill-biggest-gap-card__title-row">
                  <h3>{biggestGap.name}</h3>

                  <span className="skill-biggest-gap-card__gap-badge">
                    Gap {biggestGap.gap}
                  </span>
                </div>

                <p className="skill-biggest-gap-card__category">
                  {biggestGap.category}
                </p>
              </div>

              <span className="skill-biggest-gap-card__alert-icon">
                <FiAlertCircle aria-hidden="true" />
              </span>
            </div>

            <p className="skill-biggest-gap-card__description">
              {biggestGap.description}
            </p>

            {/* Current → Target */}

            <div className="skill-biggest-gap-card__levels">
              <div className="skill-biggest-gap-card__level">
                <span>Current Level</span>
                <strong>{biggestGap.currentLevel}/5</strong>
              </div>

              <div className="skill-biggest-gap-card__level-arrow">
                <FiArrowRight aria-hidden="true" />
              </div>

              <div className="skill-biggest-gap-card__level">
                <span>Target Level</span>
                <strong>{biggestGap.targetLevel}/5</strong>
              </div>
            </div>

            {/* Progress */}

            <div className="skill-biggest-gap-card__progress">
              <div className="skill-biggest-gap-card__progress-header">
                <span>Current competency</span>

                <span>
                  {Math.round(getLevelPercentage(biggestGap.currentLevel))}%
                </span>
              </div>

              <ProgressBar
                value={getLevelPercentage(biggestGap.currentLevel)}
                max={100}
                variant="danger"
                appearance="solid"
                size="sm"
                radius="pill"
                animated
              />
            </div>

            {/* Action */}

            <button
              type="button"
              className="skill-biggest-gap-card__action"
              onClick={onExploreTraining}
            >
              <span>Explore Training</span>

              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </Card>

        {/* ========================================================
            GAP SUMMARY — LIGHT CARD
        ======================================================== */}

        <Card variant="default" className="skill-gap-summary-card">
          <div className="skill-gap-summary-card__header">
            <div>
              <span className="skill-gap-card__eyebrow">YOUR OVERVIEW</span>

              <h3>Gap Summary</h3>
            </div>

            <span className="skill-gap-summary-card__icon">
              <FiTarget aria-hidden="true" />
            </span>
          </div>

          <div className="skill-gap-summary-card__main">
            <div className="skill-gap-summary-card__score">
              <strong>{skillGaps.length}</strong>
              <span>Skills need attention</span>
            </div>

            <div className="skill-gap-summary-card__status">
              <span className="skill-gap-summary-card__status-icon">
                <FiTrendingDown aria-hidden="true" />
              </span>

              <div>
                <strong>Moderate Gap</strong>

                <span>Focus on your highest-priority skills first.</span>
              </div>
            </div>
          </div>

          <div className="skill-gap-summary-card__stats">
            <div className="skill-gap-summary-card__stat">
              <span className="skill-gap-summary-card__stat-icon skill-gap-summary-card__stat-icon--danger">
                <FiAlertCircle aria-hidden="true" />
              </span>

              <div>
                <strong>{criticalGaps}</strong>
                <span>Critical gap</span>
              </div>
            </div>

            <div className="skill-gap-summary-card__stat">
              <span className="skill-gap-summary-card__stat-icon skill-gap-summary-card__stat-icon--warning">
                <FiTrendingUp aria-hidden="true" />
              </span>

              <div>
                <strong>{totalGapLevels}</strong>
                <span>Levels to improve</span>
              </div>
            </div>

            <div className="skill-gap-summary-card__stat">
              <span className="skill-gap-summary-card__stat-icon skill-gap-summary-card__stat-icon--success">
                <FiCheckCircle aria-hidden="true" />
              </span>

              <div>
                <strong>{onTrackSkills}</strong>
                <span>Skills on track</span>
              </div>
            </div>
          </div>

          <div className="skill-gap-summary-card__footer">
            <div className="skill-gap-summary-card__footer-text">
              <FiBookOpen aria-hidden="true" />

              <span>
                Training recommendations are based on your current skill gaps.
              </span>
            </div>

            <button
              type="button"
              onClick={onExploreTraining}
              className="skill-gap-summary-card__footer-action"
            >
              Find Training
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </Card>
      </div>

      {/* ============================================================
          SKILL GAP LIST
      ============================================================ */}

      <Card variant="default" className="skill-gap-list-card">
        <div className="skill-gap-list-card__header">
          <div>
            <span className="skill-gap-card__eyebrow">AREAS TO DEVELOP</span>

            <h3>Your Skill Gaps</h3>
          </div>

          <Badge variant="warning" size="sm">
            {skillGaps.length} gaps identified
          </Badge>
        </div>

        <div className="skill-gap-list">
          {skillGaps.map((skill) => (
            <article
              className={`skill-gap-item skill-gap-item--${skill.variant}`}
              key={skill.id}
            >
              {/* Skill identity */}

              <div className="skill-gap-item__identity">
                <span
                  className={`skill-gap-item__icon skill-gap-item__icon--${skill.variant}`}
                >
                  {skill.icon}
                </span>

                <div className="skill-gap-item__identity-text">
                  <h4>{skill.name}</h4>
                  <span>{skill.category}</span>
                </div>
              </div>

              {/* Current / Target */}

              <div className="skill-gap-item__levels">
                <div>
                  <span>Current</span>
                  <strong>{skill.currentLevel}/5</strong>
                </div>

                <FiArrowRight aria-hidden="true" />

                <div>
                  <span>Target</span>
                  <strong>{skill.targetLevel}/5</strong>
                </div>
              </div>

              {/* Progress */}

              <div className="skill-gap-item__progress">
                <div className="skill-gap-item__progress-header">
                  <span>Current competency</span>

                  <strong>
                    {Math.round(getLevelPercentage(skill.currentLevel))}%
                  </strong>
                </div>

                <ProgressBar
                  value={getLevelPercentage(skill.currentLevel)}
                  max={100}
                  variant={getProgressVariant(skill.gap)}
                  appearance="solid"
                  size="sm"
                  radius="pill"
                  animated
                />
              </div>

              {/* Gap */}

              <div className="skill-gap-item__gap">
                <Badge variant={skill.variant} size="sm">
                  Gap {skill.gap}
                </Badge>

                <span>
                  {skill.gap === 1 ? "Near target" : "Needs development"}
                </span>
              </div>

              {/* Action */}

              <button
                type="button"
                className="skill-gap-item__action"
                onClick={onExploreTraining}
                aria-label={`Explore training for ${skill.name}`}
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </Card>

      {/* ============================================================
          BOTTOM MESSAGE
      ============================================================ */}

      <div className="skill-gap-section__bottom-message">
        <div>
          <FiTarget aria-hidden="true" />

          <span>
            Closing your skill gaps can help you move closer to your target
            competency.
          </span>
        </div>

        <button type="button" onClick={onViewSkillGaps}>
          Review Skill Gaps
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default SkillGapCard;
