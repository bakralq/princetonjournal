
import Layout from '@/components/Layout';
import { getDB } from '@/lib/db';

export async function getServerSideProps(){
  const db = getDB();
  const weeks = db.prepare('SELECT * FROM weeks ORDER BY week_of DESC').all();
  const members = db.prepare('SELECT * FROM council_members ORDER BY position').all();
  return { props: { weeks, members } };
}

export default function AdminTracker({ weeks, members }){
  return (
    <Layout>
      <h1 className="font-serif text-2xl mb-4">City Council Tracker</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="font-serif text-xl mb-2">Weeks</h2>
          <form action="/api/tracker/week" method="POST" className="space-y-2 border rounded p-3 mb-3">
            <div>
              <label className="block text-sm">Week of (Monday)</label>
              <input type="date" name="week_of" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Agenda URL</label>
              <input type="url" name="agenda_url" className="w-full border rounded px-3 py-2" />
            </div>
            <button className="px-3 py-2 border rounded">Add Week</button>
          </form>
          <ul>
            {weeks.map(w => (
              <li key={w.id} className="border-b py-2">Week of {new Date(w.week_of).toLocaleDateString()} – <a className="underline" href={`/admin/tracker/${w.id}`}>Manage</a></li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-xl mb-2">Council Members</h2>
          <ul className="text-sm">
            {members.map(m => (<li key={m.id} className="py-1">{m.position}: {m.name}</li>))}
          </ul>
          <form action="/api/tracker/member" method="POST" className="space-y-2 border rounded p-3 mt-3">
            <div>
              <label className="block text-sm">Position</label>
              <select name="position" className="w-full border rounded px-3 py-2">
                {['Mayor','Place 1','Place 2','Place 3','Place 4','Place 5','Place 6','Place 7'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm">Name</label>
              <input name="name" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">Photo URL</label>
              <input name="photo_url" className="w-full border rounded px-3 py-2" />
            </div>
            <button className="px-3 py-2 border rounded">Update/Add Member</button>
          </form>
        </section>
      </div>
    </Layout>
  )
}
