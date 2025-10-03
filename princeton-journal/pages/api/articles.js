
import { getDB } from '@/lib/db';

export default function handler(req, res){
  const db = getDB();
  if (req.method === 'POST'){
    const { title, slug, content_md } = req.body || {};
    if (!title || !slug) return res.status(400).json({ ok: false, error: 'title and slug required' });
    try{
      db.prepare('INSERT INTO articles(slug, title, content_md) VALUES (?, ?, ?)').run(slug, title, content_md || '');
      return res.json({ ok: true });
    }catch(e){
      return res.status(400).json({ ok:false, error: e.message });
    }
  }
  return res.status(405).json({ ok:false, error:'Method not allowed' });
}
