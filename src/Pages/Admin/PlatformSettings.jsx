import React, { useState } from 'react';
import './PlatformSettings.css';
import {
  FiSettings,
  FiBell,
  FiShield,
  FiUsers,
  FiDatabase,
  FiCheckCircle,
  FiSave,
  FiUploadCloud,
  FiRefreshCw,
  FiServer,
  FiActivity,
  FiGlobe,
  FiTerminal,
  FiAlertCircle
} from 'react-icons/fi';
import { getBackendConfig, setBackendConfig, testBackendConnection } from './servicesApi';

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState('Database');
  const [toastMessage, setToastMessage] = useState('');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackup, setLastBackup] = useState('Today at 04:30 AM (Auto-snapshot)');

  // Backend & Database Integration State
  const initialBackend = getBackendConfig();
  const [backendUrl, setBackendUrl] = useState(initialBackend.baseUrl);
  const [backendToken, setBackendToken] = useState(initialBackend.token);
  const [dbDialect, setDbDialect] = useState(initialBackend.dbDialect);
  const [syncMode, setSyncMode] = useState(initialBackend.mode);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // General Settings State
  const [platformName, setPlatformName] = useState('Capacity Connect');
  const [supportEmail, setSupportEmail] = useState('support@capacityconnect.gov.in');
  const [timezone, setTimezone] = useState('(GMT+05:30) Asia/Kolkata (IST)');
  const [defaultLanguage, setDefaultLanguage] = useState('English (Indian Official)');

  // Notification Toggles
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [inAppNotifs, setInAppNotifs] = useState(true);
  const [courseCompletionAlerts, setCourseCompletionAlerts] = useState(true);
  const [trainerApprovalAlerts, setTrainerApprovalAlerts] = useState(true);

  // Security Toggles
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState('90');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [ipRestrictions, setIpRestrictions] = useState(false);

  // Maintenance Toggle
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Permissions Matrix
  const [permissions, setPermissions] = useState({
    Admin: { manageUsers: true, manageCourses: true, approveContent: true, viewAnalytics: true, systemSettings: true },
    Trainer: { manageUsers: false, manageCourses: true, approveContent: false, viewAnalytics: true, systemSettings: false },
    Organization: { manageUsers: false, manageCourses: false, approveContent: false, viewAnalytics: true, systemSettings: false },
    Learner: { manageUsers: false, manageCourses: false, approveContent: false, viewAnalytics: false, systemSettings: false }
  });

  const togglePermission = (role, key) => {
    setPermissions({
      ...permissions,
      [role]: {
        ...permissions[role],
        [key]: !permissions[role][key]
      }
    });
  };

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setBackendConfig({
      baseUrl: backendUrl,
      token: backendToken,
      dbDialect: dbDialect,
      mode: syncMode
    });
    setToastMessage('Platform and backend database settings have been saved successfully.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus(null);
    try {
      const result = await testBackendConnection(backendUrl, backendToken);
      setConnectionStatus(result);
    } catch (err) {
      setConnectionStatus({
        success: false,
        message: err.message || 'Connection attempt failed'
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleBackupNow = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setLastBackup('Just now (Manual snapshot)');
      setToastMessage('System database backup compiled and securely archived to sovereign cold vault.');
      setTimeout(() => setToastMessage(''), 4000);
    }, 1500);
  };

  return (
    <div className="settings-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Platform Settings</h2>
          <p>Configure governance mandates, institutional access controls, and administrative thresholds.</p>
        </div>
        <button className="cc-btn cc-btn-primary" onClick={handleSave}>
          <FiSave /> Save All Changes
        </button>
      </div>

      {toastMessage && (
        <div style={{ padding: '12px 18px', background: '#DCFCE7', color: '#166534', borderRadius: '8px', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
          <FiCheckCircle /> {toastMessage}
        </div>
      )}

      {/* TABS */}
      <div className="detail-tabs-bar">
        {[
          { id: 'Database', icon: FiServer, label: 'Database & Backend API' },
          { id: 'General', icon: FiSettings, label: 'General' },
          { id: 'Notifications', icon: FiBell, label: 'Notifications' },
          { id: 'Security', icon: FiShield, label: 'Security' },
          { id: 'Roles', icon: FiUsers, label: 'User Roles & Permissions' },
          { id: 'Backup', icon: FiDatabase, label: 'Backup & Maintenance' }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`detail-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <TabIcon /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 0: DATABASE & BACKEND API */}
      {activeTab === 'Database' && (
        <div className="settings-card">
          <div className="detail-card-title">
            <FiServer /> Custom Database & Backend API Configuration
          </div>
          <p style={{ fontSize: '13px', color: '#475569', marginTop: '-10px' }}>
            Connect Capacity Connect directly to your custom backend server and database (PostgreSQL, MySQL, MongoDB, SQLite, Supabase, or custom REST APIs).
          </p>

          {/* Connection Test Result Box */}
          {connectionStatus && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '13px',
                background: connectionStatus.success ? '#DCFCE7' : '#FEE2E2',
                color: connectionStatus.success ? '#166534' : '#991B1B',
                border: `1px solid ${connectionStatus.success ? '#BBF7D0' : '#FECACA'}`
              }}
            >
              {connectionStatus.success ? (
                <FiCheckCircle style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }} />
              ) : (
                <FiAlertCircle style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <strong>{connectionStatus.message}</strong>
                {connectionStatus.latency && (
                  <div style={{ fontSize: '11.5px', marginTop: '4px', opacity: 0.9 }}>
                    Round-trip latency: <strong>{connectionStatus.latency} ms</strong> &bull; Probed: <code>{connectionStatus.urlTested}</code>
                  </div>
                )}
                {!connectionStatus.success && (
                  <div style={{ fontSize: '11.5px', marginTop: '4px', opacity: 0.9 }}>
                    Ensure your backend server is running, CORS middleware is enabled, and the endpoint is reachable.
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="modal-form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Backend API Base URL <span style={{ color: '#0788C9', fontWeight: 600 }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ flex: 1, fontFamily: 'monospace' }}
                  placeholder="e.g. http://localhost:5000/api or https://api.yoursite.gov.in"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                />
                <button
                  type="button"
                  className="cc-btn cc-btn-secondary"
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <FiActivity className={testingConnection ? 'spin-icon' : ''} />
                  {testingConnection ? 'Testing...' : 'Test Connection'}
                </button>
              </div>
              <span style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                All CRUD requests for users, courses, competencies, and approvals will target this API URL.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Target Database Engine / Dialect</label>
              <select
                className="form-select"
                value={dbDialect}
                onChange={(e) => setDbDialect(e.target.value)}
              >
                <option value="PostgreSQL">PostgreSQL (Relational)</option>
                <option value="MySQL / MariaDB">MySQL / MariaDB</option>
                <option value="MongoDB">MongoDB (Document)</option>
                <option value="SQLite">SQLite (Embedded)</option>
                <option value="Supabase / Firebase">Supabase / BaaS</option>
                <option value="Custom REST API">Custom REST Microservice</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Data Synchronization Mode</label>
              <select
                className="form-select"
                value={syncMode}
                onChange={(e) => setSyncMode(e.target.value)}
              >
                <option value="auto">Auto-Detect (Direct REST with graceful fallback)</option>
                <option value="live">Strict Live REST (No offline fallback)</option>
                <option value="fallback">Local Cache / Offline Standby</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Backend Auth Bearer Token / API Key (Optional)</label>
              <input
                type="password"
                className="form-input"
                style={{ fontFamily: 'monospace' }}
                placeholder="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={backendToken}
                onChange={(e) => setBackendToken(e.target.value)}
              />
              <span style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                Included in the <code>Authorization: Bearer &lt;token&gt;</code> header for all requests to your backend.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="cc-btn cc-btn-primary" onClick={handleSave}>
              <FiSave /> Save API Configuration
            </button>
          </div>

          {/* Backend REST Endpoint Contract Table */}
          <div style={{ marginTop: '24px', borderTop: '1px solid #E2E8F0', paddingTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <strong style={{ fontSize: '13.5px', color: '#102A43', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiTerminal /> Backend REST Endpoints Expected by Admin Panel
              </strong>
              <span style={{ fontSize: '11.5px', color: '#64748B' }}>See <code>API_CONTRACT.md</code> for full schemas</span>
            </div>

            <div className="table-responsive-wrapper">
              <table className="cc-table" style={{ fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>HTTP Method</th>
                    <th>REST Endpoint</th>
                    <th>Module</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#DCFCE7', color: '#166534', border: 'none' }}>GET</span></td>
                    <td><code>/users</code>, <code>/users/:id</code></td>
                    <td>User Management</td>
                    <td>Retrieve civil trainees, trainers, and administrators</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#DBEAFE', color: '#1E40AF', border: 'none' }}>POST</span></td>
                    <td><code>/users</code></td>
                    <td>User Management</td>
                    <td>Register new officer or instructor in database</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#FEF3C7', color: '#92400E', border: 'none' }}>PUT</span></td>
                    <td><code>/users/:id</code></td>
                    <td>User Management</td>
                    <td>Update user roles, statuses, and profile information</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#FEE2E2', color: '#991B1B', border: 'none' }}>DELETE</span></td>
                    <td><code>/users/:id</code></td>
                    <td>User Management</td>
                    <td>Delete or archive user record from database</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#DCFCE7', color: '#166534', border: 'none' }}>GET / POST</span></td>
                    <td><code>/courses</code>, <code>/courses/:id</code></td>
                    <td>Course Management</td>
                    <td>Fetch and publish national governance curricula</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#DCFCE7', color: '#166534', border: 'none' }}>GET / POST</span></td>
                    <td><code>/competencies</code></td>
                    <td>Competency Framework</td>
                    <td>Query and map institutional skill frameworks</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#DCFCE7', color: '#166534', border: 'none' }}>GET / POST</span></td>
                    <td><code>/knowledge-hub</code></td>
                    <td>Knowledge Hub</td>
                    <td>Upload and index sovereign policies & research</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#FEF3C7', color: '#92400E', border: 'none' }}>PATCH</span></td>
                    <td><code>/approvals/:id</code></td>
                    <td>Approval Center</td>
                    <td>Approve or reject accreditation & course workflows</td>
                  </tr>
                  <tr>
                    <td><span className="export-pill" style={{ background: '#DCFCE7', color: '#166534', border: 'none' }}>GET</span></td>
                    <td><code>/analytics/dashboard</code></td>
                    <td>Dashboard Analytics</td>
                    <td>Fetch summary KPIs, active learners, and learning hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: GENERAL */}
      {activeTab === 'General' && (
        <div className="settings-card">
          <div className="detail-card-title">
            <FiSettings /> General Platform Configuration
          </div>

          <form onSubmit={handleSave} className="modal-form-grid">
            <div className="form-group">
              <label className="form-label">Platform Portal Name</label>
              <input
                type="text"
                className="form-input"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Support Desk Email</label>
              <input
                type="email"
                className="form-input"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Default Portal Timezone</label>
              <input
                type="text"
                className="form-input"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Interface Language</label>
              <select
                className="form-select"
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
              >
                <option value="English (Indian Official)">English (Indian Official)</option>
                <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
                <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
                <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Platform Logo Asset</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '8px 16px', background: '#0B2A43', color: '#FFFFFF', borderRadius: '8px', fontWeight: 800, fontSize: '14px' }}>
                  Capacity <span style={{ color: '#18BCEB' }}>Connect</span>
                </div>
                <button type="button" className="cc-btn cc-btn-secondary" onClick={() => alert('Logo upload dialog simulated.')}>
                  <FiUploadCloud /> Upload New Seal / Logo
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: NOTIFICATIONS */}
      {activeTab === 'Notifications' && (
        <div className="settings-card">
          <div className="detail-card-title">
            <FiBell /> Notification Dispatch & Alert Channels
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">Official Email Notifications</span>
                <span className="toggle-desc">Dispatch critical alerts, password reset codes, and cohort updates to government email.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>

            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">In-App Notification Center</span>
                <span className="toggle-desc">Display bell icon dropdown badges and audio chimes for real-time approvals.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={inAppNotifs}
                  onChange={(e) => setInAppNotifs(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>

            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">Course Completion Alerts</span>
                <span className="toggle-desc">Notify administrators and department heads when officers finish mandatory curricula.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={courseCompletionAlerts}
                  onChange={(e) => setCourseCompletionAlerts(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>

            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">Trainer Accreditation Notifications</span>
                <span className="toggle-desc">Receive immediate push alerts when new trainer accreditation applications are submitted.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={trainerApprovalAlerts}
                  onChange={(e) => setTrainerApprovalAlerts(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY */}
      {activeTab === 'Security' && (
        <div className="settings-card">
          <div className="detail-card-title">
            <FiShield /> Security Policies & Access Hardening
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">Mandatory Two-Factor Authentication (2FA)</span>
                <span className="toggle-desc">Enforce Aadhaar OTP or TOTP Authenticator app on every administrative sign-in.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>

            <div className="modal-form-grid" style={{ paddingTop: '10px' }}>
              <div className="form-group">
                <label className="form-label">Password Expiry Policy (Days)</label>
                <input
                  type="number"
                  className="form-input"
                  value={passwordExpiry}
                  onChange={(e) => setPasswordExpiry(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Idle Inactivity Session Timeout (Minutes)</label>
                <input
                  type="number"
                  className="form-input"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                />
              </div>
            </div>

            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">NIC GovNet IP Range Restriction</span>
                <span className="toggle-desc">Restrict privileged administrator dashboard access strictly to whitelisted state gateway subnets.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={ipRestrictions}
                  onChange={(e) => setIpRestrictions(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROLES & PERMISSIONS */}
      {activeTab === 'Roles' && (
        <div className="settings-card">
          <div className="detail-card-title">
            <FiUsers /> Role-Based Access Control (RBAC) Matrix
          </div>
          <p style={{ fontSize: '13px', color: '#475569' }}>
            Configure granular functional capability permissions across administrative roles in Capacity Connect.
          </p>

          <div className="table-responsive-wrapper">
            <table className="permissions-table">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th style={{ textAlign: 'center' }}>Manage Users</th>
                  <th style={{ textAlign: 'center' }}>Manage Courses</th>
                  <th style={{ textAlign: 'center' }}>Approve Content</th>
                  <th style={{ textAlign: 'center' }}>View Analytics</th>
                  <th style={{ textAlign: 'center' }}>System Settings</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(permissions).map((role) => (
                  <tr key={role}>
                    <td>
                      <strong style={{ color: '#102A43' }}>{role}</strong>
                    </td>
                    {['manageUsers', 'manageCourses', 'approveContent', 'viewAnalytics', 'systemSettings'].map((perm) => (
                      <td key={perm} style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          className="perm-checkbox"
                          checked={permissions[role][perm]}
                          onChange={() => togglePermission(role, perm)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: BACKUP & MAINTENANCE */}
      {activeTab === 'Backup' && (
        <div className="settings-card">
          <div className="detail-card-title">
            <FiDatabase /> Data Backup & System Maintenance
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '16px 20px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <strong style={{ color: '#102A43', fontSize: '14px' }}>Automated Cloud Snapshot Schedule</strong>
                <p style={{ fontSize: '12.5px', color: '#718096', marginTop: '2px' }}>
                  Last successful snapshot: <strong>{lastBackup}</strong>
                </p>
              </div>
              <button
                className="cc-btn cc-btn-secondary"
                onClick={handleBackupNow}
                disabled={isBackingUp}
              >
                <FiRefreshCw className={isBackingUp ? 'spin-icon' : ''} /> {isBackingUp ? 'Backing up...' : 'Backup Now'}
              </button>
            </div>

            <div className="toggle-item-row">
              <div className="toggle-text-block">
                <span className="toggle-title">Maintenance Mode Active</span>
                <span className="toggle-desc">When enabled, only Super Administrators can authenticate. Learners see a scheduled maintenance notice.</span>
              </div>
              <label className="switch-label">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                />
                <span className="slider-round" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
