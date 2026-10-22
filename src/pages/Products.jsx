import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseConfig';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiUpload, FiDownload, FiImage, FiBox } from 'react-icons/fi';
import legacyProducts from '../legacyProducts.json';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [importing, setImporting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '', category: '', description: '', price: '', sku: '', packSize: '', imageUrl: '', status: 'active'
  });

  const productsRef = collection(db, 'products');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(productsRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const importLegacyData = async () => {
    if (!window.confirm("This will import all 92 original products from your public website into Firebase. Continue?")) return;
    setImporting(true);
    try {
      let count = 0;
      for (const p of legacyProducts) {
        await addDoc(collection(db, 'products'), {
          name: p.name,
          category: p.categoryName || p.category || 'General',
          price: "₹" + p.mrp,
          status: 'active',
          description: p.packing || '',
          imageUrl: p.image || p.imageFront || '',
          sku: p.sku || ''
        });
        count++;
      }
      alert(`Successfully imported ${count} products!`);
      fetchProducts();
    } catch (error) {
      console.error("Error importing products", error);
      alert("Error importing products.");
    } finally {
      setImporting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
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

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name || '',
        category: product.category || '',
        description: product.description || '',
        price: product.price || '',
        sku: product.sku || '',
        packSize: product.packSize || '',
        imageUrl: product.imageUrl || '',
        boxImage: product.boxImage || '',
        sachetFrontImage: product.sachetFrontImage || '',
        sachetBackImage: product.sachetBackImage || '',
        status: product.status || 'active'
      });
    } else {
      setCurrentProduct(null);
      setFormData({ name: '', category: '', description: '', price: '', sku: '', packSize: '', imageUrl: '', boxImage: '', sachetFrontImage: '', sachetBackImage: '', status: 'active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await updateDoc(doc(db, 'products', currentProduct.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
        alert('Product updated successfully');
      } else {
        await addDoc(productsRef, {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Product added successfully');
      }
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product", error);
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiBox className="text-primary" />
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Manage and organize your store's products</p>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="relative z-10 w-full sm:w-auto justify-center bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <FiPlus className="text-lg" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover border border-gray-200 bg-white" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                            <FiImage />
                          </div>
                        )}
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => alert(`${product.name} added successfully!`)} title="Add to Cart" className="text-green-500 hover:text-green-700 p-2"><FiPlus /></button>
                      <button onClick={() => openModal(product)} title="Edit Product" className="text-blue-500 hover:text-blue-700 p-2"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(product.id)} title="Delete Product" className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="block md:hidden divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="p-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-xl border border-gray-100 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <FiImage className="text-gray-300" size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-gray-900 truncate">{product.name}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full shrink-0 ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">{product.category}</div>
                  <div className="text-xs font-black text-primary mt-0.5">{product.price}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0 pl-1">
                  <button onClick={() => openModal(product)} title="Edit" className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 active:scale-95 transition-all">
                    <FiEdit2 size={13} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} title="Delete" className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 active:scale-95 transition-all">
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}>
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-white/20" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white shrink-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">{currentProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                <span className="font-bold text-lg leading-none">&times;</span>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Product Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Masala Chai" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Category</label>
                    <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Beverages" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Description</label>
                  <textarea required rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Enter product details..."></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Price</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full pl-8 pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-slate-700" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Status</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer font-bold text-slate-700">
                      <option value="active">✅ Active</option>
                      <option value="inactive">❌ Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Product Image</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                    {formData.imageUrl ? (
                      <div className="relative group shrink-0">
                        <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl shadow-sm border border-gray-200 bg-white" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center text-gray-400 shadow-sm shrink-0">
                        <FiImage size={20} className="mb-0.5 opacity-50" />
                        <span className="text-[9px] font-medium">No Image</span>
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <label className="flex items-center justify-center w-full px-3 py-2 sm:py-2.5 bg-white border-2 border-dashed border-blue-200 hover:border-primary rounded-xl cursor-pointer hover:bg-blue-50/50 transition-all group">
                        <div className="flex items-center gap-2 text-gray-500 group-hover:text-primary transition-colors text-xs font-medium">
                          {uploadingImage ? (
                            <span className="text-primary flex items-center gap-2">
                              <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </span>
                          ) : (
                            <>
                              <FiUpload className="w-4 h-4" />
                              <span>Upload Local Image</span>
                            </>
                          )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                      </label>
                      <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-300" placeholder="Or paste image URL (https://...)" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border-t border-gray-100 flex justify-end gap-2.5 shrink-0">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-xs sm:text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                  {currentProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
