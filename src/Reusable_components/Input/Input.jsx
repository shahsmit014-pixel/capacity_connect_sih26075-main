import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiSearch,
  FiX,
} from "react-icons/fi";

import "./Input.css";

const Input = ({
  label,
  name,
  id,
  type = "text",

  value,
  defaultValue,
  placeholder,

  onChange,
  onBlur,
  onFocus,

  variant = "default",
  size = "md",
  rounded = "md",

  leftIcon,
  rightIcon,

  prefix,
  suffix,

  search = false,
  clearable = false,

  showPasswordToggle = true,

  required = false,
  disabled = false,
  readOnly = false,

  loading = false,

  error,
  success,
  warning,

  helperText,

  maxLength,
  showCount = false,

  fullWidth = true,

  className = "",
  inputClassName = "",

  ariaLabel,
  autoComplete,

  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputId = id || name;

  const isPassword = type === "password";
  const isSearch = search || type === "search";

  const actualType = isPassword && showPassword ? "text" : type;

  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  const hasWarning = Boolean(warning);

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: "",
        },
      });
    }
  };

  const classes = ["input-container", fullWidth ? "input-full" : "", className]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = [
    "input-wrapper",
    `input-${variant}`,
    `input-${size}`,
    `input-rounded-${rounded}`,
    hasError ? "input-has-error" : "",
    hasSuccess ? "input-has-success" : "",
    hasWarning ? "input-has-warning" : "",
    disabled ? "input-disabled" : "",
    readOnly ? "input-readonly" : "",
    loading ? "input-loading" : "",
    isSearch ? "input-search" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderRightContent = () => {
    if (loading) {
      return <FiLoader className="input-spinner" />;
    }

    if (isPassword && showPasswordToggle) {
      return (
        <button
          type="button"
          className="input-action"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex="-1"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      );
    }

    if (clearable && value) {
      return (
        <button
          type="button"
          className="input-action"
          onClick={handleClear}
          aria-label="Clear input"
          tabIndex="-1"
        >
          <FiX />
        </button>
      );
    }

    if (rightIcon) {
      return <span className="input-icon input-right-icon">{rightIcon}</span>;
    }

    if (hasError) {
      return (
        <span className="input-status error">
          <FiAlertCircle />
        </span>
      );
    }

    if (hasSuccess) {
      return (
        <span className="input-status success">
          <FiCheckCircle />
        </span>
      );
    }

    return null;
  };

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          <span>{label}</span>

          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className={wrapperClasses}>
        {prefix && <span className="input-prefix">{prefix}</span>}

        {(leftIcon || isSearch) && (
          <span className="input-icon input-left-icon">
            {isSearch ? <FiSearch /> : leftIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={actualType}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
          disabled={disabled || loading}
          readOnly={readOnly}
          maxLength={maxLength}
          aria-label={ariaLabel}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          autoComplete={autoComplete}
          className={`input-field ${inputClassName}`}
          {...props}
        />

        {suffix && <span className="input-suffix">{suffix}</span>}

        <div className="input-right">{renderRightContent()}</div>
      </div>

      <div className="input-bottom">
        <div className="input-message">
          {error && (
            <span id={`${inputId}-error`} className="input-feedback error">
              <FiAlertCircle />
              {error}
            </span>
          )}

          {!error && warning && (
            <span className="input-feedback warning">
              <FiAlertCircle />
              {warning}
            </span>
          )}

          {!error && !warning && success && (
            <span className="input-feedback success">
              <FiCheckCircle />
              {success}
            </span>
          )}

          {!error && !warning && !success && helperText && (
            <span id={`${inputId}-helper`} className="input-helper">
              {helperText}
            </span>
          )}
        </div>

        {showCount && maxLength && (
          <span className="input-counter">
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
