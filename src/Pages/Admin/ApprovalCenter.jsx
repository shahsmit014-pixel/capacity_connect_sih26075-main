import React, { useState, useMemo, useEffect } from 'react';
import './ApprovalCenter.css';
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUserCheck,
  FiBookOpen,
  FiEye,
  FiCheck,
  FiX,
  FiCalendar,
  FiPaperclip,
  FiBriefcase,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, StatusBadge, Modal, EmptyState } from './CommonComponents';
import { approvalService } from './servicesApi';

export default function ApprovalCenter() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Trainer Applications');
  const [viewDetailModal, setViewDetailModal] = useState(null);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const data = await approvalService.getAll();
      setRequests(data);
    } catch (err) {
      console.error('Failed fetching approvals from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  // Tab mapping
  const currentCategory = useMemo(() => {
    if (activeTab.includes('Trainer')) return 'trainer';
    if (activeTab.includes('Course')) return 'course';
    return 'organization';
  }, [activeTab]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => r.category === currentCategory);
  }, [requests, currentCategory]);

  const handleApprove = async (id) => {
    try {
      await approvalService.updateStatus(id, 'Approved');
      setRequests(requests.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r)));
    } catch (err) {
      console.error('Failed approving request on backend:', err);
    }
    if (viewDetailModal?.id === id) setViewDetailModal(null);
  };

  const handleReject = async (id) => {
    try {
      await approvalService.updateStatus(id, 'Rejected');
      setRequests(requests.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)));
    } catch (err) {
      console.error('Failed rejecting request on backend:', err);
    }
    if (viewDetailModal?.id === id) setViewDetailModal(null);
  };

  const trainerCount = requests.filter((r) => r.category === 'trainer' && r.status === 'Pending').length;
  const courseCount = requests.filter((r) => r.category === 'course' && r.status === 'Pending').length;
  const orgCount = requests.filter((r) => r.category === 'organization' && r.status === 'Pending').length;

  return (
    <div className="approval-center-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Approval Center</h2>
          <p>Governance and authorization workflows synchronized directly with your database.</p>
        </div>
        <button
          className="cc-btn cc-btn-secondary"
          onClick={fetchApprovals}
          title="Refresh approval records from database"
          disabled={loading}
        >
          <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
        </button>
      </div>

      {/* STATISTICS */}
      <div className="approval-stats-grid">
        <StatCard
          title="Pending Approvals"
          value="34"
          change="Action Required"
          isPositive={false}
          icon={FiClock}
          colorScheme="amber"
        />
        <StatCard
          title="Approved Today"
          value="18"
          change="+12 from yesterday"
          isPositive={true}
          icon={FiCheckCircle}
          colorScheme="green"
        />
        <StatCard
          title="Rejected Today"
          value="3"
          change="Documentation deficient"
          isPositive={false}
          icon={FiXCircle}
          colorScheme="red"
        />
        <StatCard
          title="Average Response Time"
          value="4.2 hours"
          change="Under 6h SLA"
          isPositive={true}
          icon={FiClock}
          colorScheme="purple"
        />
      </div>

      {/* TABS ROW */}
      <div className="detail-tabs-bar">
        <button
          className={`detail-tab-btn ${activeTab.includes('Trainer') ? 'active' : ''}`}
          onClick={() => setActiveTab('Trainer Applications')}
        >
          Trainer Applications ({trainerCount})
        </button>
        <button
          className={`detail-tab-btn ${activeTab.includes('Course') ? 'active' : ''}`}
          onClick={() => setActiveTab('Course Submissions')}
        >
          Course Submissions ({courseCount})
        </button>
        <button
          className={`detail-tab-btn ${activeTab.includes('Organization') ? 'active' : ''}`}
          onClick={() => setActiveTab('Organization Requests')}
        >
          Organization Requests ({orgCount})
        </button>
      </div>

      {/* REQUESTS LIST */}
      <div className="requests-list">
        {filteredRequests.length === 0 ? (
          <EmptyState
            title="All caught up!"
            description={`No pending requests under ${activeTab}.`}
          />
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="request-main-info">
                <img src={req.avatar} alt={req.applicant} className="request-avatar" />
                <div className="request-details">
                  <div className="request-title-row">
                    <span className="request-title">{req.title}</span>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="request-desc">{req.summary}</p>
                  <div className="request-meta-row">
                    <span><strong>Applicant:</strong> {req.applicant}</span>
                    <span><FiBriefcase /> {req.organization}</span>
                    <span><FiCalendar /> Submitted {req.submittedDate}</span>
                    <span><FiPaperclip /> {req.documentsCount} documents</span>
                  </div>
                </div>
              </div>

              <div className="request-actions-bar">
                <button
                  className="cc-btn cc-btn-secondary"
                  onClick={() => setViewDetailModal(req)}
                >
                  <FiEye /> View Details
                </button>
                {req.status === 'Pending' && (
                  <>
                    <button
                      className="cc-btn cc-btn-success"
                      onClick={() => handleApprove(req.id)}
                    >
                      <FiCheck /> Approve
                    </button>
                    <button
                      className="cc-btn cc-btn-danger"
                      onClick={() => handleReject(req.id)}
                    >
                      <FiX /> Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* VIEW DETAILS MODAL */}
      <Modal
        isOpen={!!viewDetailModal}
        onClose={() => setViewDetailModal(null)}
        title={`Request Dossier: ${viewDetailModal?.id || ''}`}
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setViewDetailModal(null)}>Close</button>
            {viewDetailModal?.status === 'Pending' && (
              <>
                <button className="cc-btn cc-btn-danger" onClick={() => handleReject(viewDetailModal.id)}>Reject</button>
                <button className="cc-btn cc-btn-success" onClick={() => handleApprove(viewDetailModal.id)}>Approve Application</button>
              </>
            )}
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Proposal Title</span>
            <h4 style={{ color: '#102A43', marginTop: '2px' }}>{viewDetailModal?.title}</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Applicant</span>
              <div style={{ fontWeight: 600, color: '#102A43' }}>{viewDetailModal?.applicant}</div>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Entity</span>
              <div style={{ fontWeight: 600, color: '#102A43' }}>{viewDetailModal?.organization}</div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Detailed Scope</span>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginTop: '4px' }}>
              {viewDetailModal?.summary} The submission adheres to Indian National Civil Service Competency Framework guidelines and includes vetted certification credentials.
            </p>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Submitted Artifacts</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <div style={{ padding: '8px 12px', background: '#F1F5F9', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiPaperclip /> Verification_Cert.pdf (1.8 MB)
              </div>
              <div style={{ padding: '8px 12px', background: '#F1F5F9', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiPaperclip /> Syllabus_Charter.docx (940 KB)
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
