import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseConfig';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiImage } from 'react-icons/fi';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });
  const [uploadingImage, setUploadingImage] = useState(false);

  const galleryRef = collection(db, 'gallery');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(galleryRef);
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Failed to upload image. Make sure Firebase Storage is enabled.");
    } finally {
      setUploadingImage(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ title: item.title || '', description: item.description || '', imageUrl: item.imageUrl || '' });
    } else {
      setCurrentItem(null);
      setFormData({ title: '', description: '', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await updateDoc(doc(db, 'gallery', currentItem.id), formData);
      } else {
        await addDoc(galleryRef, { ...formData, createdAt: serverTimestamp() });
      }
      closeModal();
      fetchItems();
    } catch (error) { alert('Error saving item'); }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this image?')) {
      await deleteDoc(doc(db, 'gallery', id));
      fetchItems();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiImage className="text-primary" />
            Media Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Manage and upload photos for your website</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="relative z-10 w-full sm:w-auto justify-center bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <FiPlus className="text-lg" /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 text-sm">Loading gallery...</div>
      ) : items.length === 0 ? (
        <div className="bg-white p-8 sm:p-12 text-center rounded-2xl border border-gray-100 text-gray-500 text-sm">No gallery items found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group relative flex flex-col"
            >
              <div className="absolute top-2 right-2 flex gap-1.5 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(item)} className="p-1.5 sm:p-2 bg-white/95 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-100">
                  <FiEdit2 size={13} />
                </button>
                <button onClick={(e) => handleDelete(item.id, e)} className="p-1.5 sm:p-2 bg-white/95 backdrop-blur-sm text-red-600 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-100">
                  <FiTrash2 size={13} />
                </button>
              </div>

              <div className="h-36 sm:h-48 bg-white relative p-2 flex items-center justify-center">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                )}
              </div>
              <div className="p-3 sm:p-4 border-t border-gray-50 bg-slate-50/50 mt-auto">
                <h3 className="font-bold text-xs sm:text-sm text-gray-800 truncate">{item.title || 'Untitled'}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate mt-0.5">{item.description || 'No description'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="font-bold text-base sm:text-lg text-gray-800">{currentItem ? 'Edit Image' : 'Add New Image'}</h3>
              <button onClick={closeModal} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-red-500 shadow-xs font-bold text-lg">&times;</button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1 overscroll-contain">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">Upload Photo</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 object-contain rounded-xl border border-gray-200 bg-white p-1 shrink-0" />
                    ) : (
                      <div className="w-20 h-20 bg-slate-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                        <FiImage size={24} />
                      </div>
                    )}
                    
                    <label className="cursor-pointer w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-colors flex items-center justify-center gap-2">
                      {uploadingImage ? (
                        <span className="text-primary font-bold">Uploading...</span>
                      ) : (
                        <>
                          <FiUpload />
                          <span>Choose File</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Image URL (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.imageUrl} 
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
                    placeholder="https://..." 
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
                    placeholder="e.g. Shop Opening" 
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none" 
                    placeholder="Details..."
                    rows="2"
                  ></textarea>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-slate-50 border-t flex justify-end gap-2.5 shrink-0">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium text-xs sm:text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={uploadingImage} className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-colors disabled:opacity-50 shadow-md shadow-primary/20">
                  {currentItem ? 'Update Image' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
