import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Daraja la Utamaduni Organization',
  description: 'Community development, culture, partnerships and sustainable impact.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="nav-wrap">
            <Link href="/" className="brand">DARAJA <span>LA UTAMADUNI</span></Link>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/#about">About</Link>
              <Link href="/#what-we-do">Our Work</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/gallery">Gallery</Link>
              <a href="/#partner">Partner</a>
              <a href="/#contact">Contact</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div>
            <strong>Daraja la Utamaduni Organization</strong>
            <p>Culture. Community. Opportunity. Sustainable development.</p>
          </div>
          <div><Link href="/projects">Projects</Link> · <Link href="/gallery">Gallery</Link> · <a href="/#contact">Contact</a></div>
        </footer>
      </body>
    </html>
  );
}
