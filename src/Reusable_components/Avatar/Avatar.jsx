import React, { useEffect, useMemo, useState } from "react";

import {
  FiUser,
  FiCheck,
  FiClock,
  FiMinus,
  FiMoreHorizontal,
} from "react-icons/fi";

import "./Avatar.css";

/* =========================================================
   HELPERS
========================================================= */

const getInitials = (name = "", max = 2) => {
  const words = String(name).trim().split(/\s+/).filter(Boolean);

  if (!words.length) return "?";

  if (words.length === 1) {
    return words[0].slice(0, max).toUpperCase();
  }

  return words
    .slice(0, max)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const getStatusIcon = (status) => {
  switch (status) {
    case "online":
      return <FiCheck />;

    case "away":
      return <FiClock />;

    case "busy":
      return <FiMinus />;

    case "offline":
      return null;

    default:
      return null;
  }
};

/* =========================================================
   AVATAR
========================================================= */

const Avatar = ({
  src,
  alt,
  name = "",
  initials,
  fallback,
  icon,

  size = "md",
  shape = "circle",
  variant = "default",

  status,
  statusLabel,
  statusPosition = "bottom-right",

  showStatus = true,

  bordered = false,
  ring = false,
  shadow = false,

  clickable = false,
  disabled = false,

  tooltip = false,

  loading = false,

  objectFit = "cover",

  background,
  textColor,

  className = "",

  onClick,

  onImageError,

  onImageLoad,

  children,

  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const [imageLoading, setImageLoading] = useState(Boolean(src));

  /* =====================================================
     RESET IMAGE STATE
  ===================================================== */

  useEffect(() => {
    setImageError(false);
    setImageLoading(Boolean(src));
  }, [src]);

  /* =====================================================
     INITIALS
  ===================================================== */

  const computedInitials = useMemo(() => {
    if (initials) {
      return initials.slice(0, 2).toUpperCase();
    }

    return getInitials(name);
  }, [initials, name]);

  /* =====================================================
     IMAGE HANDLERS
  ===================================================== */

  const handleImageError = (event) => {
    setImageError(true);
    setImageLoading(false);

    if (onImageError) {
      onImageError(event);
    }
  };

  const handleImageLoad = (event) => {
    setImageLoading(false);

    if (onImageLoad) {
      onImageLoad(event);
    }
  };

  /* =====================================================
     CLICK
  ===================================================== */

  const handleClick = (event) => {
    if (disabled || !clickable) {
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  /* =====================================================
     CLASSES
  ===================================================== */

  const avatarClasses = [
    "cc-avatar",

    `cc-avatar-size-${size}`,

    `cc-avatar-shape-${shape}`,

    `cc-avatar-variant-${variant}`,

    bordered ? "cc-avatar-bordered" : "",

    ring ? "cc-avatar-ring" : "",

    shadow ? "cc-avatar-shadow" : "",

    clickable ? "cc-avatar-clickable" : "",

    disabled ? "cc-avatar-disabled" : "",

    loading || imageLoading ? "cc-avatar-loading" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* =====================================================
     CUSTOM STYLE
  ===================================================== */

  const avatarStyle = {
    ...(background
      ? {
          "--avatar-background": background,
        }
      : {}),

    ...(textColor
      ? {
          "--avatar-text-color": textColor,
        }
      : {}),

    "--avatar-object-fit": objectFit,
  };

  /* =====================================================
     CONTENT
  ===================================================== */

  let content;

  if (loading) {
    content = <span className="cc-avatar-loader" />;
  } else if (src && !imageError) {
    content = (
      <>
        {imageLoading && <span className="cc-avatar-image-loader" />}

        <img
          src={src}
          alt={alt || name || "User avatar"}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </>
    );
  } else if (children) {
    content = children;
  } else if (fallback) {
    content = fallback;
  } else if (initials || name) {
    content = <span className="cc-avatar-initials">{computedInitials}</span>;
  } else if (icon) {
    content = <span className="cc-avatar-icon">{icon}</span>;
  } else {
    content = (
      <span className="cc-avatar-icon">
        <FiUser />
      </span>
    );
  }

  /* =====================================================
     STATUS
  ===================================================== */

  const shouldShowStatus = showStatus && status;

  const statusClass = shouldShowStatus
    ? [
        "cc-avatar-status",

        `cc-avatar-status-${status}`,

        `cc-avatar-status-${statusPosition}`,
      ].join(" ")
    : "";

  /* =====================================================
     AVATAR ELEMENT
  ===================================================== */

  const avatarElement = (
    <span
      className={avatarClasses}
      style={avatarStyle}
      onClick={handleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-label={clickable ? alt || name || "User avatar" : undefined}
      aria-disabled={disabled ? true : undefined}
      {...props}
    >
      <span className="cc-avatar-inner">{content}</span>

      {shouldShowStatus && (
        <span
          className={statusClass}
          title={statusLabel || status}
          aria-label={statusLabel || status}
        >
          {getStatusIcon(status)}
        </span>
      )}
    </span>
  );

  /* =====================================================
     TOOLTIP
  ===================================================== */

  if (tooltip && (name || alt)) {
    return (
      <span className="cc-avatar-tooltip-wrapper">
        {avatarElement}

        <span className="cc-avatar-tooltip">{name || alt}</span>
      </span>
    );
  }

  return avatarElement;
};

/* =========================================================
   AVATAR WITH INFO
========================================================= */

export const AvatarWithInfo = ({
  name,
  role,
  email,
  src,
  size = "md",

  status,
  statusLabel,

  variant = "default",

  className = "",

  ...props
}) => {
  return (
    <div
      className={["cc-avatar-with-info", className].filter(Boolean).join(" ")}
    >
      <Avatar
        src={src}
        name={name}
        size={size}
        status={status}
        statusLabel={statusLabel}
        variant={variant}
        {...props}
      />

      <div className="cc-avatar-info">
        <strong>{name}</strong>

        {role && <span>{role}</span>}

        {email && <small>{email}</small>}
      </div>
    </div>
  );
};

/* =========================================================
   AVATAR GROUP
========================================================= */

export const AvatarGroup = ({
  users = [],
  max = 5,

  size = "md",
  shape = "circle",
  variant = "default",

  overlap = true,

  bordered = false,
  ring = false,
  shadow = false,

  showStatus = false,

  onAvatarClick,

  className = "",

  ...props
}) => {
  const visibleUsers = users.slice(0, max);

  const remaining = Math.max(users.length - max, 0);

  return (
    <div
      className={[
        "cc-avatar-group",

        overlap ? "cc-avatar-group-overlap" : "",

        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {visibleUsers.map((user, index) => (
        <Avatar
          key={user.id ?? user._id ?? index}
          src={user.src}
          name={user.name}
          alt={user.alt}
          initials={user.initials}
          icon={user.icon}
          size={size}
          shape={shape}
          variant={user.variant || variant}
          status={showStatus ? user.status : undefined}
          bordered={bordered}
          ring={ring}
          shadow={shadow}
          tooltip
          onClick={() => onAvatarClick && onAvatarClick(user, index)}
          clickable={Boolean(onAvatarClick)}
        />
      ))}

      {remaining > 0 && (
        <span
          className={[
            "cc-avatar",
            `cc-avatar-size-${size}`,
            `cc-avatar-shape-${shape}`,
            "cc-avatar-overflow",
          ].join(" ")}
          title={`${remaining} more`}
        >
          <span className="cc-avatar-inner">
            <span className="cc-avatar-overflow-count">+{remaining}</span>
          </span>
        </span>
      )}
    </div>
  );
};

/* =========================================================
   AVATAR STACK
========================================================= */

export const AvatarStack = ({
  users = [],
  size = "md",
  limit = 4,

  className = "",

  ...props
}) => {
  const visible = users.slice(0, limit);

  const remaining = Math.max(users.length - limit, 0);

  return (
    <div
      className={["cc-avatar-stack", className].filter(Boolean).join(" ")}
      {...props}
    >
      {visible.map((user, index) => (
        <Avatar
          key={user.id ?? index}
          src={user.src}
          name={user.name}
          initials={user.initials}
          size={size}
          variant={user.variant || "glass"}
          bordered
          tooltip
        />
      ))}

      {remaining > 0 && (
        <span
          className={["cc-avatar-stack-more", `cc-avatar-size-${size}`].join(
            " ",
          )}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
};

export default Avatar;
