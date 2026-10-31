import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { 
  FiMenu, FiX, FiHome, FiBox, FiList, 
  FiImage, FiFileText, FiMessageSquare, 
  FiUsers, FiSettings, FiLogOut, FiGlobe, 
  FiShoppingCart, FiMail, FiAward, FiSearch, 
  FiHeart, FiChevronDown, FiUser
} from 'react-icons/fi';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return () => unsubscribe();
    }
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('firebase:authUser');
      localStorage.removeItem('firebase:authUser');
      window.location.replace('/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // 11 Admin Navigation Menu Items (exact match to requested list)
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="text-base" /> },
    { name: 'Orders', path: '/orders', icon: <FiShoppingCart className="text-base" /> },
    { name: 'Products', path: '/products', icon: <FiBox className="text-base" /> },
    { name: 'Categories', path: '/categories', icon: <FiList className="text-base" /> },
    { name: 'Customers', path: '/customers', icon: <FiUsers className="text-base" /> },
    { name: 'Franchise', path: '/franchise', icon: <FiAward className="text-base" /> },
    { name: 'Enquiries', path: '/enquiries', icon: <FiMessageSquare className="text-base" /> },
    { name: 'Gallery', path: '/gallery', icon: <FiImage className="text-base" /> },
    { name: 'Blogs', path: '/blogs', icon: <FiFileText className="text-base" /> },
    { name: 'Messages', path: '/messages', icon: <FiMail className="text-base" /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings className="text-base" /> },
  ];

  // User display name & avatar initial
  const userDisplayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'superb_admin';
  const userInitial = (userDisplayName.charAt(0) || 'S').toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-[#d92906] selection:text-white">
      
      {/* ========================================================
          TIER 1: MAIN WEBSITE NAVBAR (MATCHES IMAGE 2)
          ======================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px] gap-3">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="/" className="flex items-center group" title="Superb MegaCorp Home">
                <img 
                  src="/images/logo.png" 
                  alt="Superb MegaCorp" 
                  className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://superbmegacorp.com/wp-content/uploads/2021/01/new-logo-superb-mega-corp.png';
                  }}
                />
              </a>
            </div>

            {/* Main Website Navigation Links (Home, About Us, Products, Franchise HOT, Blogs, Contact) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <a 
                href="/" 
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-bold text-[#d92906] bg-red-50/70 hover:bg-red-50 transition-colors"
              >
                Home
              </a>
              <a 
                href="/about" 
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-[#d92906] hover:bg-slate-50 transition-colors"
              >
                About Us
              </a>
              <a 
                href="/products" 
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-[#d92906] hover:bg-slate-50 transition-colors"
              >
                Products
              </a>
              <a 
                href="/franchise" 
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-[#d92906] hover:bg-slate-50 transition-colors"
              >
                <span>Franchise</span>
                <span className="bg-[#d92906] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
                  HOT
                </span>
              </a>
              <a 
                href="/blogs" 
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-[#d92906] hover:bg-slate-50 transition-colors"
              >
                Blogs
              </a>
              <a 
                href="/contact" 
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-[#d92906] hover:bg-slate-50 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Right Side Icons & Actions (Search, Wishlist, Cart, User Profile, Enquire Now) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Search Icon */}
              <a 
                href="/products" 
                className="p-2 text-slate-600 hover:text-[#d92906] hover:bg-slate-100 rounded-full transition-colors"
                title="Search Products"
              >
                <FiSearch size={18} />
              </a>

              {/* Wishlist Icon */}
              <a 
                href="/wishlist" 
                className="p-2 text-slate-600 hover:text-[#d92906] hover:bg-slate-100 rounded-full transition-colors"
                title="Wishlist"
              >
                <FiHeart size={18} />
              </a>

              {/* Shopping Cart Icon */}
              <a 
                href="/cart" 
                className="p-2 text-slate-600 hover:text-[#d92906] hover:bg-slate-100 rounded-full transition-colors"
                title="Cart"
              >
                <FiShoppingCart size={18} />
              </a>

              {/* User Dropdown Pill (Image 2 exact replica: [S] superb_admin ▾) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs font-bold text-slate-800 transition-all cursor-pointer"
                  title="Account menu"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-100 text-[#d92906] flex items-center justify-center font-black text-xs shadow-inner">
                    {userInitial}
                  </div>
                  <span className="hidden sm:inline max-w-[110px] truncate">{userDisplayName}</span>
                  <FiChevronDown size={14} className={`text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Signed In As</span>
                      <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">{userDisplayName}</span>
                      <span className="text-[11px] text-slate-500 truncate block">{currentUser?.email || 'admin@superbmegacorp.com'}</span>
                      <span className="inline-block mt-1 text-[9px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200/60">
                        Super Admin
                      </span>
                    </div>

                    <div className="py-1">
                      <a 
                        href="/account" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#d92906] transition-colors"
                      >
                        <FiUser size={15} className="text-slate-400" />
                        <span>My Account</span>
                      </a>
                      <a 
                        href="/account#orders" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#d92906] transition-colors"
                      >
                        <FiShoppingCart size={15} className="text-slate-400" />
                        <span>My Orders</span>
                      </a>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#d92906] hover:bg-red-50 transition-colors"
                      >
                        <FiHome size={15} />
                        <span>Admin Dashboard</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <FiLogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Red 'Enquire Now' Button */}
              <a 
                href="/contact" 
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold shadow-xs hover:shadow-red-600/30 transition-all shrink-0 cursor-pointer"
              >
                <FiMessageSquare className="w-3.5 h-3.5" />
                <span>Enquire Now</span>
              </a>

              {/* Mobile Menu Button */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile drawer for Main Website Navbar */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              <a href="/" className="px-3 py-2 rounded-xl text-xs font-bold text-[#d92906] bg-red-50">Home</a>
              <a href="/about" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50">About Us</a>
              <a href="/products" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50">Products</a>
              <a href="/franchise" className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50">
                <span>Franchise</span>
                <span className="bg-[#d92906] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">HOT</span>
              </a>
              <a href="/blogs" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50">Blogs</a>
              <a href="/contact" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50">Contact</a>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <a href="/contact" className="inline-flex items-center gap-1.5 bg-[#d92906] text-white px-4 py-2 rounded-xl text-xs font-bold">
                <FiMessageSquare size={14} />
                <span>Enquire Now</span>
              </a>
              <button onClick={handleLogout} className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                <FiLogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>


      {/* ========================================================
          TIER 2: ADMIN NAVIGATION MENU BAR (MATCHES IMAGE 3)
          Dashboard, Orders, Products, Categories, Customers, 
          Franchise, Enquiries, Gallery, Blogs, Messages, Settings
          ======================================================== */}
      <nav className="sticky top-16 sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-2.5">
            
            {/* The 11 Admin Navigation Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/dashboard' && (location.pathname === '/' || location.pathname === ''));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#d92906] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side: 'View Website' Button (from Image 3) */}
            <div className="hidden sm:flex items-center shrink-0 ml-auto pl-3 border-l border-slate-200">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold border border-slate-200/80 transition-all whitespace-nowrap shadow-2xs"
                title="Open Public Website"
              >
                <FiGlobe className="text-[#d92906]" size={15} />
                <span>View Website</span>
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* ========================================================
          MAIN CONTENT AREA (FULL WIDTH, MANAGEMENT DESK)
          ======================================================== */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* ========================================================
          ADMIN FOOTER
          ======================================================== */}
      <footer className="border-t border-slate-200 bg-white/80 py-4 px-4 text-center text-xs text-slate-500 font-medium mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Superb MegaCorp India Pvt. Ltd. &bull; Management Desk</span>
          <span className="text-[11px] text-slate-400">Enterprise Commercial Operations &amp; Consignment Management Desk</span>
        </div>
      </footer>

    </div>
  );
}
