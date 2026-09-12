import React, { useState } from 'react';
import './AdminLayout.css';
import {
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiLayers,
  FiCalendar,
  FiTarget,
  FiFolder,
  FiCheckCircle,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiSearch,
  FiBell,
  FiMail,
  FiMenu,
  FiLogOut,
  FiChevronDown,
  FiAward,
  FiShield,
  FiDatabase
} from 'react-icons/fi';
import { getBackendConfig } from './servicesApi';

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: FiGrid },
  { id: 'users', label: 'User Management', path: '/admin/users', icon: FiUsers },
  { id: 'trainers', label: 'Trainer Management', path: '/admin/trainers', icon: FiUserCheck },
  { id: 'learners', label: 'Learner Management', path: '/admin/learners', icon: FiBookOpen },
  { id: 'courses', label: 'Course Management', path: '/admin/courses', icon: FiLayers },
  { id: 'training', label: 'Training Programs', path: '/admin/training', icon: FiCalendar },
  { id: 'competencies', label: 'Competency Management', path: '/admin/competencies', icon: FiTarget },
  { id: 'knowledge-hub', label: 'Knowledge Hub', path: '/admin/knowledge-hub', icon: FiFolder },
  { id: 'approvals', label: 'Approval Center', path: '/admin/approvals', icon: FiCheckCircle, hasBadge: true },
  { id: 'analytics', label: 'Organization Analytics', path: '/admin/analytics', icon: FiBarChart2 },
  { id: 'reports', label: 'Reports', path: '/admin/reports', icon: FiFileText },
  { id: 'settings', label: 'Platform Settings', path: '/admin/settings', icon: FiSettings },
];

export default function AdminLayout({
  children,
  activePage = 'dashboard',
  onNavigate,
  pageTitle = 'Dashboard',
  breadcrumbs = ['Admin', 'Dashboard'],
  pendingApprovalsCount = 34
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleNavClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-container">
      {/* Mobile background backdrop */}
      <div 
        className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* LEFT SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo-icon">
            <FiAward />
          </div>
          <div className="brand-text-block">
            <div className="brand-title">Capacity<span>Connect</span></div>
            <span className="brand-badge">ADMIN PANEL</span>
          </div>
        </div>

        <nav className="sidebar-nav-container">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
              >
                <span className="sidebar-icon">
                  <Icon />
                </span>
                <span className="sidebar-label">{item.label}</span>
                {item.hasBadge && pendingApprovalsCount > 0 && (
                  <span className="sidebar-badge">{pendingApprovalsCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile-card" onClick={() => handleNavClick('settings')} title="View Admin Profile">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Rajesh Sharma"
              className="admin-avatar"
            />
            <div className="admin-profile-info">
              <span className="admin-name">Dr. Rajesh Sharma</span>
              <span className="admin-role">Administrator</span>
            </div>
          </div>
          <button 
            className="logout-button" 
            title="Sign Out" 
            onClick={() => alert("Simulated Sign Out: Session cleared successfully.")}
          >
            <FiLogOut />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className={`admin-main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* TOP NAVBAR */}
        <header className="admin-top-navbar">
          <div className="navbar-left">
            <button
              id="hamburger-btn"
              className="hamburger-btn"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setSidebarCollapsed(!sidebarCollapsed);
                }
              }}
              title="Toggle Sidebar"
            >
              <FiMenu />
            </button>
            <div className="page-title-group">
              <h1 className="navbar-page-title">{pageTitle}</h1>
              <div className="navbar-breadcrumb">
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    <span>{crumb}</span>
                    {idx < breadcrumbs.length - 1 && <span className="breadcrumb-sep">/</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="navbar-right">
            {/* Global Search Bar */}
            <div className="navbar-search-box">
              <FiSearch className="navbar-search-icon" />
              <input
                type="text"
                placeholder="Search users, courses, resources..."
                className="navbar-search-input"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>

            <div className="navbar-actions">
              {/* Backend API & DB Status Pill */}
              <button
                className="backend-status-btn"
                onClick={() => onNavigate('settings')}
                title={`Configured Backend: ${getBackendConfig().baseUrl} (${getBackendConfig().dbDialect}). Click to configure.`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  background: '#F0FDF4',
                  color: '#166534',
                  border: '1px solid #BBF7D0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginRight: '6px'
                }}
              >
                <FiDatabase style={{ color: '#16A34A', fontSize: '13px' }} />
                <span>Backend API: Active</span>
              </button>

              {/* Notification icon */}
              <button 
                className="icon-button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                  setShowUserDropdown(false);
                }}
                title="Notifications"
              >
                <FiBell />
                <span className="badge-dot" />
              </button>

              {/* Message icon */}
              <button 
                className="icon-button"
                onClick={() => {
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                  setShowUserDropdown(false);
                }}
                title="Messages"
              >
                <FiMail />
                <span className="badge-number">3</span>
              </button>

              {/* Admin Avatar & Dropdown */}
              <div className="navbar-user-menu">
                <button
                  className="navbar-user-btn"
                  onClick={() => {
                    setShowUserDropdown(!showUserDropdown);
                    setShowNotifications(false);
                    setShowMessages(false);
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Admin"
                    className="nav-avatar"
                  />
                  <span className="nav-user-name">Dr. Rajesh Sharma</span>
                  <FiChevronDown className="nav-arrow" />
                </button>

                {showUserDropdown && (
                  <div className="dropdown-menu-popover">
                    <div className="dropdown-header">
                      <span>Administrator Account</span>
                      <span className="brand-badge">SIH 2024</span>
                    </div>
                    <button className="dropdown-item" onClick={() => { handleNavClick('users'); setShowUserDropdown(false); }}>
                      <FiUsers /> My Profile & Team
                    </button>
                    <button className="dropdown-item" onClick={() => { handleNavClick('settings'); setShowUserDropdown(false); }}>
                      <FiSettings /> Platform Settings
                    </button>
                    <button className="dropdown-item" onClick={() => { handleNavClick('analytics'); setShowUserDropdown(false); }}>
                      <FiShield /> System Health & Logs
                    </button>
                    <button 
                      className="dropdown-item danger" 
                      onClick={() => {
                        setShowUserDropdown(false);
                        alert("Session securely terminated.");
                      }}
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="dropdown-menu-popover dropdown-notifications">
                <div className="dropdown-header">
                  <span>Notifications (4 unread)</span>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#0788C9', fontSize: '11.5px', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => alert("All notifications marked as read.")}
                  >
                    Mark read
                  </button>
                </div>
                <div className="notif-item" onClick={() => { handleNavClick('approvals'); setShowNotifications(false); }}>
                  <div className="notif-icon"><FiCheckCircle /></div>
                  <div className="notif-content">
                    <div className="notif-title">New Course submitted: "Incident Command System"</div>
                    <div className="notif-time">15 mins ago • Col. Sanjeev Kapoor</div>
                  </div>
                </div>
                <div className="notif-item" onClick={() => { handleNavClick('users'); setShowNotifications(false); }}>
                  <div className="notif-icon"><FiUsers /></div>
                  <div className="notif-content">
                    <div className="notif-title">450 public officials registered from Finance Ministry</div>
                    <div className="notif-time">2 hours ago • Batch Onboarding</div>
                  </div>
                </div>
                <div className="notif-item" onClick={() => { handleNavClick('knowledge-hub'); setShowNotifications(false); }}>
                  <div className="notif-icon"><FiFolder /></div>
                  <div className="notif-content">
                    <div className="notif-title">New SOP Guide ready for publication review</div>
                    <div className="notif-time">Yesterday • Knowledge Hub</div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Dropdown */}
            {showMessages && (
              <div className="dropdown-menu-popover dropdown-notifications">
                <div className="dropdown-header">
                  <span>Direct Messages</span>
                  <span className="brand-badge">Capacity Support</span>
                </div>
                <div className="notif-item" onClick={() => { alert("Opening message from Trainer Ananya Deshmukh"); setShowMessages(false); }}>
                  <div className="notif-icon"><FiMail /></div>
                  <div className="notif-content">
                    <div className="notif-title">Ananya Deshmukh (IIT Bombay)</div>
                    <div className="notif-time">"Can we add 2 more lab sessions to the AI Governance syllabus?"</div>
                  </div>
                </div>
                <div className="notif-item" onClick={() => { alert("Opening message from Secretary Office"); setShowMessages(false); }}>
                  <div className="notif-icon"><FiMail /></div>
                  <div className="notif-content">
                    <div className="notif-title">Nodal Officer Office (MeitY)</div>
                    <div className="notif-time">"Quarterly competency gap metrics report required by 4 PM."</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
