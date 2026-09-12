import {
  FiArrowRight,
  FiClock,
  FiFilter,
  FiLoader,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

import { useEffect, useRef, useState } from "react";

import "./SearchBar.css";

const SearchBar = ({
  value,
  defaultValue = "",

  onChange,
  onSearch,
  onClear,

  placeholder = "Search...",
  ariaLabel = "Search",

  variant = "default",
  appearance = "soft",

  size = "md",
  shape = "pill",

  searchIcon,
  clearIcon,
  filterIcon,

  showSearchIcon = true,
  showClear = true,

  loading = false,

  disabled = false,
  readOnly = false,

  autoFocus = false,

  shortcut,
  showShortcut = false,

  suggestions = [],
  showSuggestions = false,

  recentSearches = [],
  showRecent = false,

  loadingSuggestions = false,

  noResultsText = "No results found",

  emptyRecentText = "No recent searches",

  suggestionTitle = "Suggestions",
  recentTitle = "Recent searches",

  onSuggestionSelect,
  onRecentSelect,

  renderSuggestion,
  renderRecent,

  highlightMatch = true,

  category,
  categories = [],
  showCategory = false,
  onCategoryChange,

  filterCount,
  showFilter = false,
  onFilterClick,

  filterLabel = "Filters",

  actionIcon,
  onActionClick,
  actionLabel,

  prefix,
  suffix,

  resultCount,
  showResultCount = false,

  minLength = 0,

  debounce = 0,

  clearOnEscape = true,

  searchOnEnter = true,

  closeOnSelect = true,

  closeOnOutsideClick = true,

  maxSuggestions = 8,

  maxRecent = 5,

  customEmptyState,

  className = "",

  width,

  height,

  fullWidth = true,

  shadow = false,

  glow = false,

  bordered = false,

  animated = true,

  onFocus,
  onBlur,

  ...props
}) => {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue);

  const [focused, setFocused] = useState(false);

  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const searchValue = isControlled ? value : internalValue;

  const normalizedValue = searchValue?.toString() || "";

  const filteredSuggestions = suggestions
    .filter((item) => {
      if (typeof item === "string") {
        return item.toLowerCase().includes(normalizedValue.toLowerCase());
      }

      const text = item.label || item.name || item.title || "";

      return text.toLowerCase().includes(normalizedValue.toLowerCase());
    })
    .slice(0, maxSuggestions);

  const visibleRecent = recentSearches.slice(0, maxRecent);

  const hasQuery = normalizedValue.trim().length > 0;

  const canSearch = normalizedValue.trim().length >= minLength;

  const shouldShowDropdown =
    open &&
    !disabled &&
    showSuggestions &&
    (loadingSuggestions ||
      filteredSuggestions.length > 0 ||
      (showRecent && visibleRecent.length > 0) ||
      (hasQuery && !loadingSuggestions));

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeOnOutsideClick]);

  useEffect(() => {
    if (!shortcut) return;

    const handleShortcut = (event) => {
      const key = shortcut.toLowerCase();

      const pressed = event.key.toLowerCase() === key;

      const modifier =
        shortcut.includes("⌘") ||
        shortcut.includes("Ctrl") ||
        shortcut.includes("ctrl")
          ? event.metaKey || event.ctrlKey
          : true;

      if (pressed && modifier) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, [shortcut]);

  useEffect(() => {
    if (!debounce || !onSearch) return;

    if (!canSearch) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onSearch(normalizedValue);
    }, debounce);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [normalizedValue, debounce, onSearch, canSearch]);

  const updateValue = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);

    setActiveIndex(-1);

    if (showSuggestions) {
      setOpen(true);
    }
  };

  const handleSearch = () => {
    if (!canSearch || loading) return;

    onSearch?.(normalizedValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }

    onChange?.("");
    onClear?.();

    setActiveIndex(-1);

    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    const text =
      typeof suggestion === "string"
        ? suggestion
        : suggestion.label || suggestion.name || suggestion.title || "";

    if (!isControlled) {
      setInternalValue(text);
    }

    onChange?.(text);
    onSuggestionSelect?.(suggestion, text);

    if (closeOnSelect) {
      setOpen(false);
    }

    inputRef.current?.focus();
  };

  const handleRecentClick = (item) => {
    const text =
      typeof item === "string"
        ? item
        : item.label || item.name || item.title || "";

    if (!isControlled) {
      setInternalValue(text);
    }

    onChange?.(text);
    onRecentSelect?.(item, text);

    if (closeOnSelect) {
      setOpen(false);
    }

    inputRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      if (clearOnEscape && hasQuery) {
        handleClear();
      } else {
        setOpen(false);
      }

      return;
    }

    if (event.key === "Enter" && searchOnEnter) {
      if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
        handleSuggestionClick(filteredSuggestions[activeIndex]);

        return;
      }

      handleSearch();

      return;
    }

    if (event.key === "ArrowDown" && filteredSuggestions.length) {
      event.preventDefault();

      setOpen(true);

      setActiveIndex((current) =>
        current < filteredSuggestions.length - 1 ? current + 1 : 0,
      );

      return;
    }

    if (event.key === "ArrowUp" && filteredSuggestions.length) {
      event.preventDefault();

      setActiveIndex((current) =>
        current > 0 ? current - 1 : filteredSuggestions.length - 1,
      );

      return;
    }
  };

  const highlightText = (text) => {
    if (!highlightMatch || !hasQuery) {
      return text;
    }

    const escaped = normalizedValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const parts = text.split(new RegExp(`(${escaped})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === normalizedValue.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      ),
    );
  };

  const classes = [
    "searchbar",

    `searchbar-${variant}`,
    `searchbar-${appearance}`,

    `searchbar-${size}`,
    `searchbar-${shape}`,

    focused ? "searchbar-focused" : "",
    open ? "searchbar-open" : "",

    shadow ? "searchbar-shadow" : "",
    glow ? "searchbar-glow" : "",
    bordered ? "searchbar-bordered" : "",

    animated ? "searchbar-animated" : "",

    fullWidth ? "searchbar-full-width" : "",

    disabled ? "searchbar-disabled" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    ...(width ? { width } : {}),
    ...(height ? { "--searchbar-height": height } : {}),
  };

  return (
    <div ref={containerRef} className={classes} style={style}>
      <div className="searchbar-main">
        {showCategory && categories.length > 0 && (
          <div className="searchbar-category">
            <select
              value={category || ""}
              onChange={(event) => onCategoryChange?.(event.target.value)}
              disabled={disabled}
              aria-label="Search category"
            >
              {categories.map((item, index) => {
                const value = typeof item === "string" ? item : item.value;

                const label = typeof item === "string" ? item : item.label;

                return (
                  <option key={item.id || value || index} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {prefix && <div className="searchbar-prefix">{prefix}</div>}

        <div className="searchbar-icon">
          {loading ? (
            <FiLoader className="searchbar-spinner" />
          ) : (
            searchIcon || <FiSearch />
          )}
        </div>

        <input
          ref={inputRef}
          value={normalizedValue}
          type="search"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onChange={(event) => updateValue(event.target.value)}
          onFocus={(event) => {
            setFocused(true);

            if (showSuggestions) {
              setOpen(true);
            }

            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          autoComplete="off"
          {...props}
        />

        {showShortcut && shortcut && !hasQuery && !loading && (
          <span className="searchbar-shortcut">{shortcut}</span>
        )}

        {hasQuery && showClear && !loading && (
          <button
            type="button"
            className="searchbar-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            {clearIcon || <FiX />}
          </button>
        )}

        {suffix && <div className="searchbar-suffix">{suffix}</div>}

        {showFilter && (
          <button
            type="button"
            className="searchbar-filter"
            onClick={onFilterClick}
            disabled={disabled}
            aria-label={filterLabel}
          >
            {filterIcon || <FiSliders />}

            <span>{filterLabel}</span>

            {filterCount !== undefined && (
              <span className="searchbar-filter-count">{filterCount}</span>
            )}
          </button>
        )}

        {actionIcon && (
          <button
            type="button"
            className="searchbar-action"
            onClick={onActionClick}
            disabled={disabled}
            aria-label={actionLabel}
          >
            {actionIcon}
          </button>
        )}

        {onSearch && (
          <button
            type="button"
            className="searchbar-submit"
            onClick={handleSearch}
            disabled={disabled || loading || !canSearch}
            aria-label="Search"
          >
            <FiArrowRight />
          </button>
        )}
      </div>

      {showResultCount && resultCount !== undefined && (
        <div className="searchbar-result-count">{resultCount} results</div>
      )}

      {shouldShowDropdown && (
        <div className="searchbar-dropdown">
          {loadingSuggestions ? (
            <div className="searchbar-loading">
              <FiLoader />
              <span>Searching...</span>
            </div>
          ) : (
            <>
              {!hasQuery && showRecent && visibleRecent.length > 0 && (
                <div className="searchbar-section">
                  <div className="searchbar-section-title">
                    <FiClock />
                    {recentTitle}
                  </div>

                  {visibleRecent.map((item, index) => (
                    <button
                      type="button"
                      key={item.id || index}
                      className="searchbar-option"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleRecentClick(item)}
                    >
                      {renderRecent ? (
                        renderRecent(item)
                      ) : (
                        <>
                          <FiClock />

                          <span>
                            {typeof item === "string"
                              ? item
                              : item.label || item.name || item.title}
                          </span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {filteredSuggestions.length > 0 && (
                <div className="searchbar-section">
                  <div className="searchbar-section-title">
                    <FiSearch />
                    {suggestionTitle}
                  </div>

                  {filteredSuggestions.map((item, index) => {
                    const text =
                      typeof item === "string"
                        ? item
                        : item.label || item.name || item.title || "";

                    return (
                      <button
                        type="button"
                        key={item.id || index}
                        className={[
                          "searchbar-option",
                          index === activeIndex
                            ? "searchbar-option-active"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {renderSuggestion ? (
                          renderSuggestion(item, normalizedValue)
                        ) : (
                          <>
                            <FiSearch />

                            <span>{highlightText(text)}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {hasQuery &&
                !loadingSuggestions &&
                filteredSuggestions.length === 0 && (
                  <div className="searchbar-empty">
                    {customEmptyState || (
                      <>
                        <div className="searchbar-empty-icon">
                          <FiSearch />
                        </div>

                        <span>{noResultsText}</span>
                      </>
                    )}
                  </div>
                )}

              {!hasQuery &&
                showRecent &&
                visibleRecent.length === 0 &&
                filteredSuggestions.length === 0 && (
                  <div className="searchbar-empty">
                    <div className="searchbar-empty-icon">
                      <FiClock />
                    </div>

                    <span>{emptyRecentText}</span>
                  </div>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
