import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiLoader,
  FiSearch,
  FiX,
} from "react-icons/fi";

import "./Select.css";

const Select = ({
  label,
  name,
  id,

  options = [],
  value,
  defaultValue,

  onChange,
  onBlur,

  placeholder = "Select an option",

  variant = "default",
  size = "md",
  rounded = "md",

  multiple = false,
  searchable = false,
  clearable = false,

  disabled = false,
  loading = false,
  required = false,

  error,
  success,
  warning,
  helperText,

  leftIcon,
  prefix,

  maxSelections,

  closeOnSelect = true,

  showSelectedCount = true,

  searchablePlaceholder = "Search options...",

  noOptionsText = "No options found",
  noSearchResultsText = "No matching results",

  clearText = "Clear selection",

  groupBy,

  renderOption,
  renderValue,

  fullWidth = true,

  className = "",

  dropdownClassName = "",

  maxHeight = 280,

  ...props
}) => {
  const selectRef = useRef(null);
  const searchRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isControlled = value !== undefined;

  const initialValue =
    defaultValue !== undefined ? defaultValue : multiple ? [] : "";

  const [internalValue, setInternalValue] = useState(initialValue);

  const selectedValue = isControlled ? value : internalValue;

  const selectedArray = multiple
    ? Array.isArray(selectedValue)
      ? selectedValue
      : []
    : [];

  const selectedSingle = multiple ? null : selectedValue;

  const selectedOptions = useMemo(() => {
    if (multiple) {
      return options.filter((option) => selectedArray.includes(option.value));
    }

    return options.filter((option) => option.value === selectedSingle);
  }, [multiple, options, selectedArray, selectedSingle]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) {
      return options;
    }

    const query = search.toLowerCase();

    return options.filter((option) =>
      String(option.label).toLowerCase().includes(query),
    );
  }, [options, search, searchable]);

  const groupedOptions = useMemo(() => {
    if (!groupBy) return null;

    return filteredOptions.reduce((groups, option) => {
      const group = option[groupBy] || "Other";

      if (!groups[group]) {
        groups[group] = [];
      }

      groups[group].push(option);

      return groups;
    }, {});
  }, [filteredOptions, groupBy]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
        setSearch("");

        if (onBlur) {
          onBlur(event);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onBlur]);

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchable]);

  const updateValue = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const toggleOpen = () => {
    if (disabled || loading) return;

    setOpen((previous) => !previous);

    if (!open) {
      setSearch("");
    }
  };

  const handleOptionClick = (option) => {
    if (option.disabled) return;

    if (multiple) {
      const alreadySelected = selectedArray.includes(option.value);

      if (
        !alreadySelected &&
        maxSelections &&
        selectedArray.length >= maxSelections
      ) {
        return;
      }

      const newValue = alreadySelected
        ? selectedArray.filter((value) => value !== option.value)
        : [...selectedArray, option.value];

      updateValue(newValue);

      if (closeOnSelect && !alreadySelected) {
        setOpen(false);
        setSearch("");
      }

      return;
    }

    updateValue(option.value);

    setOpen(false);
    setSearch("");
  };

  const handleClear = (event) => {
    event.stopPropagation();

    updateValue(multiple ? [] : "");

    setSearch("");
  };

  const removeSelected = (valueToRemove, event) => {
    event.stopPropagation();

    const newValue = selectedArray.filter((value) => value !== valueToRemove);

    updateValue(newValue);
  };

  const isSelected = (option) => {
    if (multiple) {
      return selectedArray.includes(option.value);
    }

    return option.value === selectedSingle;
  };

  const hasValue = multiple
    ? selectedArray.length > 0
    : Boolean(selectedSingle);

  const wrapperClasses = [
    "select-wrapper",
    `select-${variant}`,
    `select-${size}`,
    `select-rounded-${rounded}`,

    open ? "select-open" : "",

    error ? "select-error" : "",
    success ? "select-success" : "",
    warning ? "select-warning" : "",

    disabled ? "select-disabled" : "",
    loading ? "select-loading" : "",

    hasValue ? "select-has-value" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = ["select-container", fullWidth ? "select-full" : ""]
    .filter(Boolean)
    .join(" ");

  const displayValue = () => {
    if (multiple) {
      if (!selectedOptions.length) {
        return <span className="select-placeholder">{placeholder}</span>;
      }

      return (
        <div className="select-multi-values">
          {selectedOptions.slice(0, 3).map((option) => (
            <span className="select-chip" key={option.value}>
              {option.icon && (
                <span className="select-chip-icon">{option.icon}</span>
              )}

              <span>{option.label}</span>

              <button
                type="button"
                onClick={(event) => removeSelected(option.value, event)}
                aria-label={`Remove ${option.label}`}
              >
                <FiX />
              </button>
            </span>
          ))}

          {selectedOptions.length > 3 && showSelectedCount && (
            <span className="select-more">+{selectedOptions.length - 3}</span>
          )}
        </div>
      );
    }

    if (!selectedOptions.length) {
      return <span className="select-placeholder">{placeholder}</span>;
    }

    const option = selectedOptions[0];

    if (renderValue) {
      return renderValue(option);
    }

    return (
      <div className="select-value">
        {option.icon && (
          <span className="select-value-icon">{option.icon}</span>
        )}

        {option.avatar && (
          <img src={option.avatar} alt="" className="select-avatar" />
        )}

        <span>{option.label}</span>
      </div>
    );
  };

  const renderOptionItem = (option) => {
    const selected = isSelected(option);

    if (renderOption) {
      return renderOption({
        option,
        selected,
      });
    }

    return (
      <>
        <div className="select-option-leading">
          {option.avatar && (
            <img src={option.avatar} alt="" className="select-option-avatar" />
          )}

          {option.icon && (
            <span className="select-option-icon">{option.icon}</span>
          )}

          <div className="select-option-text">
            <span className="select-option-label">{option.label}</span>

            {option.description && (
              <span className="select-option-description">
                {option.description}
              </span>
            )}
          </div>
        </div>

        {option.badge && (
          <span className={`select-option-badge ${option.badgeType || ""}`}>
            {option.badge}
          </span>
        )}

        {multiple && selected && (
          <span className="select-check">
            <FiCheck />
          </span>
        )}

        {!multiple && selected && (
          <span className="select-selected-check">
            <FiCheck />
          </span>
        )}
      </>
    );
  };

  const renderOptions = (items) => {
    if (!items.length) {
      return (
        <div className="select-empty">
          {search ? noSearchResultsText : noOptionsText}
        </div>
      );
    }

    return items.map((option) => (
      <button
        type="button"
        key={option.value}
        className={[
          "select-option",
          isSelected(option) ? "select-option-selected" : "",
          option.disabled ? "select-option-disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => handleOptionClick(option)}
        disabled={option.disabled}
      >
        {renderOptionItem(option)}
      </button>
    ));
  };

  return (
    <div className={containerClasses} ref={selectRef}>
      {label && (
        <div className="select-label-row">
          <label htmlFor={id || name} className="select-label">
            {leftIcon && <span className="select-label-icon">{leftIcon}</span>}

            {label}

            {required && <span className="select-required">*</span>}
          </label>

          {multiple && maxSelections && showSelectedCount && (
            <span className="select-limit">
              {selectedArray.length}/{maxSelections}
            </span>
          )}
        </div>
      )}

      <div className={wrapperClasses} {...props}>
        {prefix && <span className="select-prefix">{prefix}</span>}

        <button
          type="button"
          className="select-control"
          onClick={toggleOpen}
          disabled={disabled || loading}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="select-display">{displayValue()}</span>

          <span className="select-control-actions">
            {clearable && hasValue && !disabled && (
              <span
                className="select-clear"
                onClick={handleClear}
                role="button"
                tabIndex={0}
                aria-label={clearText}
              >
                <FiX />
              </span>
            )}

            {loading ? (
              <FiLoader className="select-loader" />
            ) : (
              <FiChevronDown className="select-chevron" />
            )}
          </span>
        </button>

        {open && (
          <div
            className={`select-dropdown ${dropdownClassName}`}
            style={{ maxHeight }}
          >
            {searchable && (
              <div className="select-search">
                <FiSearch />

                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  placeholder={searchablePlaceholder}
                  onChange={(event) => setSearch(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            )}

            <div className="select-options" role="listbox">
              {groupBy && groupedOptions
                ? Object.entries(groupedOptions).map(
                    ([group, groupOptions]) => (
                      <div className="select-group" key={group}>
                        <div className="select-group-label">{group}</div>

                        {renderOptions(groupOptions)}
                      </div>
                    ),
                  )
                : renderOptions(filteredOptions)}
            </div>

            {multiple && selectedArray.length > 0 && (
              <div className="select-dropdown-footer">
                <span>{selectedArray.length} selected</span>

                <button type="button" onClick={handleClear}>
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="select-bottom">
        <div>
          {error && (
            <span className="select-feedback error">
              <FiAlertCircle />
              {error}
            </span>
          )}

          {!error && warning && (
            <span className="select-feedback warning">
              <FiAlertCircle />
              {warning}
            </span>
          )}

          {!error && !warning && success && (
            <span className="select-feedback success">
              <FiCheckCircle />
              {success}
            </span>
          )}

          {!error && !warning && !success && helperText && (
            <span className="select-helper">{helperText}</span>
          )}
        </div>

        {multiple && maxSelections && selectedArray.length >= maxSelections && (
          <span className="select-max-reached">Maximum reached</span>
        )}
      </div>
    </div>
  );
};

export default Select;
