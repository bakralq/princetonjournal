
import Layout from '@/components/Layout';
import { getDB } from '@/lib/db';
import Link from 'next/link';

export async function getServerSideProps(){
  const db = getDB();
  const articles = db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all();
  return { props: { articles } };
}

export default function AdminArticles({ articles }){
  return (
    <Layout>
      <h1 className="font-serif text-2xl mb-4">Articles</h1>
      <a href="/admin/articles/new" className="inline-block px-3 py-2 border rounded mb-4">New Article</a>
      <ul>
        {articles.map(a => (
          <li key={a.id} className="border-b py-2 flex justify-between items-center">
            <div>{a.title}</div>
            <Link className="underline text-sm" href={`/article/${a.slug}`}>View</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
