import React from "react";

import CourseCatalogHeader from "../../../Components/Learner/CourseCatalog/CourseCatalogHeader/CourseCatalogHeader";
import CourseFilters from "../../../Components/Learner/CourseCatalog/CourseFilters/CourseFilters";

import "./CourseCatalog.css";

const CourseCatalog = () => {
  /* =========================================================
     COURSE CATALOG DATA
  ========================================================= */

  const totalCourses = 18;

  /* =========================================================
     SEARCH HANDLER
     
     Temporary handler for now.
     Later this will connect with API / filtering logic.
  ========================================================= */

  const handleSearch = (searchQuery) => {
    console.log("Search Query:", searchQuery);
  };

  /* =========================================================
     FILTER HANDLER
     
     Temporary handler for now.
     Later this will update the course list.
  ========================================================= */

  const handleFilterChange = (updatedFilters) => {
    console.log("Updated Filters:", updatedFilters);
  };

  /* =========================================================
     RESET HANDLER
  ========================================================= */

  const handleReset = (defaultFilters) => {
    console.log("Filters Reset:", defaultFilters);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="course-catalog-page">
      {/* =====================================================
          COURSE CATALOG HEADER
      ===================================================== */}

      <CourseCatalogHeader
        totalCourses={totalCourses}
        activeLearners="1.2K+"
        completedCourses={12}
      />

      {/* =====================================================
          COURSE FILTERS
      ===================================================== */}

      <CourseFilters
        totalCourses={totalCourses}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
    </div>
  );
};

export default CourseCatalog;
