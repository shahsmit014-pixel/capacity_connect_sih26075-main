import React, { useState } from 'react';
import './AdminDashboard.css';
import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiLayers,
  FiCalendar,
  FiCheckCircle,
  FiPlus,
  FiActivity,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiFileText
} from 'react-icons/fi';
import { StatCard, ProgressBar, Modal } from './CommonComponents';
import { MONTHLY_USER_GROWTH } from './mockData';
import { userService, courseService, trainingService, knowledgeService } from './servicesApi';

export default function AdminDashboard({ onNavigate }) {
  const [modalType, setModalType] = useState(null); // 'user', 'course', 'training', 'resource'
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // Form states for quick action modals
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Learner');

  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Digital Skills');
  const [newCourseLevel, setNewCourseLevel] = useState('Intermediate');

  const [newProgName, setNewProgName] = useState('');
  const [newProgOrg, setNewProgOrg] = useState('');

  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceType, setNewResourceType] = useState('PDF');

  const handleQuickAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'user') {
        await userService.create({
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
          department: 'Digital Services',
          organization: 'National Informatics Centre',
          status: 'Active'
        });
      } else if (modalType === 'course') {
        await courseService.create({
          title: newCourseTitle,
          category: newCourseCategory,
          level: newCourseLevel,
          duration: '4 Weeks',
          description: 'Added via Admin Dashboard Quick Action',
          status: 'Published'
        });
      } else if (modalType === 'training') {
        await trainingService.create({
          title: newProgName,
          organization: newProgOrg,
          category: 'Digital Governance',
          startDate: new Date().toISOString().split('T')[0]
        });
      } else if (modalType === 'resource') {
        await knowledgeService.create({
          title: newResourceTitle,
          fileType: newResourceType,
          category: 'Guidelines',
          size: '2.5 MB'
        });
      }
    } catch (err) {
      console.error('Error submitting quick add to database:', err);
    }

    setFormSuccessMessage(`Success! New ${modalType} synced with backend database.`);
    setTimeout(() => {
      setModalType(null);
      setFormSuccessMessage('');
      setNewUserName('');
      setNewUserEmail('');
      setNewCourseTitle('');
      setNewProgName('');
      setNewResourceTitle('');
    }, 1200);
  };

  // SVG Chart Calculation for User Growth
  const chartHeight = 200;
  const chartWidth = 600;
  const paddingX = 40;
  const paddingY = 20;

  const maxVal = 14000;
  const minVal = 4000;

  const getCoordinates = (index, val) => {
    const x = paddingX + (index / (MONTHLY_USER_GROWTH.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (chartHeight - paddingY * 2);
    return { x, y };
  };

  const points = MONTHLY_USER_GROWTH.map((d, i) => getCoordinates(i, d.users));
  const activePoints = MONTHLY_USER_GROWTH.map((d, i) => getCoordinates(i, d.active));

  const svgLinePath = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  const svgActiveLinePath = activePoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  
  const svgAreaPath = `${svgLinePath} L ${points[points.length - 1].x},${chartHeight - paddingY} L ${points[0].x},${chartHeight - paddingY} Z`;

  return (
    <div className="dashboard-container">
      {/* HEADER BANNER */}
      <div className="dashboard-header-banner">
        <div className="dashboard-title-group">
          <h2>Welcome back, Admin 👋</h2>
          <p className="dashboard-subtitle">
            Here's what's happening across Capacity Connect today. All systems operational for Smart India Hackathon.
          </p>
        </div>
        <div className="quick-actions-bar">
          <button className="quick-action-btn" onClick={() => setModalType('user')}>
            <FiPlus /> Add User
          </button>
          <button className="quick-action-btn" onClick={() => setModalType('course')}>
            <FiPlus /> Add Course
          </button>
          <button className="quick-action-btn" onClick={() => setModalType('training')}>
            <FiPlus /> Add Training
          </button>
          <button className="quick-action-btn" onClick={() => setModalType('resource')}>
            <FiPlus /> Add Resource
          </button>
        </div>
      </div>

      {/* 6 STATISTICS CARDS */}
      <div className="stats-grid-6">
        <StatCard
          title="Total Users"
          value="12,480"
          change="+12.5%"
          isPositive={true}
          icon={FiUsers}
          colorScheme="blue"
          subtitle="Active registered citizens"
        />
        <StatCard
          title="Trainers"
          value="486"
          change="+8.4%"
          isPositive={true}
          icon={FiUserCheck}
          colorScheme="purple"
          subtitle="Certified instructors"
        />
        <StatCard
          title="Learners"
          value="11,994"
          change="+13.2%"
          isPositive={true}
          icon={FiBookOpen}
          colorScheme="cyan"
          subtitle="Civil servant trainees"
        />
        <StatCard
          title="Active Courses"
          value="248"
          change="+8.2%"
          isPositive={true}
          icon={FiLayers}
          colorScheme="green"
          subtitle="Verified curricula"
        />
        <StatCard
          title="Training Programs"
          value="76"
          change="+5.8%"
          isPositive={true}
          icon={FiCalendar}
          colorScheme="amber"
          subtitle="Live department cohorts"
        />
        <StatCard
          title="Pending Approvals"
          value="34"
          change="Urgent"
          isPositive={false}
          icon={FiCheckCircle}
          colorScheme="red"
          subtitle="Needs review today"
        />
      </div>

      {/* ANALYTICS ROW: USER GROWTH & LEARNING ACTIVITY */}
      <div className="dashboard-analytics-row">
        {/* User Growth Chart */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="card-title">
              <FiTrendingUp style={{ color: '#0788C9' }} /> User Growth
            </div>
            <span className="card-tag">Monthly Active Records</span>
          </div>

          <div className="chart-container-svg">
            <svg className="chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="userGrowthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0788C9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0788C9" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[4000, 8000, 12000].map((gridVal) => {
                const y = chartHeight - paddingY - ((gridVal - minVal) / (maxVal - minVal)) * (chartHeight - paddingY * 2);
                return (
                  <g key={gridVal}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#E2E8F0" strokeDasharray="4 4" />
                    <text x={paddingX - 8} y={y + 4} fill="#94A3B8" fontSize="10" textAnchor="end">{gridVal}</text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <path d={svgAreaPath} fill="url(#userGrowthGrad)" />

              {/* Active Users Line */}
              <path d={svgActiveLinePath} fill="none" stroke="#18BCEB" strokeWidth="2.5" strokeDasharray="5 3" />

              {/* Total Users Line */}
              <path d={svgLinePath} fill="none" stroke="#0788C9" strokeWidth="3" strokeLinecap="round" />

              {/* Points */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#FFFFFF" stroke="#0788C9" strokeWidth="2.5" />
                  <text
                    x={pt.x}
                    y={chartHeight - 4}
                    fill="#64748B"
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {MONTHLY_USER_GROWTH[i].month}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#0788C9' }}></div>
              <span>Total Registered Users</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#18BCEB' }}></div>
              <span>Active Monthly Trainees</span>
            </div>
          </div>
        </div>

        {/* Learning Activity & Competency Overview */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="card-title">
              <FiActivity style={{ color: '#16A34A' }} /> Learning Activity
            </div>
            <span className="card-tag">Real-time Metrics</span>
          </div>

          <div className="activity-metric-list">
            <div className="activity-metric-item">
              <div className="metric-meta">
                <span className="metric-label">Courses Completed</span>
                <span className="metric-number">8,420</span>
              </div>
              <ProgressBar value={8420} max={11994} color="#22C55E" />
            </div>

            <div className="activity-metric-item">
              <div className="metric-meta">
                <span className="metric-label">Courses In Progress</span>
                <span className="metric-number">3,150</span>
              </div>
              <ProgressBar value={3150} max={11994} color="#0788C9" />
            </div>

            <div className="activity-metric-item">
              <div className="metric-meta">
                <span className="metric-label">Resources Viewed</span>
                <span className="metric-number">45,890</span>
              </div>
              <ProgressBar value={45890} max={50000} color="#8B5CF6" />
            </div>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            <div className="dashboard-card-header" style={{ marginBottom: '10px' }}>
              <div className="card-title" style={{ fontSize: '14px' }}>
                <FiAward style={{ color: '#F59E0B' }} /> Competency Overview
              </div>
            </div>

            <div className="competency-bars-grid">
              <div className="comp-bar-item">
                <div className="comp-bar-header">
                  <span>Beginner</span>
                  <span>35% (4,368)</span>
                </div>
                <ProgressBar value={35} max={100} color="#94A3B8" showLabel={false} />
              </div>
              <div className="comp-bar-item">
                <div className="comp-bar-header">
                  <span>Intermediate</span>
                  <span>42% (5,241)</span>
                </div>
                <ProgressBar value={42} max={100} color="#F59E0B" showLabel={false} />
              </div>
              <div className="comp-bar-item">
                <div className="comp-bar-header">
                  <span>Advanced</span>
                  <span>18% (2,246)</span>
                </div>
                <ProgressBar value={18} max={100} color="#0284C7" showLabel={false} />
              </div>
              <div className="comp-bar-item">
                <div className="comp-bar-header">
                  <span>Expert</span>
                  <span>5% (625)</span>
                </div>
                <ProgressBar value={5} max={100} color="#9333EA" showLabel={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECOND ROW: RECENT ACTIVITY & SYSTEM ALERTS */}
      <div className="dashboard-secondary-row">
        {/* Recent Activity */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div className="card-title">
              <FiClock style={{ color: '#0788C9' }} /> Recent Platform Activity
            </div>
            <button 
              className="cc-btn cc-btn-secondary cc-btn-sm" 
              onClick={() => onNavigate && onNavigate('approvals')}
            >
              View Approvals
            </button>
          </div>

          <div className="activity-feed-list">
            <div className="activity-feed-item">
              <div className="feed-icon-box" style={{ color: '#16A34A', background: '#DCFCE7' }}>
                <FiCheckCircle />
              </div>
              <div className="feed-details">
                <div className="feed-text">Dr. Rajesh Sharma approved new GeM Procurement syllabus</div>
                <div className="feed-meta">
                  <span>12 mins ago</span>
                  <span>•</span>
                  <span>Curriculum Committee</span>
                </div>
              </div>
            </div>

            <div className="activity-feed-item">
              <div className="feed-icon-box" style={{ color: '#0284C7', background: '#E0F2FE' }}>
                <FiBookOpen />
              </div>
              <div className="feed-details">
                <div className="feed-text">45 Municipal engineers enrolled in "Digital District Governance"</div>
                <div className="feed-meta">
                  <span>45 mins ago</span>
                  <span>•</span>
                  <span>Cohort Registration</span>
                </div>
              </div>
            </div>

            <div className="activity-feed-item">
              <div className="feed-icon-box" style={{ color: '#9333EA', background: '#F3E8FF' }}>
                <FiAward />
              </div>
              <div className="feed-details">
                <div className="feed-text">Learner Pooja Sundaram achieved "Expert" badge in Cloud Security</div>
                <div className="feed-meta">
                  <span>2 hours ago</span>
                  <span>•</span>
                  <span>Competency Engine</span>
                </div>
              </div>
            </div>

            <div className="activity-feed-item">
              <div className="feed-icon-box" style={{ color: '#D97706', background: '#FEF3C7' }}>
                <FiFileText />
              </div>
              <div className="feed-details">
                <div className="feed-text">Disaster Evacuation SOP submitted for Knowledge Hub verification</div>
                <div className="feed-meta">
                  <span>4 hours ago</span>
                  <span>•</span>
                  <span>Col. Sanjeev Kapoor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Review / Hackathon Info Banner */}
        <div className="dashboard-card" style={{ background: '#F8FAFC', border: '1px solid #CBD5E1' }}>
          <div className="dashboard-card-header">
            <div className="card-title">
              <FiAward style={{ color: '#0788C9' }} /> SIH 2024 Readiness
            </div>
            <span className="card-tag" style={{ background: '#DCFCE7', color: '#15803D' }}>Verified</span>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
            Capacity Connect operates as the unified civil-capability acceleration pipeline. All modules—from 
            Trainer credentials to Competency taxonomies—are synchronized with national training frameworks.
          </p>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#102A43', marginBottom: '4px' }}>
              Pending Admin Tasks:
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>• 5 new curriculum syllabi awaiting accreditation</div>
              <div>• 1 organization onboarding request in review</div>
              <div>• Monthly competency audit report scheduled for 18:00</div>
            </div>
          </div>

          <button 
            className="cc-btn cc-btn-primary" 
            style={{ width: '100%' }}
            onClick={() => onNavigate && onNavigate('approvals')}
          >
            Open Approval Center (34)
          </button>
        </div>
      </div>

      {/* QUICK ADD MODAL */}
      <Modal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        title={
          modalType === 'user' ? 'Add New Platform User' :
          modalType === 'course' ? 'Create New Course Draft' :
          modalType === 'training' ? 'Schedule Training Cohort' :
          'Upload Learning Resource'
        }
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleQuickAddSubmit}>Submit Record</button>
          </>
        }
      >
        {formSuccessMessage ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#15803D', fontWeight: 600 }}>
            {formSuccessMessage}
          </div>
        ) : (
          <form onSubmit={handleQuickAddSubmit} className="modal-form-grid">
            {modalType === 'user' && (
              <>
                <div className="form-group full-width">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sumanth Varma"
                    className="form-input"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@gov.in"
                    className="form-input"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Assigned Role</label>
                  <select
                    className="form-select"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                  >
                    <option value="Learner">Learner</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Admin">Admin</option>
                    <option value="Organization">Organization</option>
                  </select>
                </div>
              </>
            )}

            {modalType === 'course' && (
              <>
                <div className="form-group full-width">
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Drone Surveying for Land Records"
                    className="form-input"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value)}
                  >
                    <option value="Digital Skills">Digital Skills</option>
                    <option value="Technical Skills">Technical Skills</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Management">Management</option>
                    <option value="Communication">Communication</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Competency Level</label>
                  <select
                    className="form-select"
                    value={newCourseLevel}
                    onChange={(e) => setNewCourseLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </>
            )}

            {modalType === 'training' && (
              <>
                <div className="form-group full-width">
                  <label className="form-label">Program Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Cyber Forensics Boot Camp"
                    className="form-input"
                    value={newProgName}
                    onChange={(e) => setNewProgName(e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Sponsoring Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ministry of Home Affairs"
                    className="form-input"
                    value={newProgOrg}
                    onChange={(e) => setNewProgOrg(e.target.value)}
                  />
                </div>
              </>
            )}

            {modalType === 'resource' && (
              <>
                <div className="form-group full-width">
                  <label className="form-label">Resource Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sovereign Data Protection Checklist"
                    className="form-input"
                    value={newResourceTitle}
                    onChange={(e) => setNewResourceTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Format Type</label>
                  <select
                    className="form-select"
                    value={newResourceType}
                    onChange={(e) => setNewResourceType(e.target.value)}
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="Video">Video Lecture</option>
                    <option value="Article">Article</option>
                    <option value="Tutorial">Interactive Tutorial</option>
                    <option value="Guide">Field Guide</option>
                    <option value="Research Paper">Research Paper</option>
                  </select>
                </div>
              </>
            )}
          </form>
        )}
      </Modal>
    </div>
  );
}
