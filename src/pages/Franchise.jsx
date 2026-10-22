import React, { useState, useEffect } from 'react';
import { collection, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiTrash2, FiSearch, FiEye, FiUsers } from 'react-icons/fi';

export default function Franchise() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const enquiriesRef = collection(db, 'enquiries');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(enquiriesRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter for franchise inquiries only
      const franchiseData = data.filter(e => 
        e.subject && e.subject.toLowerCase().includes('franchise')
      );
      
      franchiseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setEnquiries(franchiseData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching realtime franchise enquiries:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'enquiries', id), { status: newStatus });
    } catch (error) { alert('Error updating status'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete franchise request?')) {
      await deleteDoc(doc(db, 'enquiries', id));
    }
  };

  const filtered = enquiries.filter(e => 
    e.name?.toLowerCase().includes(search.toLowerCase()) || 
    e.email?.toLowerCase().includes(search.toLowerCase()) ||
    e.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiUsers className="text-primary" />
            Franchise Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Review and manage franchise partnership requests</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-gray-100">
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="w-full sm:w-80 px-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary" 
          />
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Franchise Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr> : 
               filtered.length === 0 ? <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">No franchise applications found.</td></tr> :
               filtered.map(e => (
                 <tr key={e.id}>
                   <td className="px-6 py-4 text-sm text-gray-500">{e.createdAt ? new Date(e.createdAt).toLocaleDateString() : 'N/A'}</td>
                   <td className="px-6 py-4 font-medium">{e.name}</td>
                   <td className="px-6 py-4 text-sm">
                     <div>{e.email}</div><div className="text-gray-500">{e.phone}</div>
                   </td>
                   <td className="px-6 py-4 text-sm font-medium text-blue-700 bg-blue-50/50 rounded-lg">{e.subject}</td>
                   <td className="px-6 py-4">
                     <select value={e.status || 'new'} onChange={(ev) => handleStatusChange(e.id, ev.target.value)} className="bg-slate-50 border rounded text-xs px-2 py-1 outline-none font-medium">
                       <option value="new">New Request</option>
                       <option value="contacted">Contacted</option>
                       <option value="in-progress">In Progress</option>
                       <option value="approved">Approved</option>
                       <option value="rejected">Rejected</option>
                     </select>
                   </td>
                   <td className="px-6 py-4 text-right space-x-2">
                     <button onClick={() => setSelectedEnquiry(e)} className="text-blue-500 hover:text-blue-700 p-2"><FiEye /></button>
                     <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-700 p-2"><FiTrash2 /></button>
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
            <div className="p-8 text-center text-gray-400 text-sm">No franchise applications found.</div>
          ) : (
            filtered.map(e => (
              <div key={e.id} className="p-3.5 sm:p-4 flex flex-col gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{e.name || 'Applicant'}</span>
                  <span className="text-[10px] text-slate-400">{e.createdAt ? new Date(e.createdAt).toLocaleDateString() : ''}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {e.phone && (
                    <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold border border-emerald-100">
                      📞 {e.phone}
                    </a>
                  )}
                  {e.email && (
                    <a href={`mailto:${e.email}`} className="text-blue-600 truncate max-w-[180px]">
                      ✉️ {e.email}
                    </a>
                  )}
                </div>

                <div className="text-xs font-medium text-blue-700 bg-blue-50/70 p-2 rounded-lg border border-blue-100">
                  {e.subject || 'Franchise Inquiry'}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <select 
                    value={e.status || 'new'} 
                    onChange={(ev) => handleStatusChange(e.id, ev.target.value)} 
                    className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-2.5 py-1.5 outline-none font-bold"
                  >
                    <option value="new">New Request</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setSelectedEnquiry(e)} className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1">
                      <FiEye size={13} /> Details
                    </button>
                    <button onClick={() => handleDelete(e.id)} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg">
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedEnquiry(null)}>
          <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="font-bold text-base sm:text-lg text-gray-800">Franchise Application Details</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-red-500 shadow-xs font-bold">&times;</button>
            </div>
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Applicant Name</p><p className="font-semibold text-slate-800 mt-0.5">{selectedEnquiry.name}</p></div>
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Application Date</p><p className="font-semibold text-slate-800 mt-0.5">{selectedEnquiry.createdAt ? new Date(selectedEnquiry.createdAt).toLocaleString() : 'N/A'}</p></div>
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Email Address</p><a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-blue-600 hover:underline mt-0.5 block truncate">{selectedEnquiry.email}</a></div>
                <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Phone Number</p><a href={`tel:${selectedEnquiry.phone}`} className="font-semibold text-emerald-600 hover:underline mt-0.5 block">{selectedEnquiry.phone}</a></div>
              </div>
              <div className="pt-2"><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Franchise Type</p><p className="font-bold text-blue-700 bg-blue-50 p-2.5 rounded-xl border border-blue-100 mt-1">{selectedEnquiry.subject}</p></div>
              <div><p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Additional Information</p><p className="text-sm bg-slate-50 p-3 rounded-xl border mt-1 whitespace-pre-wrap text-gray-700 leading-relaxed">{selectedEnquiry.message || 'No additional information provided.'}</p></div>
            </div>
            <div className="px-5 py-3.5 bg-slate-50 border-t flex justify-end shrink-0">
              <button onClick={() => setSelectedEnquiry(null)} className="px-4 py-2 bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
