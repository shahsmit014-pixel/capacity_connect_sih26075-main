import React from "react";
import {
  FiSearch,
  FiBookOpen,
  FiUsers,
  FiUser,
  FiClipboard,
  FiAward,
  FiBell,
  FiBookmark,
  FiInbox,
  FiFileText,
  FiBarChart2,
  FiDatabase,
  FiFolder,
  FiHeart,
  FiMessageCircle,
  FiCalendar,
  FiClock,
  FiLock,
  FiShield,
  FiSettings,
  FiPlus,
  FiRefreshCw,
  FiArrowRight,
  FiCompass,
  FiZap,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
  FiXCircle,
  FiLayers,
  FiTarget,
  FiActivity,
  FiUpload,
  FiFilter,
  FiSliders,
  FiWifiOff,
  FiEyeOff,
  FiUserPlus,
  FiGrid,
} from "react-icons/fi";

import "./EmptyState.css";

/* =========================================================
   PRESET CONFIGURATION
========================================================= */

const PRESETS = {
  default: {
    icon: FiInbox,
    title: "Nothing here yet",
    description: "There is currently nothing to display here.",
  },

  search: {
    icon: FiSearch,
    title: "No results found",
    description: "We couldn't find anything matching your search.",
  },

  courses: {
    icon: FiBookOpen,
    title: "No courses yet",
    description: "Courses will appear here when they become available.",
  },

  learners: {
    icon: FiUsers,
    title: "No learners yet",
    description: "There are no learners available to display.",
  },

  trainers: {
    icon: FiUser,
    title: "No trainers yet",
    description: "There are no trainers available to display.",
  },

  assessments: {
    icon: FiClipboard,
    title: "No assessments yet",
    description: "Your assessments will appear here.",
  },

  achievements: {
    icon: FiAward,
    title: "No achievements yet",
    description:
      "Complete learning activities to start collecting achievements.",
  },

  notifications: {
    icon: FiBell,
    title: "You're all caught up",
    description: "You don't have any new notifications.",
  },

  bookmarks: {
    icon: FiBookmark,
    title: "No saved items",
    description: "Save useful courses and resources to find them here later.",
  },

  messages: {
    icon: FiMessageCircle,
    title: "No messages",
    description: "Your conversations will appear here.",
  },

  files: {
    icon: FiFileText,
    title: "No files",
    description: "There are no files available in this section.",
  },

  reports: {
    icon: FiBarChart2,
    title: "No reports available",
    description: "Reports will appear here once enough data is available.",
  },

  analytics: {
    icon: FiActivity,
    title: "No analytics yet",
    description: "Analytics will become available after activity is recorded.",
  },

  recommendations: {
    icon: FiCompass,
    title: "No recommendations yet",
    description:
      "Complete your profile and learning activities to receive personalized recommendations.",
  },

  skillGap: {
    icon: FiTarget,
    title: "Skill gap unavailable",
    description: "Complete an assessment to generate your skill-gap analysis.",
  },

  calendar: {
    icon: FiCalendar,
    title: "No upcoming events",
    description: "Your upcoming sessions and events will appear here.",
  },

  history: {
    icon: FiClock,
    title: "No history yet",
    description: "Your activity history will appear here.",
  },

  favorites: {
    icon: FiHeart,
    title: "Nothing saved yet",
    description: "Your favorite items will appear here.",
  },

  folders: {
    icon: FiFolder,
    title: "No folders",
    description: "Create a folder to organize your content.",
  },

  data: {
    icon: FiDatabase,
    title: "No data available",
    description: "There is currently no data available for this section.",
  },

  table: {
    icon: FiGrid,
    title: "No records found",
    description: "There are no records to display.",
  },

  firstTime: {
    icon: FiZap,
    title: "Let's get started",
    description:
      "Complete a few steps to unlock your Capacity Connect experience.",
  },

  welcome: {
    icon: FiCompass,
    title: "Welcome to Capacity Connect",
    description: "Your personalized learning journey starts here.",
  },

  comingSoon: {
    icon: FiClock,
    title: "Coming soon",
    description: "We're working on something new. Check back soon.",
  },

  restricted: {
    icon: FiLock,
    title: "Access restricted",
    description: "You don't currently have permission to view this content.",
  },

  private: {
    icon: FiEyeOff,
    title: "Content unavailable",
    description: "This content isn't available for your current access level.",
  },

  offline: {
    icon: FiWifiOff,
    title: "You're offline",
    description: "Check your internet connection and try again.",
  },

  error: {
    icon: FiAlertCircle,
    title: "Something went wrong",
    description: "We couldn't load this content. Please try again.",
  },

  emptyProfile: {
    icon: FiUser,
    title: "Complete your profile",
    description:
      "Add your information to unlock a more personalized experience.",
  },

  noTeam: {
    icon: FiUsers,
    title: "No team members",
    description: "Team members will appear here once they are added.",
  },

  noAssignments: {
    icon: FiClipboard,
    title: "No assignments",
    description: "Assigned learning activities will appear here.",
  },

  noCertificates: {
    icon: FiAward,
    title: "No certificates yet",
    description:
      "Certificates earned through your learning journey will appear here.",
  },

  noProgress: {
    icon: FiBarChart2,
    title: "No progress yet",
    description: "Start learning to see your progress here.",
  },

  upload: {
    icon: FiUpload,
    title: "Nothing uploaded",
    description: "Upload a file to see it appear here.",
  },

  filter: {
    icon: FiFilter,
    title: "No matching records",
    description: "Try adjusting or clearing your filters.",
  },
};

/* =========================================================
   SIZE CONFIG
========================================================= */

const SIZE_CLASSES = {
  xs: "cc-empty-xs",
  sm: "cc-empty-sm",
  md: "cc-empty-md",
  lg: "cc-empty-lg",
  xl: "cc-empty-xl",
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const EmptyState = ({
  type = "default",

  icon: CustomIcon,

  title,
  description,

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

  badge,

  badgeIcon,

  eyebrow,

  meta,

  illustration,

  children,

  className = "",

  minHeight,

  fullWidth = true,

  compact = false,

  bordered = false,

  elevated = false,

  glass = false,

  showRefresh = false,

  onRefresh,

  refreshLabel = "Try again",

  loading = false,

  disabled = false,

  ...props
}) => {
  const preset = PRESETS[type] || PRESETS.default;

  const PresetIcon = preset.icon;

  const Icon = CustomIcon || PresetIcon;

  const finalTitle = title || preset.title;

  const finalDescription = description || preset.description;

  const renderAction = () => {
    if (action) {
      return action;
    }

    if (!actionLabel) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-empty-action cc-empty-action-primary"
        onClick={onAction}
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="cc-empty-button-loader" />
        ) : (
          actionIcon || <FiArrowRight />
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
        className="cc-empty-action cc-empty-action-secondary"
        onClick={onSecondaryAction}
        disabled={disabled || loading}
      >
        {secondaryActionIcon || <FiPlus />}

        <span>{secondaryActionLabel}</span>
      </button>
    );
  };

  const renderRefresh = () => {
    if (!showRefresh && !onRefresh) {
      return null;
    }

    return (
      <button
        type="button"
        className="cc-empty-refresh"
        onClick={onRefresh}
        disabled={disabled || loading}
        aria-label={refreshLabel}
        title={refreshLabel}
      >
        <FiRefreshCw className={loading ? "cc-empty-refresh-spin" : ""} />

        <span>{refreshLabel}</span>
      </button>
    );
  };

  const wrapperClasses = [
    "cc-empty-state",

    SIZE_CLASSES[size] || SIZE_CLASSES.md,

    `cc-empty-${variant}`,

    `cc-empty-align-${align}`,

    `cc-empty-icon-${iconStyle}`,

    compact ? "cc-empty-compact" : "",

    bordered ? "cc-empty-bordered" : "",

    elevated ? "cc-empty-elevated" : "",

    glass || variant === "glass" ? "cc-empty-glass" : "",

    fullWidth ? "cc-empty-full-width" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconWrapperStyle = iconSize
    ? {
        "--empty-icon-size":
          typeof iconSize === "number" ? `${iconSize}px` : iconSize,
      }
    : undefined;

  return (
    <section
      className={wrapperClasses}
      style={{
        ...(minHeight ? { minHeight } : {}),
      }}
      {...props}
    >
      <div className="cc-empty-inner">
        {/* Eyebrow */}

        {eyebrow && <div className="cc-empty-eyebrow">{eyebrow}</div>}

        {/* Badge */}

        {badge && (
          <div className="cc-empty-badge">
            {badgeIcon && <span>{badgeIcon}</span>}

            {badge}
          </div>
        )}

        {/* Illustration */}

        {illustration ? (
          <div className="cc-empty-illustration">{illustration}</div>
        ) : (
          <div className="cc-empty-icon-wrap" style={iconWrapperStyle}>
            <div className="cc-empty-icon-glow" />

            <div className="cc-empty-icon">
              <Icon />
            </div>

            <span className="cc-empty-icon-orbit orbit-one" />
            <span className="cc-empty-icon-orbit orbit-two" />
          </div>
        )}

        {/* Main content */}

        <div className="cc-empty-content">
          <h3 className="cc-empty-title">{finalTitle}</h3>

          {finalDescription && (
            <p className="cc-empty-description">{finalDescription}</p>
          )}

          {/* Meta */}

          {meta && <div className="cc-empty-meta">{meta}</div>}

          {/* Actions */}

          {(action ||
            actionLabel ||
            secondaryAction ||
            secondaryActionLabel ||
            showRefresh ||
            onRefresh) && (
            <div className="cc-empty-actions">
              {renderAction()}

              {renderSecondaryAction()}

              {renderRefresh()}
            </div>
          )}

          {/* Custom content */}

          {children && <div className="cc-empty-custom">{children}</div>}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SPECIALIZED EMPTY STATES
========================================================= */

export const SearchEmptyState = ({ query, onClear, ...props }) => {
  return (
    <EmptyState
      type="search"
      title={query ? `No results for "${query}"` : "No results found"}
      description={
        query
          ? "Try a different search term or adjust your filters."
          : "Try searching for something else."
      }
      actionLabel={query ? "Clear search" : undefined}
      onAction={onClear}
      actionIcon={<FiXCircle />}
      {...props}
    />
  );
};

export const FilterEmptyState = ({ onClear, ...props }) => {
  return (
    <EmptyState
      type="filter"
      actionLabel="Clear filters"
      onAction={onClear}
      actionIcon={<FiSliders />}
      {...props}
    />
  );
};

export const ErrorEmptyState = ({ onRetry, ...props }) => {
  return (
    <EmptyState
      type="error"
      variant="error"
      actionLabel="Try again"
      onAction={onRetry}
      actionIcon={<FiRefreshCw />}
      {...props}
    />
  );
};

export const OfflineEmptyState = ({ onRetry, ...props }) => {
  return (
    <EmptyState
      type="offline"
      variant="offline"
      actionLabel="Retry connection"
      onAction={onRetry}
      actionIcon={<FiRefreshCw />}
      {...props}
    />
  );
};

export const ComingSoonState = ({ ...props }) => {
  return (
    <EmptyState type="comingSoon" variant="premium" size="lg" {...props} />
  );
};

export const AccessRestrictedState = ({ ...props }) => {
  return <EmptyState type="restricted" variant="restricted" {...props} />;
};

export const NoCoursesState = ({ onExplore, ...props }) => {
  return (
    <EmptyState
      type="courses"
      actionLabel="Explore courses"
      onAction={onExplore}
      actionIcon={<FiCompass />}
      {...props}
    />
  );
};

export const NoLearnersState = ({ onAdd, ...props }) => {
  return (
    <EmptyState
      type="learners"
      actionLabel="Add learner"
      onAction={onAdd}
      actionIcon={<FiUserPlus />}
      {...props}
    />
  );
};

export const NoNotificationsState = ({ ...props }) => {
  return <EmptyState type="notifications" variant="minimal" {...props} />;
};

export const NoRecommendationsState = ({ onExplore, ...props }) => {
  return (
    <EmptyState
      type="recommendations"
      variant="glass"
      actionLabel="Explore learning"
      onAction={onExplore}
      actionIcon={<FiCompass />}
      {...props}
    />
  );
};

export const FirstTimeState = ({ onGetStarted, ...props }) => {
  return (
    <EmptyState
      type="firstTime"
      variant="premium"
      size="lg"
      actionLabel="Get started"
      onAction={onGetStarted}
      actionIcon={<FiZap />}
      {...props}
    />
  );
};

export default EmptyState;
