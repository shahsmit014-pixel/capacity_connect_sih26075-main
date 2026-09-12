import {
  FiChevronDown,
  FiChevronRight,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({
  items = [],

  value,
  onChange,

  trigger,
  children,

  label,
  placeholder = "Select option",

  variant = "default",
  appearance = "light",
  size = "md",

  placement = "bottom-start",
  width = "220px",
  maxHeight = "320px",

  menuClassName = "",
  triggerClassName = "",
  className = "",

  icon,
  showArrow = true,

  searchable = false,
  searchPlaceholder = "Search...",
  searchIcon,

  selectable = false,
  closeOnSelect = true,
  closeOnItemClick = true,

  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,

  disabled = false,
  loading = false,

  closeOnOutside = true,
  closeOnEsc = true,

  animation = "scale",
  offset = 8,

  portal = false,

  showCheck = true,

  emptyText = "No options found",

  header,
  footer,

  renderItem,
  renderTrigger,

  ariaLabel = "Dropdown menu",

  onItemClick,

  itemClassName = "",

  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const [search, setSearch] = useState("");

  const containerRef = useRef(null);
  const searchRef = useRef(null);

  const isControlled = controlledOpen !== undefined;

  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (next) => {
    if (!isControlled) {
      setInternalOpen(next);
    }

    onOpenChange?.(next);
  };

  const toggleDropdown = () => {
    if (disabled || loading) return;

    setOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event) => {
      if (
        closeOnOutside &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEsc) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutside);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnOutside, closeOnEsc]);

  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 50);
    }

    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen, searchable]);

  const normalizedItems = Array.isArray(items) ? items : [];

  const filteredItems = normalizedItems.filter((item) => {
    if (!searchable || !search.trim()) {
      return true;
    }

    const query = search.toLowerCase();

    return (
      String(item.label || "")
        .toLowerCase()
        .includes(query) ||
      String(item.description || "")
        .toLowerCase()
        .includes(query)
    );
  });

  const handleItemClick = (item, event) => {
    if (item.disabled || item.loading || item.separator) {
      return;
    }

    if (item.href) {
      if (item.target === "_blank") {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = item.href;
      }
    }

    item.onClick?.(item, event);

    onItemClick?.(item, event);

    if (selectable) {
      onChange?.(item.value ?? item);
    }

    if (closeOnItemClick && (selectable ? closeOnSelect : true)) {
      setOpen(false);
    }
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!isOpen) {
        setOpen(true);
      }
    }
  };

  const selectedItem = normalizedItems.find((item) => item.value === value);

  const defaultTrigger = (
    <button
      type="button"
      className={[
        "dropdown-trigger",
        `dropdown-trigger-${variant}`,
        `dropdown-trigger-${size}`,
        triggerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={toggleDropdown}
      onKeyDown={handleTriggerKeyDown}
      disabled={disabled || loading}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
    >
      {icon && <span className="dropdown-trigger-icon">{icon}</span>}

      <span className="dropdown-trigger-content">
        {selectedItem?.label || label || placeholder}
      </span>

      {loading ? (
        <FiLoader className="dropdown-spinner" />
      ) : (
        showArrow && (
          <FiChevronDown
            className={["dropdown-arrow", isOpen ? "dropdown-arrow-open" : ""]
              .filter(Boolean)
              .join(" ")}
          />
        )
      )}
    </button>
  );

  const classes = [
    "dropdown",
    `dropdown-${variant}`,
    `dropdown-${appearance}`,
    `dropdown-size-${size}`,
    `dropdown-animation-${animation}`,
    isOpen ? "dropdown-open" : "",
    disabled ? "dropdown-disabled" : "",
    loading ? "dropdown-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={classes} {...props}>
      <div className="dropdown-trigger-wrapper">
        {renderTrigger ? (
          renderTrigger({
            open: isOpen,
            toggle: toggleDropdown,
            selectedItem,
          })
        ) : trigger || children ? (
          <div
            onClick={toggleDropdown}
            onKeyDown={handleTriggerKeyDown}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            {trigger || children}
          </div>
        ) : (
          defaultTrigger
        )}
      </div>

      {isOpen && (
        <div
          className={[
            "dropdown-menu",
            `dropdown-placement-${placement}`,
            menuClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            "--dropdown-width": width,
            "--dropdown-max-height": maxHeight,
            "--dropdown-offset": `${offset}px`,
          }}
          role="menu"
        >
          {header && <div className="dropdown-header">{header}</div>}

          {searchable && (
            <div className="dropdown-search">
              {searchIcon && (
                <span className="dropdown-search-icon">{searchIcon}</span>
              )}

              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search dropdown options"
              />
            </div>
          )}

          <div className="dropdown-items">
            {filteredItems.length === 0 ? (
              <div className="dropdown-empty">{emptyText}</div>
            ) : (
              filteredItems.map((item, index) => {
                if (item.separator) {
                  return (
                    <div
                      key={`separator-${index}`}
                      className="dropdown-separator"
                    />
                  );
                }

                const isSelected = selectable && item.value === value;

                return (
                  <button
                    key={item.id ?? item.value ?? index}
                    type="button"
                    role="menuitem"
                    className={[
                      "dropdown-item",
                      itemClassName,

                      item.variant ? `dropdown-item-${item.variant}` : "",

                      item.disabled ? "dropdown-item-disabled" : "",

                      item.loading ? "dropdown-item-loading" : "",

                      isSelected ? "dropdown-item-selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={item.disabled || item.loading}
                    onClick={(event) => handleItemClick(item, event)}
                  >
                    {item.icon && (
                      <span
                        className={[
                          "dropdown-item-icon",
                          item.iconClassName || "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {item.icon}
                      </span>
                    )}

                    <span className="dropdown-item-main">
                      <span className="dropdown-item-label">{item.label}</span>

                      {item.description && (
                        <span className="dropdown-item-description">
                          {item.description}
                        </span>
                      )}
                    </span>

                    {item.badge && (
                      <span className="dropdown-item-badge">{item.badge}</span>
                    )}

                    {item.loading ? (
                      <FiLoader className="dropdown-item-spinner" />
                    ) : (
                      showCheck &&
                      isSelected && <FiCheck className="dropdown-item-check" />
                    )}

                    {item.submenu && (
                      <FiChevronRight className="dropdown-submenu-icon" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {footer && <div className="dropdown-footer">{footer}</div>}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
