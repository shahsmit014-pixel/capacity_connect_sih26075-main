import React, { useState, useEffect } from 'react';
import './CourseDetail.css';
import {
  FiArrowLeft,
  FiStar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiAward,
  FiCalendar,
  FiBarChart2,
  FiMessageSquare
} from 'react-icons/fi';
import { StatusBadge, ProgressBar, Modal } from './CommonComponents';
import { courseService } from './servicesApi';

export default function CourseDetail({ courseId = 'crs-201', onNavigate, onBack }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Published');
  const [openModuleId, setOpenModuleId] = useState('m1');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      setLoading(true);
      try {
        const data = await courseService.getById(courseId);
        if (data) {
          setCourse(data);
          setStatus(data.status);
        }
      } catch (err) {
        console.error('Failed fetching course detail from backend:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [courseId]);

  const toggleModule = (id) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  const handleApprove = async () => {
    if (!course) return;
    try {
      await courseService.update(course.id, { status: 'Published' });
      setStatus('Published');
      setCourse({ ...course, status: 'Published' });
    } catch (err) {
      console.error('Error approving course on backend:', err);
    }
  };

  const handleReject = async () => {
    if (!course) return;
    try {
      await courseService.update(course.id, { status: 'Rejected' });
      setStatus('Rejected');
      setCourse({ ...course, status: 'Rejected' });
    } catch (err) {
      console.error('Error rejecting course on backend:', err);
    }
  };

  const handleDelete = async () => {
    if (course) {
      try {
        await courseService.delete(course.id);
      } catch (err) {
        console.error('Error deleting course on backend:', err);
      }
    }
    setIsDeleteModalOpen(false);
    if (onBack) onBack();
    else if (onNavigate) onNavigate('courses');
  };

  if (loading || !course) {
    return (
      <div className="course-detail-container" style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ color: '#64748B' }}>Loading syllabus data from database...</p>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      {/* BACK NAV */}
      <div className="detail-top-nav">
        <button
          className="back-link-btn"
          onClick={() => {
            if (onBack) onBack();
            else if (onNavigate) onNavigate('courses');
          }}
        >
          <FiArrowLeft /> Back to Courses
        </button>
      </div>

      {/* HERO BANNER */}
      <div className="course-hero-banner">
        <div className="course-hero-main">
          <div className="course-hero-tags">
            <span className="category-tag">{course.category}</span>
            <StatusBadge status={course.level} />
            <StatusBadge status={status} />
          </div>

          <h2 className="course-hero-title">{course.title}</h2>
          <p className="course-hero-desc">{course.description}</p>

          <div className="course-hero-meta">
            <span><FiClock /> {course.duration}</span>
            <span><FiUsers /> {course.learners.toLocaleString()} Trainees</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <FiStar style={{ color: '#F59E0B' }} /> {course.rating} ({course.reviewsCount} reviews)
            </span>
            <span><FiCalendar /> Created {course.createdDate}</span>
          </div>
        </div>

        <div className="course-hero-actions">
          {status !== 'Published' && (
            <button className="cc-btn cc-btn-success" onClick={handleApprove}>
              <FiCheckCircle /> Approve Course
            </button>
          )}
          {status === 'Pending' && (
            <button className="cc-btn cc-btn-danger" onClick={handleReject}>
              <FiXCircle /> Reject Course
            </button>
          )}
          <button className="cc-btn cc-btn-secondary" onClick={() => setIsEditModalOpen(true)}>
            <FiEdit2 /> Edit Course
          </button>
          <button className="cc-btn cc-btn-danger" onClick={() => setIsDeleteModalOpen(true)}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* TWO COLUMN CONTENT */}
      <div className="tab-content-grid">
        {/* LEFT COLUMN: MODULES & LEARNING OUTCOMES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Modules Accordion */}
          <div className="detail-card">
            <div className="detail-card-title">
              <FiBookOpen /> Curriculum Modules & Lessons ({course.modules.length} Modules)
            </div>

            {course.modules.length === 0 ? (
              <p style={{ color: '#718096', fontSize: '13px' }}>
                Modules currently being authored by trainer.
              </p>
            ) : (
              <div className="module-accordion-list">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="module-accordion-item">
                    <div className="module-header" onClick={() => toggleModule(mod.id)}>
                      <div className="module-header-title">
                        <span>{mod.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="module-duration">{mod.duration}</span>
                        {openModuleId === mod.id ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                    </div>

                    {openModuleId === mod.id && (
                      <div className="module-body">
                        {mod.lessons.map((lesson, lIdx) => (
                          <div key={lIdx} className="lesson-row">
                            <FiCheckCircle style={{ color: '#0788C9', fontSize: '14px' }} />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Learning Outcomes */}
          <div className="detail-card">
            <div className="detail-card-title">
              <FiAward /> Competency Outcomes & Objectives
            </div>
            <div className="outcomes-list">
              {course.outcomes.map((out, idx) => (
                <div key={idx} className="outcome-item">
                  <FiCheck className="outcome-check-icon" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="detail-card">
            <div className="detail-card-title">
              <FiMessageSquare /> Trainee Feedback & Reviews ({course.reviews.length})
            </div>
            {course.reviews.length === 0 ? (
              <p style={{ color: '#718096', fontSize: '13px' }}>
                No reviews submitted for this newly listed curriculum yet.
              </p>
            ) : (
              <div className="reviews-grid">
                {course.reviews.map((rev, rIdx) => (
                  <div key={rIdx} className="review-item-card">
                    <div className="review-header">
                      <span>{rev.user}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#F59E0B' }}>
                        <FiStar /> {rev.rating}.0
                      </div>
                    </div>
                    <p className="review-text">{rev.comment}</p>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{rev.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: TRAINER INFO & LEARNER STATS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Trainer Info */}
          <div className="detail-card">
            <div className="detail-card-title">
              <FiAward /> Assigned Lead Trainer
            </div>
            <div className="trainer-profile-horizontal">
              <img src={course.trainerAvatar} alt={course.trainer} className="trainer-avatar-round" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '14px', color: '#102A43' }}>{course.trainer}</strong>
                <span style={{ fontSize: '12px', color: '#718096' }}>{course.trainerEmail}</span>
                <span style={{ fontSize: '11px', color: '#0788C9', fontWeight: 600, marginTop: '2px' }}>
                  Verified Master Facilitator
                </span>
              </div>
            </div>
          </div>

          {/* Learner Statistics */}
          <div className="detail-card">
            <div className="detail-card-title">
              <FiBarChart2 /> Learner Uptake & Progress
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  <span>Completion Rate</span>
                  <span>78%</span>
                </div>
                <ProgressBar value={78} max={100} color="#22C55E" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  <span>Quiz Pass Rate</span>
                  <span>92%</span>
                </div>
                <ProgressBar value={92} max={100} color="#0788C9" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  <span>On-Time Cohort Progress</span>
                  <span>84%</span>
                </div>
                <ProgressBar value={84} max={100} color="#8B5CF6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Course Information"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={() => setIsEditModalOpen(false)}>Save</button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Course Title</label>
            <input type="text" className="form-input" defaultValue={course.title} />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Duration</label>
            <input type="text" className="form-input" defaultValue={course.duration} />
          </div>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete Course</button>
          </>
        }
      >
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          Are you sure you want to permanently delete <strong>{course.title}</strong>?
        </p>
      </Modal>
    </div>
  );
}
