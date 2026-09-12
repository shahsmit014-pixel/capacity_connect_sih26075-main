/**
 * Capacity Connect API Client & Backend Service Layer
 * 
 * Provides unified REST API client integration for custom backend databases and services.
 * Features:
 *  - Configurable Base URL & Bearer Auth Tokens (persisted in localStorage / .env)
 *  - Live REST request execution with automatic timeout and error parsing
 *  - Seamless fallback / local persistence cache when backend server is offline or being configured
 *  - Connection health check & diagnostic telemetry
 */

import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_TRAINING_PROGRAMS,
  INITIAL_COMPETENCIES,
  INITIAL_KNOWLEDGE_RESOURCES,
  INITIAL_APPROVAL_REQUESTS
} from './mockData';

export const INITIAL_ADMIN_STATS = {
  totalUsers: '12,480',
  activeTrainers: '342',
  publishedCourses: '186',
  competencyCount: '142',
  learningHours: '48,320',
  pendingApprovals: '18',
  avgCompletionRate: '78.5%'
};

// Storage keys
const STORAGE_KEYS = {
  BASE_URL: 'cc_api_base_url',
  TOKEN: 'cc_api_token',
  DB_DIALECT: 'cc_db_dialect',
  MODE: 'cc_api_mode', // 'live' | 'fallback' | 'auto'
  USERS: 'cc_db_users',
  COURSES: 'cc_db_courses',
  PROGRAMS: 'cc_db_programs',
  COMPETENCIES: 'cc_db_competencies',
  RESOURCES: 'cc_db_resources',
  APPROVALS: 'cc_db_approvals',
  SETTINGS: 'cc_db_settings'
};

// Default Configuration
const DEFAULT_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  token: import.meta.env.VITE_API_TOKEN || '',
  dbDialect: localStorage.getItem(STORAGE_KEYS.DB_DIALECT) || 'PostgreSQL / Custom REST',
  mode: localStorage.getItem(STORAGE_KEYS.MODE) || 'auto' // auto: attempts backend, falls back gracefully if unreachable
};

export const getBackendConfig = () => {
  return {
    baseUrl: localStorage.getItem(STORAGE_KEYS.BASE_URL) || DEFAULT_CONFIG.baseUrl,
    token: localStorage.getItem(STORAGE_KEYS.TOKEN) || DEFAULT_CONFIG.token,
    dbDialect: localStorage.getItem(STORAGE_KEYS.DB_DIALECT) || DEFAULT_CONFIG.dbDialect,
    mode: localStorage.getItem(STORAGE_KEYS.MODE) || DEFAULT_CONFIG.mode
  };
};

export const setBackendConfig = (config) => {
  if (config.baseUrl !== undefined) localStorage.setItem(STORAGE_KEYS.BASE_URL, config.baseUrl);
  if (config.token !== undefined) localStorage.setItem(STORAGE_KEYS.TOKEN, config.token);
  if (config.dbDialect !== undefined) localStorage.setItem(STORAGE_KEYS.DB_DIALECT, config.dbDialect);
  if (config.mode !== undefined) localStorage.setItem(STORAGE_KEYS.MODE, config.mode);
};

// Local storage seed helpers (used when backend is starting or offline)
const getLocalData = (key, defaultData) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`[LocalDB] Failed parsing ${key}:`, e);
  }
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[LocalDB] Failed saving ${key}:`, e);
  }
};

/**
 * Universal fetch wrapper for user backend API
 */
export async function apiRequest(endpoint, options = {}) {
  const config = getBackendConfig();
  const cleanBase = config.baseUrl.replace(/\/+$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${cleanBase}${cleanEndpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(config.token ? { 'Authorization': `Bearer ${config.token}` } : {}),
    ...(options.headers || {})
  };

  // Controller with 4-second timeout to prevent UI freezes if backend is offline
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 4000);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`Backend error HTTP ${response.status}: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    return { data, fromBackend: true, status: response.status };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[API] Request to ${fullUrl} could not complete:`, err.message);
    throw err;
  }
}

/**
 * Health Check Utility to test user's backend database and API server
 */
export async function testBackendConnection(customUrl, customToken) {
  const urlToTest = (customUrl || getBackendConfig().baseUrl).replace(/\/+$/, '');
  const tokenToUse = customToken !== undefined ? customToken : getBackendConfig().token;
  const startTime = performance.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  // We test the /health or /api/health or fallback to /users
  const endpoints = ['/health', '/status', '/users'];

  for (const ep of endpoints) {
    try {
      const response = await fetch(`${urlToTest}${ep}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...(tokenToUse ? { 'Authorization': `Bearer ${tokenToUse}` } : {})
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const latency = Math.round(performance.now() - startTime);

      return {
        success: response.ok || response.status < 500,
        status: response.status,
        statusText: response.statusText,
        latency,
        urlTested: `${urlToTest}${ep}`,
        message: response.ok 
          ? `Connected to backend database (${latency}ms latency)` 
          : `Server responded with status HTTP ${response.status}`
      };
    } catch {
      // Continue to next probe endpoint
    }
  }

  clearTimeout(timeoutId);
  return {
    success: false,
    latency: null,
    urlTested: urlToTest,
    message: 'Could not connect to backend server. Verify the server is running and CORS is enabled.'
  };
}

/* =====================================================================
 *  DOMAIN API SERVICES
 *  Each service attempts real backend calls, with transparent fallback
 * ===================================================================== */

// --- USER MANAGEMENT SERVICE ---
export const userService = {
  async getAll() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/users');
        if (Array.isArray(res.data)) {
          setLocalData(STORAGE_KEYS.USERS, res.data);
          return res.data;
        }
        if (res.data && Array.isArray(res.data.users)) {
          setLocalData(STORAGE_KEYS.USERS, res.data.users);
          return res.data.users;
        }
      } catch {
        // Fallback to local store
      }
    }
    return getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  async getById(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest(`/users/${id}`);
        return res.data;
      } catch {
        // Fallback
      }
    }
    const all = getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
    return all.find((u) => u.id === id) || null;
  },

  async create(userData) {
    const config = getBackendConfig();
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      enrolledCourses: 0,
      completedCourses: 0,
      ...userData
    };

    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/users', {
          method: 'POST',
          body: JSON.stringify(newUser)
        });
        const saved = res.data || newUser;
        const current = getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
        setLocalData(STORAGE_KEYS.USERS, [saved, ...current]);
        return saved;
      } catch {
        // Fallback to local
      }
    }

    const current = getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = [newUser, ...current];
    setLocalData(STORAGE_KEYS.USERS, updated);
    return newUser;
  },

  async update(id, updates) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest(`/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates)
        });
        // sync local
        const current = getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
        const updated = current.map((u) => (u.id === id ? { ...u, ...updates } : u));
        setLocalData(STORAGE_KEYS.USERS, updated);
        return res.data;
      } catch {
        // Fallback
      }
    }

    const current = getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = current.map((u) => (u.id === id ? { ...u, ...updates } : u));
    setLocalData(STORAGE_KEYS.USERS, updated);
    return updated.find((u) => u.id === id);
  },

  async delete(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/users/${id}`, { method: 'DELETE' });
      } catch {
        // Fallback
      }
    }
    const current = getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
    const filtered = current.filter((u) => u.id !== id);
    setLocalData(STORAGE_KEYS.USERS, filtered);
    return true;
  }
};

// --- COURSE MANAGEMENT SERVICE ---
export const courseService = {
  async getAll() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/courses');
        if (Array.isArray(res.data)) {
          setLocalData(STORAGE_KEYS.COURSES, res.data);
          return res.data;
        }
        if (res.data && Array.isArray(res.data.courses)) {
          setLocalData(STORAGE_KEYS.COURSES, res.data.courses);
          return res.data.courses;
        }
      } catch {
        // Fallback
      }
    }
    return getLocalData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  },

  async getById(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest(`/courses/${id}`);
        return res.data;
      } catch {
        // Fallback
      }
    }
    const all = getLocalData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    return all.find((c) => c.id === id) || null;
  },

  async create(courseData) {
    const config = getBackendConfig();
    const newCourse = {
      id: `crs-${Date.now().toString().slice(-4)}`,
      learnersCount: 0,
      rating: 5.0,
      completionRate: 0,
      modules: 4,
      ...courseData
    };

    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/courses', {
          method: 'POST',
          body: JSON.stringify(newCourse)
        });
        const saved = res.data || newCourse;
        const current = getLocalData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
        setLocalData(STORAGE_KEYS.COURSES, [saved, ...current]);
        return saved;
      } catch {
        // Fallback
      }
    }

    const current = getLocalData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    const updated = [newCourse, ...current];
    setLocalData(STORAGE_KEYS.COURSES, updated);
    return newCourse;
  },

  async update(id, updates) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/courses/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates)
        });
      } catch {
        // Fallback
      }
    }
    const current = getLocalData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setLocalData(STORAGE_KEYS.COURSES, updated);
    return updated.find((c) => c.id === id);
  },

  async delete(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/courses/${id}`, { method: 'DELETE' });
      } catch {
        // Fallback
      }
    }
    const current = getLocalData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    const filtered = current.filter((c) => c.id !== id);
    setLocalData(STORAGE_KEYS.COURSES, filtered);
    return true;
  }
};

// --- TRAINING PROGRAMS SERVICE ---
export const trainingService = {
  async getAll() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/training-programs');
        if (Array.isArray(res.data)) return res.data;
        if (res.data?.programs) return res.data.programs;
      } catch {}
    }
    return getLocalData(STORAGE_KEYS.PROGRAMS, INITIAL_TRAINING_PROGRAMS);
  },

  async create(progData) {
    const config = getBackendConfig();
    const newProg = {
      id: `prog-${Date.now().toString().slice(-4)}`,
      enrolled: 0,
      status: 'Upcoming',
      ...progData
    };
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/training-programs', {
          method: 'POST',
          body: JSON.stringify(newProg)
        });
        return res.data || newProg;
      } catch {}
    }
    const cur = getLocalData(STORAGE_KEYS.PROGRAMS, INITIAL_TRAINING_PROGRAMS);
    setLocalData(STORAGE_KEYS.PROGRAMS, [newProg, ...cur]);
    return newProg;
  },

  async update(id, updates) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest(`/training-programs/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates)
        });
        if (res.data) return res.data;
      } catch {}
    }
    const current = getLocalData(STORAGE_KEYS.PROGRAMS, INITIAL_TRAINING_PROGRAMS);
    const updated = current.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setLocalData(STORAGE_KEYS.PROGRAMS, updated);
    return updated.find((p) => p.id === id);
  },

  async delete(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/training-programs/${id}`, { method: 'DELETE' });
      } catch {}
    }
    const current = getLocalData(STORAGE_KEYS.PROGRAMS, INITIAL_TRAINING_PROGRAMS);
    const filtered = current.filter((p) => p.id !== id);
    setLocalData(STORAGE_KEYS.PROGRAMS, filtered);
    return true;
  }
};

// --- COMPETENCIES SERVICE ---
export const competencyService = {
  async getAll() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/competencies');
        if (Array.isArray(res.data)) return res.data;
        if (res.data?.competencies) return res.data.competencies;
      } catch {}
    }
    return getLocalData(STORAGE_KEYS.COMPETENCIES, INITIAL_COMPETENCIES);
  },

  async create(compData) {
    const config = getBackendConfig();
    const newComp = {
      id: `cmp-${Date.now().toString().slice(-4)}`,
      certifiedLearners: 0,
      coursesMapped: 0,
      status: 'Active',
      ...compData
    };
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/competencies', {
          method: 'POST',
          body: JSON.stringify(newComp)
        });
        return res.data || newComp;
      } catch {}
    }
    const cur = getLocalData(STORAGE_KEYS.COMPETENCIES, INITIAL_COMPETENCIES);
    setLocalData(STORAGE_KEYS.COMPETENCIES, [newComp, ...cur]);
    return newComp;
  },

  async delete(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/competencies/${id}`, { method: 'DELETE' });
      } catch {}
    }
    const cur = getLocalData(STORAGE_KEYS.COMPETENCIES, INITIAL_COMPETENCIES);
    setLocalData(STORAGE_KEYS.COMPETENCIES, cur.filter((c) => c.id !== id));
    return true;
  }
};

// --- KNOWLEDGE HUB SERVICE ---
export const knowledgeService = {
  async getAll() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/knowledge-hub');
        if (Array.isArray(res.data)) return res.data;
        if (res.data?.resources) return res.data.resources;
      } catch {}
    }
    return getLocalData(STORAGE_KEYS.RESOURCES, INITIAL_KNOWLEDGE_RESOURCES);
  },

  async create(resData) {
    const config = getBackendConfig();
    const newRes = {
      id: `res-${Date.now().toString().slice(-4)}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      status: 'Published',
      ...resData
    };
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/knowledge-hub', {
          method: 'POST',
          body: JSON.stringify(newRes)
        });
        return res.data || newRes;
      } catch {}
    }
    const cur = getLocalData(STORAGE_KEYS.RESOURCES, INITIAL_KNOWLEDGE_RESOURCES);
    setLocalData(STORAGE_KEYS.RESOURCES, [newRes, ...cur]);
    return newRes;
  },

  async delete(id) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/knowledge-hub/${id}`, { method: 'DELETE' });
      } catch {}
    }
    const cur = getLocalData(STORAGE_KEYS.RESOURCES, INITIAL_KNOWLEDGE_RESOURCES);
    setLocalData(STORAGE_KEYS.RESOURCES, cur.filter((r) => r.id !== id));
    return true;
  }
};

// --- APPROVAL WORKFLOW SERVICE ---
export const approvalService = {
  async getAll() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/approvals');
        if (Array.isArray(res.data)) return res.data;
        if (res.data?.approvals) return res.data.approvals;
      } catch {}
    }
    return getLocalData(STORAGE_KEYS.APPROVALS, INITIAL_APPROVAL_REQUESTS);
  },

  async updateStatus(id, status, notes = '') {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest(`/approvals/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status, notes })
        });
      } catch {}
    }
    const cur = getLocalData(STORAGE_KEYS.APPROVALS, INITIAL_APPROVAL_REQUESTS);
    const updated = cur.map((a) => (a.id === id ? { ...a, status, adminNotes: notes } : a));
    setLocalData(STORAGE_KEYS.APPROVALS, updated);
    return updated.find((a) => a.id === id);
  }
};

// --- DASHBOARD & ANALYTICS SERVICE ---
export const analyticsService = {
  async getDashboardStats() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/analytics/dashboard');
        if (res.data) return res.data;
      } catch {}
    }
    return INITIAL_ADMIN_STATS;
  },

  async getOrgAnalytics(timeframe = '30d') {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest(`/analytics/organization?timeframe=${timeframe}`);
        if (res.data) return res.data;
      } catch {}
    }
    return {
      totalHours: '42,500 hrs',
      completionRate: '78.5%',
      activeLearners: '8,920',
      certificatesIssued: '3,450'
    };
  }
};

// --- SETTINGS SERVICE ---
export const settingsService = {
  async getSettings() {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        const res = await apiRequest('/settings');
        if (res.data) return res.data;
      } catch {}
    }
    return getLocalData(STORAGE_KEYS.SETTINGS, {
      platformName: 'Capacity Connect',
      supportEmail: 'support@capacityconnect.gov.in',
      timezone: '(GMT+05:30) Asia/Kolkata (IST)',
      defaultLanguage: 'English (Indian Official)',
      twoFactorAuth: true,
      passwordExpiry: '90',
      sessionTimeout: '30',
      ipRestrictions: false,
      maintenanceMode: false
    });
  },

  async saveSettings(data) {
    const config = getBackendConfig();
    if (config.mode !== 'fallback') {
      try {
        await apiRequest('/settings', {
          method: 'PUT',
          body: JSON.stringify(data)
        });
      } catch {}
    }
    setLocalData(STORAGE_KEYS.SETTINGS, data);
    return data;
  }
};
