import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiInfo,
  FiLoader,
  FiLock,
  FiMinus,
  FiStar,
  FiTrendingDown,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
  FiX,
  FiXCircle,
  FiZap,
} from "react-icons/fi";

import "./Badge.css";

const DEFAULT_ICONS = {
  success: <FiCheckCircle />,
  warning: <FiAlertCircle />,
  danger: <FiXCircle />,
  error: <FiXCircle />,
  info: <FiInfo />,
  pending: <FiClock />,
  completed: <FiCheckCircle />,
  active: <FiCheck />,
  inactive: <FiMinus />,
  locked: <FiLock />,
  verified: <FiUserCheck />,
  popular: <FiStar />,
  trending: <FiTrendingUp />,
  growth: <FiTrendingUp />,
  declining: <FiTrendingDown />,
  new: <FiZap />,
};

const Badge = ({
  children,

  variant = "neutral",
  appearance = "soft",

  size = "md",
  shape = "pill",

  icon,
  iconPosition = "left",

  dot = false,
  dotPulse = false,

  removable = false,
  onRemove,

  clickable = false,
  onClick,

  loading = false,

  count,
  maxCount = 99,

  status,

  avatar,
  avatarAlt = "",

  showIcon = true,

  bordered = false,
  glow = false,

  gradient = false,

  uppercase = false,

  truncate = false,

  fullWidth = false,

  className = "",

  style,

  title,

  ...props
}) => {
  const statusIcon =
    status && DEFAULT_ICONS[status] ? DEFAULT_ICONS[status] : null;

  const finalIcon = icon !== undefined ? icon : showIcon ? statusIcon : null;

  const displayedCount =
    typeof count === "number" && count > maxCount ? `${maxCount}+` : count;

  const classes = [
    "badge",

    `badge-${variant}`,
    `badge-${appearance}`,

    `badge-${size}`,
    `badge-${shape}`,

    clickable ? "badge-clickable" : "",
    removable ? "badge-removable" : "",

    dot ? "badge-has-dot" : "",
    dotPulse ? "badge-dot-pulse" : "",

    loading ? "badge-loading" : "",

    bordered ? "badge-bordered" : "",
    glow ? "badge-glow" : "",

    gradient ? "badge-gradient" : "",

    uppercase ? "badge-uppercase" : "",

    truncate ? "badge-truncate" : "",

    fullWidth ? "badge-full-width" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {dot && <span className="badge-dot" aria-hidden="true" />}

      {avatar && <img src={avatar} alt={avatarAlt} className="badge-avatar" />}

      {finalIcon && iconPosition === "left" && (
        <span className="badge-icon badge-icon-left">{finalIcon}</span>
      )}

      {loading && (
        <span className="badge-loading-icon">
          <FiLoader />
        </span>
      )}

      <span className="badge-content">{children}</span>

      {finalIcon && iconPosition === "right" && (
        <span className="badge-icon badge-icon-right">{finalIcon}</span>
      )}

      {typeof count === "number" && (
        <span className="badge-count">{displayedCount}</span>
      )}

      {removable && (
        <button
          type="button"
          className="badge-remove"
          onClick={(event) => {
            event.stopPropagation();

            if (onRemove) {
              onRemove(event);
            }
          }}
          aria-label={`Remove ${children || "badge"}`}
        >
          <FiX />
        </button>
      )}
    </>
  );

  if (clickable || onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        title={title}
        style={style}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={classes} title={title} style={style} {...props}>
      {content}
    </span>
  );
};

export default Badge;
