import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import AdminLayout from '../components/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Categories from '../pages/Categories';
import Franchise from '../pages/Franchise';
import Gallery from '../pages/Gallery';
import Blogs from '../pages/Blogs';
import Enquiries from '../pages/Enquiries';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import Orders from '../pages/Orders';
import Customers from '../pages/Customers';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth not initialized. Please add .env file.");
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Firebase Auth Error:", e);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />      
      {/* Protected Admin Routes */}
      <Route path="/" element={user ? <AdminLayout /> : <Navigate to="/login" />}>
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
  );
}

