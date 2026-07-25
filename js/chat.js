/* ============================================================
   DRISHTI — chat.js  ·  Bilingual Chat Engine  ·  v1.0
   Voice · Context Retention · Tool Visualization · Explainability
   ============================================================ */

'use strict';

(function () {

/* ─── MOCK RESPONSE DATABASE ─────────────────────────────────── */
const MOCK_RESPONSES = {

  /* English queries */
  'chain snatching bengaluru south': {
    lang: 'en',
    answer: '47 FIRs in Bengaluru South tagged chain-snatching, Apr–Jun 2026 — up 12% on the prior quarter, concentrated in Jayanagar and JP Nagar beats, 6–9 PM window.',
    badges: ['fact','inference'],
    sources: ['FIR/0114/2025','FIR/0887/2026','FIR/1042/2026'],
    toolCalls: [
      { name: 'search_records', args: 'query="chain snatching", area="Bengaluru South", window="Apr–Jun 2026"', result: '47 records returned', icon: '🔍' },
      { name: 'trend_query',    args: 'area="Bengaluru South", crime_type="chain_snatching", window="Q2-2026"', result: 'Trend: +12% vs Q1-2026', icon: '📈' },
      { name: 'log_audit',      args: 'event=QUERY, data=FIR_RECORDS_Q2', result: 'AL-2X9K2M logged', icon: '📋' },
    ],
    hasLead: false,
    confidence: null,
  },

  'network links accused fir 2291': {
    lang: 'en',
    answer: 'FIR/2291/2026 (Jayanagar, Burglary, BNS §305) shows 2 direct network links:\n\n• Rajan B. — co-accused in FIR/0114/2025 (same MO, Yelahanka)\n• Shared address on file: 14B, 4th Cross, Wilson Garden — linked to FIR/0087/2026\n\nThis is an inference — 3 records share overlapping accused and location data.',
    badges: ['fact','inference'],
    sources: ['FIR/2291/2026','FIR/0114/2025','FIR/0087/2026'],
    toolCalls: [
      { name: 'get_case',      args: 'case_id="FIR/2291/2026"', result: 'Case retrieved: Burglary, BNS §305', icon: '📁' },
      { name: 'network_graph', args: 'entity_ids=["Rajan_B","FIR2291"], depth=2, basis_required=true', result: '2 edges found with evidentiary basis', icon: '🕸️' },
      { name: 'log_audit',     args: 'event=NETWORK_QUERY, data=FIR/2291/2026', result: 'AL-3Y4N8P logged', icon: '📋' },
    ],
    hasLead: true,
    confidence: null,
    nodeColor: '#a78bfa',
  },

  'where will burglaries spike': {
    lang: 'en',
    answer: 'Based on 24 months of data (612 incidents) and seasonal trend analysis:\n\n🔴 High Risk: Jayanagar, JP Nagar (elevated, ~78% historical hit-rate at this granularity)\n🟡 Medium Risk: Koramangala, BTM Layout (~55%)\n\nPeak window: 10 PM – 2 AM. Data window: Jan 2024 – Jun 2026.\n\nTreat this as a patrol-resourcing signal — not grounds for action against any named individual.',
    badges: ['prediction'],
    sources: [],
    toolCalls: [
      { name: 'hotspot_forecast', args: 'area="Bengaluru South", crime_type="burglary", window="Jul 2026"', result: '2 high-risk zones, 2 medium-risk zones', icon: '🔮' },
      { name: 'trend_query',      args: 'area="Bengaluru Urban", crime_type="burglary", window="24m"', result: '612 incidents retrieved', icon: '📊' },
      { name: 'log_audit',        args: 'event=PREDICTION_QUERY, scope=AGGREGATE', result: 'AL-5Z2Q7R logged', icon: '📋' },
    ],
    hasLead: true,
    confidence: '78% hit-rate at beat level',
    patrolDisclaimer: true,
  },

  'who is survivor fir 2291': {
    lang: 'en',
    answer: 'Survivor identity in a sexual-offence case is protected by law regardless of role — IPC 228A / BNS §72 and POCSO Act confidentiality rules apply. This session is not flagged as an authorized exception.\n\nWhat I can share without restriction:\n• Case status: Active\n• IO assigned: PSI Asha Patel\n• Sections applied: BNS §305\n• Station: Jayanagar PS',
    badges: ['fact'],
    sources: ['FIR/2291/2026'],
    toolCalls: [
      { name: 'check_clearance', args: 'data_scope="SURVIVOR_IDENTITY"', result: 'RESTRICTED — session not flagged as exception', icon: '🔒' },
      { name: 'get_case',        args: 'case_id="FIR/2291/2026", fields=["status","io","sections"]', result: 'Partial record returned (non-restricted fields)', icon: '📁' },
      { name: 'log_audit',       args: 'event=RESTRICTED_ACCESS_ATTEMPT, data=SURVIVOR_ID', icon: '📋', result: 'AL-7W1B3K logged' },
    ],
    hasLead: false,
    isRestricted: true,
  },

  'which community commits most property crime': {
    lang: 'en',
    answer: 'I don\'t profile by caste or community — the data shouldn\'t be used that way, and it wouldn\'t hold up legally or operationally.\n\nWhat I can give you instead is the real pattern:\n📍 Location: Jayanagar, JP Nagar, BTM Layout (top 3 beats)\n🕐 Time: 6–9 PM (chain snatching), 10 PM–2 AM (burglary)\n🔴 Offence type: Chain snatching (+12% Q2), Burglary (+8% Q2)\n\nWant the property-crime hotspot map instead?',
    badges: ['fact','inference'],
    sources: [],
    toolCalls: [
      { name: 'trend_query',  args: 'area="Bengaluru Urban", crime_type="property_crimes", window="Q2-2026"', result: 'Aggregate returned — demographic filter NOT applied', icon: '📊' },
      { name: 'log_audit',    args: 'event=BIAS_REFRAME, original_query=DEMOGRAPHIC', result: 'AL-8M5V2N logged', icon: '📋' },
    ],
    hasLead: false,
    isBiasReframe: true,
  },

  /* Kannada queries */
  'ಬೆಂಗಳೂರು ದಕ್ಷಿಣ ಸರಪಳಿ': {
    lang: 'kn',
    answer: 'ಬೆಂಗಳೂರು ದಕ್ಷಿಣದಲ್ಲಿ ಏಪ್ರಿಲ್–ಜೂನ್ ೨೦೨೬ರಲ್ಲಿ ಸರಪಳಿ ಕದಿಯುವಿಕೆ ೪೭ FIR ದಾಖಲಾಗಿದೆ — ಹಿಂದಿನ ತ್ರೈಮಾಸಿಕಕ್ಕಿಂತ ೧೨% ಹೆಚ್ಚು. ಜಯನಗರ ಮತ್ತು JP ನಗರ ಬೀಟ್‌ಗಳಲ್ಲಿ ಸಂಜೆ ೬–೯ ಗಂಟೆ ನಡುವೆ ಹೆಚ್ಚಿನ ಘಟನೆಗಳು ದಾಖಲಾಗಿವೆ.',
    badges: ['fact','inference'],
    sources: ['FIR/0114/2025','FIR/0887/2026'],
    toolCalls: [
      { name: 'search_records', args: 'query="ಸರಪಳಿ ಕದಿಯುವಿಕೆ", area="Bengaluru South"', result: '47 ದಾಖಲೆಗಳು ಲಭ್ಯ', icon: '🔍' },
      { name: 'log_audit',      args: 'event=QUERY, lang=kn', result: 'AL-KN001 logged', icon: '📋' },
    ],
    hasLead: false,
  },

  /* Hindi queries */
  'बेंगलुरु में चेन स्नैचिंग': {
    lang: 'hi',
    answer: 'बेंगलुरु दक्षिण में अप्रैल–जून २०२६ के दौरान चेन स्नैचिंग के ४७ FIR दर्ज किए गए — पिछली तिमाही की तुलना में १२% की वृद्धि। जयनगर और JP नगर बीट में शाम ६–९ बजे के बीच सबसे अधिक घटनाएं दर्ज हुई हैं।',
    badges: ['fact','inference'],
    sources: ['FIR/0114/2025','FIR/0887/2026'],
    toolCalls: [
      { name: 'search_records', args: 'query="चेन स्नैचिंग", area="Bengaluru South"', result: '47 अभिलेख उपलब्ध', icon: '🔍' },
      { name: 'log_audit',      args: 'event=QUERY, lang=hi', result: 'AL-HI001 दर्ज', icon: '📋' },
    ],
    hasLead: false,
  },
};

/* ─── SUGGESTED PROMPTS ──────────────────────────────────────── */
const SUGGESTED_PROMPTS = {
  en: [
    'Chain snatching cases in Bengaluru South last quarter',
    'Network links for FIR/2291/2026',
    'Where will burglaries spike next month?',
    'Show hotspots in JP Nagar',
    'Chargesheet status FIR/0087/2026',
  ],
  kn: [
    'ಬೆಂಗಳೂರು ದಕ್ಷಿಣದಲ್ಲಿ ಸರಪಳಿ ಕದಿಯುವಿಕೆ',
    'FIR/2291/2026 ನೆಟ್‌ವರ್ಕ್ ಲಿಂಕ್‌ಗಳು',
    'JP ನಗರ ಹಾಟ್ಸ್ಪಾಟ್‌ಗಳು ತೋರಿಸಿ',
    'ಮುಂದಿನ ತಿಂಗಳು ಎಲ್ಲಿ ದರೋಡೆ ಹೆಚ್ಚಾಗುತ್ತದೆ?',
  ],
  hi: [
    'बेंगलुरु में चेन स्नैचिंग',
    'FIR/2291/2026 के नेटवर्क लिंक',
    'अगले महीने कहाँ सेंधमारी बढ़ेगी?',
    'JP नगर हॉटस्पॉट दिखाएं',
  ],
};

/* ─── WELCOME PROMPTS ────────────────────────────────────────── */
const WELCOME_CARDS = [
  { icon: '🔗', q: 'Network links for FIR/2291/2026', lang: 'en', key: 'network links accused fir 2291' },
  { icon: '🔥', q: 'Where will burglaries spike next month?', lang: 'en', key: 'where will burglaries spike' },
  { icon: '📋', q: 'ಬೆಂಗಳೂರು ಸರಪಳಿ ಕದಿಯುವಿಕೆ Q2', lang: 'kn', key: 'ಬೆಂಗಳೂರು ದಕ್ಷಿಣ ಸರಪಳಿ' },
  { icon: '🛡️', q: 'बेंगलुरु चेन स्नैचिंग रिपोर्ट', lang: 'hi', key: 'बेंगलुरु में चेन स्नैचिंग' },
];

/* ─── STATE ──────────────────────────────────────────────────── */
const state = {
  messages: [],
  isTyping: false,
  activeCases: ['FIR/2291/2026','FIR/0114/2025'],
  activeEntities: [
    { icon: '👤', label: 'Rajan B.', sub: 'Accused · FIR/2291/2026', bg: 'rgba(242,92,92,0.15)' },
    { icon: '📍', label: 'Jayanagar PS', sub: 'Station · Bengaluru Urban', bg: 'rgba(79,110,247,0.15)' },
    { icon: '🚗', label: 'KA-01-MH-4432', sub: 'Vehicle · Linked to accused', bg: 'rgba(245,166,35,0.15)' },
  ],
  isRecording: false,
  recognition: null,
  currentLang: 'en',
  contextOpen: true,
};

/* ─── HELPERS ────────────────────────────────────────────────── */
function auditId() {
  return 'AL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9ಀ-೿\u0900-\u097f ]/g, '').trim();
}

function matchMockResponse(query) {
  const q = slugify(query);
  for (const [key, val] of Object.entries(MOCK_RESPONSES)) {
    const k = slugify(key);
    if (q.includes(k) || k.split(' ').some(word => word.length > 4 && q.includes(word))) {
      return val;
    }
  }
  return null;
}

function detectLang(text) {
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return 'en';
}

/* ─── DOM REFS ───────────────────────────────────────────────── */
let messagesArea, chatTextarea, sendBtn, voiceBtn, inputRow, voiceOverlay;
let voiceTranscriptEl, suggestedPromptsEl, contextSidebar;

/* ─── RENDER FUNCTIONS ───────────────────────────────────────── */
function renderUserMessage(text) {
  const { Session, ROLES } = window.Drishti;
  const session  = Session.load();
  const roleData = ROLES[session?.role] || {};
  const id       = auditId();
  const time     = now();

  const row = document.createElement('div');
  row.className = 'msg-row user';
  row.innerHTML = `
    <div class="msg-avatar user-av" style="background:linear-gradient(135deg,${roleData.color}55,${roleData.color})">
      ${(session?.userName || 'U').charAt(0)}
    </div>
    <div class="msg-body">
      <div class="msg-meta">
        <span class="msg-name">${session?.userName || 'Officer'}</span>
        <span class="msg-time">${time}</span>
        <span class="audit-marker no-label" style="font-size:10px">${id}</span>
      </div>
      <div class="bubble user-bubble">${escapeHtml(text)}</div>
    </div>
  `;
  messagesArea.appendChild(row);
  scrollToBottom();
}

function renderTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'msg-row typing-indicator';
  row.id = 'typing-indicator';
  row.innerHTML = `
    <div class="msg-avatar drishti">👁️</div>
    <div class="msg-body">
      <div class="msg-meta"><span class="msg-name">Drishti</span></div>
      <div class="bubble drishti-bubble">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  messagesArea.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function renderDrishtiMessage(data, rawText) {
  const id   = auditId();
  const time = now();
  const { AuditLog } = window.Drishti;

  // Determine what to render
  const response = data || {
    answer:    rawText || 'I don\'t have enough data to answer that. Please try a more specific query or check the source records.',
    badges:    [],
    sources:   [],
    toolCalls: [
      { name: 'search_records', args: `query="${rawText}"`, result: 'No matching records found', icon: '🔍' },
      { name: 'log_audit',      args: 'event=QUERY_NO_MATCH', result: `${auditId()} logged`, icon: '📋' },
    ],
    hasLead: false,
  };

  const badgeHtml = (response.badges || []).map(b => {
    const cls = { fact: 'badge-fact', inference: 'badge-inference', prediction: 'badge-prediction' };
    const lbl = { fact: 'Fact', inference: 'Inference', prediction: 'Prediction' };
    return `<span class="badge ${cls[b] || 'badge-fact'}">${lbl[b] || b}</span>`;
  }).join('');

  const sourcesHtml = (response.sources || []).length > 0
    ? `<div class="msg-sources">${response.sources.map(s => `<span class="chip">${s}</span>`).join('')}</div>`
    : '';

  const restrictedHtml = response.isRestricted
    ? `<div class="redacted" style="margin-top:var(--space-3)">🔒 PROTECTED — BNS §72 / POCSO — Access restricted</div>` : '';

  const biasHtml = response.isBiasReframe
    ? `<div class="alert alert-info" style="margin-top:var(--space-3);padding:var(--space-2) var(--space-3);font-size:var(--text-xs)">
        <span>ℹ️</span><span>Reframed to lawful location/offence-type analysis — demographic profiling not applied.</span>
       </div>` : '';

  const leadHtml = response.hasLead
    ? `<div class="msg-lead">⚠️ This is a lead — verify against source records before acting.</div>` : '';

  const patrolHtml = response.patrolDisclaimer
    ? `<div class="msg-lead" style="border-left-color:var(--color-prediction)">🔮 Predictive output for patrol planning only — not grounds for search, detention, or naming a suspect.</div>` : '';

  const confHtml = response.confidence
    ? `<div class="confidence-bar" style="margin-top:var(--space-2)">
        <span class="confidence-label">Conf.</span>
        <div class="confidence-track"><div class="confidence-fill medium" style="width:65%"></div></div>
        <span style="font-size:10px;color:var(--color-text-muted)">${response.confidence}</span>
      </div>` : '';

  // Tool calls collapsible
  const toolCallsHtml = (response.toolCalls || []).length > 0
    ? `<div class="tool-calls-wrap">
        <div class="tool-calls-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.tc-arrow').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">
          <span class="tool-calls-title">🔧 ${response.toolCalls.length} tool${response.toolCalls.length > 1 ? 's' : ''} called</span>
          <span class="tc-arrow" style="font-size:10px;color:var(--color-text-muted)">▼</span>
        </div>
        <div class="tool-calls-body">
          ${response.toolCalls.map(tc => `
            <div class="tool-call-item">
              <span class="tool-call-icon">${tc.icon}</span>
              <div>
                <div class="tool-call-name">${tc.name}()</div>
                <div class="tool-call-args">${tc.args}</div>
                ${tc.result ? `<div class="tool-call-result">→ ${tc.result}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : '';

  const answerFormatted = escapeHtml(response.answer).replace(/\n/g, '<br>');

  const row = document.createElement('div');
  row.className = 'msg-row';
  row.innerHTML = `
    <div class="msg-avatar drishti">👁️</div>
    <div class="msg-body">
      <div class="msg-meta">
        <span class="msg-name">Drishti</span>
        <span class="msg-time">${time}</span>
        ${badgeHtml ? `<span style="display:flex;gap:4px;flex-wrap:wrap">${badgeHtml}</span>` : ''}
      </div>

      <div class="bubble drishti-bubble">
        <div style="line-height:var(--leading-relaxed)">${answerFormatted}</div>
        ${confHtml}
        ${restrictedHtml}
        ${biasHtml}
        ${sourcesHtml}
        ${leadHtml}
        ${patrolHtml}
      </div>

      ${toolCallsHtml}

      <div class="msg-audit">
        <span class="msg-audit-id">📋 ${id} · ${time}</span>
        <div class="msg-audit-actions">
          <button class="btn btn-ghost sm" onclick="copyToClipboard(this)" style="font-size:10px">Copy</button>
          <button class="btn btn-ghost sm" style="font-size:10px" onclick="exportThisMsg(this)">Export</button>
        </div>
      </div>

    </div>
  `;

  messagesArea.appendChild(row);
  scrollToBottom();

  // Log audit
  AuditLog.log({
    type:       'CHAT_RESPONSE',
    query:      rawText,
    tools:      (response.toolCalls || []).map(t => t.name).join(', '),
    auditId:    id,
    restricted: response.isRestricted || false,
  });
}

function renderWelcomeScreen() {
  const session   = window.Drishti.Session.load();
  const lang      = session?.lang || 'en';
  const greetings = {
    en: `How can I help you today, ${session?.userName || 'Officer'}?`,
    kn: `ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ, ${session?.userName || 'ಅಧಿಕಾರಿ'}?`,
    hi: `आज मैं आपकी कैसे सहायता करूं, ${session?.userName || 'अधिकारी'}?`,
  };

  const welcome = document.createElement('div');
  welcome.id = 'welcome-screen';
  welcome.className = 'welcome-screen animate-fadeUp';
  welcome.innerHTML = `
    <div class="welcome-logo">👁️</div>
    <div>
      <div class="welcome-title">Drishti</div>
      <p style="color:var(--color-text-muted);margin-top:var(--space-2);font-size:var(--text-sm)">${greetings[lang]}</p>
    </div>
    <div class="welcome-grid">
      ${WELCOME_CARDS.map(c => `
        <button class="welcome-card" onclick="window.ChatEngine.sendWelcomePrompt('${c.key}','${c.q}')">
          <div class="wc-icon">${c.icon}</div>
          <div class="wc-q">${c.q}</div>
          <div class="wc-lang">${c.lang.toUpperCase()}</div>
        </button>
      `).join('')}
    </div>
  `;
  messagesArea.appendChild(welcome);
}

/* ─── SEND MESSAGE ───────────────────────────────────────────── */
function sendMessage(text) {
  text = text.trim();
  if (!text) return;

  // Remove welcome screen
  const ws = document.getElementById('welcome-screen');
  if (ws) ws.remove();

  // Render user message
  renderUserMessage(text);

  // Clear input
  chatTextarea.value = '';
  chatTextarea.style.height = 'auto';
  sendBtn.disabled = true;

  // Detect language from text
  const detectedLang = detectLang(text);

  // Show typing
  state.isTyping = true;
  renderTypingIndicator();

  const aiMode = localStorage.getItem('drishti_ai_mode') || 'mock';
  const apiKey = localStorage.getItem('drishti_gemini_api_key') || '';

  if (aiMode === 'gemini' && apiKey) {
    callGeminiLiveApi(text, apiKey);
  } else {
    // Local Deterministic Intelligence Engine
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      removeTypingIndicator();
      state.isTyping = false;

      const mockResp = matchMockResponse(text);
      renderDrishtiMessage(mockResp, text);

      if (mockResp?.sources?.length) {
        addToContext(mockResp.sources);
      }
    }, delay);
  }
}

function addToContext(sources) {
  sources.forEach(src => {
    if (!state.activeCases.includes(src)) {
      state.activeCases.push(src);
    }
  });
  updateContextSidebar();
}

/* ─── CONTEXT SIDEBAR ────────────────────────────────────────── */
function updateContextSidebar() {
  const caseList = document.getElementById('ctx-case-list');
  if (!caseList) return;

  const CASE_META = {
    'FIR/2291/2026': { offence: 'Burglary · BNS §305', station: 'Jayanagar PS', status: 'Active', badge: 'badge-active' },
    'FIR/0114/2025': { offence: 'Chain Snatching', station: 'Yelahanka PS', status: 'Active', badge: 'badge-active' },
    'FIR/0087/2026': { offence: 'Robbery', station: 'KR Puram PS', status: 'Chargesheeted', badge: 'badge-closed' },
    'FIR/1042/2026': { offence: 'Theft', station: 'Cubbon Park PS', status: 'Active', badge: 'badge-active' },
  };

  caseList.innerHTML = state.activeCases.map(id => {
    const meta = CASE_META[id] || { offence: 'Unknown', station: '—', status: 'Active', badge: 'badge-active' };
    return `
      <div class="ctx-card">
        <div class="ctx-card-id">${id}</div>
        <div class="ctx-card-row"><span>${meta.offence}</span></div>
        <div class="ctx-card-row">
          <span class="text-muted">${meta.station}</span>
          <span class="badge ${meta.badge} no-dot" style="font-size:9px">${meta.status}</span>
        </div>
      </div>
    `;
  }).join('');
}

function buildContextSidebar() {
  const entityList = document.getElementById('ctx-entity-list');
  if (!entityList) return;

  entityList.innerHTML = state.activeEntities.map(e => `
    <div class="entity-item">
      <div class="entity-icon" style="background:${e.bg}">${e.icon}</div>
      <div>
        <div class="entity-label">${e.label}</div>
        <div class="entity-sub">${e.sub}</div>
      </div>
    </div>
  `).join('');

  updateContextSidebar();
}

/* ─── SUGGESTED PROMPTS ──────────────────────────────────────── */
function buildSuggestedPrompts() {
  const lang    = state.currentLang;
  const prompts = SUGGESTED_PROMPTS[lang] || SUGGESTED_PROMPTS.en;
  suggestedPromptsEl.innerHTML = prompts.map(p => `
    <button class="suggest-chip" onclick="window.ChatEngine.sendFromChip('${p.replace(/'/g,"\\'")}')">
      ${p}
    </button>
  `).join('');
}

/* ─── VOICE INPUT ────────────────────────────────────────────── */
function initVoice() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    voiceBtn.setAttribute('data-tooltip', 'Voice not supported in this browser');
    voiceBtn.disabled = true;
    return;
  }

  state.recognition = new SpeechRec();
  state.recognition.continuous    = false;
  state.recognition.interimResults = true;
  state.recognition.lang = state.currentLang === 'kn' ? 'kn-IN'
                         : state.currentLang === 'hi' ? 'hi-IN' : 'en-IN';

  state.recognition.onstart = () => {
    state.isRecording = true;
    voiceBtn.classList.add('recording');
    inputRow.classList.add('recording');
    voiceOverlay.classList.add('show');
  };

  state.recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    chatTextarea.value = transcript;
    const liveEl = document.getElementById('voice-transcript-live');
    if (liveEl) liveEl.textContent = transcript;
    sendBtn.disabled = transcript.trim().length === 0;
  };

  state.recognition.onend = () => {
    state.isRecording = false;
    voiceBtn.classList.remove('recording');
    inputRow.classList.remove('recording');
    voiceOverlay.classList.remove('show');

    const text = chatTextarea.value.trim();
    if (text) sendMessage(text);
  };

  state.recognition.onerror = (e) => {
    state.isRecording = false;
    voiceBtn.classList.remove('recording');
    inputRow.classList.remove('recording');
    voiceOverlay.classList.remove('show');
    const { Toast } = window.Drishti;
    if (e.error !== 'no-speech') Toast.warn('Voice input error: ' + e.error);
  };

  voiceBtn.addEventListener('click', () => {
    if (state.isRecording) {
      state.recognition.stop();
    } else {
      state.recognition.lang = state.currentLang === 'kn' ? 'kn-IN'
                              : state.currentLang === 'hi' ? 'hi-IN' : 'en-IN';
      state.recognition.start();
    }
  });
}

/* ─── UTILS ──────────────────────────────────────────────────── */
function scrollToBottom() {
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.copyToClipboard = function(btn) {
  const bubble = btn.closest('.msg-body').querySelector('.bubble');
  navigator.clipboard.writeText(bubble.textContent).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
};

window.exportThisMsg = function() {
  window.Drishti.Toast.info('Opening PDF export…');
  setTimeout(() => window.location.href = 'export.html', 500);
};

/* ─── LANGUAGE SWITCH ────────────────────────────────────────── */
function switchLang(lang) {
  state.currentLang = lang;
  window.Drishti.Session.update({ lang });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  buildSuggestedPrompts();
  chatTextarea.placeholder = {
    en: 'Ask in English, ಕನ್ನಡ, or हिंदी… or use voice 🎙️',
    kn: 'ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ಅಥವಾ ಹಿಂದಿಯಲ್ಲಿ ಕೇಳಿ…',
    hi: 'अंग्रेजी, ಕನ್ನಡ, या हिंदी में पूछें…',
  }[lang] || 'Ask Drishti…';
  if (state.recognition) {
    state.recognition.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  }
}

/* ─── MAIN INIT ──────────────────────────────────────────────── */
function init() {
  const { Session, RBAC, AuditLog } = window.Drishti;
  if (!RBAC.requireLogin()) return;

  const session = Session.load();
  state.currentLang = session?.lang || 'en';

  // DOM refs
  messagesArea      = document.getElementById('messages-area');
  chatTextarea      = document.getElementById('chat-textarea');
  sendBtn           = document.getElementById('send-btn');
  voiceBtn          = document.getElementById('voice-btn');
  inputRow          = document.getElementById('input-row');
  voiceOverlay      = document.getElementById('voice-overlay');
  suggestedPromptsEl= document.getElementById('suggested-prompts');
  contextSidebar    = document.getElementById('context-sidebar');

  // Welcome screen
  renderWelcomeScreen();

  // Suggested prompts
  buildSuggestedPrompts();

  // Context sidebar
  buildContextSidebar();

  // Textarea auto-resize + send enable
  chatTextarea.addEventListener('input', () => {
    chatTextarea.style.height = 'auto';
    chatTextarea.style.height = Math.min(chatTextarea.scrollHeight, 160) + 'px';
    sendBtn.disabled = chatTextarea.value.trim().length === 0;
  });

  // Send on Enter (Shift+Enter = newline)
  chatTextarea.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) sendMessage(chatTextarea.value);
    }
  });

  sendBtn.addEventListener('click', () => {
    if (!sendBtn.disabled) sendMessage(chatTextarea.value);
  });

  // Voice
  initVoice();

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });

  // Active lang
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === state.currentLang));

  // Context sidebar toggle
  const ctxToggleBtn = document.getElementById('ctx-toggle-btn');
  if (ctxToggleBtn) {
    ctxToggleBtn.addEventListener('click', () => {
      state.contextOpen = !state.contextOpen;
      contextSidebar.classList.toggle('closed', !state.contextOpen);
      ctxToggleBtn.textContent = state.contextOpen ? '⊡' : '⊞';
    });
  }

  // Clear chat
  document.getElementById('clear-chat-btn')?.addEventListener('click', () => {
    messagesArea.innerHTML = '';
    state.activeCases = [];
    renderWelcomeScreen();
    updateContextSidebar();
    window.Drishti.Toast.info('Chat cleared');
  });

  // Audit log
  AuditLog.log({ type: 'PAGE_VIEW', detail: 'chat.html' });

  // User topbar
  const nameEl = document.getElementById('chat-user-name');
  const roleEl = document.getElementById('chat-role-badge');
  if (nameEl) nameEl.textContent = session?.userName || 'Officer';
  if (roleEl) {
    const roleData = window.Drishti.ROLES[session?.role] || {};
    roleEl.textContent = roleData.label || session?.role;
    roleEl.className = `badge ${roleData.badge}`;
  }
  // AI Mode Modal & Button binding
  const aiBtn = document.getElementById('ai-mode-btn');
  const aiLabel = document.getElementById('ai-mode-label');
  const aiModal = document.getElementById('ai-settings-modal');
  const savedMode = localStorage.getItem('drishti_ai_mode') || 'mock';

  if (aiLabel) {
    aiLabel.textContent = savedMode === 'gemini' ? '⚡ Gemini Live AI' : '🤖 Local AI Engine';
  }

  if (aiBtn && aiModal) {
    aiBtn.addEventListener('click', () => {
      const mode = localStorage.getItem('drishti_ai_mode') || 'mock';
      const key  = localStorage.getItem('drishti_gemini_api_key') || '';
      document.getElementById('mode-' + mode + '-radio').checked = true;
      const keyBox = document.getElementById('gemini-key-box');
      if (keyBox) keyBox.style.display = mode === 'gemini' ? 'block' : 'none';
      const keyInput = document.getElementById('gemini-key-input');
      if (keyInput) keyInput.value = key;
      aiModal.style.display = 'flex';
    });

    document.querySelectorAll('input[name="engine_mode"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const keyBox = document.getElementById('gemini-key-box');
        if (keyBox) keyBox.style.display = radio.value === 'gemini' ? 'block' : 'none';
      });
    });

    document.getElementById('close-ai-modal')?.addEventListener('click', () => { aiModal.style.display = 'none'; });
    document.getElementById('cancel-ai-modal')?.addEventListener('click', () => { aiModal.style.display = 'none'; });

    document.getElementById('save-ai-mode')?.addEventListener('click', () => {
      const selected = document.querySelector('input[name="engine_mode"]:checked')?.value || 'mock';
      const keyVal   = document.getElementById('gemini-key-input')?.value?.trim() || '';
      localStorage.setItem('drishti_ai_mode', selected);
      localStorage.setItem('drishti_gemini_api_key', keyVal);
      if (aiLabel) aiLabel.textContent = selected === 'gemini' ? '⚡ Gemini Live AI' : '🤖 Local AI Engine';
      aiModal.style.display = 'none';
      window.Drishti.Toast.success(`AI Engine set to ${selected === 'gemini' ? 'Live Gemini API' : 'Local Deterministic Engine'}`);
    });
  }
}

/* ─── GEMINI LIVE API INTEGRATION ─────────────────────────────── */
async function callGeminiLiveApi(text, apiKey) {
  const session = window.Drishti.Session.load();
  const lang    = session?.lang || 'en';

  const systemPrompt = `You are Drishti, an official SCRB Crime Intelligence Assistant for the Karnataka State Crime Records Bureau.
Officer Name: ${session?.userName || 'Asha Patel'} (${session?.role || 'inspector'}).
Jurisdiction: Bengaluru Urban.

LOCAL RAG KNOWLEDGE BASE:
- FIR/2291/2026: Filed 03 Jul 2026 at Jayanagar PS. Offence: Residential Burglary (BNS §305). Primary Accused: Rajan B. (Wilson Garden, 2 prior FIRs). Co-accused: Suresh K. Vehicle: Honda Activa KA-01-MH-4432. Survivor identity is strictly confidential (DPDPA/POCSO suppressed).
- FIR/0114/2025: Yelahanka PS. Offence: Chain Snatching.
- Hotspot Data: Jayanagar 4th Block & JP Nagar 6th Phase are high-risk evening zones (6-9 PM).

INSTRUCTIONS:
1. Provide concise, professional law enforcement decision-support answers.
2. Reply in ${lang === 'kn' ? 'Kannada (ಕನ್ನಡ)' : lang === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
3. Distinguish clearly between FACT (verified record) and INFERENCE (analytic link).`;

  try {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\nOfficer Query: ' + text }] }
        ]
      })
    });

    if (!resp.ok) throw new Error(`API error ${resp.status}`);
    const data = await resp.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response returned.';

    removeTypingIndicator();
    state.isTyping = false;

    renderDrishtiMessage({
      answer: replyText,
      badge: 'fact',
      badgeText: 'Fact + Inference · Gemini Live',
      confidence: 89,
      sources: ['FIR/2291/2026', 'FIR/0114/2025'],
      toolCalls: [{
        name: 'search_records',
        icon: '🔍',
        args: `query="${text.substring(0, 24)}"`,
        result: 'Retrieved live SCRB context via Gemini 2.5 Flash'
      }]
    }, text);

  } catch (err) {
    removeTypingIndicator();
    state.isTyping = false;
    window.Drishti.Toast.error('Gemini API call failed, falling back to Local Engine');
    const mockResp = matchMockResponse(text);
    renderDrishtiMessage(mockResp, text);
  }
}

/* ─── PUBLIC API ─────────────────────────────────────────────── */
window.ChatEngine = {
  sendWelcomePrompt(key, displayText) {
    const ws = document.getElementById('welcome-screen');
    if (ws) ws.remove();
    chatTextarea.value = displayText;
    sendMessage(displayText);
  },
  sendFromChip(text) {
    chatTextarea.value = text;
    sendMessage(text);
  },
};

// Init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
