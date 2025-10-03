
import { getDB } from '@/lib/db';

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();
  const payload = (req.headers['content-type'] || '').includes('application/json') ? req.body : req.body;
  const { position, name, photo_url } = payload;
  try{
    const existing = db.prepare('SELECT id FROM council_members WHERE position = ?').get(position);
    if (existing){
      db.prepare('UPDATE council_members SET name=?, photo_url=? WHERE id=?').run(name, photo_url || '', existing.id);
    } else {
      db.prepare('INSERT INTO council_members(position, name, photo_url) VALUES (?, ?, ?)').run(position, name, photo_url || '');
    }
    res.redirect(302, '/admin/tracker');
  }catch(e){
    res.status(400).send(e.message);
  }
}
