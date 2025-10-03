
import Layout from '@/components/Layout';
import { getDB } from '@/lib/db';

export async function getServerSideProps({ params }){
  const db = getDB();
  const week = db.prepare('SELECT * FROM weeks WHERE id = ?').get(params.id);
  if (!week) return { notFound: true };
  const items = db.prepare('SELECT * FROM agenda_items WHERE week_id = ?').all(week.id);
  const members = db.prepare('SELECT * FROM council_members ORDER BY position').all();
  const votes = {};
  for (const i of items){
    votes[i.id] = db.prepare('SELECT * FROM votes WHERE agenda_item_id = ?').all(i.id);
  }
  return { props: { week, items, members, votes } };
}

export default function Week({ week, items, members, votes }){
  return (
    <Layout>
      <h1 className="font-serif text-2xl mb-2">Week of {new Date(week.week_of).toLocaleDateString()}</h1>
      <a href="/admin/tracker" className="underline text-sm">Back</a>
      <section className="mt-4">
        <h2 className="font-serif text-xl">Add Agenda Item</h2>
        <form action="/api/tracker/agenda" method="POST" className="grid gap-2 border rounded p-3 mt-2">
          <input type="hidden" name="week_id" value={week.id} />
          <input name="title" placeholder="Item title" className="border rounded px-3 py-2" required />
          <textarea name="explanation" placeholder="Plain-English explanation" className="border rounded px-3 py-2 h-28" />
          <button className="px-3 py-2 border rounded">Add Item</button>
        </form>
      </section>
      <section className="mt-6 space-y-4">
        {items.map(i => (
          <div key={i.id} className="border rounded p-3">
            <div className="font-medium">{i.title}</div>
            <p className="text-sm text-neutral-700">{i.explanation}</p>
            <form action="/api/tracker/vote" method="POST" className="grid md:grid-cols-4 gap-2 mt-3">
              <input type="hidden" name="agenda_item_id" value={i.id} />
              {members.map(m => (
                <div key={m.id} className="border rounded p-2">
                  <div className="text-sm font-medium">{m.position}</div>
                  <select name={`vote_${m.id}`} defaultValue={(votes[i.id] || []).find(v => v.member_id === m.id)?.vote || ''} className="w-full border rounded px-2 py-1 mt-1">
                    <option value="">—</option>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                    <option value="abstain">abstain</option>
                    <option value="absent">absent</option>
                  </select>
                </div>
              ))}
              <button className="px-3 py-2 border rounded md:col-span-4">Save Votes</button>
            </form>
          </div>
        ))}
      </section>
    </Layout>
  )
}
