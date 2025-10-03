
import Layout from '@/components/Layout';
import { getDB } from '@/lib/db';
import Link from 'next/link';

export async function getServerSideProps({ query }){
  const db = getDB();
  const q = (query.q || '').trim();
  if (!q) return { props: { q, results: [] } };
  const articles = db.prepare('SELECT id, slug, title, created_at FROM articles WHERE title LIKE ? OR content_md LIKE ? ORDER BY created_at DESC').all('%'+q+'%','%'+q+'%');
  const items = db.prepare(`SELECT ai.id, ai.title, w.week_of FROM agenda_items ai JOIN weeks w ON w.id = ai.week_id WHERE ai.title LIKE ? OR ai.explanation LIKE ? ORDER BY w.week_of DESC`).all('%'+q+'%','%'+q+'%');
  return { props: { q, results: { articles, items } } };
}

export default function Search({ q, results }){
  return (
    <Layout>
      <h1 className="font-serif text-3xl mb-4">Search</h1>
      <form className="mb-4">
        <input name="q" defaultValue={q} placeholder="Search articles and tracker…" className="w-full border rounded px-3 py-2" />
      </form>
      {q && (
        <div className="grid md:grid-cols-2 gap-6">
          <section>
            <h2 className="font-serif text-xl mb-2">Articles</h2>
            <ul className="space-y-2">
              {results.articles.map(a => (
                <li key={a.id}><Link className="underline" href={`/article/${a.slug}`}>{a.title}</Link> <span className="text-sm text-neutral-500">({new Date(a.created_at).toLocaleDateString()})</span></li>
              ))}
              {results.articles.length===0 && <li className="text-neutral-500 text-sm">No matches</li>}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-xl mb-2">Council Tracker</h2>
            <ul className="space-y-2">
              {results.items.map(i => (
                <li key={i.id}><span className="font-medium">{i.title}</span> <span className="text-sm text-neutral-500">({new Date(i.week_of).toLocaleDateString()})</span></li>
              ))}
              {results.items.length===0 && <li className="text-neutral-500 text-sm">No matches</li>}
            </ul>
          </section>
        </div>
      )}
    </Layout>
  )
}
