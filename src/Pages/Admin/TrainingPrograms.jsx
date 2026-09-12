import React, { useState, useMemo, useEffect } from 'react';
import './TrainingPrograms.css';
import {
  FiCalendar,
  FiPlus,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiBriefcase,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, StatusBadge, ProgressBar, Pagination, Modal, EmptyState } from './CommonComponents';
import { trainingService } from './servicesApi';

export default function TrainingPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await trainingService.getAll();
      setPrograms(data);
    } catch (err) {
      console.error('Failed fetching training programs from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editProg, setEditProg] = useState(null);
  const [deleteProg, setDeleteProg] = useState(null);
  const [viewProg, setViewProg] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [trainer, setTrainer] = useState('Ananya Deshmukh');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [participants, setParticipants] = useState(100);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.trainer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [programs, searchTerm, statusFilter]);

  const paginatedPrograms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPrograms.slice(start, start + pageSize);
  }, [filteredPrograms, currentPage]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newPPayload = {
      name,
      organization: org,
      trainer,
      startDate: startDate || "2024-08-01",
      endDate: endDate || "2024-10-30",
      participants: Number(participants),
      status: "Active",
      progress: 10,
      department: "Civil Administration"
    };
    try {
      const created = await trainingService.create(newPPayload);
      setPrograms([created, ...programs]);
    } catch (err) {
      console.error('Failed creating training program on backend:', err);
    }
    setIsCreateModalOpen(false);
    setName('');
    setOrg('');
  };

  const handleDelete = async () => {
    if (!deleteProg) return;
    try {
      if (trainingService.delete) {
        await trainingService.delete(deleteProg.id);
      }
      setPrograms(programs.filter((p) => p.id !== deleteProg.id));
    } catch (err) {
      console.error('Failed deleting training program from backend:', err);
    }
    setDeleteProg(null);
  };

  return (
    <div className="training-programs-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Training Programs</h2>
          <p>Institutional capacity initiatives and training cohorts synced with your database.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="cc-btn cc-btn-secondary"
            onClick={fetchPrograms}
            title="Refresh programs from database"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
          </button>
          <button className="cc-btn cc-btn-primary" onClick={() => setIsCreateModalOpen(true)}>
            <FiPlus /> Create Training Program
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="training-stats-grid">
        <StatCard
          title="Active Programs"
          value="24"
          change="+3 This Month"
          isPositive={true}
          icon={FiCalendar}
          colorScheme="blue"
        />
        <StatCard
          title="Upcoming Cohorts"
          value="18"
          change="Starting Soon"
          isPositive={true}
          icon={FiClock}
          colorScheme="amber"
        />
        <StatCard
          title="Completed"
          value="34"
          change="100% Certified"
          isPositive={true}
          icon={FiCheckCircle}
          colorScheme="green"
        />
        <StatCard
          title="Total Participants"
          value="3,850"
          change="+8.5%"
          isPositive={true}
          icon={FiUsers}
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
              placeholder="Search programs by name, department, trainer..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

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
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive-wrapper">
        {paginatedPrograms.length === 0 ? (
          <EmptyState
            title="No training programs found"
            description="Adjust your search filters or schedule a new cohort program."
            actionText="Clear Filters"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('All');
            }}
          />
        ) : (
          <table className="cc-table">
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Organization</th>
                <th>Lead Trainer</th>
                <th>Timeline</th>
                <th>Participants</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPrograms.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#102A43' }}>{p.name}</strong>
                      <span style={{ fontSize: '12px', color: '#718096' }}>{p.id}</span>
                    </div>
                  </td>
                  <td>{p.organization}</td>
                  <td>{p.trainer}</td>
                  <td>
                    <div style={{ fontSize: '12.5px', color: '#334155' }}>
                      {p.startDate} to {p.endDate}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                      <FiUsers style={{ color: '#0788C9' }} />
                      <span>{p.participants} Officers</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="View Program Dossier"
                        onClick={() => setViewProg(p)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Edit Details"
                        onClick={() => setEditProg(p)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Delete Program"
                        style={{ color: '#EF4444' }}
                        onClick={() => setDeleteProg(p)}
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
          totalItems={filteredPrograms.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* CREATE MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule New Training Cohort"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleCreate}>Schedule Cohort</button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Program Name</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. National Cyber Forensics Specialization"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Sponsoring Organization</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Ministry of Electronics & IT"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Assigned Trainer</label>
            <input
              type="text"
              className="form-input"
              value={trainer}
              onChange={(e) => setTrainer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Participants Cap</label>
            <input
              type="number"
              className="form-input"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        isOpen={!!viewProg}
        onClose={() => setViewProg(null)}
        title={viewProg?.name || 'Program Overview'}
        footer={<button className="cc-btn cc-btn-secondary" onClick={() => setViewProg(null)}>Close</button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Organization</span>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#102A43' }}>{viewProg?.organization}</div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Curriculum Progress</span>
            <ProgressBar value={viewProg?.progress || 50} max={100} color="#0788C9" />
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#475569' }}>
            <div><strong>Dates:</strong> {viewProg?.startDate} - {viewProg?.endDate}</div>
            <div><strong>Enrolled:</strong> {viewProg?.participants} Trainees</div>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editProg}
        onClose={() => setEditProg(null)}
        title="Edit Training Program"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setEditProg(null)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={() => setEditProg(null)}>Save Changes</button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Program Name</label>
            <input type="text" className="form-input" defaultValue={editProg?.name} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" defaultValue={editProg?.status}>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteProg}
        onClose={() => setDeleteProg(null)}
        title="Delete Program"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setDeleteProg(null)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete Cohort</button>
          </>
        }
      >
        <p style={{ color: '#475569' }}>
          Are you sure you want to cancel and delete cohort <strong>{deleteProg?.name}</strong>?
        </p>
      </Modal>
    </div>
  );
}
