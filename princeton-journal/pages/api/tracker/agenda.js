
import { getDB } from '@/lib/db';

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();
  const payload = (req.headers['content-type'] || '').includes('application/json') ? req.body : req.body;
  try{
    db.prepare('INSERT INTO agenda_items(week_id, title, explanation) VALUES (?, ?, ?)')
      .run(payload.week_id, payload.title, payload.explanation || '');
    res.redirect(302, `/admin/tracker/${payload.week_id}`);
  }catch(e){
    res.status(400).send(e.message);
  }
}
