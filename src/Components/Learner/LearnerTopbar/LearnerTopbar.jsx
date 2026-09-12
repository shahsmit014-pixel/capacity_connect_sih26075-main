import { useState } from "react";

import { FiBookOpen, FiBell, FiChevronDown } from "react-icons/fi";

import SearchBar from "../../../Reusable_components/SearchBar/SearchBar";

import "./LearnerTopbar.css";

/* =========================================================
   LEARNER TOPBAR
========================================================= */

const LearnerTopbar = () => {
  /* =======================================================
     SEARCH STATE
  ======================================================= */

  const [searchValue, setSearchValue] = useState("");

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  const handleSearchClear = () => {
    setSearchValue("");
  };

  return (
    <header className="learner-topbar">
      {/* ===================================================
          SEARCH
      =================================================== */}

      <div className="topbar-search-wrapper">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onClear={handleSearchClear}
          placeholder="Search courses, skills, resources..."
          ariaLabel="Search courses, skills and resources"
          variant="default"
          appearance="soft"
          size="lg"
          shape="rounded"
          showSearchIcon={true}
          showClear={true}
          shadow={false}
          bordered={true}
          fullWidth={true}
          animated={true}
        />
      </div>

      {/* ===================================================
          TOPBAR ACTIONS
      =================================================== */}

      <div className="topbar-actions">
        {/* =================================================
            MY LEARNING
        ================================================= */}

        <button
          type="button"
          className="topbar-icon-button topbar-learning-button"
          aria-label="My Learning"
          data-tooltip="My Learning"
        >
          <FiBookOpen />
        </button>

        {/* =================================================
            LEARNING PROGRESS
        ================================================= */}

        <div
          className="topbar-learning-progress"
          data-tooltip="Learning Progress: 68% complete"
        >
          <div className="topbar-progress-circle">
            <span>68</span>
          </div>

          <div className="topbar-progress-info">
            <span className="topbar-progress-label">LEARNING</span>

            <span className="topbar-progress-value">68% complete</span>
          </div>
        </div>

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <button
          type="button"
          className="topbar-icon-button topbar-notification-button"
          aria-label="Notifications"
          data-tooltip="Notifications"
        >
          <FiBell />

          <span className="topbar-notification-badge">3</span>
        </button>

        {/* =================================================
            PROFILE
        ================================================= */}

        <button
          type="button"
          className="topbar-profile"
          aria-label="Open learner profile"
          data-tooltip="Profile"
        >
          <div className="topbar-avatar">
            <span>D</span>
          </div>

          <div className="topbar-profile-info">
            <span className="topbar-profile-name">Dev</span>

            <span className="topbar-profile-role">Learner</span>
          </div>

          <FiChevronDown className="topbar-profile-arrow" />
        </button>
      </div>
    </header>
  );
};

export default LearnerTopbar;
