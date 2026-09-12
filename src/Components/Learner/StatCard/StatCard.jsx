import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import "./StatCard.css";

/* =========================================================
   ICON MAP
========================================================= */

const iconMap = {
  courses: FiBookOpen,
  completed: FiCheckCircle,
  certificates: FiAward,
  progress: FiTrendingUp,
  learning: FiClock,
  skills: FiTarget,
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title = "Stat",
  value = "0",
  description = "",
  icon = "courses",
  variant = "ocean",
  trend,
  trendType = "positive",
  onClick,
}) => {
  const Icon = iconMap[icon] || FiBookOpen;

  const cardClassName = [
    "stat-card",
    `stat-card--${variant}`,
    onClick ? "stat-card--clickable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cardClassName}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick(event);
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* ================================================
          TOP ROW
      ================================================= */}

      <div className="stat-card__top">
        <div className="stat-card__icon">
          <Icon aria-hidden="true" />
        </div>

        {trend && (
          <span className={`stat-card__trend stat-card__trend--${trendType}`}>
            <FiTrendingUp aria-hidden="true" />
            <span>{trend}</span>
          </span>
        )}
      </div>

      {/* ================================================
          CONTENT
      ================================================= */}

      <div className="stat-card__content">
        <span className="stat-card__title">{title}</span>

        <div className="stat-card__value-row">
          <strong className="stat-card__value">{value}</strong>
        </div>

        {description && (
          <span className="stat-card__description">{description}</span>
        )}
      </div>

      {/* ================================================
          DECORATIVE ELEMENT
      ================================================= */}

      <span
        className="stat-card__decorative-circle stat-card__decorative-circle--one"
        aria-hidden="true"
      />

      <span
        className="stat-card__decorative-circle stat-card__decorative-circle--two"
        aria-hidden="true"
      />
    </article>
  );
};

export default StatCard;
