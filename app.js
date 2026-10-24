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
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.02 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.33 4.99L2 22l5.2-1.36a9.94 9.94 0 0 0 4.82 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.52 2 12.02 2Zm0 18.2h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.09.81.82-3.01-.2-.31a8.22 8.22 0 0 1-1.26-4.4c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.42 5.83c0 4.55-3.71 8.24-8.26 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.58.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>',
  sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H7l-3 3z"/><path d="M8 9h8M8 12h5"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a2 2 0 0 0 2 2h1l3.5 4.5V6.5L6 11H5a2 2 0 0 0-2 2Z"/><path d="M9.5 6.5 19 3v16l-9.5-3.5"/><path d="M19 9.5a3 3 0 0 1 0 5"/></svg>',
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
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.8h.01"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 12.5 6 8Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><path d="M19 8v6M22 11h-6"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M8 14h5"/></svg>',
  grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/></svg>'
};

/* ---------------------------------------------------------------
   Alerts — internal Management notifications (separate from the
   Notifications tab, which messages parents). Each type below can
   be switched on/off from the Alerts tab. When enabled, an entry is
   logged to DB.alertLog and, if desktop pop-ups are on and the
   browser has granted permission, a device notification is shown.
   --------------------------------------------------------------- */
const ALERT_TYPES = [
  { id:'studentEnrolled',        label:'Student enrolled',        icon:'userPlus', desc:'A new student is added to the records.' },
  { id:'feeBilled',              label:'Fees billed',             icon:'fees',     desc:'A new fee record is created for a student.' },
  { id:'feeCollected',           label:'Fees collected',          icon:'cash',     desc:'A payment is recorded against a student\u2019s fee.' },
  { id:'pendingBalanceBiweekly', label:'Pending balance (bi-weekly)', icon:'clock', desc:'A summary of outstanding balances, sent every two weeks.' },
  { id:'feeDeleted',             label:'Fee record deleted',      icon:'trash',    desc:'A fee record is permanently deleted.' },
  { id:'paymentDeleted',         label:'Payment record deleted',  icon:'trash',    desc:'A payment record is permanently deleted.' },
  { id:'studentDeleted',         label:'Student record deleted',  icon:'trash',    desc:'A student record is permanently deleted.' }
];

function alertTypeMeta(id){ return ALERT_TYPES.find(t => t.id === id); }
function alertsEnabled(typeId){ return !!(DB.alertSettings && DB.alertSettings[typeId] !== false); }

function logAlert(typeId, title, message){
  if(!DB || !alertsEnabled(typeId)) return;
  const entry = {
    id: 'A' + Date.now().toString(36) + Math.random().toString(36).slice(2,6),
    type: typeId,
    title, message,
    ts: Date.now(),
    read: false
  };
  DB.alertLog.unshift(entry);
  if(DB.alertLog.length > 200) DB.alertLog.length = 200;
  saveDB();
  updateAlertBadge();
  showDeviceNotification(title, message);
}

function showDeviceNotification(title, message){
  if(!DB.alertSettings.desktopPopups) return;
  if(typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  const opts = { body: message, icon: 'icon-192.png', badge: 'icon-192.png', tag: 'ikhlas-alert' };
  if('serviceWorker' in navigator){
    navigator.serviceWorker.getRegistration().then(reg => {
      if(reg) reg.showNotification(title, opts);
      else new Notification(title, opts);
    }).catch(() => { try{ new Notification(title, opts); }catch(e){} });
  }else{
    try{ new Notification(title, opts); }catch(e){}
  }
}

function requestAlertPermission(cb){
  if(typeof Notification === 'undefined'){ toast('This browser does not support notification pop-ups.', true); return; }
  Notification.requestPermission().then(perm => { if(cb) cb(perm); });
}

function unreadAlertCount(){
  return DB && Array.isArray(DB.alertLog) ? DB.alertLog.filter(a => !a.read).length : 0;
}
function updateAlertBadge(){
  const el = document.getElementById('alertBadge');
  if(!el) return;
  const n = unreadAlertCount();
  el.textContent = n > 99 ? '99+' : String(n);
  el.style.display = n > 0 ? 'inline-flex' : 'none';
}

function checkBiweeklyDigest(){
  if(SESSION.role !== 'management' || !DB) return;
  if(!alertsEnabled('pendingBalanceBiweekly')) return;
  const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
  const last = DB.alertSettings.lastBiweeklyDigestAt || 0;
  if(Date.now() - last < TWO_WEEKS) return;
  DB.alertSettings.lastBiweeklyDigestAt = Date.now();
  const withBalance = DB.students.filter(s => feesForStudent(s.id).reduce((sum,f) => sum + computeFee(f).balance, 0) > 0);
  const total = withBalance.reduce((sum,s) => sum + feesForStudent(s.id).reduce((a,f) => a + computeFee(f).balance, 0), 0);
  if(withBalance.length){
    logAlert('pendingBalanceBiweekly', 'Pending balance summary',
      `${withBalance.length} student(s) currently have a pending fee balance, totalling ${money(total)}.`);
  }else{
    saveDB();
  }
}

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
      countryCode: '91',
      minAttendance: 75,
      logo: ''
    },
    students: [
      { id:'101', name:'Aarav Kumar',  dob:'2012-05-14', gender:'Male',   class:'9',  section:'A', fatherName:'Ramesh Kumar', fatherAadhar:'2345 6789 0101', motherName:'Sunita Kumar', motherAadhar:'2345 6789 0102', studentAadhar:'2345 6789 0103', phone:'9876543210', address:'Vijayawada', admissionDate:'2026-06-01' },
      { id:'102', name:'Ananya Rao',   dob:'2013-02-20', gender:'Female', class:'8',  section:'B', fatherName:'Suresh Rao',   fatherAadhar:'2345 6789 0201', motherName:'Lakshmi Rao', motherAadhar:'2345 6789 0202', studentAadhar:'2345 6789 0203', phone:'9876543211', address:'Hyderabad',  admissionDate:'2026-06-01' },
      { id:'103', name:'Rahul Sharma', dob:'2011-11-02', gender:'Male',   class:'10', section:'A', fatherName:'Vinod Sharma', fatherAadhar:'2345 6789 0301', motherName:'Radha Sharma', motherAadhar:'2345 6789 0302', studentAadhar:'2345 6789 0303', phone:'9876543212', address:'Guntur',     admissionDate:'2026-06-01' },
      { id:'104', name:'Sneha Reddy',  dob:'2012-08-09', gender:'Female', class:'9',  section:'B', fatherName:'Kiran Reddy',  fatherAadhar:'2345 6789 0401', motherName:'Padma Reddy', motherAadhar:'2345 6789 0402', studentAadhar:'2345 6789 0403', phone:'9876543213', address:'Vijayawada', admissionDate:'2026-06-01' },
      { id:'105', name:'Arjun Patel',  dob:'2013-01-17', gender:'Male',   class:'8',  section:'A', fatherName:'Mahesh Patel', fatherAadhar:'2345 6789 0501', motherName:'Geeta Patel', motherAadhar:'2345 6789 0502', studentAadhar:'2345 6789 0503', phone:'9876543214', address:'Chennai',    admissionDate:'2026-06-01' },
      { id:'106', name:'Meera Iyer',   dob:'2012-04-25', gender:'Female', class:'9',  section:'A', fatherName:'Ganesh Iyer',  fatherAadhar:'2345 6789 0601', motherName:'Kavitha Iyer', motherAadhar:'2345 6789 0602', studentAadhar:'2345 6789 0603', phone:'9876543215', address:'Vijayawada', admissionDate:'2026-06-05' }
    ],
    fees: [
      { id:'F001', studentId:'101', year:'2026-27', type:'Admission Fee',   amount:25000, discount:0,    discountReason:'' },
      { id:'F002', studentId:'102', year:'2026-27', type:'Admission Fee',   amount:25000, discount:0,    discountReason:'' },
      { id:'F003', studentId:'103', year:'2026-27', type:'Admission Fee',   amount:28000, discount:0,    discountReason:'' },
      { id:'F004', studentId:'104', year:'2026-27', type:'School Fee', amount:12000, discount:0,    discountReason:'' },
      { id:'F005', studentId:'105', year:'2026-27', type:'Admission Fee',   amount:25000, discount:0,    discountReason:'' },
      { id:'F006', studentId:'106', year:'2026-27', type:'Admission Fee',   amount:25000, discount:5000, discountReason:'Merit scholarship' }
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
    ],
    attendance: {},
    exams: []
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
  if(data.school && typeof data.school.countryCode === 'undefined') data.school.countryCode = '91';
  if(data.school && typeof data.school.minAttendance === 'undefined') data.school.minAttendance = 75;
  if(!data.attendance || typeof data.attendance !== 'object' || Array.isArray(data.attendance)) data.attendance = {};
  if(!Array.isArray(data.exams)) data.exams = [];
  data.exams.forEach(x => { if(!x.results) x.results = {}; if(!Array.isArray(x.subjects)) x.subjects = []; });
  if(Array.isArray(data.students)){
    data.students.forEach(s => {
      if(typeof s.fatherName === 'undefined') s.fatherName = s.parent || '';
      if(typeof s.fatherAadhar === 'undefined') s.fatherAadhar = '';
      if(typeof s.motherName === 'undefined') s.motherName = '';
      if(typeof s.motherAadhar === 'undefined') s.motherAadhar = '';
      if(typeof s.studentAadhar === 'undefined') s.studentAadhar = '';
    });
  }
  if(!data.alertSettings){
    data.alertSettings = {};
  }
  ALERT_TYPES.forEach(t => {
    if(typeof data.alertSettings[t.id] === 'undefined') data.alertSettings[t.id] = true;
  });
  if(typeof data.alertSettings.desktopPopups === 'undefined') data.alertSettings.desktopPopups = true;
  if(typeof data.alertSettings.lastBiweeklyDigestAt === 'undefined') data.alertSettings.lastBiweeklyDigestAt = 0;
  if(!Array.isArray(data.alertLog)) data.alertLog = [];
  if(!data.deletedStudents || typeof data.deletedStudents !== 'object') data.deletedStudents = {};
  // Recover names of students deleted before this archive existed, from the alert log.
  data.alertLog.forEach(a => {
    if(a.type !== 'studentDeleted') return;
    const m = String(a.message || '').match(/^(.*) \(Admission No\. (.+?)\) was permanently deleted\./);
    if(m && !data.deletedStudents[m[2]]) data.deletedStudents[m[2]] = { name: m[1], class: '', section: '' };
  });
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
      .then(() => syncParentPortal())
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
  fbuInstall();
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
   Parent Portal sync — pushes a per-student, parent-safe summary
   (never Aadhaar numbers) to its own Firestore collection, plus a
   shared school-branding doc, so the separate parent-app.md can log
   a parent in with Admission No. + date of birth. See README.md >
   "Parent Portal" for the Firestore collections and security rules
   this depends on. A no-op unless cloud sync is on and signed in.
   --------------------------------------------------------------- */
function dobDigits(dob){ return String(dob || '').replace(/-/g, ''); }
function parentDocId(student){ return `${student.id}__${dobDigits(student.dob)}`; }

const parentSyncCache = {};   // docId -> last pushed JSON, so unchanged students are not rewritten
function syncParentPortal(){
  if(!cloudDocRef || typeof firebase === 'undefined') return;
  const fs = firebase.firestore();
  const withDob = DB.students.filter(s => s.dob);
  const rankCache = {};
  const writes = [];
  withDob.forEach(s => {
    const fees = feesForStudent(s.id).map(f => {
      const c = computeFee(f);
      return { id:f.id, type:f.type, year:f.year, net:c.net, paid:c.paid, balance:c.balance, status:c.status };
    });
    const payments = DB.payments.filter(p => p.studentId === s.id).map(p => {
      const fee = feeById(p.feeId);
      return { date:p.date, amount:p.amount, method:p.method, receipt:p.receipt, feeType: fee ? fee.type : '' };
    });
    const data = {
      admissionNo: s.id, name: s.name, class: s.class, section: s.section || '', dob: s.dob,
      fatherName: s.fatherName || '', motherName: s.motherName || '',
      phone: s.phone || '', address: s.address || '', admissionDate: s.admissionDate || '',
      fees, payments,
      attendance: attendanceForStudent(s).slice(-400),
      reportCards: parentReportCardsFor(s, rankCache)
    };
    const docId = parentDocId(s);
    const sig = JSON.stringify(data);
    if(parentSyncCache[docId] === sig) return;          // nothing changed for this student
    writes.push({ docId, data, sig });
  });
  // Firestore allows at most 500 writes per batch, so push in chunks.
  for(let i = 0; i < writes.length; i += 100){
    const chunk = writes.slice(i, i + 100);
    const batch = fs.batch();
    chunk.forEach(w => batch.set(fs.collection('parent_portal').doc(w.docId), Object.assign({}, w.data, { updatedAt: Date.now() })));
    batch.commit()
      .then(() => chunk.forEach(w => { parentSyncCache[w.docId] = w.sig; }))
      .catch(err => console.error('Parent portal sync failed', err));
  }
  fs.collection('parent_portal_meta').doc('school').set({
    name: DB.school.name || '', address: DB.school.address || '',
    phone: DB.school.phone || '', logo: DB.school.logo || '', countryCode: DB.school.countryCode || '91',
    minAttendance: minAttendance()
  }).catch(err => console.error('Parent portal branding sync failed', err));
}
function deleteParentDoc(docId){
  if(!cloudDocRef || typeof firebase === 'undefined' || !docId) return;
  delete parentSyncCache[docId];
  firebase.firestore().collection('parent_portal').doc(docId).delete().catch(() => {});
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

/* ---- Date helpers: every date the user sees or types is DD-MM-YYYY.
   Dates are still STORED as YYYY-MM-DD so sorting, attendance keys and
   Parent Portal login keys keep working exactly as before. ---- */
function fmtDateTime(ts){
  if(!ts) return '';
  const d = new Date(ts);
  if(isNaN(d.getTime())) return '';
  const p = n => String(n).padStart(2, '0');
  let h = d.getHours(); const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12;
  return `${p(d.getDate())}-${p(d.getMonth()+1)}-${d.getFullYear()}, ${p(h)}:${p(d.getMinutes())} ${ap}`;
}
function fmtMonth(ym){
  const m = /^(\d{4})-(\d{2})$/.exec(ym || '');
  return m ? `${m[2]}-${m[1]}` : (ym || '');
}
function isoToDMY(iso){
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}
function dmyToISO(txt){
  const m = /^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/.exec(String(txt || '').trim());
  if(!m) return '';
  const d = +m[1], mo = +m[2], y = +m[3];
  const dt = new Date(y, mo - 1, d);
  if(dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return '';
  return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
// A text box that shows/accepts DD-MM-YYYY, with a calendar button for picking.
function dateInputHTML(id, iso, opts){
  opts = opts || {};
  return `<div class="date-input" style="${opts.style || ''}">
    <input type="text" class="date-text" id="${id}" value="${isoToDMY(iso)}" placeholder="DD-MM-YYYY" inputmode="numeric" maxlength="10" autocomplete="off">
    <button type="button" class="date-pick-btn" tabindex="-1" aria-label="Pick a date from the calendar">${ICONS.calendar}</button>
    <input type="date" class="date-native" tabindex="-1" aria-hidden="true" value="${esc(iso || '')}"${opts.max ? ` max="${esc(opts.max)}"` : ''}>
  </div>`;
}
// Returns 'YYYY-MM-DD', '' when the box is empty, or null when the text is not a valid date.
function dateVal(id){
  const el = document.getElementById(id);
  if(!el) return '';
  const t = el.value.trim();
  if(!t){ el.classList.remove('invalid'); return ''; }
  const iso = dmyToISO(t);
  el.classList.toggle('invalid', !iso);
  return iso || null;
}
document.addEventListener('input', (e) => {
  const t = e.target;
  if(!t.classList || !t.classList.contains('date-text')) return;
  if(!String(e.inputType || '').startsWith('delete')){
    let v = t.value.replace(/[\/.]/g, '-');
    if(/^\d+$/.test(v)){
      v = v.length > 4 ? `${v.slice(0,2)}-${v.slice(2,4)}-${v.slice(4,8)}` : v.length > 2 ? `${v.slice(0,2)}-${v.slice(2)}` : v;
    }
    t.value = v.slice(0, 10);
  }
  const nat = t.parentElement.querySelector('.date-native');
  if(nat) nat.value = dmyToISO(t.value);
  t.classList.remove('invalid');
});
document.addEventListener('change', (e) => {
  const t = e.target;
  if(!t.classList) return;
  if(t.classList.contains('date-native')){
    const txt = t.parentElement.querySelector('.date-text');
    if(!txt) return;
    txt.value = isoToDMY(t.value);
    txt.classList.remove('invalid');
    txt.dispatchEvent(new Event('change', { bubbles: true }));
  }else if(t.classList.contains('date-text')){
    const nat = t.parentElement.querySelector('.date-native');
    if(nat) nat.value = dmyToISO(t.value);
    if(t.id) dateVal(t.id);
  }
});
document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('.date-pick-btn');
  if(!b) return;
  const nat = b.parentElement.querySelector('.date-native');
  if(!nat) return;
  try{ if(nat.showPicker) nat.showPicker(); else { nat.focus(); nat.click(); } }catch(err){}
});
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
  if(s) return s.name;
  const d = DB.deletedStudents && DB.deletedStudents[id];
  return d && d.name ? d.name : '(deleted student)';
}
// HTML version for table cells: deleted students show in red.
function studentNameHTML(id){
  const s = DB.students.find(x => x.id === id);
  if(s) return esc(s.name);
  const d = DB.deletedStudents && DB.deletedStudents[id];
  const label = d && d.name ? d.name : 'Deleted student';
  return `<span class="deleted-student" title="This student has been deleted">${esc(label)}</span>`;
}
function studentClassLabel(id){
  const s = DB.students.find(x => x.id === id);
  const d = s || (DB.deletedStudents && DB.deletedStudents[id]);
  if(!d || !d.class) return '\u2014';
  return esc(d.class) + (d.section ? '-' + esc(d.section) : '');
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

/* ---------------------------------------------------------------
   Messaging (WhatsApp / SMS) — click-to-send links.
   No SMS/WhatsApp account, API key or backend is used or required:
   these open the parent's already-installed WhatsApp or messaging
   app with the text pre-filled, and a person still taps Send.
   True one-click bulk sending with no human involved would need a
   paid provider (e.g. WhatsApp Business API, Twilio, MSG91) wired
   up through a server, which a static site like this cannot hold
   credentials for safely.
   --------------------------------------------------------------- */
function toIntlPhone(phone){
  const digits = String(phone||'').replace(/\D/g,'');
  const cc = String((DB.school && DB.school.countryCode) || '91').replace(/\D/g,'');
  if(!digits) return '';
  if(digits.length > 10 && digits.startsWith(cc)) return digits;
  if(digits.length === 10) return cc + digits;
  return digits;
}
function waLink(phone, message){
  const num = toIntlPhone(phone);
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
function smsLink(phone, message){
  const digits = String(phone||'').replace(/\D/g,'');
  return `sms:${digits}?body=${encodeURIComponent(message)}`;
}
function openMessageLink(kind, phone, message){
  if(!phone){ toast('This student has no phone number on file.', true); return; }
  const url = kind === 'whatsapp' ? waLink(phone, message) : smsLink(phone, message);
  window.open(url, '_blank');
}
function paymentMessageText(payment, fee, student, calc){
  const lines = [
    `Dear Parent,`,
    ``,
    `We have received a fee payment for ${student ? student.name : ''} (Admission No. ${payment.studentId}).`,
    ``,
    `Fee type: ${fee ? fee.type : '\u2014'}`,
    `Total fee: ${money(calc.net)}`,
    `Amount paid: ${money(payment.amount)}`,
    `Balance due: ${money(calc.balance)}`,
    `Receipt No: ${payment.receipt}`,
    `Date: ${fmtDate(payment.date)}`,
    ``,
    `Thank you,`,
    `${DB.school.name}`
  ];
  return lines.join('\n');
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

// Teachers only see the last 4 digits of Aadhaar numbers (e.g. XXXX XXXX 0103).
// Management still sees the full number.
function maskAadhar(v){
  const digits = String(v || '').replace(/\s/g, '');
  if(!digits) return '';
  const last4 = digits.slice(-4);
  return 'XXXX XXXX ' + last4;
}
function displayAadhar(v){
  return SESSION.role === 'teacher' ? maskAadhar(v) : (v || '');
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
  // management: everything. teacher: view + add student data only (no edit, no delete).
  // feepayments: view students + record/view payments, no editing or deleting either.
  if(SESSION.role === 'management') return true;
  if(SESSION.role === 'teacher') return ['view-students','add-students','mark-attendance','enter-marks'].includes(action);
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
 /* { id:'dashboard', label:'Dashboard', icon:'dashboard', roles:['management','teacher'] }, */
  { id:'students',  label:'Students',  icon:'students',  roles:['management','teacher','feepayments'] },
  { id:'fees',      label:'Fees',      icon:'fees',       roles:['management'] },
  { id:'payments',  label:'Payments',  icon:'payments',   roles:['management','feepayments'] },
/*  { id:'attendance', label:'Attendance', icon:'calendar', roles:['management','teacher'] },
  { id:'reportcards', label:'Report Cards', icon:'grad', roles:['management','teacher'] }, */
  { id:'accounts',  label:'Accounts',  icon:'accounts',   roles:['management'] },
  { id:'reports',   label:'Reports',   icon:'reports',    roles:['management','teacher'] },
  { id:'notifications', label:'Notifications', icon:'bell', roles:['management'] },
  { id:'settings',  label:'Settings',  icon:'settings',   roles:['management'] },
  // External link: opens the help/about site in a new browser tab (no in-app view).
  { id:'about', label:'About Software', icon:'info', roles:['management','teacher','feepayments'], href:'https://naseer7399.github.io/IKHLAS-HELP/' }
];

function showApp(){
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  renderShell();
  const firstTab = NAV_ITEMS.find(i => i.roles.includes(SESSION.role));
  NAV_STACK = []; NAV_IDX = -1;
  wirePageNav();
  navigate(firstTab ? firstTab.id : 'students');
  checkBiweeklyDigest();
}

function renderShell(){
  const items = NAV_ITEMS.filter(i => i.roles.includes(SESSION.role));
  document.getElementById('sidebarBrand').innerHTML = `
    <div class="badge-mark">${DB.school.logo ? `<img src="${DB.school.logo}" alt="${esc(DB.school.name)} logo">` : 'IS'}</div>
    <div><strong>${esc(DB.school.name)}</strong><span>Student and fee records</span></div>`;
  document.getElementById('navList').innerHTML = items.map(i => `
    ${i.href
      ? `<button class="nav-item" type="button" data-href="${i.href}">${ICONS[i.icon]}<span>${i.label}</span></button>`
      : `<button class="nav-item" data-tab="${i.id}">${ICONS[i.icon]}<span>${i.label}</span></button>`}
  `).join('');
  document.getElementById('sidebarStatus').innerHTML = `
    <div class="role-pill"><span class="dot"></span>${ROLE_LABELS[SESSION.role] || 'Guest'} access</div>
    ${cloudDocRef ? `<div class="role-pill" style="background:rgba(255,255,255,0.06);"><span class="dot" style="background:#2F8F5B;"></span>Cloud sync on</div>` : ''}`;
  document.getElementById('sidebarFooter').innerHTML = `
    <button class="nav-item" id="btnLogout">${ICONS.logout}<span>Log out</span></button>
    <div class="app-copyright">\u00a9 2026 Naseer ISM WEB All rights reserved.</div>`;
  document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.tab));
  });
  document.querySelectorAll('.nav-item[data-href]').forEach(btn => {
    btn.addEventListener('click', () => window.open(btn.dataset.href, '_blank', 'noopener,noreferrer'));
  });
  document.getElementById('btnLogout').addEventListener('click', logout);
}

// The Alerts bell is only meaningful on the Dashboard (a quick glance
// at recent activity), so it's shown/hidden per tab here rather than
// rendered once in renderShell.
function renderTopbarActions(tab){
  const actions = document.getElementById('topbarActions');
  if(!actions) return;
  const showBell = SESSION.role === 'management' && tab === 'dashboard';
  actions.innerHTML = showBell
    ? `<button class="topbar-bell" id="btnTopbarBell" aria-label="Alerts" title="Alerts">${ICONS.bell}<span class="nav-badge" id="alertBadge" style="display:none;"></span></button>`
    : '';
  const bellBtn = document.getElementById('btnTopbarBell');
  if(bellBtn) bellBtn.addEventListener('click', openRecentActivityModal);
  updateAlertBadge();
}

/* ---- Page navigation: previous / next page (in-app history, also wired to
   the phone/browser Back button) and scroll to top / bottom. ---- */
let NAV_STACK = [], NAV_IDX = -1, NAV_RESTORING = false, PAGE_NAV_WIRED = false;
function recordNav(tab, params){
  if(NAV_RESTORING) return;
  const cur = NAV_STACK[NAV_IDX];
  // Re-rendering the same view (e.g. after a cloud sync) is not a new page.
  if(cur && cur.tab === tab && JSON.stringify(cur.params) === JSON.stringify(params)) return;
  NAV_STACK = NAV_STACK.slice(0, NAV_IDX + 1);
  NAV_STACK.push({ tab, params });
  NAV_IDX = NAV_STACK.length - 1;
  try{ history.pushState({ ikNav: NAV_IDX }, ''); }catch(e){}
}
function restoreNav(i){
  if(!NAV_STACK[i]) return;
  NAV_IDX = i; NAV_RESTORING = true;
  try{ navigate(NAV_STACK[i].tab, NAV_STACK[i].params); } finally { NAV_RESTORING = false; }
  window.scrollTo(0, 0);
}
function goNav(delta){
  const target = NAV_IDX + delta;
  if(target < 0 || target >= NAV_STACK.length) return;
  const before = NAV_IDX;
  try{ history.go(delta); }catch(e){}
  setTimeout(() => { if(NAV_IDX === before) restoreNav(target); }, 150);
}
function updatePageNav(){
  const b = document.getElementById('pnBack'), f = document.getElementById('pnFwd');
  if(b) b.disabled = NAV_IDX <= 0;
  if(f) f.disabled = NAV_IDX >= NAV_STACK.length - 1;
  const t = document.getElementById('pnTop'), d = document.getElementById('pnBottom');
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  if(t) t.disabled = y < 40;
  if(d) d.disabled = max - y < 40;
}
function wirePageNav(){
  if(PAGE_NAV_WIRED) return;
  PAGE_NAV_WIRED = true;
  document.getElementById('pnBack').addEventListener('click', () => goNav(-1));
  document.getElementById('pnFwd').addEventListener('click', () => goNav(1));
  document.getElementById('pnTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('pnBottom').addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));
  window.addEventListener('scroll', updatePageNav, { passive: true });
  window.addEventListener('resize', updatePageNav);
  setInterval(updatePageNav, 1500);   // page height changes as content loads
  window.addEventListener('popstate', (e) => {
    const i = e.state && e.state.ikNav;
    if(typeof i !== 'number' || !NAV_STACK[i]) return;
    if(document.getElementById('app').classList.contains('hidden')) return;
    restoreNav(i);
  });
}

function navigate(tab, params){
  if(notifHistoryUnsub && tab !== 'notifications'){ notifHistoryUnsub(); notifHistoryUnsub = null; }
  VIEW = { tab, params: params || {} };
  recordNav(tab, params || {});
  document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  renderTopbarActions(tab);
  const renderers = {
    dashboard: renderDashboard,
    students: renderStudents,
    'student-profile': renderStudentProfile,
    fees: renderFees,
    payments: renderPayments,
    attendance: renderAttendance,
    reportcards: renderReportCards,
    'report-exam': renderExamEditor,
    accounts: renderAccounts,
    reports: renderReports,
    notifications: renderNotifications,
    settings: renderSettings
  };
  (renderers[tab] || renderDashboard)();
  updatePageNav();
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
        <div class="stat-card"><div class="label">Students enrolled</div><div class="value">${DB.students.length}</div></div>
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
              ${attention.map(x => `<tr><td>${studentNameHTML(x.fee.studentId)}</td><td>${esc(x.fee.type)}</td><td class="num">${money(x.calc.balance)}</td><td>${tagForStatus(x.calc.status)}</td></tr>`).join('')}
            </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>All fees collected</h3><p>Nothing outstanding right now.</p></div>`}
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><div><h3>Recent payments</h3><div class="sub">Last 5 recorded</div></div>
            <button class="btn btn-sm" data-nav="payments">${ICONS.payments}View payments</button></div>
          <div class="panel-body pad0">
            ${recentPayments.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Student</th><th class="num">Amount</th></tr></thead><tbody>
              ${recentPayments.map(p => `<tr><td>${fmtDate(p.date)}</td><td>${studentNameHTML(p.studentId)}</td><td class="num">${money(p.amount)}</td></tr>`).join('')}
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
let studentFilter = { q:'', class:'' };

function renderStudents(){
  setTopbar('Students', 'Add, update and look up student records');
  renderStudentsShell();
}

// Renders the search/filter toolbar once. The input elements are never
// recreated after this, so typing doesn't lose focus or cursor position.
function renderStudentsShell(){
  const classes = [...new Set(DB.students.map(s => String(s.class == null ? '' : s.class).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b, undefined, { numeric:true })); // blank classes ignored
  const canAdd = can('add-students');
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div class="toolbar">
          <div class="search-input">${ICONS.search}<input type="text" id="studentSearch" placeholder="&emsp;Search by Name or Admission no." value="${esc(studentFilter.q)}" style="width:300px"></div>
          <select id="filterClass" style="width:140px"><option value="">All classes</option>${classes.map(c=>`<option ${studentFilter.class===c?'selected':''} value="${esc(c)}">Class ${esc(c)}</option>`).join('')}</select>
        </div>
        <button class="btn" id="btnPrintStudents">${ICONS.print}Print</button>
        <button class="btn" id="btnAnnouncement">${ICONS.megaphone}Announcement</button>
        ${canAdd ? `<button class="btn btn-primary" id="btnAddStudent">${ICONS.plus}Add student</button>` : ''}
      </div>
      <div class="panel-body pad0" id="studentsTableArea"></div>
    </div>
  `);
  document.getElementById('studentSearch').addEventListener('input', e => { studentFilter.q = e.target.value; renderStudentsTable(); });
  document.getElementById('filterClass').addEventListener('change', e => { studentFilter.class = e.target.value; renderStudentsTable(); });
  document.getElementById('btnPrintStudents').addEventListener('click', () => printContainer('Student list'));
  document.getElementById('btnAnnouncement').addEventListener('click', () => openAnnouncementModal());
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
    return matchQ && matchC;
  });
  const area = document.getElementById('studentsTableArea');
  if(!area) return;
  {
    const n = list.length, word = n === 1 ? 'student' : 'students';
    const sub = studentFilter.class ? `Class ${studentFilter.class} \u00b7 ${n} ${word}` : `All classes \u00b7 ${n} ${word}`;
    document.getElementById('topbarSub').textContent = studentFilter.q.trim() ? `${sub} (search applied)` : sub;
  }
  const headCols = `<th>Admission No.</th><th>Name</th><th>Class &amp; Section</th><th>Date of birth</th><th>Student's Aadhaar</th><th>Father's name</th><th>Father's Aadhaar</th><th>Mother's name</th><th>Mother's Aadhaar</th><th>Phone</th><th></th>`;
  area.innerHTML = list.length ? `<div class="table-wrap"><table>
      <thead><tr>${headCols}</tr></thead>
      <tbody>
        ${list.map(s => `<tr>
          <td>${esc(s.id)}</td>
          <td>${esc(s.name)}</td>
          <td>${esc(s.class)}${s.section ? ('-' + esc(s.section)) : ''}</td>
          <td>${fmtDate(s.dob)}</td>
          <td>${esc(displayAadhar(s.studentAadhar))||'\u2014'}</td>
          <td>${esc(s.fatherName)}</td>
          <td>${esc(displayAadhar(s.fatherAadhar))||'\u2014'}</td>
          <td>${esc(s.motherName)||'\u2014'}</td>
          <td>${esc(displayAadhar(s.motherAadhar))||'\u2014'}</td>
          <td>${esc(s.phone)}</td>
          <td><div class="row-actions">
            <button class="btn btn-sm btn-ghost" data-view="${s.id}" title="View profile">${ICONS.eye}</button>
            <button class="btn btn-sm btn-ghost" data-msg="${s.id}" title="Message parent">${ICONS.whatsapp}</button>
            ${canEdit ? `<button class="btn btn-sm btn-ghost" data-edit="${s.id}" title="Edit">${ICONS.edit}</button>` : ''}
            ${canDelete ? `<button class="btn btn-sm btn-ghost" data-del="${s.id}" title="Delete">${ICONS.trash}</button>` : ''}
          </div></td>
        </tr>`).join('')}
      </tbody>
    </table></div>` : `<div class="empty-state">${ICONS.students}<h3>No students match this search</h3><p>Try a different name, admission no. or class.</p></div>`;
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => navigate('student-profile', { id:b.dataset.view })));
  document.querySelectorAll('[data-msg]').forEach(b => b.addEventListener('click', () => openIndividualMessageModal(b.dataset.msg)));
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
        <div class="field"><label>Date of birth</label>${dateInputHTML('f_dob', editing ? editing.dob : '')}</div>
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
        <div class="field"><label>Admission date</label>${dateInputHTML('f_admission', editing ? editing.admissionDate : todayISO())}</div>
      </div>
      <div class="field"><label>Address</label><input type="text" id="f_address" value="${esc(editing?editing.address:'')}"></div>
    `,
    confirmLabel: editing ? 'Save changes' : 'Add student',
    onConfirm: () => {
      const id = document.getElementById('f_id').value.trim();
      const name = document.getElementById('f_name').value.trim();
      if(!id || !name){ toast('Enter an admission number and name.', true); return false; }
      const dobVal = dateVal('f_dob'), admVal = dateVal('f_admission');
      if(dobVal === null || admVal === null){ toast('Enter dates as DD-MM-YYYY (e.g. 14-05-2012).', true); return false; }
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
        dob: dobVal,
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
        admissionDate: admVal
      };
      const oldParentDocId = (editing && editing.dob) ? parentDocId(editing) : null;
      if(editing){
        Object.assign(editing, rec);
        toast('Student updated.');
      }else{
        DB.students.push(rec);
        toast('Student added.');
        logAlert('studentEnrolled', 'Student enrolled', `${rec.name} (Admission No. ${rec.id}) was enrolled in Class ${rec.class}${rec.section ? '-' + rec.section : ''}.`);
      }
      saveDB();
      const newParentDocId = rec.dob ? parentDocId(rec) : null;
      if(oldParentDocId && oldParentDocId !== newParentDocId) deleteParentDoc(oldParentDocId);
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
  const outstandingBalance = feesForStudent(id).reduce((sum,f) => sum + computeFee(f).balance, 0);
  if(outstandingBalance > 0){
    openModal({
      title: 'Cannot delete student',
      body: `<div class="modal-note danger">${ICONS.alert}${esc(s.name)} (${esc(s.id)}) has an outstanding fee balance of ${money(outstandingBalance)}. Clear all dues before deleting this student.</div>`,
      confirmLabel: 'OK',
      extraButtons: [],
      onConfirm: () => true
    });
    return;
  }
  openModal({
    title: 'Delete student?',
    body: `<div class="modal-note danger">${ICONS.alert}This removes ${esc(s.name)} (${esc(s.id)}) permanently.</div>
      ${hasFees ? `<p class="small-note">This student also has fee and payment records. Those records will remain but will show as belonging to a deleted student.</p>` : ''}`,
    confirmLabel: 'Delete student',
    danger: true,
    onConfirm: () => {
      const oldParentDocId = s.dob ? parentDocId(s) : null;
      if(!DB.deletedStudents) DB.deletedStudents = {};
      DB.deletedStudents[id] = { name: s.name, class: s.class || '', section: s.section || '' };
      DB.students = DB.students.filter(x => x.id !== id);
      saveDB();
      if(oldParentDocId) deleteParentDoc(oldParentDocId);
      logAlert('studentDeleted', 'Student record deleted', `${s.name} (Admission No. ${s.id}) was permanently deleted.`);
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
            <div class="meta">${esc(s.gender)} \u00b7 Born ${fmtDate(s.dob)} \u00b7 Admitted ${fmtDate(s.admissionDate)}</div>
          </div>
          <div style="margin-left:auto; display:flex; gap:8px;">
            <button class="btn btn-sm" id="btnPrintProfile">${ICONS.print}Print</button>
            ${canEdit ? `<button class="btn btn-sm" id="btnEditProfile">${ICONS.edit}Edit</button>` : ''}
            <button class="btn btn-sm btn-ghost" data-nav="students">${ICONS.students}All students</button>
          </div>
        </div>
        <div class="info-grid">
          <div class="item"><div class="k">Admission No.</div><div class="v">${esc(s.id)}</div></div>
          <div class="item"><div class="k">Student's Aadhaar</div><div class="v">${esc(displayAadhar(s.studentAadhar))||'\u2014'}</div></div>
          <div class="item"><div class="k">Phone</div><div class="v">${esc(s.phone)||'\u2014'}</div></div>
          <div class="item"><div class="k">Class &amp; Section</div><div class="v">${s.class ? (esc(s.class) + (s.section ? '-' + esc(s.section) : '')) : '\u2014'}</div></div>
          <div class="item"><div class="k">Father's name</div><div class="v">${esc(s.fatherName)||'\u2014'}</div></div>
          <div class="item"><div class="k">Father's Aadhaar</div><div class="v">${esc(displayAadhar(s.fatherAadhar))||'\u2014'}</div></div>
          <div class="item"><div class="k">Mother's name</div><div class="v">${esc(s.motherName)||'\u2014'}</div></div>
          <div class="item"><div class="k">Mother's Aadhaar</div><div class="v">${esc(displayAadhar(s.motherAadhar))||'\u2014'}</div></div>
          <div class="item" style="grid-column: 1 / -1;"><div class="k">Address</div><div class="v">${esc(s.address)||'\u2014'}</div></div>
        </div>
      </div>
    </div>

    ${SESSION.role === 'management' ? `
    <div class="panel">
      <div class="panel-body">
        <div class="section-title" style="margin:0 0 8px;">Parent app access</div>
        ${s.dob
          ? `<p class="small-note">Share these with the parent to sign in to the Parent Portal app: <b>Admission No. ${esc(s.id)}</b> and <b>date of birth ${fmtDate(s.dob)}</b>.</p>`
          : `<p class="small-note" style="color:var(--danger);">${ICONS.alert} This student has no date of birth on file, so the Parent Portal app can't create a login for them yet. Add one from Edit.</p>`}
      </div>
    </div>
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
let feeFilter = { q:'', status:'', class:'' };

function renderFees(){
  setTopbar('Fee structure', 'Set fee amounts and discounts per student');
  renderFeesShell();
}
function renderFeesShell(){
  const classes = [...new Set(DB.students.map(s => String(s.class == null ? '' : s.class).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b, undefined, { numeric:true }));
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div class="toolbar">
          <div class="search-input">${ICONS.search}<input type="text" id="feeSearch" placeholder="&emsp;Search by Name or Admission no." value="${esc(feeFilter.q)}" style="width:300px"></div>
          <select id="feeClassFilter" style="width:140px"><option value="">All classes</option>${classes.map(c=>`<option ${feeFilter.class===c?'selected':''} value="${esc(c)}">Class ${esc(c)}</option>`).join('')}</select>
          <select id="feeStatusFilter" style="width:150px"><option value="">All statuses</option><option ${feeFilter.status==='Paid'?'selected':''}>Paid</option><option ${feeFilter.status==='Partial'?'selected':''}>Partial</option><option ${feeFilter.status==='Pending'?'selected':''}>Pending</option></select>
        </div>
        <button class="btn" id="btnPrintFees">${ICONS.print}Print</button>
        <button class="btn btn-primary" id="btnAddFee">${ICONS.plus}Add fee record</button>
      </div>
      <div class="panel-body pad0" id="feesTableArea"></div>
    </div>
  `);
  document.getElementById('feeSearch').addEventListener('input', e => { feeFilter.q = e.target.value; renderFeesTable(); });
  document.getElementById('feeClassFilter').addEventListener('change', e => { feeFilter.class = e.target.value; renderFeesTable(); });
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
    const stu = studentById(x.fee.studentId);
    const matchC = !feeFilter.class || (stu && String(stu.class == null ? '' : stu.class).trim() === feeFilter.class);
    return matchQ && matchS && matchC;
  });
  const area = document.getElementById('feesTableArea');
  if(!area) return;
  area.innerHTML = list.length ? `<div class="table-wrap"><table>
      <thead><tr><th>Fee ID</th><th>Student</th><th>Class</th><th>Type</th><th class="num">Amount</th><th class="num">Discount</th><th class="num">Net</th><th class="num">Balance</th><th>Status</th><th></th></tr></thead>
      <tbody>${list.map(({fee:f, calc:c}) => `<tr>
        <td>${esc(f.id)}</td>
        <td>${studentNameHTML(f.studentId)}</td>
        <td>${studentClassLabel(f.studentId)}</td>
        <td>${esc(f.type)}</td>
        <td class="num">${money(f.amount)}</td>
        <td class="num">${f.discount ? money(f.discount) : '\u2014'}</td>
        <td class="num">${money(c.net)}</td>
        <td class="num">${money(c.balance)}</td>
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

// Sends a notice to the Parent Portal app (Firestore "notifications"), addressed
// to the given students only. Resolves true on success.
function sendNoticeToStudents(ids, title, message){
  if(!cloudDocRef || typeof firebase === 'undefined'){
    toast('Cloud sync is off \u2014 turn it on and sign in to send notices to the Parent Portal app.', true);
    return Promise.resolve(false);
  }
  const msg = String(message || '').trim();
  if(!msg){ toast('The message is empty.', true); return Promise.resolve(false); }
  const col = firebase.firestore().collection('notifications');
  const base = { kind: 'announcement', title: title || 'Announcement', totalOutstanding: null, createdAt: Date.now(), createdBy: (cloudUser && cloudUser.email) || 'unknown' };
  // {name} personalisation needs one notice per student; otherwise a single shared notice.
  const docs = /\{name\}/i.test(msg)
    ? ids.map(id => { const s = studentById(id); return Object.assign({}, base, { audience: { type:'students', ids:[id] }, message: msg.replace(/\{name\}/gi, s ? s.name : ''), recipientCount: 1 }); })
    : [Object.assign({}, base, { audience: { type:'students', ids }, message: msg, recipientCount: ids.length })];
  return Promise.all(docs.map(d => col.add(d))).then(() => {
    toast(ids.length === 1 ? `Notice sent to ${studentName(ids[0])}'s parent.` : `Notice sent to ${ids.length} parents.`);
    return true;
  }).catch(err => {
    console.error('Send notice failed', err);
    toast('Could not send \u2014 check your connection.', true);
    return false;
  });
}

function openIndividualMessageModal(studentId){
  const s = studentById(studentId);
  if(!s) return;
  const defaultMsg = `Dear Parent,\n\nThis is a message from ${DB.school.name} regarding ${s.name} (Admission No. ${s.id}).\n\n\n\nRegards,\n${DB.school.name}`;
  openModal({
    title: `Message ${s.name}'s parent`,
    body: `
      ${s.phone ? '' : `<div class="modal-note danger">${ICONS.alert}No phone number is on file for this student, so WhatsApp can't be used. Add one from Edit, or use Send Notice.</div>`}
      <p class="field-help" style="margin-bottom:8px;">WhatsApp goes to ${s.phone ? esc(s.phone) : '\u2014'}. <b>Send Notice</b> delivers the message to the Parent Portal app.${s.dob ? '' : ' No date of birth is on file, so this parent cannot log in to the Portal yet.'}</p>
      <textarea id="im_text" rows="9" style="width:100%;font-family:inherit;font-size:13px;padding:10px;border:1px solid var(--line-strong);border-radius:var(--radius-ctrl);resize:vertical;">${esc(defaultMsg)}</textarea>
    `,
    confirmLabel: 'Done',
    onConfirm: () => true,
    extraButtons: [
      { label: 'Send WhatsApp', className: 'btn-accent', icon: ICONS.whatsapp, onClick: () => { openMessageLink('whatsapp', s.phone, document.getElementById('im_text').value); } },
      { label: 'Send Notice', className: '', icon: ICONS.bell, onClick: () => {
          sendNoticeToStudents([s.id], `Message from ${DB.school.name}`, document.getElementById('im_text').value).then(ok => { if(ok) document.getElementById('modalRoot').innerHTML = ''; });
        } },
    ],
  });
}

function openAnnouncementModal(){
  const clsOf = s => String(s.class == null ? '' : s.class).trim();
  const classes = [...new Set(DB.students.map(clsOf).filter(Boolean))].sort((a,b)=>a.localeCompare(b, undefined, { numeric:true })); // blank classes ignored
  const rowsHtml = DB.students.map(s => `
    <label class="ann-row" data-class="${esc(clsOf(s))}" style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid var(--line);">
      <input type="checkbox" class="ann-check" value="${esc(s.id)}" checked>
      <span style="flex:1;">${esc(s.name)} <span class="small-note">(Class ${esc(s.class)}${s.section?('-'+esc(s.section)):''})</span></span>
      <span class="small-note">${s.phone?esc(s.phone):'no phone on file'}</span>
    </label>`).join('');
  openModal({
    title: 'Send an announcement',
    body: `
      <div class="field-row">
        <div class="field"><label>Send via</label>
          <select id="ann_channel"><option value="whatsapp">WhatsApp</option><option value="notice">Send Notice (Parent Portal)</option></select>
        </div>
        <div class="field" id="ann_titleWrap" style="display:none;"><label>Notice title</label>
          <input type="text" id="ann_title" maxlength="80" placeholder="e.g. Holiday notice">
        </div>
      </div>
      <div class="field">
        <label>Message</label>
        <textarea id="ann_message" rows="6" style="width:100%;font-family:inherit;font-size:13px;padding:10px;border:1px solid var(--line-strong);border-radius:var(--radius-ctrl);resize:vertical;" placeholder="Type your announcement here."></textarea>
        <p class="field-help">Tip: include {name} anywhere in the message to personalize it with each student's name.<span id="ann_noticeHelp" style="display:none;"> With Send Notice, {name} sends one notice per student (uses more Firebase writes).</span></p>
      </div>
      <div class="field">
        <label>Recipients \u2014 filter by class, or untick anyone to skip them</label>
        <div class="ann-filter">
          <select id="ann_class">
            <option value="">All classes (${DB.students.length})</option>
            ${classes.map(c => `<option value="${esc(c)}">Class ${esc(c)} (${DB.students.filter(s => clsOf(s) === c).length})</option>`).join('')}
          </select>
          <button type="button" class="btn btn-sm" id="ann_selAll">Select all</button>
          <button type="button" class="btn btn-sm" id="ann_selNone">Clear</button>
          <span class="small-note" id="ann_count"></span>
        </div>
        <div id="ann_list" style="max-height:220px;overflow-y:auto;border:1px solid var(--line-strong);border-radius:var(--radius-ctrl);padding:4px 10px;">${rowsHtml}</div>
      </div>
    `,
    confirmLabel: 'Continue',
    onConfirm: () => {
      const message = document.getElementById('ann_message').value.trim();
      if(!message){ toast('Write a message first.', true); return false; }
      const channel = document.getElementById('ann_channel').value;
      const selected = [...document.querySelectorAll('.ann-check:checked')].map(el => el.value);
      if(!selected.length){ toast('Select at least one recipient.', true); return false; }
      if(channel === 'notice'){
        if(!cloudDocRef){ toast('Cloud sync is off \u2014 turn it on and sign in to send notices to the Parent Portal app.', true); return false; }
        const title = document.getElementById('ann_title').value.trim() || 'Announcement';
        sendNoticeToStudents(selected, title, message);
        return true;
      }
      setTimeout(() => openAnnouncementSendList(selected, message, 'whatsapp'), 50);
      return true;
    }
  });
  const rows = () => [...document.querySelectorAll('#ann_list .ann-row')];
  const updateCount = () => {
    const n = document.querySelectorAll('.ann-check:checked').length;
    document.getElementById('ann_count').textContent = `${n} selected`;
  };
  const applyClass = () => {
    const c = document.getElementById('ann_class').value;
    rows().forEach(r => {
      const show = !c || r.dataset.class === c;
      r.style.display = show ? 'flex' : 'none';
      r.querySelector('.ann-check').checked = show;   // hidden rows are never sent to
    });
    updateCount();
  };
  document.getElementById('ann_class').addEventListener('change', applyClass);
  document.getElementById('ann_selAll').addEventListener('click', () => {
    rows().forEach(r => { if(r.style.display !== 'none') r.querySelector('.ann-check').checked = true; });
    updateCount();
  });
  document.getElementById('ann_selNone').addEventListener('click', () => {
    rows().forEach(r => { r.querySelector('.ann-check').checked = false; });
    updateCount();
  });
  document.getElementById('ann_list').addEventListener('change', updateCount);
  document.getElementById('ann_channel').addEventListener('change', (e) => {
    const isNotice = e.target.value === 'notice';
    document.getElementById('ann_titleWrap').style.display = isNotice ? 'block' : 'none';
    document.getElementById('ann_noticeHelp').style.display = isNotice ? 'inline' : 'none';
    document.getElementById('modalConfirmBtn').textContent = isNotice ? 'Send notice' : 'Continue';
  });
  updateCount();
}

function openAnnouncementSendList(ids, message, channel){
  const rows = ids.map(id => {
    const s = studentById(id);
    const hasPhone = s && s.phone;
    return `<div class="ann-send-row" style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid var(--line);">
      <span style="flex:1;">${esc(s?s.name:id)}<br><span class="small-note">${hasPhone?esc(s.phone):'No phone on file'}</span></span>
      <button class="btn btn-sm ${channel==='whatsapp'?'btn-accent':''}" data-ann-send="${esc(id)}" ${hasPhone?'':'disabled'}>${channel==='whatsapp'?ICONS.whatsapp:ICONS.sms} Send</button>
    </div>`;
  }).join('');
  openModal({
    title: `Send to ${ids.length} recipient${ids.length>1?'s':''}`,
    body: `<p class="small-note" style="margin-bottom:12px;">Browsers only open one message at a time, so click Send for each parent \u2014 it opens ${channel==='whatsapp'?'WhatsApp':'your SMS app'} with the message already filled in; you just tap send there.</p>
      <div style="max-height:320px;overflow-y:auto;">${rows}</div>`,
    confirmLabel: 'Close',
    onConfirm: () => true,
  });
  document.querySelectorAll('[data-ann-send]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.annSend;
      const s = studentById(id);
      const personalized = message.replace(/\{name\}/gi, s ? s.name : '');
      openMessageLink(channel, s ? s.phone : '', personalized);
      btn.innerHTML = '\u2713 Sent';
      btn.disabled = true;
      btn.classList.remove('btn-accent');
      btn.classList.add('btn-ghost');
    });
  });
}

function openMultiFeeModal(presetStudentId){
  const presetTypes = ['Last Year due','Admission Fee','Books Fee','School Fee','Van Fee'];
  const rowHTML = (pick) => `
    <div class="fee-row">
      <div class="fee-row-main">
        <select class="fr-type">${presetTypes.map(t => `<option ${t===pick?'selected':''}>${t}</option>`).join('')}<option value="Other" ${pick==='Other'?'selected':''}>Other</option></select>
        <input type="number" class="fr-amount" min="0" placeholder="Amount">
        <input type="number" class="fr-discount" min="0" placeholder="0">
        <button type="button" class="btn btn-sm btn-ghost fr-remove" title="Remove this fee type" aria-label="Remove this fee type">${ICONS.x}</button>
      </div>
      <input type="text" class="fr-other" style="display:${pick==='Other'?'block':'none'};" placeholder="Specify fee type, e.g. Lab fee, Annual day fee">
    </div>`;
  const usedTypes = () => [...document.querySelectorAll('#f_rows .fr-type')].map(s => s.value);
  openModal({
    title: 'Add fee record',
    body: `
      <div class="field">
        <label>Student</label>
        <div class="searchable-select">
          <input type="text" id="f_studentInput" placeholder="Search by name or admission no." autocomplete="off">
          <input type="hidden" id="f_student">
          <div class="searchable-select-list" id="f_studentList"></div>
        </div>
      </div>
      <div class="field" style="max-width:220px;"><label>Academic year</label><input type="text" id="f_year" value="2026-27"></div>
      <div class="field">
        <label>Fee types &amp; amounts</label>
        <div class="fee-rows-head"><span>Fee type</span><span>Amount (\u20B9)</span><span>Discount (\u20B9)</span><span></span></div>
        <div id="f_rows">${rowHTML('School Fee')}</div>
        <button type="button" class="btn btn-sm" id="f_addRow">${ICONS.plus}Add another fee type</button>
        <p class="field-help" id="f_total" style="margin-top:8px;"></p>
      </div>
      <div class="field"><label>Discount reason (applies to rows that have a discount)</label><input type="text" id="f_reason" placeholder="Merit scholarship, staff ward, sibling discount"></div>
    `,
    confirmLabel: 'Add fee record',
    onConfirm: () => {
      const studentId = document.getElementById('f_student').value;
      if(!studentId){ toast('Choose a student.', true); return false; }
      const rows = [...document.querySelectorAll('#f_rows .fee-row')];
      const recs = [], seen = new Set();
      for(let i = 0; i < rows.length; i++){
        const r = rows[i];
        let type = r.querySelector('.fr-type').value;
        if(type === 'Other'){
          type = r.querySelector('.fr-other').value.trim();
          if(!type){ toast(`Row ${i+1}: enter the fee type.`, true); return false; }
        }
        const amount = Number(r.querySelector('.fr-amount').value);
        const discount = Number(r.querySelector('.fr-discount').value || 0);
        if(!amount || amount <= 0){ toast(`Row ${i+1} (${type}): enter an amount greater than zero, or remove the row.`, true); return false; }
        if(discount < 0 || discount > amount){ toast(`Row ${i+1} (${type}): discount cannot be larger than the amount.`, true); return false; }
        if(seen.has(type.toLowerCase())){ toast(`"${type}" appears twice \u2014 combine it into one row.`, true); return false; }
        seen.add(type.toLowerCase());
        recs.push({ type, amount, discount });
      }
      const year = document.getElementById('f_year').value.trim();
      const reason = document.getElementById('f_reason').value.trim();
      recs.forEach(r => {
        DB.fees.push({ id: nextId('F', DB.fees, 3), studentId, year, type: r.type, amount: r.amount, discount: r.discount, discountReason: r.discount > 0 ? reason : '' });
      });
      saveDB();
      const net = recs.reduce((s, r) => s + r.amount - r.discount, 0);
      if(recs.length === 1){
        toast('Fee record added.');
        logAlert('feeBilled', 'Fee billed', `${recs[0].type} fee of ${money(net)} was billed to ${studentName(studentId)} (${studentId}).`);
      }else{
        toast(`${recs.length} fee records added.`);
        logAlert('feeBilled', 'Fees billed', `${recs.length} fee records (${recs.map(r => r.type).join(', ')}) totalling ${money(net)} were billed to ${studentName(studentId)} (${studentId}).`);
      }
      if(VIEW.tab === 'student-profile') renderStudentProfile(); else renderFeesTable();
      return true;
    }
  });
  const rowsEl = document.getElementById('f_rows');
  const updateTotal = () => {
    let gross = 0, disc = 0;
    rowsEl.querySelectorAll('.fee-row').forEach(r => { gross += Number(r.querySelector('.fr-amount').value) || 0; disc += Number(r.querySelector('.fr-discount').value) || 0; });
    document.getElementById('f_total').innerHTML = gross ? `Total ${money(gross)}${disc ? ` \u2212 discount ${money(disc)}` : ''} = <b>${money(gross - disc)}</b> to bill` : '';
  };
  document.getElementById('f_addRow').addEventListener('click', () => {
    const next = presetTypes.find(t => !usedTypes().includes(t)) || 'Other';
    rowsEl.insertAdjacentHTML('beforeend', rowHTML(next));
    rowsEl.lastElementChild.querySelector('.fr-amount').focus();
  });
  rowsEl.addEventListener('change', (e) => {
    if(e.target.classList.contains('fr-type')){
      const other = e.target.closest('.fee-row').querySelector('.fr-other');
      other.style.display = e.target.value === 'Other' ? 'block' : 'none';
    }
  });
  rowsEl.addEventListener('input', updateTotal);
  rowsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.fr-remove');
    if(!btn) return;
    const row = btn.closest('.fee-row');
    if(rowsEl.querySelectorAll('.fee-row').length > 1) row.remove();
    else row.querySelectorAll('input').forEach(i => { i.value = ''; });
    updateTotal();
  });
  const items = DB.students.map(s => ({
    value: s.id,
    label: `${s.name} (Admission No. ${s.id})`,
    sub: `Class ${s.class}${s.section ? '-' + s.section : ''}`,
    searchText: `${s.name} ${s.id}`.toLowerCase()
  }));
  initSearchableSelect('f_studentInput', 'f_studentList', 'f_student', items, { initialValue: presetStudentId });
}

function openFeeModal(id, presetStudentId){
  if(!id){ openMultiFeeModal(presetStudentId); return; }
  const editing = id ? feeById(id) : null;
  const presetTypes = ['Last Year due','Admission Fee','Books Fee','School Fee','Van Fee'];
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
          <option ${editing&&editing.type==='Last Year due'?'selected':''}>Last Year due</option>
          <option ${editing&&editing.type==='Admission Fee'?'selected':''}>Admission Fee</option>
          <option ${editing&&editing.type==='Books Fee'?'selected':''}>Books Fee</option>
          <option ${editing&&editing.type==='School Fee'?'selected':''}>School Fee</option>
          <option ${editing&&editing.type==='Van Fee'?'selected':''}>Van Fee</option>
          <option value="Other" ${isCustomType?'selected':''}>Other</option>
        </select></div>
      </div>
      <div class="field" id="f_typeOtherWrap" style="${isCustomType ? '' : 'display:none;'}">
        <label>Specify fee type</label>
        <input type="text" id="f_typeOther" value="${isCustomType ? esc(editing.type) : ''}" placeholder="e.g. Lab fee, Annual day fee">
      </div>
      <div class="field-row">
        <div class="field"><label>Amount (\u20B9)</label><input type="number" id="f_amount" min="0" value="${editing?editing.amount:''}" placeholder="25000"></div>
        <div class="field"><label>Discount (\u20B9) \u2014 for special/scholarship students</label><input type="number" id="f_discount" min="0" value="${editing?editing.discount:0}"></div>
      </div>
      <div class="field"><label>Discount reason</label><input type="text" id="f_reason" value="${esc(editing?editing.discountReason:'')}" placeholder="Merit scholarship, staff ward, sibling discount"></div>
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
        discountReason: document.getElementById('f_reason').value.trim()
      };
      if(editing){
        Object.assign(editing, rec);
        toast('Fee record updated.');
      }else{
        rec.id = nextId('F', DB.fees, 3);
        DB.fees.push(rec);
        toast('Fee record added.');
        logAlert('feeBilled', 'Fee billed', `${rec.type} fee of ${money(amount - discount)} was billed to ${studentName(studentId)} (${studentId}).`);
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
      logAlert('feeDeleted', 'Fee record deleted', `Fee ${f.id} (${f.type}, ${money(f.amount)}) for ${studentName(f.studentId)} (${f.studentId}) was deleted.${linkedPayments ? ` ${linkedPayments} linked payment(s) were also removed.` : ''}`);
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
        <div class="search-input">${ICONS.search}<input type="text" id="paySearch" placeholder="&emsp;Search by student or receipt no." value="${esc(paymentFilter.q)}" style="width:280px"></div>
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
  let list = [...DB.payments].sort((a,b) => b.receipt.localeCompare(a.receipt, undefined, {numeric:true, sensitivity:'base'})).filter(p => {
    const q = paymentFilter.q.trim().toLowerCase();
    return !q || studentName(p.studentId).toLowerCase().includes(q) || p.receipt.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
  });
  const area = document.getElementById('paymentsTableArea');
  if(!area) return;
  area.innerHTML = list.length ? `<div class="table-wrap"><table>
      <thead><tr><th>Receipt</th><th>Date</th><th>Student</th><th>Class</th><th>Fee</th><th class="num">Amount paid</th><th>Method</th><th></th></tr></thead>
      <tbody>${list.map(p => { const f = feeById(p.feeId); return `<tr>
        <td>${esc(p.receipt)}</td>
        <td>${fmtDate(p.date)}</td>
        <td>${studentNameHTML(p.studentId)}</td>
        <td>${studentClassLabel(p.studentId)}</td>
        <td>${f ? esc(f.type) : '\u2014'}</td>
        <td class="num">${money(p.amount)}</td>
        <td>${esc(p.method)}</td>
        <td><div class="row-actions">
          <button class="btn btn-sm btn-ghost" data-receipt="${p.id}" title="Print receipt">${ICONS.print}</button>
          <button class="btn btn-sm btn-ghost" data-wa-payment="${p.id}" title="Send WhatsApp confirmation">${ICONS.whatsapp}</button>
          <button class="btn btn-sm btn-ghost" data-notice-payment="${p.id}" title="Send notice to Parent Portal app">${ICONS.bell}</button>
          ${canDelete ? `<button class="btn btn-sm btn-ghost" data-del="${p.id}" title="Delete">${ICONS.trash}</button>` : ''}
        </div></td>
      </tr>`; }).join('')}</tbody>
    </table></div>` : `<div class="empty-state">${ICONS.payments}<h3>No payments recorded yet</h3><p>Record a payment against a fee to see it here.</p></div>`;
  document.querySelectorAll('[data-receipt]').forEach(b => b.addEventListener('click', () => printReceipt(b.dataset.receipt)));
  document.querySelectorAll('[data-wa-payment]').forEach(b => b.addEventListener('click', () => sendPaymentMessage(b.dataset.waPayment, 'whatsapp')));
  document.querySelectorAll('[data-notice-payment]').forEach(b => b.addEventListener('click', () => promptSendPaymentMessage(b.dataset.noticePayment)));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => confirmDeletePayment(b.dataset.del)));
}

function promptSendPaymentMessage(paymentId){
  const p = DB.payments.find(x => x.id === paymentId);
  if(!p) return;
  const s = studentById(p.studentId);
  // Worth offering if the parent can be reached by WhatsApp or via the Parent Portal app.
  if(!s || (!s.phone && !cloudDocRef)) return;
  const f = feeById(p.feeId);
  const calc = f ? computeFee(f) : { net:p.amount, balance:0 };
  const message = paymentMessageText(p, f, s, calc);
  openModal({
    title: 'Send a payment confirmation?',
    body: `
      <p class="small-note" style="margin-bottom:14px;">Let ${esc(s.name)}'s parent know this payment was received, with the fee type and balance included. <b>Send Notice</b> delivers it to the Parent Portal app.</p>
      <textarea id="pm_preview" rows="9" style="width:100%;font-family:inherit;font-size:13px;padding:10px;border:1px solid var(--line-strong);border-radius:var(--radius-ctrl);resize:vertical;">${esc(message)}</textarea>
    `,
    confirmLabel: 'Done',
    onConfirm: () => true,
    extraButtons: [
      { label: 'Send WhatsApp', className: 'btn-accent', icon: ICONS.whatsapp, onClick: () => { openMessageLink('whatsapp', s.phone, document.getElementById('pm_preview').value); } },
      { label: 'Send Notice', className: '', icon: ICONS.bell, onClick: () => {
          sendPaymentNotice(p, s, document.getElementById('pm_preview').value, () => { document.getElementById('modalRoot').innerHTML = ''; });
        } },
    ],
  });
}

// Sends a payment confirmation to the Parent Portal app. It is stored in the
// same Firestore "notifications" collection the Notifications tab uses, addressed
// to just this student, so it appears in that parent's Notices tab.
function sendPaymentNotice(payment, student, message, onSuccess){
  if(!cloudDocRef || typeof firebase === 'undefined'){
    toast('Cloud sync is off \u2014 turn it on and sign in to send notices to the Parent Portal app.', true);
    return;
  }
  const text = String(message || '').trim();
  if(!text){ toast('The message is empty.', true); return; }
  firebase.firestore().collection('notifications').add({
    kind: 'announcement',
    subtype: 'payment_confirmation',
    audience: { type:'students', ids:[student.id] },
    title: `Payment received \u2014 Receipt ${payment.receipt}`,
    message: text,
    paymentId: payment.id,
    receipt: payment.receipt,
    recipientCount: 1,
    totalOutstanding: null,
    createdAt: Date.now(),
    createdBy: (cloudUser && cloudUser.email) || 'unknown'
  }).then(() => {
    toast(`Notice sent to ${student.name}'s parent.`);
    if(onSuccess) onSuccess();
  }).catch(err => {
    console.error('Send notice failed', err);
    toast('Could not send \u2014 check your connection.', true);
  });
}

function sendPaymentMessage(paymentId, kind){
  const p = DB.payments.find(x => x.id === paymentId);
  if(!p) return;
  const f = feeById(p.feeId);
  const s = studentById(p.studentId);
  const calc = f ? computeFee(f) : { net:p.amount, balance:0 };
  const message = paymentMessageText(p, f, s, calc);
  openMessageLink(kind, s ? s.phone : '', message);
}

function openPaymentModal(){
  if(!DB.fees.length && !DB.students.length){ toast('Add a student first.', true); return; }
  openModal({
    title: 'Record a payment',
    body: `
      <div class="field-row">
        <div class="field"><label>Fee type</label><select id="p_feeTypeFilter">
          <option value="">All fee types</option>
          <option>Last Year due</option>
          <option>Admission Fee</option>
          <option>Books Fee</option>
          <option>School Fee</option>
          <option>Van Fee</option>
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
        <p class="small-note" id="p_otherNote" style="display:none;">For "Other", pick the student directly \u2014 you don't need an existing fee record. Enter the fee type above and it will be recorded as a new one-off charge.</p>
      </div>
      <div class="field-row">
        <div class="field"><label>Payment date</label>${dateInputHTML('p_date', todayISO())}</div>
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
      const selected = document.getElementById('p_fee').value;
      const errEl = document.getElementById('p_error');
      const typeFilter = document.getElementById('p_feeTypeFilter').value;
      const customType = document.getElementById('p_feeTypeOther').value.trim();
      if(!selected){ errEl.style.display='block'; errEl.textContent = 'Choose a student / fee to pay towards.'; return false; }
      const amount = Number(document.getElementById('p_amount').value);
      if(!amount || amount <= 0){ errEl.style.display='block'; errEl.textContent = 'Enter an amount greater than zero.'; return false; }
      const payDate = dateVal('p_date');
      if(!payDate){ errEl.style.display='block'; errEl.textContent = 'Enter the payment date as DD-MM-YYYY.'; return false; }

      let f;
      if(selected.indexOf('student:') === 0){
        // "Other" fee type with no existing fee record: create the charge on the fly.
        if(typeFilter !== 'Other' || !customType){ errEl.style.display='block'; errEl.textContent = 'Enter the fee type for this "Other" charge.'; return false; }
        const studentId = selected.slice('student:'.length);
        if(!studentById(studentId)){ errEl.style.display='block'; errEl.textContent = 'Choose a student / fee to pay towards.'; return false; }
        f = { id: nextId('F', DB.fees, 3), studentId, year:'2026-27', type: customType, amount, discount:0, discountReason:'' };
        DB.fees.push(f);
      }else{
        f = feeById(selected);
        if(!f){ errEl.style.display='block'; errEl.textContent = 'Choose a student / fee to pay towards.'; return false; }
        const c = computeFee(f);
        if(amount > c.balance){ errEl.style.display='block'; errEl.textContent = `Amount exceeds the remaining balance of ${money(c.balance)}.`; return false; }
      }

      const rec = {
        id: nextId('P', DB.payments, 3),
        feeId: f.id,
        studentId: f.studentId,
        date: payDate,
        amount,
        method: document.getElementById('p_method').value,
        receipt: document.getElementById('p_receipt').value.trim() || nextId('R', DB.payments, 4)
      };
      DB.payments.push(rec);
      saveDB();
      toast('Payment recorded.');
      logAlert('feeCollected', 'Fee payment received', `${money(rec.amount)} received from ${studentName(rec.studentId)} (${rec.studentId}) towards ${f.type}, via ${rec.method}. Receipt ${rec.receipt}.`);
      if(VIEW.tab === 'student-profile') renderStudentProfile(); else renderPaymentsTable();
      setTimeout(() => promptSendPaymentMessage(rec.id), 200);
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
    if(typeFilter === 'Other'){
      // Let management pick a student directly and record a one-off "Other" charge
      // even when no fee record exists for them yet.
      DB.students.forEach(s => {
        feeItems.push({
          value: `student:${s.id}`,
          label: `${s.name} \u2014 new "Other" charge`,
          sub: `Admission No. ${s.id}${customType ? ' \u00b7 ' + document.getElementById('p_feeTypeOther').value.trim() : ' \u00b7 enter fee type above'}`,
          searchText: `${s.name} ${s.id}`.toLowerCase()
        });
      });
    }
  }
  buildFeeItems();
  initSearchableSelect('p_feeInput', 'p_feeList', 'p_fee', feeItems);

  document.getElementById('p_feeTypeFilter').addEventListener('change', (e) => {
    const isOther = e.target.value === 'Other';
    document.getElementById('p_feeTypeOtherWrap').style.display = isOther ? 'block' : 'none';
    document.getElementById('p_otherNote').style.display = isOther ? 'block' : 'none';
    buildFeeItems();
    document.getElementById('p_feeInput').value = '';
    document.getElementById('p_fee').value = '';
  });
  document.getElementById('p_feeTypeOther').addEventListener('input', buildFeeItems);
}

function confirmDeletePayment(id){
  if(SESSION.role !== 'management') return;
  const deletedPayment = DB.payments.find(x => x.id === id);
  openModal({
    title: 'Delete payment record?',
    body: `<div class="modal-note danger">${ICONS.alert}This deletes the payment and recalculates the fee balance.</div>`,
    confirmLabel: 'Delete payment',
    danger: true,
    onConfirm: () => {
      DB.payments = DB.payments.filter(x => x.id !== id);
      saveDB();
      toast('Payment deleted.');
      if(deletedPayment){
        const fee = feeById(deletedPayment.feeId);
        logAlert('paymentDeleted', 'Payment record deleted', `Payment ${deletedPayment.id} of ${money(deletedPayment.amount)} for ${studentName(deletedPayment.studentId)} (${deletedPayment.studentId})${fee ? ` towards ${fee.type}` : ''} was deleted.`);
      }
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
  const win = window.open('', '_blank', 'width=460,height=640');
  win.document.write(`<!doctype html><html><head><title>Receipt ${esc(p.receipt)}</title>
    <style>
      @page{ size: 105mm 148mm; margin: 6mm; }  /* A6 portrait */
      *{ box-sizing: border-box; }
      html,body{ margin:0; }
      body{ font-family: Arial, sans-serif; padding: 0; color:#1C2230; width: 93mm; max-height: 136mm; overflow: hidden; page-break-inside: avoid; break-inside: avoid; }
      @media screen{ body{ margin: 0 auto; padding: 6mm; width: 105mm; max-height: none; overflow: visible; } }
      .letterhead{ display:flex; align-items:center; gap:10px; margin-bottom: 8px; }
      .letterhead .badge-mark{ width:38px; height:38px; border-radius:9px; background:#1F3B57; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:15px; overflow:hidden; flex:none; }
      .letterhead .badge-mark img{ width:100%; height:100%; object-fit:cover; }
      h1{ font-size:14px; margin: 0 0 2px; }
      .addr{ font-size: 9.5px; color:#5B6472; line-height:1.3; }
      table{ width:100%; border-collapse: collapse; margin-top: 6px; }
      td{ padding: 4px 0; border-bottom: 1px solid #E4DFD1; font-size: 11px; }
      td.k{ color:#5B6472; }
      td.v{ text-align:right; font-weight:600; }
      .total{ font-size: 13px; margin-top: 8px; display:flex; justify-content:space-between; font-weight:700; padding-top:2px; }
      .signoff{ display:flex; justify-content:space-between; align-items:flex-end; margin-top: 10px; }
      .signoff .box{ text-align:center; width: 44%; }
      .signoff .line{ height: 70px; }
      .signoff .label{ font-size: 10px; color:#5B6472; }
    </style></head><body>
    <div class="letterhead">
      <div class="badge-mark">${DB.school.logo ? `<img src="${DB.school.logo}">` : 'IS'}</div>
      <div><h1>${esc(DB.school.name)}</h1><div class="addr">${esc(DB.school.address)}<br>Phone: ${esc(DB.school.phone)}</div></div>
    </div>
    <h2 style="font-size:12px;margin:0;border-top:1px solid #E4DFD1;border-bottom:1px solid #E4DFD1;padding:5px 0;">Fee payment receipt</h2>
    <table>
      <tr><td class="k">Receipt no.</td><td class="v">${esc(p.receipt)}</td></tr>
      <tr><td class="k">Date</td><td class="v">${fmtDate(p.date)}</td></tr>
      <tr><td class="k">Student</td><td class="v">${esc(s ? s.name : studentName(p.studentId))}</td></tr>
      <tr><td class="k">Admission No.</td><td class="v">${esc(p.studentId)}</td></tr>
      <tr><td class="k">Class</td><td class="v">${studentClassLabel(p.studentId)}</td></tr>
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
   Attendance + Report cards
   Both are pushed to the Parent Portal by syncParentPortal() on every
   save. Only PUBLISHED report cards reach parents; attendance goes out
   as soon as it is saved.

   Storage (kept compact so the single cloud document stays small):
   DB.attendance = { 'yyyy-mm-dd': { '9-A': { a:[absent ids], l:[late ids], n:{ id:'note' } } } }
     -> a class/day entry means "attendance was taken"; anyone not listed was Present.
   DB.exams = [{ id, name, year, date, class, section, subjects:[{name,max}],
                 results:{ studentId:{ m:{ subject: marks|null }, r:'remarks' } }, published }]
   --------------------------------------------------------------- */
const GRADE_SCALE = [[90,'A+'],[80,'A'],[70,'B+'],[60,'B'],[50,'C'],[40,'D'],[0,'E']];
function gradeFor(pct){
  if(pct == null || isNaN(pct)) return '\u2014';
  for(const [min, g] of GRADE_SCALE){ if(pct >= min) return g; }
  return 'E';
}
function todayISO(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function academicYearNow(){
  const d = new Date(), y = d.getFullYear();
  return d.getMonth() >= 5 ? `${y}-${String((y+1)%100).padStart(2,'0')}` : `${y-1}-${String(y%100).padStart(2,'0')}`;
}
function clsKey(s){
  const c = String(s.class == null ? '' : s.class).trim();
  const sec = String(s.section || '').trim();
  return c + (sec ? '-' + sec : '');
}
function classKeyList(){
  return [...new Set(DB.students.map(clsKey).filter(Boolean))].sort((a,b) => a.localeCompare(b, undefined, { numeric:true }));
}
function minAttendance(){
  const n = Number(DB.school && DB.school.minAttendance);
  return n > 0 && n <= 100 ? n : 75;
}
function fmtNum(n){ return Number.isInteger(n) ? String(n) : (Math.round(n*10)/10).toString(); }

/* ---------- Attendance: data ---------- */
function attendanceForStudent(s){
  const key = clsKey(s), out = [];
  Object.keys(DB.attendance || {}).sort().forEach(date => {
    const rec = DB.attendance[date] && DB.attendance[date][key];
    if(!rec) return;
    if(s.admissionDate && s.admissionDate > date) return;   // not yet admitted that day
    const status = (rec.a || []).includes(s.id) ? 'Absent' : (rec.l || []).includes(s.id) ? 'Late' : 'Present';
    const row = { date, status };
    const note = rec.n && rec.n[s.id];
    if(note) row.note = note;
    out.push(row);
  });
  return out;
}
function attSummary(list){
  const present = list.filter(a => a.status === 'Present').length;
  const absent  = list.filter(a => a.status === 'Absent').length;
  const late    = list.filter(a => a.status === 'Late').length;
  const total = list.length;
  // A late arrival still counts as attended (same rule as the Parent Portal).
  return { present, absent, late, total, pct: total ? ((present + late) / total) * 100 : null };
}
function attStudentsFor(key, date){
  return DB.students
    .filter(s => clsKey(s) === key && (!s.admissionDate || s.admissionDate <= date))
    .sort((a,b) => a.name.localeCompare(b.name));
}

/* ---------- Attendance: page ---------- */
let attState = { view:'mark', date:'', key:'', month:'', rows:{}, existing:false };

function renderAttendance(){
  setTopbar('Attendance', 'Mark daily attendance \u2014 parents see it in the Parent Portal');
  if(!attState.date) attState.date = todayISO();
  const keys = classKeyList();
  if(!attState.key || !keys.includes(attState.key)) attState.key = keys[0] || '';
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div class="chip-toggle" id="attViews">
          <button type="button" data-view="mark" class="${attState.view==='mark'?'active':''}">Mark attendance</button>
          <button type="button" data-view="records" class="${attState.view==='records'?'active':''}">Class records</button>
        </div>
        <div class="toolbar" id="attToolbar"></div>
      </div>
      <div class="panel-body pad0" id="attBody"></div>
    </div>`);
  document.querySelectorAll('#attViews button').forEach(b => b.addEventListener('click', () => {
    attState.view = b.dataset.view;
    document.querySelectorAll('#attViews button').forEach(x => x.classList.toggle('active', x === b));
    paintAttendance();
  }));
  const body = document.getElementById('attBody');
  body.addEventListener('click', (e) => {
    const stBtn = e.target.closest('[data-st]');
    if(stBtn){
      const id = stBtn.closest('[data-id]').dataset.id;
      if(attState.rows[id]){ attState.rows[id].status = stBtn.dataset.st; refreshAttRow(id); }
      return;
    }
    if(e.target.closest('#btnAllPresent')){ Object.values(attState.rows).forEach(r => { r.status = 'Present'; }); paintAttMark(); return; }
    if(e.target.closest('#btnSaveAtt')){ saveAttendance(); return; }
    if(e.target.closest('#btnClearAtt')){ confirmClearAttendance(); return; }
  });
  body.addEventListener('input', (e) => {
    if(e.target.classList.contains('att-note')){
      const id = e.target.dataset.id;
      if(attState.rows[id]) attState.rows[id].note = e.target.value;
    }
  });
  paintAttendance();
}

function paintAttendance(){
  const keys = classKeyList();
  const tb = document.getElementById('attToolbar');
  const clsSel = `<select id="attClass" style="width:150px">${keys.map(k => `<option value="${esc(k)}" ${k===attState.key?'selected':''}>Class ${esc(k)}</option>`).join('')}</select>`;
  tb.innerHTML = attState.view === 'mark'
    ? `${dateInputHTML('attDate', attState.date, { max: todayISO(), style: 'width:170px' })}${clsSel}`
    : `${clsSel}<input type="month" id="attMonth" value="${esc(attState.month)}" style="width:160px" title="Leave empty for all months">
       <button class="btn" id="btnPrintAtt">${ICONS.print}Print</button>`;
  const dateEl = document.getElementById('attDate');
  if(dateEl) dateEl.addEventListener('change', () => {
    const v = dateVal('attDate');
    if(!v){ toast('Enter the date as DD-MM-YYYY.', true); return; }
    if(v > todayISO()){ toast('Attendance cannot be marked for a future date.', true); dateEl.value = isoToDMY(attState.date); dateVal('attDate'); return; }
    attState.date = v; paintAttMark(true);
  });
  const monthEl = document.getElementById('attMonth');
  if(monthEl) monthEl.addEventListener('change', e => { attState.month = e.target.value; paintAttRecords(); });
  const printBtn = document.getElementById('btnPrintAtt');
  if(printBtn) printBtn.addEventListener('click', () => {
    printContainer(`Attendance records \u2014 Class ${attState.key}${attState.month ? ' \u00b7 ' + fmtMonth(attState.month) : ''}`, 'attRecordsArea');
  });
  const clsEl = document.getElementById('attClass');
  if(clsEl) clsEl.addEventListener('change', e => { attState.key = e.target.value; attState.view === 'mark' ? paintAttMark(true) : paintAttRecords(); });
  if(attState.view === 'mark') paintAttMark(true); else paintAttRecords();
}

/* Build the editable rows (from a saved record if this class/day was already marked). */
function loadAttRows(){
  const students = attStudentsFor(attState.key, attState.date);
  const rec = DB.attendance[attState.date] && DB.attendance[attState.date][attState.key];
  attState.existing = !!rec;
  attState.rows = {};
  students.forEach(s => {
    const st = rec ? ((rec.a||[]).includes(s.id) ? 'Absent' : (rec.l||[]).includes(s.id) ? 'Late' : 'Present') : 'Present';
    attState.rows[s.id] = { status: st, note: (rec && rec.n && rec.n[s.id]) || '' };
  });
}

function paintAttMark(reload){
  const body = document.getElementById('attBody');
  if(!body) return;
  if(!attState.key){
    body.innerHTML = `<div class="empty-state">${ICONS.students}<h3>No classes yet</h3><p>Add students first, then you can mark their attendance here.</p></div>`;
    return;
  }
  if(reload) loadAttRows();
  const students = attStudentsFor(attState.key, attState.date);
  if(!students.length){
    body.innerHTML = `<div class="empty-state">${ICONS.students}<h3>No students in Class ${esc(attState.key)} on this date</h3></div>`;
    return;
  }
  body.innerHTML = `
    <div class="att-bar">
      <div class="small-note" id="attCounts"></div>
      ${attState.existing ? `<span class="tag tag-partial">Already marked \u2014 editing</span>` : ''}
      <span style="flex:1"></span>
      <button class="btn btn-sm" id="btnAllPresent">Mark all present</button>
      ${attState.existing ? `<button class="btn btn-sm btn-danger" id="btnClearAtt">Clear this day</button>` : ''}
      <button class="btn btn-primary" id="btnSaveAtt">Save attendance</button>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>Adm. No.</th><th>Name</th><th>Status</th><th>Note (optional)</th></tr></thead>
      <tbody>${students.map(s => `<tr>
        <td>${esc(s.id)}</td><td>${esc(s.name)}</td>
        <td><div class="att-seg" data-id="${esc(s.id)}">${['Present','Absent','Late'].map(st => `<button type="button" data-st="${st}"></button>`).join('')}</div></td>
        <td><input type="text" class="att-note" data-id="${esc(s.id)}" value="${esc(attState.rows[s.id].note)}" placeholder="e.g. Fever" maxlength="60"></td>
      </tr>`).join('')}</tbody>
    </table></div>`;
  students.forEach(s => refreshAttRow(s.id));
}

function refreshAttRow(id){
  const seg = document.querySelector(`.att-seg[data-id="${CSS.escape(id)}"]`);
  if(seg){
    seg.querySelectorAll('button').forEach(b => {
      const st = b.dataset.st;
      b.textContent = st;
      b.className = attState.rows[id].status === st ? 'on ' + st.toLowerCase() : '';
    });
  }
  const vals = Object.values(attState.rows);
  const c = st => vals.filter(r => r.status === st).length;
  const el = document.getElementById('attCounts');
  if(el) el.textContent = `${c('Present')} present \u00b7 ${c('Absent')} absent \u00b7 ${c('Late')} late \u00b7 ${vals.length} students`;
}

function saveAttendance(){
  if(!can('mark-attendance')) return;
  const { date, key, rows } = attState;
  if(!date || !key) return;
  const ids = Object.keys(rows);
  const rec = { a: ids.filter(id => rows[id].status === 'Absent'), l: ids.filter(id => rows[id].status === 'Late'), n: {} };
  ids.forEach(id => {
    const note = (rows[id].note || '').trim();
    if(note && rows[id].status !== 'Present') rec.n[id] = note;
  });
  if(!DB.attendance[date]) DB.attendance[date] = {};
  DB.attendance[date][key] = rec;
  saveDB();
  attState.existing = true;
  paintAttMark(false);
  toast(`Attendance saved for Class ${key} \u00b7 ${fmtDate(date)}.`);
  if(rec.a.length && cloudDocRef) offerAbsenceNotice(rec.a, date);
}

function offerAbsenceNotice(ids, date){
  openModal({
    title: 'Notify parents of absent students?',
    body: `<p>${ids.length} ${ids.length === 1 ? 'student was' : 'students were'} marked absent on ${fmtDate(date)}. Send a notice to ${ids.length === 1 ? 'that parent' : 'those parents'} in the Parent Portal?</p>
           <p class="small-note" style="margin-top:8px;">Attendance itself is already visible to parents \u2014 this just sends a notification as well.</p>`,
    confirmLabel: 'Send notice',
    onConfirm: () => {
      firebase.firestore().collection('notifications').add({
        kind: 'announcement',
        audience: { type:'students', ids },
        title: 'Absence recorded',
        message: `Your child was marked absent on ${fmtDate(date)}. If this was unexpected, or a leave note is needed, please contact the school office.`,
        recipientCount: ids.length, totalOutstanding: null,
        createdAt: Date.now(), createdBy: (cloudUser && cloudUser.email) || 'unknown'
      }).then(() => toast('Notice sent.')).catch(err => { console.error(err); toast('Could not send \u2014 check your connection.', true); });
      return true;
    }
  });
}

function confirmClearAttendance(){
  const { date, key } = attState;
  openModal({
    title: 'Clear this day\u2019s attendance?',
    body: `<div class="modal-note danger">${ICONS.alert}This removes the attendance record for Class ${esc(key)} on ${fmtDate(date)}. Parents will no longer see that day.</div>`,
    confirmLabel: 'Clear', danger: true,
    onConfirm: () => {
      if(DB.attendance[date]){
        delete DB.attendance[date][key];
        if(!Object.keys(DB.attendance[date]).length) delete DB.attendance[date];
      }
      saveDB();
      paintAttMark(true);
      toast('Attendance cleared.');
      return true;
    }
  });
}

function paintAttRecords(){
  const body = document.getElementById('attBody');
  if(!body) return;
  const students = DB.students.filter(s => clsKey(s) === attState.key).sort((a,b) => a.name.localeCompare(b.name));
  if(!students.length){
    body.innerHTML = `<div class="empty-state">${ICONS.students}<h3>No students in this class</h3></div>`;
    return;
  }
  const min = minAttendance();
  const rows = students.map(s => {
    const list = attendanceForStudent(s).filter(a => !attState.month || a.date.startsWith(attState.month));
    return { s, sum: attSummary(list) };
  });
  const days = Math.max(0, ...rows.map(r => r.sum.total));
  body.innerHTML = `
    <div class="att-bar"><div class="small-note">${days ? `${days} school day${days===1?'':'s'} marked${attState.month ? ' in this month' : ''} \u00b7 minimum ${min}%` : 'No attendance has been marked for this class yet.'}</div></div>
    <div id="attRecordsArea"><div class="table-wrap"><table>
      <thead><tr><th>Adm. No.</th><th>Name</th><th class="num">Present</th><th class="num">Absent</th><th class="num">Late</th><th class="num">Attendance</th></tr></thead>
      <tbody>${rows.map(({ s, sum }) => `<tr>
        <td>${esc(s.id)}</td><td>${esc(s.name)}</td>
        <td class="num">${sum.present}</td><td class="num">${sum.absent}</td><td class="num">${sum.late}</td>
        <td class="num">${sum.pct == null ? '\u2014' : `<span class="tag ${sum.pct < min ? 'tag-pending' : 'tag-paid'}">${sum.pct.toFixed(1)}%</span>`}</td>
      </tr>`).join('')}</tbody>
    </table></div></div>`;
}

/* ---------- Report cards: data ---------- */
function examStudents(exam){
  const cls = String(exam.class).trim(), sec = String(exam.section || '').trim();
  return DB.students
    .filter(s => String(s.class == null ? '' : s.class).trim() === cls && (!sec || String(s.section || '').trim() === sec))
    .sort((a,b) => a.name.localeCompare(b.name));
}
function markValue(res, subName){
  const v = res && res.m ? res.m[subName] : null;
  return (v === '' || v == null || isNaN(Number(v))) ? null : Number(v);
}
function examStats(exam, res){
  let total = 0, max = 0, any = false;
  exam.subjects.forEach(sub => {
    const v = markValue(res, sub.name);
    if(v != null){ any = true; total += v; max += Number(sub.max); }
  });
  const pct = max ? (total / max) * 100 : null;
  return { any, total, max, pct, grade: any ? gradeFor(pct) : '\u2014' };
}
/* Competition ranking by percentage (ties share a rank). */
function examRanks(exam, results){
  const scored = examStudents(exam)
    .map(s => ({ id: s.id, st: examStats(exam, results[s.id]) }))
    .filter(x => x.st.any)
    .sort((a,b) => b.st.pct - a.st.pct);
  const ranks = {};
  scored.forEach((x, i) => { ranks[x.id] = (i > 0 && x.st.pct === scored[i-1].st.pct) ? ranks[scored[i-1].id] : i + 1; });
  return ranks;
}
function examEnteredCount(exam){
  return examStudents(exam).filter(s => examStats(exam, (exam.results || {})[s.id]).any).length;
}
/* What a parent sees: only published exams, only if that student has marks. */
function parentReportCardsFor(s, rankCache){
  const out = [];
  (DB.exams || []).forEach(exam => {
    if(!exam.published) return;
    const res = (exam.results || {})[s.id];
    if(!res) return;
    if(!examStudents(exam).some(x => x.id === s.id)) return;
    const st = examStats(exam, res);
    if(!st.any) return;
    if(!rankCache[exam.id]) rankCache[exam.id] = examRanks(exam, exam.results || {});
    out.push({
      exam: exam.name, year: exam.year || '', date: exam.date || '',
      rank: rankCache[exam.id][s.id] || null,
      remarks: res.r || '',
      grade: st.grade,
      subjects: exam.subjects.map(sub => {
        const v = markValue(res, sub.name);
        return { name: sub.name, marks: v, max: Number(sub.max), grade: v == null ? 'AB' : gradeFor((v / Number(sub.max)) * 100) };
      })
    });
  });
  return out;
}

/* ---------- Report cards: exam list ---------- */
function renderReportCards(){
  setTopbar('Report cards', 'Enter exam marks, then publish results to the Parent Portal');
  const canPublish = SESSION.role === 'management';
  const exams = [...DB.exams].sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div><h3>Exams</h3><div class="sub">Parents only see an exam after it is published${cloudDocRef ? '' : ' (cloud sync is off, so nothing reaches the Parent Portal yet)'}</div></div>
        <button class="btn btn-primary" id="btnNewExam">${ICONS.plus}New exam</button>
      </div>
      <div class="panel-body pad0">${exams.length ? `<div class="table-wrap"><table>
        <thead><tr><th>Exam</th><th>Class</th><th>Year</th><th>Date</th><th class="num">Marks entered</th><th>Status</th><th></th></tr></thead>
        <tbody>${exams.map(x => { const total = examStudents(x).length; return `<tr>
          <td><b>${esc(x.name)}</b><div class="small-note">${x.subjects.length} subject${x.subjects.length===1?'':'s'}</div></td>
          <td>${esc(x.class)}${x.section ? '-' + esc(x.section) : ' (all sections)'}</td>
          <td>${esc(x.year || '\u2014')}</td><td>${fmtDate(x.date)}</td>
          <td class="num">${examEnteredCount(x)} / ${total}</td>
          <td>${x.published ? '<span class="tag tag-paid">Published</span>' : '<span class="tag tag-partial">Draft</span>'}</td>
          <td><div class="row-actions">
            <button class="btn btn-sm" data-open="${x.id}">Enter marks</button>
            <button class="btn btn-sm btn-ghost" data-setup="${x.id}" title="Edit exam details">${ICONS.edit}</button>
            ${canPublish ? `<button class="btn btn-sm ${x.published ? '' : 'btn-accent'}" data-pub="${x.id}">${x.published ? 'Unpublish' : 'Publish'}</button>
            <button class="btn btn-sm btn-ghost" data-del="${x.id}" title="Delete exam">${ICONS.trash}</button>` : ''}
          </div></td></tr>`; }).join('')}</tbody></table></div>`
        : `<div class="empty-state">${ICONS.grad}<h3>No exams yet</h3><p>Create an exam for a class, enter each student's marks, then publish it to parents.</p></div>`}
      </div>
    </div>`);
  document.getElementById('btnNewExam').addEventListener('click', () => openExamModal());
  document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => { edState = null; navigate('report-exam', { id: b.dataset.open }); }));
  document.querySelectorAll('[data-setup]').forEach(b => b.addEventListener('click', () => openExamModal(b.dataset.setup)));
  document.querySelectorAll('[data-pub]').forEach(b => b.addEventListener('click', () => togglePublish(b.dataset.pub)));
  document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => confirmDeleteExam(b.dataset.del)));
}

function parseSubjects(text, defMax){
  const seen = new Set(), out = [];
  for(const raw of String(text).split(/[,\n]/)){
    const part = raw.trim();
    if(!part) continue;
    const m = part.match(/^(.*?)[:=]\s*(\d+(?:\.\d+)?)$/);
    const name = (m ? m[1] : part).trim();
    const max = m ? Number(m[2]) : defMax;
    if(!name || !(max > 0)) return null;
    if(seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    out.push({ name, max });
  }
  return out.length ? out : null;
}

const EXAM_NAMES = ['Unit Test 1','Unit Test 2','Quarterly','Half-Yearly','Pre-Final','Annual'];
function openExamModal(id){
  const x = id ? DB.exams.find(e => e.id === id) : null;
  const classes = [...new Set(DB.students.map(s => String(s.class == null ? '' : s.class).trim()).filter(Boolean))].sort((a,b) => a.localeCompare(b, undefined, { numeric:true }));
  const sections = [...new Set(DB.students.map(s => String(s.section || '').trim()).filter(Boolean))].sort();
  if(!classes.length){ toast('Add students first.', true); return; }
  const known = x ? EXAM_NAMES.includes(x.name) : true;
  const defaultSubjects = x ? x.subjects.map(s => `${s.name}${s.max !== 100 ? ':' + s.max : ''}`).join(', ') : 'Telugu, English, Hindi, Maths, Science, Social Studies';
  openModal({
    title: x ? 'Edit exam' : 'New exam',
    body: `
      <div class="field-row">
        <div class="field"><label>Exam</label><select id="ex_name">${EXAM_NAMES.map(n => `<option ${x && x.name===n?'selected':''}>${n}</option>`).join('')}<option value="__other" ${x && !known ? 'selected' : ''}>Other\u2026</option></select></div>
        <div class="field" id="ex_otherWrap" style="display:${x && !known ? 'block' : 'none'};"><label>Exam name</label><input type="text" id="ex_other" value="${esc(x && !known ? x.name : '')}" maxlength="40"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Academic year</label><input type="text" id="ex_year" value="${esc(x ? x.year : academicYearNow())}" placeholder="2026-27"></div>
        <div class="field"><label>Exam date</label>${dateInputHTML('ex_date', x ? x.date : todayISO())}</div>
      </div>
      <div class="field-row">
        <div class="field"><label>Class</label><select id="ex_class">${classes.map(c => `<option ${x && String(x.class)===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div>
        <div class="field"><label>Section</label><select id="ex_section"><option value="">All sections</option>${sections.map(c => `<option ${x && x.section===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>Subjects (comma separated)</label><textarea id="ex_subjects" rows="3">${esc(defaultSubjects)}</textarea>
        <div class="field-help">Each subject is out of the default marks below. For a different maximum write it like <b>Maths:50</b>.</div></div>
      <div class="field" style="max-width:200px;"><label>Default maximum marks</label><input type="number" id="ex_max" value="100" min="1"></div>
      ${x ? `<p class="small-note">Renaming a subject clears the marks already entered for it.</p>` : ''}`,
    confirmLabel: x ? 'Save changes' : 'Create exam',
    onConfirm: () => {
      const sel = document.getElementById('ex_name').value;
      const name = (sel === '__other' ? document.getElementById('ex_other').value : sel).trim();
      const year = document.getElementById('ex_year').value.trim();
      const date = dateVal('ex_date');
      if(!date){ toast('Enter the exam date as DD-MM-YYYY.', true); return false; }
      const cls = document.getElementById('ex_class').value;
      const section = document.getElementById('ex_section').value;
      const subjects = parseSubjects(document.getElementById('ex_subjects').value, Number(document.getElementById('ex_max').value) || 100);
      if(!name){ toast('Enter the exam name.', true); return false; }
      if(!subjects){ toast('Enter at least one subject (e.g. Maths or Maths:50).', true); return false; }
      if(x){
        Object.assign(x, { name, year, date, class: cls, section, subjects });
        saveDB(); toast('Exam updated.'); renderReportCards();
      }else{
        const ex = { id: nextId('X', DB.exams, 3), name, year, date, class: cls, section, subjects, results: {}, published: false };
        DB.exams.push(ex); saveDB(); edState = null; navigate('report-exam', { id: ex.id });
      }
      return true;
    }
  });
  document.getElementById('ex_name').addEventListener('change', e => {
    document.getElementById('ex_otherWrap').style.display = e.target.value === '__other' ? 'block' : 'none';
  });
}

/* ---------- Report cards: marks entry ---------- */
let edState = null;   // { id, results } \u2014 unsaved working copy so a background sync never wipes typing

function renderExamEditor(){
  const exam = DB.exams.find(e => e.id === VIEW.params.id);
  if(!exam){
    setTopbar('Exam not found', '');
    setContent(`<div class="empty-state">${ICONS.grad}<h3>This exam no longer exists</h3><button class="btn btn-primary" id="btnBackExams">Back to report cards</button></div>`);
    document.getElementById('btnBackExams').addEventListener('click', () => navigate('reportcards'));
    return;
  }
  const navBtn = document.querySelector('.nav-item[data-tab="reportcards"]');
  if(navBtn) navBtn.classList.add('active');
  const students = examStudents(exam);
  setTopbar(`${exam.name} \u00b7 Class ${exam.class}${exam.section ? '-' + exam.section : ''}`, `${exam.year || ''} \u00b7 ${fmtDate(exam.date)}`);
  if(!edState || edState.id !== exam.id) edState = { id: exam.id, results: JSON.parse(JSON.stringify(exam.results || {})) };
  const canPublish = SESSION.role === 'management';

  if(!students.length){
    setContent(`<div class="empty-state">${ICONS.students}<h3>No students in this class</h3><button class="btn btn-primary" id="btnBackExams">Back</button></div>`);
    document.getElementById('btnBackExams').addEventListener('click', () => navigate('reportcards'));
    return;
  }
  setContent(`
    <div class="panel">
      <div class="panel-head">
        <div><h3>Enter marks</h3><div class="sub">Leave a box empty if the student was absent for that subject. ${exam.published ? '<b>Published</b> \u2014 saving updates what parents see.' : 'Draft \u2014 parents cannot see this yet.'}</div></div>
        <div class="toolbar">
          <button class="btn" id="btnBackExams">Back</button>
          <button class="btn btn-primary" id="btnSaveMarks">Save marks</button>
          ${canPublish ? `<button class="btn ${exam.published ? '' : 'btn-accent'}" id="btnPubExam">${exam.published ? 'Unpublish' : 'Save & publish'}</button>` : ''}
        </div>
      </div>
      <div class="panel-body pad0"><div class="table-wrap"><table class="marks-grid" id="edTable">
        <thead><tr><th>Adm. No.</th><th>Name</th>
          ${exam.subjects.map(sub => `<th class="num">${esc(sub.name)}<div class="th-sub">/ ${fmtNum(sub.max)}</div></th>`).join('')}
          <th class="num">Total</th><th class="num">%</th><th>Grade</th><th class="num">Rank</th><th>Remarks</th></tr></thead>
        <tbody>${students.map(s => { const res = edState.results[s.id] || {}; return `<tr data-sid="${esc(s.id)}">
          <td>${esc(s.id)}</td><td>${esc(s.name)}</td>
          ${exam.subjects.map(sub => { const v = markValue(res, sub.name); return `<td class="num"><input type="number" class="mk" data-sub="${esc(sub.name)}" min="0" max="${sub.max}" step="any" inputmode="decimal" value="${v == null ? '' : v}"></td>`; }).join('')}
          <td class="num ed-total"></td><td class="num ed-pct"></td><td class="ed-grade"></td><td class="num ed-rank"></td>
          <td><input type="text" class="rem" value="${esc(res.r || '')}" maxlength="120" placeholder="Optional"></td>
        </tr>`; }).join('')}</tbody>
      </table></div></div>
    </div>`);
  const tbl = document.getElementById('edTable');
  tbl.addEventListener('input', (e) => {
    const tr = e.target.closest('tr[data-sid]');
    if(!tr) return;
    const sid = tr.dataset.sid;
    if(!edState.results[sid]) edState.results[sid] = { m: {}, r: '' };
    const r = edState.results[sid];
    if(e.target.classList.contains('mk')){
      const sub = exam.subjects.find(x => x.name === e.target.dataset.sub);
      const val = e.target.value;
      r.m[sub.name] = val === '' ? null : Number(val);
      e.target.classList.toggle('bad', val !== '' && (Number(val) < 0 || Number(val) > sub.max));
      updateEdComputed(exam, students);
    }else if(e.target.classList.contains('rem')){
      r.r = e.target.value;
    }
  });
  document.getElementById('btnBackExams').addEventListener('click', () => { edState = null; navigate('reportcards'); });
  document.getElementById('btnSaveMarks').addEventListener('click', () => { if(saveMarks(exam)) toast('Marks saved.'); });
  const pub = document.getElementById('btnPubExam');
  if(pub) pub.addEventListener('click', () => { if(exam.published) togglePublish(exam.id); else if(saveMarks(exam)) togglePublish(exam.id); });
  updateEdComputed(exam, students);
}

function updateEdComputed(exam, students){
  const ranks = examRanks(exam, edState.results);
  students.forEach(s => {
    const tr = document.querySelector(`tr[data-sid="${CSS.escape(s.id)}"]`);
    if(!tr) return;
    const st = examStats(exam, edState.results[s.id]);
    tr.querySelector('.ed-total').textContent = st.any ? `${fmtNum(st.total)}/${fmtNum(st.max)}` : '\u2014';
    tr.querySelector('.ed-pct').textContent = st.any ? st.pct.toFixed(1) + '%' : '\u2014';
    tr.querySelector('.ed-grade').innerHTML = st.any ? `<b>${esc(st.grade)}</b>` : '\u2014';
    tr.querySelector('.ed-rank').textContent = ranks[s.id] ? '#' + ranks[s.id] : '\u2014';
  });
}

function saveMarks(exam){
  if(!can('enter-marks') || !edState || edState.id !== exam.id) return false;
  if(document.querySelector('#edTable .mk.bad')){ toast(`Some marks are outside 0\u2013maximum. Fix the red boxes first.`, true); return false; }
  const clean = {};
  Object.keys(edState.results).forEach(sid => {
    const r = edState.results[sid];
    const hasMarks = exam.subjects.some(sub => markValue(r, sub.name) != null);
    const rem = (r.r || '').trim();
    if(!hasMarks && !rem) return;
    const m = {};
    exam.subjects.forEach(sub => { m[sub.name] = markValue(r, sub.name); });
    clean[sid] = { m, r: rem };
  });
  exam.results = clean;
  saveDB();
  return true;
}

function togglePublish(id){
  if(SESSION.role !== 'management') return;
  const exam = DB.exams.find(e => e.id === id);
  if(!exam) return;
  const n = examEnteredCount(exam);
  const done = () => { if(VIEW.tab === 'report-exam') renderExamEditor(); else renderReportCards(); };
  if(exam.published){
    openModal({
      title: 'Unpublish this exam?',
      body: `<p>Parents will no longer see <b>${esc(exam.name)}</b> in their Grades tab. Your marks are kept.</p>`,
      confirmLabel: 'Unpublish',
      onConfirm: () => { exam.published = false; saveDB(); toast('Exam unpublished.'); done(); return true; }
    });
    return;
  }
  if(!n){ toast('Enter some marks before publishing.', true); return; }
  const publish = (notify) => {
    exam.published = true; saveDB();
    toast('Published to the Parent Portal.');
    if(notify && cloudDocRef){
      const ids = examStudents(exam).filter(s => examStats(exam, exam.results[s.id]).any).map(s => s.id);
      firebase.firestore().collection('notifications').add({
        kind: 'announcement', audience: { type:'students', ids },
        title: `Report card published \u2014 ${exam.name}`,
        message: `${exam.name}${exam.year ? ' (' + exam.year + ')' : ''} results are now available in the Grades tab.`,
        recipientCount: ids.length, totalOutstanding: null,
        createdAt: Date.now(), createdBy: (cloudUser && cloudUser.email) || 'unknown'
      }).catch(err => { console.error(err); toast('Published, but the notice could not be sent.', true); });
    }
    done();
  };
  openModal({
    title: 'Publish to parents?',
    body: `<p><b>${esc(exam.name)}</b> will become visible to the parents of <b>${n}</b> ${n === 1 ? 'student' : 'students'} in the Parent Portal.</p>
           ${cloudDocRef ? '' : `<div class="modal-note">${ICONS.alert}Cloud sync is off, so parents will not receive anything until it is turned on.</div>`}`,
    confirmLabel: 'Publish only',
    extraButtons: [
      { label: 'Cancel', closeAfter: true, onClick: () => {} },
      ...(cloudDocRef ? [{ label: 'Publish & notify parents', className: 'btn-accent', closeAfter: true, onClick: () => publish(true) }] : [])
    ],
    onConfirm: () => { publish(false); return true; }
  });
}

function confirmDeleteExam(id){
  if(SESSION.role !== 'management') return;
  const exam = DB.exams.find(e => e.id === id);
  if(!exam) return;
  openModal({
    title: 'Delete exam?',
    body: `<div class="modal-note danger">${ICONS.alert}This permanently deletes <b>${esc(exam.name)}</b> (Class ${esc(exam.class)}) and all its marks.${exam.published ? ' Parents will stop seeing it.' : ''}</div>`,
    confirmLabel: 'Delete exam', danger: true,
    onConfirm: () => { DB.exams = DB.exams.filter(e => e.id !== id); saveDB(); toast('Exam deleted.'); renderReportCards(); return true; }
  });
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
        <div class="field"><label>Date</label>${dateInputHTML('e_date', todayISO())}</div>
        <div class="field"><label>Category</label><select id="e_category"><option>Electricity</option><option>Salary</option><option>Stationery</option><option>Maintenance</option><option>School Fee</option><option>Other</option></select></div>
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
      const expDate = dateVal('e_date');
      if(!expDate){ toast('Enter the date as DD-MM-YYYY.', true); return false; }
      DB.expenses.push({
        id: nextId('E', DB.expenses, 3),
        date: expDate,
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
let reportClass = '';

function renderReports(){
  setTopbar('Reports', 'Search and summarize student, fee and payment records');
  const tabs = SESSION.role === 'management'
    ? [ ['pending','Pending & partial fees'], ['collection','Fee collection'], ['discount','Discounts given'], ['classlist','Class-wise list'] ]
    : [ ['classlist','Class-wise list'] ];
  if(!tabs.some(t => t[0] === reportTab)) reportTab = tabs[0][0];
  const rClasses = [...new Set(DB.students.map(s => String(s.class == null ? '' : s.class).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b, undefined, { numeric:true }));
  if(reportClass && !rClasses.includes(reportClass)) reportClass = '';
  setContent(`
    <div class="toolbar" style="justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
      <div class="toolbar" style="gap:10px; flex-wrap:wrap;">
        <div class="chip-toggle">
          ${tabs.map(([id,label]) => `<button class="${reportTab===id?'active':''}" data-report="${id}">${label}</button>`).join('')}
        </div>
        <select id="reportClass" style="width:140px"><option value="">All classes</option>${rClasses.map(c => `<option value="${esc(c)}" ${reportClass===c?'selected':''}>Class ${esc(c)}</option>`).join('')}</select>
      </div>
      <button class="btn" id="btnPrintReport">${ICONS.print}Print</button>
    </div>
    <div id="reportBody"></div>
  `);
  document.querySelectorAll('[data-report]').forEach(b => b.addEventListener('click', () => { reportTab = b.dataset.report; renderReports(); }));
  document.getElementById('reportClass').addEventListener('change', e => { reportClass = e.target.value; paintReportBody(); });
  document.getElementById('btnPrintReport').addEventListener('click', () => {
    const label = (tabs.find(t => t[0] === reportTab) || [null,'Report'])[1] + (reportClass ? ` \u00b7 Class ${reportClass}` : '');
    printContainer(label, 'reportBody');
  });
  paintReportBody();
}

function paintReportBody(){
  const el = document.getElementById('reportBody');
  const inCls = id => {
    if(!reportClass) return true;
    const s = studentById(id);
    return !!s && String(s.class == null ? '' : s.class).trim() === reportClass;
  };
  if(reportTab === 'pending'){
    const rows = DB.fees.map(f => ({fee:f, calc:computeFee(f)})).filter(x => x.calc.status !== 'Paid' && inCls(x.fee.studentId)).sort((a,b)=>b.calc.balance-a.calc.balance);
    el.innerHTML = `<div class="panel"><div class="panel-body pad0">
      ${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Student</th><th>Class</th><th>Fee</th><th class="num">Net</th><th class="num">Paid</th><th class="num">Balance</th><th>Status</th></tr></thead><tbody>
        ${rows.map(({fee:f,calc:c}) => { const s = studentById(f.studentId); return `<tr>
          <td>${studentNameHTML(f.studentId)}</td><td>${studentClassLabel(f.studentId)}</td>
          <td>${esc(f.type)}</td><td class="num">${money(c.net)}</td><td class="num">${money(c.paid)}</td>
          <td class="num">${money(c.balance)}</td><td>${tagForStatus(c.status)}</td>
        </tr>`; }).join('')}
      </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>Nothing pending</h3><p>Every fee record is fully paid.</p></div>`}
    </div></div>`;
  }else if(reportTab === 'collection'){
    const pays = DB.payments.filter(p => inCls(p.studentId));
    const byMethod = {};
    pays.forEach(p => { byMethod[p.method] = (byMethod[p.method]||0) + p.amount; });
    const total = pays.reduce((s,p)=>s+p.amount,0);
    const max = Math.max(1, ...Object.values(byMethod));
    el.innerHTML = `
      <div class="stat-grid"><div class="stat-card success"><div class="label">Total collected</div><div class="value">${money(total)}</div><div class="foot">${pays.length} payments</div></div></div>
      <div class="panel"><div class="panel-head"><h3>Collected by payment method</h3></div><div class="panel-body">
        <div class="bars">${Object.keys(byMethod).map(m => `<div class="bar-row"><span>${esc(m)}</span><div class="bar-track"><div class="bar-fill" style="width:${byMethod[m]/max*100}%"></div></div><span>${money(byMethod[m])}</span></div>`).join('')}</div>
      </div></div>
      <div class="panel"><div class="panel-head"><h3>All payments</h3></div><div class="panel-body pad0">
        <div class="table-wrap"><table><thead><tr><th>Receipt</th><th>Date</th><th>Student</th><th>Method</th><th class="num">Amount</th></tr></thead><tbody>
          ${[...pays].sort((a,b)=>b.date.localeCompare(a.date)).map(p=>`<tr><td>${esc(p.receipt)}</td><td>${fmtDate(p.date)}</td><td>${studentNameHTML(p.studentId)}</td><td>${esc(p.method)}</td><td class="num">${money(p.amount)}</td></tr>`).join('')}
        </tbody></table></div>
      </div></div>`;
  }else if(reportTab === 'discount'){
    const rows = DB.fees.filter(f => Number(f.discount) > 0 && inCls(f.studentId));
    const total = rows.reduce((s,f)=>s+Number(f.discount),0);
    el.innerHTML = `
      <div class="stat-grid"><div class="stat-card accent"><div class="label">Total discount given</div><div class="value">${money(total)}</div><div class="foot">${rows.length} special-case fee record(s)</div></div></div>
      <div class="panel"><div class="panel-body pad0">
        ${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Student</th><th>Fee type</th><th class="num">Original amount</th><th class="num">Discount</th><th>Reason</th></tr></thead><tbody>
          ${rows.map(f => `<tr><td>${studentNameHTML(f.studentId)}</td><td>${esc(f.type)}</td><td class="num">${money(f.amount)}</td><td class="num">${money(f.discount)}</td><td>${esc(f.discountReason)||'\u2014'}</td></tr>`).join('')}
        </tbody></table></div>` : `<div class="empty-state">${ICONS.empty}<h3>No discounts recorded</h3></div>`}
      </div></div>`;
  }else if(reportTab === 'classlist'){
    const groups = {};
    DB.students.filter(s => inCls(s.id)).forEach(s => { const k = `Class ${s.class}${s.section?('-'+s.section):''}`; (groups[k] = groups[k]||[]).push(s); });
    const keys = Object.keys(groups).sort();
    el.innerHTML = keys.map(k => `
      <div class="panel"><div class="panel-head"><h3>${esc(k)}</h3><div class="sub">${groups[k].length} student(s)</div></div>
      <div class="panel-body pad0"><div class="table-wrap"><table><thead><tr><th>Admission No.</th><th>Name</th><th>Father's name</th><th>Phone</th></tr></thead><tbody>
        ${groups[k].map(s => `<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.fatherName)}</td><td>${esc(s.phone)}</td></tr>`).join('')}
      </tbody></table></div></div></div>`).join('') || `<div class="empty-state">${ICONS.empty}<h3>No students yet</h3></div>`;
  }
}

/* ---------------------------------------------------------------
   Notifications — sends fee reminders and announcements that show
   up in the separate Parent Portal app (parent-app/). Requires
   cloud sync to be on and signed in, since that's the only channel
   parents' devices share with this one. See README.md > "Parent
   Portal" for the Firestore collection and security rules this
   needs.
   --------------------------------------------------------------- */
let notifHistoryUnsub = null;
let notifHistoryDocs = [];
let notifSelectMode = false;
let notifSelected = new Set();

function renderNotifications(){
  setTopbar('Notifications', 'Send fee reminders and announcements to the Parent Portal app');
  if(!cloudDocRef){
    setContent(`<div class="empty-state">${ICONS.bell}<h3>Cloud sync required</h3><p>Parent notifications are delivered through cloud sync. Turn it on and sign in first \u2014 see firebase-config.js and Settings.</p></div>`);
    return;
  }
  const classes = [...new Set(DB.students.map(s => s.class).filter(Boolean))].sort();
  setContent(`
    <div class="panel">
      <div class="panel-body">
        <div class="section-title" style="margin-top:0;">Send a notice</div>
        <div class="field-row">
          <div class="field"><label>Type</label>
            <select id="n_kind">
              <option value="announcement">General announcement</option>
              <option value="fee_reminder">Fee reminder</option>
            </select>
          </div>
          <div class="field"><label>Audience</label>
            <select id="n_audienceType">
              <option value="all">All parents</option>
              <option value="class">Specific class</option>
              <option value="student">Specific student</option>
            </select>
          </div>
        </div>
        <div class="field" id="n_classWrap" style="display:none;">
          <label>Class</label>
          <select id="n_class">${classes.map(c => `<option value="${esc(c)}">Class ${esc(c)}</option>`).join('')}</select>
        </div>
        <div class="field" id="n_studentWrap" style="display:none;">
          <label>Student</label>
          <div class="searchable-select">
            <input type="text" id="n_studentInput" placeholder="Search by name or admission no." autocomplete="off">
            <input type="hidden" id="n_student">
            <div class="searchable-select-list" id="n_studentList"></div>
          </div>
        </div>
        <div class="field"><label>Title</label><input type="text" id="n_title" placeholder="e.g. Fee reminder \u2014 Term 2"></div>
        <div class="field"><label>Message</label><textarea id="n_message" rows="4" placeholder="Write your message..."></textarea></div>
        <p class="small-note" id="n_preview" style="margin-bottom:12px;"></p>
        <button class="btn btn-primary" id="btnSendNotif">${ICONS.bell}Send notice</button>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><div><h3>Recently sent</h3><div class="sub">Newest first, visible to parents in the app</div></div>
        <div class="nh-actions" id="notifHistoryActions"></div></div>
      <div class="panel-body pad0" id="notifHistory"><div class="empty-state">${ICONS.empty}<p>Loading\u2026</p></div></div>
    </div>
  `);
  notifSelectMode = false; notifSelected = new Set(); notifHistoryDocs = [];
  wireNotificationComposer();
  loadNotificationHistory();
}

function resolveNotifAudience(){
  const kind = document.getElementById('n_kind').value;
  const audType = document.getElementById('n_audienceType').value;
  let candidates;
  if(audType === 'all') candidates = DB.students.slice();
  else if(audType === 'class'){
    const cls = document.getElementById('n_class').value;
    candidates = DB.students.filter(s => s.class === cls);
  }else{
    const sid = document.getElementById('n_student').value;
    candidates = DB.students.filter(s => s.id === sid);
  }
  if(kind === 'fee_reminder' && audType !== 'student'){
    candidates = candidates.filter(s => feesForStudent(s.id).reduce((sum,f) => sum + computeFee(f).balance, 0) > 0);
  }
  return { kind, audType, candidates };
}

function wireNotificationComposer(){
  const kindSel = document.getElementById('n_kind');
  const audSel = document.getElementById('n_audienceType');
  const classWrap = document.getElementById('n_classWrap');
  const studentWrap = document.getElementById('n_studentWrap');
  const classSel = document.getElementById('n_class');
  const titleInput = document.getElementById('n_title');
  const msgInput = document.getElementById('n_message');
  const preview = document.getElementById('n_preview');

  const items = DB.students.map(s => ({
    value: s.id, label: `${s.name} (Admission No. ${s.id})`,
    sub: `Class ${s.class}${s.section ? '-' + s.section : ''}`,
    searchText: `${s.name} ${s.id}`.toLowerCase()
  }));
  initSearchableSelect('n_studentInput', 'n_studentList', 'n_student', items, { onSelect: updatePreview });

  function applyTemplate(){
    if(kindSel.value === 'fee_reminder' && !titleInput.dataset.touched){
      titleInput.value = 'Fee reminder';
      msgInput.value = 'Dear Parent,\n\nThis is a reminder that a balance remains on your child\u2019s school fees. Kindly visit the school office to clear the pending amount at your earliest convenience.\n\nThank you.';
    }
  }
  function updatePreview(){
    const { kind, candidates } = resolveNotifAudience();
    if(kind === 'fee_reminder'){
      const total = candidates.reduce((sum,s) => sum + feesForStudent(s.id).reduce((a,f) => a + computeFee(f).balance, 0), 0);
      preview.textContent = candidates.length
        ? `Will notify ${candidates.length} parent(s), covering ${money(total)} outstanding.`
        : 'No students in this selection currently have a pending balance.';
    }else{
      preview.textContent = candidates.length ? `Will notify ${candidates.length} parent(s).` : 'Choose a student to notify.';
    }
  }
  function updateVisibility(){
    classWrap.style.display = audSel.value === 'class' ? 'block' : 'none';
    studentWrap.style.display = audSel.value === 'student' ? 'block' : 'none';
    updatePreview();
  }

  titleInput.addEventListener('input', () => { titleInput.dataset.touched = '1'; });
  kindSel.addEventListener('change', () => { applyTemplate(); updatePreview(); });
  audSel.addEventListener('change', updateVisibility);
  classSel.addEventListener('change', updatePreview);
  document.getElementById('btnSendNotif').addEventListener('click', sendNotification);
  updateVisibility();
}

function sendNotification(){
  const title = document.getElementById('n_title').value.trim();
  const message = document.getElementById('n_message').value.trim();
  if(!title || !message){ toast('Enter a title and message.', true); return; }
  const { kind, audType, candidates } = resolveNotifAudience();
  if(!candidates.length){
    toast(kind === 'fee_reminder' ? 'No students in this selection currently have a pending balance.' : 'Choose a student.', true);
    return;
  }
  const audience = kind === 'fee_reminder'
    ? { type:'students', ids: candidates.map(s => s.id) }
    : audType === 'all' ? { type:'all' }
    : audType === 'class' ? { type:'class', class: document.getElementById('n_class').value }
    : { type:'students', ids: candidates.map(s => s.id) };
  const totalOutstanding = kind === 'fee_reminder'
    ? candidates.reduce((sum,s) => sum + feesForStudent(s.id).reduce((a,f) => a + computeFee(f).balance, 0), 0)
    : null;

  openModal({
    title: 'Send this notice?',
    body: `<p>This will be sent to <b>${candidates.length}</b> ${candidates.length === 1 ? 'parent' : 'parents'}${totalOutstanding != null ? `, covering a total outstanding of <b>${money(totalOutstanding)}</b>` : ''}.</p>
           <p class="small-note" style="margin-top:10px;"><b>${esc(title)}</b><br>${esc(message)}</p>`,
    confirmLabel: 'Send now',
    onConfirm: () => {
      firebase.firestore().collection('notifications').add({
        kind, audience, title, message,
        recipientCount: candidates.length,
        totalOutstanding,
        createdAt: Date.now(),
        createdBy: (cloudUser && cloudUser.email) || 'unknown'
      }).then(() => { toast('Notice sent.'); renderNotifications(); })
        .catch(err => { console.error('Send failed', err); toast('Could not send \u2014 check your connection.', true); });
      return true;
    }
  });
}

function audienceLabel(aud){
  if(!aud || aud.type === 'all') return 'All parents';
  if(aud.type === 'class') return `Class ${aud.class}`;
  if(aud.type === 'students') return `${(aud.ids||[]).length} student(s)`;
  return '';
}

function loadNotificationHistory(){
  if(notifHistoryUnsub){ notifHistoryUnsub(); notifHistoryUnsub = null; }
  notifHistoryUnsub = firebase.firestore().collection('notifications').orderBy('createdAt','desc').limit(20)
    .onSnapshot(snap => {
      notifHistoryDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const ids = new Set(notifHistoryDocs.map(n => n.id));
      notifSelected = new Set([...notifSelected].filter(id => ids.has(id)));
      if(!notifHistoryDocs.length) notifSelectMode = false;
      renderNotificationHistory();
    }, err => console.error('Notification history listener error', err));
}

function renderNotificationHistory(){
  const target = document.getElementById('notifHistory');
  const actions = document.getElementById('notifHistoryActions');
  if(!target) return;
  const docs = notifHistoryDocs;

  if(actions){
    if(!docs.length) actions.innerHTML = '';
    else if(!notifSelectMode) actions.innerHTML = `<button class="btn btn-sm" id="nhSelect">Select</button>`;
    else {
      const n = notifSelected.size;
      actions.innerHTML = `
        <button class="btn btn-sm" id="nhAll">${n === docs.length ? 'Deselect all' : 'Select all'}</button>
        <button class="btn btn-sm btn-danger" id="nhClear" ${n ? '' : 'disabled'}>${ICONS.trash}Clear${n ? ' (' + n + ')' : ''}</button>
        <button class="btn btn-sm btn-ghost" id="nhCancel">Cancel</button>`;
    }
    const on = (id, fn) => { const el = document.getElementById(id); if(el) el.addEventListener('click', fn); };
    on('nhSelect', () => { notifSelectMode = true; notifSelected = new Set(); renderNotificationHistory(); });
    on('nhCancel', () => { notifSelectMode = false; notifSelected = new Set(); renderNotificationHistory(); });
    on('nhAll', () => {
      notifSelected = notifSelected.size === docs.length ? new Set() : new Set(docs.map(n => n.id));
      renderNotificationHistory();
    });
    on('nhClear', confirmClearSelectedNotifications);
  }

  target.innerHTML = docs.length ? `<div class="notif-history">${docs.map(n => `
    <div class="notif-history-row ${notifSelectMode ? 'selectable' : ''} ${notifSelected.has(n.id) ? 'selected' : ''}" data-nid="${esc(n.id)}">
      ${notifSelectMode ? `<input type="checkbox" class="nh-check" aria-label="Select notice" ${notifSelected.has(n.id) ? 'checked' : ''}>` : ''}
      <div class="nh-main">
        <div class="nh-top">
          <span class="tag ${n.kind==='fee_reminder' ? 'tag-partial' : 'tag-paid'}">${n.kind==='fee_reminder' ? 'Fee reminder' : n.subtype==='payment_confirmation' ? 'Payment confirmation' : 'Announcement'}</span>
          <span class="nh-time">${n.createdAt ? fmtDateTime(n.createdAt) : ''}</span>
        </div>
        <div class="nh-title">${esc(n.title||'')}</div>
        <div class="nh-msg">${esc(n.message||'')}</div>
        <div class="nh-meta">${esc(audienceLabel(n.audience))} \u00b7 ${n.recipientCount||0} recipient(s)${n.totalOutstanding!=null ? ` \u00b7 ${money(n.totalOutstanding)} outstanding` : ''}</div>
      </div>
    </div>`).join('')}</div>`
    : `<div class="empty-state">${ICONS.empty}<p>No notices sent yet.</p></div>`;

  if(notifSelectMode){
    target.querySelectorAll('.notif-history-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.nid;
        if(notifSelected.has(id)) notifSelected.delete(id); else notifSelected.add(id);
        renderNotificationHistory();
      });
    });
  }
}

function confirmClearSelectedNotifications(){
  const ids = [...notifSelected];
  if(!ids.length) return;
  openModal({
    title: ids.length === 1 ? 'Clear this notice?' : `Clear ${ids.length} notices?`,
    body: `<div class="modal-note danger">${ICONS.alert}${ids.length === 1 ? 'This notice' : 'These notices'} will be permanently deleted and will disappear from the Parent Portal app for every parent who received ${ids.length === 1 ? 'it' : 'them'}.</div>`,
    confirmLabel: 'Clear',
    danger: true,
    onConfirm: () => {
      const db = firebase.firestore();
      const batch = db.batch();
      ids.forEach(id => batch.delete(db.collection('notifications').doc(id)));
      batch.commit()
        .then(() => { toast(ids.length === 1 ? 'Notice cleared.' : `${ids.length} notices cleared.`); })
        .catch(err => { console.error('Clear failed', err); toast('Could not clear \u2014 check your connection.', true); });
      notifSelectMode = false; notifSelected = new Set();
      renderNotificationHistory();
      return true;
    }
  });
}

/* ---------------------------------------------------------------
   Alerts — internal Management notifications. "Recent activity" is
   shown on the Dashboard only, via the topbar bell's own modal
   (openRecentActivityModal). "Alert types" lives behind the gear
   icon next to the Recent activity label there, as its own
   modal (openAlertTypesModal).
   --------------------------------------------------------------- */
function alertPopupPermissionNote(){
  const permission = (typeof Notification !== 'undefined') ? Notification.permission : 'unsupported';
  return permission === 'granted'
    ? `<span class="tag tag-active">Pop-ups allowed</span>`
    : permission === 'denied'
      ? `<span class="tag tag-pending">Pop-ups blocked in browser settings</span>`
      : permission === 'unsupported'
        ? `<span class="tag tag-inactive">Not supported on this device</span>`
        : `<span class="tag tag-partial">Pop-ups not yet allowed</span>`;
}

// Markup for the on/off switches for each alert type. Shared by the
// Settings page and the "Alert types" modal opened from the gear icon
// next to Recent activity.
function alertTypeRowsHTML(){
  const permission = (typeof Notification !== 'undefined') ? Notification.permission : 'unsupported';
  return `
    <div class="panel-body pad0">
      ${ALERT_TYPES.map(t => `
        <div class="alert-type-row">
          <div class="atr-icon">${ICONS[t.icon] || ICONS.bell}</div>
          <div class="atr-text"><div class="atr-label">${esc(t.label)}</div><div class="atr-desc">${esc(t.desc)}</div></div>
          <label class="switch"><input type="checkbox" class="alertTypeToggle" data-type="${t.id}" ${DB.alertSettings[t.id] !== false ? 'checked' : ''}><span class="slider"></span></label>
        </div>
      `).join('')}
      <div class="alert-type-row">
        <div class="atr-icon">${ICONS.bell}</div>
        <div class="atr-text"><div class="atr-label">Show pop-up on this device</div><div class="atr-desc">Also show a device notification when an enabled alert happens, while the app is open. ${alertPopupPermissionNote()}</div></div>
        <label class="switch"><input type="checkbox" id="desktopPopupsToggle" ${DB.alertSettings.desktopPopups !== false ? 'checked' : ''}><span class="slider"></span></label>
      </div>
    </div>
    ${permission === 'default' ? `<div class="panel-body" style="padding-top:0;"><button class="btn btn-primary" id="btnEnablePopups">${ICONS.bell}Allow pop-up notifications</button></div>` : ''}
  `;
}

// Wires whatever alert-type toggles are currently in the DOM \u2014 works
// whether they're on the Settings page or inside the Alert types modal.
function wireAlertTypeToggles(onChangeRerender){
  document.querySelectorAll('.alertTypeToggle').forEach(cb => {
    cb.addEventListener('change', () => {
      DB.alertSettings[cb.dataset.type] = cb.checked;
      saveDB();
      toast(cb.checked ? `${alertTypeMeta(cb.dataset.type).label} alerts turned on.` : `${alertTypeMeta(cb.dataset.type).label} alerts turned off.`);
    });
  });
  const popupsToggle = document.getElementById('desktopPopupsToggle');
  if(popupsToggle){
    popupsToggle.addEventListener('change', () => {
      DB.alertSettings.desktopPopups = popupsToggle.checked;
      saveDB();
      if(popupsToggle.checked && typeof Notification !== 'undefined' && Notification.permission === 'default'){
        requestAlertPermission(onChangeRerender);
      }
    });
  }
  const enableBtn = document.getElementById('btnEnablePopups');
  if(enableBtn){
    enableBtn.addEventListener('click', () => requestAlertPermission(onChangeRerender));
  }
}

// Opens "Alert types" as its own modal \u2014 reached via the gear icon
// next to the Recent activity label in the bell's popover.
function openAlertTypesModal(){
  openModal({
    title: 'Alert types',
    body: `<p class="small-note" style="margin-bottom:12px;">Switch off any you don't need \u2014 switched-off types are neither logged nor shown as pop-ups.</p>${alertTypeRowsHTML()}`,
    confirmLabel: 'Done',
    onConfirm: () => true
  });
  wireAlertTypeToggles(() => { openAlertTypesModal(); });
}

// Markup for just the activity list rows. Shared by the Settings page
// and the Recent activity modal opened from the topbar bell.
function recentActivityRowsHTML(){
  return DB.alertLog.length ? `<div class="notif-history">${DB.alertLog.map(a => {
    const meta = alertTypeMeta(a.type);
    return `<div class="notif-history-row alert-row${a.read ? '' : ' unread'}">
      <div class="nh-top">
        <span class="tag tag-partial">${meta ? ICONS[meta.icon] || '' : ''}${esc(meta ? meta.label : a.type)}</span>
        <span class="nh-time">${fmtDateTime(a.ts)}</span>
      </div>
      <div class="nh-title">${esc(a.title)}</div>
      <div class="nh-msg">${esc(a.message)}</div>
    </div>`;
  }).join('')}</div>` : `<div class="empty-state">${ICONS.empty}<p>No activity yet. Alerts will appear here as students, fees and payments are recorded.</p></div>`;
}

function clearActivityLog(onCleared){
  openModal({
    title: 'Clear activity log?',
    body: `<div class="modal-note danger">${ICONS.alert}This removes all logged alerts from this device. Alert type settings are kept.</div>`,
    confirmLabel: 'Clear log',
    danger: true,
    onConfirm: () => {
      DB.alertLog = [];
      saveDB();
      toast('Activity log cleared.');
      onCleared();
      return true;
    }
  });
}

function markAlertsRead(){
  if(DB.alertLog.some(a => !a.read)){
    DB.alertLog.forEach(a => { a.read = true; });
    saveDB();
    updateAlertBadge();
  }
}

// Recent activity, opened from the topbar bell (Dashboard only). Shows
// only the activity log, with a gear icon that opens Alert types.
function openRecentActivityModal(){
  openModal({
    title: '',
    body: `
      <div class="panel-head" style="padding:0 0 14px;margin:-4px 0 14px;border-bottom:1px solid var(--line);">
        <div style="display:flex;align-items:center;gap:10px;">
          <button class="icon-btn" id="btnAlertTypesFromPopover" aria-label="Alert types" title="Alert types">${ICONS.settings}</button>
          <h3 style="font-size:15.5px;">Recent activity</h3>
        </div>
        <button class="btn btn-sm" id="btnClearAlertsPopover">Clear log</button>
      </div>
      <div id="alertLogWrapPopover">${recentActivityRowsHTML()}</div>
    `,
    confirmLabel: 'Close',
    onConfirm: () => true
  });
  document.getElementById('btnAlertTypesFromPopover').addEventListener('click', openAlertTypesModal);
  document.getElementById('btnClearAlertsPopover').addEventListener('click', () => {
    clearActivityLog(() => {
      const wrap = document.getElementById('alertLogWrapPopover');
      if(wrap) wrap.innerHTML = recentActivityRowsHTML();
    });
  });
  markAlertsRead();
}

/* ---------------------------------------------------------------
   Settings
   --------------------------------------------------------------- */
function renderSettings(){
  setTopbar('Settings', 'School details, password, alerts and data backup');
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
    ${firebaseUsagePanelHTML()}
    <div class="panel">
      <div class="panel-head"><h3>School details</h3></div>
      <div class="panel-body">
        <div class="field"><label>School name</label><input type="text" id="s_name" value="${esc(DB.school.name)}"></div>
        <div class="field"><label>Address</label><input type="text" id="s_address" value="${esc(DB.school.address)}"></div>
        <div class="field"><label>Phone</label><input type="text" id="s_phone" value="${esc(DB.school.phone)}"></div>
        <div class="field"><label>Country code (for WhatsApp/SMS to parents)</label><input type="text" id="s_countryCode" value="${esc(DB.school.countryCode)}" placeholder="91" style="max-width:120px;"></div>
        <div class="field"><label>Minimum attendance (%) \u2014 shown to parents, turns red below this</label><input type="number" id="s_minAtt" value="${esc(minAttendance())}" min="1" max="100" style="max-width:120px;"></div>
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
  wireFirebaseUsagePanel();
  const btnCloudSignOut = document.getElementById('btnCloudSignOut');
  if(btnCloudSignOut) btnCloudSignOut.addEventListener('click', signOutOfCloud);
  document.getElementById('btnSaveSchool').addEventListener('click', () => {
    DB.school.name = document.getElementById('s_name').value.trim() || DB.school.name;
    DB.school.address = document.getElementById('s_address').value.trim();
    DB.school.phone = document.getElementById('s_phone').value.trim();
    DB.school.countryCode = document.getElementById('s_countryCode').value.replace(/\D/g,'').trim() || '91';
    const minAtt = Number(document.getElementById('s_minAtt').value);
    DB.school.minAttendance = minAtt > 0 && minAtt <= 100 ? minAtt : 75;
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

function openModal({ title, body, confirmLabel, onConfirm, danger, extraButtons }){
  const overlay = document.getElementById('modalRoot');
  const extraHtml = (extraButtons || []).map((b, i) => `<button class="btn ${b.className||''}" id="modalExtraBtn${i}">${b.icon||''}${esc(b.label)}</button>`).join('');
  overlay.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal">
        <div class="modal-head"><h3>${esc(title)}</h3><button class="modal-close" id="modalCloseBtn" aria-label="Close">${ICONS.x}</button></div>
        <div class="modal-body">${body}</div>
        <div class="modal-foot">
          ${extraHtml}
          ${extraButtons ? '' : `<button class="btn" id="modalCancelBtn">Cancel</button>`}
          <button class="btn ${danger?'btn-danger':'btn-primary'}" id="modalConfirmBtn" style="margin-left:${extraButtons?'auto':'0'};">${esc(confirmLabel)}</button>
        </div>
      </div>
    </div>
  `;
  const close = () => { overlay.innerHTML = ''; };
  document.getElementById('modalCloseBtn').addEventListener('click', close);
  const cancelBtn = document.getElementById('modalCancelBtn');
  if(cancelBtn) cancelBtn.addEventListener('click', close);
  document.getElementById('modalOverlay').addEventListener('click', (e) => { if(e.target.id === 'modalOverlay') close(); });
  document.getElementById('modalConfirmBtn').addEventListener('click', () => {
    const ok = onConfirm();
    if(ok !== false) close();
  });
  (extraButtons || []).forEach((b, i) => {
    document.getElementById(`modalExtraBtn${i}`).addEventListener('click', () => {
      b.onClick();
      if(b.closeAfter) close();
    });
  });
}

/* ---------------------------------------------------------------
   Firebase usage meter (Settings > Firebase usage)
   ---------------------------------------------------------------
   A web page can't ask Google for the numbers shown in the Firebase
   console "Usage" tab (that needs server credentials), so this counts
   every Firestore read / write / delete THIS app makes and compares
   them with the free-plan daily limits. Counts are kept per device and
   reset at midnight Pacific Time, which is when Firebase resets them.
   Use "Match Firebase console" in Settings to correct the numbers
   (e.g. to include other devices or the Parent Portal app).
   When any meter reaches 90% a closable warning pop-up appears.

   SHARED METER: every device adds its own counts to ONE Firestore
   document (usage_meter/<Pacific date>) using atomic increments, so
   the Settings graph shows the total of ALL staff devices instead of
   just this browser. Counts are batched (one small write per minute at
   most) and the meter's own reads/writes are included in the totals.
   Reads made by the separate Parent Portal app cannot be seen from
   here, so use "Match Firebase console" now and then to re-sync.
   --------------------------------------------------------------- */
const FBU_KEY = 'ikhlas_fb_usage_v1';
const FBU_DEFAULT_LIMITS = { reads: 50000, writes: 20000, deletes: 20000 };
const FBU_METRICS = [
  { id: 'writes',  label: 'Writes',  note: 'Saves and new notices' },
  { id: 'reads',   label: 'Reads',   note: 'Loads and live updates' },
  { id: 'deletes', label: 'Deletes', note: 'Removed documents' }
];
let FBU = null;
let fbuTimer = null;
let fbuInstalled = false;
let fbuSilent = false;        // true while the meter itself talks to Firestore (so it is not double counted)
let fbuFlushTimer = null;
let fbuSelfReads = 0;         // meter's own reads, folded into the next flush
let fbuLastPull = 0;
let fbuPulling = false;
const FBU_FLUSH_MS = 60 * 1000;
const FBU_RETRY_MS = 5 * 60 * 1000;
function fbuMeterRef(){
  if(typeof firebase === 'undefined' || !cloudDocRef) return null;
  return firebase.firestore().collection('usage_meter').doc(fbuToday());
}
function fbuZero(){ return { reads: 0, writes: 0, deletes: 0 }; }

function fbuToday(){
  try{
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }catch(e){ return new Date().toISOString().slice(0, 10); }
}
function fbuLoad(){
  if(FBU) return FBU;
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem(FBU_KEY)); }catch(e){}
  FBU = Object.assign({ day: fbuToday(), reads: 0, writes: 0, deletes: 0, alerted: {}, calibratedAt: 0 }, saved || {});
  FBU.limits = Object.assign({}, FBU_DEFAULT_LIMITS, FBU.limits || {});
  FBU.alerted = FBU.alerted || {};
  FBU.pending = Object.assign(fbuZero(), FBU.pending || {});   // counted here, not yet added to the shared total
  FBU.shared = FBU.shared || null;                             // last shared totals read from Firestore
  FBU.syncError = '';
  fbuRollover();
  return FBU;
}
function fbuSave(){ try{ const { syncError, ...keep } = FBU; localStorage.setItem(FBU_KEY, JSON.stringify(keep)); }catch(e){} }
function fbuRollover(){
  const t = fbuToday();
  if(FBU.day !== t){ FBU.day = t; FBU.reads = 0; FBU.writes = 0; FBU.deletes = 0; FBU.alerted = {}; FBU.calibratedAt = 0; FBU.pending = fbuZero(); FBU.shared = null; fbuSelfReads = 0; fbuLastPull = 0; fbuSave(); }
}
function fbuAdd(metric, n){
  if(!n) return;
  fbuLoad(); fbuRollover();
  FBU[metric] += n;
  FBU.pending[metric] = (FBU.pending[metric] || 0) + n;
  fbuScheduleFlush(FBU_FLUSH_MS);
  if(fbuTimer) return;
  fbuTimer = setTimeout(() => { fbuTimer = null; fbuSave(); fbuCheckAlerts(); fbuRefreshPanel(); }, 800);
}
// What the graph shows: the shared all-devices total (plus anything not yet
// uploaded) when it is known, otherwise just this device's own count.
function fbuValue(id){
  fbuLoad();
  if(FBU.shared) return (FBU.shared[id] || 0) + (FBU.pending[id] || 0);
  return FBU[id];
}
function fbuPct(id){
  fbuLoad();
  const limit = FBU.limits[id] || 1;
  return (fbuValue(id) / limit) * 100;
}

/* --- Shared meter: upload this device's counts, download the total --- */
function fbuScheduleFlush(ms){
  if(fbuFlushTimer || !cloudDocRef) return;
  fbuFlushTimer = setTimeout(() => { fbuFlushTimer = null; fbuFlush(); }, ms);
}
function fbuFlush(){
  fbuLoad(); fbuRollover();
  const ref = fbuMeterRef();
  if(!ref) return Promise.resolve();
  const p = FBU.pending;
  if(!p.reads && !p.writes && !p.deletes && !fbuSelfReads) return Promise.resolve();
  const delta = { reads: p.reads + fbuSelfReads, writes: p.writes + 1, deletes: p.deletes };  // +1 = this upload itself
  const sent = { reads: p.reads, writes: p.writes, deletes: p.deletes, self: fbuSelfReads };
  FBU.pending = fbuZero(); fbuSelfReads = 0; fbuSave();
  const inc = (n) => firebase.firestore.FieldValue.increment(n);
  fbuSilent = true;
  let r;
  try{
    r = ref.set({ reads: inc(delta.reads), writes: inc(delta.writes), deletes: inc(delta.deletes), updatedAt: Date.now() }, { merge: true });
  }finally{ fbuSilent = false; }
  return r.then(() => {
    FBU.syncError = '';
    if(FBU.shared){ FBU.shared.reads += delta.reads; FBU.shared.writes += delta.writes; FBU.shared.deletes += delta.deletes; }
    fbuSave(); fbuCheckAlerts(); fbuRefreshPanel();
  }).catch(err => {
    // Put the counts back and try again later (e.g. offline, quota used up, or the rule is missing).
    FBU.pending.reads += sent.reads; FBU.pending.writes += sent.writes; FBU.pending.deletes += sent.deletes;
    fbuSelfReads += sent.self;
    FBU.syncError = (err && err.code) || 'error';
    fbuSave(); fbuRefreshPanel();
    fbuScheduleFlush(FBU_RETRY_MS);
  });
}
function fbuPull(){
  const ref = fbuMeterRef();
  if(!ref || fbuPulling) return Promise.resolve();
  fbuPulling = true; fbuLastPull = Date.now();
  fbuSilent = true;
  let r;
  try{ r = ref.get(); }finally{ fbuSilent = false; }
  return r.then(snap => {
    fbuSelfReads += 1;
    const d = snap.exists ? snap.data() : {};
    // Keep our own not-yet-uploaded counts on top of whatever the shared total says.
    FBU.shared = { reads: d.reads || 0, writes: d.writes || 0, deletes: d.deletes || 0 };
    FBU.syncError = '';
    fbuSave(); fbuCheckAlerts(); fbuRefreshPanel();
  }).catch(err => {
    FBU.syncError = (err && err.code) || 'error';
    fbuRefreshPanel();
  }).then(() => { fbuPulling = false; });
}
function fbuSetShared(values){
  // values: { reads?, writes?, deletes? } — overwrite the shared totals (used by "Match console" and "Reset").
  const ref = fbuMeterRef();
  fbuLoad();
  FBU.shared = Object.assign({ reads: 0, writes: 0, deletes: 0 }, FBU.shared || {}, values);
  Object.keys(values).forEach(k => { FBU.pending[k] = 0; });
  fbuSave();
  if(!ref) return Promise.resolve();
  fbuSilent = true;
  let r;
  try{ r = ref.set(Object.assign({}, values, { updatedAt: Date.now() }), { merge: true }); }finally{ fbuSilent = false; }
  return r.then(() => { FBU.syncError = ''; }).catch(err => { FBU.syncError = (err && err.code) || 'error'; });
}
function fbuLevel(pct){ return pct >= 100 ? 100 : pct >= 90 ? 90 : 0; }

/* --- Hook into Firestore so every operation is counted --- */
function fbuFindOwner(proto, name){
  let p = proto;
  while(p && p !== Object.prototype){
    if(Object.prototype.hasOwnProperty.call(p, name)) return p;
    p = Object.getPrototypeOf(p);
  }
  return null;
}
function fbuPatch(owner, name, factory){
  if(!owner || typeof owner[name] !== 'function') return;
  const flag = '__fbu_' + name;
  if(Object.prototype.hasOwnProperty.call(owner, flag)) return;
  owner[name] = factory(owner[name]);
  Object.defineProperty(owner, flag, { value: true });
}
function fbuCountPromise(orig, metric, countFn){
  return function(...a){
    const silent = fbuSilent;
    const r = orig.apply(this, a);
    if(!silent && r && typeof r.then === 'function') r.then(res => fbuAdd(metric, countFn ? countFn(res) : 1), () => {});
    return r;
  };
}
function fbuSnapshotWrapper(isQuery){
  return function(orig){
    return function(...args){
      let first = true;
      const tap = (snap) => {
        try{
          if(!snap) return;
          if(snap.metadata && (snap.metadata.hasPendingWrites || snap.metadata.fromCache)) return;
          if(isQuery){
            const n = first ? snap.size : snap.docChanges().length;
            fbuAdd('reads', Math.max(first ? 1 : 0, n));
          }else{
            fbuAdd('reads', 1);
          }
          first = false;
        }catch(e){}
      };
      for(let i = 0; i < args.length; i++){
        const x = args[i];
        if(typeof x === 'function'){ args[i] = (s) => { tap(s); return x(s); }; break; }
        if(x && typeof x.next === 'function'){ args[i] = Object.assign({}, x, { next: (s) => { tap(s); return x.next(s); } }); break; }
      }
      return orig.apply(this, args);
    };
  };
}
function fbuInstall(){
  if(fbuInstalled) return;
  fbuLoad();
  try{
    const db = firebase.firestore();
    const docProto = Object.getPrototypeOf(db.doc('__fbu/probe'));
    const collProto = Object.getPrototypeOf(db.collection('__fbu'));
    fbuPatch(fbuFindOwner(docProto, 'get'),        'get',        o => fbuCountPromise(o, 'reads'));
    fbuPatch(fbuFindOwner(docProto, 'set'),        'set',        o => fbuCountPromise(o, 'writes'));
    fbuPatch(fbuFindOwner(docProto, 'update'),     'update',     o => fbuCountPromise(o, 'writes'));
    fbuPatch(fbuFindOwner(docProto, 'delete'),     'delete',     o => fbuCountPromise(o, 'deletes'));
    fbuPatch(fbuFindOwner(docProto, 'onSnapshot'), 'onSnapshot', fbuSnapshotWrapper(false));
    fbuPatch(fbuFindOwner(collProto, 'add'),        'add',        o => fbuCountPromise(o, 'writes'));
    fbuPatch(fbuFindOwner(collProto, 'get'),        'get',        o => fbuCountPromise(o, 'reads', s => Math.max(1, (s && s.size) || 0)));
    fbuPatch(fbuFindOwner(collProto, 'onSnapshot'), 'onSnapshot', fbuSnapshotWrapper(true));
    // Batched writes/deletes are counted when the batch commits.
    fbuPatch(fbuFindOwner(Object.getPrototypeOf(db), 'batch'), 'batch', function(orig){
      return function(...a){
        const b = orig.apply(this, a);
        const c = { writes: 0, deletes: 0 };
        ['set', 'update'].forEach(m => { const f = b[m]; if(f) b[m] = function(...x){ c.writes++; return f.apply(this, x); }; });
        const fd = b.delete; if(fd) b.delete = function(...x){ c.deletes++; return fd.apply(this, x); };
        const fc = b.commit;
        if(fc) b.commit = function(...x){
          const r = fc.apply(this, x);
          if(r && typeof r.then === 'function') r.then(() => { fbuAdd('writes', c.writes); fbuAdd('deletes', c.deletes); }, () => {});
          return r;
        };
        return b;
      };
    });
    fbuInstalled = true;
    setInterval(() => {
      fbuLoad(); fbuRollover(); fbuCheckAlerts(); fbuRefreshPanel();
      if(!cloudDocRef) return;
      fbuScheduleFlush(FBU_FLUSH_MS);
      const isMgmt = typeof SESSION !== 'undefined' && SESSION && SESSION.role === 'management';
      const gap = document.getElementById('fbuMeters') ? 60000 : 5 * 60000;   // refresh faster while Settings is open
      if(isMgmt && !document.hidden && Date.now() - fbuLastPull > gap) fbuPull();
    }, 5000);
    window.addEventListener('pagehide', () => { try{ fbuFlush(); }catch(e){} });
    document.addEventListener('visibilitychange', () => { if(document.hidden){ try{ fbuFlush(); }catch(e){} } });
  }catch(e){ console.error('Could not start Firebase usage tracking', e); }
}

/* --- 90% warning pop-up (closable) --- */
function fbuCheckAlerts(){
  fbuLoad(); fbuRollover();
  if(typeof SESSION === 'undefined' || !SESSION || SESSION.role !== 'management') return;
  const appEl = document.getElementById('app');
  if(!appEl || appEl.classList.contains('hidden')) return;
  let fresh = false;
  FBU_METRICS.forEach(m => {
    const lvl = fbuLevel(fbuPct(m.id));
    if(lvl > (FBU.alerted[m.id] || 0)){ FBU.alerted[m.id] = lvl; fresh = true; }
  });
  if(fresh){ fbuSave(); fbuShowAlert(); }
}
function fbuBarClass(pct){ return pct >= 90 ? 'crit' : pct >= 70 ? 'warn' : 'ok'; }
function fbuMeterRow(m){
  const pct = fbuPct(m.id);
  return `
    <div class="fbu-row">
      <div class="fbu-row-top">
        <strong>${m.label}</strong>
        <span class="fbu-count">${fbuValue(m.id).toLocaleString()} / ${FBU.limits[m.id].toLocaleString()} <em class="fbu-pct ${fbuBarClass(pct)}">${pct.toFixed(1)}%</em></span>
      </div>
      <div class="fbu-bar"><div class="fbu-fill ${fbuBarClass(pct)}" style="width:${Math.min(100, pct)}%"></div></div>
    </div>`;
}
function fbuCloseAlert(){
  const root = document.getElementById('fbuAlertRoot');
  if(root) root.remove();
  document.removeEventListener('keydown', fbuEscClose);
}
function fbuEscClose(e){ if(e.key === 'Escape') fbuCloseAlert(); }
function fbuShowAlert(preview){
  fbuLoad();
  fbuCloseAlert();
  const hot = FBU_METRICS.filter(m => fbuPct(m.id) >= 90);
  const list = (hot.length ? hot : FBU_METRICS);
  const over = hot.some(m => fbuPct(m.id) >= 100);
  const root = document.createElement('div');
  root.id = 'fbuAlertRoot';
  root.innerHTML = `
    <div class="modal-overlay" id="fbuAlertOverlay">
      <div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="fbuAlertTitle">
        <div class="modal-head"><h3 id="fbuAlertTitle">${over ? 'Firebase daily limit reached' : 'Firebase usage warning'}</h3><button class="modal-close" id="fbuAlertX" aria-label="Close">${ICONS.x}</button></div>
        <div class="modal-body">
          ${preview && !hot.length ? `<div class="modal-note">${ICONS.alert}This is a preview. No meter is at 90% yet.</div>` : `<div class="modal-note danger">${ICONS.alert}${over
            ? 'A free-plan daily limit has been reached. Saving or loading shared data may stop working until the quota resets (midnight Pacific Time).'
            : 'Today\u2019s Firebase usage has reached 90% of the free daily limit. Reduce activity or upgrade the Firebase plan to avoid interruptions.'}</div>`}
          ${list.map(fbuMeterRow).join('')}
          <p class="small-note" style="margin-top:12px;">${fbuScopeNote()} Parent Portal reads are not included \u2014 check the Firebase console Usage tab for the exact totals.</p>
        </div>
        <div class="modal-foot">
          <button class="btn" id="fbuAlertSettings">Open Settings</button>
          <button class="btn btn-primary" id="fbuAlertClose" style="margin-left:auto;">Close</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(root);
  document.getElementById('fbuAlertX').addEventListener('click', fbuCloseAlert);
  document.getElementById('fbuAlertClose').addEventListener('click', fbuCloseAlert);
  document.getElementById('fbuAlertOverlay').addEventListener('click', (e) => { if(e.target.id === 'fbuAlertOverlay') fbuCloseAlert(); });
  document.getElementById('fbuAlertSettings').addEventListener('click', () => { fbuCloseAlert(); if(typeof navigate === 'function') navigate('settings'); });
  document.addEventListener('keydown', fbuEscClose);
}

/* --- Settings panel --- */
function fbuRefreshPanel(){
  const el = document.getElementById('fbuMeters');
  if(!el) return;
  fbuLoad(); fbuRollover();
  el.innerHTML = FBU_METRICS.map(fbuMeterRow).join('');
  const st = document.getElementById('fbuStatus');
  if(st) st.innerHTML = fbuStatusHTML();
}
function fbuScopeNote(){
  return FBU.shared ? 'Total of all staff devices using this app.' : 'Counted from this device only (shared total unavailable).';
}
function fbuStatusHTML(){
  fbuLoad();
  const pend = FBU.pending.reads + FBU.pending.writes + FBU.pending.deletes;
  if(!cloudDocRef) return '';
  if(FBU.syncError === 'permission-denied'){
    return `<p class="small-note" style="margin-bottom:12px;color:#B3412F;"><b>Showing this device only.</b> Add the <code>usage_meter</code> rule from firebase-config.js to Firestore \u2192 Rules and publish it, then the graph will include every device.</p>`;
  }
  if(FBU.syncError){
    return `<p class="small-note" style="margin-bottom:12px;color:#B3412F;"><b>Could not reach the shared meter</b> (${FBU.syncError}). It will retry automatically${pend ? `; ${pend.toLocaleString()} counts are waiting to upload` : ''}.</p>`;
  }
  if(!FBU.shared){
    return `<p class="small-note" style="margin-bottom:12px;">Loading the shared total\u2026</p>`;
  }
  return `<p class="small-note" style="margin-bottom:12px;">Shared across all staff devices${pend ? ` \u00B7 ${pend.toLocaleString()} recent counts uploading` : ''}. This device alone: ${FBU.writes.toLocaleString()} writes, ${FBU.reads.toLocaleString()} reads, ${FBU.deletes.toLocaleString()} deletes.</p>`;
}
function firebaseUsagePanelHTML(){
  fbuLoad(); fbuRollover();
  return `
    <div class="panel" id="fbuPanel">
      <div class="panel-head"><h3>Firebase usage</h3><div class="sub">Today\u2019s Writes, Reads and Deletes against the free daily limits \u2014 a warning pops up at 90%</div></div>
      <div class="panel-body">
        ${cloudDocRef ? '' : '<p class="small-note" style="margin-bottom:12px;">Cloud sync is off, so nothing is being counted.</p>'}
        <div id="fbuStatus">${fbuStatusHTML()}</div>
        <div id="fbuMeters">${FBU_METRICS.map(fbuMeterRow).join('')}</div>
        <p class="small-note" style="margin:12px 0;">This daily limits will reset at midnight Pacific Time (it is between <b>12PM-2PM</b> in India time). The Parent Portal app also uses the same quota but can\u2019t be counted here, so match the numbers to the Firebase console from time to time.</p>
        <details class="fbu-details">
          <summary>Match Firebase console</summary>
          <p class="field-help" style="margin:8px 0;">Open Firebase console \u2192 Firestore Database \u2192 Usage and type today\u2019s numbers. Leave a box empty to keep the current count.</p>
          <div class="field-row">
            ${FBU_METRICS.map(m => `<div class="field"><label>${m.label}</label><input type="number" min="0" id="fbuSet_${m.id}" placeholder="${fbuValue(m.id)}"></div>`).join('')}
          </div>
          <button class="btn btn-primary" id="btnFbuMatch">Update counters</button>
        </details>
        <details class="fbu-details">
          <summary>Daily limits</summary>
          <p class="field-help" style="margin:8px 0;">Defaults are the Spark (free) plan: 50,000 reads, 20,000 writes, 20,000 deletes per day.</p>
          <div class="field-row">
            ${FBU_METRICS.map(m => `<div class="field"><label>${m.label} limit</label><input type="number" min="1" id="fbuLimit_${m.id}" value="${FBU.limits[m.id]}"></div>`).join('')}
          </div>
          <button class="btn" id="btnFbuLimits">Save limits</button>
        </details>
        <div class="toolbar" style="margin-top:14px;">
          <button class="btn" id="btnFbuPreview">Preview warning</button>
          <button class="btn btn-danger" id="btnFbuReset">Reset today\u2019s counters</button>    
        </div>
      </div>
    </div>`;
}
function wireFirebaseUsagePanel(){
  const byId = (id) => document.getElementById(id);
  if(!byId('fbuPanel')) return;
  fbuPull();   // fetch the latest all-devices total whenever Settings opens
  byId('btnFbuMatch').addEventListener('click', () => {
    const vals = {};
    FBU_METRICS.forEach(m => {
      const v = byId('fbuSet_' + m.id).value;
      if(v !== '' && Number(v) >= 0){ vals[m.id] = Math.floor(Number(v)); FBU[m.id] = vals[m.id]; }
    });
    FBU.alerted = {}; FBU.calibratedAt = Date.now();
    fbuSetShared(vals).then(() => { fbuSave(); renderSettings(); fbuCheckAlerts(); });
    toast('Usage counters updated for all devices.');
  });
  byId('btnFbuLimits').addEventListener('click', () => {
    FBU_METRICS.forEach(m => {
      const v = Number(byId('fbuLimit_' + m.id).value);
      if(v > 0) FBU.limits[m.id] = Math.floor(v);
    });
    FBU.alerted = {};
    fbuSave(); renderSettings(); fbuCheckAlerts();
    toast('Limits saved.');
  });
  byId('btnFbuPreview').addEventListener('click', () => fbuShowAlert(true));
  byId('btnFbuReset').addEventListener('click', () => {
    FBU.reads = 0; FBU.writes = 0; FBU.deletes = 0; FBU.alerted = {};
    fbuSetShared({ reads: 0, writes: 0, deletes: 0 }).then(() => { fbuSave(); renderSettings(); });
    toast('Counters reset for all devices.');
  });
}
