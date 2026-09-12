import React, { useState, useMemo, useEffect } from 'react';
import './LearnerManagement.css';
import {
  FiSearch,
  FiBookOpen,
  FiAward,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSlash,
  FiCheck,
  FiTrendingUp,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, StatusBadge, ProgressBar, Pagination, Modal, EmptyState } from './CommonComponents';
import { userService } from './servicesApi';

export default function LearnerManagement({ onNavigate, onSelectUser }) {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [competencyFilter, setCompetencyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modals
  const [editLearner, setEditLearner] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchLearners = async () => {
    setLoading(true);
    try {
      const allUsers = await userService.getAll();
      const filtered = allUsers.filter((u) => u.role === 'Learner' || u.role === 'Organization');
      setLearners(filtered);
    } catch (err) {
      console.error('Failed fetching learners from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearners();
  }, []);

  // Filter logic
  const filteredLearners = useMemo(() => {
    return learners.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = deptFilter === 'All' || l.department.includes(deptFilter);
      const matchComp = competencyFilter === 'All' || l.competencyLevel === competencyFilter;
      const matchStatus = statusFilter === 'All' || l.status === statusFilter;
      return matchSearch && matchDept && matchComp && matchStatus;
    });
  }, [learners, searchTerm, deptFilter, competencyFilter, statusFilter]);

  const paginatedLearners = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLearners.slice(start, start + pageSize);
  }, [filteredLearners, currentPage]);

  const toggleSuspend = async (learner) => {
    const nextStatus = learner.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await userService.update(learner.id, { status: nextStatus });
      setLearners(learners.map((l) => (l.id === learner.id ? { ...l, status: nextStatus } : l)));
    } catch (err) {
      console.error('Failed toggling status on backend:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await userService.delete(deleteConfirm.id);
      setLearners(learners.filter((l) => l.id !== deleteConfirm.id));
    } catch (err) {
      console.error('Failed deleting learner on backend:', err);
    }
    setDeleteConfirm(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (editLearner) {
      try {
        await userService.update(editLearner.id, {
          name: editLearner.name,
          department: editLearner.department,
          organization: editLearner.organization,
          competencyLevel: editLearner.competencyLevel
        });
        setLearners(learners.map((l) => (l.id === editLearner.id ? editLearner : l)));
      } catch (err) {
        console.error('Failed saving edit on backend:', err);
      }
    }
    setEditLearner(null);
  };

  return (
    <div className="learner-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Learner Management</h2>
          <p>Learner directories, progress logs, and competency ratings synced from your database.</p>
        </div>
        <button
          className="cc-btn cc-btn-secondary"
          onClick={fetchLearners}
          title="Refresh learners from database"
          disabled={loading}
        >
          <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
        </button>
      </div>

      {/* QUICK STATS */}
      <div className="learner-stats-grid">
        <StatCard
          title="Total Trainees"
          value="11,994"
          change="+13.2%"
          isPositive={true}
          icon={FiBookOpen}
          colorScheme="cyan"
        />
        <StatCard
          title="Avg Completion Rate"
          value="74.2%"
          change="+4.1%"
          isPositive={true}
          icon={FiTrendingUp}
          colorScheme="green"
        />
        <StatCard
          title="Advanced Competency"
          value="2,871"
          change="Tier 3 & 4"
          isPositive={true}
          icon={FiAward}
          colorScheme="purple"
        />
      </div>

      {/* TOOLBAR */}
      <div className="toolbar-card">
        <div className="toolbar-filters">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search learners by name, email, organization..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="filter-select"
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Departments</option>
            <option value="Public">Public Infrastructure & Works</option>
            <option value="Digital">Digital Services & IT</option>
            <option value="Space">Space Technology</option>
            <option value="Finance">Expenditure & Finance</option>
            <option value="Health">Public Healthcare</option>
          </select>

          <select
            className="filter-select"
            value={competencyFilter}
            onChange={(e) => {
              setCompetencyFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Competency Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
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
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* LEARNERS TABLE */}
      <div className="table-responsive-wrapper">
        {paginatedLearners.length === 0 ? (
          <EmptyState
            title="No learners found"
            description="No trainees matched your current search filters."
            actionText="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setDeptFilter('All');
              setCompetencyFilter('All');
              setStatusFilter('All');
            }}
          />
        ) : (
          <table className="cc-table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Courses</th>
                <th style={{ minWidth: '150px' }}>Progress</th>
                <th>Competency Level</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLearners.map((learner) => (
                <tr key={learner.id}>
                  <td>
                    <div className="user-identity-cell">
                      <img src={learner.avatar} alt={learner.name} className="user-avatar-small" />
                      <div className="user-identity-text">
                        <span className="user-identity-name">{learner.name}</span>
                        <span className="user-identity-email">{learner.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{learner.email}</td>
                  <td>{learner.organization}</td>
                  <td>
                    <strong>{learner.coursesCount || 3}</strong> Enrolled
                  </td>
                  <td>
                    <ProgressBar
                      value={learner.progress || 50}
                      max={100}
                      color={learner.progress > 80 ? '#22C55E' : learner.progress > 50 ? '#0788C9' : '#F59E0B'}
                    />
                  </td>
                  <td>
                    <StatusBadge status={learner.competencyLevel || 'Intermediate'} />
                  </td>
                  <td>
                    <StatusBadge status={learner.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="View Learner Dossier"
                        onClick={() => {
                          if (onSelectUser) onSelectUser(learner.id);
                          if (onNavigate) onNavigate('user-detail', learner.id);
                        }}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Edit Record"
                        onClick={() => setEditLearner(learner)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title={learner.status === 'Suspended' ? 'Activate Account' : 'Suspend Account'}
                        style={{ color: learner.status === 'Suspended' ? '#16A34A' : '#D97706' }}
                        onClick={() => toggleSuspend(learner)}
                      >
                        {learner.status === 'Suspended' ? <FiCheck /> : <FiSlash />}
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Delete Record"
                        style={{ color: '#EF4444' }}
                        onClick={() => setDeleteConfirm(learner)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={filteredLearners.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editLearner}
        onClose={() => setEditLearner(null)}
        title={`Edit Trainee Record: ${editLearner?.name || ''}`}
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setEditLearner(null)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleSaveEdit}>Update Record</button>
          </>
        }
      >
        <form onSubmit={handleSaveEdit} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" defaultValue={editLearner?.name} />
          </div>
          <div className="form-group">
            <label className="form-label">Competency Level</label>
            <select className="form-select" defaultValue={editLearner?.competencyLevel}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Progress Override (%)</label>
            <input type="number" min="0" max="100" className="form-input" defaultValue={editLearner?.progress || 0} />
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Removal"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete Trainee</button>
          </>
        }
      >
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          Remove <strong>{deleteConfirm?.name}</strong> from Capacity Connect registry?
        </p>
      </Modal>
    </div>
  );
}
