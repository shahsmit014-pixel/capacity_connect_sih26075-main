import { Navigate, Routes, Route } from "react-router-dom";

import LearnerLayout from "../Layouts/LearnerLayout/LearnerLayout";

/* =========================================================
   LEARNER PAGES
========================================================= */

import Dashboard from "../Pages/Learner/Dashboard/Dashboard";

import CourseCatalog from "../Pages/Learner/CourseCatalog/CourseCatalog";

/* =========================================================
   TEMPORARY PLACEHOLDER PAGE

   We will replace these with real pages later.
========================================================= */

const PlaceholderPage = ({ title }) => {
  return (
    <div
      style={{
        minHeight: "400px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        border: "1px solid #dce3eb",
        borderRadius: "12px",

        background: "#ffffff",

        fontSize: "24px",
        fontWeight: "600",

        color: "#354052",

        boxSizing: "border-box",
      }}
    >
      {title}
    </div>
  );
};

/* =========================================================
   LEARNER ROUTES
========================================================= */

const LearnerRoutes = () => {
  return (
    <Routes>
      {/* =====================================================
          LEARNER LAYOUT
      ===================================================== */}

      <Route path="/" element={<LearnerLayout />}>
        {/* ===================================================
            DEFAULT LEARNER ROUTE

            /learner
                 ↓
            /learner/dashboard
        =================================================== */}

        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <Route path="dashboard" element={<Dashboard />} />

        {/* ===================================================
            LEARNING
        =================================================== */}

        <Route
          path="learning"
          element={<PlaceholderPage title="My Learning" />}
        />

        {/* ===================================================
            COURSE CATALOG
        =================================================== */}

        <Route path="courses" element={<CourseCatalog />} />

        {/* ===================================================
            COURSE JOURNEY
        =================================================== */}

        <Route
          path="courses/:courseId"
          element={<PlaceholderPage title="Course Details" />}
        />

        <Route
          path="courses/:courseId/learn"
          element={<PlaceholderPage title="Learning Player" />}
        />

        <Route
          path="courses/:courseId/quiz/:quizId"
          element={<PlaceholderPage title="Quiz" />}
        />

        <Route
          path="courses/:courseId/result/:attemptId"
          element={<PlaceholderPage title="Quiz Result" />}
        />

        {/* ===================================================
            COMPETENCY
        =================================================== */}

        <Route path="skills" element={<PlaceholderPage title="My Skills" />} />

        <Route
          path="skill-gaps"
          element={<PlaceholderPage title="Skill Gaps" />}
        />

        <Route
          path="recommendations"
          element={<PlaceholderPage title="Recommendations" />}
        />

        {/* ===================================================
            ACHIEVEMENTS
        =================================================== */}

        <Route
          path="certificates"
          element={<PlaceholderPage title="Certificates" />}
        />

        {/* ===================================================
            KNOWLEDGE HUB
        =================================================== */}

        <Route
          path="knowledge-hub"
          element={<PlaceholderPage title="Knowledge Hub" />}
        />

        <Route
          path="knowledge-hub/:resourceId"
          element={<PlaceholderPage title="Resource Details" />}
        />

        {/* ===================================================
            ACCOUNT
        =================================================== */}

        <Route path="profile" element={<PlaceholderPage title="Profile" />} />

        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
    </Routes>
  );
};

export default LearnerRoutes;