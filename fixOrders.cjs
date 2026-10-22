const fs = require('fs');

let code = fs.readFileSync('src/pages/Orders.jsx', 'utf8');

// 1. Remove createTestOrder function
const createTestFnStart = code.indexOf('const createTestOrder = async () => {');
const createTestFnEnd = code.indexOf('};', code.indexOf('fetchOrders();', createTestFnStart)) + 2;
if (createTestFnStart !== -1) {
    code = code.substring(0, createTestFnStart) + code.substring(createTestFnEnd);
}

// 2. Remove Generate Test Order button
const btnStart = code.indexOf('<button \n          onClick={createTestOrder}');
const btnEnd = code.indexOf('</button>', btnStart) + 9;
if (btnStart !== -1) {
    code = code.substring(0, btnStart) + code.substring(btnEnd);
}

// 3. Fix Rupee Symbol
code = code.replace(/,1\{\(order\.total/g, '₹{(order.total');

// 4. Fix Dropdown Emojis
code = code.replace(/<option value="Pending">[^<]*<\/option>/g, '<option value="Pending">⏳ Pending</option>');
code = code.replace(/<option value="Confirmed">[^<]*<\/option>/g, '<option value="Confirmed">🔥 Confirmed</option>');
code = code.replace(/<option value="Dispatched">[^<]*<\/option>/g, '<option value="Dispatched">🚚 Dispatched</option>');
code = code.replace(/<option value="Delivered">[^<]*<\/option>/g, '<option value="Delivered">✅ Delivered</option>');
code = code.replace(/<option value="Cancelled">[^<]*<\/option>/g, '<option value="Cancelled">❌ Cancelled</option>');

// 5. Add Modal State and View Button
code = code.replace('const [search, setSearch] = useState(\'\');', 
  `const [search, setSearch] = useState('');\n  const [selectedOrder, setSelectedOrder] = useState(null);\n  const [isModalOpen, setIsModalOpen] = useState(false);\n\n  const openModal = (order) => {\n    setSelectedOrder(order);\n    setIsModalOpen(true);\n  };\n\n  const closeModal = () => {\n    setIsModalOpen(false);\n    setSelectedOrder(null);\n  };`);

// 6. Add 'View' eye icon to the row
const deleteBtnIdx = code.indexOf('<button \n                          onClick={async () => {');
if (deleteBtnIdx !== -1) {
    const eyeBtn = `
                        <button 
                          onClick={() => openModal(order)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          title="View Order Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
`;
    code = code.substring(0, deleteBtnIdx) + eyeBtn + code.substring(deleteBtnIdx);
}

// 7. Add Modal JSX at the end of the file
const modalJSX = `
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Order #{selectedOrder.orderNumber || selectedOrder.id.substring(0,8)}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'N/A'}</p>
              </div>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
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
                          <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
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
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={closeModal} className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
`;

code = code.replace('    </div>\n  );\n}\n', '    </div>\n' + modalJSX + '  );\n}\n');

fs.writeFileSync('src/pages/Orders.jsx', code);
console.log('Successfully updated Orders.jsx!');
