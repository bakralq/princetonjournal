
import { getDB } from '@/lib/db';

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();
  const { week_of, agenda_url } = req.body || {};
  const week = (req.headers['content-type'] || '').includes('application/json') ? req.body : req.body;
  const w = week.week_of || week_of;
  const a = week.agenda_url || agenda_url || '';
  try{
    db.prepare('INSERT INTO weeks(week_of, agenda_url) VALUES (?, ?)').run(w, a);
    res.redirect(302, '/admin/tracker');
  }catch(e){
    res.status(400).send(e.message);
  }
}
