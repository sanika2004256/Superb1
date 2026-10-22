import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiTrash2, FiSearch, FiEye } from 'react-icons/fi';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messagesRef = collection(db, 'contactMessages');

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(messagesRef);
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'contactMessages', id), { status: newStatus });
      fetchMessages();
    } catch (error) { alert('Error updating status'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete message?')) {
      await deleteDoc(doc(db, 'contactMessages', id));
      fetchMessages();
    }
  };

  const filtered = messages.filter(m => 
    m.name?.toLowerCase().includes(search.toLowerCase()) || 
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Contact Messages</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Direct customer messages and inquiries</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-gray-100"><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-72 px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary" /></div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b">
                <th className="px-6 py-4">Sender</th><th className="px-6 py-4">Subject</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No messages found.</td></tr> :
               filtered.map(m => (
                 <tr key={m.id} className={m.status === 'unread' ? 'bg-blue-50/50' : ''}>
                   <td className="px-6 py-4 font-medium text-sm">
                     <div>{m.name}</div><div className="text-gray-500 text-xs">{m.email}</div>
                   </td>
                   <td className="px-6 py-4 text-sm truncate max-w-xs">{m.subject || 'No Subject'}</td>
                   <td className="px-6 py-4">
                     <select value={m.status || 'new'} onChange={(ev) => handleStatusChange(m.id, ev.target.value)} className="bg-slate-50 border rounded text-xs px-2 py-1 outline-none">
                       <option value="unread">Unread</option>
                       <option value="read">Read</option>
                     </select>
                   </td>
                   <td className="px-6 py-4 text-right space-x-2">
                     <button onClick={() => { setSelectedMessage(m); handleStatusChange(m.id, 'read'); }} className="text-blue-500 hover:text-blue-700 p-2"><FiEye /></button>
                     <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
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
            <div className="p-8 text-center text-gray-400 text-sm">No messages found.</div>
          ) : (
            filtered.map(m => (
              <div key={m.id} className={`p-3.5 flex flex-col gap-2 transition-colors ${m.status === 'unread' ? 'bg-blue-50/40' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{m.name}</span>
                  <select value={m.status || 'new'} onChange={(ev) => handleStatusChange(m.id, ev.target.value)} className="bg-white border rounded text-[10px] px-2 py-1 outline-none font-bold">
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                </div>
                <div className="text-xs text-slate-600 line-clamp-1">{m.subject || 'No Subject'}</div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <a href={`mailto:${m.email}`} className="text-blue-600 truncate max-w-[180px]">{m.email}</a>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { setSelectedMessage(m); handleStatusChange(m.id, 'read'); }} className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                      View
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="p-1 text-red-600 bg-red-50 rounded-lg">
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedMessage(null)}>
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="font-bold text-sm sm:text-base text-gray-800">Message Details</h3>
              <button onClick={() => setSelectedMessage(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 font-bold">&times;</button>
            </div>
            <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Name</p><p className="font-semibold text-slate-800 mt-0.5">{selectedMessage.name}</p></div>
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Email</p><a href={`mailto:${selectedMessage.email}`} className="font-semibold text-blue-600 hover:underline mt-0.5 block truncate">{selectedMessage.email}</a></div>
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Phone</p><a href={`tel:${selectedMessage.phone}`} className="font-semibold text-emerald-600 hover:underline mt-0.5 block">{selectedMessage.phone || 'N/A'}</a></div>
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Subject</p><p className="font-semibold text-slate-800 mt-0.5">{selectedMessage.subject || 'No Subject'}</p></div>
              </div>
              <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Message</p><p className="text-sm bg-slate-50 p-3 rounded-xl border mt-1 whitespace-pre-wrap text-gray-700 leading-relaxed">{selectedMessage.message || 'No message provided.'}</p></div>
            </div>
            <div className="px-5 py-3.5 bg-slate-50 border-t flex justify-end shrink-0">
              <button onClick={() => setSelectedMessage(null)} className="px-4 py-2 bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
