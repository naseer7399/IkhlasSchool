/* ===================================================================
   Ikhlas School Manager — application logic
   Pure vanilla JS. Data persists in the browser via localStorage.
   =================================================================== */

const STORAGE_KEY = 'ikhlas_school_db_v1';
const SESSION_KEY = 'ikhlas_school_session_v1';

/* ---------------------------------------------------------------
   Icons — small inline SVG set, stroke style, no external deps
   --------------------------------------------------------------- */
const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  students: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5"/></svg>',
  fees: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h13l3 3v13H4z"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>',
  payments: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 6v12M18 6v12" opacity=".5"/></svg>',
  accounts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12h6M9 16h6M9 8h3"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 17.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.65 13a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 6.6a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.04-1.56V1a2 2 0 1 1 4 0v.09c.02.68.42 1.3 1.04 1.56.63.26 1.36.13 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.47.5-.6 1.24-.34 1.87v.09c.26.62.88 1.02 1.56 1.04H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1.05z" opacity="0"/><path d="M12 5v-2M12 21v-2M5 12H3M21 12h-2M6.3 6.3 5 5M19 19l-1.3-1.3M6.3 17.7 5 19M19 5l-1.3 1.3"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1.5"/><path d="M6 17v4h12v-4"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5Z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5"/></svg>',
  empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M3 12h18M3 17h11"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>'
};

/* ---------------------------------------------------------------
   Seed data — reflects the school's example records
   --------------------------------------------------------------- */
function seedData(){
  return {
    school: {
      name: 'Ikhlas School',
      address: 'Tiruvuru Rd, beside Bharat Petrol Bunk, Nuzividu, Andhra Pradesh 521201',
      phone: '09346 695277',
      mgmtPassword: 'admin123',
      feePaymentsPassword: 'fees123',
      dataPassword: 'reset123',
      logo: ''
    },
    students: [
      { id:'101', name:'Aarav Kumar',  dob:'2012-05-14', gender:'Male',   class:'9',  section:'A', fatherName:'Ramesh Kumar', fatherAadhar:'2345 6789 0101', motherName:'Sunita Kumar', motherAadhar:'2345 6789 0102', studentAadhar:'2345 6789 0103', phone:'9876543210', address:'Vijayawada', admissionDate:'2026-06-01', status:'Active' },
      { id:'102', name:'Ananya Rao',   dob:'2013-02-20', gender:'Female', class:'8',  section:'B', fatherName:'Suresh Rao',   fatherAadhar:'2345 6789 0201', motherName:'Lakshmi Rao', motherAadhar:'2345 6789 0202', studentAadhar:'2345 6789 0203', phone:'9876543211', address:'Hyderabad',  admissionDate:'2026-06-01', status:'Active' },
      { id:'103', name:'Rahul Sharma', dob:'2011-11-02', gender:'Male',   class:'10', section:'A', fatherName:'Vinod Sharma', fatherAadhar:'2345 6789 0301', motherName:'Radha Sharma', motherAadhar:'2345 6789 0302', studentAadhar:'2345 6789 0303', phone:'9876543212', address:'Guntur',     admissionDate:'2026-06-01', status:'Active' },
      { id:'104', name:'Sneha Reddy',  dob:'2012-08-09', gender:'Female', class:'9',  section:'B', fatherName:'Kiran Reddy',  fatherAadhar:'2345 6789 0401', motherName:'Padma Reddy', motherAadhar:'2345 6789 0402', studentAadhar:'2345 6789 0403', phone:'9876543213', address:'Vijayawada', admissionDate:'2026-06-01', status:'Active' },
      { id:'105', name:'Arjun Patel',  dob:'2013-01-17', gender:'Male',   class:'8',  section:'A', fatherName:'Mahesh Patel', fatherAadhar:'2345 6789 0501', motherName:'Geeta Patel', motherAadhar:'2345 6789 0502', studentAadhar:'2345 6789 0503', phone:'9876543214', address:'Chennai',    admissionDate:'2026-06-01', status:'Active' },
      { id:'106', name:'Meera Iyer',   dob:'2012-04-25', gender:'Female', class:'9',  section:'A', fatherName:'Ganesh Iyer',  fatherAadhar:'2345 6789 0601', motherName:'Kavitha Iyer', motherAadhar:'2345 6789 0602', studentAadhar:'2345 6789 0603', phone:'9876543215', address:'Vijayawada', admissionDate:'2026-06-05', status:'Active' }
    ],
    fees: [
      { id:'F001', studentId:'101', year:'2026-27', type:'Tuition',   amount:25000, discount:0,    discountReason:'', dueDate:'2026-06-30' },
      { id:'F002', studentId:'102', year:'2026-27', type:'Tuition',   amount:25000, discount:0,    discountReason:'', dueDate:'2026-06-30' },
      { id:'F003', studentId:'103', year:'2026-27', type:'Tuition',   amount:28000, discount:0,    discountReason:'', dueDate:'2026-06-30' },
      { id:'F004', studentId:'104', year:'2026-27', type:'Transport', amount:12000, discount:0,    discountReason:'', dueDate:'2026-07-15' },
      { id:'F005', studentId:'105', year:'2026-27', type:'Tuition',   amount:25000, discount:0,    discountReason:'', dueDate:'2026-06-30' },
      { id:'F006', studentId:'106', year:'2026-27', type:'Tuition',   amount:25000, discount:5000, discountReason:'Merit scholarship', dueDate:'2026-06-30' }
    ],
    payments: [
      { id:'P001', feeId:'F001', studentId:'101', date:'2026-06-15', amount:25000, method:'Cash',          receipt:'R1001' },
      { id:'P002', feeId:'F002', studentId:'102', date:'2026-06-18', amount:25000, method:'UPI',           receipt:'R1002' },
      { id:'P003', feeId:'F003', studentId:'103', date:'2026-06-20', amount:15000, method:'Bank Transfer', receipt:'R1003' },
      { id:'P004', feeId:'F004', studentId:'104', date:'2026-06-25', amount:12000, method:'UPI',           receipt:'R1004' },
      { id:'P005', feeId:'F005', studentId:'105', date:'2026-06-28', amount:10000, method:'Cash',          receipt:'R1005' },
      { id:'P006', feeId:'F006', studentId:'106', date:'2026-07-02', amount:10000, method:'Cash',          receipt:'R1006' }
    ],
    expenses: [
      { id:'E001', date:'2026-06-22', category:'Electricity',  description:'June electricity bill',  amount:8500,  paidTo:'AP Electricity' },
      { id:'E002', date:'2026-06-25', category:'Salary',       description:'Teacher salaries',       amount:75000, paidTo:'Staff' },
      { id:'E003', date:'2026-06-27', category:'Stationery',   description:'Notebooks and pens',     amount:12000, paidTo:'ABC Stationers' },
      { id:'E004', date:'2026-06-29', category:'Maintenance',  description:'Classroom repairs',      amount:6500,  paidTo:'Kumar Services' }
    ]
  };
}

let DB = null;
let SESSION = { role: null, name: '' };
let VIEW = { tab: 'dashboard', params: {} };

/* ---------------------------------------------------------------
   Persistence
   --------------------------------------------------------------- */
function backfillDB(data){
  if(data.school && typeof data.school.logo === 'undefined') data.school.logo = '';
  if(data.school && typeof data.school.feePaymentsPassword === 'undefined') data.school.feePaymentsPassword = 'fees123';
  if(data.school && typeof data.school.dataPassword === 'undefined') data.school.dataPassword = 'reset123';
  if(Array.isArray(data.students)){
    data.students.forEach(s => {
      if(typeof s.fatherName === 'undefined') s.fatherName = s.parent || '';
      if(typeof s.fatherAadhar === 'undefined') s.fatherAadhar = '';
      if(typeof s.motherName === 'undefined') s.motherName = '';
      if(typeof s.motherAadhar === 'undefined') s.motherAadhar = '';
      if(typeof s.studentAadhar === 'undefined') s.studentAadhar = '';
    });
  }
  return data;
}
function loadDB(){
  let data = null;
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) data = JSON.parse(raw);
  }catch(e){ console.error('Could not read saved data, starting fresh.', e); }
  if(!data){
    data = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  return backfillDB(data);
}
function saveDB(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
  if(cloudDocRef){
    cloudDocRef.set({ payload: JSON.stringify(DB), updatedAt: Date.now(), updatedBy: (cloudUser && cloudUser.email) || 'unknown' })
      .catch(err => { console.error('Cloud sync failed', err); toast('Saved locally, but could not sync to the cloud — check your connection.', true); });
  }
}
function loadSession(){
  try{
    const raw = sessionStorage.getItem(SESSION_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return { role: null, name: '' };
}
function saveSession(){
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(SESSION));
}

/* ---------------------------------------------------------------
   Optional cloud sync (Firebase) — see firebase-config.js.
   When not configured, every function here is a harmless no-op and
   the app behaves exactly as it did with localStorage only.
   --------------------------------------------------------------- */
let cloudDocRef = null;
let cloudUser = null;

function cloudConfigured(){
  return typeof FIREBASE_ENABLED !== 'undefined' && FIREBASE_ENABLED
    && typeof firebase !== 'undefined'
    && typeof FIREBASE_CONFIG !== 'undefined' && FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey;
}
function initCloud(){
  if(!cloudConfigured()) return false;
  try{ firebase.initializeApp(FIREBASE_CONFIG); }
  catch(e){ console.error('Firebase init failed', e); return false; }
  return true;
}
function isUserBusy(){
  const modalOpen = document.getElementById('modalRoot').innerHTML.trim() !== '';
  const active = document.activeElement;
  const typing = active && ['INPUT','TEXTAREA','SELECT'].includes(active.tagName);
  return modalOpen || typing;
}
function startCloudSync(){
  cloudDocRef = firebase.firestore().collection('ikhlas_school').doc('main');
  return cloudDocRef.get().then(snap => {
    if(snap.exists && snap.data() && snap.data().payload){
      try{ DB = backfillDB(JSON.parse(snap.data().payload)); }
      catch(e){ console.error('Could not read cloud data', e); }
    }else{
      return cloudDocRef.set({ payload: JSON.stringify(DB), updatedAt: Date.now(), updatedBy: (cloudUser && cloudUser.email) || 'unknown' });
    }
  }).then(() => {
    cloudDocRef.onSnapshot(snap => {
      if(!snap.exists) return;
      const data = snap.data();
      if(!data || !data.payload) return;
      let parsed;
      try{ parsed = JSON.parse(data.payload); }catch(e){ return; }
      DB = backfillDB(parsed);
      const appVisible = !document.getElementById('app').classList.contains('hidden');
      if(appVisible && SESSION.role && !isUserBusy()){
        renderShell();
        navigate(VIEW.tab, VIEW.params);
      }
    }, err => console.error('Cloud sync listener error', err));
  }).catch(err => {
    console.error('Cloud sync init failed', err);
    toast('Could not connect to cloud sync — using local data for now.', true);
  });
}
function wireCloudSignIn(){
  document.getElementById('cloudSignInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('cloudEmail').value.trim();
    const pw = document.getElementById('cloudPassword').value;
    const errEl = document.getElementById('cloudSignInError');
    errEl.textContent = '';
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(err => {
      errEl.textContent = (err && err.message) ? err.message : 'Sign-in failed. Check your email and password.';
    });
  });
}
function signOutOfCloud(){
  if(typeof firebase === 'undefined') return;
  firebase.auth().signOut();
}

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */
function money(n){
  n = Math.round(Number(n) || 0);
  return '\u20B9' + n.toLocaleString('en-IN');
}
function fmtDate(d){
  if(!d) return '\u2014';
  const parts = d.split('-');
  if(parts.length !== 3) return d;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
function esc(str){
  return String(str==null ? '' : str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function nextId(prefix, list, pad){
  let max = 0;
  list.forEach(item => {
    const m = String(item.id).match(/(\d+)$/);
    if(m) max = Math.max(max, parseInt(m[1], 10));
  });
  return prefix + String(max + 1).padStart(pad || 3, '0');
}
function studentName(id){
  const s = DB.students.find(x => x.id === id);
  return s ? s.name : '(deleted student)';
}
function studentById(id){ return DB.students.find(x => x.id === id); }
function feeById(id){ return DB.fees.find(x => x.id === id); }

function paymentsForFee(feeId){
  return DB.payments.filter(p => p.feeId === feeId);
}
function computeFee(fee){
  const net = Math.max(0, Number(fee.amount) - Number(fee.discount || 0));
  const paid = paymentsForFee(fee.id).reduce((s,p) => s + Number(p.amount), 0);
  const balance = Math.max(0, net - paid);
  let status = 'Pending';
  if(balance <= 0 && net > 0) status = 'Paid';
  else if(paid > 0) status = 'Partial';
  else if(net === 0) status = 'Paid';
  return { net, paid, balance, status };
}
function feesForStudent(id){ return DB.fees.filter(f => f.studentId === id); }

function initials(name){
  return String(name || '?').trim().split(/\s+/).slice(0,2).map(w => w[0]).join('').toUpperCase();
}

function isValidAadhar(v){
  const digits = String(v || '').replace(/\s/g, '');
  return digits === '' || /^\d{12}$/.test(digits);
}
function formatAadhar(v){
  const digits = String(v || '').replace(/\s/g, '');
  if(digits.length !== 12) return v || '';
  return digits.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
}

function tagForStatus(status){
  const cls = status === 'Paid' ? 'tag-paid' : status === 'Partial' ? 'tag-partial' : 'tag-pending';
  return `<span class="tag ${cls}">${status}</span>`;
}

function toast(msg, danger){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (danger ? ' danger' : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.className = 'toast'; }, 2600);
}

function can(action){
  // management: everything. teacher: student data only (add/edit, no delete).
  // feepayments: view students + record/view payments, no editing or deleting either.
  if(SESSION.role === 'management') return true;
  if(SESSION.role === 'teacher') return ['view-students','edit-students','add-students'].includes(action);
  if(SESSION.role === 'feepayments') return ['view-students','add-payments','view-payments'].includes(action);
  return false;
}

/* ---------------------------------------------------------------
   Boot
   --------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  DB = loadDB();
  SESSION = loadSession();
  applyBranding();

  if(initCloud()){
    wireCloudSignIn();
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        cloudUser = user;
        document.getElementById('cloudSignInScreen').classList.add('hidden');
        startCloudSync().then(() => {
          applyBranding();
          proceedPastLogin();
        });
      }else{
        cloudUser = null;
        cloudDocRef = null;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('app').classList.add('hidden');
        document.getElementById('cloudSignInScreen').classList.remove('hidden');
      }
    });
  }else{
    proceedPastLogin();
  }
});
function proceedPastLogin(){
  if(SESSION.role){ showApp(); } else { showLogin(); }
  wireLogin();
}

/* ---------------------------------------------------------------
   Branding — reflects the school logo/name on the login screen
   and sidebar wherever they appear
   --------------------------------------------------------------- */
function applyBranding(){
  const badge = document.getElementById('loginBadge');
  if(badge) badge.innerHTML = DB.school.logo ? `<img src="${DB.school.logo}" alt="${esc(DB.school.name)} logo">` : 'IS';
  const name = document.getElementById('loginSchoolName');
  if(name) name.textContent = DB.school.name || 'School Manager';
}

/* ---------------------------------------------------------------
   Login
   --------------------------------------------------------------- */
function showLogin(){
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('cloudSignInScreen').classList.add('hidden');
  document.getElementById('app').classList.add('hidden');
}
let pendingLoginRole = null;
let loginWired = false;
const ROLE_LABELS = { management:'Management', teacher:'Teacher', feepayments:'Fee Payments' };

function wireLogin(){
  if(loginWired) return;
  loginWired = true;
  document.getElementById('btnTeacherLogin').addEventListener('click', () => {
    SESSION = { role: 'teacher', name: 'Teacher' };
    saveSession();
    showApp();
  });
  document.getElementById('btnMgmtReveal').addEventListener('click', () => openPasswordPrompt('management'));
  document.getElementById('btnFeePayReveal').addEventListener('click', () => openPasswordPrompt('feepayments'));
  document.getElementById('mgmtLoginBack').addEventListener('click', () => {
    document.getElementById('mgmtPwWrap').classList.remove('show');
    document.getElementById('loginError').textContent = '';
    document.getElementById('mgmtPwInput').value = '';
  });
  document.getElementById('mgmtLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('mgmtPwInput').value;
    const expected = pendingLoginRole === 'feepayments' ? DB.school.feePaymentsPassword : DB.school.mgmtPassword;
    if(pw === expected){
      SESSION = { role: pendingLoginRole, name: ROLE_LABELS[pendingLoginRole] };
      saveSession();
      document.getElementById('loginError').textContent = '';
      document.getElementById('mgmtPwInput').value = '';
      showApp();
    }else{
      document.getElementById('loginError').textContent = 'That password is incorrect. Try again.';
    }
  });
}
function openPasswordPrompt(role){
  pendingLoginRole = role;
  document.getElementById('mgmtPwLabel').textContent = `${ROLE_LABELS[role]} password`;
  document.getElementById('mgmtPwWrap').classList.add('show');
  document.getElementById('mgmtPwInput').focus();
}
function logout(){
  SESSION = { role: null, name: '' };
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('mgmtPwWrap').classList.remove('show');
  VIEW = { tab: 'dashboard', params: {} };
  showLogin();
}

/* ---------------------------------------------------------------
   App shell
   --------------------------------------------------------------- */
const NAV_ITEMS = [
  { id:'dashboard', label:'Dashboard', icon:'dashboard', roles:['management','teacher'] },
  { id:'students',  label:'Students',  icon:'students',  roles:['management','teacher','feepayments'] },
  { id:'fees',      label:'Fees',      icon:'fees',       roles:['management'] },
  { id:'payments',  label:'Payments',  icon:'payments',   roles:['management','feepayments'] },
  { id:'accounts',  label:'Accounts',  icon:'accounts',   roles:['management'] },
  { id:'reports',   label:'Reports',   icon:'reports',    roles:['management','teacher'] },
  { id:'settings',  label:'Settings',  icon:'settings',   roles:['management'] }
];

function showApp(){
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  renderShell();
  const firstTab = NAV_ITEMS.find(i => i.roles.includes(SESSION.role));
  navigate(firstTab ? firstTab.id : 'students');
}

function renderShell(){
  const items = NAV_ITEMS.filter(i => i.roles.includes(SESSION.role));
  document.getElementById('sidebarBrand').innerHTML = `
    <div class="badge-mark">${DB.school.logo ? `<img src="${DB.school.logo}" alt="${esc(DB.school.name)} logo">` : 'IS'}</div>
    <div><strong>${esc(DB.school.name)}</strong><span>Student and fee records</span></div>`;
  document.getElementById('navList').innerHTML = items.map(i => `
    <button class="nav-item" data-tab="${i.id}">${ICONS[i.icon]}<span>${i.label}</span></button>
  `).join('');
  document.getElementById('sidebarFooter').innerHTML = `
    <div class="role-pill"><span class="dot"></span>${ROLE_LABELS[SESSION.role] || 'Guest'} access</div>
    ${cloudDocRef ? `<div class="role-pill" style="background:rgba(255,255,255,0.06);"><span class="dot" style="background:#2F8F5B;"></span>Cloud sync on</div>` : ''}
    <button class="nav-item" id="btnLogout">${ICONS.logout}<span>Log out</span></button>
    <div class="app-copyright">\u00a9 2026 Naseer GitHub, Inc.</div>`;
  document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.tab));
  });
  document.getElementById('btnLogout').addEventListener('click', logout);
}

function navigate(tab, params){
  VIEW = { tab, params: params || {} };
  document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  const renderers = {
    dashboard: renderDashboard,
    students: renderStudents,
    'student-profile': renderStudentProfile,
    fees: renderFees,
    payments: renderPayments,
    accounts: renderAccounts,
    reports: renderReports,
    settings: renderSettings
  };
  (renderers[tab] || renderDashboard)();
}

function setTopbar(title, sub){
  document.getElementById('topbarTitle').textContent = title;
  document.getElementById('topbarSub').textContent = sub || '';
}
function setContent(html){
  document.getElementById('content').innerHTML = html;
}

/* ---------------------------------------------------------------
   Dashboard
   --------------------------------------------------------------- */
function renderDashboard(){
  if(SESSION.role === 'management'){
    setTopbar('Dashboard', 'Overview of students, fees and accounts');
    const feeCalcs = DB.fees.map(f => ({ fee: f, calc: computeFee(f) }));
    const totalBilled = feeCalcs.reduce((s,x) => s + x.calc.net, 0);
    const totalCollected = feeCalcs.reduce((s,x) => s + x.calc.paid, 0);
    const totalPending = feeCalcs.reduce((s,x) => s + x.calc.balance, 0);
    const totalDiscount = DB.fees.reduce((s,f) => s + Number(f.discount||0), 0);
    const totalExpense = DB.expenses.reduce((s,e) => s + Number(e.amount), 0);
    const netBalance = totalCollected - totalExpense;
    const recentPayments = [...DB.payments].sort((a,b) => b.date.localeCompare(a.date)).slice(0,5);
    const attention = feeCalcs.filter(x => x.calc.status !== 'Paid').sort((a,b) => b.calc.balance - a.calc.balance).slice(0,5);

    setContent(`
      <div class="stat-grid">
        <div class="stat-card"><div class="label">Students enrolled</div><div class="value">${DB.students.length}</div><div class="foot">${DB.students.filter(s=>s.status==='Active').length} active</div></div>
        <div class="stat-card accent"><div class="label">Fees billed (2026-27)</div><div class="value">${money(totalBilled)}</div><div class="foot">${money(totalDiscount)} discounted</div></div>
        <div class="stat-card success"><div class="label">Collected</div><div class="value">${money(totalCollected)}</div><div class="foot">${DB.payments.length} payments recorded</div></div>
        <div class="stat-card danger"><div class="label">Pending balance</div><div class="value">${money(totalPending)}</div><div class="foot">${feeCalcs.filter(x=>x.calc.status!=='Paid').length} fee records outstanding</div></div>
      </div>
      <div class="two-col">
        <div class="panel">
          <div class="panel-head"><div><h3>Needs follow-up</h3><div class="sub">Highest outstanding balances</div></div>
            <button class="btn btn-sm" data-nav="reports">${ICONS.reports}View reports</button></div>
          <div class="panel-body pad0">
            ${attention.length ? `<div class="table-wrap"><table><thead><tr><th>Student</th><th>Fee</th><th class="num">Balance</th><th>Status</th></tr></thead><tbody>
              ${attention.map(x => `<tr><td>${esc(studentName(x.fee.studentId))}</td><td>${esc(x.fee.type)}</td><td class="num">${money(x.calc.balance)}</td><td>${tagForStatus(x.calc.status)}</td></tr>`).join('')}
            </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>All fees collected</h3><p>Nothing outstanding right now.</p></div>`}
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><div><h3>Recent payments</h3><div class="sub">Last 5 recorded</div></div>
            <button class="btn btn-sm" data-nav="payments">${ICONS.payments}View payments</button></div>
          <div class="panel-body pad0">
            ${recentPayments.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Student</th><th class="num">Amount</th></tr></thead><tbody>
              ${recentPayments.map(p => `<tr><td>${fmtDate(p.date)}</td><td>${esc(studentName(p.studentId))}</td><td class="num">${money(p.amount)}</td></tr>`).join('')}
            </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>No payments yet</h3></div>`}
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h3>School accounts</h3><div class="sub">Income from fees vs recorded expenses</div></div></div>
        <div class="panel-body">
          <div class="bars">
            <div class="bar-row"><span>Income</span><div class="bar-track"><div class="bar-fill" style="width:${totalCollected? Math.min(100, totalCollected/(totalCollected+totalExpense||1)*100):0}%"></div></div><span>${money(totalCollected)}</span></div>
            <div class="bar-row"><span>Expenses</span><div class="bar-track"><div class="bar-fill accent" style="width:${totalExpense? Math.min(100, totalExpense/(totalCollected+totalExpense||1)*100):0}%"></div></div><span>${money(totalExpense)}</span></div>
          </div>
          <hr class="divider">
          <p class="small-note">Net balance (income \u2212 expenses): <strong style="color:${netBalance>=0?'var(--success)':'var(--danger)'}">${money(netBalance)}</strong></p>
        </div>
      </div>
    `);
  }else{
    setTopbar('Dashboard', 'Overview of enrolled students');
    const byClass = {};
    DB.students.forEach(s => { byClass[s.class] = (byClass[s.class]||0) + 1; });
    const classes = Object.keys(byClass).sort((a,b)=>Number(a)-Number(b));
    const maxCount = Math.max(1, ...Object.values(byClass));
    setContent(`
      <div class="stat-grid">
        <div class="stat-card"><div class="label">Total students</div><div class="value">${DB.students.length}</div></div>
        <div class="stat-card success"><div class="label">Active</div><div class="value">${DB.students.filter(s=>s.status==='Active').length}</div></div>
        <div class="stat-card accent"><div class="label">Classes</div><div class="value">${classes.length}</div></div>
      </div>
      <div class="panel">
        <div class="panel-head"><div><h3>Students by class</h3></div>
          <button class="btn btn-sm" data-nav="students">${ICONS.students}Go to students</button></div>
        <div class="panel-body">
          <div class="bars">
            ${classes.map(c => `<div class="bar-row"><span>Class ${c}</span><div class="bar-track"><div class="bar-fill" style="width:${byClass[c]/maxCount*100}%"></div></div><span>${byClass[c]}</span></div>`).join('')}
          </div>
        </div>
      </div>
      <p class="small-note">Fee and payment records are managed by school management. Use Students to add, update or look up learner details.</p>
    `);
  }
  wireNavShortcuts();
}
function wireNavShortcuts(){
  document.querySelectorAll('[data-nav]').forEach(el => el.addEventListener('click', () => navigate(el.dataset.nav)));
}

/* ---------------------------------------------------------------
   Students
   --------------------------------------------------------------- */
let studentFilter = { q:'', class:'', status:'' };

function renderStudents(){
  setTopbar('Students', 'Add, update and look up student records');
  renderStudentsShell();
}

// Renders the search/filter toolbar once. The input elements are never
// recreated after this, so typing doesn't lose focus or cursor position.
function renderStudentsShell(){
  const classes = [...new Set(DB.students.map(s => s.class))].sort((a,b)=>Number(a)-Number(b));
  const canAdd = can('add-students');
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div class="toolbar">
          <div class="search-input">${ICONS.search}<input type="text" id="studentSearch" placeholder="Search by name or admission no." value="${esc(studentFilter.q)}" style="width:240px"></div>
          <select id="filterClass" style="width:140px"><option value="">All classes</option>${classes.map(c=>`<option ${studentFilter.class===c?'selected':''} value="${c}">Class ${c}</option>`).join('')}</select>
          <select id="filterStatus" style="width:140px"><option value="">All statuses</option><option ${studentFilter.status==='Active'?'selected':''}>Active</option><option ${studentFilter.status==='Inactive'?'selected':''}>Inactive</option></select>
        </div>
        <button class="btn" id="btnPrintStudents">${ICONS.print}Print</button>
        ${canAdd ? `<button class="btn btn-primary" id="btnAddStudent">${ICONS.plus}Add student</button>` : ''}
      </div>
      <div class="panel-body pad0" id="studentsTableArea"></div>
    </div>
  `);
  document.getElementById('studentSearch').addEventListener('input', e => { studentFilter.q = e.target.value; renderStudentsTable(); });
  document.getElementById('filterClass').addEventListener('change', e => { studentFilter.class = e.target.value; renderStudentsTable(); });
  document.getElementById('filterStatus').addEventListener('change', e => { studentFilter.status = e.target.value; renderStudentsTable(); });
  document.getElementById('btnPrintStudents').addEventListener('click', () => printContainer('Student list'));
  const addBtn = document.getElementById('btnAddStudent');
  if(addBtn) addBtn.addEventListener('click', () => openStudentModal());
  renderStudentsTable();
}

// Updates only the results area — safe to call on every keystroke.
function renderStudentsTable(){
  const canEdit = can('edit-students');
  const canDelete = SESSION.role === 'management';
  let list = DB.students.filter(s => {
    const q = studentFilter.q.trim().toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    const matchC = !studentFilter.class || s.class === studentFilter.class;
    const matchS = !studentFilter.status || s.status === studentFilter.status;
    return matchQ && matchC && matchS;
  });
  const area = document.getElementById('studentsTableArea');
  if(!area) return;
  area.innerHTML = list.length ? `<div class="table-wrap"><table>
      <thead><tr><th>Admission No.</th><th>Name</th><th>Class</th><th>Section</th><th>Father's name</th><th>Phone</th><th>Status</th><th></th></tr></thead>
      <tbody>
        ${list.map(s => `<tr>
          <td>${esc(s.id)}</td>
          <td>${esc(s.name)}</td>
          <td>${esc(s.class)}</td>
          <td>${esc(s.section)}</td>
          <td>${esc(s.fatherName)}</td>
          <td>${esc(s.phone)}</td>
          <td><span class="tag ${s.status==='Active'?'tag-active':'tag-inactive'}">${s.status}</span></td>
          <td><div class="row-actions">
            <button class="btn btn-sm btn-ghost" data-view="${s.id}" title="View profile">${ICONS.eye}</button>
            ${canEdit ? `<button class="btn btn-sm btn-ghost" data-edit="${s.id}" title="Edit">${ICONS.edit}</button>` : ''}
            ${canDelete ? `<button class="btn btn-sm btn-ghost" data-del="${s.id}" title="Delete">${ICONS.trash}</button>` : ''}
          </div></td>
        </tr>`).join('')}
      </tbody>
    </table></div>` : `<div class="empty-state">${ICONS.students}<h3>No students match this search</h3><p>Try a different name, admission no., class or status.</p></div>`;
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => navigate('student-profile', { id:b.dataset.view })));
  document.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openStudentModal(b.dataset.edit)));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => confirmDeleteStudent(b.dataset.del)));
}

function openStudentModal(id){
  if(!can('add-students') && !id) return;
  if(!can('edit-students') && id) return;
  const editing = id ? studentById(id) : null;
  const suggestedId = editing ? editing.id : String(Math.max(100, ...DB.students.map(s=>Number(s.id)||100)) + 1);
  openModal({
    title: editing ? `Edit ${editing.name}` : 'Add student',
    body: `
      <div class="field-row">
        <div class="field"><label>Admission No.</label><input type="text" id="f_id" value="${esc(editing?editing.id:suggestedId)}" ${editing?'disabled':''}></div>
        <div class="field"><label>Full name</label><input type="text" id="f_name" value="${esc(editing?editing.name:'')}" placeholder="Aarav Kumar"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Date of birth</label><input type="date" id="f_dob" value="${editing?editing.dob:''}"></div>
        <div class="field"><label>Gender</label><select id="f_gender"><option ${editing&&editing.gender==='Male'?'selected':''}>Male</option><option ${editing&&editing.gender==='Female'?'selected':''}>Female</option><option ${editing&&editing.gender==='Other'?'selected':''}>Other</option></select></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Class</label><input type="text" id="f_class" value="${esc(editing?editing.class:'')}" placeholder="9"></div>
        <div class="field"><label>Section</label><input type="text" id="f_section" value="${esc(editing?editing.section:'')}" placeholder="A"></div>
      </div>
      <div class="field"><label>Student's Aadhaar number</label><input type="text" id="f_studentAadhar" value="${esc(formatAadhar(editing?editing.studentAadhar:''))}" placeholder="1234 5678 9012" maxlength="14"></div>
      <p class="field-error" id="err_studentAadhar" style="display:none;color:var(--danger);margin-top:-10px;margin-bottom:14px;"></p>
      <div class="section-title" style="margin-top:4px;">Father's details</div>
      <div class="field-row">
        <div class="field"><label>Father's name</label><input type="text" id="f_fatherName" value="${esc(editing?editing.fatherName:'')}"></div>
        <div class="field"><label>Father's Aadhaar number</label><input type="text" id="f_fatherAadhar" value="${esc(formatAadhar(editing?editing.fatherAadhar:''))}" placeholder="1234 5678 9012" maxlength="14"></div>
      </div>
      <p class="field-error" id="err_fatherAadhar" style="display:none;color:var(--danger);margin-top:-10px;margin-bottom:14px;"></p>
      <div class="section-title">Mother's details</div>
      <div class="field-row">
        <div class="field"><label>Mother's name</label><input type="text" id="f_motherName" value="${esc(editing?editing.motherName:'')}"></div>
        <div class="field"><label>Mother's Aadhaar number</label><input type="text" id="f_motherAadhar" value="${esc(formatAadhar(editing?editing.motherAadhar:''))}" placeholder="1234 5678 9012" maxlength="14"></div>
      </div>
      <p class="field-error" id="err_motherAadhar" style="display:none;color:var(--danger);margin-top:-10px;margin-bottom:14px;"></p>
      <div class="section-title">Contact</div>
      <div class="field-row">
        <div class="field"><label>Phone number</label><input type="tel" id="f_phone" value="${esc(editing?editing.phone:'')}" placeholder="9876543210"></div>
        <div class="field"><label>Admission date</label><input type="date" id="f_admission" value="${editing?editing.admissionDate:new Date().toISOString().slice(0,10)}"></div>
      </div>
      <div class="field"><label>Address</label><input type="text" id="f_address" value="${esc(editing?editing.address:'')}"></div>
      <div class="field"><label>Status</label><select id="f_status"><option ${editing&&editing.status==='Active'?'selected':''}>Active</option><option ${editing&&editing.status==='Inactive'?'selected':''}>Inactive</option></select></div>
    `,
    confirmLabel: editing ? 'Save changes' : 'Add student',
    onConfirm: () => {
      const id = document.getElementById('f_id').value.trim();
      const name = document.getElementById('f_name').value.trim();
      if(!id || !name){ toast('Enter an admission number and name.', true); return false; }
      if(!editing && DB.students.some(s => s.id === id)){ toast('A student with this admission number already exists.', true); return false; }

      const studentAadhar = document.getElementById('f_studentAadhar').value.trim();
      const fatherAadhar = document.getElementById('f_fatherAadhar').value.trim();
      const motherAadhar = document.getElementById('f_motherAadhar').value.trim();
      let hasError = false;
      const checks = [
        ['err_studentAadhar', studentAadhar], ['err_fatherAadhar', fatherAadhar], ['err_motherAadhar', motherAadhar]
      ];
      checks.forEach(([errId, val]) => {
        const el = document.getElementById(errId);
        if(!isValidAadhar(val)){
          el.style.display = 'block';
          el.textContent = 'Enter a valid 12-digit Aadhaar number, or leave this blank.';
          hasError = true;
        }else{
          el.style.display = 'none';
        }
      });
      if(hasError) return false;

      const rec = {
        id, name,
        dob: document.getElementById('f_dob').value,
        gender: document.getElementById('f_gender').value,
        class: document.getElementById('f_class').value.trim(),
        section: document.getElementById('f_section').value.trim(),
        studentAadhar: formatAadhar(studentAadhar),
        fatherName: document.getElementById('f_fatherName').value.trim(),
        fatherAadhar: formatAadhar(fatherAadhar),
        motherName: document.getElementById('f_motherName').value.trim(),
        motherAadhar: formatAadhar(motherAadhar),
        phone: document.getElementById('f_phone').value.trim(),
        address: document.getElementById('f_address').value.trim(),
        admissionDate: document.getElementById('f_admission').value,
        status: document.getElementById('f_status').value
      };
      if(editing){
        Object.assign(editing, rec);
        toast('Student updated.');
      }else{
        DB.students.push(rec);
        toast('Student added.');
      }
      saveDB();
      if(VIEW.tab === 'student-profile') renderStudentProfile(); else renderStudentsShell();
      return true;
    }
  });
}

function confirmDeleteStudent(id){
  if(SESSION.role !== 'management') return;
  const s = studentById(id);
  if(!s) return;
  const hasFees = DB.fees.some(f => f.studentId === id);
  openModal({
    title: 'Delete student?',
    body: `<div class="modal-note danger">${ICONS.alert}This removes ${esc(s.name)} (${esc(s.id)}) permanently.</div>
      ${hasFees ? `<p class="small-note">This student also has fee and payment records. Those records will remain but will show as belonging to a deleted student.</p>` : ''}`,
    confirmLabel: 'Delete student',
    danger: true,
    onConfirm: () => {
      DB.students = DB.students.filter(x => x.id !== id);
      saveDB();
      toast('Student deleted.');
      navigate('students');
      return true;
    }
  });
}

/* ---------------------------------------------------------------
   Student profile
   --------------------------------------------------------------- */
function renderStudentProfile(){
  const id = VIEW.params.id;
  const s = studentById(id);
  if(!s){ setTopbar('Student not found', ''); setContent(`<div class="empty-state">${ICONS.students}<h3>This student no longer exists</h3><button class="btn btn-primary" data-nav="students">Back to students</button></div>`); wireNavShortcuts(); return; }
  setTopbar(s.name, `Admission No. ${s.id} \u00b7 Class ${s.class}${s.section?('-'+s.section):''}`);

  const fees = feesForStudent(id);
  const totals = fees.reduce((acc,f) => {
    const c = computeFee(f);
    acc.net += c.net; acc.paid += c.paid; acc.balance += c.balance; acc.discount += Number(f.discount||0);
    return acc;
  }, { net:0, paid:0, balance:0, discount:0 });
  const canEdit = can('edit-students');

  setContent(`
    <div class="panel">
      <div class="panel-body">
        <div class="profile-head">
          <div class="profile-avatar">${initials(s.name)}</div>
          <div class="profile-info">
            <h3>${esc(s.name)}</h3>
            <div class="meta">${esc(s.gender)} \u00b7 Born ${fmtDate(s.dob)} \u00b7 Admitted ${fmtDate(s.admissionDate)} \u00b7 <span class="tag ${s.status==='Active'?'tag-active':'tag-inactive'}">${s.status}</span></div>
          </div>
          <div style="margin-left:auto; display:flex; gap:8px;">
            <button class="btn btn-sm" id="btnPrintProfile">${ICONS.print}Print</button>
            ${canEdit ? `<button class="btn btn-sm" id="btnEditProfile">${ICONS.edit}Edit</button>` : ''}
            <button class="btn btn-sm btn-ghost" data-nav="students">${ICONS.students}All students</button>
          </div>
        </div>
        <div class="info-grid">
          <div class="item"><div class="k">Admission No.</div><div class="v">${esc(s.id)}</div></div>
          <div class="item"><div class="k">Student's Aadhaar</div><div class="v">${esc(s.studentAadhar)||'\u2014'}</div></div>
          <div class="item"><div class="k">Phone</div><div class="v">${esc(s.phone)||'\u2014'}</div></div>
          <div class="item"><div class="k">Section</div><div class="v">${esc(s.section)||'\u2014'}</div></div>
          <div class="item"><div class="k">Father's name</div><div class="v">${esc(s.fatherName)||'\u2014'}</div></div>
          <div class="item"><div class="k">Father's Aadhaar</div><div class="v">${esc(s.fatherAadhar)||'\u2014'}</div></div>
          <div class="item"><div class="k">Mother's name</div><div class="v">${esc(s.motherName)||'\u2014'}</div></div>
          <div class="item"><div class="k">Mother's Aadhaar</div><div class="v">${esc(s.motherAadhar)||'\u2014'}</div></div>
          <div class="item" style="grid-column: 1 / -1;"><div class="k">Address</div><div class="v">${esc(s.address)||'\u2014'}</div></div>
        </div>
      </div>
    </div>

    ${SESSION.role === 'management' ? `
    <div class="stat-grid">
      <div class="stat-card"><div class="label">Total billed</div><div class="value">${money(totals.net)}</div></div>
      <div class="stat-card success"><div class="label">Paid</div><div class="value">${money(totals.paid)}</div></div>
      <div class="stat-card danger"><div class="label">Balance</div><div class="value">${money(totals.balance)}</div></div>
      <div class="stat-card accent"><div class="label">Discount given</div><div class="value">${money(totals.discount)}</div></div>
    </div>
    <div class="panel">
      <div class="panel-head"><div><h3>Fee records</h3><div class="sub">Academic year 2026-27</div></div>
        <button class="btn btn-sm btn-primary" id="btnAddFeeForStudent">${ICONS.plus}Add fee</button></div>
      <div class="panel-body pad0">
        ${fees.length ? `<div class="table-wrap"><table>
          <thead><tr><th>Fee ID</th><th>Type</th><th class="num">Amount</th><th class="num">Discount</th><th class="num">Net</th><th class="num">Paid</th><th class="num">Balance</th><th>Status</th></tr></thead>
          <tbody>${fees.map(f => { const c = computeFee(f); return `<tr>
            <td>${esc(f.id)}</td><td>${esc(f.type)}</td><td class="num">${money(f.amount)}</td>
            <td class="num">${f.discount?money(f.discount):'\u2014'}</td><td class="num">${money(c.net)}</td>
            <td class="num">${money(c.paid)}</td><td class="num">${money(c.balance)}</td><td>${tagForStatus(c.status)}</td>
          </tr>`; }).join('')}</tbody>
        </table></div>` : `<div class="empty-state">${ICONS.fees}<h3>No fees recorded yet</h3><p>Add a fee record to start tracking payments for this student.</p></div>`}
      </div>
    </div>
    ` : `<p class="small-note">Fee and payment details are managed by school management.</p>`}
  `);
  const editBtn = document.getElementById('btnEditProfile');
  if(editBtn) editBtn.addEventListener('click', () => openStudentModal(id));
  document.getElementById('btnPrintProfile').addEventListener('click', () => printContainer(`${s.name} \u2014 student profile`));
  wireNavShortcuts();
  if(SESSION.role === 'management'){
    const btn = document.getElementById('btnAddFeeForStudent');
    if(btn) btn.addEventListener('click', () => openFeeModal(null, id));
  }
}

/* ---------------------------------------------------------------
   Fees
   --------------------------------------------------------------- */
let feeFilter = { q:'', status:'' };

function renderFees(){
  setTopbar('Fee structure', 'Set fee amounts, discounts and due dates per student');
  renderFeesShell();
}
function renderFeesShell(){
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div class="toolbar">
          <div class="search-input">${ICONS.search}<input type="text" id="feeSearch" placeholder="Search by student name or admission no." value="${esc(feeFilter.q)}" style="width:260px"></div>
          <select id="feeStatusFilter" style="width:150px"><option value="">All statuses</option><option ${feeFilter.status==='Paid'?'selected':''}>Paid</option><option ${feeFilter.status==='Partial'?'selected':''}>Partial</option><option ${feeFilter.status==='Pending'?'selected':''}>Pending</option></select>
        </div>
        <button class="btn" id="btnPrintFees">${ICONS.print}Print</button>
        <button class="btn btn-primary" id="btnAddFee">${ICONS.plus}Add fee record</button>
      </div>
      <div class="panel-body pad0" id="feesTableArea"></div>
    </div>
  `);
  document.getElementById('feeSearch').addEventListener('input', e => { feeFilter.q = e.target.value; renderFeesTable(); });
  document.getElementById('feeStatusFilter').addEventListener('change', e => { feeFilter.status = e.target.value; renderFeesTable(); });
  document.getElementById('btnAddFee').addEventListener('click', () => openFeeModal());
  document.getElementById('btnPrintFees').addEventListener('click', () => printContainer('Fee structure'));
  renderFeesTable();
}
function renderFeesTable(){
  let list = DB.fees.map(f => ({ fee: f, calc: computeFee(f) })).filter(x => {
    const q = feeFilter.q.trim().toLowerCase();
    const name = studentName(x.fee.studentId).toLowerCase();
    const matchQ = !q || name.includes(q) || x.fee.studentId.toLowerCase().includes(q) || x.fee.id.toLowerCase().includes(q);
    const matchS = !feeFilter.status || x.calc.status === feeFilter.status;
    return matchQ && matchS;
  });
  const area = document.getElementById('feesTableArea');
  if(!area) return;
  area.innerHTML = list.length ? `<div class="table-wrap"><table>
      <thead><tr><th>Fee ID</th><th>Student</th><th>Type</th><th class="num">Amount</th><th class="num">Discount</th><th class="num">Net</th><th class="num">Balance</th><th>Due</th><th>Status</th><th></th></tr></thead>
      <tbody>${list.map(({fee:f, calc:c}) => `<tr>
        <td>${esc(f.id)}</td>
        <td>${esc(studentName(f.studentId))}</td>
        <td>${esc(f.type)}</td>
        <td class="num">${money(f.amount)}</td>
        <td class="num">${f.discount ? money(f.discount) : '\u2014'}</td>
        <td class="num">${money(c.net)}</td>
        <td class="num">${money(c.balance)}</td>
        <td>${fmtDate(f.dueDate)}</td>
        <td>${tagForStatus(c.status)}</td>
        <td><div class="row-actions">
          <button class="btn btn-sm btn-ghost" data-edit="${f.id}" title="Edit">${ICONS.edit}</button>
          <button class="btn btn-sm btn-ghost" data-del="${f.id}" title="Delete">${ICONS.trash}</button>
        </div></td>
      </tr>`).join('')}</tbody>
    </table></div>` : `<div class="empty-state">${ICONS.fees}<h3>No fee records match this search</h3></div>`;
  document.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openFeeModal(b.dataset.edit)));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => confirmDeleteFee(b.dataset.del)));
}

function openFeeModal(id, presetStudentId){
  const editing = id ? feeById(id) : null;
  const presetTypes = ['Tuition','Transport','Hostel','Exam','Previous year outstanding due'];
  const isCustomType = editing && !presetTypes.includes(editing.type);
  openModal({
    title: editing ? `Edit fee ${editing.id}` : 'Add fee record',
    body: `
      <div class="field">
        <label>Student</label>
        ${editing ? `
          <input type="text" value="${esc(studentName(editing.studentId))} (Admission No. ${esc(editing.studentId)})" disabled>
          <input type="hidden" id="f_student" value="${esc(editing.studentId)}">
        ` : `
          <div class="searchable-select">
            <input type="text" id="f_studentInput" placeholder="Search by name or admission no." autocomplete="off">
            <input type="hidden" id="f_student">
            <div class="searchable-select-list" id="f_studentList"></div>
          </div>
        `}
      </div>
      <div class="field-row">
        <div class="field"><label>Academic year</label><input type="text" id="f_year" value="${esc(editing?editing.year:'2026-27')}"></div>
        <div class="field"><label>Fee type</label><select id="f_type">
          <option ${editing&&editing.type==='Tuition'?'selected':''}>Tuition</option>
          <option ${editing&&editing.type==='Transport'?'selected':''}>Transport</option>
          <option ${editing&&editing.type==='Hostel'?'selected':''}>Hostel</option>
          <option ${editing&&editing.type==='Exam'?'selected':''}>Exam</option>
          <option ${editing&&editing.type==='Previous year outstanding due'?'selected':''}>Previous year outstanding due</option>
          <option value="Other" ${isCustomType?'selected':''}>Other</option>
        </select></div>
      </div>
      <div class="field" id="f_typeOtherWrap" style="${isCustomType ? '' : 'display:none;'}">
        <label>Specify fee type</label>
        <input type="text" id="f_typeOther" value="${isCustomType ? esc(editing.type) : ''}" placeholder="e.g. Lab fee, Annual day fee">
      </div>
      <div class="field-row">
        <div class="field"><label>Amount (\u20B9)</label><input type="number" id="f_amount" min="0" value="${editing?editing.amount:''}" placeholder="25000"></div>
        <div class="field"><label>Due date</label><input type="date" id="f_due" value="${editing?editing.dueDate:''}"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Discount (\u20B9) \u2014 for special/scholarship students</label><input type="number" id="f_discount" min="0" value="${editing?editing.discount:0}"></div>
        <div class="field"><label>Discount reason</label><input type="text" id="f_reason" value="${esc(editing?editing.discountReason:'')}" placeholder="Merit scholarship, staff ward, sibling discount"></div>
      </div>
      ${editing ? `<p class="small-note">Net amount, amount paid and balance update automatically from recorded payments.</p>` : ''}
    `,
    confirmLabel: editing ? 'Save changes' : 'Add fee record',
    onConfirm: () => {
      const studentId = document.getElementById('f_student').value;
      const amount = Number(document.getElementById('f_amount').value);
      const discount = Number(document.getElementById('f_discount').value || 0);
      if(!studentId){ toast('Choose a student.', true); return false; }
      if(!amount || amount <= 0){ toast('Enter a fee amount greater than zero.', true); return false; }
      if(discount > amount){ toast('Discount cannot be larger than the fee amount.', true); return false; }
      let feeType = document.getElementById('f_type').value;
      if(feeType === 'Other'){
        const customType = document.getElementById('f_typeOther').value.trim();
        if(!customType){ toast('Enter the fee type.', true); return false; }
        feeType = customType;
      }
      const rec = {
        studentId,
        year: document.getElementById('f_year').value.trim(),
        type: feeType,
        amount, discount,
        discountReason: document.getElementById('f_reason').value.trim(),
        dueDate: document.getElementById('f_due').value
      };
      if(editing){
        Object.assign(editing, rec);
        toast('Fee record updated.');
      }else{
        rec.id = nextId('F', DB.fees, 3);
        DB.fees.push(rec);
        toast('Fee record added.');
      }
      saveDB();
      if(VIEW.tab === 'student-profile') renderStudentProfile(); else renderFeesTable();
      return true;
    }
  });
  const typeSelect = document.getElementById('f_type');
  if(typeSelect){
    typeSelect.addEventListener('change', (e) => {
      document.getElementById('f_typeOtherWrap').style.display = e.target.value === 'Other' ? 'block' : 'none';
    });
  }
  if(!editing){
    const items = DB.students.map(s => ({
      value: s.id,
      label: `${s.name} (Admission No. ${s.id})`,
      sub: `Class ${s.class}${s.section ? '-' + s.section : ''}`,
      searchText: `${s.name} ${s.id}`.toLowerCase()
    }));
    initSearchableSelect('f_studentInput', 'f_studentList', 'f_student', items, { initialValue: presetStudentId });
  }
}

function confirmDeleteFee(id){
  const f = feeById(id);
  if(!f) return;
  const linkedPayments = paymentsForFee(id).length;
  openModal({
    title: 'Delete fee record?',
    body: `<div class="modal-note danger">${ICONS.alert}This removes fee ${esc(f.id)} for ${esc(studentName(f.studentId))}.</div>
      ${linkedPayments ? `<p class="small-note">${linkedPayments} payment(s) are linked to this fee and will also be removed.</p>` : ''}`,
    confirmLabel: 'Delete fee',
    danger: true,
    onConfirm: () => {
      DB.fees = DB.fees.filter(x => x.id !== id);
      DB.payments = DB.payments.filter(p => p.feeId !== id);
      saveDB();
      toast('Fee record deleted.');
      renderFeesTable();
      return true;
    }
  });
}

/* ---------------------------------------------------------------
   Payments
   --------------------------------------------------------------- */
let paymentFilter = { q:'' };

function renderPayments(){
  setTopbar('Fee payments', 'Record payments and print receipts');
  renderPaymentsShell();
}
function renderPaymentsShell(){
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div class="search-input">${ICONS.search}<input type="text" id="paySearch" placeholder="Search by student or receipt no." value="${esc(paymentFilter.q)}" style="width:260px"></div>
        <button class="btn" id="btnPrintPayments">${ICONS.print}Print</button>
        <button class="btn btn-primary" id="btnAddPayment">${ICONS.plus}Record payment</button>
      </div>
      <div class="panel-body pad0" id="paymentsTableArea"></div>
    </div>
  `);
  document.getElementById('paySearch').addEventListener('input', e => { paymentFilter.q = e.target.value; renderPaymentsTable(); });
  document.getElementById('btnAddPayment').addEventListener('click', () => openPaymentModal());
  document.getElementById('btnPrintPayments').addEventListener('click', () => printContainer('Fee payments'));
  renderPaymentsTable();
}
function renderPaymentsTable(){
  const canDelete = SESSION.role === 'management';
  let list = [...DB.payments].sort((a,b) => b.date.localeCompare(a.date)).filter(p => {
    const q = paymentFilter.q.trim().toLowerCase();
    return !q || studentName(p.studentId).toLowerCase().includes(q) || p.receipt.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });
  const area = document.getElementById('paymentsTableArea');
  if(!area) return;
  area.innerHTML = list.length ? `<div class="table-wrap"><table>
      <thead><tr><th>Receipt</th><th>Date</th><th>Student</th><th>Fee</th><th class="num">Amount paid</th><th>Method</th><th></th></tr></thead>
      <tbody>${list.map(p => { const f = feeById(p.feeId); return `<tr>
        <td>${esc(p.receipt)}</td>
        <td>${fmtDate(p.date)}</td>
        <td>${esc(studentName(p.studentId))}</td>
        <td>${f ? esc(f.type) : '\u2014'}</td>
        <td class="num">${money(p.amount)}</td>
        <td>${esc(p.method)}</td>
        <td><div class="row-actions">
          <button class="btn btn-sm btn-ghost" data-receipt="${p.id}" title="Print receipt">${ICONS.print}</button>
          ${canDelete ? `<button class="btn btn-sm btn-ghost" data-del="${p.id}" title="Delete">${ICONS.trash}</button>` : ''}
        </div></td>
      </tr>`; }).join('')}</tbody>
    </table></div>` : `<div class="empty-state">${ICONS.payments}<h3>No payments recorded yet</h3><p>Record a payment against a fee to see it here.</p></div>`;
  document.querySelectorAll('[data-receipt]').forEach(b => b.addEventListener('click', () => printReceipt(b.dataset.receipt)));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => confirmDeletePayment(b.dataset.del)));
}

function openPaymentModal(){
  if(!DB.fees.length){ toast('Add a fee record first.', true); return; }
  openModal({
    title: 'Record a payment',
    body: `
      <div class="field-row">
        <div class="field"><label>Fee type</label><select id="p_feeTypeFilter">
          <option value="">All fee types</option>
          <option>Tuition</option>
          <option>Transport</option>
          <option>Hostel</option>
          <option>Exam</option>
          <option>Previous year outstanding due</option>
          <option value="Other">Other</option>
        </select></div>
        <div class="field" id="p_feeTypeOtherWrap" style="display:none;">
          <label>Specify fee type</label>
          <input type="text" id="p_feeTypeOther" placeholder="e.g. Lab fee, Annual day fee">
        </div>
      </div>
      <div class="field">
        <label>Student</label>
        <div class="searchable-select">
          <input type="text" id="p_feeInput" placeholder="Search by name or admission no." autocomplete="off">
          <input type="hidden" id="p_fee">
          <div class="searchable-select-list" id="p_feeList"></div>
        </div>
      </div>
      <div class="field-row">
        <div class="field"><label>Payment date</label><input type="date" id="p_date" value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="field"><label>Amount paid (\u20B9)</label><input type="number" id="p_amount" min="0"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Payment method</label><select id="p_method"><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Cheque</option><option>Card</option></select></div>
        <div class="field"><label>Receipt no.</label><input type="text" id="p_receipt" value="${'R' + (1000 + DB.payments.length + 1)}"></div>
      </div>
      <p class="field-error" id="p_error" style="display:none;color:var(--danger)"></p>
    `,
    confirmLabel: 'Record payment',
    onConfirm: () => {
      const feeId = document.getElementById('p_fee').value;
      const errEl = document.getElementById('p_error');
      if(!feeId){ errEl.style.display='block'; errEl.textContent = 'Choose a student / fee to pay towards.'; return false; }
      const amount = Number(document.getElementById('p_amount').value);
      const f = feeById(feeId);
      const c = computeFee(f);
      if(!amount || amount <= 0){ errEl.style.display='block'; errEl.textContent = 'Enter an amount greater than zero.'; return false; }
      if(amount > c.balance){ errEl.style.display='block'; errEl.textContent = `Amount exceeds the remaining balance of ${money(c.balance)}.`; return false; }
      const rec = {
        id: nextId('P', DB.payments, 3),
        feeId,
        studentId: f.studentId,
        date: document.getElementById('p_date').value,
        amount,
        method: document.getElementById('p_method').value,
        receipt: document.getElementById('p_receipt').value.trim() || nextId('R', DB.payments, 4)
      };
      DB.payments.push(rec);
      saveDB();
      toast('Payment recorded.');
      if(VIEW.tab === 'student-profile') renderStudentProfile(); else renderPaymentsTable();
      return true;
    }
  });

  const feeItems = [];
  function buildFeeItems(){
    const typeFilter = document.getElementById('p_feeTypeFilter').value;
    const customType = document.getElementById('p_feeTypeOther').value.trim().toLowerCase();
    const filtered = DB.fees.filter(f => {
      if(!typeFilter) return true;
      if(typeFilter === 'Other') return customType ? f.type.toLowerCase().includes(customType) : true;
      return f.type === typeFilter;
    }).map(f => {
      const s = studentById(f.studentId);
      const c = computeFee(f);
      return {
        value: f.id,
        label: `${s ? s.name : studentName(f.studentId)} \u2014 ${f.type}`,
        sub: `Admission No. ${f.studentId} \u00b7 Balance ${money(c.balance)}`,
        searchText: `${s ? s.name : ''} ${f.studentId}`.toLowerCase()
      };
    });
    feeItems.length = 0;
    feeItems.push(...filtered);
  }
  buildFeeItems();
  initSearchableSelect('p_feeInput', 'p_feeList', 'p_fee', feeItems);

  document.getElementById('p_feeTypeFilter').addEventListener('change', (e) => {
    document.getElementById('p_feeTypeOtherWrap').style.display = e.target.value === 'Other' ? 'block' : 'none';
    buildFeeItems();
    document.getElementById('p_feeInput').value = '';
    document.getElementById('p_fee').value = '';
  });
  document.getElementById('p_feeTypeOther').addEventListener('input', buildFeeItems);
}

function confirmDeletePayment(id){
  if(SESSION.role !== 'management') return;
  openModal({
    title: 'Delete payment record?',
    body: `<div class="modal-note danger">${ICONS.alert}This deletes the payment and recalculates the fee balance.</div>`,
    confirmLabel: 'Delete payment',
    danger: true,
    onConfirm: () => {
      DB.payments = DB.payments.filter(p => p.id !== id);
      saveDB();
      toast('Payment deleted.');
      renderPaymentsTable();
      return true;
    }
  });
}

function printReceipt(paymentId){
  const p = DB.payments.find(x => x.id === paymentId);
  if(!p) return;
  const f = feeById(p.feeId);
  const s = studentById(p.studentId);
  const win = window.open('', '_blank', 'width=480,height=680');
  win.document.write(`<!doctype html><html><head><title>Receipt ${esc(p.receipt)}</title>
    <style>
      body{ font-family: Arial, sans-serif; padding: 28px; color:#1C2230; }
      .letterhead{ display:flex; align-items:center; gap:12px; margin-bottom: 16px; }
      .letterhead .badge-mark{ width:44px; height:44px; border-radius:10px; background:#1F3B57; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px; overflow:hidden; flex:none; }
      .letterhead .badge-mark img{ width:100%; height:100%; object-fit:cover; }
      h1{ font-size:18px; margin: 0 0 2px; }
      .addr{ font-size: 12px; color:#5B6472; }
      table{ width:100%; border-collapse: collapse; margin-top: 14px; }
      td{ padding: 7px 0; border-bottom: 1px solid #E4DFD1; font-size: 13px; }
      td.k{ color:#5B6472; }
      td.v{ text-align:right; font-weight:600; }
      .total{ font-size: 16px; margin-top: 14px; display:flex; justify-content:space-between; font-weight:700; padding-top:6px; }
      .signoff{ display:flex; justify-content:space-between; align-items:flex-end; margin-top: 64px; }
      .signoff .box{ text-align:center; width: 44%; }
      .signoff .line{ border-top: 1px solid #1C2230; margin-bottom: 6px; height: 40px; }
      .signoff .label{ font-size: 11.5px; color:#5B6472; }
    </style></head><body>
    <div class="letterhead">
      <div class="badge-mark">${DB.school.logo ? `<img src="${DB.school.logo}">` : 'IS'}</div>
      <div><h1>${esc(DB.school.name)}</h1><div class="addr">${esc(DB.school.address)}<br>Phone: ${esc(DB.school.phone)}</div></div>
    </div>
    <h2 style="font-size:14px;border-top:1px solid #E4DFD1;border-bottom:1px solid #E4DFD1;padding:8px 0;">Fee payment receipt</h2>
    <table>
      <tr><td class="k">Receipt no.</td><td class="v">${esc(p.receipt)}</td></tr>
      <tr><td class="k">Date</td><td class="v">${fmtDate(p.date)}</td></tr>
      <tr><td class="k">Student</td><td class="v">${esc(s ? s.name : studentName(p.studentId))}</td></tr>
      <tr><td class="k">Admission No.</td><td class="v">${esc(p.studentId)}</td></tr>
      <tr><td class="k">Fee type</td><td class="v">${esc(f ? f.type : '\u2014')}</td></tr>
      <tr><td class="k">Payment method</td><td class="v">${esc(p.method)}</td></tr>
    </table>
    <div class="total"><span>Amount paid</span><span>${money(p.amount)}</span></div>
    <div class="signoff">
      <div class="box"><div class="line"></div><div class="label">School stamp</div></div>
      <div class="box"><div class="line"></div><div class="label">Authorized signature</div></div>
    </div>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 250);
}

/* ---------------------------------------------------------------
   Generic page printing — used by Students, Fees, Payments,
   Accounts and Reports. Prints whatever is currently on screen
   inside the given container, with the school letterhead on top.
   --------------------------------------------------------------- */
function printContainer(title, containerId){
  const container = document.getElementById(containerId || 'content');
  if(!container) return;
  const bodyHtml = container.innerHTML;
  const win = window.open('', '_blank', 'width=960,height=720');
  if(!win){ toast('Allow pop-ups for this site to print.', true); return; }
  win.document.write(`<!doctype html><html><head><title>${esc(title)} \u2014 ${esc(DB.school.name)}</title>
    <style>
      *{ box-sizing: border-box; }
      body{ font-family: Arial, Helvetica, sans-serif; color:#1C2230; padding: 28px; }
      .print-header{ display:flex; align-items:center; gap:14px; border-bottom: 2px solid #1F3B57; padding-bottom: 14px; margin-bottom: 6px; }
      .print-header .badge-mark{ width:46px; height:46px; border-radius:10px; background:#1F3B57; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:18px; overflow:hidden; flex:none; }
      .print-header .badge-mark img{ width:100%; height:100%; object-fit:cover; }
      .print-header h1{ font-size:17px; margin:0; }
      .print-header .addr{ font-size:11.5px; color:#5B6472; margin-top:2px; }
      h2.print-title{ font-size:15px; margin: 16px 0 10px; }
      .print-meta{ font-size:11px; color:#5B6472; margin-bottom: 14px; }
      table{ width:100%; border-collapse: collapse; margin-bottom: 18px; font-size: 12px; }
      thead th{ text-align:left; font-size:10.5px; color:#5B6472; padding:6px 8px; border-bottom: 1px solid #CFC8B4; background: #F3F0E7; }
      tbody td{ padding: 6px 8px; border-bottom: 1px solid #E4DFD1; }
      td.num, th.num{ text-align:right; }
      .tag{ display:inline-block; padding: 2px 9px; border-radius: 999px; font-size: 10px; font-weight:700; border: 1px solid #CFC8B4; }
      .stat-grid{ display:flex; gap:12px; flex-wrap:wrap; margin: 12px 0 18px; }
      .stat-card{ border: 1px solid #E4DFD1; border-left: 3px solid #1F3B57; border-radius:8px; padding: 10px 14px; min-width: 150px; }
      .stat-card .label{ font-size:10.5px; color:#5B6472; }
      .stat-card .value{ font-size:17px; font-weight:700; }
      .stat-card .foot{ display:none; }
      .panel{ border:none; margin-bottom: 16px; }
      .panel-head{ border:none; padding:0; display:block; }
      .panel-head h3{ font-size:14px; margin-bottom:2px; }
      .panel-head .sub{ font-size:11px; color:#5B6472; margin-bottom:8px; }
      .panel-body{ padding:0; }
      .profile-head{ display:flex; align-items:center; gap:14px; margin-bottom: 16px; }
      .profile-avatar{ width:44px; height:44px; border-radius:11px; background:#1F3B57; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:16px; flex:none; }
      .profile-info h3{ font-size:16px; margin:0; }
      .profile-info .meta{ font-size:11px; color:#5B6472; margin-top:3px; }
      .info-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px 20px; margin-bottom: 4px; }
      .info-grid .item .k{ font-size:10px; color:#5B6472; margin-bottom:2px; }
      .info-grid .item .v{ font-size:12.5px; font-weight:600; }
      button, select, .toolbar, .search-input, .row-actions, .chip-toggle, input, .btn{ display:none !important; }
    </style></head><body>
    <div class="print-header">
      <div class="badge-mark">${DB.school.logo ? `<img src="${DB.school.logo}">` : 'IS'}</div>
      <div><h1>${esc(DB.school.name)}</h1><div class="addr">${esc(DB.school.address)}${DB.school.phone ? ' \u00b7 ' + esc(DB.school.phone) : ''}</div></div>
    </div>
    <h2 class="print-title">${esc(title)}</h2>
    <div class="print-meta">Printed ${fmtDate(new Date().toISOString().slice(0,10))}${SESSION.role ? ' \u00b7 ' + (ROLE_LABELS[SESSION.role] || SESSION.role) : ''}</div>
    ${bodyHtml}
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 300);
}

/* ---------------------------------------------------------------
   Accounts
   --------------------------------------------------------------- */
function renderAccounts(){
  setTopbar('School accounts', 'Income from fee payments and recorded expenses');
  paintAccounts();
}
function paintAccounts(){
  const income = DB.payments.map(p => ({ date:p.date, category:'Student fees', description: `${feeById(p.feeId)?feeById(p.feeId).type:'Fee'} \u2014 ${studentName(p.studentId)}`, amount:p.amount, type:'Income' }));
  const expense = DB.expenses.map(e => ({ date:e.date, category:e.category, description:e.description, amount:e.amount, type:'Expense', id:e.id }));
  const ledger = [...income, ...expense].sort((a,b) => b.date.localeCompare(a.date));
  const totalIncome = income.reduce((s,x) => s + x.amount, 0);
  const totalExpense = expense.reduce((s,x) => s + x.amount, 0);
  setContent(`
    <div class="stat-grid">
      <div class="stat-card success"><div class="label">Total income</div><div class="value">${money(totalIncome)}</div></div>
      <div class="stat-card danger"><div class="label">Total expenses</div><div class="value">${money(totalExpense)}</div></div>
      <div class="stat-card ${totalIncome-totalExpense>=0?'':'danger'}"><div class="label">Net balance</div><div class="value">${money(totalIncome-totalExpense)}</div></div>
    </div>
    <div class="panel">
      <div class="panel-head"><div><h3>Ledger</h3><div class="sub">Income is added automatically when a payment is recorded</div></div>
        <div class="toolbar">
          <button class="btn" id="btnPrintAccounts">${ICONS.print}Print</button>
          <button class="btn btn-primary" id="btnAddExpense">${ICONS.plus}Add expense</button>
        </div></div>
      <div class="panel-body pad0">
        <div class="table-wrap"><table>
          <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Description</th><th class="num">Amount</th><th></th></tr></thead>
          <tbody>${ledger.map(l => `<tr>
            <td>${fmtDate(l.date)}</td>
            <td><span class="tag ${l.type==='Income'?'tag-income':'tag-expense'}">${l.type}</span></td>
            <td>${esc(l.category)}</td>
            <td>${esc(l.description)}</td>
            <td class="num">${l.type==='Income'?'+':'\u2212'} ${money(l.amount)}</td>
            <td>${l.type==='Expense' ? `<div class="row-actions"><button class="btn btn-sm btn-ghost" data-del="${l.id}" title="Delete">${ICONS.trash}</button></div>` : ''}</td>
          </tr>`).join('')}</tbody>
        </table></div>
      </div>
    </div>
  `);
  document.getElementById('btnAddExpense').addEventListener('click', () => openExpenseModal());
  document.getElementById('btnPrintAccounts').addEventListener('click', () => printContainer('School accounts'));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => confirmDeleteExpense(b.dataset.del)));
}

function openExpenseModal(){
  openModal({
    title: 'Add expense',
    body: `
      <div class="field-row">
        <div class="field"><label>Date</label><input type="date" id="e_date" value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="field"><label>Category</label><select id="e_category"><option>Electricity</option><option>Salary</option><option>Stationery</option><option>Maintenance</option><option>Transport</option><option>Other</option></select></div>
      </div>
      <div class="field"><label>Description</label><input type="text" id="e_desc" placeholder="What was this expense for?"></div>
      <div class="field-row">
        <div class="field"><label>Amount (\u20B9)</label><input type="number" id="e_amount" min="0"></div>
        <div class="field"><label>Paid to</label><input type="text" id="e_paidto" placeholder="Vendor or staff name"></div>
      </div>
    `,
    confirmLabel: 'Add expense',
    onConfirm: () => {
      const amount = Number(document.getElementById('e_amount').value);
      if(!amount || amount <= 0){ toast('Enter an amount greater than zero.', true); return false; }
      DB.expenses.push({
        id: nextId('E', DB.expenses, 3),
        date: document.getElementById('e_date').value,
        category: document.getElementById('e_category').value,
        description: document.getElementById('e_desc').value.trim(),
        amount,
        paidTo: document.getElementById('e_paidto').value.trim()
      });
      saveDB();
      toast('Expense added.');
      paintAccounts();
      return true;
    }
  });
}
function confirmDeleteExpense(id){
  openModal({
    title: 'Delete expense?',
    body: `<div class="modal-note danger">${ICONS.alert}This removes the expense record permanently.</div>`,
    confirmLabel: 'Delete expense',
    danger: true,
    onConfirm: () => {
      DB.expenses = DB.expenses.filter(e => e.id !== id);
      saveDB();
      toast('Expense deleted.');
      paintAccounts();
      return true;
    }
  });
}

/* ---------------------------------------------------------------
   Reports
   --------------------------------------------------------------- */
let reportTab = 'pending';

function renderReports(){
  setTopbar('Reports', 'Search and summarize student, fee and payment records');
  const tabs = SESSION.role === 'management'
    ? [ ['pending','Pending & partial fees'], ['collection','Fee collection'], ['discount','Discounts given'], ['classlist','Class-wise list'] ]
    : [ ['classlist','Class-wise list'] ];
  if(!tabs.some(t => t[0] === reportTab)) reportTab = tabs[0][0];
  setContent(`
    <div class="toolbar" style="justify-content:space-between; margin-bottom:16px;">
      <div class="chip-toggle">
        ${tabs.map(([id,label]) => `<button class="${reportTab===id?'active':''}" data-report="${id}">${label}</button>`).join('')}
      </div>
      <button class="btn" id="btnPrintReport">${ICONS.print}Print</button>
    </div>
    <div id="reportBody"></div>
  `);
  document.querySelectorAll('[data-report]').forEach(b => b.addEventListener('click', () => { reportTab = b.dataset.report; renderReports(); }));
  document.getElementById('btnPrintReport').addEventListener('click', () => {
    const label = (tabs.find(t => t[0] === reportTab) || [null,'Report'])[1];
    printContainer(label, 'reportBody');
  });
  paintReportBody();
}

function paintReportBody(){
  const el = document.getElementById('reportBody');
  if(reportTab === 'pending'){
    const rows = DB.fees.map(f => ({fee:f, calc:computeFee(f)})).filter(x => x.calc.status !== 'Paid').sort((a,b)=>b.calc.balance-a.calc.balance);
    el.innerHTML = `<div class="panel"><div class="panel-body pad0">
      ${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Student</th><th>Class</th><th>Fee</th><th class="num">Net</th><th class="num">Paid</th><th class="num">Balance</th><th>Due</th><th>Status</th></tr></thead><tbody>
        ${rows.map(({fee:f,calc:c}) => { const s = studentById(f.studentId); return `<tr>
          <td>${esc(studentName(f.studentId))}</td><td>${s?esc(s.class)+(s.section?('-'+esc(s.section)):''):'\u2014'}</td>
          <td>${esc(f.type)}</td><td class="num">${money(c.net)}</td><td class="num">${money(c.paid)}</td>
          <td class="num">${money(c.balance)}</td><td>${fmtDate(f.dueDate)}</td><td>${tagForStatus(c.status)}</td>
        </tr>`; }).join('')}
      </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>Nothing pending</h3><p>Every fee record is fully paid.</p></div>`}
    </div></div>`;
  }else if(reportTab === 'collection'){
    const byMethod = {};
    DB.payments.forEach(p => { byMethod[p.method] = (byMethod[p.method]||0) + p.amount; });
    const total = DB.payments.reduce((s,p)=>s+p.amount,0);
    const max = Math.max(1, ...Object.values(byMethod));
    el.innerHTML = `
      <div class="stat-grid"><div class="stat-card success"><div class="label">Total collected</div><div class="value">${money(total)}</div><div class="foot">${DB.payments.length} payments</div></div></div>
      <div class="panel"><div class="panel-head"><h3>Collected by payment method</h3></div><div class="panel-body">
        <div class="bars">${Object.keys(byMethod).map(m => `<div class="bar-row"><span>${esc(m)}</span><div class="bar-track"><div class="bar-fill" style="width:${byMethod[m]/max*100}%"></div></div><span>${money(byMethod[m])}</span></div>`).join('')}</div>
      </div></div>
      <div class="panel"><div class="panel-head"><h3>All payments</h3></div><div class="panel-body pad0">
        <div class="table-wrap"><table><thead><tr><th>Receipt</th><th>Date</th><th>Student</th><th>Method</th><th class="num">Amount</th></tr></thead><tbody>
          ${[...DB.payments].sort((a,b)=>b.date.localeCompare(a.date)).map(p=>`<tr><td>${esc(p.receipt)}</td><td>${fmtDate(p.date)}</td><td>${esc(studentName(p.studentId))}</td><td>${esc(p.method)}</td><td class="num">${money(p.amount)}</td></tr>`).join('')}
        </tbody></table></div>
      </div></div>`;
  }else if(reportTab === 'discount'){
    const rows = DB.fees.filter(f => Number(f.discount) > 0);
    const total = rows.reduce((s,f)=>s+Number(f.discount),0);
    el.innerHTML = `
      <div class="stat-grid"><div class="stat-card accent"><div class="label">Total discount given</div><div class="value">${money(total)}</div><div class="foot">${rows.length} special-case fee record(s)</div></div></div>
      <div class="panel"><div class="panel-body pad0">
        ${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Student</th><th>Fee type</th><th class="num">Original amount</th><th class="num">Discount</th><th>Reason</th></tr></thead><tbody>
          ${rows.map(f => `<tr><td>${esc(studentName(f.studentId))}</td><td>${esc(f.type)}</td><td class="num">${money(f.amount)}</td><td class="num">${money(f.discount)}</td><td>${esc(f.discountReason)||'\u2014'}</td></tr>`).join('')}
        </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>No discounts recorded</h3></div>`}
      </div></div>`;
  }else if(reportTab === 'classlist'){
    const groups = {};
    DB.students.forEach(s => { const k = `Class ${s.class}${s.section?('-'+s.section):''}`; (groups[k] = groups[k]||[]).push(s); });
    const keys = Object.keys(groups).sort();
    el.innerHTML = keys.map(k => `
      <div class="panel"><div class="panel-head"><h3>${esc(k)}</h3><div class="sub">${groups[k].length} student(s)</div></div>
      <div class="panel-body pad0"><div class="table-wrap"><table><thead><tr><th>Admission No.</th><th>Name</th><th>Father's name</th><th>Phone</th><th>Status</th></tr></thead><tbody>
        ${groups[k].map(s => `<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.fatherName)}</td><td>${esc(s.phone)}</td><td><span class="tag ${s.status==='Active'?'tag-active':'tag-inactive'}">${s.status}</span></td></tr>`).join('')}
      </tbody></table></div></div></div>`).join('') || `<div class="empty-state">${ICONS.empty}<h3>No students yet</h3></div>`;
  }
}

/* ---------------------------------------------------------------
   Settings
   --------------------------------------------------------------- */
function renderSettings(){
  setTopbar('Settings', 'School details, password and data backup');
  setContent(`
    <div class="panel">
      <div class="panel-head"><h3>Cloud sync</h3><div class="sub">Whether changes here show up for everyone using this link</div></div>
      <div class="panel-body">
        ${cloudDocRef ? `
          <p class="small-note" style="margin-bottom:12px;">Cloud sync is <strong style="color:var(--success)">on</strong>. Every save is shared with anyone signed in to this school's cloud data${cloudUser && cloudUser.email ? ` \u2014 you're signed in as ${esc(cloudUser.email)}` : ''}.</p>
          <button class="btn btn-danger" id="btnCloudSignOut">${ICONS.logout}Sign out of cloud sync</button>
        ` : `
          <p class="small-note" style="margin-bottom:12px;">Cloud sync is <strong style="color:var(--danger)">off</strong>. Data is stored only in this browser, so changes here won't appear on other computers using the same link. To share data live across every device, a school admin can turn on cloud sync by following the steps in <code>firebase-config.js</code> in the app's files.</p>
        `}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>School details</h3></div>
      <div class="panel-body">
        <div class="field"><label>School name</label><input type="text" id="s_name" value="${esc(DB.school.name)}"></div>
        <div class="field"><label>Address</label><input type="text" id="s_address" value="${esc(DB.school.address)}"></div>
        <div class="field"><label>Phone</label><input type="text" id="s_phone" value="${esc(DB.school.phone)}"></div>
        <button class="btn btn-primary" id="btnSaveSchool">Save details</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>School logo</h3><div class="sub">Shown on the login screen, sidebar and printed pages</div></div>
      <div class="panel-body">
        <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
          <div id="logoPreview" style="width:64px;height:64px;border-radius:12px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:600;font-size:22px;overflow:hidden;flex:none;">
            ${DB.school.logo ? `<img src="${DB.school.logo}" alt="School logo" style="width:100%;height:100%;object-fit:cover;">` : 'IS'}
          </div>
          <div class="toolbar">
            <button class="btn" id="btnLogoTrigger">${ICONS.upload}${DB.school.logo ? 'Replace logo' : 'Upload logo'}</button>
            ${DB.school.logo ? `<button class="btn btn-danger" id="btnLogoRemove">${ICONS.trash}Remove logo</button>` : ''}
            <input type="file" id="logoFile" accept="image/png,image/jpeg,image/svg+xml,image/webp" class="hidden">
          </div>
        </div>
        <p class="field-help" style="margin-top:10px;">PNG, JPG or SVG. A square image (e.g. 200\u00d7200px) looks best. Under 2MB. Stored together with the rest of your data in this browser.</p>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Management password</h3></div>
      <div class="panel-body">
        <div class="field-row">
          <div class="field"><label>Current password</label><input type="password" id="s_current"></div>
          <div class="field"><label>New password</label><input type="password" id="s_new"></div>
        </div>
        <p class="field-error" id="pwError" style="display:none;color:var(--danger);margin-bottom:10px;"></p>
        <button class="btn btn-primary" id="btnChangePw">Change password</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Fee Payments password</h3><div class="sub">Used by the Fee Payments login (students + payments only, view only)</div></div>
      <div class="panel-body">
        <div class="field-row">
          <div class="field"><label>Current management password</label><input type="password" id="fp_current"></div>
          <div class="field"><label>New Fee Payments password</label><input type="password" id="fp_new"></div>
        </div>
        <p class="field-error" id="fpPwError" style="display:none;color:var(--danger);margin-bottom:10px;"></p>
        <button class="btn btn-primary" id="btnChangeFpPw">Change password</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Data password</h3><div class="sub">Required to reset all data \u2014 kept separate from the Management password</div></div>
      <div class="panel-body">
        <div class="field-row">
          <div class="field"><label>Current management password</label><input type="password" id="dp_current"></div>
          <div class="field"><label>New data password</label><input type="password" id="dp_new"></div>
        </div>
        <p class="field-error" id="dpPwError" style="display:none;color:var(--danger);margin-bottom:10px;"></p>
        <button class="btn btn-primary" id="btnChangeDataPw">Change password</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Data backup</h3><div class="sub">Data is stored in this browser. Back it up regularly.</div></div>
      <div class="panel-body">
        <div class="toolbar">
          <button class="btn" id="btnExport">${ICONS.download}Download backup (.json)</button>
          <button class="btn" id="btnImportTrigger">${ICONS.upload}Restore from backup</button>
          <input type="file" id="importFile" accept="application/json" class="hidden">
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Reset data</h3></div>
      <div class="panel-body">
        <p class="small-note" style="margin-bottom:12px;">This clears all students, fees, payments and expenses and restores the original example data. This cannot be undone.</p>
        <button class="btn btn-danger" id="btnReset">${ICONS.trash}Reset to example data</button>
      </div>
    </div>
  `);
  const btnCloudSignOut = document.getElementById('btnCloudSignOut');
  if(btnCloudSignOut) btnCloudSignOut.addEventListener('click', signOutOfCloud);
  document.getElementById('btnSaveSchool').addEventListener('click', () => {
    DB.school.name = document.getElementById('s_name').value.trim() || DB.school.name;
    DB.school.address = document.getElementById('s_address').value.trim();
    DB.school.phone = document.getElementById('s_phone').value.trim();
    saveDB();
    renderShell();
    applyBranding();
    toast('School details saved.');
  });
  document.getElementById('btnLogoTrigger').addEventListener('click', () => document.getElementById('logoFile').click());
  document.getElementById('logoFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if(!file.type.startsWith('image/')){ toast('Please choose an image file.', true); return; }
    if(file.size > 2 * 1024 * 1024){ toast('Please choose an image under 2MB.', true); return; }
    const reader = new FileReader();
    reader.onload = () => {
      DB.school.logo = reader.result;
      saveDB();
      renderShell();
      applyBranding();
      renderSettings();
      toast('Logo uploaded.');
    };
    reader.onerror = () => toast('Could not read that image. Try a different file.', true);
    reader.readAsDataURL(file);
  });
  const btnLogoRemove = document.getElementById('btnLogoRemove');
  if(btnLogoRemove){
    btnLogoRemove.addEventListener('click', () => {
      DB.school.logo = '';
      saveDB();
      renderShell();
      applyBranding();
      renderSettings();
      toast('Logo removed.');
    });
  }
  document.getElementById('btnChangePw').addEventListener('click', () => {
    const cur = document.getElementById('s_current').value;
    const next = document.getElementById('s_new').value;
    const err = document.getElementById('pwError');
    if(cur !== DB.school.mgmtPassword){ err.style.display='block'; err.textContent = 'Current password is incorrect.'; return; }
    if(!next || next.length < 4){ err.style.display='block'; err.textContent = 'New password must be at least 4 characters.'; return; }
    DB.school.mgmtPassword = next;
    saveDB();
    err.style.display='none';
    document.getElementById('s_current').value = '';
    document.getElementById('s_new').value = '';
    toast('Password changed.');
  });
  document.getElementById('btnChangeFpPw').addEventListener('click', () => {
    const cur = document.getElementById('fp_current').value;
    const next = document.getElementById('fp_new').value;
    const err = document.getElementById('fpPwError');
    if(cur !== DB.school.mgmtPassword){ err.style.display='block'; err.textContent = 'Enter the current management password to confirm this change.'; return; }
    if(!next || next.length < 4){ err.style.display='block'; err.textContent = 'New password must be at least 4 characters.'; return; }
    DB.school.feePaymentsPassword = next;
    saveDB();
    err.style.display='none';
    document.getElementById('fp_current').value = '';
    document.getElementById('fp_new').value = '';
    toast('Fee Payments password changed.');
  });
  document.getElementById('btnChangeDataPw').addEventListener('click', () => {
    const cur = document.getElementById('dp_current').value;
    const next = document.getElementById('dp_new').value;
    const err = document.getElementById('dpPwError');
    if(cur !== DB.school.mgmtPassword){ err.style.display='block'; err.textContent = 'Enter the current management password to confirm this change.'; return; }
    if(!next || next.length < 4){ err.style.display='block'; err.textContent = 'New password must be at least 4 characters.'; return; }
    DB.school.dataPassword = next;
    saveDB();
    err.style.display='none';
    document.getElementById('dp_current').value = '';
    document.getElementById('dp_new').value = '';
    toast('Data password changed.');
  });
  document.getElementById('btnExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(DB, null, 2)], { type:'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ikhlas-school-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    toast('Backup downloaded.');
  });
  document.getElementById('btnImportTrigger').addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const data = JSON.parse(reader.result);
        if(!data.students || !data.fees){ throw new Error('missing fields'); }
        DB = backfillDB(data);
        saveDB();
        toast('Backup restored.');
        renderShell();
        applyBranding();
        navigate('dashboard');
      }catch(err){
        toast('That file does not look like a valid backup.', true);
      }
    };
    reader.readAsText(file);
  });
  document.getElementById('btnReset').addEventListener('click', () => {
    openModal({
      title: 'Reset all data?',
      body: `<div class="modal-note danger">${ICONS.alert}All current students, fees, payments and expenses will be replaced with the original example data. This cannot be undone.</div>
        <div class="field"><label>Enter the data password to confirm</label><input type="password" id="resetPwConfirm" autocomplete="current-password"></div>
        <p class="field-error" id="resetPwError" style="display:none;color:var(--danger);"></p>`,
      confirmLabel: 'Reset data',
      danger: true,
      onConfirm: () => {
        const pw = document.getElementById('resetPwConfirm').value;
        const err = document.getElementById('resetPwError');
        if(pw !== DB.school.dataPassword){
          err.style.display = 'block';
          err.textContent = 'That password is incorrect.';
          return false;
        }
        DB = seedData();
        saveDB();
        toast('Data reset.');
        renderShell();
        applyBranding();
        navigate('dashboard');
        return true;
      }
    });
  });
}

/* ---------------------------------------------------------------
   Generic modal
   --------------------------------------------------------------- */
/* ---------------------------------------------------------------
   Searchable select — a text input with a filtered dropdown list,
   used wherever people need to find a student or fee by typing a
   name or admission number instead of scrolling a long <select>.
   items: [{ value, label, sub, searchText }]
   --------------------------------------------------------------- */
function initSearchableSelect(inputId, listId, hiddenId, items, opts){
  opts = opts || {};
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const hidden = document.getElementById(hiddenId);
  if(!input || !list || !hidden) return;

  function renderList(filterText){
    const q = (filterText || '').trim().toLowerCase();
    const filtered = !q ? items : items.filter(it => (it.searchText || (it.label + ' ' + (it.sub||''))).toLowerCase().includes(q));
    list.innerHTML = filtered.length ? filtered.map(it => `
      <div class="searchable-select-option" data-value="${esc(it.value)}">
        <div class="opt-label">${esc(it.label)}</div>
        ${it.sub ? `<div class="opt-sub">${esc(it.sub)}</div>` : ''}
      </div>`).join('') : `<div class="searchable-select-empty">No matches found</div>`;
    list.querySelectorAll('[data-value]').forEach(el => {
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const val = el.dataset.value;
        const item = items.find(it => String(it.value) === String(val));
        hidden.value = val;
        input.value = item ? item.label : '';
        list.classList.remove('open');
        if(opts.onSelect) opts.onSelect(val, item);
      });
    });
  }

  input.addEventListener('focus', () => {
    if(hidden.value){ input.select(); renderList(''); }
    else{ renderList(input.value); }
    list.classList.add('open');
  });
  input.addEventListener('input', () => {
    hidden.value = '';
    renderList(input.value);
    list.classList.add('open');
  });
  input.addEventListener('blur', () => { setTimeout(() => list.classList.remove('open'), 150); });
  input.addEventListener('keydown', (e) => { if(e.key === 'Escape') list.classList.remove('open'); });

  if(opts.initialValue){
    const item = items.find(it => String(it.value) === String(opts.initialValue));
    if(item){ hidden.value = item.value; input.value = item.label; }
  }
}

function openModal({ title, body, confirmLabel, onConfirm, danger }){
  const overlay = document.getElementById('modalRoot');
  overlay.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal">
        <div class="modal-head"><h3>${esc(title)}</h3><button class="modal-close" id="modalCloseBtn" aria-label="Close">${ICONS.x}</button></div>
        <div class="modal-body">${body}</div>
        <div class="modal-foot">
          <button class="btn" id="modalCancelBtn">Cancel</button>
          <button class="btn ${danger?'btn-danger':'btn-primary'}" id="modalConfirmBtn">${esc(confirmLabel)}</button>
        </div>
      </div>
    </div>
  `;
  const close = () => { overlay.innerHTML = ''; };
  document.getElementById('modalCloseBtn').addEventListener('click', close);
  document.getElementById('modalCancelBtn').addEventListener('click', close);
  document.getElementById('modalOverlay').addEventListener('click', (e) => { if(e.target.id === 'modalOverlay') close(); });
  document.getElementById('modalConfirmBtn').addEventListener('click', () => {
    const ok = onConfirm();
    if(ok !== false) close();
  });
}
