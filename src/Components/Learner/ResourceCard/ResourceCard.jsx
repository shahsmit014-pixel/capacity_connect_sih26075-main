import React from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiGlobe,
  FiHeadphones,
  FiPlayCircle,
  FiShield,
} from "react-icons/fi";

import Card from "../../../Reusable_components/Card/Card";
import Badge from "../../../Reusable_components/Badge/Badge";
import Button from "../../../Reusable_components/Button/Button";

import "./ResourceCard.css";

const resources = [
  {
    id: 1,
    type: "Guideline",
    typeIcon: "guideline",
    title: "Marine Data Reporting Standards",
    description:
      "A practical reference for maintaining consistent and reliable marine data reporting.",
    category: "Ocean Science",
    source: "Capacity Connect",
    duration: "12 min read",
    date: "Aug 24, 2026",
    status: "Approved",
    accent: "cyan",
  },
  {
    id: 2,
    type: "Video",
    typeIcon: "video",
    title: "Understanding Ocean Observation Systems",
    description:
      "Explore how observation systems support monitoring, analysis and operational decisions.",
    category: "Ocean Technology",
    source: "Capacity Connect",
    duration: "18 min watch",
    date: "Aug 18, 2026",
    status: "Approved",
    accent: "violet",
  },
  {
    id: 3,
    type: "Guide",
    typeIcon: "guide",
    title: "Field Data Collection",
    description:
      "Essential practices for collecting, organizing and validating field observations.",
    category: "Field Operations",
    source: "Capacity Connect",
    duration: "10 min read",
    date: "Aug 10, 2026",
    status: "Approved",
    accent: "amber",
  },
];

const featuredResource = {
  id: 4,
  type: "Knowledge Article",
  title: "Coastal Observation & Data Collection",
  description:
    "Learn how coastal observations are collected, validated and used for operational planning and informed decision-making.",
  category: "Ocean Science",
  source: "Capacity Connect",
  duration: "8 min read",
  date: "Aug 28, 2026",
  status: "Approved",
};

const ResourceIcon = ({ type }) => {
  if (type === "video") {
    return <FiPlayCircle />;
  }

  if (type === "guide") {
    return <FiBookOpen />;
  }

  return <FiFileText />;
};

const ResourceCard = ({
  onViewAllResources = () => console.log("Navigate to Knowledge Hub"),
  onViewResource = (resource) => console.log("View Resource:", resource),
}) => {
  return (
    <section
      className="resource-section"
      aria-labelledby="resource-section-title"
    >
      {/* =====================================================
          SECTION HEADER
          ===================================================== */}
      <div className="resource-section__header">
        <div className="resource-section__heading">
          <span className="resource-section__eyebrow">KNOWLEDGE HUB</span>

          <h2 id="resource-section-title" className="resource-section__title">
            Explore useful knowledge
          </h2>

          <p className="resource-section__description">
            Discover approved resources to strengthen your knowledge and support
            your learning journey.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          rightIcon={<FiChevronRight />}
          onClick={onViewAllResources}
        >
          View All
        </Button>
      </div>

      {/* =====================================================
          FEATURED RESOURCE
          ===================================================== */}
      <div className="resource-featured-card">
        <div className="resource-featured-card__visual">
          <div className="resource-featured-card__visual-glass">
            <div className="resource-featured-card__visual-icon">
              <FiGlobe />
            </div>

            <div className="resource-featured-card__visual-orbit resource-featured-card__visual-orbit--one" />

            <div className="resource-featured-card__visual-orbit resource-featured-card__visual-orbit--two" />

            <div className="resource-featured-card__visual-wave">
              <span />
              <span />
              <span />
            </div>

            <div className="resource-featured-card__visual-label">
              OCEAN KNOWLEDGE
            </div>
          </div>
        </div>

        <div className="resource-featured-card__content">
          <div className="resource-featured-card__top">
            <div className="resource-featured-card__type">
              <div className="resource-featured-card__type-icon">
                <FiFileText />
              </div>

              <span>{featuredResource.type}</span>
            </div>

            <Badge variant="success" size="sm">
              {featuredResource.status}
            </Badge>
          </div>

          <div className="resource-featured-card__main">
            <span className="resource-featured-card__category">
              {featuredResource.category}
            </span>

            <h3>{featuredResource.title}</h3>

            <p>{featuredResource.description}</p>
          </div>

          <div className="resource-featured-card__meta">
            <div className="resource-meta-item">
              <FiGlobe />

              <span>{featuredResource.source}</span>
            </div>

            <div className="resource-meta-item">
              <FiClock />

              <span>{featuredResource.duration}</span>
            </div>

            <div className="resource-meta-item">
              <FiCalendar />

              <span>{featuredResource.date}</span>
            </div>
          </div>

          <div className="resource-featured-card__footer">
            <Button
              variant="primary"
              size="md"
              rightIcon={<FiArrowUpRight />}
              onClick={() => onViewResource(featuredResource)}
            >
              Read Resource
            </Button>

            <div className="resource-featured-card__verified">
              <FiShield />

              <span>Approved resource</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RESOURCE GRID
          ===================================================== */}
      <div className="resource-grid">
        {resources.map((resource) => (
          <Card
            key={resource.id}
            variant="default"
            className={`resource-mini-card resource-mini-card--${resource.accent}`}
          >
            <div className="resource-mini-card__header">
              <div className="resource-mini-card__type">
                <div className="resource-mini-card__icon">
                  <ResourceIcon type={resource.typeIcon} />
                </div>

                <span>{resource.type}</span>
              </div>

              <Badge variant="success" size="sm">
                {resource.status}
              </Badge>
            </div>

            <div className="resource-mini-card__body">
              <span className="resource-mini-card__category">
                {resource.category}
              </span>

              <h3>{resource.title}</h3>

              <p>{resource.description}</p>
            </div>

            <div className="resource-mini-card__meta">
              <div>
                <FiClock />

                <span>{resource.duration}</span>
              </div>

              <div>
                <FiCalendar />

                <span>{resource.date}</span>
              </div>
            </div>

            <div className="resource-mini-card__footer">
              <div className="resource-mini-card__source">
                <span>Source</span>

                <strong>{resource.source}</strong>
              </div>

              <Button
                variant="ghost"
                size="sm"
                rightIcon={<FiChevronRight />}
                onClick={() => onViewResource(resource)}
              >
                {resource.type === "Video" ? "Watch" : "View"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* =====================================================
          KNOWLEDGE HUB INSIGHT
          ===================================================== */}
      <div className="resource-insight">
        <div className="resource-insight__icon">
          <FiHeadphones />
        </div>

        <div className="resource-insight__content">
          <strong>Keep exploring</strong>

          <span>
            New approved resources are regularly added to the Knowledge Hub.
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          rightIcon={<FiArrowUpRight />}
          onClick={onViewAllResources}
        >
          Explore Hub
        </Button>
      </div>
    </section>
  );
};

export default ResourceCard;
