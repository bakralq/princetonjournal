
import { getDB } from '@/lib/db';

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const db = getDB();
  const payload = (req.headers['content-type'] || '').includes('application/json') ? req.body : req.body;
  const agenda_item_id = Number(payload.agenda_item_id);
  try{
    const members = db.prepare('SELECT id FROM council_members').all();
    const upsert = db.prepare(`INSERT INTO votes(agenda_item_id, member_id, vote) VALUES(?, ?, ?)
      ON CONFLICT(agenda_item_id, member_id) DO UPDATE SET vote=excluded.vote`);
    const tx = db.transaction(()=>{
      for (const m of members){
        const key = `vote_${m.id}`;
        const v = payload[key];
        if (v) upsert.run(agenda_item_id, m.id, v);
      }
    });
    tx();
    res.redirect(302, `/admin/tracker/${agenda_item_id ? db.prepare('SELECT week_id FROM agenda_items WHERE id = ?').get(agenda_item_id).week_id : ''}`);
  }catch(e){
    res.status(400).send(e.message);
  }
}
