import "./Card.css";

import {
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiMoreVertical,
  FiPlay,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

const Card = ({
  children,

  variant = "default",
  size = "md",

  title,
  subtitle,
  description,

  icon,
  image,

  badge,
  badgeVariant = "default",

  value,
  label,
  trend,
  trendType = "positive",

  progress,
  progressLabel,

  meta,
  footer,

  action,
  actionText = "View Details",
  actionIcon = <FiArrowRight />,

  onClick,
  onAction,

  loading = false,
  disabled = false,

  hover = true,
  clickable = false,
  fullWidth = false,

  rounded = "lg",

  className = "",


  ...props
}) => {
  const classes = [
    "card",
    `card-${variant}`,
    `card-${size}`,
    `card-rounded-${rounded}`,
    hover ? "card-hover" : "",
    clickable ? "card-clickable" : "",
    fullWidth ? "card-full" : "",
    loading ? "card-loading" : "",
    disabled ? "card-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleAction = (event) => {
    event.stopPropagation();

    if (onAction) {
      onAction(event);
    }
  };

  const handleCardClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  return (
    <article className={classes} onClick={handleCardClick} {...props}>
      {loading ? (
        <div className="card-loader">
          <span className="card-loader-spinner"></span>
        </div>
      ) : (
        <>
          {image && (
            <div className="card-image-wrapper">
              <img
                src={image}
                alt={title || "Card image"}
                className="card-image"
              />

              {badge && (
                <span className={`card-image-badge card-badge-${badgeVariant}`}>
                  {badge}
                </span>
              )}
            </div>
          )}

          {!image && (icon || badge) && (
            <div className="card-top">
              {icon && <div className="card-icon">{icon}</div>}

              {badge && (
                <span className={`card-badge card-badge-${badgeVariant}`}>
                  {badge}
                </span>
              )}
            </div>
          )}

          {(title || subtitle || description) && (
            <div className="card-header">
              <div className="card-title-row">
                <div>
                  {title && <h3 className="card-title">{title}</h3>}

                  {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>

                {action && (
                  <button
                    type="button"
                    className="card-more"
                    onClick={handleAction}
                    aria-label="More options"
                  >
                    <FiMoreVertical />
                  </button>
                )}
              </div>

              {description && <p className="card-description">{description}</p>}
            </div>
          )}

          {value !== undefined && (
            <div className="card-stat">
              <span className="card-stat-value">{value}</span>

              {label && <span className="card-stat-label">{label}</span>}

              {trend && (
                <span className={`card-trend ${trendType}`}>
                  {trendType === "positive" && <FiTrendingUp />}
                  {trendType === "negative" && <FiTrendingUp />}
                  {trend}
                </span>
              )}
            </div>
          )}

          {progress !== undefined && (
            <div className="card-progress">
              <div className="card-progress-header">
                <span>{progressLabel || "Progress"}</span>

                <strong>{progress}%</strong>
              </div>

              <div className="card-progress-track">
                <div
                  className="card-progress-fill"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {meta && <div className="card-meta">{meta}</div>}

          <div className="card-body">{children}</div>

          {(footer || onAction) && (
            <div className="card-footer">
              {footer}

              {onAction && (
                <button
                  type="button"
                  className="card-action"
                  onClick={handleAction}
                >
                  {actionText}
                  {actionIcon}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default Card;
