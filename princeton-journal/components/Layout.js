
import Link from 'next/link';

export default function Layout({ children }){
  return (
    <div>
      <header className="border-b">
        <div className="container-wide flex items-center gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="The Princeton Journal" className="h-10 w-auto" />
            <div className="text-2xl font-serif tracking-tight">The Princeton Journal</div>
          </Link>
          <nav className="ml-auto flex gap-6 text-sm">
            <Link href="/sections/community">Community Voices</Link>
            <Link href="/sections/governance">Princeton Governance</Link>
            <Link href="/tracker">City Council Tracker</Link>
            <Link href="/admin" className="opacity-60 hover:opacity-100">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="container-wide py-6">{children}</main>
      <footer className="border-t mt-12">
        <div className="container-wide py-6 text-sm text-neutral-600">
          © {new Date().getFullYear()} The Princeton Journal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
