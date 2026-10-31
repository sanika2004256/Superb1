import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { 
  FiMenu, FiX, FiHome, FiBox, FiList, 
  FiImage, FiFileText, FiMessageSquare, 
  FiUsers, FiSettings, FiLogOut, FiGlobe, FiShoppingCart, FiMail
} from 'react-icons/fi';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('isAdmin');
      window.location.replace('/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Orders', path: '/orders', icon: <FiShoppingCart /> },
    { name: 'Products', path: '/products', icon: <FiBox /> },
    { name: 'Categories', path: '/categories', icon: <FiList /> },
    { name: 'Customers', path: '/customers', icon: <FiUsers /> },
    { name: 'Franchise', path: '/franchise', icon: <FiUsers /> },
    { name: 'Enquiries', path: '/enquiries', icon: <FiMessageSquare /> },
    { name: 'Gallery', path: '/gallery', icon: <FiImage /> },
    { name: 'Blogs', path: '/blogs', icon: <FiFileText /> },
    { name: 'Messages', path: '/messages', icon: <FiMail /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-[#d92906] selection:text-white">
      
      {/* TOP NAVIGATION BAR (REPLACES OLD VERTICAL SIDEBAR) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <img 
                  src="/images/logo.png" 
                  alt="Superb MegaCorp" 
                  className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://superbmegacorp.com/wp-content/uploads/2021/01/new-logo-superb-mega-corp.png';
                  }}
                />
                <div className="hidden sm:flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">Superb MegaCorp</span>
                    <span className="text-[9px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200/60">
                      Admin Console
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#d92906] tracking-widest uppercase">
                    Management Desk
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navbar Menu (Horizontal) */}
            <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#d92906] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: View Website, User Profile & Logout */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Public Website Link */}
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200/80"
                title="View Public Website"
              >
                <FiGlobe className="text-[#d92906]" size={14} />
                <span className="hidden lg:inline">View Website</span>
              </a>

              {/* User Profile Pill */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 shadow-2xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#d92906] to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-inner">
                  AD
                </div>
                <div className="hidden lg:flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-slate-800 leading-tight">Admin User</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Super Admin</span>
                </div>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200/60 transition-colors cursor-pointer"
                title="Logout Account"
              >
                <FiLogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile / Tablet Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>

          </div>

          {/* Sub-bar for medium screens (LG screens where 11 items might be snug) */}
          <div className="hidden lg:flex xl:hidden border-t border-slate-100 py-2 items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#d92906] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={`text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl shadow-xl px-4 py-4 space-y-1 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pb-3 border-b border-slate-100">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#d92906] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#d92906]"
              >
                <FiGlobe className="text-[#d92906]" />
                <span>View Public Website</span>
              </a>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area (Full Width, No Sidebar obstruction) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-4 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Superb MegaCorp India Pvt. Ltd. &bull; Management Desk</span>
          <span className="text-[11px] text-slate-400">Enterprise Commercial Operations &amp; Consignment Management</span>
        </div>
      </footer>

    </div>
  );
}
