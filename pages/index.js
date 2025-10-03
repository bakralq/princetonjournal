
import Layout from '@/components/Layout';
import ArticleCard from '@/components/ArticleCard';
import { getDB } from '@/lib/db';

export async function getServerSideProps(){
  const db = getDB();
  const latest = db.prepare('SELECT * FROM articles ORDER BY created_at DESC LIMIT 1').get() || null;
  const posts = db.prepare('SELECT * FROM articles ORDER BY created_at DESC LIMIT 20').all();
  return { props: { latest, posts } }
}

export default function Home({ latest, posts }){
  return (
    <Layout>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {latest ? (
            <article className="pb-6 border-b">
              <h1 className="font-serif text-4xl leading-tight">{latest.title}</h1>
              <div className="text-sm text-neutral-500 mt-2">By {latest.author} • {new Date(latest.created_at).toLocaleDateString()}</div>
              <p className="mt-4 text-lg">{(latest.content_md || '').replace(/[#*_`>\[\]]/g,'').slice(0,350)}…</p>
            </article>
          ) : (
            <div className="text-neutral-500">No articles yet. Add one in Admin.</div>
          )}
          <section className="mt-6">
            <h2 className="font-serif text-2xl mb-2">More coverage</h2>
            <div>
              {(posts || []).slice(1).map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </section>
        </div>
        <aside className="space-y-8">
          <section>
            <h3 className="font-serif text-xl">Community Voices</h3>
            <p className="text-sm text-neutral-600 mt-1">Guest commentary and op-eds from Princeton residents.</p>
          </section>
          <section>
            <h3 className="font-serif text-xl">Princeton Governance</h3>
            <p className="text-sm text-neutral-600 mt-1">Topic-specific reporting on city policy and transparency.</p>
          </section>
          <section>
            <a href="/tracker" className="block p-4 rounded-lg border hover:bg-neutral-50">
              <div className="font-serif text-xl">City Council Tracker</div>
              <div className="text-sm text-neutral-600">Weekly votes, agendas, and plain-English explanations.</div>
            </a>
          </section>
        </aside>
      </div>
    </Layout>
  )
}
