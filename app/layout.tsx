// app/layout.js
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Smart Agriculture ML Dashboard',
  description: '8 ML Models From Scratch — Crop & Fertilizer Recommendation',
};

const NAV = [
  { section: 'Overview',  items: [{ href:'/',            icon:'🏠', label:'Home' }] },
  { section: 'Data',      items: [{ href:'/dataset',     icon:'📊', label:'Dataset' }] },
  { section: 'Models',    items: [
    { href:'/algorithms', icon:'🧮', label:'Algorithms', badge:'8' },
    { href:'/comparison', icon:'📈', label:'Comparison' },
    { href:'/metrics',    icon:'🎯', label:'All Metrics' },
  ]},
  { section: 'Results',   items: [
    { href:'/bestmodel',  icon:'🏆', label:'Best Model' },
    { href:'/predictor',  icon:'🔮', label:'Live Predictor' },
  ]},
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <nav className="sidebar">
            <div className="sidebar-logo">
              <div className="title">🌾 AgriML</div>
              <div className="sub">Smart Agriculture Dashboard</div>
            </div>
            {NAV.map(group => (
              <div key={group.section}>
                <div className="nav-section">{group.section}</div>
                {group.items.map(item => (
                  <NavItem key={item.href} {...item} />
                ))}
              </div>
            ))}
          </nav>
          <main className="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

// Client component for active link detection
function NavItem({ href, icon, label, badge }) {
  return (
    <Link href={href} className="nav-item" style={{ textDecoration:'none' }}>
      <span className="nav-icon">{icon}</span>
      {label}
      {badge && (
        <span style={{
          background:'var(--gold)', color:'#000', fontSize:'9px',
          fontWeight:700, padding:'2px 6px', borderRadius:'20px',
          marginLeft:'auto', fontFamily:'var(--font-mono)'
        }}>{badge}</span>
      )}
    </Link>
  );
}