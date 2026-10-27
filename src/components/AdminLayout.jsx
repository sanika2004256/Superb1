import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { 
  FiMenu, FiX, FiHome, FiBox, FiList, 
  FiImage, FiFileText, FiMessageSquare, 
  FiUsers, FiSettings, FiLogOut, FiGlobe, FiShoppingCart 
} from 'react-icons/fi';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Customers', path: '/customers', icon: <FiUsers /> },
    { name: 'Customer Orders', path: '/orders', icon: <FiShoppingCart /> },
    { name: 'Products', path: '/products', icon: <FiBox /> },
    { name: 'Categories', path: '/categories', icon: <FiList /> },
    { name: 'Franchise', path: '/franchise', icon: <FiUsers /> },
    { name: 'Gallery', path: '/gallery', icon: <FiImage /> },
    { name: 'Blogs', path: '/blogs', icon: <FiFileText /> },
    { name: 'Enquiries', path: '/enquiries', icon: <FiMessageSquare /> },
    { name: 'Messages', path: '/messages', icon: <FiMessageSquare /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-800 selection:bg-primary/20 selection:text-primary">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col shadow-2xl lg:shadow-none border-r border-slate-800/50`}
      >
        <div className="flex items-center justify-center h-20 px-6 bg-white shadow-sm z-10">
          <img 
            src="https://superbmegacorp.com/wp-content/uploads/2021/01/new-logo-superb-mega-corp.png" 
            alt="Superb MegaCorp Logo" 
            className="h-12 object-contain hover:scale-105 transition-transform duration-300"
          />
          <button 
            className="ml-auto lg:hidden text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className="px-5 mb-6">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-2.5 bg-slate-800/50 text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white transition-all border border-slate-700/50 text-sm font-semibold shadow-sm hover:shadow-md"
            >
              <FiGlobe className="text-primary" />
              View Public Website
            </a>
          </div>
          
          <div className="px-3 mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase ml-2">Menu</div>
          <ul className="space-y-1.5 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    location.pathname === item.path 
                      ? 'bg-primary text-white shadow-md shadow-primary/20 font-semibold' 
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100 font-medium'
                  }`}
                >
                  <span className={`${location.pathname === item.path ? 'text-white' : 'text-slate-500 group-hover:text-primary'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm tracking-wide">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-5 border-t border-slate-800/80 bg-slate-900/50">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 font-medium text-sm hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all duration-200"
          >
            <FiLogOut className="text-lg" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        {/* Top Header */}
        <header className="h-16 sm:h-20 bg-white/85 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-3.5 sm:px-6 z-10 sticky top-0 transition-all">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-primary transition-colors p-2.5 rounded-xl hover:bg-slate-100 active:scale-95 focus:outline-none"
              aria-label="Open sidebar menu"
            >
              <FiMenu size={22} />
            </button>
            <div className="hidden sm:flex items-center relative group">
              <span className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2.5 w-64 rounded-full bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all outline-none font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              <FiGlobe className="text-primary" size={14} />
              <span>Site</span>
            </a>
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 sm:pr-4 rounded-full bg-white border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-all">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-inner">
                AD
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-sm font-bold text-slate-800 leading-tight">Admin User</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Super Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 overscroll-contain">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
