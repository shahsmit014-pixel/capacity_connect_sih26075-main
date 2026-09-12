import { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiLoader,
  FiMaximize2,
  FiMinimize2,
  FiRotateCcw,
  FiSave,
  FiX,
} from "react-icons/fi";

import "./Textarea.css";

const Textarea = ({
  label,
  name,
  id,

  value,
  defaultValue,
  placeholder,

  onChange,
  onBlur,
  onFocus,

  variant = "default",
  size = "md",
  rounded = "md",

  rows = 5,
  minRows = 3,
  maxRows = 12,

  resize = "vertical",
  autoResize = false,

  minLength,
  maxLength,

  showCount = false,
  showWordCount = false,

  leftIcon,
  rightIcon,

  prefix,
  suffix,

  required = false,
  disabled = false,
  readOnly = false,

  loading = false,

  error,
  success,
  warning,

  helperText,

  clearable = false,

  expandable = false,
  expanded: controlledExpanded,
  onExpand,

  showToolbar = false,
  toolbar,

  showSave = false,
  onSave,

  showReset = false,
  onReset,
  resetValue = "",

  showLastSaved = false,
  lastSavedText = "Saved just now",

  fullWidth = true,

  spellCheck = true,
  autoComplete = "off",

  className = "",
  textareaClassName = "",

  autoFocus = false,

  ...props
}) => {
  const textareaRef = useRef(null);

  const [internalExpanded, setInternalExpanded] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const currentValue = value !== undefined ? value : defaultValue || "";

  const inputId = id || name;

  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  const hasWarning = Boolean(warning);

  const wordCount = currentValue.trim()
    ? currentValue.trim().split(/\s+/).length
    : 0;

  const characterCount = currentValue.length;

  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea || !autoResize) return;

    textarea.style.height = "auto";

    const computedStyle = window.getComputedStyle(textarea);

    const lineHeight = parseFloat(computedStyle.lineHeight) || 22;

    const padding =
      parseFloat(computedStyle.paddingTop || 0) +
      parseFloat(computedStyle.paddingBottom || 0);

    const minHeight = lineHeight * minRows + padding;
    const maxHeight = lineHeight * maxRows + padding;

    textarea.style.height = `${Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight,
    )}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  useEffect(() => {
    resizeTextarea();
  }, [currentValue, autoResize, minRows, maxRows]);

  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  const handleFocus = (event) => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

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

  const handleReset = () => {
    if (onReset) {
      onReset();
      return;
    }

    if (onChange) {
      onChange({
        target: {
          name,
          value: resetValue,
        },
      });
    }
  };

  const handleExpand = () => {
    const nextState = !isExpanded;

    if (controlledExpanded === undefined) {
      setInternalExpanded(nextState);
    }

    if (onExpand) {
      onExpand(nextState);
    }
  };

  const wrapperClasses = [
    "textarea-wrapper",
    `textarea-${variant}`,
    `textarea-${size}`,
    `textarea-rounded-${rounded}`,

    hasError ? "textarea-has-error" : "",
    hasSuccess ? "textarea-has-success" : "",
    hasWarning ? "textarea-has-warning" : "",

    disabled ? "textarea-disabled" : "",
    readOnly ? "textarea-readonly" : "",
    loading ? "textarea-loading" : "",

    isFocused ? "textarea-focused" : "",
    isExpanded ? "textarea-expanded" : "",

    `textarea-resize-${resize}`,

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "textarea-container",
    fullWidth ? "textarea-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderStatus = () => {
    if (loading) {
      return <FiLoader className="textarea-spinner" />;
    }

    if (hasError) {
      return (
        <span className="textarea-status error">
          <FiAlertCircle />
        </span>
      );
    }

    if (hasSuccess) {
      return (
        <span className="textarea-status success">
          <FiCheckCircle />
        </span>
      );
    }

    if (hasWarning) {
      return (
        <span className="textarea-status warning">
          <FiAlertCircle />
        </span>
      );
    }

    return null;
  };

  return (
    <div className={containerClasses}>
      {label && (
        <div className="textarea-label-row">
          <label htmlFor={inputId} className="textarea-label">
            {leftIcon && (
              <span className="textarea-label-icon">{leftIcon}</span>
            )}

            <span>{label}</span>

            {required && <span className="textarea-required">*</span>}
          </label>

          {showLastSaved && (
            <span className="textarea-saved">
              <FiClock />
              {lastSavedText}
            </span>
          )}
        </div>
      )}

      <div className={wrapperClasses}>
        {prefix && <span className="textarea-prefix">{prefix}</span>}

        <div className="textarea-main">
          <textarea
            ref={textareaRef}
            id={inputId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            rows={isExpanded ? Math.max(rows, 10) : rows}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            disabled={disabled || loading}
            readOnly={readOnly}
            spellCheck={spellCheck}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={`textarea-field ${textareaClassName}`}
            {...props}
          />

          <div className="textarea-actions">
            {rightIcon && (
              <span className="textarea-action-icon">{rightIcon}</span>
            )}

            {clearable && currentValue && !disabled && (
              <button
                type="button"
                className="textarea-icon-button"
                onClick={handleClear}
                aria-label="Clear text"
              >
                <FiX />
              </button>
            )}

            {showReset && (
              <button
                type="button"
                className="textarea-icon-button"
                onClick={handleReset}
                disabled={disabled}
                aria-label="Reset text"
              >
                <FiRotateCcw />
              </button>
            )}

            {expandable && (
              <button
                type="button"
                className="textarea-icon-button"
                onClick={handleExpand}
                aria-label={
                  isExpanded ? "Minimize text area" : "Expand text area"
                }
              >
                {isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
              </button>
            )}

            {renderStatus()}
          </div>
        </div>

        {suffix && <span className="textarea-suffix">{suffix}</span>}
      </div>

      {showToolbar && (
        <div className="textarea-toolbar">
          {toolbar || (
            <>
              <span className="toolbar-label">
                <FiEdit3 />
                Editor
              </span>

              <span className="toolbar-hint">
                Write clear and concise information
              </span>
            </>
          )}

          {showSave && (
            <button
              type="button"
              className="textarea-save-button"
              onClick={onSave}
              disabled={disabled || loading}
            >
              <FiSave />
              Save
            </button>
          )}
        </div>
      )}

      <div className="textarea-bottom">
        <div className="textarea-message">
          {error && (
            <span id={`${inputId}-error`} className="textarea-feedback error">
              <FiAlertCircle />
              {error}
            </span>
          )}

          {!error && warning && (
            <span className="textarea-feedback warning">
              <FiAlertCircle />
              {warning}
            </span>
          )}

          {!error && !warning && success && (
            <span className="textarea-feedback success">
              <FiCheckCircle />
              {success}
            </span>
          )}

          {!error && !warning && !success && helperText && (
            <span id={`${inputId}-helper`} className="textarea-helper">
              {helperText}
            </span>
          )}
        </div>

        <div className="textarea-counts">
          {showWordCount && <span>{wordCount} words</span>}

          {showCount && maxLength && (
            <span>
              {characterCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Textarea;
