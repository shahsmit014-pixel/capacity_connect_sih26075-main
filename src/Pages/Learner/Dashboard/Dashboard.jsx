import WelcomeBanner from "../../../Components/Learner/WelcomeBanner/WelcomeBanner";
import StatCard from "../../../Components/Learner/StatCard/StatCard";
import LearningProgress from "../../../Components/Learner/LearningProgress/LearningProgress";
import SkillProgressCard from "../../../Components/Learner/SkillProgressCard/SkillProgressCard";
import SkillGapCard from "../../../Components/Learner/SkillGapCard/SkillGapCard";
import RecommendationCard from "../../../Components/Learner/RecommendationCard/RecommendationCard";
import ContinueLearningCard from "../../../Components/Learner/ContinueLearningCard/ContinueLearningCard";
import CertificateCard from "../../../Components/Learner/CertificateCard/CertificateCard";
import ResourceCard from "../../../Components/Learner/ResourceCard/ResourceCard";

import "./Dashboard.css";

const dashboardStats = [
  {
    id: 1,
    title: "Courses Completed",
    value: "12",
    description: "Courses successfully completed",
    icon: "completed",
    variant: "success",
  },
  {
    id: 2,
    title: "Learning Progress",
    value: "68%",
    description: "Overall learning progress",
    icon: "progress",
    variant: "ocean",
    trend: "+8%",
    trendType: "positive",
  },
  {
    id: 3,
    title: "Certificates",
    value: "8",
    description: "Certificates earned",
    icon: "certificates",
    variant: "achievement",
    trend: "+2",
    trendType: "positive",
  },
  {
    id: 4,
    title: "Active Learning",
    value: "4",
    description: "Courses currently in progress",
    icon: "learning",
    variant: "navy",
  },
];

const Dashboard = () => {
  return (
    <div className="learner-dashboard">
      {/* ==========================================================
          WELCOME
      ========================================================== */}

      <WelcomeBanner
        name="Dev"
        onProfileClick={() => {
          console.log("Navigate to profile");
        }}
      />

      {/* ==========================================================
          STATISTICS
      ========================================================== */}

      <section
        className="dashboard-stats-section"
        aria-labelledby="dashboard-stats-title"
      >
        <div className="dashboard-section-header">
          <div>
            <span className="dashboard-section-eyebrow">YOUR OVERVIEW</span>

            <h2 id="dashboard-stats-title" className="dashboard-section-title">
              Learning at a glance
            </h2>
          </div>
        </div>

        <div className="dashboard-stats">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              variant={stat.variant}
              trend={stat.trend}
              trendType={stat.trendType}
            />
          ))}
        </div>
      </section>

      {/* ==========================================================
          LEARNING PROGRESS
      ========================================================== */}

      <LearningProgress progress={68} totalCourses={18} completedCourses={12} />

      {/* ==========================================================
          MY SKILL PROFILE
      ========================================================== */}

      <SkillProgressCard
        onViewSkills={() => {
          console.log("Navigate to My Skills");
        }}
      />

      {/* ==========================================================
          SKILL GAP SUMMARY
      ========================================================== */}

      <SkillGapCard
        onViewSkillGaps={() => {
          console.log("Navigate to Skill Gaps");
        }}
        onExploreTraining={() => {
          console.log("Navigate to Recommended Training");
        }}
      />
      <RecommendationCard
        onViewAllRecommendations={() => {
          console.log("Navigate to Recommendations");
        }}
        onStartLearning={() => {
          console.log("Start Learning");
        }}
        onViewCourse={(course) => {
          console.log("View Course:", course);
        }}
      />
      <ContinueLearningCard
        onContinueLearning={() => {
          console.log("Continue Learning");
        }}
        onViewCourse={() => {
          console.log("View Course");
        }}
      />
      <CertificateCard
        onViewAllCertificates={() => console.log("Navigate to Certificates")}
        onViewCertificate={(certificate) =>
          console.log("View Certificate:", certificate)
        }
        onDownloadCertificate={(certificate) =>
          console.log("Download Certificate:", certificate)
        }
      />
      <ResourceCard
        onViewAllResources={() => console.log("Navigate to Knowledge Hub")}
        onViewResource={(resource) => console.log("View Resource:", resource)}
      />
    </div>
  );
};

export default Dashboard;
