
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function NewArticle(){
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('# Headline\n\nWrite your story in **Markdown**.')

  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, slug, content_md: content })
    });
    const j = await res.json();
    if (j.ok) window.location.href = '/admin/articles';
    else alert(j.error || 'Error');
  }

  return (
    <Layout>
      <h1 className="font-serif text-2xl mb-4">New Article</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Title</label>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Slug (URL)</label>
          <input className="w-full border rounded px-3 py-2" value={slug} onChange={e=>setSlug(e.target.value)} required />
          <div className="text-xs text-neutral-500 mt-1">Example: us-380-construction-update</div>
        </div>
        <div>
          <label className="block text-sm">Content (Markdown)</label>
          <textarea className="w-full border rounded px-3 py-2 h-80 font-mono" value={content} onChange={e=>setContent(e.target.value)} />
        </div>
        <button className="px-4 py-2 border rounded">Publish</button>
      </form>
    </Layout>
  )
}
