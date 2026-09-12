import React, { useState } from 'react';
import './Reports.css';
import {
  FiFileText,
  FiDownload,
  FiUserCheck,
  FiAward,
  FiDollarSign,
  FiActivity,
  FiLayers,
  FiTrash2,
  FiCheckCircle,
  FiCalendar,
  FiClock
} from 'react-icons/fi';
import { Modal } from './CommonComponents';

const PREBUILT_REPORTS = [
  {
    id: 'rep-1',
    title: 'User Progress Report',
    desc: 'Comprehensive dossier on civil trainee completion rates, milestones, and assessment scores.',
    icon: FiUserCheck,
    type: 'Progress'
  },
  {
    id: 'rep-2',
    title: 'Trainer Performance Report',
    desc: 'Detailed analytics on master instructor ratings, courses conducted, and cohort feedback.',
    icon: FiAward,
    type: 'Performance'
  },
  {
    id: 'rep-3',
    title: 'Course Completion Report',
    desc: 'Curriculum-level analytics, drop-off indices, and average hours invested per module.',
    icon: FiLayers,
    type: 'Curriculum'
  },
  {
    id: 'rep-4',
    title: 'Competency Assessment Report',
    desc: 'Cross-cadre competency distributions, systemic gaps, and ministry comparisons.',
    icon: FiFileText,
    type: 'Competency'
  },
  {
    id: 'rep-5',
    title: 'Financial / Budget Report',
    desc: 'Capacity building outlay, cost per certified officer, and vendor procurement accounting.',
    icon: FiDollarSign,
    type: 'Financial'
  },
  {
    id: 'rep-6',
    title: 'Platform Usage Report',
    desc: 'Daily active officers, peak concurrency times, and device access telemetry.',
    icon: FiActivity,
    type: 'Usage'
  }
];

const INITIAL_HISTORY = [
  { id: 'h-1', name: 'Q2 Civil Trainee Milestone Audit.pdf', type: 'PDF', date: '2024-06-28', by: 'Aditi Rao', size: '2.4 MB' },
  { id: 'h-2', name: 'National DPI Competency Gap Breakdown.csv', type: 'CSV', date: '2024-06-25', by: 'Central Admin', size: '640 KB' },
  { id: 'h-3', name: 'Ministry of Finance Annual Learning Outlay.xlsx', type: 'Excel', date: '2024-06-18', by: 'Finance Sec', size: '1.2 MB' },
  { id: 'h-4', name: 'Trainer Certification Review June.pdf', type: 'PDF', date: '2024-06-10', by: 'Aditi Rao', size: '3.8 MB' }
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Pre-built Reports');
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [generatingReport, setGeneratingReport] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Custom builder states
  const [customMetric, setCustomMetric] = useState('All Trainee Progress');
  const [customDateRange, setCustomDateRange] = useState('Last 30 Days');
  const [customFormat, setCustomFormat] = useState('PDF');
  const [customDept, setCustomDept] = useState('All Ministries');

  const handleGenerate = (reportTitle, format = 'PDF') => {
    setGeneratingReport(reportTitle);
    setTimeout(() => {
      const newEntry = {
        id: `h-${Date.now().toString().slice(-4)}`,
        name: `${reportTitle} (${new Date().toLocaleDateString('en-GB')}).${format.toLowerCase() === 'excel' ? 'xlsx' : format.toLowerCase()}`,
        type: format,
        date: new Date().toISOString().split('T')[0],
        by: 'Aditi Rao',
        size: '1.8 MB'
      };
      setHistory([newEntry, ...history]);
      setGeneratingReport(null);
      setSuccessToast(`Report "${reportTitle}" generated successfully!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }, 1200);
  };

  const handleDeleteHistory = (id) => {
    setHistory(history.filter((h) => h.id !== id));
  };

  return (
    <div className="reports-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Reports & Audits</h2>
          <p>Generate, schedule, and export sovereign learning reports and ministerial telemetry.</p>
        </div>
      </div>

      {successToast && (
        <div style={{ padding: '12px 18px', background: '#DCFCE7', color: '#166534', borderRadius: '8px', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
          <FiCheckCircle /> {successToast}
        </div>
      )}

      {/* TABS ROW */}
      <div className="detail-tabs-bar">
        {['Pre-built Reports', 'Custom Report Builder', 'Export History'].map((tab) => (
          <button
            key={tab}
            className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: PREBUILT REPORTS */}
      {activeTab === 'Pre-built Reports' && (
        <div className="reports-grid">
          {PREBUILT_REPORTS.map((rep) => {
            const IconComp = rep.icon;
            return (
              <div key={rep.id} className="report-card">
                <div className="report-card-top">
                  <div className="report-icon-box">
                    <IconComp />
                  </div>
                  <div className="report-card-content">
                    <span className="report-card-title">{rep.title}</span>
                    <p className="report-card-desc">{rep.desc}</p>
                  </div>
                </div>

                <div className="report-card-actions">
                  <button
                    className="cc-btn cc-btn-primary"
                    style={{ fontSize: '12px', padding: '6px 14px' }}
                    onClick={() => handleGenerate(rep.title, 'PDF')}
                    disabled={generatingReport === rep.title}
                  >
                    {generatingReport === rep.title ? 'Generating...' : 'Generate Report'}
                  </button>

                  <div className="export-pills-group">
                    <button className="export-pill" onClick={() => handleGenerate(rep.title, 'PDF')}>PDF</button>
                    <button className="export-pill" onClick={() => handleGenerate(rep.title, 'CSV')}>CSV</button>
                    <button className="export-pill" onClick={() => handleGenerate(rep.title, 'Excel')}>Excel</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: CUSTOM REPORT BUILDER */}
      {activeTab === 'Custom Report Builder' && (
        <div className="custom-builder-card">
          <div className="detail-card-title">
            <FiFileText /> Custom Report Configuration Studio
          </div>
          <p style={{ fontSize: '13px', color: '#475569' }}>
            Tailor high-level reporting parameters for parliamentary audits, inter-ministerial reviews, or budgetary sanction presentations.
          </p>

          <div className="modal-form-grid" style={{ marginTop: '10px' }}>
            <div className="form-group">
              <label className="form-label">Primary Metric Scope</label>
              <select
                className="form-select"
                value={customMetric}
                onChange={(e) => setCustomMetric(e.target.value)}
              >
                <option value="All Trainee Progress">All Trainee Progress</option>
                <option value="Competency Gap Matrix">Competency Gap Matrix</option>
                <option value="Trainer Feedback Ratings">Trainer Feedback Ratings</option>
                <option value="Budget Expenditure per Department">Budget Expenditure per Department</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Ministry / Entity</label>
              <select
                className="form-select"
                value={customDept}
                onChange={(e) => setCustomDept(e.target.value)}
              >
                <option value="All Ministries">All Ministries</option>
                <option value="Ministry of Finance">Ministry of Finance</option>
                <option value="Ministry of Health">Ministry of Health</option>
                <option value="Ministry of Electronics & IT">Ministry of Electronics & IT</option>
                <option value="Space Technology Division">Space Technology Division</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Audit Timeframe</label>
              <select
                className="form-select"
                value={customDateRange}
                onChange={(e) => setCustomDateRange(e.target.value)}
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter">Last Quarter</option>
                <option value="Fiscal Year 2024">Fiscal Year 2024</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Export Container</label>
              <select
                className="form-select"
                value={customFormat}
                onChange={(e) => setCustomFormat(e.target.value)}
              >
                <option value="PDF">Encrypted PDF Dossier</option>
                <option value="CSV">Raw CSV Data Stream</option>
                <option value="Excel">Formatted Excel Spreadsheet (.xlsx)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              className="cc-btn cc-btn-primary"
              onClick={() => handleGenerate(`${customMetric} - ${customDept}`, customFormat)}
            >
              <FiDownload /> Compile & Generate Custom Audit
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: EXPORT HISTORY TABLE */}
      {activeTab === 'Export History' && (
        <div className="table-responsive-wrapper">
          <table className="cc-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Format</th>
                <th>Date Generated</th>
                <th>Generated By</th>
                <th>File Size</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiFileText style={{ color: '#0788C9' }} />
                      <strong style={{ color: '#102A43' }}>{item.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="export-pill" style={{ pointerEvents: 'none' }}>{item.type}</span>
                  </td>
                  <td>{item.date}</td>
                  <td>{item.by}</td>
                  <td>{item.size}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Download Report"
                        onClick={() => alert(`Downloading "${item.name}"...`)}
                      >
                        <FiDownload />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Delete Report"
                        style={{ color: '#EF4444' }}
                        onClick={() => handleDeleteHistory(item.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
