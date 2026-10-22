import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '', status: 'active' });

  const categoriesRef = collection(db, 'categories');

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(categoriesRef);
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({
        name: category.name || '', description: category.description || '', imageUrl: category.imageUrl || '', status: category.status || 'active'
      });
    } else {
      setCurrentCategory(null);
      setFormData({ name: '', description: '', imageUrl: '', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentCategory) {
        await updateDoc(doc(db, 'categories', currentCategory.id), { ...formData, updatedAt: serverTimestamp() });
        alert('Category updated');
      } else {
        await addDoc(categoriesRef, { ...formData, createdAt: serverTimestamp() });
        alert('Category added');
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert('Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete category?')) {
      await deleteDoc(doc(db, 'categories', id));
      fetchCategories();
    }
  };

  const filtered = categories.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            Product Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Manage item classifications and groupings</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="relative z-10 w-full sm:w-auto justify-center bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <FiPlus className="text-lg" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-gray-100">
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="w-full sm:w-72 px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary" 
          />
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b">
                <th className="px-6 py-4">Name</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">No categories found.</td></tr> :
               filtered.map(c => (
                 <tr key={c.id}>
                   <td className="px-6 py-4 font-medium">{c.name}</td>
                   <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${c.status==='active'?'bg-green-100 text-green-700':'bg-gray-100'}`}>{c.status}</span></td>
                   <td className="px-6 py-4 text-right space-x-2">
                     <button onClick={() => openModal(c)} className="text-blue-500 hover:text-blue-700 p-2"><FiEdit2 /></button>
                     <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="block md:hidden divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No categories found.</div>
          ) : (
            filtered.map(c => (
              <div key={c.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-bold text-slate-800">{c.name}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-full ${c.status==='active'?'bg-green-100 text-green-700':'bg-gray-100'}`}>{c.status}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => openModal(c)} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><FiEdit2 size={13} /></button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 bg-red-50 rounded-lg"><FiTrash2 size={13} /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="font-bold text-sm sm:text-base text-gray-800">{currentCategory ? 'Edit' : 'Add'} Category</h3>
              <button onClick={closeModal} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 font-bold">&times;</button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Name</label><input required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary"/></div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Description</label><textarea value={formData.description} onChange={e=>setFormData({...formData,description:e.target.value})} rows="2" className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary resize-none"></textarea></div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Status</label>
                  <select value={formData.status} onChange={e=>setFormData({...formData,status:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary font-bold text-slate-700"><option value="active">Active</option><option value="inactive">Inactive</option></select>
                </div>
              </div>
              <div className="flex justify-end gap-2 p-3.5 sm:p-4 border-t bg-slate-50 shrink-0">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-white border border-gray-200 text-xs sm:text-sm font-bold rounded-xl text-gray-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-primary/20">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
