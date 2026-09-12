import React from 'react';
import './CommonComponents.css';
import { FiX, FiTrendingUp, FiTrendingDown, FiChevronLeft, FiChevronRight, FiInbox } from 'react-icons/fi';

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  colorScheme = 'blue',
  subtitle
}) {
  return (
    <div className="cc-stat-card">
      <div className="cc-stat-card-header">
        <span className="cc-stat-title">{title}</span>
        {Icon && (
          <div className={`cc-stat-icon-wrapper ${colorScheme}`}>
            <Icon />
          </div>
        )}
      </div>
      <div className="cc-stat-body">
        <div className="cc-stat-value">{value}</div>
        {change && (
          <div className={`cc-stat-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{change}</span>
          </div>
        )}
      </div>
      {subtitle && <div className="cc-stat-subtitle">{subtitle}</div>}
    </div>
  );
}

export function StatusBadge({ status }) {
  if (!status) return null;
  const s = status.toLowerCase();

  let badgeClass = 'cc-badge-inactive';
  if (['active', 'published', 'approved', 'expert'].includes(s)) {
    badgeClass = s === 'expert' ? 'cc-badge-expert' : 'cc-badge-active';
  } else if (['pending', 'review', 'intermediate'].includes(s)) {
    badgeClass = s === 'intermediate' ? 'cc-badge-intermediate' : 'cc-badge-pending';
  } else if (['advanced'].includes(s)) {
    badgeClass = 'cc-badge-advanced';
  } else if (['suspended', 'rejected', 'danger'].includes(s)) {
    badgeClass = 'cc-badge-suspended';
  } else if (['beginner', 'draft', 'upcoming'].includes(s)) {
    badgeClass = s === 'beginner' ? 'cc-badge-beginner' : 'cc-badge-draft';
  }

  return (
    <span className={`cc-status-badge ${badgeClass}`}>
      <span className="cc-status-badge-dot" />
      {status}
    </span>
  );
}

export function ProgressBar({ value = 0, max = 100, color = '#0788C9', showLabel = true }) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className="cc-progress-container">
      <div className="cc-progress-track">
        <div 
          className="cc-progress-fill" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && <span className="cc-progress-label">{percentage}%</span>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, footer, maxWidth = '580px' }) {
  if (!isOpen) return null;

  return (
    <div className="cc-modal-backdrop" onClick={onClose}>
      <div 
        className="cc-modal-container" 
        style={{ maxWidth }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cc-modal-header">
          <h3 className="cc-modal-title">{title}</h3>
          <button className="cc-modal-close-btn" onClick={onClose} title="Close Modal">
            <FiX />
          </button>
        </div>
        <div className="cc-modal-body">
          {children}
        </div>
        {footer && (
          <div className="cc-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="cc-pagination">
      <div className="cc-pagination-info">
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems.toLocaleString()}</strong> entries
      </div>
      <div className="cc-pagination-controls">
        <button
          className="cc-page-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          title="Previous Page"
        >
          <FiChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
          <button
            key={page}
            className={`cc-page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange && onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && <span style={{ padding: '0 4px', color: '#94A3B8' }}>...</span>}
        <button
          className="cc-page-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          title="Next Page"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No records found",
  description = "There are currently no items matching your criteria.",
  icon: Icon = FiInbox,
  actionText,
  onAction
}) {
  return (
    <div className="cc-empty-state">
      <Icon className="cc-empty-icon" />
      <h4 className="cc-empty-title">{title}</h4>
      <p className="cc-empty-description">{description}</p>
      {actionText && onAction && (
        <button className="cc-btn cc-btn-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
