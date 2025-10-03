
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db;
export function getDB(){
  if (!db){
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const dbPath = path.join(dataDir, 'princeton.db');
    db = new Database(dbPath);
  }
  return db;
}
