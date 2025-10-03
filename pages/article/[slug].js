import Layout from '@/components/Layout'; import React from 'react';
export default function Article(){
  const slug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
  const [content,setContent]=React.useState(null);
  React.useEffect(()=>{
    fetch('/articles.json').then(r=>r.json()).then(d=>{
      const latest = d.latest.slug===slug? d.latest : null;
      const other = d.others.find(o=>o.slug===slug);
      const art = latest || other || d.latest;
      setContent(art);
    });
  },[slug]);
  if(!content) return <Layout><p>Loading…</p></Layout>;
  return <Layout>
    <article className="prose lg:prose-lg">
      <h1 className="font-serif text-4xl mb-2">{content.title}</h1>
      <p className="text-sm text-gray-600">By Bakr Al Qaraghuli, Editor · {content.date||""}</p>
      <p className="mt-6">This is a static demo article. The CMS version lives in the full SSR build.</p>
    </article>
  </Layout>
}
