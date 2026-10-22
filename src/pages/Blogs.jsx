import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', content: '', author: '', imageUrl: '', status: 'published' });

  const blogsRef = collection(db, 'blogs');

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(blogsRef);
      setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({ title: blog.title || '', content: blog.content || '', author: blog.author || '', imageUrl: blog.imageUrl || '', status: blog.status || 'published' });
    } else {
      setCurrentBlog(null);
      setFormData({ title: '', content: '', author: '', imageUrl: '', status: 'published' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentBlog) {
        await updateDoc(doc(db, 'blogs', currentBlog.id), { ...formData, updatedAt: serverTimestamp() });
        alert('Blog updated');
      } else {
        await addDoc(blogsRef, { ...formData, createdAt: serverTimestamp() });
        alert('Blog added');
      }
      closeModal();
      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert('Error saving blog');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete blog?')) {
      await deleteDoc(doc(db, 'blogs', id));
      fetchBlogs();
    }
  };

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            Blog Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Create and publish corporate articles and company news</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="relative z-10 w-full sm:w-auto justify-center bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <FiPlus className="text-lg" /> Add Article
        </button>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-gray-100">
          <input 
            type="text" 
            placeholder="Search articles..." 
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
                <th className="px-6 py-4">Title</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No blogs found.</td></tr> :
               filtered.map(b => (
                 <tr key={b.id}>
                   <td className="px-6 py-4 font-medium">{b.title}</td>
                   <td className="px-6 py-4 text-sm">{b.author}</td>
                   <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-bold rounded-full ${b.status==='published'?'bg-green-100 text-green-700':'bg-gray-100'}`}>{b.status}</span></td>
                   <td className="px-6 py-4 text-right space-x-2">
                     <button onClick={() => openModal(b)} className="text-blue-500 hover:text-blue-700 p-2"><FiEdit2 /></button>
                     <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
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
            <div className="p-8 text-center text-gray-400 text-sm">No articles found.</div>
          ) : (
            filtered.map(b => (
              <div key={b.id} className="p-3.5 flex flex-col gap-2 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{b.title}</div>
                  <span className={`shrink-0 px-2 py-0.5 text-[9px] font-bold rounded-full ${b.status==='published'?'bg-green-100 text-green-700':'bg-gray-100'}`}>{b.status}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>By {b.author || 'Admin'}</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => openModal(b)} className="p-1.5 text-blue-600 bg-blue-50 rounded-lg"><FiEdit2 size={13} /></button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 text-red-600 bg-red-50 rounded-lg"><FiTrash2 size={13} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="font-bold text-sm sm:text-base text-gray-800">{currentBlog ? 'Edit' : 'Add'} Article</h3>
              <button onClick={closeModal} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 font-bold">&times;</button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1 overscroll-contain">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div><label className="text-xs font-semibold text-gray-700 block mb-1">Title</label><input required value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary"/></div>
                  <div><label className="text-xs font-semibold text-gray-700 block mb-1">Author</label><input required value={formData.author} onChange={e=>setFormData({...formData,author:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary"/></div>
                </div>
                <div><label className="text-xs font-semibold text-gray-700 block mb-1">Content</label><textarea required rows="4" value={formData.content} onChange={e=>setFormData({...formData,content:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary resize-none"></textarea></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Status</label>
                    <select value={formData.status} onChange={e=>setFormData({...formData,status:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary font-bold text-slate-700"><option value="published">Published</option><option value="draft">Draft</option></select>
                  </div>
                  <div><label className="text-xs font-semibold text-gray-700 block mb-1">Image URL</label><input value={formData.imageUrl} onChange={e=>setFormData({...formData,imageUrl:e.target.value})} className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="https://..."/></div>
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
