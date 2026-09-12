import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  FiBookOpen,
  FiBarChart2,
  FiClock,
  FiTag,
  FiSliders,
  FiRotateCcw,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Button from "../../../../Reusable_components/Button/Button";

import "./CourseFilters.css";

/* =========================================================
   COURSE FILTERS
   Capacity Connect - Learner Course Catalog

   Specialized dropdowns are intentionally implemented here
   because these filters need viewport-aware positioning.
========================================================= */

const CourseFilters = ({ totalCourses = 18, onFilterChange, onReset }) => {
  /* =========================================================
     DEFAULT FILTERS
  ========================================================= */

  const defaultFilters = {
    category: "all",
    difficulty: "all",
    duration: "all",
    skill: "all",
    sort: "relevant",
  };

  const [filters, setFilters] = useState(defaultFilters);

  /* =========================================================
     DROPDOWN STATE
  ========================================================= */

  const [openFilter, setOpenFilter] = useState(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    placement: "bottom",
  });

  const dropdownRef = useRef(null);
  const triggerRefs = useRef({});

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const filterOptions = {
    category: [
      {
        id: "all",
        label: "All Categories",
        value: "all",
      },
      {
        id: "ocean-science",
        label: "Ocean Science",
        value: "ocean-science",
      },
      {
        id: "marine-technology",
        label: "Marine Technology",
        value: "marine-technology",
      },
      {
        id: "data-analytics",
        label: "Data & Analytics",
        value: "data-analytics",
      },
      {
        id: "leadership",
        label: "Leadership",
        value: "leadership",
      },
      {
        id: "communication",
        label: "Communication",
        value: "communication",
      },
    ],

    difficulty: [
      {
        id: "all",
        label: "All Levels",
        value: "all",
      },
      {
        id: "beginner",
        label: "Beginner",
        value: "beginner",
      },
      {
        id: "intermediate",
        label: "Intermediate",
        value: "intermediate",
      },
      {
        id: "advanced",
        label: "Advanced",
        value: "advanced",
      },
    ],

    duration: [
      {
        id: "all",
        label: "Any Duration",
        value: "all",
      },
      {
        id: "short",
        label: "Under 2 Weeks",
        value: "short",
      },
      {
        id: "medium",
        label: "2–6 Weeks",
        value: "medium",
      },
      {
        id: "long",
        label: "6+ Weeks",
        value: "long",
      },
    ],

    skill: [
      {
        id: "all",
        label: "All Skills",
        value: "all",
      },
      {
        id: "data-analysis",
        label: "Data Analysis",
        value: "data-analysis",
      },
      {
        id: "programming",
        label: "Programming",
        value: "programming",
      },
      {
        id: "management",
        label: "Management",
        value: "management",
      },
      {
        id: "research",
        label: "Research",
        value: "research",
      },
      {
        id: "communication",
        label: "Communication",
        value: "communication",
      },
    ],

    sort: [
      {
        id: "relevant",
        label: "Most Relevant",
        value: "relevant",
      },
      {
        id: "newest",
        label: "Newest First",
        value: "newest",
      },
      {
        id: "popular",
        label: "Most Popular",
        value: "popular",
      },
      {
        id: "rating",
        label: "Highest Rated",
        value: "rating",
      },
      {
        id: "duration-short",
        label: "Shortest Duration",
        value: "duration-short",
      },
    ],
  };

  /* =========================================================
     FILTER CARD CONFIGURATION
  ========================================================= */

  const filterCards = [
    {
      key: "category",
      label: "Category",
      description: "Learning area",
      icon: FiBookOpen,
      tone: "cyan",
      options: filterOptions.category,
    },
    {
      key: "difficulty",
      label: "Difficulty",
      description: "Learning level",
      icon: FiBarChart2,
      tone: "violet",
      options: filterOptions.difficulty,
    },
    {
      key: "duration",
      label: "Duration",
      description: "Time commitment",
      icon: FiClock,
      tone: "amber",
      options: filterOptions.duration,
    },
    {
      key: "skill",
      label: "Skill Focus",
      description: "Target capability",
      icon: FiTag,
      tone: "green",
      options: filterOptions.skill,
    },
    {
      key: "sort",
      label: "Sort By",
      description: "Course ordering",
      icon: FiSliders,
      tone: "coral",
      options: filterOptions.sort,
    },
  ];

  /* =========================================================
     GET SELECTED LABEL
  ========================================================= */

  const getSelectedLabel = (options, value) => {
    const selected = options.find((item) => item.value === value);

    return selected?.label || options[0]?.label || "Select option";
  };

  /* =========================================================
     CALCULATE DROPDOWN POSITION
  ========================================================= */

  const updateDropdownPosition = useCallback(() => {
    if (!openFilter) return;

    const trigger = triggerRefs.current[openFilter];

    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const horizontalPadding = 12;
    const verticalGap = 8;

    /*
      Compact menu width.

      We intentionally don't make it the full trigger width.
      This keeps the dropdown visually lighter and more premium.
    */
    const desiredWidth = Math.min(270, Math.max(210, rect.width));

    const menuWidth = Math.min(
      desiredWidth,
      viewportWidth - horizontalPadding * 2,
    );

    /*
      Approximate menu height.

      The actual menu has max-height in CSS, so this is
      only used to decide whether to open upward.
    */
    const estimatedMenuHeight = Math.min(
      filterOptions[openFilter].length * 47 + 20,
      270,
    );

    const spaceBelow = viewportHeight - rect.bottom - verticalGap;

    const spaceAbove = rect.top - verticalGap;

    /*
      Open upward if:

      1. There isn't enough room below
      2. AND there is more usable room above

      Otherwise open downward.
    */
    const shouldOpenAbove =
      spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;

    let top;

    if (shouldOpenAbove) {
      top = rect.top - Math.min(estimatedMenuHeight, spaceAbove) - verticalGap;
    } else {
      top = rect.bottom + verticalGap;
    }

    /*
      Keep the menu inside the viewport horizontally.
    */

    let left = rect.left;

    if (left + menuWidth > viewportWidth - horizontalPadding) {
      left = viewportWidth - menuWidth - horizontalPadding;
    }

    if (left < horizontalPadding) {
      left = horizontalPadding;
    }

    /*
      Final vertical safety.
    */

    const maxTop =
      viewportHeight - Math.min(estimatedMenuHeight, viewportHeight - 24) - 12;

    top = Math.max(12, Math.min(top, maxTop));

    setDropdownPosition({
      top,
      left,
      width: menuWidth,
      placement: shouldOpenAbove ? "top" : "bottom",
    });
  }, [openFilter, filterOptions]);

  /* =========================================================
     OPEN DROPDOWN
  ========================================================= */

  const handleOpenFilter = (filterKey) => {
    if (openFilter === filterKey) {
      setOpenFilter(null);
      return;
    }

    setOpenFilter(filterKey);
  };

  /* =========================================================
     FILTER CHANGE
  ========================================================= */

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...filters,
      [filterKey]: value,
    };

    setFilters(updatedFilters);

    onFilterChange?.(updatedFilters);

    setOpenFilter(null);
  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const handleReset = () => {
    setFilters(defaultFilters);

    setOpenFilter(null);

    onReset?.(defaultFilters);
  };

  /* =========================================================
     CLOSE ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    if (!openFilter) return;

    const handlePointerDown = (event) => {
      const dropdown = dropdownRef.current;

      const trigger = triggerRefs.current[openFilter];

      if (dropdown && dropdown.contains(event.target)) {
        return;
      }

      if (trigger && trigger.contains(event.target)) {
        return;
      }

      setOpenFilter(null);
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openFilter]);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!openFilter) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenFilter(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openFilter]);

  /* =========================================================
     POSITION ON OPEN
  ========================================================= */

  useEffect(() => {
    if (!openFilter) return;

    /*
      Wait until the browser has rendered the open state
      before calculating the final position.
    */
    const frame = requestAnimationFrame(() => {
      updateDropdownPosition();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [openFilter, updateDropdownPosition]);

  /* =========================================================
     POSITION ON RESIZE / SCROLL
  ========================================================= */

  useEffect(() => {
    if (!openFilter) return;

    const handleViewportChange = () => {
      updateDropdownPosition();
    };

    window.addEventListener("resize", handleViewportChange);

    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);

      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [openFilter, updateDropdownPosition]);

  /* =========================================================
     CURRENT OPEN FILTER
  ========================================================= */

  const activeFilter = filterCards.find((filter) => filter.key === openFilter);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="course-filters">
      <Card variant="default" className="course-filters__shell">
        <div className="course-filters__content">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="course-filters__header">
            <div className="course-filters__heading-group">
              <div className="course-filters__heading-icon">
                <FiSliders />
              </div>

              <div className="course-filters__heading-content">
                <span className="course-filters__eyebrow">
                  REFINE YOUR LEARNING
                </span>

                <h2 className="course-filters__title">Find the right course</h2>

                <p className="course-filters__description">
                  Narrow your options by category, level, duration, skills, or
                  relevance.
                </p>
              </div>
            </div>

            <div className="course-filters__course-count">
              <span className="course-filters__course-count-number">
                {totalCourses}
              </span>

              <span className="course-filters__course-count-label">
                courses
              </span>
            </div>
          </div>

          {/* =================================================
              FILTER GRID
          ================================================= */}

          <div className="course-filters__grid">
            {filterCards.map((filter) => {
              const Icon = filter.icon;

              const isOpen = openFilter === filter.key;

              return (
                <div
                  className={`course-filter-card course-filter-card--${filter.tone} ${
                    isOpen ? "course-filter-card--active" : ""
                  }`}
                  key={filter.key}
                >
                  {/* CARD TOP */}

                  <div className="course-filter-card__top">
                    <div className="course-filter-card__icon">
                      <Icon />
                    </div>

                    <div className="course-filter-card__text">
                      <span className="course-filter-card__label">
                        {filter.label}
                      </span>

                      <span className="course-filter-card__description">
                        {filter.description}
                      </span>
                    </div>
                  </div>

                  {/* CUSTOM DROPDOWN TRIGGER */}

                  <button
                    type="button"
                    className={`course-filter-card__trigger ${
                      isOpen ? "course-filter-card__trigger--open" : ""
                    }`}
                    ref={(element) => {
                      triggerRefs.current[filter.key] = element;
                    }}
                    onClick={() => handleOpenFilter(filter.key)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-label={`Select ${filter.label}`}
                  >
                    <span className="course-filter-card__selected">
                      {getSelectedLabel(filter.options, filters[filter.key])}
                    </span>

                    <FiChevronDown
                      className={`course-filter-card__chevron ${
                        isOpen ? "course-filter-card__chevron--open" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })}

            {/* =================================================
                RESET CARD
            ================================================= */}

            <div className="course-filter-card course-filter-card--reset">
              <div className="course-filter-card__top">
                <div className="course-filter-card__icon">
                  <FiRotateCcw />
                </div>

                <div className="course-filter-card__text">
                  <span className="course-filter-card__label">
                    Reset Filters
                  </span>

                  <span className="course-filter-card__description">
                    Start from all courses
                  </span>
                </div>
              </div>

              <Button
                variant="glass"
                size="sm"
                leftIcon={<FiRotateCcw />}
                onClick={handleReset}
                className="course-filter-card__reset-button"
              >
                Clear all
              </Button>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="course-filters__footer">
            <div className="course-filters__footer-indicator">
              <span className="course-filters__footer-dot" />

              <span>Filters are ready</span>
            </div>

            <div className="course-filters__footer-divider" />

            <span className="course-filters__footer-text">
              Explore {totalCourses} learning opportunities
            </span>
          </div>
        </div>
      </Card>

      {/* =====================================================
          VIEWPORT-AWARE DROPDOWN

          This is intentionally outside the filter card.
          It uses fixed positioning so it can never increase
          the width/height of the filter card.
      ===================================================== */}

      {openFilter && activeFilter && (
        <div
          ref={dropdownRef}
          className={`course-filter-menu course-filter-menu--${activeFilter.tone} course-filter-menu--${dropdownPosition.placement}`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
          role="listbox"
          aria-label={`${activeFilter.label} options`}
        >
          <div className="course-filter-menu__accent" />

          <div className="course-filter-menu__header">
            <div className="course-filter-menu__header-icon">
              {React.createElement(activeFilter.icon)}
            </div>

            <div className="course-filter-menu__header-text">
              <span>{activeFilter.label}</span>

              <small>Select an option</small>
            </div>
          </div>

          <div className="course-filter-menu__options">
            {activeFilter.options.map((option) => {
              const isSelected = filters[activeFilter.key] === option.value;

              return (
                <button
                  type="button"
                  className={`course-filter-menu__option ${
                    isSelected ? "course-filter-menu__option--selected" : ""
                  }`}
                  key={option.id}
                  onClick={() =>
                    handleFilterChange(activeFilter.key, option.value)
                  }
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="course-filter-menu__option-label">
                    {option.label}
                  </span>

                  {isSelected && (
                    <span className="course-filter-menu__check">
                      <FiCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseFilters;
