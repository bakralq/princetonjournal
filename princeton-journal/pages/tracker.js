
import Layout from '@/components/Layout';
import { getDB } from '@/lib/db';
import Link from 'next/link';

export async function getServerSideProps({ query }){
  const db = getDB();
  const q = (query.q || '').trim();
  let weeks = [];
  if (q){
    weeks = db.prepare(`
      SELECT DISTINCT w.* FROM weeks w
      LEFT JOIN agenda_items ai ON ai.week_id = w.id
      WHERE strftime('%Y-%m-%d', w.week_of) LIKE ? OR ai.title LIKE ? OR ai.explanation LIKE ?
      ORDER BY w.week_of DESC
    `).all('%'+q+'%', '%'+q+'%', '%'+q+'%');
  } else {
    weeks = db.prepare('SELECT * FROM weeks ORDER BY week_of DESC LIMIT 52').all();
  }
  // Fetch agenda + votes for each week
  const items = {};
  for (const w of weeks){
    items[w.id] = db.prepare('SELECT * FROM agenda_items WHERE week_id = ?').all(w.id)
      .map(ai => ({
        ...ai,
        votes: db.prepare(`
          SELECT v.vote, cm.position, cm.name, cm.photo_url
          FROM votes v
          JOIN council_members cm ON cm.id = v.member_id
          WHERE v.agenda_item_id = ?
          ORDER BY cm.position ASC
        `).all(ai.id)
      }));
  }
  const members = db.prepare('SELECT * FROM council_members ORDER BY position').all();
  return { props: { weeks, items, members, q } }
}

export default function Tracker({ weeks, items, members, q }){
  return (
    <Layout>
      <h1 className="font-serif text-3xl mb-4">City Council Tracker</h1>
      <form className="mb-4">
        <input name="q" defaultValue={q} placeholder="Search agenda, explanations, dates…" className="w-full border rounded px-3 py-2" />
      </form>
      <div className="flex gap-6 overflow-x-auto snap-x pb-4">
        {weeks.map(week => (
          <section key={week.id} className="min-w-[320px] snap-start border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">Week of {new Date(week.week_of).toLocaleDateString()}</h2>
              {week.agenda_url && <a href={week.agenda_url} target="_blank" className="text-sm underline">Agenda</a>}
            </div>
            <div className="mt-3 space-y-3">
              {(items[week.id] || []).map(ai => (
                <div key={ai.id} className="border rounded p-3">
                  <div className="font-medium">{ai.title}</div>
                  <p className="text-sm text-neutral-700 mt-1">{ai.explanation}</p>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {members.map(m => {
                      const v = (ai.votes || []).find(v => v.position === m.position);
                      const label = v ? v.vote : '—';
                      return (
                        <div key={m.id} className="border rounded px-2 py-1 flex items-center gap-2">
                          <div className="font-medium">{m.position}</div>
                          <div className="ml-auto">{label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        {weeks.length === 0 && <div className="text-neutral-500">No weeks yet. Add entries in Admin.</div>}
      </div>
      <div className="text-sm text-neutral-600 mt-2">Tip: swipe left and right to move week by week on mobile.</div>
    </Layout>
  )
}
