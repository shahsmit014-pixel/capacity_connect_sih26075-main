import React, { useState, useMemo, useEffect } from 'react';
import './UserManagement.css';
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSlash,
  FiCheck,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';
import { StatusBadge, Pagination, Modal, EmptyState } from './CommonComponents';
import { userService } from './servicesApi';

export default function UserManagement({ onNavigate, onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('joinedDate');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Load users from backend database via userService
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users from database:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);

  // Form State for Adding / Editing
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('Learner');
  const [formDept, setFormDept] = useState('Digital Services');
  const [formOrg, setFormOrg] = useState('National Informatics Centre');
  const [formStatus, setFormStatus] = useState('Active');

  // Filtered and Sorted Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = roleFilter === 'All' || user.role === roleFilter;
      const matchStatus = statusFilter === 'All' || user.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'role') return a.role.localeCompare(b.role);
      return new Date(b.joinedDate) - new Date(a.joinedDate);
    });
  }, [users, searchTerm, roleFilter, statusFilter, sortBy]);

  // Paginated Slice
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage]);

  const handleOpenEdit = (user) => {
    setUserToEdit(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormDept(user.department);
    setFormOrg(user.organization);
    setFormStatus(user.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!userToEdit) return;
    const updates = {
      name: formName,
      email: formEmail,
      role: formRole,
      department: formDept,
      organization: formOrg,
      status: formStatus
    };
    try {
      await userService.update(userToEdit.id, updates);
      setUsers(users.map((u) => (u.id === userToEdit.id ? { ...u, ...updates } : u)));
    } catch (err) {
      console.error('Failed saving user edit to backend:', err);
    }
    setIsEditModalOpen(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUserPayload = {
      name: formName,
      email: formEmail,
      role: formRole,
      department: formDept,
      organization: formOrg,
      phone: "+91 98000 00000",
      status: formStatus,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      bio: "New registered platform member.",
      coursesCount: 0,
      progress: 0,
      competencyLevel: "Beginner"
    };

    try {
      const created = await userService.create(newUserPayload);
      setUsers([created, ...users]);
    } catch (err) {
      console.error('Failed creating user on backend:', err);
    }

    setIsAddModalOpen(false);
    setFormName('');
    setFormEmail('');
  };

  const handleDeleteUser = async () => {
    if (!deleteConfirmUser) return;
    try {
      await userService.delete(deleteConfirmUser.id);
      setUsers(users.filter((u) => u.id !== deleteConfirmUser.id));
    } catch (err) {
      console.error('Failed deleting user from backend:', err);
    }
    setDeleteConfirmUser(null);
  };

  const toggleUserStatus = async (user) => {
    const nextStatus = user.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await userService.update(user.id, { status: nextStatus });
      setUsers(users.map((u) => u.id === user.id ? { ...u, status: nextStatus } : u));
    } catch (err) {
      console.error('Failed toggling user status on backend:', err);
    }
  };

  const handleViewDetail = (user) => {
    if (onSelectUser) onSelectUser(user.id);
    if (onNavigate) onNavigate('user-detail', user.id);
  };

  return (
    <div className="management-container">
      {/* HEADER ROW */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>User Management</h2>
          <p>Live database synchronised registry of officers, civil trainees, and administrators.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="cc-btn cc-btn-secondary"
            onClick={fetchUsers}
            title="Refresh records from backend database"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
          </button>
          <button
            className="cc-btn cc-btn-primary"
            onClick={() => {
              setFormName('');
              setFormEmail('');
              setIsAddModalOpen(true);
            }}
          >
            <FiPlus /> Add User
          </button>
        </div>
      </div>

      {/* FILTER AND SEARCH BAR */}
      <div className="toolbar-card">
        <div className="toolbar-filters">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, department..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="filter-select"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Trainer">Trainer</option>
            <option value="Learner">Learner</option>
            <option value="Organization">Organization</option>
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="joinedDate">Sort by Date Joined</option>
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
          </select>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="table-responsive-wrapper">
        {paginatedUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Try adjusting your search terms or filter settings."
            actionText="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setRoleFilter('All');
              setStatusFilter('All');
            }}
          />
        ) : (
          <table className="cc-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-identity-cell">
                      <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                      <div className="user-identity-text">
                        <span className="user-identity-name">{user.name}</span>
                        <span className="user-identity-email">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge-pill role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>{user.joinedDate}</td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="View Profile Details"
                        onClick={() => handleViewDetail(user)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Edit User"
                        onClick={() => handleOpenEdit(user)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title={user.status === 'Suspended' ? 'Activate Account' : 'Suspend Account'}
                        style={{ color: user.status === 'Suspended' ? '#16A34A' : '#D97706' }}
                        onClick={() => toggleUserStatus(user)}
                      >
                        {user.status === 'Suspended' ? <FiCheck /> : <FiSlash />}
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Delete User"
                        style={{ color: '#EF4444' }}
                        onClick={() => setDeleteConfirmUser(user)}
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
          totalItems={filteredUsers.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* ADD USER MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleAddUser}>Create Account</button>
          </>
        }
      >
        <form onSubmit={handleAddUser} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Sumanth Varma"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Official Email</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="name@gov.in"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
            >
              <option value="Learner">Learner</option>
              <option value="Trainer">Trainer</option>
              <option value="Admin">Admin</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-input"
              value={formDept}
              onChange={(e) => setFormDept(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Organization</label>
            <input
              type="text"
              className="form-input"
              value={formOrg}
              onChange={(e) => setFormOrg(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* EDIT USER MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit User: ${userToEdit?.name || ''}`}
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleSaveEdit}>Save Changes</button>
          </>
        }
      >
        <form onSubmit={handleSaveEdit} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
            >
              <option value="Learner">Learner</option>
              <option value="Trainer">Trainer</option>
              <option value="Admin">Admin</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-input"
              value={formDept}
              onChange={(e) => setFormDept(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deleteConfirmUser}
        onClose={() => setDeleteConfirmUser(null)}
        title="Confirm User Deletion"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setDeleteConfirmUser(null)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDeleteUser}>Permanently Delete</button>
          </>
        }
      >
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          Are you sure you want to delete user <strong>{deleteConfirmUser?.name}</strong> ({deleteConfirmUser?.email})? 
          This will revoke all certificate authentications and enrolled course progress across Capacity Connect.
        </p>
      </Modal>
    </div>
  );
}
