import Layout from '@/components/Layout'; import React from 'react';
export default function Tracker(){
  const [d,setD]=React.useState(null); const [q,setQ]=React.useState('');
  React.useEffect(()=>{fetch('/tracker.json').then(r=>r.json()).then(setD)},[]);
  if(!d) return <Layout><p>Loading…</p></Layout>;
  const weeks = d.weeks.filter(w => JSON.stringify(w).toLowerCase().includes(q.toLowerCase()));
  return <Layout>
    <h1 className="font-serif text-3xl mb-4">City Council Tracker</h1>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search agenda / votes" className="border px-3 py-2 w-full mb-4"/>
    <div className="space-y-6">
      {weeks.map((w,i)=>(<div key={i} className="border rounded p-4">
        <div className="flex items-baseline justify-between"><h2 className="font-serif text-2xl">Week of {w.weekOf}</h2><a className="underline" href={w.agendaUrl}>Agenda</a></div>
        <ul className="mt-4 space-y-2">
          {w.items.map((it,ix)=>(<li key={ix} className="bg-gray-50 p-3 rounded">
            <p className="font-medium">{it.title}</p><p className="text-sm text-gray-600">{it.explanation}</p>
            <div className="grid grid-cols-4 gap-2 mt-2 text-sm">
              {Object.entries(it.votes).map(([role,v])=>(<div key={role} className="border rounded px-2 py-1">{role}: <b>{v}</b></div>))}
            </div>
          </li>))}
        </ul>
      </div>))}
    </div>
  </Layout>;
}