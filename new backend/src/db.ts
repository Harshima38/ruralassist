import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'gramai.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS issues (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    photo_url TEXT,
    latitude REAL,
    longitude REAL,
    village TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS community_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tag TEXT,
    tag_color TEXT,
    date_text TEXT,
    meta TEXT,
    image_url TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',
    progress INTEGER DEFAULT 0,
    deadline TEXT,
    beneficiaries INTEGER DEFAULT 0,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS mandi_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commodity TEXT NOT NULL,
    price REAL NOT NULL,
    unit TEXT DEFAULT 'per quintal',
    market TEXT,
    change_percent REAL DEFAULT 0,
    trend TEXT DEFAULT 'stable',
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    time_text TEXT,
    icon TEXT,
    color TEXT DEFAULT 'slate',
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// Seed default data
const alertCount = (db.prepare('SELECT COUNT(*) as c FROM alerts').get() as any).c;
if (alertCount === 0) {
  const insertAlert = db.prepare('INSERT INTO alerts (message, type) VALUES (?, ?)');
  insertAlert.run('Fertilizer distribution starts tomorrow at Block A.', 'warning');
  insertAlert.run('Heavy rainfall predicted for North Fields in 48 hours.', 'critical');
  insertAlert.run('New education grant applications open until Friday.', 'info');
  insertAlert.run('Free health camp scheduled for 15th October.', 'info');
  insertAlert.run('PM Kisan 14th installment verification begins Monday.', 'financial');
}

const schemeCount = (db.prepare('SELECT COUNT(*) as c FROM schemes').get() as any).c;
if (schemeCount === 0) {
  const insertScheme = db.prepare('INSERT INTO schemes (name, description, status, progress, deadline, beneficiaries, icon) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertScheme.run('PM Kisan Samman Nidhi', 'Direct income support of ₹6,000/year to farmer families', 'active', 78, '2026-04-15', 1245, 'agriculture');
  insertScheme.run('MGNREGA', 'Guaranteed 100 days of wage employment per household', 'active', 65, '2026-03-31', 890, 'construction');
  insertScheme.run('PM Ujjwala Yojana', 'Free LPG connections for BPL households', 'active', 92, '2026-06-30', 567, 'local_fire_department');
  insertScheme.run('Swachh Bharat Mission', 'Construction of individual household toilets', 'completed', 100, '2026-01-01', 2100, 'cleaning_services');
  insertScheme.run('PM Awas Yojana (Gramin)', 'Housing for all in rural areas', 'active', 45, '2026-12-31', 340, 'home');
}

const mandiCount = (db.prepare('SELECT COUNT(*) as c FROM mandi_prices').get() as any).c;
if (mandiCount === 0) {
  const insertMandi = db.prepare('INSERT INTO mandi_prices (commodity, price, unit, market, change_percent, trend) VALUES (?, ?, ?, ?, ?, ?)');
  insertMandi.run('Wheat (गेहूं)', 2275, '₹/quintal', 'Nagpur Mandi', 2.3, 'up');
  insertMandi.run('Rice (चावल)', 3150, '₹/quintal', 'Raipur Mandi', -1.5, 'down');
  insertMandi.run('Cotton (कपास)', 6800, '₹/quintal', 'Akola Mandi', 4.1, 'up');
  insertMandi.run('Soybean (सोयाबीन)', 4450, '₹/quintal', 'Indore Mandi', 0.8, 'up');
  insertMandi.run('Onion (प्याज)', 1850, '₹/quintal', 'Nashik Mandi', -3.2, 'down');
  insertMandi.run('Tomato (टमाटर)', 2100, '₹/quintal', 'Pune Mandi', 5.6, 'up');
}

const eventCount = (db.prepare('SELECT COUNT(*) as c FROM community_events').get() as any).c;
if (eventCount === 0) {
  const insertEvent = db.prepare('INSERT INTO community_events (title, tag, tag_color, date_text, meta, image_url) VALUES (?, ?, ?, ?, ?, ?)');
  insertEvent.run('Sustainable Farming Workshop', 'Event', 'primary', 'Oct 12', '45 Attending', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvQWngS5Egu1v8ll3Ugbyj9NEary0CwBK8Vv00Fd-W0c4ATvv7pLAYz6Af75peJ4J0SdavT8JhkkYtIao8Et9NtuND0DYpEI7N7oV-vYcmgsL-G5aUZqmUe136lMp3u7wrMdxbb89z3_oZ2MTjv1XUUm7A_YnxBURS_qESWUsj1jzbAJ2tH9vveXa5o9vnVmI3-RCyzyIWDk8cb-TzTovvGGWR5EFQxMGDodGMrmhrTHgnuDZRIZbviclSfoJD2eS_FCBD00tJJMuo');
  insertEvent.run('New Panchayat Hall Inaugurated', 'Local News', 'secondary', '2h ago', '12 Comments', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD5fGyLsfIUC7nO8MC-0_2eziDerPo5C9jC_pEDODYngkxC4dB8h8UTBY4vTFMDllY1ysJe_Z6h7GJlHkrjIeXsYNsuaUwjh1wkcAkLTOUATtEF_auVj3QhoQF0vP64RBO-er1l4C2wfZAkpHQTzSocwlq4j88sdqfcO9l_kAiweUd6Q1XtaA0FwfKVlQyROtuAXKKZ2MeLsHbGz1mcSIHpDr_RZgFgZMKLQIBvD3kspD4qLLVsUfYbhl4XluoXEfRgZdJQopNCb-u');
  insertEvent.run('Digital Literacy Drive Results', 'Education', 'tertiary', 'Top Performer', 'Share', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7TZkoVB5mSv7cktRKZ4UpPJDtRPR_qat1aruDQ1kAhmlNA-KXGDeaBKgvgpyyCRGQk8h4dyC1S7nQ29T3WSh40Jc5mfRj6XeDVrnEgFQhELyWB5Dw7x4vxx4d7pK0SGYCARx2lkVxJY_5FwqMYgB6HSY3osSFDOjMb6cnOcdPQIzrItVroz0o1jdjfqz7OrExdJddrOWVvq7rlmnOfM0ujai41mz5CfEU2cgv0yUiZkhBpiDgnhP29csY1OeHDj2ABiEOYUXo1duN');
}

const activityCount = (db.prepare('SELECT COUNT(*) as c FROM activity_log').get() as any).c;
if (activityCount === 0) {
  const insertActivity = db.prepare('INSERT INTO activity_log (text, time_text, icon, color) VALUES (?, ?, ?, ?)');
  insertActivity.run('Bridge repair tender approved', '24 minutes ago • Public Works', 'done_all', 'emerald');
  insertActivity.run('New grievance: Water Supply', '1 hour ago • Ward 3 Residents', 'warning', 'amber');
  insertActivity.run('New citizen registration', '3 hours ago • Digital Literacy Cell', 'person_add', 'slate');
  insertActivity.run('Soil testing report uploaded', '5 hours ago • Agriculture Dept', 'science', 'emerald');
  insertActivity.run('MGNREGA wages disbursed', '8 hours ago • Finance', 'payments', 'amber');
}

export default db;
