import React, { useState, useEffect } from 'react';
import './UserDetail.css';
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiEdit2,
  FiSlash,
  FiCheck,
  FiTrash2,
  FiAward,
  FiBookOpen,
  FiClock,
  FiCheckCircle,
  FiActivity
} from 'react-icons/fi';
import { StatusBadge, ProgressBar, Modal } from './CommonComponents';
import { userService } from './servicesApi';

export default function UserDetail({ userId = 'usr-101', onNavigate, onBack }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [userStatus, setUserStatus] = useState('Active');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState('');
  const [org, setOrg] = useState('');

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const data = await userService.getById(userId);
        if (data) {
          setUser(data);
          setUserStatus(data.status);
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone || '+91 98000 00000');
          setDept(data.department);
          setOrg(data.organization);
        }
      } catch (err) {
        console.error('Error fetching user detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    const updates = { name, email, phone, department: dept, organization: org };
    try {
      await userService.update(user.id, updates);
      setUser({ ...user, ...updates });
    } catch (err) {
      console.error('Error updating user on backend:', err);
    }
    setIsEditModalOpen(false);
  };

  const toggleStatus = async () => {
    if (!user) return;
    const nextStatus = userStatus === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await userService.update(user.id, { status: nextStatus });
      setUserStatus(nextStatus);
      setUser({ ...user, status: nextStatus });
    } catch (err) {
      console.error('Error toggling user status on backend:', err);
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        await userService.delete(user.id);
      } catch (err) {
        console.error('Error deleting user from backend:', err);
      }
    }
    setIsDeleteModalOpen(false);
    if (onBack) onBack();
    else if (onNavigate) onNavigate('users');
  };

  if (loading || !user) {
    return (
      <div className="user-detail-container" style={{ padding: '60px', textAlign: 'center' }}>
        <p style={{ color: '#64748B' }}>Loading user profile from database...</p>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      {/* TOP NAVIGATION & BACK BUTTON */}
      <div className="detail-top-nav">
        <button
          className="back-link-btn"
          onClick={() => {
            if (onBack) onBack();
            else if (onNavigate) onNavigate('users');
          }}
        >
          <FiArrowLeft /> Back to Users
        </button>
      </div>

      {/* HERO PROFILE CARD */}
      <div className="profile-hero-card">
        <div className="hero-profile-info">
          <img src={user.avatar} alt={user.name} className="hero-avatar-large" />
          <div className="hero-text-block">
            <div className="hero-name-row">
              <h2 className="hero-name">{name}</h2>
              <span className={`role-badge-pill role-${user.role.toLowerCase()}`}>
                {user.role}
              </span>
              <StatusBadge status={userStatus} />
            </div>
            <div className="hero-meta-items">
              <div className="meta-item">
                <FiMail /> {email}
              </div>
              <div className="meta-item">
                <FiPhone /> {phone}
              </div>
              <div className="meta-item">
                <FiBriefcase /> {dept} • {org}
              </div>
              <div className="meta-item">
                <FiCalendar /> Joined {user.joinedDate}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-actions-bar">
          <button
            className="cc-btn cc-btn-secondary"
            onClick={() => setIsEditModalOpen(true)}
          >
            <FiEdit2 /> Edit User
          </button>
          <button
            className={`cc-btn ${userStatus === 'Suspended' ? 'cc-btn-success' : 'cc-btn-secondary'}`}
            onClick={toggleStatus}
          >
            {userStatus === 'Suspended' ? <><FiCheck /> Activate Account</> : <><FiSlash /> Suspend User</>}
          </button>
          <button
            className="cc-btn cc-btn-danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="detail-tabs-bar">
        {['Overview', 'Learning Activity', 'Competencies', 'Courses', 'Activity History'].map((tab) => (
          <button
            key={tab}
            className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'Overview' && (
        <div className="tab-content-grid">
          <div className="detail-card">
            <div className="detail-card-title">
              <FiBriefcase /> Official Demographics & Bio
            </div>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
              {user.bio}
            </p>

            <div className="info-field-grid" style={{ marginTop: '12px' }}>
              <div className="info-field-item">
                <span className="info-field-label">User ID</span>
                <span className="info-field-value">{user.id}</span>
              </div>
              <div className="info-field-item">
                <span className="info-field-label">Primary Organization</span>
                <span className="info-field-value">{org}</span>
              </div>
              <div className="info-field-item">
                <span className="info-field-label">Assigned Department</span>
                <span className="info-field-value">{dept}</span>
              </div>
              <div className="info-field-item">
                <span className="info-field-label">Official Status</span>
                <span className="info-field-value">{userStatus}</span>
              </div>
              <div className="info-field-item">
                <span className="info-field-label">Competency Tier</span>
                <span className="info-field-value">
                  <StatusBadge status={user.competencyLevel} />
                </span>
              </div>
              <div className="info-field-item">
                <span className="info-field-label">Total Completed Courses</span>
                <span className="info-field-value">{user.coursesCount} Courses</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card-title">
              <FiActivity /> Learning Progress
            </div>
            <div className="learning-progress-list">
              <div className="learning-item-row">
                <div className="learning-item-header">
                  <span>Overall Mandatory Completion</span>
                  <span>{user.progress}%</span>
                </div>
                <ProgressBar value={user.progress} max={100} color="#0788C9" />
              </div>

              <div className="learning-item-row">
                <div className="learning-item-header">
                  <span>Public Ethics & Governance</span>
                  <span>95%</span>
                </div>
                <ProgressBar value={95} max={100} color="#22C55E" />
              </div>

              <div className="learning-item-row">
                <div className="learning-item-header">
                  <span>Digital Mission Compliance</span>
                  <span>70%</span>
                </div>
                <ProgressBar value={70} max={100} color="#F59E0B" />
              </div>
            </div>

            <div style={{ marginTop: '14px' }}>
              <div className="detail-card-title" style={{ fontSize: '13.5px', marginBottom: '10px' }}>
                <FiClock /> Recent User Events
              </div>
              <div className="timeline-list">
                {user.recentActivity?.map((act, idx) => (
                  <div key={idx} className="timeline-item">
                    <span className="timeline-dot" />
                    <span className="timeline-title">{act.action}</span>
                    <span className="timeline-time">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Learning Activity' && (
        <div className="detail-card">
          <div className="detail-card-title">
            <FiActivity /> Detailed Activity & Assessment Metrics
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Total Learning Hours</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A43', marginTop: '6px' }}>42.5 hrs</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Certificates Earned</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#16A34A', marginTop: '6px' }}>8 Verified</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', fontWeight: 600 }}>Avg Quiz Score</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0788C9', marginTop: '6px' }}>91.4%</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Competencies' && (
        <div className="detail-card">
          <div className="detail-card-title">
            <FiAward /> Competencies & Skill Mastery
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#102A43' }}>Digital Public Infrastructure (DPI)</strong>
                <p style={{ fontSize: '12px', color: '#718096' }}>API integration with sovereign stack.</p>
              </div>
              <StatusBadge status="Expert" />
            </div>

            <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#102A43' }}>GFR & Tender Evaluation</strong>
                <p style={{ fontSize: '12px', color: '#718096' }}>Public finance and reverse auction compliance.</p>
              </div>
              <StatusBadge status="Advanced" />
            </div>

            <div style={{ padding: '14px', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#102A43' }}>Ethical Decision Making</strong>
                <p style={{ fontSize: '12px', color: '#718096' }}>Crisis containment and public grievance redressal.</p>
              </div>
              <StatusBadge status="Intermediate" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Courses' && (
        <div className="detail-card">
          <div className="detail-card-title">
            <FiBookOpen /> Enrolled & Completed Curricula
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="learning-item-row">
              <div className="learning-item-header">
                <strong>AI & Data-Driven Governance for Public Systems</strong>
                <StatusBadge status="Completed" />
              </div>
              <ProgressBar value={100} max={100} color="#22C55E" />
            </div>
            <div className="learning-item-row">
              <div className="learning-item-header">
                <strong>Public Procurement & GeM Portal Masterclass</strong>
                <StatusBadge status="Active" />
              </div>
              <ProgressBar value={65} max={100} color="#0788C9" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Activity History' && (
        <div className="detail-card">
          <div className="detail-card-title">
            <FiClock /> Security & Administrative Audit Log
          </div>
          <div className="timeline-list">
            <div className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-title">2-Factor Authentication via Aadhaar OTP verified</span>
              <span className="timeline-time">Today, 09:15 AM • IP 14.139.120.4</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-title">Submitted Capstone Project for Evaluation</span>
              <span className="timeline-time">Yesterday, 04:30 PM • Portal Client</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot" />
              <span className="timeline-title">Profile credentials updated by Administrator</span>
              <span className="timeline-time">3 days ago • System Event</span>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User Profile"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleSave}>Save Changes</button>
          </>
        }
      >
        <form onSubmit={handleSave} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="text" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" className="form-input" value={dept} onChange={(e) => setDept(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Organization</label>
            <input type="text" className="form-input" value={org} onChange={(e) => setOrg(e.target.value)} />
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User Record"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete Account</button>
          </>
        }
      >
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          Are you certain you wish to delete the profile of <strong>{name}</strong>? This action is irreversible.
        </p>
      </Modal>
    </div>
  );
}
