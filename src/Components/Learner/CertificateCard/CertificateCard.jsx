import React from "react";
import {
  FiAward,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiShield,
  FiUser,
} from "react-icons/fi";

import Card from "../../../Reusable_components/Card/Card";
import Badge from "../../../Reusable_components/Badge/Badge";
import Button from "../../../Reusable_components/Button/Button";

import "./CertificateCard.css";

const certificates = [
  {
    id: "CC-BDF-2026-0012",
    title: "Backend Development Fundamentals",
    category: "Backend Development",
    issuedDate: "Aug 28, 2026",
    status: "Completed",
    issuer: "Capacity Connect",
    credential: "CC-BDF-2026-0012",
    duration: "6 Weeks",
    score: "92%",
    featured: true,
  },
  {
    id: "CC-RAF-2026-0087",
    title: "React Application Fundamentals",
    category: "Frontend Development",
    issuedDate: "Aug 12, 2026",
    status: "Completed",
    issuer: "Capacity Connect",
    credential: "CC-RAF-2026-0087",
    duration: "4 Weeks",
    score: "94%",
  },
  {
    id: "CC-JSE-2026-0141",
    title: "JavaScript Essentials",
    category: "Web Development",
    issuedDate: "Jul 28, 2026",
    status: "Completed",
    issuer: "Capacity Connect",
    credential: "CC-JSE-2026-0141",
    duration: "5 Weeks",
    score: "89%",
  },
  {
    id: "CC-PDB-2026-0216",
    title: "PostgreSQL Database Basics",
    category: "Database",
    issuedDate: "Jul 10, 2026",
    status: "Completed",
    issuer: "Capacity Connect",
    credential: "CC-PDB-2026-0216",
    duration: "3 Weeks",
    score: "91%",
  },
];

const CertificateCard = ({
  learner = {
    name: "Dev Bhojani",
    role: "Learner",
    profilePhoto: "",
  },
  onViewAllCertificates = () => console.log("Navigate to all certificates"),
  onViewCertificate = (certificate) =>
    console.log("View Certificate:", certificate),
  onDownloadCertificate = (certificate) =>
    console.log("Download Certificate:", certificate),
}) => {
  const featuredCertificate = certificates.find(
    (certificate) => certificate.featured,
  );

  const otherCertificates = certificates.filter(
    (certificate) => !certificate.featured,
  );

  const getInitials = (name) => {
    if (!name) return "DB";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <section
      className="certificate-section"
      aria-labelledby="certificate-section-title"
    >
      {/* Section Header */}
      <div className="certificate-section__header">
        <div className="certificate-section__heading">
          <span className="certificate-section__eyebrow">
            YOUR ACHIEVEMENTS
          </span>

          <h2
            id="certificate-section-title"
            className="certificate-section__title"
          >
            Certificates you've earned
          </h2>

          <p className="certificate-section__description">
            Recognitions earned through your completed learning journeys.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          rightIcon={<FiChevronRight />}
          onClick={onViewAllCertificates}
        >
          View All
        </Button>
      </div>

      {/* Featured Certificate */}
      <Card variant="default" className="certificate-featured-card">
        <div className="certificate-featured-card__top">
          <div className="certificate-featured-card__identity">
            <div className="certificate-featured-card__icon">
              <FiAward />
            </div>

            <div>
              <Badge variant="success" size="sm">
                Latest Achievement
              </Badge>

              <p className="certificate-featured-card__issuer">
                Issued by {featuredCertificate.issuer}
              </p>
            </div>
          </div>

          <div className="certificate-featured-card__verified">
            <FiShield />
            <span>Verified Credential</span>
          </div>
        </div>

        <div className="certificate-featured-card__content">
          {/* Certificate Preview */}
          <div className="certificate-preview">
            <div className="certificate-preview__paper">
              <div className="certificate-preview__inner">
                <div className="certificate-preview__top-line" />

                <div className="certificate-preview__brand">
                  <div className="certificate-preview__brand-mark">
                    <FiAward />
                  </div>

                  <span>CAPACITY CONNECT</span>
                </div>

                <p className="certificate-preview__label">
                  CERTIFICATE OF COMPLETION
                </p>

                <div className="certificate-preview__ornament">
                  <span />
                  <FiAward />
                  <span />
                </div>

                <p className="certificate-preview__presented">
                  This certificate is proudly presented to
                </p>

                <div className="certificate-preview__learner">
                  <div className="certificate-preview__photo">
                    {learner.profilePhoto ? (
                      <img
                        src={learner.profilePhoto}
                        alt={`${learner.name} profile`}
                      />
                    ) : (
                      <span>{getInitials(learner.name)}</span>
                    )}
                  </div>

                  <div className="certificate-preview__learner-name">
                    {learner.name}
                  </div>
                </div>

                <p className="certificate-preview__completion">
                  for successfully completing
                </p>

                <h3 className="certificate-preview__course">
                  {featuredCertificate.title}
                </h3>

                <div className="certificate-preview__details">
                  <div>
                    <span>Issued</span>
                    <strong>{featuredCertificate.issuedDate}</strong>
                  </div>

                  <div>
                    <span>Score</span>
                    <strong>{featuredCertificate.score}</strong>
                  </div>

                  <div>
                    <span>Credential</span>
                    <strong>{featuredCertificate.credential}</strong>
                  </div>
                </div>

                <div className="certificate-preview__signature-row">
                  <div className="certificate-preview__signature">
                    <span className="certificate-preview__signature-name">
                      Capacity Connect
                    </span>
                    <span>Learning & Development</span>
                  </div>

                  <div className="certificate-preview__seal">
                    <FiShield />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="certificate-preview__bottom-line" />
              </div>
            </div>
          </div>

          {/* Certificate Information */}
          <div className="certificate-featured-info">
            <div className="certificate-featured-info__heading">
              <span className="certificate-featured-info__category">
                {featuredCertificate.category}
              </span>

              <h3>{featuredCertificate.title}</h3>

              <p>
                You've successfully completed all required modules and
                assessments for this learning program.
              </p>
            </div>

            <div className="certificate-featured-info__status">
              <div className="certificate-status-icon">
                <FiCheckCircle />
              </div>

              <div>
                <strong>{featuredCertificate.status}</strong>
                <span>Earned on {featuredCertificate.issuedDate}</span>
              </div>
            </div>

            <div className="certificate-meta">
              <div className="certificate-meta__item">
                <FiCalendar />
                <div>
                  <span>Issue Date</span>
                  <strong>{featuredCertificate.issuedDate}</strong>
                </div>
              </div>

              <div className="certificate-meta__item">
                <FiFileText />
                <div>
                  <span>Credential ID</span>
                  <strong>{featuredCertificate.credential}</strong>
                </div>
              </div>

              <div className="certificate-meta__item">
                <FiAward />
                <div>
                  <span>Final Score</span>
                  <strong>{featuredCertificate.score}</strong>
                </div>
              </div>
            </div>

            <div className="certificate-featured-info__actions">
              <Button
                variant="primary"
                size="md"
                leftIcon={<FiExternalLink />}
                onClick={() => onViewCertificate(featuredCertificate)}
              >
                View Certificate
              </Button>

              <Button
                variant="outline"
                size="md"
                leftIcon={<FiDownload />}
                onClick={() => onDownloadCertificate(featuredCertificate)}
              >
                Download
              </Button>
            </div>

            <div className="certificate-featured-info__verification">
              <FiShield />

              <span>Credential verified by Capacity Connect</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Other Certificates */}
      <div className="certificate-list">
        {otherCertificates.map((certificate) => (
          <Card
            key={certificate.id}
            variant="default"
            className="certificate-mini-card"
          >
            <div className="certificate-mini-card__header">
              <div className="certificate-mini-card__icon">
                <FiAward />
              </div>

              <Badge variant="success" size="sm">
                Completed
              </Badge>
            </div>

            <div className="certificate-mini-card__body">
              <span className="certificate-mini-card__category">
                {certificate.category}
              </span>

              <h3>{certificate.title}</h3>

              <div className="certificate-mini-card__date">
                <FiCalendar />
                <span>{certificate.issuedDate}</span>
              </div>
            </div>

            <div className="certificate-mini-card__footer">
              <div className="certificate-mini-card__credential">
                <span>Credential ID</span>
                <strong>{certificate.credential}</strong>
              </div>

              <Button
                variant="ghost"
                size="sm"
                rightIcon={<FiChevronRight />}
                onClick={() => onViewCertificate(certificate)}
              >
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Summary */}
      <div className="certificate-achievement-summary">
        <div className="certificate-achievement-summary__profile">
          <div className="certificate-achievement-summary__avatar">
            {learner.profilePhoto ? (
              <img src={learner.profilePhoto} alt={`${learner.name} profile`} />
            ) : (
              <>
                <FiUser />
              </>
            )}
          </div>

          <div>
            <strong>{learner.name}</strong>
            <span>{learner.role}</span>
          </div>
        </div>

        <div className="certificate-achievement-summary__stats">
          <div>
            <strong>{certificates.length}</strong>
            <span>Certificates earned</span>
          </div>

          <div>
            <strong>4</strong>
            <span>Learning programs</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Skill areas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateCard;
