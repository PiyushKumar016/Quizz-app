import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    ...(isAdmin ? [{ to: '/admindashboard', label: 'Admin' }] : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
      <nav className="w-full max-w-5xl bg-[#0f0a1e]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_0_40px_rgba(139,92,246,0.15)]">

        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-500/40">
            G
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Gyan<span className="text-violet-400">ito</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'bg-violet-600/30 text-violet-300 shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
                <div className="w-6 h-6 rounded-full bg-violet-600/40 border border-violet-500/40 flex items-center justify-center text-violet-300 text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-slate-300 text-sm font-medium">{user.name}</span>
                {isAdmin && (
                  <span className="text-xs bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-medium">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-red-400 border border-white/8 hover:border-red-500/30 px-3.5 py-2 rounded-xl transition-all hover:bg-red-500/5"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 px-5 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute top-[76px] left-4 right-4 bg-[#0f0a1e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.to)
                  ? 'bg-violet-600/30 text-violet-300'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2.5">
                  <div className="w-7 h-7 rounded-full bg-violet-600/40 border border-violet-500/40 flex items-center justify-center text-violet-300 text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{user.name}</span>
                  {isAdmin && (
                    <span className="text-xs bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-white/8 hover:border-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 text-center transition-all">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}