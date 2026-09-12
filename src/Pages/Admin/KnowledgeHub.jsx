import React, { useState, useMemo, useEffect } from 'react';
import './KnowledgeHub.css';
import {
  FiBook,
  FiUploadCloud,
  FiSearch,
  FiDownload,
  FiEye,
  FiTrash2,
  FiFileText,
  FiFolder,
  FiShare2,
  FiVideo,
  FiFile,
  FiRefreshCw
} from 'react-icons/fi';
import { StatCard, Pagination, Modal, EmptyState } from './CommonComponents';
import { knowledgeService } from './servicesApi';

export default function KnowledgeHub() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await knowledgeService.getAll();
      setResources(data);
    } catch (err) {
      console.error('Failed fetching knowledge resources from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewResource, setPreviewResource] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Guidelines');
  const [fileType, setFileType] = useState('PDF');
  const [size, setSize] = useState('4.2 MB');

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTab = activeTab === 'All Resources' || r.category.toLowerCase().includes(activeTab.toLowerCase().replace(' documents', '').replace('s', ''));
      return matchSearch && matchTab;
    });
  }, [resources, searchTerm, activeTab]);

  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredResources.slice(start, start + pageSize);
  }, [filteredResources, currentPage]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const newRPayload = {
      title,
      category,
      fileType,
      size,
      downloads: 0,
      downloadsTrend: "+0%",
      uploadedBy: "Central Administration",
      department: "National Repository"
    };
    try {
      const created = await knowledgeService.create(newRPayload);
      setResources([created, ...resources]);
    } catch (err) {
      console.error('Failed uploading resource to backend:', err);
    }
    setIsUploadOpen(false);
    setTitle('');
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await knowledgeService.delete(deleteConfirm.id);
      setResources(resources.filter((r) => r.id !== deleteConfirm.id));
    } catch (err) {
      console.error('Failed deleting resource from backend:', err);
    }
    setDeleteConfirm(null);
  };

  const getIconForType = (type) => {
    switch (type.toUpperCase()) {
      case 'PDF': return <FiFileText />;
      case 'VIDEO': return <FiVideo />;
      default: return <FiFile />;
    }
  };

  return (
    <div className="knowledge-hub-container">
      {/* HEADER */}
      <div className="management-header-row">
        <div className="management-heading">
          <h2>Knowledge Hub</h2>
          <p>Repository and sovereign policy archives synchronized with your backend.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="cc-btn cc-btn-secondary"
            onClick={fetchResources}
            title="Refresh documents from database"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin-icon' : ''} /> {loading ? 'Syncing...' : 'Sync DB'}
          </button>
          <button className="cc-btn cc-btn-primary" onClick={() => setIsUploadOpen(true)}>
            <FiUploadCloud /> Upload Resource
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="knowledge-stats-grid">
        <StatCard
          title="Total Documents"
          value="1,240"
          change="+42 Added"
          isPositive={true}
          icon={FiBook}
          colorScheme="blue"
        />
        <StatCard
          title="Categories"
          value="12"
          change="Curated Taxonomies"
          isPositive={true}
          icon={FiFolder}
          colorScheme="purple"
        />
        <StatCard
          title="Downloads"
          value="18,450"
          change="+18.2%"
          isPositive={true}
          icon={FiDownload}
          colorScheme="green"
        />
        <StatCard
          title="Contributed Resources"
          value="340"
          change="Across 28 Depts"
          isPositive={true}
          icon={FiShare2}
          colorScheme="amber"
        />
      </div>

      {/* TABS ROW */}
      <div className="detail-tabs-bar">
        {['All Resources', 'Policy Documents', 'Guidelines', 'Case Studies', 'Research Papers'].map((tab) => (
          <button
            key={tab}
            className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TOOLBAR */}
      <div className="toolbar-card">
        <div className="toolbar-filters">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search repository titles, whitepapers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive-wrapper">
        {paginatedResources.length === 0 ? (
          <EmptyState
            title="No documents located"
            description="No files matched your active search and category selection."
            actionText="View All Documents"
            onAction={() => {
              setSearchTerm('');
              setActiveTab('All Resources');
            }}
          />
        ) : (
          <table className="cc-table">
            <thead>
              <tr>
                <th>Resource Title</th>
                <th>Category</th>
                <th>File Format</th>
                <th>Size</th>
                <th>Upload Date</th>
                <th>Downloads</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResources.map((res) => (
                <tr key={res.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px', color: '#0788C9' }}>{getIconForType(res.fileType)}</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ color: '#102A43' }}>{res.title}</strong>
                        <span style={{ fontSize: '12px', color: '#718096' }}>By {res.uploadedBy}</span>
                      </div>
                    </div>
                  </td>
                  <td>{res.category}</td>
                  <td>
                    <span className={`file-type-badge file-type-${res.fileType.toLowerCase()}`}>
                      {res.fileType}
                    </span>
                  </td>
                  <td>{res.size}</td>
                  <td>{res.uploadDate}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                      <FiDownload style={{ color: '#0788C9' }} />
                      <span>{res.downloads.toLocaleString()}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons-group" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Download Asset"
                        onClick={() => alert(`Downloading "${res.title}"...`)}
                      >
                        <FiDownload />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Preview Document"
                        onClick={() => setPreviewResource(res)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="cc-btn cc-btn-icon-only"
                        title="Delete Document"
                        style={{ color: '#EF4444' }}
                        onClick={() => setDeleteConfirm(res)}
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
          totalItems={filteredResources.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* UPLOAD MODAL */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Sovereign Learning Asset"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setIsUploadOpen(false)}>Cancel</button>
            <button className="cc-btn cc-btn-primary" onClick={handleUpload}>Publish Resource</button>
          </>
        }
      >
        <form onSubmit={handleUpload} className="modal-form-grid">
          <div className="form-group full-width">
            <label className="form-label">Document Title</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Standard Operating Procedure for National Digital Locker Integrations"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Policy Documents">Policy Documents</option>
              <option value="Guidelines">Guidelines</option>
              <option value="Case Studies">Case Studies</option>
              <option value="Research Papers">Research Papers</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">File Type</label>
            <select
              className="form-select"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option value="PDF">PDF</option>
              <option value="DOCX">DOCX</option>
              <option value="PPTX">PPTX</option>
              <option value="VIDEO">VIDEO</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">File Size</label>
            <input
              type="text"
              className="form-input"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* PREVIEW MODAL */}
      <Modal
        isOpen={!!previewResource}
        onClose={() => setPreviewResource(null)}
        title={previewResource?.title || 'Document Preview'}
        footer={<button className="cc-btn cc-btn-secondary" onClick={() => setPreviewResource(null)}>Close</button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
            <span style={{ fontSize: '32px', color: '#0788C9' }}>{previewResource && getIconForType(previewResource.fileType)}</span>
            <h4 style={{ marginTop: '10px', color: '#102A43' }}>{previewResource?.title}</h4>
            <p style={{ fontSize: '12.5px', color: '#718096', marginTop: '4px' }}>
              Format: {previewResource?.fileType} • Size: {previewResource?.size} • Uploaded by {previewResource?.uploadedBy}
            </p>
          </div>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
            This verified sovereign repository item is encrypted and indexed for civil servant knowledge advancement.
          </p>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Resource"
        footer={
          <>
            <button className="cc-btn cc-btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="cc-btn cc-btn-danger" onClick={handleDelete}>Delete Permanently</button>
          </>
        }
      >
        <p style={{ color: '#475569' }}>
          Remove <strong>{deleteConfirm?.title}</strong> from Capacity Connect repository?
        </p>
      </Modal>
    </div>
  );
}
