import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FiUsers, FiMail, FiCalendar, FiCheckCircle, FiPhone } from 'react-icons/fi';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const customersData = [];
      querySnapshot.forEach((doc) => {
        customersData.push({ id: doc.id, ...doc.data() });
      });
      setCustomers(customersData);
    } catch (error) {
      console.error("Error fetching customers: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiUsers className="text-primary" />
            Registered Customers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Manage and view all registered users and their profile details</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {customer.name ? customer.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-medium text-slate-800">{customer.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                      <FiMail className="text-slate-400" />
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                      {customer.phone || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
                        {customer.role || 'customer'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                        <FiCheckCircle size={12} />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 flex items-center gap-2">
                      <FiCalendar className="text-slate-400" />
                      {customer.createdAt?.toDate ? customer.createdAt.toDate().toLocaleDateString() : 'Recently'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <FiUsers size={40} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-medium">No registered customers found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden divide-y divide-slate-100">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <div key={customer.id} className="p-3.5 sm:p-4 flex flex-col gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {customer.name ? customer.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{customer.name || 'N/A'}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{customer.role || 'customer'}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-semibold flex items-center gap-1">
                    <FiCheckCircle size={10} /> Active
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5 truncate">
                  <FiMail className="text-slate-400 shrink-0" size={13} />
                  <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline truncate">{customer.email}</a>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <FiPhone size={11} className="text-slate-400" />
                    <span>{customer.phone || 'No phone'}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <FiCalendar size={11} />
                    <span>{customer.createdAt?.toDate ? customer.createdAt.toDate().toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">No registered customers found</div>
          )}
        </div>
      </div>
    </div>
  );
}
