import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiLoader,
  FiX,
  FiXCircle,
} from "react-icons/fi";

import { useEffect, useRef } from "react";

import "./Modal.css";

const ICONS = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  warning: <FiAlertCircle />,
  danger: <FiXCircle />,
  error: <FiXCircle />,
};

const Modal = ({
  isOpen,
  onClose,

  title,
  subtitle,
  children,

  icon,
  iconType,

  variant = "default",
  appearance = "default",

  size = "md",
  position = "center",

  rounded = true,

  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true,

  closeButtonLabel = "Close",

  footer,
  showFooter = false,

  confirmText = "Confirm",
  cancelText = "Cancel",

  onConfirm,
  onCancel,

  confirmVariant = "primary",
  cancelVariant = "secondary",

  loading = false,
  loadingText = "Processing...",

  disabled = false,

  preventScroll = true,

  lockBackground = true,

  blurBackground = true,

  overlay = true,

  overlayOpacity = "medium",

  animation = "scale",

  fullScreen = false,

  scrollable = true,

  contentPadding = true,

  showHeader = true,

  headerContent,

  beforeClose,

  className = "",
  overlayClassName = "",
  contentClassName = "",

  ariaLabel = "Dialog",
  ariaDescription,

  childrenClassName,

  ...props
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;

    if (preventScroll) {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEsc && !loading && !disabled) {
        handleClose();
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      const firstFocusable = modalRef.current?.querySelector(
        "button, input, textarea, select, [tabindex]:not([tabindex='-1'])",
      );

      firstFocusable?.focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;

      document.removeEventListener("keydown", handleKeyDown);

      previousActiveElement.current?.focus?.();
    };
  }, [isOpen, closeOnEsc, loading, disabled, preventScroll]);

  const handleClose = async () => {
    if (loading || disabled) return;

    if (beforeClose) {
      const result = await beforeClose();

      if (result === false) return;
    }

    onClose?.();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && closeOnOverlay) {
      handleClose();
    }
  };

  const handleCancel = () => {
    if (loading || disabled) return;

    onCancel?.();
    handleClose();
  };

  const handleConfirm = async () => {
    if (loading || disabled || !onConfirm) {
      return;
    }

    await onConfirm();
  };

  const trapFocus = (event) => {
    const focusable = modalRef.current?.querySelectorAll(
      "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex='-1'])",
    );

    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  const resolvedIcon = icon || (iconType ? ICONS[iconType] : null);

  const classes = [
    "modal",
    `modal-${variant}`,
    `modal-${appearance}`,
    `modal-size-${size}`,
    `modal-position-${position}`,
    `modal-animation-${animation}`,

    rounded ? "modal-rounded" : "modal-square",

    scrollable ? "modal-scrollable" : "modal-fixed-content",

    contentPadding ? "modal-content-padding" : "",

    fullScreen ? "modal-fullscreen" : "",

    loading ? "modal-loading" : "",

    disabled ? "modal-disabled" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "modal-overlay",

    overlay ? "modal-overlay-visible" : "",

    blurBackground ? "modal-overlay-blur" : "",

    `modal-overlay-${overlayOpacity}`,

    overlayClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClasses}
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescription}
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        <div className="modal-inner">
          {showHeader && (
            <div className="modal-header">
              <div className="modal-heading">
                {resolvedIcon && (
                  <div
                    className={[
                      "modal-icon",
                      iconType ? `modal-icon-${iconType}` : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {resolvedIcon}
                  </div>
                )}

                <div className="modal-title-area">
                  {title && <h2>{title}</h2>}

                  {subtitle && <p>{subtitle}</p>}
                </div>
              </div>

              {headerContent && (
                <div className="modal-header-content">{headerContent}</div>
              )}

              {showClose && (
                <button
                  type="button"
                  className="modal-close"
                  onClick={handleClose}
                  disabled={loading || disabled}
                  aria-label={closeButtonLabel}
                >
                  <FiX />
                </button>
              )}
            </div>
          )}

          <div
            className={[
              "modal-body",
              childrenClassName || "",
              contentClassName || "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {loading && (
              <div className="modal-loading-overlay">
                <div className="modal-loader">
                  <FiLoader />
                </div>

                <span>{loadingText}</span>
              </div>
            )}

            {children}
          </div>

          {showFooter && (
            <div className="modal-footer">
              {footer || (
                <>
                  <button
                    type="button"
                    className={[
                      "modal-button",
                      `modal-button-${cancelVariant}`,
                    ].join(" ")}
                    onClick={handleCancel}
                    disabled={loading || disabled}
                  >
                    {cancelText}
                  </button>

                  <button
                    type="button"
                    className={[
                      "modal-button",
                      `modal-button-${confirmVariant}`,
                    ].join(" ")}
                    onClick={handleConfirm}
                    disabled={loading || disabled}
                  >
                    {loading ? (
                      <>
                        <FiLoader className="modal-button-spinner" />
                        {loadingText}
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
