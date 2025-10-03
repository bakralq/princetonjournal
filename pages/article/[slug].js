
import Layout from '@/components/Layout';
import Share from '@/components/Share';
import { getDB } from '@/lib/db';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function getServerSideProps({ params }){
  const db = getDB();
  const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(params.slug);
  if (!article) return { notFound: true };
  return { props: { article } };
}

export default function Article({ article }){
  return (
    <Layout>
      <article className="prose max-w-none">
        <h1 className="font-serif !mb-1">{article.title}</h1>
        <div className="text-sm text-neutral-500 !mt-0 !mb-4">By {article.author} · {new Date(article.created_at).toLocaleDateString()}</div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content_md}</ReactMarkdown>
        <div className="mt-6"><Share title={article.title} /></div>
      </article>
    </Layout>
  )
}

export async function getServerSidePaths(){ return { paths: [], fallback: 'blocking' }; }
