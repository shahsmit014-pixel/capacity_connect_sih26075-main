import { Outlet } from "react-router-dom";

import LearnerSidebar from "../../Components/Learner/LearnerSidebar/LearnerSidebar";
import LearnerTopbar from "../../Components/Learner/LearnerTopbar/LearnerTopbar";

import "./LearnerLayout.css";

const LearnerLayout = () => {
  return (
    <div className="learner-layout">

      {/* Sidebar */}
      <LearnerSidebar />

      {/* Main Application */}
      <main className="learner-main">

        {/* Topbar */}
        <LearnerTopbar />

        {/* Current Page */}
        <section className="learner-page-content">
          <Outlet />
        </section>

      </main>

    </div>
  );
};

export default LearnerLayout;