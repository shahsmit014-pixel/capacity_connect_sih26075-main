import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiClock, FiStar, FiUser, FiPlay, FiCheck, FiBookOpen } from "react-icons/fi";
import Badge from "../../../Reusable_components/Badge/Badge";
import Button from "../../../Reusable_components/Button/Button";
import ProgressBar from "../../../Reusable_components/ProgressBar/ProgressBar";
import "./CourseCard.css";

const CourseCard = ({ course, onEnroll }) => {
  const navigate = useNavigate();
  if (!course) return null;

  const isEnrolled = course.enrolled;
  const isCompleted = course.status === "completed";
  const progress = course.progress || 0;

  return (
    <div className="cc-course-card">
      <div className="course-card-thumbnail">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="course-image"
          loading="lazy"
        />
        <span className="course-diff-badge">
          {course.difficulty}
        </span>
        {isCompleted && (
          <span className="course-status-ribbon completed">
            <FiCheck /> Certified
          </span>
        )}
      </div>

      <div className="course-card-content">
        <div className="course-category-row">
          <span className="course-category-tag">{course.category}</span>
          {course.rating && (
            <span className="course-rating">
              <FiStar className="star-icon" /> {course.rating}
            </span>
          )}
        </div>

        <h4 className="course-title" title={course.title}>
          <Link to={`/learner/courses/${course.id}`}>{course.title}</Link>
        </h4>

        <p className="course-desc">{course.description}</p>

        <div className="course-trainer-meta">
          <div className="trainer-info">
            <FiUser className="meta-icon" />
            <span>{course.trainer}</span>
          </div>
          <div className="duration-info">
            <FiClock className="meta-icon" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Skill tags */}
        <div className="course-skills-chips">
          {course.skills &&
            course.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
        </div>

        {/* Progress if enrolled */}
        {isEnrolled && !isCompleted && (
          <div className="course-card-progress">
            <div className="progress-text-row">
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>
            <ProgressBar value={progress} max={100} size="xs" variant="primary" />
          </div>
        )}

        <div className="course-card-footer">
          {isCompleted ? (
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => navigate(`/learner/courses/${course.id}`)}
              leftIcon={<FiBookOpen />}
            >
              Review Syllabus
            </Button>
          ) : isEnrolled ? (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => navigate(`/learner/courses/${course.id}/learn`)}
              leftIcon={<FiPlay />}
            >
              Continue Learning
            </Button>
          ) : (
            <div className="course-card-actions-row">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/learner/courses/${course.id}`)}
              >
                Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => (onEnroll ? onEnroll(course.id) : navigate(`/learner/courses/${course.id}`))}
              >
                Enroll Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
