/* ============================================================
   DRISHTI — SCRB Crime Intelligence Assistant
   app.js  ·  Session · RBAC · Routing · Language Engine
   ============================================================ */

'use strict';

/* ─── ROLE DEFINITIONS ───────────────────────────────────────── */
const ROLES = {
  admin: {
    label: 'Administrator',
    labelKn: 'ಆಡಳಿತಗಾರ',
    labelHi: 'व्यवस्थापक',
    clearance: 'L4',
    color: '#f25c5c',
    icon: '🛡️',
    badge: 'badge-admin',
    allowedFeatures: ['chat', 'network', 'hotspot', 'trends', 'audit', 'export', 'admin'],
  },
  sp: {
    label: 'Superintendent of Police',
    labelKn: 'ಪೊಲೀಸ್ ಅಧೀಕ್ಷಕ',
    labelHi: 'पुलिस अधीक्षक',
    clearance: 'L3',
    color: '#f5a623',
    icon: '⭐',
    badge: 'badge-sp',
    allowedFeatures: ['chat', 'network', 'hotspot', 'trends', 'audit', 'export'],
  },
  dsp: {
    label: 'Deputy Superintendent of Police',
    labelKn: 'ಉಪ ಪೊಲೀಸ್ ಅಧೀಕ್ಷಕ',
    labelHi: 'उपाधीक्षक पुलिस',
    clearance: 'L2',
    color: '#4f6ef7',
    icon: '🔵',
    badge: 'badge-dsp',
    allowedFeatures: ['chat', 'network', 'hotspot', 'trends', 'export'],
  },
  inspector: {
    label: 'Police Inspector',
    labelKn: 'ಪೊಲೀಸ್ ಇನ್ಸ್ಪೆಕ್ಟರ್',
    labelHi: 'पुलिस निरीक्षक',
    clearance: 'L1',
    color: '#22c97a',
    icon: '👮',
    badge: 'badge-inspector',
    allowedFeatures: ['chat', 'network', 'hotspot', 'trends'],
  },
  analyst: {
    label: 'Crime Analyst',
    labelKn: 'ಅಪರಾಧ ವಿಶ್ಲೇಷಕ',
    labelHi: 'अपराध विश्लेषक',
    clearance: 'L2',
    color: '#a78bfa',
    icon: '📊',
    badge: 'badge-analyst',
    allowedFeatures: ['chat', 'network', 'hotspot', 'trends', 'export'],
  },
};

/* ─── JURISDICTION LIST ──────────────────────────────────────── */
const JURISDICTIONS = [
  { id: 'bengaluru-urban',  label: 'Bengaluru Urban',   labelKn: 'ಬೆಂಗಳೂರು ನಗರ',    labelHi: 'बेंगलुरु शहर' },
  { id: 'bengaluru-rural',  label: 'Bengaluru Rural',   labelKn: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',labelHi: 'बेंगलुरु ग्रामीण' },
  { id: 'mysuru',           label: 'Mysuru',            labelKn: 'ಮೈಸೂರು',            labelHi: 'मैसूरु' },
  { id: 'dharwad',          label: 'Dharwad',           labelKn: 'ಧಾರವಾಡ',            labelHi: 'धारवाड़' },
  { id: 'belagavi',         label: 'Belagavi',          labelKn: 'ಬೆಳಗಾವಿ',           labelHi: 'बेलगावी' },
  { id: 'mangaluru',        label: 'Mangaluru',         labelKn: 'ಮಂಗಳೂರು',           labelHi: 'मंगलूरू' },
  { id: 'kalaburagi',       label: 'Kalaburagi',        labelKn: 'ಕಲಬುರಗಿ',           labelHi: 'कलबुर्गी' },
  { id: 'ballari',          label: 'Ballari',           labelKn: 'ಬಳ್ಳಾರಿ',           labelHi: 'बल्लारी' },
  { id: 'davangere',        label: 'Davangere',         labelKn: 'ದಾವಣಗೆರೆ',          labelHi: 'दावणगेरे' },
  { id: 'shivamogga',       label: 'Shivamogga',        labelKn: 'ಶಿವಮೊಗ್ಗ',          labelHi: 'शिवमोग्गा' },
  { id: 'tumakuru',         label: 'Tumakuru',          labelKn: 'ತುಮಕೂರು',           labelHi: 'तुमकूरू' },
  { id: 'vijayapura',       label: 'Vijayapura',        labelKn: 'ವಿಜಯಪುರ',           labelHi: 'विजयपुर' },
  { id: 'hassan',           label: 'Hassan',            labelKn: 'ಹಾಸನ',              labelHi: 'हासन' },
  { id: 'udupi',            label: 'Udupi',             labelKn: 'ಉಡುಪಿ',             labelHi: 'उडुपी' },
  { id: 'chitradurga',      label: 'Chitradurga',       labelKn: 'ಚಿತ್ರದುರ್ಗ',         labelHi: 'चित्रदुर्ग' },
];

/* ─── LANGUAGE STRINGS ───────────────────────────────────────── */
const STRINGS = {
  en: {
    welcome: 'Welcome back',
    subtitle: 'Karnataka SCRB Crime Intelligence Assistant',
    tagline: 'Vision / Insight / Intelligence',
    selectRole: 'Select your role to continue',
    selectJurisdiction: 'Select Jurisdiction',
    loginBtn: 'Access Drishti Intelligence',
    notice: 'All queries are logged and audited per DPDPA 2023 compliance.',
    dashTitle: 'Intelligence Dashboard',
    today: 'Today',
    searchPlaceholder: 'Search cases, FIRs, locations…',
    recentCases: 'Recent Cases',
    quickActions: 'Quick Actions',
    viewAll: 'View All',
    lead: '⚠️ This is a lead — verify against source records before acting.',
    logout: 'Sign Out',
    language: 'Language',
    role: 'Role',
    jurisdiction: 'Jurisdiction',
    clearance: 'Clearance',
    firsToday: 'FIRs Today',
    hotspots: 'Active Hotspots',
    pendingCS: 'Pending Chargesheets',
    networkLinks: 'Network Links',
  },
  kn: {
    welcome: 'ಮರಳಿ ಸ್ವಾಗತ',
    subtitle: 'ಕರ್ನಾಟಕ SCRB ಅಪರಾಧ ಗುಪ್ತಚರ ಸಹಾಯಕ',
    tagline: 'ದೃಷ್ಟಿ / ಒಳನೋಟ / ಬುದ್ಧಿಮತ್ತೆ',
    selectRole: 'ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
    selectJurisdiction: 'ನ್ಯಾಯವ್ಯಾಪ್ತಿ ಆಯ್ಕೆ ಮಾಡಿ',
    loginBtn: 'ದೃಷ್ಟಿ ಪ್ರವೇಶಿಸಿ',
    notice: 'ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು DPDPA 2023 ಅನುಸಾರ ದಾಖಲಿಸಲ್ಪಡುತ್ತವೆ.',
    dashTitle: 'ಗುಪ್ತಚರ ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    today: 'ಇಂದು',
    searchPlaceholder: 'ಪ್ರಕರಣಗಳು, FIR, ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ…',
    recentCases: 'ಇತ್ತೀಚಿನ ಪ್ರಕರಣಗಳು',
    quickActions: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    viewAll: 'ಎಲ್ಲ ನೋಡಿ',
    lead: '⚠️ ಇದು ಒಂದು ಸುಳಿವು — ಯಾವುದೇ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಮೂಲ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    logout: 'ಸೈನ್ ಔಟ್',
    language: 'ಭಾಷೆ',
    role: 'ಪಾತ್ರ',
    jurisdiction: 'ನ್ಯಾಯವ್ಯಾಪ್ತಿ',
    clearance: 'ಮಂಜೂರಾತಿ',
    firsToday: 'ಇಂದು FIR ಗಳು',
    hotspots: 'ಸಕ್ರಿಯ ಹಾಟ್ಸ್ಪಾಟ್ಗಳು',
    pendingCS: 'ಬಾಕಿ ಚಾರ್ಜ್‌ಶೀಟ್ಗಳು',
    networkLinks: 'ನೆಟ್‌ವರ್ಕ್ ಲಿಂಕ್‌ಗಳು',
  },
  hi: {
    welcome: 'वापस स्वागत है',
    subtitle: 'कर्नाटक SCRB अपराध आसूचना सहायक',
    tagline: 'दृष्टि / अंतर्दृष्टि / आसूचना',
    selectRole: 'जारी रखने के लिए अपनी भूमिका चुनें',
    selectJurisdiction: 'अधिकार क्षेत्र चुनें',
    loginBtn: 'दृष्टि में प्रवेश करें',
    notice: 'सभी प्रश्न DPDPA 2023 अनुपालन के अनुसार लॉग और ऑडिट किए जाते हैं।',
    dashTitle: 'आसूचना डैशबोर्ड',
    today: 'आज',
    searchPlaceholder: 'मामले, FIR, स्थान खोजें…',
    recentCases: 'हालिया मामले',
    quickActions: 'त्वरित कार्रवाई',
    viewAll: 'सभी देखें',
    lead: '⚠️ यह एक सुराग है — कोई भी कार्रवाई करने से पहले स्रोत अभिलेखों से सत्यापित करें।',
    logout: 'साइन आउट',
    language: 'भाषा',
    role: 'भूमिका',
    jurisdiction: 'अधिकार क्षेत्र',
    clearance: 'मंजूरी',
    firsToday: 'आज FIR',
    hotspots: 'सक्रिय हॉटस्पॉट',
    pendingCS: 'लंबित चार्जशीट',
    networkLinks: 'नेटवर्क लिंक',
  },
};

/* ─── SESSION MANAGER ────────────────────────────────────────── */
const Session = {
  _key: 'drishti_session',

  save(data) {
    sessionStorage.setItem(this._key, JSON.stringify({
      ...data,
      loginTime: new Date().toISOString(),
      sessionId: `SESS-${Date.now().toString(36).toUpperCase()}`,
    }));
  },

  load() {
    try {
      const raw = sessionStorage.getItem(this._key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  clear() {
    sessionStorage.removeItem(this._key);
  },

  isValid() {
    const s = this.load();
    if (!s) return false;
    const age = Date.now() - new Date(s.loginTime).getTime();
    return age < 8 * 60 * 60 * 1000; // 8-hour session
  },

  get(key) {
    const s = this.load();
    return s ? s[key] : null;
  },

  update(data) {
    const s = this.load() || {};
    this.save({ ...s, ...data });
  },
};

/* ─── LANGUAGE ENGINE ────────────────────────────────────────── */
const Lang = {
  _current: 'en',

  set(code) {
    this._current = code;
    document.documentElement.lang = code;
    Session.update({ lang: code });
    this._apply();
  },

  get() { return this._current; },

  t(key) {
    return STRINGS[this._current]?.[key] || STRINGS.en[key] || key;
  },

  _apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this._current);
    });
  },

  init() {
    const saved = Session.get('lang') || 'en';
    this._current = saved;
    document.documentElement.lang = saved;
    this._apply();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.set(btn.dataset.lang));
    });
  },
};

/* ─── AUDIT LOGGER ───────────────────────────────────────────── */
const AuditLog = {
  _key: 'drishti_audit_log',

  _load() {
    try { return JSON.parse(localStorage.getItem(this._key) || '[]'); }
    catch { return []; }
  },

  log(event) {
    const session = Session.load();
    const entry = {
      id: `AL-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      user: session?.userName || 'unknown',
      role: session?.role || 'unknown',
      jurisdiction: session?.jurisdiction || 'unknown',
      event,
      sessionId: session?.sessionId || 'unknown',
    };
    const log = this._load();
    log.unshift(entry);
    localStorage.setItem(this._key, JSON.stringify(log.slice(0, 1000)));
    return entry;
  },

  getAll() { return this._load(); },

  getByUser(user) { return this._load().filter(e => e.user === user); },
};

/* ─── RBAC ───────────────────────────────────────────────────── */
const RBAC = {
  can(feature) {
    const role = Session.get('role');
    if (!role || !ROLES[role]) return false;
    return ROLES[role].allowedFeatures.includes(feature);
  },

  requireLogin() {
    if (!Session.isValid()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },

  getRole() {
    return ROLES[Session.get('role')] || null;
  },
};

/* ─── TOAST NOTIFICATIONS ────────────────────────────────────── */
const Toast = {
  _container: null,

  _getContainer() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'toast-container';
      document.body.appendChild(this._container);
    }
    return this._container;
  },

  show(msg, type = 'info', duration = 4000) {
    const icons = { success: '✅', warning: '⚠️', danger: '🚫', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
    const container = this._getContainer();
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.2s reverse';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  warn(msg)    { this.show(msg, 'warning'); },
  error(msg)   { this.show(msg, 'danger'); },
  info(msg)    { this.show(msg, 'info'); },
};

/* ─── NAV ACTIVE STATE ───────────────────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
}

/* ─── SIDEBAR TOGGLE ─────────────────────────────────────────── */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (!sidebar || !toggleBtn) return;
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sessionStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
  });
  if (sessionStorage.getItem('sidebar_collapsed') === 'true') {
    sidebar.classList.add('collapsed');
  }
}

/* ─── POPULATE USER BAR ──────────────────────────────────────── */
function populateUserBar() {
  const session = Session.load();
  if (!session) return;
  const roleData = ROLES[session.role] || {};
  const lang = session.lang || 'en';

  const nameEl = document.getElementById('user-name');
  const roleEl = document.getElementById('user-role-label');
  const jxEl   = document.getElementById('user-jurisdiction');
  const clrEl  = document.getElementById('user-clearance');
  const avEl   = document.getElementById('user-avatar');

  if (nameEl) nameEl.textContent = session.userName;
  if (roleEl) {
    roleEl.textContent = roleData[`label${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || roleData.label || session.role;
    roleEl.className = `badge ${roleData.badge}`;
  }
  if (jxEl) {
    const jx = JURISDICTIONS.find(j => j.id === session.jurisdiction);
    if (jx) jxEl.textContent = jx[`label${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || jx.label;
  }
  if (clrEl) {
    clrEl.textContent = roleData.clearance;
    clrEl.className = `clearance-badge clearance-${roleData.clearance}`;
  }
  if (avEl) {
    avEl.textContent = (session.userName || 'U').charAt(0).toUpperCase();
    avEl.style.background = `linear-gradient(135deg, ${roleData.color}66, ${roleData.color})`;
  }
}

/* ─── LOGOUT ─────────────────────────────────────────────────── */
function initLogout() {
  document.querySelectorAll('[data-action="logout"]').forEach(el => {
    el.addEventListener('click', () => {
      AuditLog.log({ type: 'LOGOUT', detail: 'User signed out' });
      Session.clear();
      window.location.href = 'index.html';
    });
  });
}

/* ─── GLOBAL INIT (called on every protected page) ───────────── */
function initPage() {
  if (!RBAC.requireLogin()) return;
  Lang.init();
  populateUserBar();
  initSidebar();
  setActiveNav();
  initLogout();
  AuditLog.log({ type: 'PAGE_VIEW', detail: window.location.pathname });
}

/* ─── EXPORT ─────────────────────────────────────────────────── */
window.Drishti = {
  Session, Lang, RBAC, AuditLog, Toast,
  ROLES, JURISDICTIONS, STRINGS,
  initPage,
};
