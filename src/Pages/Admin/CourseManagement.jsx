import React, { useState, useMemo, useEffect } from 'react';
import './CourseManagement.css';
import {
  FiPlus,
  FiSearch,
  FiEye,
  FiEdit2,
  FiCheck,
  FiX,
  FiTrash2,
  FiLayers,
  FiCheckCircle,
  FiFileText,
  FiClock,
  FiStar,
  FiUsers,
  FiGrid,
  FiList,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, StatusBadge, Pagination, Modal, EmptyState } from './CommonComponents';
import { courseService } from './servicesApi';

export default function CourseManagement({ onNavigate, onSelectCourse }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      console.error('Failed fetching courses from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteConfirmCourse, setDeleteConfirmCourse] = useState(null);

  // Form states for Create Course
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [trainer, setTrainer] = useState('Dr. Rajesh Sharma');
  const [category, setCategory] = useState('Digital Skills');
  const [level, setLevel] = useState('Intermediate');
  const [duration, setDuration] = useState('4 Weeks (16 Hours)');

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.trainer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'All' || c.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [courses, searchTerm, categoryFilter, statusFilter]);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCourses.slice(start, start + pageSize);
  }, [filteredCourses, currentPage]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const newCoursePayload = {
      title,
      description: desc,
      trainer,
      trainerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      trainerEmail: "trainer@capacityconnect.gov.in",
      category,
      level,
      duration,
      learners: 0,
      rating: 5.0,
      reviewsCount: 0,
      status: "Draft",
      modules: [],
      outcomes: ["Acquire core competency standard"],
      reviews: []
    };
    try {
      const created = await courseService.create(newCoursePayload);
      setCourses([created, ...courses]);
    } catch (err) {
      console.error('Failed creating course on backend:', err);
    }
    setIsCreateModalOpen(false);
    setTitle('');
    setDesc('');
  };

  const handleApprove = async (course) => {
    try {
      await courseService.update(course.id, { status: 'Published' });
      setCourses(courses.map((c) => c.id === course.id ? { ...c, status: 'Published' } : c));
    } catch (err) {
      console.error('Failed approving course on backend:', err);
    }
  };

  const handleReject = async (course) => {
    try {
      await courseService.update(course.id, { status: 'Rejected' });
      setCourses(courses.map((c) => c.id === course.id ? { ...c, status: 'Rejected' } : c));
    } catch (err) {
      console.error('Failed rejecting course on backend:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmCourse) return;
    try {
      await courseService.delete(deleteConfirmCourse.id);
      setCourses(courses.filter((c) => c.id !== deleteConfirmCourse.id));
    } catch (err) {
      console.error('Failed deleting course from backend:', err);
    }
    setDeleteConfirmCourse(null);
  };

  const handleView = (course) => {
    if (onSelectCourse) onSelectCourse(course.id);
    if (onNavigate) onNavigate('course-detail', course.id);
  };

  return (
    <div className="course-mgmt-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Course Management</h2>
          <p>Curricula catalog directly bound to your sovereign training database.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="cc-btn cc-btn-secondary"
            onClick={fetchCourses}
            title="Refresh courses from database"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
          </button>
          <button className="cc-btn cc-btn-primary" onClick={() => setIsCreateModalOpen(true)}>
            <FiPlus /> Create Course
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="course-stats-grid">
        <StatCard
          title="Total Courses"
          value="248"
          change="+8.2%"
          isPositive={true}
          icon={FiLayers}
          colorScheme="blue"
        />
        <StatCard
          title="Published"
          value="186"
          change="+12 Active"
          isPositive={true}
          icon={FiCheckCircle}
          colorScheme="green"
        />
        <StatCard
          title="Draft Curricula"
          value="28"
          change="In Authoring"
          isPositive={true}
          icon={FiFileText}
          colorScheme="purple"
        />
        <StatCard
          title="Pending Review"
          value="34"
          change="High Priority"
          isPositive={false}
          icon={FiClock}
          colorScheme="amber"
        />
      </div>

      {/* TOOLBAR */}
      <div className="toolbar-card">
        <div className="toolbar-filters">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search courses or trainers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Categories</option>
            <option value="Digital Skills">Digital Skills</option>
            <option value="Management">Management</option>
            <option value="Leadership">Leadership</option>
            <option value="Industry Skills">Industry Skills</option>
            <option value="Technical Skills">Technical Skills</option>
            <option value="Communication">Communication</option>
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="view-mode-toggle">
          <button
            className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <FiList />
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Card View"
          >
            <FiGrid />
          </button>
        </div>
      </div>

      {/* COURSES DISPLAY */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Try broadening your search query or reset your category filters."
          actionText="Reset Filters"
          onAction={() => {
            setSearchTerm('');
            setCategoryFilter('All');
            setStatusFilter('All');
          }}
        />
      ) : viewMode === 'table' ? (
        <div className="table-responsive-wrapper">
          <table className="cc-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Trainer</th>
                <th>Category</th>
                <th>Level</th>
                <th>Learners</th>
                <th>Rating</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#102A43' }}>{course.title}</strong>
                      <span style={{ fontSize: '11.5px', color: '#718096' }}>{course.duration}</span>
                    </div>
                  </td>
                  <td>
                    <div className="course-trainer-row">
                      <img src={course.trainerAvatar} alt={course.trainer} className="trainer-avatar-mini" />
                      <span className="trainer-name-mini">{course.trainer}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-tag">{course.category}</span>
                  </td>
                  <td>
                    <StatusBadge status={course.level} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FiUsers style={{ color: '#718096' }} />
                      <span>{course.learners.toLocaleString()}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <FiStar style={{ color: '#F59E0B' }} />
                      <span>{course.rating}</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={course.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="View Course Curriculum"
                        onClick={() => handleView(course)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Edit Syllabus"
                        onClick={() => setEditCourse(course)}
                      >
                        <FiEdit2 />
                      </button>
                      {course.status === 'Pending' && (
                        <>
                          <button
                            className="cc-btn cc-btn-icon-only"
                            style={{ color: '#16A34A' }}
                            title="Approve Course"
                            onClick={() => handleApprove(course)}
                          >
                            <FiCheck />
                          </button>
                          <button
                            className="cc-btn cc-btn-icon-only"
                            style={{ color: '#EF4444' }}
                            title="Reject Course"
                            onClick={() => handleReject(course)}
                          >
                            <FiX />
                          </button>
                        </>
                      )}
                      <button
                        className="cc-btn cc-btn-icon-only"
                        style={{ color: '#EF4444' }}
                        title="Delete Course"
                        onClick={() => setDeleteConfirmCourse(course)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredCourses.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      ) : (
        <div className="course-cards-grid">
          {paginatedCourses.map((course) => (
            <div key={course.id} className="course-card-item">
              <div className="course-card-top">
                <div className="course-card-badges">
                  <span className="category-tag">{course.category}</span>
                  <StatusBadge status={course.status} />
                </div>
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-desc">{course.description}</p>
                <div className="course-trainer-row">
                  <img src={course.trainerAvatar} alt={course.trainer} className="trainer-avatar-mini" />
                  <span className="trainer-name-mini">{course.trainer}</span>
                </div>
              </div>
              <div className="course-card-footer">
                <div className="course-stats-mini">
                  <span><FiUsers /> {course.learners}</span>
                  <span><FiStar style={{ color: '#F59E0B' }} /> {course.rating}</span>
                  <span>{course.level}</span>
                </div>
                <div className="action-buttons-group">
                  <button className="cc-btn cc-btn-icon-only" onClick={() => handleView(course)} title="View Course">
                    <FiEye />
                  </button>
                  <button className="cc-btn cc-btn-icon-only" onClick={() => setEditCourse(course)} title="Edit">
                    <FiEdit2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Course Curriculum"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleCreateCourse}>Save Curriculum</button>
          </>
        }
      >
        <form onSubmit={handleCreateCourse} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Course Title</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Predictive Analytics in Municipal Water Systems"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Description & Overview</label>
            <textarea
              rows={3}
              required
              className="form-textarea"
              placeholder="Course summary and target civil audience..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Lead Trainer</label>
            <input
              type="text"
              className="form-input"
              value={trainer}
              onChange={(e) => setTrainer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Digital Skills">Digital Skills</option>
              <option value="Management">Management</option>
              <option value="Leadership">Leadership</option>
              <option value="Technical Skills">Technical Skills</option>
              <option value="Industry Skills">Industry Skills</option>
              <option value="Communication">Communication</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Competency Level</label>
            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Estimated Duration</label>
            <input
              type="text"
              className="form-input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editCourse}
        onClose={() => setEditCourse(null)}
        title={`Edit Syllabus: ${editCourse?.title || ''}`}
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setEditCourse(null)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={() => setEditCourse(null)}>Save Changes</button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Course Title</label>
            <input type="text" className="form-input" defaultValue={editCourse?.title} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" defaultValue={editCourse?.status}>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deleteConfirmCourse}
        onClose={() => setDeleteConfirmCourse(null)}
        title="Delete Course Curriculum"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setDeleteConfirmCourse(null)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete Course</button>
          </>
        }
      >
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          Are you sure you want to delete <strong>{deleteConfirmCourse?.title}</strong>? 
          This will archive syllabus history for all {deleteConfirmCourse?.learners} enrolled officers.
        </p>
      </Modal>
    </div>
  );
}
