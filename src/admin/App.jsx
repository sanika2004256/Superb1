import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import AdminLayout from '../components/AdminLayout';
import { 
  FiShield, FiAlertTriangle, FiUser, 
  FiArrowRight, FiLogOut, FiShoppingBag 
} from 'react-icons/fi';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Products'));
const Categories = lazy(() => import('../pages/Categories'));
const Franchise = lazy(() => import('../pages/Franchise'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Blogs = lazy(() => import('../pages/Blogs'));
const Enquiries = lazy(() => import('../pages/Enquiries'));
const Messages = lazy(() => import('../pages/Messages'));
const Settings = lazy(() => import('../pages/Settings'));
const Orders = lazy(() => import('../pages/Orders'));
const Customers = lazy(() => import('../pages/Customers'));

const PageLoader = () => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-[#d92906] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Redirect any unauthenticated visitor to the unified /login page with return path stored
const RedirectToUnifiedLogin = () => {
  useEffect(() => {
    try {
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath && !currentPath.startsWith('/login')) {
        sessionStorage.setItem('postLoginRedirect', currentPath);
      }
    } catch (e) {}
    window.location.replace('/login');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-[#d92906] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Redirecting to login portal...</p>
      </div>
    </div>
  );
};

// Access Denied screen shown to logged-in customers who try to enter the admin panel
const AccessDeniedCustomer = ({ user }) => {
  const handleSwitchToAdmin = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('firebase:authUser');
      localStorage.removeItem('firebase:authUser');
      window.location.replace('/login');
    } catch (err) {
      console.error(err);
      window.location.replace('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center space-y-6 relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#d92906] to-amber-500"></div>

        {/* Brand Logo */}
        <div className="flex justify-center">
          <img 
            src="/images/logo.png" 
            alt="Superb MegaCorp" 
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://superbmegacorp.com/wp-content/uploads/2021/01/new-logo-superb-mega-corp.png';
            }}
          />
        </div>

        {/* Shield Alert Icon */}
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center mx-auto shadow-xs">
          <FiShield className="w-8 h-8" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider">
            <FiAlertTriangle size={12} />
            <span>Authorization Required</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Admin Access Restricted
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            You are signed in as <strong className="text-slate-800">{user?.email || 'Customer'}</strong>. 
            This console is strictly reserved for authorized Superb MegaCorp operators.
          </p>
        </div>

        {/* Authenticated Account Badge */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between text-left text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
              <FiUser size={16} />
            </div>
            <div>
              <span className="font-bold text-slate-800 block truncate max-w-[190px]">{user?.displayName || user?.email}</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Verified Customer Account</span>
            </div>
          </div>
          <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
            Customer
          </span>
        </div>

        {/* Action Controls */}
        <div className="space-y-2.5 pt-2">
          <a
            href="/account"
            className="w-full bg-[#d92906] hover:bg-[#b91c1c] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiShoppingBag size={16} />
            <span>Go to Customer Portal &amp; Orders</span>
            <FiArrowRight size={14} />
          </a>

          <a
            href="/"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>Return to Store Home</span>
          </a>

          <button
            onClick={handleSwitchToAdmin}
            className="w-full text-slate-500 hover:text-red-600 text-xs font-semibold py-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FiLogOut size={13} />
            <span>Sign in with Administrator Account</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// Authorization Verification Helper
export const checkIsAdmin = async (currentUser) => {
  if (!currentUser) return false;

  const email = (currentUser.email || '').trim().toLowerCase();

  // 1. Explicit admin emails or staff domain
  if (
    email === 'admin@superbmegacorp.com' ||
    email === 'superb_admin@superbmegacorp.com' ||
    email.includes('admin') ||
    email.endsWith('@superbmegacorp.com')
  ) {
    return true;
  }

  // 2. Verified admin session flag
  try {
    if (sessionStorage.getItem('isAdmin') === 'true') {
      return true;
    }
  } catch (e) {}

  // 3. Firestore role verification in users collection
  if (db && currentUser.uid) {
    try {
      const snap = await getDoc(doc(db, 'users', currentUser.uid));
      if (snap.exists()) {
        const data = snap.data();
        if (data.role === 'admin' || data.isAdmin === true) {
          return true;
        }
      }
    } catch (err) {
      console.warn("Firestore admin check error:", err);
    }
  }

  return false;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth not initialized.");
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const adminStatus = await checkIsAdmin(currentUser);
          setIsAdmin(adminStatus);
          if (adminStatus) {
            try { sessionStorage.setItem('isAdmin', 'true'); } catch (e) {}
          } else {
            try { sessionStorage.removeItem('isAdmin'); } catch (e) {}
          }
        } else {
          setIsAdmin(false);
          try { sessionStorage.removeItem('isAdmin'); } catch (e) {}
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase Auth Error:", e);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#d92906] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in -> redirect to unified login portal
  if (!user) {
    return <RedirectToUnifiedLogin />;
  }

  // If logged in as customer (NOT admin) -> show Access Denied
  if (!isAdmin) {
    return <AccessDeniedCustomer user={user} />;
  }

  // Authenticated and Authorized Admin
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* /admin/login redirects directly to dashboard for authorized admin */}
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />      
        {/* Protected Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="franchise" element={<Franchise />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Suspense>
  );
}
