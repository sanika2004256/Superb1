import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiSearch, FiBox, FiCheckCircle, FiTruck, FiTrash2, FiShoppingBag, FiClock, FiPlus } from 'react-icons/fi';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedOrders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', id), { orderStatus: newStatus });
      setOrders(orders.map(o => o.id === id ? { ...o, orderStatus: newStatus } : o));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    (o.customer?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (o.orderNumber || '').toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Dispatched': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Delivered': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Cancelled': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  return (
    <>
    <div className="space-y-4 sm:space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiShoppingBag className="text-primary" />
            Customer Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Manage and track all incoming website orders</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Search Bar */}
        <div className="p-3.5 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-md group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="px-6 py-5">Order ID & Date</th>
                <th className="px-6 py-5">Customer Info</th>
                <th className="px-6 py-5">Order Items</th>
                <th className="px-6 py-5">Total</th>
                <th className="px-6 py-5">Payment</th>
                <th className="px-6 py-5 text-right">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
                      <p className="font-medium">Loading amazing orders...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-slate-400">
                    <FiShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                    <p className="font-medium text-slate-500">No orders found.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800 tracking-tight">#{order.orderNumber || order.id.substring(0,8)}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                        <FiClock className="w-3 h-3" />
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-800 capitalize">{order.customer?.name || 'Guest User'}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wide">{order.customer?.city || 'No city'}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-slate-600 max-w-xs break-words">
                        {order.items?.map(i => `${i.quantity}x ${i.name} ${i.sku ? `(${i.sku})` : ''}`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-extrabold text-slate-800 text-base">
                        ₹{(order.total || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-slate-700 mb-1.5">{order.paymentMethod || 'Unknown'}</div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider ${
                        (order.paymentStatus || '').toLowerCase().includes('paid') && !(order.paymentStatus || '').toLowerCase().includes('pending')
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {order.paymentStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                        <select 
                          value={order.orderStatus || 'Pending'} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-bold rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none ${getStatusColor(order.orderStatus || 'Pending')}`}
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="Confirmed">🔥 Confirmed</option>
                          <option value="Dispatched">🚚 Dispatched</option>
                          <option value="Delivered">✅ Delivered</option>
                          <option value="Cancelled">❌ Cancelled</option>
                        </select>
                        
                        <button 
                          onClick={() => openModal(order)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          title="View Order Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                        <button 
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this order?")) {
                              try {
                                await deleteDoc(doc(db, 'orders', order.id));
                                setOrders(orders.filter(o => o.id !== order.id));
                              } catch(e) { console.error(e); }
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete Order"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="block md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-sm">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No orders found.</div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="p-3.5 sm:p-4 flex flex-col gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">#{order.orderNumber || order.id.substring(0,8)}</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                    </span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                    (order.paymentStatus || '').toLowerCase().includes('paid') && !(order.paymentStatus || '').toLowerCase().includes('pending')
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 capitalize">{order.customer?.name || 'Guest User'}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">{order.customer?.city || 'No city'}</div>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    ₹{(order.total || 0).toLocaleString()}
                  </div>
                </div>

                <div className="text-xs text-slate-600 line-clamp-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'No item details'}
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <select 
                    value={order.orderStatus || 'Pending'} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-xs font-bold rounded-xl border px-2.5 py-1.5 outline-none transition-all cursor-pointer ${getStatusColor(order.orderStatus || 'Pending')}`}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Confirmed">🔥 Confirmed</option>
                    <option value="Dispatched">🚚 Dispatched</option>
                    <option value="Delivered">✅ Delivered</option>
                    <option value="Cancelled">❌ Cancelled</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => openModal(order)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>Details</span>
                    </button>
                    <button 
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this order?")) {
                          try {
                            await deleteDoc(doc(db, 'orders', order.id));
                            setOrders(orders.filter(o => o.id !== order.id));
                          } catch(e) { console.error(e); }
                        }
                      }}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Delete Order"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Order #{selectedOrder.orderNumber || selectedOrder.id.substring(0,8)}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}</p>
              </div>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Customer Details */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Name</p>
                    <p className="font-semibold text-slate-800">{selectedOrder.customer?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Phone</p>
                    <p className="font-semibold text-slate-800">{selectedOrder.customer?.phone || selectedOrder.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Email</p>
                    <p className="font-semibold text-slate-800">{selectedOrder.customer?.email || selectedOrder.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">City / Region</p>
                    <p className="font-semibold text-slate-800 uppercase">{selectedOrder.customer?.city || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-slate-500 mb-1">Full Shipping Address</p>
                    <p className="font-semibold text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 mt-1">
                      {selectedOrder.customer?.address || selectedOrder.customer?.fullAddress || 'Address not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FiShoppingBag size={16} /> Order Items
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-600">Item</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-center">Qty</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Price</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(selectedOrder.items || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-medium text-slate-800">{item.name} {item.sku && <span className="text-xs text-slate-400 font-mono ml-2 block sm:inline">({item.sku})</span>}</td>
                          <td className="px-4 py-3 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">₹{item.price || 0}</td>
                          <td className="px-4 py-3 text-right font-bold">₹{(item.price || 0) * (item.quantity || 1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-slate-50 p-4 flex justify-between items-center border-t border-slate-200">
                    <span className="font-bold text-slate-700">Grand Total</span>
                    <span className="text-xl font-extrabold text-primary">₹{(selectedOrder.total || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Payment Method</p>
                  <p className="font-bold text-slate-800">{selectedOrder.paymentMethod || 'Unknown'}</p>
                  <p className="text-xs font-semibold mt-1 text-slate-500">{selectedOrder.paymentStatus}</p>
                </div>
                <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4">
                  <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Current Status</p>
                  <p className="font-bold text-slate-800">{selectedOrder.orderStatus || 'Pending'}</p>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
              <button onClick={closeModal} className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
