import {
  FiCheck,
  FiClock,
  FiMinus,
  FiTrendingUp,
  FiAlertTriangle,
} from "react-icons/fi";

import "./ProgressBar.css";

const STATUS_CONFIG = {
  success: {
    icon: <FiCheck />,
    label: "Completed",
  },
  warning: {
    icon: <FiClock />,
    label: "In Progress",
  },
  danger: {
    icon: <FiAlertTriangle />,
    label: "Needs Attention",
  },
  info: {
    icon: <FiTrendingUp />,
    label: "Improving",
  },
  neutral: {
    icon: <FiMinus />,
    label: "Not Started",
  },
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ProgressBar = ({
  value = 0,
  max = 100,

  label,
  description,

  showValue = false,
  showPercentage = false,

  valueFormatter,

  variant = "primary",
  appearance = "solid",

  size = "md",
  radius = "pill",

  animated = true,
  striped = false,
  shimmer = false,

  glow = false,

  indeterminate = false,

  showIcon = false,
  icon,

  status,

  showStatus = false,

  milestones = [],

  segments = [],

  steps = [],

  showMilestones = false,

  minLabel,
  maxLabel,

  prefix = "",
  suffix = "",

  thickness,

  width,

  height,

  customColor,

  backgroundColor,

  gradient,

  transitionDuration = 700,

  className = "",

  onClick,

  clickable = false,

  disabled = false,

  ariaLabel,

  ...props
}) => {
  const safeMax = max <= 0 ? 100 : max;

  const numericValue = Number(value) || 0;

  const percentage = indeterminate
    ? 0
    : clamp((numericValue / safeMax) * 100, 0, 100);

  const roundedPercentage = Math.round(percentage);

  const formattedValue = valueFormatter
    ? valueFormatter(numericValue, safeMax, percentage)
    : `${prefix}${numericValue}${suffix}`;

  const statusConfig =
    status && STATUS_CONFIG[status] ? STATUS_CONFIG[status] : null;

  const classes = [
    "progress",
    `progress-${variant}`,
    `progress-${appearance}`,
    `progress-${size}`,
    `progress-${radius}`,

    animated ? "progress-animated" : "",
    striped ? "progress-striped" : "",
    shimmer ? "progress-shimmer" : "",
    glow ? "progress-glow" : "",

    indeterminate ? "progress-indeterminate" : "",

    clickable || onClick ? "progress-clickable" : "",

    disabled ? "progress-disabled" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const progressStyle = {
    "--progress-value": `${percentage}%`,
    "--progress-duration": `${transitionDuration}ms`,
    ...(customColor ? { "--progress-color": customColor } : {}),
    ...(backgroundColor ? { "--progress-track": backgroundColor } : {}),
    ...(gradient ? { "--progress-gradient": gradient } : {}),
    ...(thickness ? { "--progress-thickness": thickness } : {}),
    ...(width ? { width } : {}),
    ...(height ? { "--progress-height": height } : {}),
  };

  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick({
        value: numericValue,
        max: safeMax,
        percentage,
      });
    }
  };

  return (
    <div
      className={classes}
      style={progressStyle}
      onClick={clickable ? handleClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {(label || showValue || showStatus) && (
        <div className="progress-header">
          <div className="progress-heading">
            {label && <span className="progress-label">{label}</span>}

            {description && (
              <span className="progress-description">{description}</span>
            )}
          </div>

          <div className="progress-meta">
            {showStatus && statusConfig && (
              <span className="progress-status">
                {statusConfig.icon}
                {statusConfig.label}
              </span>
            )}

            {showIcon && <span className="progress-header-icon">{icon}</span>}

            {(showValue || showPercentage) && (
              <span className="progress-value">
                {showValue && formattedValue}

                {showPercentage && `${roundedPercentage}%`}
              </span>
            )}
          </div>
        </div>
      )}

      {minLabel || maxLabel ? (
        <div className="progress-scale">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      ) : null}

      <div className="progress-track">
        {segments.length > 0 ? (
          <div className="progress-segments">
            {segments.map((segment, index) => {
              const segmentValue = Number(segment.value) || 0;

              const segmentPercentage = clamp(
                (segmentValue / safeMax) * 100,
                0,
                100,
              );

              return (
                <div
                  key={segment.id || index}
                  className="progress-segment"
                  style={{
                    width: `${segmentPercentage}%`,
                    "--segment-color": segment.color || "var(--progress-color)",
                  }}
                  title={
                    segment.label
                      ? `${segment.label}: ${segmentValue}`
                      : undefined
                  }
                />
              );
            })}
          </div>
        ) : (
          <div
            className="progress-fill"
            style={{
              width: indeterminate ? undefined : `${percentage}%`,
            }}
          >
            {shimmer && <span className="progress-shimmer-layer" />}
          </div>
        )}

        {showMilestones && milestones.length > 0 && (
          <div className="progress-milestones">
            {milestones.map((milestone, index) => {
              const position = clamp(Number(milestone.value) || 0, 0, safeMax);

              const milestonePercentage = (position / safeMax) * 100;

              const reached = numericValue >= position;

              return (
                <span
                  key={milestone.id || index}
                  className={[
                    "progress-milestone",
                    reached ? "milestone-reached" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    left: `${milestonePercentage}%`,
                  }}
                  title={milestone.label}
                >
                  <span className="milestone-dot" />

                  {milestone.label && (
                    <span className="milestone-label">{milestone.label}</span>
                  )}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {steps.length > 0 && (
        <div className="progress-steps">
          {steps.map((step, index) => {
            const reached =
              index < Math.ceil((percentage / 100) * steps.length);

            return (
              <div
                key={step.id || index}
                className={[
                  "progress-step",
                  reached ? "progress-step-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="step-number">
                  {reached ? <FiCheck /> : index + 1}
                </span>

                <span className="step-label">{step.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
