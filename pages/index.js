import Layout from "@/components/Layout"; import React from "react";
export default function Home(){
  const [data,setData]=React.useState(null);
  React.useEffect(()=>{fetch('/articles.json').then(r=>r.json()).then(setData)},[]);
  return <Layout>{!data? <p>Loading…</p> : <>
    <article className="prose lg:prose-lg">
      <h2 className="font-serif text-4xl mb-2">{data.latest.title}</h2>
      <p className="text-sm text-gray-600">By Bakr Al Qaraghuli, Editor · {data.latest.date}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{__html: data.latest.body.replaceAll('\n','<br/>')}}/>
    </article>
    <section className="mt-10">
      <h3 className="font-serif text-2xl mb-3">More coverage</h3>
      <ul className="space-y-2">{data.others.map(a=>(
        <li key={a.slug}><a className="underline" href={`/article/${a.slug}`}>{a.title}</a> <span className="text-xs text-gray-600">({a.date})</span></li>
      ))}</ul>
    </section>
  </>}</Layout>
}
