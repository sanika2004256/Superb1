import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiSettings, FiSave } from 'react-icons/fi';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [content, setContent] = useState({
    heroTitle: '',
    heroDescription: '',
    heroImage: '',
    primaryBtnText: '',
    primaryBtnLink: '',
    aboutTitle: '',
    aboutDescription: '',
    aboutImage: '',
    
    storeName: '',
    contactEmail: '',
    contactPhone: '',
    whatsappNumber: '',
    storeAddress: '',
    
    facebookUrl: '',
    instagramUrl: '',
    
    currencySymbol: '₹',
    taxRate: '0',
    shippingCost: '0'
  });

  const contentDocRef = doc(db, 'settings', 'websiteContent');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(contentDocRef);
      if (docSnap.exists()) {
        setContent({ ...content, ...docSnap.data() });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(contentDocRef, content, { merge: true });
      alert('Content saved successfully');
    } catch (error) {
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiSettings className="text-primary" />
            Website Content & Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Manage and configure dynamic content for your main public website</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
        
        {/* Store Information Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-slate-50 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
            <h2 className="font-bold text-sm sm:text-base text-gray-800">Store Information</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Store Name</label>
                <input type="text" value={content.storeName} onChange={e=>setContent({...content, storeName: e.target.value})} placeholder="Superb MegaCorp" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Contact Email</label>
                <input type="email" value={content.contactEmail} onChange={e=>setContent({...content, contactEmail: e.target.value})} placeholder="support@superb.com" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Contact Phone</label>
                <input type="text" value={content.contactPhone} onChange={e=>setContent({...content, contactPhone: e.target.value})} placeholder="+91 9876543210" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
                <input type="text" value={content.whatsappNumber} onChange={e=>setContent({...content, whatsappNumber: e.target.value})} placeholder="+91 9876543210" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Store Physical Address</label>
              <textarea rows="2" value={content.storeAddress} onChange={e=>setContent({...content, storeAddress: e.target.value})} placeholder="Shop No. 1, Main Market..." className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* E-commerce Configurations */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-slate-50 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
            <h2 className="font-bold text-sm sm:text-base text-gray-800">E-Commerce & Financial</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Currency Symbol</label>
                <input type="text" value={content.currencySymbol} onChange={e=>setContent({...content, currencySymbol: e.target.value})} placeholder="₹" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none font-bold text-slate-700" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Default Tax (GST %)</label>
                <input type="number" value={content.taxRate} onChange={e=>setContent({...content, taxRate: e.target.value})} placeholder="18" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Base Shipping Cost</label>
                <input type="number" value={content.shippingCost} onChange={e=>setContent({...content, shippingCost: e.target.value})} placeholder="50" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-slate-50 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
            <h2 className="font-bold text-sm sm:text-base text-gray-800">Social Media Links</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Facebook URL</label>
                <input type="url" value={content.facebookUrl} onChange={e=>setContent({...content, facebookUrl: e.target.value})} placeholder="https://facebook.com/..." className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Instagram URL</label>
                <input type="url" value={content.instagramUrl} onChange={e=>setContent({...content, instagramUrl: e.target.value})} placeholder="https://instagram.com/..." className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="w-full sm:w-auto justify-center bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-primary text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 min-h-[44px]">
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save All Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
