import React, { useState, useMemo, useEffect } from 'react';
import './TrainerManagement.css';
import {
  FiSearch,
  FiUserCheck,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiCheck,
  FiX,
  FiEye,
  FiEdit2,
  FiSlash,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, StatusBadge, Pagination, Modal, EmptyState } from './CommonComponents';
import { userService } from './servicesApi';

export default function TrainerManagement({ onNavigate, onSelectUser }) {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [activeTrainerModal, setActiveTrainerModal] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'approve', 'reject', 'edit'

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const allUsers = await userService.getAll();
      const filtered = allUsers.filter((u) => u.role === 'Trainer');
      setTrainers(filtered);
    } catch (err) {
      console.error('Failed fetching trainers from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const filteredTrainers = useMemo(() => {
    return trainers.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.expertise && t.expertise.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchFilter = filterStatus === 'All' ||
        (filterStatus === 'Approved' ? t.status === 'Active' : t.status.toLowerCase() === filterStatus.toLowerCase());
      return matchSearch && matchFilter;
    });
  }, [trainers, filterStatus, searchTerm]);

  const paginatedTrainers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTrainers.slice(start, start + pageSize);
  }, [filteredTrainers, currentPage]);

  const handleApprove = async (trainer) => {
    try {
      await userService.update(trainer.id, { status: 'Active' });
      setTrainers(trainers.map((t) => (t.id === trainer.id ? { ...t, status: 'Active' } : t)));
    } catch (err) {
      console.error('Failed approving trainer on backend:', err);
    }
    setActiveTrainerModal(null);
  };

  const handleReject = async (trainer) => {
    try {
      await userService.update(trainer.id, { status: 'Rejected' });
      setTrainers(trainers.map((t) => (t.id === trainer.id ? { ...t, status: 'Rejected' } : t)));
    } catch (err) {
      console.error('Failed rejecting trainer on backend:', err);
    }
    setActiveTrainerModal(null);
  };

  const toggleSuspend = async (trainer) => {
    const nextStatus = trainer.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await userService.update(trainer.id, { status: nextStatus });
      setTrainers(trainers.map((t) => (t.id === trainer.id ? { ...t, status: nextStatus } : t)));
    } catch (err) {
      console.error('Failed toggling trainer status on backend:', err);
    }
  };

  return (
    <div className="trainer-container">
      {/* HEADING */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Trainer Management</h2>
          <p>Master instructors, SME verification, and training capacity directories connected to your backend.</p>
        </div>
        <button
          className="cc-btn cc-btn-secondary"
          onClick={fetchTrainers}
          title="Refresh trainers from database"
          disabled={loading}
        >
          <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
        </button>
      </div>

      {/* STATISTICS */}
      <div className="trainer-stats-row">
        <StatCard
          title="Total Trainers"
          value="486"
          change="+8.4%"
          isPositive={true}
          icon={FiUserCheck}
          colorScheme="blue"
        />
        <StatCard
          title="Active Trainers"
          value="412"
          change="+6.2%"
          isPositive={true}
          icon={FiCheckCircle}
          colorScheme="green"
        />
        <StatCard
          title="Pending Trainers"
          value="42"
          change="Requires Review"
          isPositive={false}
          icon={FiClock}
          colorScheme="amber"
        />
        <StatCard
          title="Top Rated Trainers"
          value="128"
          change="> 4.8 Rating"
          isPositive={true}
          icon={FiStar}
          colorScheme="purple"
        />
      </div>

      {/* TOOLBAR & PILLS */}
      <div className="toolbar-card">
        <div className="toolbar-filters">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search trainers by name, domain, email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="trainer-filter-pills">
            {['All', 'Pending', 'Approved', 'Rejected', 'Suspended'].map((pill) => (
              <button
                key={pill}
                className={`filter-pill-btn ${filterStatus === pill ? 'active' : ''}`}
                onClick={() => {
                  setFilterStatus(pill);
                  setCurrentPage(1);
                }}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TRAINERS TABLE */}
      <div className="table-responsive-wrapper">
        {paginatedTrainers.length === 0 ? (
          <EmptyState
            title="No trainers found"
            description="No trainers match the selected filter criteria."
            actionText="Clear Filters"
            onAction={() => {
              setFilterStatus('All');
              setSearchTerm('');
            }}
          />
        ) : (
          <table className="cc-table">
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Email</th>
                <th>Expertise</th>
                <th>Courses</th>
                <th>Rating</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrainers.map((trainer) => (
                <tr key={trainer.id}>
                  <td>
                    <div className="user-identity-cell">
                      <img src={trainer.avatar} alt={trainer.name} className="user-avatar-small" />
                      <div className="user-identity-text">
                        <span className="user-identity-name">{trainer.name}</span>
                        <span className="user-identity-email">{trainer.organization}</span>
                      </div>
                    </div>
                  </td>
                  <td>{trainer.email}</td>
                  <td>
                    <span style={{ fontWeight: 500, color: '#0B2A43' }}>
                      {trainer.expertise || "General Civil Capability"}
                    </span>
                  </td>
                  <td>
                    <strong>{trainer.coursesCount || 0}</strong> Courses
                  </td>
                  <td>
                    <div className="trainer-rating-cell">
                      <FiStar className="star-icon-gold" />
                      <span>{trainer.rating || 4.8}</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={trainer.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="View Profile Details"
                        onClick={() => {
                          if (onSelectUser) onSelectUser(trainer.id);
                          if (onNavigate) onNavigate('user-detail', trainer.id);
                        }}
                      >
                        <FiEye />
                      </button>

                      {trainer.status === 'Pending' && (
                        <>
                          <button
                            className="cc-btn cc-btn-icon-only"
                            style={{ color: '#16A34A' }}
                            title="Approve Trainer"
                            onClick={() => {
                              setActiveTrainerModal(trainer);
                              setModalAction('approve');
                            }}
                          >
                            <FiCheck />
                          </button>
                          <button
                            className="cc-btn cc-btn-icon-only"
                            style={{ color: '#EF4444' }}
                            title="Reject Trainer"
                            onClick={() => {
                              setActiveTrainerModal(trainer);
                              setModalAction('reject');
                            }}
                          >
                            <FiX />
                          </button>
                        </>
                      )}

                      <button
                        className="cc-btn cc-btn-icon-only"
                        title={trainer.status === 'Suspended' ? 'Reinstate' : 'Suspend'}
                        style={{ color: trainer.status === 'Suspended' ? '#16A34A' : '#D97706' }}
                        onClick={() => toggleSuspend(trainer)}
                      >
                        <FiSlash />
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
          totalItems={filteredTrainers.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* CONFIRM APPROVE / REJECT MODAL */}
      <Modal
        isOpen={!!activeTrainerModal}
        onClose={() => setActiveTrainerModal(null)}
        title={modalAction === 'approve' ? 'Approve Trainer Application' : 'Reject Trainer Application'}
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setActiveTrainerModal(null)}>Cancel</button>
            {modalAction === 'approve' ? (
              <button className="cc-btn cc-btn-success" onClick={() => handleApprove(activeTrainerModal)}>Confirm Approval</button>
            ) : (
              <button className="cc-btn cc-btn-danger" onClick={() => handleReject(activeTrainerModal)}>Confirm Rejection</button>
            )}
          </>
        }
      >
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          {modalAction === 'approve'
            ? `Authorize ${activeTrainerModal?.name} as an accredited Capacity Connect instructor. This allows publishing courses and assigning national civil cohorts.`
            : `Reject application from ${activeTrainerModal?.name}. An automated explanation email will be dispatched.`
          }
        </p>
      </Modal>
    </div>
  );
}
