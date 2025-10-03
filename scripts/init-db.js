
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const dbPath = path.join(dataDir, 'princeton.db');
const db = new Database(dbPath);

db.exec(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  author TEXT DEFAULT 'Bakr Al Qaraghuli, Editor',
  content_md TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(created_at DESC);

CREATE TABLE IF NOT EXISTS council_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  position TEXT NOT NULL, -- Mayor, Place 1...7
  name TEXT NOT NULL,
  photo_url TEXT
);

CREATE TABLE IF NOT EXISTS weeks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_of DATE NOT NULL, -- Monday of the week
  agenda_url TEXT
);

CREATE TABLE IF NOT EXISTS agenda_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  explanation TEXT,
  FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agenda_item_id INTEGER NOT NULL,
  member_id INTEGER NOT NULL,
  vote TEXT CHECK(vote IN ('yes','no','abstain','absent')) NOT NULL,
  FOREIGN KEY (agenda_item_id) REFERENCES agenda_items(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES council_members(id) ON DELETE CASCADE,
  UNIQUE(agenda_item_id, member_id)
);
`);

// Seed council members if empty
const count = db.prepare('SELECT COUNT(*) AS c FROM council_members').get().c;
if (count === 0) {
  const members = [
    {position: 'Mayor', name: 'Mayor — TBD', photo_url: ''},
    {position: 'Place 1', name: 'Place 1 — TBD', photo_url: ''},
    {position: 'Place 2', name: 'Place 2 — TBD', photo_url: ''},
    {position: 'Place 3', name: 'Place 3 — TBD', photo_url: ''},
    {position: 'Place 4', name: 'Place 4 — TBD', photo_url: ''},
    {position: 'Place 5', name: 'Place 5 — TBD', photo_url: ''},
    {position: 'Place 6', name: 'Place 6 — TBD', photo_url: ''},
    {position: 'Place 7', name: 'Place 7 — TBD', photo_url: ''},
  ];
  const insert = db.prepare('INSERT INTO council_members(position, name, photo_url) VALUES (@position, @name, @photo_url)');
  const tx = db.transaction((rows)=>rows.forEach(r => insert.run(r)));
  tx(members);
}

db.close();
console.log('Database initialized at data/princeton.db');
