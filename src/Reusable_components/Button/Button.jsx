import "./Button.css";
import { FiLoader } from "react-icons/fi";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  icon,
  iconOnly = false,
  fullWidth = false,
  rounded = "md",
  className = "",
  ariaLabel,
  ...props
}) => {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    `btn-rounded-${rounded}`,
    iconOnly ? "btn-icon-only" : "",
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <FiLoader className="btn-spinner" />
          {!iconOnly && "Loading..."}
        </>
      ) : iconOnly ? (
        icon
      ) : (
        <>
          {leftIcon && <span className="btn-icon">{leftIcon}</span>}

          <span>{children}</span>

          {rightIcon && <span className="btn-icon">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
