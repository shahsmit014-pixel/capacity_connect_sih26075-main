import React, { useEffect, useState } from "react";
import { FiLoader, FiRefreshCw, FiActivity } from "react-icons/fi";
import "./Loader.css";

/* =========================================================
   HELPERS
========================================================= */

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getProgress = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) return 0;

  return clamp(number, 0, 100);
};

/* =========================================================
   SPINNER
========================================================= */

const Spinner = ({
  size = "md",
  thickness = "normal",
  variant = "default",
}) => {
  return (
    <span
      className={[
        "cc-loader-spinner",
        `cc-loader-size-${size}`,
        `cc-loader-thickness-${thickness}`,
        `cc-loader-spinner-${variant}`,
      ].join(" ")}
      aria-hidden="true"
    />
  );
};

/* =========================================================
   RING
========================================================= */

const Ring = ({
  size = "md",
  progress,
  showProgress = false,
  variant = "default",
}) => {
  const value = progress === undefined ? null : getProgress(progress);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const offset =
    value === null ? 0 : circumference - (value / 100) * circumference;

  return (
    <span
      className={[
        "cc-loader-ring",
        `cc-loader-size-${size}`,
        `cc-loader-ring-${variant}`,
        value === null ? "cc-loader-ring-indeterminate" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="cc-loader-ring-svg">
        <circle className="cc-loader-ring-track" cx="50" cy="50" r={radius} />

        <circle
          className="cc-loader-ring-value"
          cx="50"
          cy="50"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      {showProgress && value !== null && (
        <span className="cc-loader-ring-label">{Math.round(value)}%</span>
      )}
    </span>
  );
};

/* =========================================================
   DOTS
========================================================= */

const Dots = ({ size = "md", variant = "default" }) => {
  return (
    <span
      className={[
        "cc-loader-dots",
        `cc-loader-size-${size}`,
        `cc-loader-dots-${variant}`,
      ].join(" ")}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
};

/* =========================================================
   PULSE
========================================================= */

const Pulse = ({ size = "md", variant = "default" }) => {
  return (
    <span
      className={[
        "cc-loader-pulse",
        `cc-loader-size-${size}`,
        `cc-loader-pulse-${variant}`,
      ].join(" ")}
      aria-hidden="true"
    >
      <i />
    </span>
  );
};

/* =========================================================
   BARS
========================================================= */

const Bars = ({ size = "md", variant = "default" }) => {
  return (
    <span
      className={[
        "cc-loader-bars",
        `cc-loader-size-${size}`,
        `cc-loader-bars-${variant}`,
      ].join(" ")}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
};

/* =========================================================
   ORBIT
========================================================= */

const Orbit = ({ size = "md", variant = "default" }) => {
  return (
    <span
      className={[
        "cc-loader-orbit",
        `cc-loader-size-${size}`,
        `cc-loader-orbit-${variant}`,
      ].join(" ")}
      aria-hidden="true"
    >
      <span className="cc-loader-orbit-center">
        <FiActivity />
      </span>

      <span className="cc-loader-orbit-ring">
        <i />
      </span>
    </span>
  );
};

/* =========================================================
   PROGRESS BAR
========================================================= */

const ProgressLoader = ({
  progress = 0,
  size = "md",
  variant = "default",
  showProgress = false,
}) => {
  const value = getProgress(progress);

  return (
    <div
      className={[
        "cc-loader-progress",
        `cc-loader-progress-${size}`,
        `cc-loader-progress-${variant}`,
      ].join(" ")}
    >
      <div className="cc-loader-progress-track">
        <div
          className="cc-loader-progress-value"
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      {showProgress && (
        <span className="cc-loader-progress-text">{Math.round(value)}%</span>
      )}
    </div>
  );
};

/* =========================================================
   SKELETON
========================================================= */

export const Skeleton = ({
  width = "100%",
  height = "16px",
  radius = "8px",
  variant = "default",
  className = "",
  style = {},
  ...props
}) => {
  return (
    <span
      className={["cc-skeleton", `cc-skeleton-${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};

/* =========================================================
   TEXT SKELETON
========================================================= */

export const TextSkeleton = ({
  lines = 3,
  lastWidth = "65%",
  gap = "9px",
  height = "12px",
  radius = "6px",
  className = "",
}) => {
  return (
    <div
      className={["cc-text-skeleton", className].filter(Boolean).join(" ")}
      style={{
        gap,
      }}
      aria-hidden="true"
    >
      {Array.from({
        length: lines,
      }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? lastWidth : "100%"}
          height={height}
          radius={radius}
        />
      ))}
    </div>
  );
};

/* =========================================================
   CARD SKELETON
========================================================= */

export const CardSkeleton = ({
  avatar = false,
  lines = 3,
  image = false,
  className = "",
}) => {
  return (
    <div
      className={["cc-card-skeleton", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {image && <Skeleton width="100%" height="180px" radius="16px" />}

      <div className="cc-card-skeleton-body">
        <div className="cc-card-skeleton-heading">
          {avatar && <Skeleton width="42px" height="42px" radius="50%" />}

          <div className="cc-card-skeleton-title">
            <Skeleton width="150px" height="15px" />

            <Skeleton width="95px" height="10px" />
          </div>
        </div>

        <TextSkeleton lines={lines} />
      </div>
    </div>
  );
};

/* =========================================================
   TABLE SKELETON
========================================================= */

export const TableSkeleton = ({ rows = 5, columns = 4, className = "" }) => {
  return (
    <div
      className={["cc-table-skeleton", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="cc-table-skeleton-head">
        {Array.from({
          length: columns,
        }).map((_, index) => (
          <Skeleton
            key={index}
            width={index === 0 ? "130px" : "90px"}
            height="13px"
          />
        ))}
      </div>

      {Array.from({
        length: rows,
      }).map((_, row) => (
        <div className="cc-table-skeleton-row" key={row}>
          {Array.from({
            length: columns,
          }).map((_, column) => (
            <Skeleton
              key={column}
              width={column === 0 ? "150px" : "80px"}
              height="12px"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   MAIN LOADER
========================================================= */

const Loader = ({
  type = "spinner",

  size = "md",

  variant = "default",

  thickness = "normal",

  progress,

  showProgress = false,

  label,
  sublabel,

  icon,

  fullscreen = false,

  overlay = false,

  blur = false,

  centered = false,

  delay = 0,

  minHeight,

  className = "",

  children,

  ...props
}) => {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (!delay) {
      setVisible(true);
      return undefined;
    }

    setVisible(false);

    const timer = setTimeout(() => setVisible(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) {
    return null;
  }

  const renderLoader = () => {
    switch (type) {
      case "ring":
        return (
          <Ring
            size={size}
            progress={progress}
            showProgress={showProgress}
            variant={variant}
          />
        );

      case "dots":
        return <Dots size={size} variant={variant} />;

      case "pulse":
        return <Pulse size={size} variant={variant} />;

      case "bars":
        return <Bars size={size} variant={variant} />;

      case "orbit":
        return <Orbit size={size} variant={variant} />;

      case "progress":
        return (
          <ProgressLoader
            progress={progress}
            size={size}
            variant={variant}
            showProgress={showProgress}
          />
        );

      case "custom":
        return children;

      case "spinner":
      default:
        return <Spinner size={size} thickness={thickness} variant={variant} />;
    }
  };

  const content = (
    <div
      className={["cc-loader-content", centered ? "cc-loader-centered" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <span className="cc-loader-custom-icon">{icon}</span>}

      {renderLoader()}

      {label && <span className="cc-loader-label">{label}</span>}

      {sublabel && <span className="cc-loader-sublabel">{sublabel}</span>}
    </div>
  );

  const wrapperClasses = [
    "cc-loader-wrapper",

    `cc-loader-wrapper-${variant}`,

    fullscreen ? "cc-loader-fullscreen" : "",

    overlay ? "cc-loader-overlay" : "",

    blur ? "cc-loader-blur" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      style={
        minHeight
          ? {
              minHeight,
            }
          : undefined
      }
      role="status"
      aria-live="polite"
      {...props}
    >
      {content}
    </div>
  );
};

/* =========================================================
   BUTTON LOADER
========================================================= */

export const ButtonLoader = ({ size = "sm", variant = "default" }) => {
  return (
    <span
      className={[
        "cc-button-loader",
        `cc-button-loader-${size}`,
        `cc-button-loader-${variant}`,
      ].join(" ")}
      aria-hidden="true"
    >
      <span />
    </span>
  );
};

/* =========================================================
   LOADING BUTTON CONTENT
========================================================= */

export const LoadingContent = ({
  loading = false,
  loadingText = "Loading...",
  children,
  loaderSize = "sm",
}) => {
  if (!loading) {
    return children;
  }

  return (
    <span className="cc-loading-content">
      <ButtonLoader size={loaderSize} />
      <span>{loadingText}</span>
    </span>
  );
};

/* =========================================================
   FULLSCREEN LOADER
========================================================= */

export const FullscreenLoader = ({
  label = "Loading Capacity Connect",
  sublabel = "Please wait...",
  type = "orbit",
  variant = "glass",
}) => {
  return (
    <Loader
      fullscreen
      type={type}
      variant={variant}
      size="lg"
      label={label}
      sublabel={sublabel}
    />
  );
};

/* =========================================================
   PAGE LOADER
========================================================= */

export const PageLoader = ({
  label = "Loading...",
  type = "spinner",
  variant = "default",
  minHeight = "320px",
}) => {
  return (
    <Loader
      type={type}
      variant={variant}
      size="lg"
      label={label}
      centered
      minHeight={minHeight}
    />
  );
};

export default Loader;
