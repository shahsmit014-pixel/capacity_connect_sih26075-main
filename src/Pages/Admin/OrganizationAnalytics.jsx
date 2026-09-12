import React, { useState } from 'react';
import './OrganizationAnalytics.css';
import {
  FiBarChart2,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiStar,
  FiLayers,
  FiTarget
} from 'react-icons/fi';
import { StatCard, ProgressBar } from './CommonComponents';

const DEPT_PERFORMANCE = [
  { dept: 'Ministry of Finance & Revenue', completion: 88, learners: 1840 },
  { dept: 'Ministry of Health & Family Welfare', completion: 82, learners: 2420 },
  { dept: 'Ministry of Electronics & IT (MeitY)', completion: 94, learners: 3100 },
  { dept: 'Ministry of Rural Development', completion: 74, learners: 1450 },
  { dept: 'Department of Space & ISRO', completion: 96, learners: 890 },
  { dept: 'Ministry of Education (Higher Ed)', completion: 68, learners: 1200 }
];

const MONTHLY_HOURS = [
  { month: 'Jan', hours: 3200 },
  { month: 'Feb', hours: 4100 },
  { month: 'Mar', hours: 4800 },
  { month: 'Apr', hours: 5400 },
  { month: 'May', hours: 6800 },
  { month: 'Jun', hours: 8200 },
  { month: 'Jul', hours: 10000 }
];

const COMPETENCY_GAPS = [
  { skill: 'Digital Public Infrastructure (DPI)', target: 90, actual: 78 },
  { skill: 'Public Procurement & GFR 2017', target: 85, actual: 82 },
  { skill: 'AI & Predictive Governance', target: 80, actual: 52 },
  { skill: 'Cybersecurity Incident Response', target: 95, actual: 64 },
  { skill: 'Citizen Redressal Redesign', target: 75, actual: 70 }
];

const TOP_COURSES = [
  { title: 'AI & Data-Driven Governance for Public Systems', learners: '2,840', rating: 4.9 },
  { title: 'Public Procurement & GeM Portal Masterclass', learners: '3,120', rating: 4.8 },
  { title: 'Cybersecurity Incident Response for Government Networks', learners: '1,980', rating: 4.7 },
  { title: 'Modern Leadership & Cross-Cadre Administration', learners: '1,450', rating: 4.85 },
  { title: 'Digital Public Infrastructure (DPI) Architecture', learners: '2,200', rating: 4.9 }
];

export default function OrganizationAnalytics() {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [deptFilter, setDeptFilter] = useState('All Departments');

  const maxHours = Math.max(...MONTHLY_HOURS.map((m) => m.hours));

  return (
    <div className="analytics-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Organization Analytics</h2>
          <p>Track civil learning velocity, institutional completion rates, and national competency growth.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            className="filter-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="This Year">This Year</option>
          </select>

          <select
            className="filter-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All Departments">All Departments</option>
            <option value="Finance">Ministry of Finance</option>
            <option value="Health">Ministry of Health</option>
            <option value="Electronics">Ministry of Electronics & IT</option>
            <option value="Education">Ministry of Education</option>
          </select>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="analytics-stats-grid">
        <StatCard
          title="Total Learning Hours"
          value="42,500 hrs"
          change="+16.4%"
          isPositive={true}
          icon={FiClock}
          colorScheme="blue"
        />
        <StatCard
          title="Avg Completion Rate"
          value="78.5%"
          change="+5.2%"
          isPositive={true}
          icon={FiTrendingUp}
          colorScheme="green"
        />
        <StatCard
          title="Active Learners"
          value="8,920"
          change="+12.8%"
          isPositive={true}
          icon={FiUsers}
          colorScheme="purple"
        />
        <StatCard
          title="Certificates Issued"
          value="3,450"
          change="+24.1%"
          isPositive={true}
          icon={FiAward}
          colorScheme="cyan"
        />
      </div>

      {/* CHARTS GRID 1: DEPT PERFORMANCE & MONTHLY HOURS */}
      <div className="analytics-charts-grid">
        {/* Department Performance */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title">
              <FiBarChart2 /> Department Completion Performance
            </div>
            <span style={{ fontSize: '12px', color: '#718096' }}>Ranked by % Completion</span>
          </div>

          <div className="dept-bars-list">
            {DEPT_PERFORMANCE.map((d, idx) => (
              <div key={idx} className="dept-bar-row">
                <div className="dept-bar-label">
                  <span>{d.dept}</span>
                  <strong>{d.completion}%</strong>
                </div>
                <div className="dept-bar-track">
                  <div
                    className="dept-bar-fill"
                    style={{
                      width: `${d.completion}%`,
                      background: d.completion > 90 ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #0788C9, #18BCEB)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Learning Hours Chart (SVG) */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title">
              <FiClock /> Monthly Learning Velocity (Hours)
            </div>
            <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>+210% YTD</span>
          </div>

          <div style={{ height: '220px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="480" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#CBD5E1" strokeWidth="1" />

              {/* Bars */}
              {MONTHLY_HOURS.map((m, i) => {
                const barWidth = 34;
                const gap = (440 - barWidth * MONTHLY_HOURS.length) / (MONTHLY_HOURS.length - 1);
                const x = 50 + i * (barWidth + gap);
                const height = (m.hours / maxHours) * 140;
                const y = 170 - height;

                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={height}
                      rx="4"
                      fill="#0788C9"
                      opacity="0.9"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      textAnchor="middle"
                      fill="#102A43"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {(m.hours / 1000).toFixed(1)}k
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y="188"
                      textAnchor="middle"
                      fill="#718096"
                      fontSize="11"
                    >
                      {m.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* CHARTS GRID 2: COMPETENCY GAP & COURSE POPULARITY */}
      <div className="analytics-charts-grid">
        {/* Competency Gap Analysis */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title">
              <FiTarget /> Competency Gap Analysis
            </div>
            <div className="gap-legend-row">
              <span><span className="legend-swatch" style={{ background: '#0B2A43' }} /> Target Required</span>
              <span><span className="legend-swatch" style={{ background: '#0788C9' }} /> Current Actual</span>
            </div>
          </div>

          <div className="gap-analysis-list">
            {COMPETENCY_GAPS.map((gap, idx) => (
              <div key={idx} className="gap-item">
                <div className="gap-header">
                  <span>{gap.skill}</span>
                  <span style={{ color: gap.actual < gap.target - 20 ? '#EF4444' : '#16A34A', fontSize: '12px' }}>
                    {gap.target - gap.actual}% Gap
                  </span>
                </div>
                <div className="gap-bars-duo">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#718096' }}>
                      <span>Target: {gap.target}%</span>
                    </div>
                    <ProgressBar value={gap.target} max={100} color="#0B2A43" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#718096' }}>
                      <span>Actual: {gap.actual}%</span>
                    </div>
                    <ProgressBar
                      value={gap.actual}
                      max={100}
                      color={gap.actual < 60 ? '#EF4444' : '#0788C9'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Popular Courses */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title">
              <FiLayers /> Top 5 Highest Enrolled Curricula
            </div>
            <span style={{ fontSize: '12px', color: '#718096' }}>National Uptake</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {TOP_COURSES.map((crs, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#EBF8FE',
                      color: '#0788C9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}
                  >
                    #{idx + 1}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#102A43' }}>{crs.title}</span>
                    <span style={{ fontSize: '11.5px', color: '#718096' }}>{crs.learners} Enrolled</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#F59E0B' }}>
                  <FiStar />
                  <span>{crs.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
