import React, { useState, useMemo, useEffect } from 'react';
import './CompetencyManagement.css';
import {
  FiAward,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiLayers,
  FiBookOpen,
  FiCheckCircle,
  FiSliders,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, StatusBadge, Pagination, Modal, EmptyState } from './CommonComponents';
import { competencyService } from './servicesApi';

export default function CompetencyManagement() {
  const [competencies, setCompetencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchCompetencies = async () => {
    setLoading(true);
    try {
      const data = await competencyService.getAll();
      setCompetencies(data);
    } catch (err) {
      console.error('Failed fetching competencies from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetencies();
  }, []);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editComp, setEditComp] = useState(null);
  const [deleteComp, setDeleteComp] = useState(null);

  // Form state
  const [compName, setCompName] = useState('');
  const [compDomain, setCompDomain] = useState('Digital');
  const [compLevel, setCompLevel] = useState('Intermediate');
  const [compDesc, setCompDesc] = useState('');

  const filteredCompetencies = useMemo(() => {
    return competencies.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDomain = domainFilter === 'All' || c.domain.toLowerCase().includes(domainFilter.toLowerCase());
      const matchLevel = levelFilter === 'All' || c.level === levelFilter;
      return matchSearch && matchDomain && matchLevel;
    });
  }, [competencies, searchTerm, domainFilter, levelFilter]);

  const paginatedCompetencies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCompetencies.slice(start, start + pageSize);
  }, [filteredCompetencies, currentPage]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newCPayload = {
      name: compName,
      domain: compDomain,
      level: compLevel,
      description: compDesc,
      coursesMapped: 1,
      certifiedLearners: 0
    };
    try {
      const created = await competencyService.create(newCPayload);
      setCompetencies([created, ...competencies]);
    } catch (err) {
      console.error('Failed creating competency on backend:', err);
    }
    setIsAddModalOpen(false);
    setCompName('');
    setCompDesc('');
  };

  const handleDelete = async () => {
    if (!deleteComp) return;
    try {
      await competencyService.delete(deleteComp.id);
      setCompetencies(competencies.filter((c) => c.id !== deleteComp.id));
    } catch (err) {
      console.error('Failed deleting competency from backend:', err);
    }
    setDeleteComp(null);
  };

  return (
    <div className="competency-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Competency Management</h2>
          <p>National civil service capability framework synced directly with your database.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="cc-btn cc-btn-secondary"
            onClick={fetchCompetencies}
            title="Refresh competencies from database"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
          </button>
          <button className="cc-btn cc-btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <FiPlus /> Add Competency
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="competency-stats-grid">
        <StatCard
          title="Total Competencies"
          value="142"
          change="+14 Standardized"
          isPositive={true}
          icon={FiAward}
          colorScheme="blue"
        />
        <StatCard
          title="Domains"
          value="8"
          change="National Taxonomy"
          isPositive={true}
          icon={FiLayers}
          colorScheme="purple"
        />
        <StatCard
          title="Skill Levels"
          value="4"
          change="Beg to Expert"
          isPositive={true}
          icon={FiSliders}
          colorScheme="cyan"
        />
        <StatCard
          title="Mapped Courses"
          value="210"
          change="85% Catalog Reach"
          isPositive={true}
          icon={FiBookOpen}
          colorScheme="green"
        />
      </div>

      {/* TOOLBAR */}
      <div className="toolbar-card">
        <div className="toolbar-filters">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search competencies or descriptions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="filter-select"
            value={domainFilter}
            onChange={(e) => {
              setDomainFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Domains</option>
            <option value="Digital">Digital</option>
            <option value="Management">Management</option>
            <option value="Technical">Technical</option>
            <option value="Leadership">Leadership</option>
            <option value="Governance">Governance</option>
            <option value="Communication">Communication</option>
          </select>

          <select
            className="filter-select"
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive-wrapper">
        {paginatedCompetencies.length === 0 ? (
          <EmptyState
            title="No competencies found"
            description="Adjust your search criteria or register a new competency standard."
            actionText="Clear Filters"
            onAction={() => {
              setSearchTerm('');
              setDomainFilter('All');
              setLevelFilter('All');
            }}
          />
        ) : (
          <table className="cc-table">
            <thead>
              <tr>
                <th>Competency Name</th>
                <th>Domain</th>
                <th>Level</th>
                <th>Associated Courses</th>
                <th>Learners Certified</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompetencies.map((comp) => (
                <tr key={comp.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#102A43' }}>{comp.name}</strong>
                      <span style={{ fontSize: '12px', color: '#718096' }}>{comp.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className="domain-pill-tag">{comp.domain}</span>
                  </td>
                  <td>
                    <StatusBadge status={comp.level} />
                  </td>
                  <td>
                    <strong style={{ color: '#0788C9' }}>{comp.coursesMapped}</strong> Courses
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                      <FiCheckCircle style={{ color: '#16A34A' }} />
                      <span>{comp.certifiedLearners.toLocaleString()}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Edit Competency"
                        onClick={() => setEditComp(comp)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Delete Competency"
                        style={{ color: '#EF4444' }}
                        onClick={() => setDeleteComp(comp)}
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
          totalItems={filteredCompetencies.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* ADD MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Competency"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleAdd}>Save Competency</button>
          </>
        }
      >
        <form onSubmit={handleAdd} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Competency Title</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. AI-Assisted Citizen Grievance Resolution"
              value={compName}
              onChange={(e) => setCompName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Domain</label>
            <select
              className="form-select"
              value={compDomain}
              onChange={(e) => setCompDomain(e.target.value)}
            >
              <option value="Digital">Digital</option>
              <option value="Management">Management</option>
              <option value="Technical">Technical</option>
              <option value="Leadership">Leadership</option>
              <option value="Governance">Governance</option>
              <option value="Communication">Communication</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Level</label>
            <select
              className="form-select"
              value={compLevel}
              onChange={(e) => setCompLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label className="form-label">Scope & Assessment Criteria</label>
            <textarea
              rows={3}
              className="form-textarea"
              placeholder="Demonstration metrics and capabilities expected..."
              value={compDesc}
              onChange={(e) => setCompDesc(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={!!editComp}
        onClose={() => setEditComp(null)}
        title="Edit Competency Standard"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setEditComp(null)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={() => setEditComp(null)}>Save Changes</button>
          </>
        }
      >
        <div className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Competency Title</label>
            <input type="text" className="form-input" defaultValue={editComp?.name} />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Level</label>
            <select className="form-select" defaultValue={editComp?.level}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteComp}
        onClose={() => setDeleteComp(null)}
        title="Confirm Removal"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setDeleteComp(null)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete</button>
          </>
        }
      >
        <p style={{ color: '#475569' }}>
          Are you sure you want to delete competency <strong>{deleteComp?.name}</strong>?
        </p>
      </Modal>
    </div>
  );
}
