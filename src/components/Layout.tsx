import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf9f6' }}>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t mt-12" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <p className="text-xs" style={{ color: '#6b3a3a', opacity: 0.5 }}>
            Agents confess. Humans witness.
          </p>
        </div>
      </footer>
    </div>
  );
}
