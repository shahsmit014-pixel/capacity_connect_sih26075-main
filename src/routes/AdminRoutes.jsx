import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  Outlet
} from 'react-router-dom';

import  AdminLayout  from '../Pages/Admin/AdminLayout';
import  AdminDashboard  from '../Pages/Admin/AdminDashboard';
import  UserManagement  from '../Pages/Admin/UserManagement';
import  UserDetail  from '../Pages/Admin/UserDetail';
import  TrainerManagement  from '../Pages/Admin/TrainerManagement';
import  LearnerManagement  from '../Pages/Admin/LearnerManagement';
import  CourseManagement  from '../Pages/Admin/CourseManagement';
import  CourseDetail  from '../Pages/Admin/CourseDetail';
import  TrainingPrograms  from '../Pages/Admin/TrainingPrograms';
import  CompetencyManagement  from '../Pages/Admin/CompetencyManagement';
import  KnowledgeHub  from '../Pages/Admin/KnowledgeHub';
import  ApprovalCenter  from '../Pages/Admin/ApprovalCenter';
import  OrganizationAnalytics  from '../Pages/Admin/OrganizationAnalytics';
import  Reports  from '../Pages/Admin/Reports';
import  PlatformSettings  from '../Pages/Admin/PlatformSettings';
import  NotFound  from '../Pages/Admin/NotFound';

/**
 * Maps legacy page IDs or shortcut action strings to canonical URL routes.
 * @param {string} pageId
 * @param {string} [paramId]
 * @returns {string}
 */
export function resolveAdminPath(pageId, paramId) {
  switch (pageId) {
    case 'dashboard':
    case 'admin':
      return '/admin';
    case 'users':
      return '/admin/users';
    case 'user-detail':
      return `/admin/users/${paramId || 'usr-101'}`;
    case 'trainers':
      return '/admin/trainers';
    case 'learners':
      return '/admin/learners';
    case 'courses':
      return '/admin/courses';
    case 'course-detail':
      return `/admin/courses/${paramId || 'crs-201'}`;
    case 'training':
    case 'training-programs':
      return '/admin/training';
    case 'competencies':
      return '/admin/competencies';
    case 'knowledge-hub':
      return '/admin/knowledge-hub';
    case 'approvals':
      return '/admin/approvals';
    case 'analytics':
      return '/admin/analytics';
    case 'reports':
      return '/admin/reports';
    case 'settings':
      return '/admin/settings';
    default:
      return pageId.startsWith('/') ? pageId : `/admin/${pageId}`;
  }
}

/**
 * Helper hook to navigate using either canonical routes or legacy page IDs.
 */
export function usePortalNavigate() {
  const navigate = useNavigate();
  return (pageId, paramId) => {
    const target = resolveAdminPath(pageId, paramId);
    navigate(target);
  };
}

/**
 * Handles smooth scrolling to top on route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

/**
 * Automatically transitions legacy hash URLs (e.g., #/admin/users) to HTML5 history routes.
 */
function HashSyncHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/')) {
        const cleanPath = hash.replace('#', '');
        window.history.replaceState(null, '', cleanPath);
        navigate(cleanPath, { replace: true });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [navigate]);

  return null;
}

/**
 * Redirects shorthand /users/:userId to /admin/users/:userId
 */
function RedirectUser() {
  const { userId } = useParams();
  return <Navigate to={`/admin/users/${userId || ''}`} replace />;
}

/**
 * Redirects shorthand /courses/:courseId to /admin/courses/:courseId
 */
function RedirectCourse() {
  const { courseId } = useParams();
  return <Navigate to={`/admin/courses/${courseId || ''}`} replace />;
}

/**
 * Admin Layout Wrapper that supplies the common layout chrome around nested views.
 */
function AdminLayoutContainer() {
  const navigate = useNavigate();
  const handleNavigate = (page, id) => {
    navigate(resolveAdminPath(page, id));
  };

  return (
    <AdminLayout onNavigate={handleNavigate} pendingApprovalsCount={34}>
      <Outlet />
    </AdminLayout>
  );
}

/**
 * Main application routing definition for Capacity Connect
 */
export function AppRoutes() {
  const navigate = useNavigate();
  const handleNavigate = (page, id) => {
    navigate(resolveAdminPath(page, id));
  };

  return (
    <>
      <ScrollToTop />
      <HashSyncHandler />
      <Routes>
        {/* Root Redirects */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

        {/* Primary Admin Portal Routes */}
        <Route path="/admin" element={<AdminLayoutContainer />}>
          <Route index element={<AdminDashboard onNavigate={handleNavigate} />} />
          <Route path="dashboard" element={<AdminDashboard onNavigate={handleNavigate} />} />

          {/* User Management */}
          <Route
            path="users"
            element={
              <UserManagement
                onNavigate={handleNavigate}
                onSelectUser={(userId) => navigate(`/admin/users/${userId}`)}
              />
            }
          />
          <Route
            path="users/:userId"
            element={
              <UserDetail
                onNavigate={handleNavigate}
                onBack={() => navigate('/admin/users')}
              />
            }
          />

          {/* Trainers & Learners */}
          <Route
            path="trainers"
            element={
              <TrainerManagement
                onNavigate={handleNavigate}
                onSelectUser={(userId) => navigate(`/admin/users/${userId}`)}
              />
            }
          />
          <Route
            path="learners"
            element={
              <LearnerManagement
                onNavigate={handleNavigate}
                onSelectUser={(userId) => navigate(`/admin/users/${userId}`)}
              />
            }
          />

          {/* Courses */}
          <Route
            path="courses"
            element={
              <CourseManagement
                onNavigate={handleNavigate}
                onSelectCourse={(courseId) => navigate(`/admin/courses/${courseId}`)}
              />
            }
          />
          <Route
            path="courses/:courseId"
            element={
              <CourseDetail
                onNavigate={handleNavigate}
                onBack={() => navigate('/admin/courses')}
              />
            }
          />

          {/* Programs, Frameworks & Hubs */}
          <Route path="training" element={<TrainingPrograms />} />
          <Route path="training-programs" element={<Navigate to="/admin/training" replace />} />
          <Route path="competencies" element={<CompetencyManagement />} />
          <Route path="knowledge-hub" element={<KnowledgeHub />} />
          <Route path="approvals" element={<ApprovalCenter />} />
          <Route path="analytics" element={<OrganizationAnalytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<PlatformSettings />} />

          {/* Catch-all within /admin */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Top-Level Shorthand Routes (for direct developer/user convenience) */}
        <Route path="/users" element={<Navigate to="/admin/users" replace />} />
        <Route path="/users/:userId" element={<RedirectUser />} />
        <Route path="/trainers" element={<Navigate to="/admin/trainers" replace />} />
        <Route path="/learners" element={<Navigate to="/admin/learners" replace />} />
        <Route path="/courses" element={<Navigate to="/admin/courses" replace />} />
        <Route path="/courses/:courseId" element={<RedirectCourse />} />
        <Route path="/training" element={<Navigate to="/admin/training" replace />} />
        <Route path="/training-programs" element={<Navigate to="/admin/training" replace />} />
        <Route path="/competencies" element={<Navigate to="/admin/competencies" replace />} />
        <Route path="/knowledge-hub" element={<Navigate to="/admin/knowledge-hub" replace />} />
        <Route path="/approvals" element={<Navigate to="/admin/approvals" replace />} />
        <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
        <Route path="/reports" element={<Navigate to="/admin/reports" replace />} />
        <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />

        {/* Global 404 Catch-All */}
        <Route
          path="*"
          element={
            <AdminLayout onNavigate={handleNavigate}>
              <NotFound />
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
