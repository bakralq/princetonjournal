export default function Layout({children}){
  return (<div className="max-w-3xl mx-auto px-4 py-8">
    <header className="flex items-center justify-between border-b pb-4 mb-6">
      <a href="/"><h1 className="font-serif text-3xl">The Princeton Journal</h1></a>
      <nav className="space-x-4 text-sm">
        <a href="/sections/community">Community Voices</a>
        <a href="/sections/governance">Princeton Governance</a>
        <a href="/tracker">City Council Tracker</a>
      </nav>
    </header>
    <main>{children}</main>
    <footer className="mt-12 border-t pt-4 text-xs text-gray-600">© The Princeton Journal</footer>
  </div>);
}
