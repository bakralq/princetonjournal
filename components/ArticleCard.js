
import Link from 'next/link';

export default function ArticleCard({ article }){
  return (
    <article className="py-4 border-b">
      <h3 className="font-serif text-xl">
        <Link href={`/article/${article.slug}`} className="hover:underline">{article.title}</Link>
      </h3>
      <div className="text-xs text-neutral-500 mt-1">
        By {article.author} • {new Date(article.created_at).toLocaleDateString()}
      </div>
      <p className="text-sm mt-2 line-clamp-2">{(article.content_md || '').replace(/[#*_`>\[\]]/g,'').slice(0,200)}…</p>
    </article>
  )
}
