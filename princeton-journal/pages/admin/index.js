
import Layout from '@/components/Layout';
export default function Admin(){
  return (
    <Layout>
      <h1 className="font-serif text-3xl mb-6">Admin</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li><a className="underline" href="/admin/articles">Manage Articles</a></li>
        <li><a className="underline" href="/admin/tracker">Manage City Council Tracker</a></li>
      </ul>
      <p className="mt-6 text-sm text-neutral-600">Note: this demo admin is unsecured. Protect these routes before going live.</p>
    </Layout>
  )
}
