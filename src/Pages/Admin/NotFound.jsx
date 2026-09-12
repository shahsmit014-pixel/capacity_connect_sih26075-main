import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiAlertTriangle, FiHome, FiUsers, FiBookOpen, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      textAlign: 'center',
      background: 'var(--card-bg, #fff)',
      borderRadius: '12px',
      border: '1px solid var(--border-color, #E2E8F0)',
      boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
      margin: '20px auto',
      maxWidth: '700px'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: '#FEF3C7',
        color: '#D97706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        marginBottom: '20px'
      }}>
        <FiAlertTriangle />
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main, #102A43)', marginBottom: '8px' }}>
        404 — Route Not Found
      </h2>

      <p style={{ color: 'var(--text-muted, #64748B)', fontSize: '15px', maxWidth: '460px', marginBottom: '16px', lineHeight: 1.6 }}>
        The route <code style={{ background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', color: '#0F172A', fontWeight: 600 }}>{location.pathname}</code> does not exist on Capacity Connect.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
        <button
          className="cc-btn cc-btn-primary"
          onClick={() => navigate('/admin')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <FiHome /> Return to Dashboard
        </button>
        <button
          className="cc-btn cc-btn-secondary"
          onClick={() => navigate('/admin/users')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <FiUsers /> User Directory
        </button>
        <button
          className="cc-btn cc-btn-secondary"
          onClick={() => navigate('/admin/courses')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <FiBookOpen /> Courses
        </button>
        <button
          className="cc-btn cc-btn-secondary"
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <FiArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
}
