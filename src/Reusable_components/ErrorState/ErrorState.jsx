import React from "react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiXCircle,
  FiWifiOff,
  FiServer,
  FiShield,
  FiLock,
  FiUserX,
  FiClock,
  FiRefreshCw,
  FiArrowLeft,
  FiHome,
  FiHelpCircle,
  FiMail,
  FiSearch,
  FiFileText,
  FiDatabase,
  FiCloudOff,
  FiSlash,
  FiZap,
  FiActivity,
  FiUploadCloud,
  FiSend,
  FiLogIn,
  FiSettings,
  FiTool,
} from "react-icons/fi";

import "./ErrorState.css";

/* =========================================================
   ERROR PRESETS
========================================================= */

const ERROR_PRESETS = {
  default: {
    icon: FiAlertCircle,
    title: "Something went wrong",
    description: "We couldn't complete your request. Please try again.",
    code: "ERROR",
  },

  network: {
    icon: FiWifiOff,
    title: "Connection lost",
    description:
      "We couldn't connect to the server. Check your internet connection and try again.",
    code: "NETWORK_ERROR",
  },

  offline: {
    icon: FiCloudOff,
    title: "You're offline",
    description:
      "Your device appears to be offline. Reconnect to the internet and try again.",
    code: "OFFLINE",
  },

  server: {
    icon: FiServer,
    title: "Server unavailable",
    description:
      "Our server couldn't process your request. Please try again in a moment.",
    code: "SERVER_ERROR",
  },

  server500: {
    icon: FiServer,
    title: "Internal server error",
    description:
      "Something went wrong on our side. Our team may already be looking into it.",
    code: "500",
  },

  notFound: {
    icon: FiSearch,
    title: "Page not found",
    description:
      "The page you're looking for doesn't exist or may have been moved.",
    code: "404",
  },

  unauthorized: {
    icon: FiLogIn,
    title: "Authentication required",
    description: "Please sign in to continue accessing this resource.",
    code: "401",
  },

  forbidden: {
    icon: FiShield,
    title: "Access denied",
    description: "You don't have permission to access this resource.",
    code: "403",
  },

  locked: {
    icon: FiLock,
    title: "Access locked",
    description:
      "This resource is currently locked or unavailable for your account.",
    code: "LOCKED",
  },

  sessionExpired: {
    icon: FiClock,
    title: "Your session has expired",
    description:
      "For your security, you've been signed out. Please sign in again.",
    code: "SESSION_EXPIRED",
  },

  userNotFound: {
    icon: FiUserX,
    title: "User not found",
    description: "We couldn't find the user or profile you're looking for.",
    code: "USER_NOT_FOUND",
  },

  data: {
    icon: FiDatabase,
    title: "Couldn't load data",
    description: "We couldn't retrieve the requested data. Please try again.",
    code: "DATA_ERROR",
  },

  database: {
    icon: FiDatabase,
    title: "Data service unavailable",
    description:
      "We're having trouble accessing the data right now. Please try again later.",
    code: "DATABASE_ERROR",
  },

  timeout: {
    icon: FiClock,
    title: "Request timed out",
    description: "The request took longer than expected. Please try again.",
    code: "TIMEOUT",
  },

  rateLimit: {
    icon: FiZap,
    title: "Too many requests",
    description:
      "You've made too many requests in a short period. Please wait a moment and try again.",
    code: "429",
  },

  validation: {
    icon: FiAlertTriangle,
    title: "Something needs attention",
    description:
      "Some information is missing or invalid. Review your details and try again.",
    code: "VALIDATION_ERROR",
  },

  upload: {
    icon: FiUploadCloud,
    title: "Upload failed",
    description: "We couldn't upload your file. Check the file and try again.",
    code: "UPLOAD_ERROR",
  },

  submission: {
    icon: FiSend,
    title: "Submission failed",
    description:
      "We couldn't submit your information. Please review it and try again.",
    code: "SUBMISSION_ERROR",
  },

  assessment: {
    icon: FiFileText,
    title: "Assessment couldn't be completed",
    description:
      "We couldn't save your assessment. Your progress may not have been recorded.",
    code: "ASSESSMENT_ERROR",
  },

  course: {
    icon: FiFileText,
    title: "Couldn't load course",
    description:
      "We couldn't retrieve this course right now. Please try again.",
    code: "COURSE_ERROR",
  },

  profile: {
    icon: FiUserX,
    title: "Couldn't load profile",
    description: "We couldn't retrieve the profile information at this time.",
    code: "PROFILE_ERROR",
  },

  permission: {
    icon: FiShield,
    title: "Permission required",
    description:
      "You don't have the required permission to perform this action.",
    code: "PERMISSION_ERROR",
  },

  maintenance: {
    icon: FiTool,
    title: "We'll be back shortly",
    description:
      "Capacity Connect is temporarily unavailable while we perform maintenance.",
    code: "MAINTENANCE",
  },

  unavailable: {
    icon: FiSlash,
    title: "Temporarily unavailable",
    description:
      "This feature isn't available right now. Please try again later.",
    code: "UNAVAILABLE",
  },

  service: {
    icon: FiActivity,
    title: "Service temporarily unavailable",
    description:
      "This service is experiencing an issue. Please try again shortly.",
    code: "SERVICE_ERROR",
  },

  configuration: {
    icon: FiSettings,
    title: "Configuration error",
    description:
      "Something isn't configured correctly. Please contact support if the problem continues.",
    code: "CONFIG_ERROR",
  },

  generic: {
    icon: FiXCircle,
    title: "Unable to complete request",
    description: "Something unexpected happened. Please try again.",
    code: "UNKNOWN_ERROR",
  },
};

/* =========================================================
   SIZE SYSTEM
========================================================= */

const SIZE_CLASSES = {
  xs: "cc-error-xs",
  sm: "cc-error-sm",
  md: "cc-error-md",
  lg: "cc-error-lg",
  xl: "cc-error-xl",
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ErrorState = ({
  type = "default",

  icon: CustomIcon,

  title,
  description,

  errorCode,
  statusCode,

  action,
  secondaryAction,

  actionLabel,
  secondaryActionLabel,

  onAction,
  onSecondaryAction,

  actionIcon,
  secondaryActionIcon,

  size = "md",
  variant = "default",

  align = "center",

  iconStyle = "soft",

  iconSize,

  eyebrow,

  badge,
  badgeIcon,

  meta,

  details,

  illustration,

  children,

  showBack = false,
  onBack,
  backLabel = "Go back",

  showHome = false,
  onHome,
  homeLabel = "Go home",

  showRefresh = false,
  onRefresh,
  refreshLabel = "Try again",

  showSupport = false,
  onSupport,
  supportLabel = "Contact support",

  showRetry = false,
  onRetry,
  retryLabel = "Retry",

  loading = false,

  disabled = false,

  compact = false,

  bordered = false,

  elevated = false,

  glass = false,

  fullWidth = true,

  minHeight,

  className = "",

  ...props
}) => {
  const preset = ERROR_PRESETS[type] || ERROR_PRESETS.default;

  const PresetIcon = preset.icon;

  const Icon = CustomIcon || PresetIcon;

  const finalTitle = title || preset.title;

  const finalDescription = description || preset.description;

  const finalCode = errorCode || statusCode || preset.code;

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }

    if (onAction) {
      onAction();
    }
  };

  const renderPrimaryAction = () => {
    if (action) {
      return action;
    }

    if (!actionLabel) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-error-action cc-error-action-primary"
        onClick={handleAction}
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="cc-error-button-loader" />
        ) : (
          actionIcon || <FiRefreshCw />
        )}

        <span>{loading ? "Please wait..." : actionLabel}</span>
      </button>
    );
  };

  const renderSecondaryAction = () => {
    if (secondaryAction) {
      return secondaryAction;
    }

    if (!secondaryActionLabel) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-error-action cc-error-action-secondary"
        onClick={handleSecondaryAction}
        disabled={disabled || loading}
      >
        {secondaryActionIcon || <FiArrowLeft />}

        <span>{secondaryActionLabel}</span>
      </button>
    );
  };

  const renderRetry = () => {
    if (!showRetry && !onRetry) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-error-link-action"
        onClick={handleRetry}
        disabled={disabled || loading}
      >
        <FiRefreshCw />

        <span>{retryLabel}</span>
      </button>
    );
  };

  const renderBack = () => {
    if (!showBack) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-error-link-action"
        onClick={onBack}
        disabled={disabled || loading}
      >
        <FiArrowLeft />

        <span>{backLabel}</span>
      </button>
    );
  };

  const renderHome = () => {
    if (!showHome) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-error-link-action"
        onClick={onHome}
        disabled={disabled || loading}
      >
        <FiHome />

        <span>{homeLabel}</span>
      </button>
    );
  };

  const renderSupport = () => {
    if (!showSupport) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-error-link-action"
        onClick={onSupport}
        disabled={disabled || loading}
      >
        <FiMail />

        <span>{supportLabel}</span>
      </button>
    );
  };

  const hasActions =
    action ||
    actionLabel ||
    secondaryAction ||
    secondaryActionLabel ||
    showRetry ||
    onRetry ||
    showBack ||
    showHome ||
    showSupport;

  const wrapperClasses = [
    "cc-error-state",

    SIZE_CLASSES[size] || SIZE_CLASSES.md,

    `cc-error-${variant}`,

    `cc-error-align-${align}`,

    `cc-error-icon-${iconStyle}`,

    compact ? "cc-error-compact" : "",

    bordered ? "cc-error-bordered" : "",

    elevated ? "cc-error-elevated" : "",

    glass || variant === "glass" ? "cc-error-glass" : "",

    fullWidth ? "cc-error-full-width" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconWrapperStyle = iconSize
    ? {
        "--error-icon-size":
          typeof iconSize === "number" ? `${iconSize}px` : iconSize,
      }
    : undefined;

  return (
    <section
      className={wrapperClasses}
      style={minHeight ? { minHeight } : undefined}
      {...props}
    >
      <div className="cc-error-inner">
        {/* Eyebrow */}

        {eyebrow && <div className="cc-error-eyebrow">{eyebrow}</div>}

        {/* Badge */}

        {badge && (
          <div className="cc-error-badge">
            {badgeIcon && <span>{badgeIcon}</span>}

            {badge}
          </div>
        )}

        {/* Illustration / Icon */}

        {illustration ? (
          <div className="cc-error-illustration">{illustration}</div>
        ) : (
          <div className="cc-error-icon-wrap" style={iconWrapperStyle}>
            <div className="cc-error-icon-glow" />

            <div className="cc-error-icon">
              <Icon />
            </div>

            <span className="cc-error-orbit error-orbit-one" />
            <span className="cc-error-orbit error-orbit-two" />
          </div>
        )}

        {/* Content */}

        <div className="cc-error-content">
          <h2 className="cc-error-title">{finalTitle}</h2>

          {finalDescription && (
            <p className="cc-error-description">{finalDescription}</p>
          )}

          {/* Error code */}

          {finalCode && (
            <div className="cc-error-code">
              <span>ERROR</span>

              <strong>{finalCode}</strong>
            </div>
          )}

          {/* Meta */}

          {meta && <div className="cc-error-meta">{meta}</div>}

          {/* Details */}

          {details && (
            <details className="cc-error-details">
              <summary>
                <FiHelpCircle />

                <span>Technical details</span>
              </summary>

              <div className="cc-error-details-content">{details}</div>
            </details>
          )}

          {/* Main actions */}

          {hasActions && (
            <div className="cc-error-actions">
              {renderPrimaryAction()}

              {renderSecondaryAction()}

              {renderRetry()}

              {renderBack()}

              {renderHome()}

              {renderSupport()}
            </div>
          )}

          {/* Custom content */}

          {children && <div className="cc-error-custom">{children}</div>}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SPECIALIZED COMPONENTS
========================================================= */

export const NetworkError = ({ onRetry, ...props }) => (
  <ErrorState
    type="network"
    variant="network"
    actionLabel="Try again"
    actionIcon={<FiRefreshCw />}
    onAction={onRetry}
    {...props}
  />
);

export const ServerError = ({ onRetry, ...props }) => (
  <ErrorState
    type="server500"
    variant="error"
    actionLabel="Try again"
    actionIcon={<FiRefreshCw />}
    onAction={onRetry}
    {...props}
  />
);

export const NotFoundError = ({ onHome, onBack, ...props }) => (
  <ErrorState
    type="notFound"
    variant="notFound"
    size="lg"
    showHome={!!onHome}
    onHome={onHome}
    showBack={!!onBack}
    onBack={onBack}
    {...props}
  />
);

export const UnauthorizedError = ({ onLogin, ...props }) => (
  <ErrorState
    type="unauthorized"
    variant="restricted"
    actionLabel="Sign in"
    actionIcon={<FiLogIn />}
    onAction={onLogin}
    {...props}
  />
);

export const ForbiddenError = ({ onBack, ...props }) => (
  <ErrorState
    type="forbidden"
    variant="restricted"
    showBack={!!onBack}
    onBack={onBack}
    {...props}
  />
);

export const SessionExpiredError = ({ onLogin, ...props }) => (
  <ErrorState
    type="sessionExpired"
    variant="session"
    actionLabel="Sign in again"
    actionIcon={<FiLogIn />}
    onAction={onLogin}
    {...props}
  />
);

export const TimeoutError = ({ onRetry, ...props }) => (
  <ErrorState
    type="timeout"
    variant="warning"
    actionLabel="Retry request"
    actionIcon={<FiRefreshCw />}
    onAction={onRetry}
    {...props}
  />
);

export const UploadError = ({ onRetry, ...props }) => (
  <ErrorState
    type="upload"
    variant="error"
    actionLabel="Try upload again"
    actionIcon={<FiUploadCloud />}
    onAction={onRetry}
    {...props}
  />
);

export const AssessmentError = ({ onRetry, ...props }) => (
  <ErrorState
    type="assessment"
    variant="error"
    actionLabel="Try again"
    actionIcon={<FiRefreshCw />}
    onAction={onRetry}
    {...props}
  />
);

export const MaintenanceState = ({ ...props }) => (
  <ErrorState type="maintenance" variant="maintenance" size="lg" {...props} />
);

export const PermissionError = ({ ...props }) => (
  <ErrorState type="permission" variant="restricted" {...props} />
);

export const DataError = ({ onRetry, ...props }) => (
  <ErrorState
    type="data"
    variant="error"
    actionLabel="Reload data"
    actionIcon={<FiRefreshCw />}
    onAction={onRetry}
    {...props}
  />
);

export default ErrorState;
