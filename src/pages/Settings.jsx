import React, { useState, useEffect } from 'react';
import { doc, getDocs, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { 
  getAuth, 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut 
} from 'firebase/auth';
import { db, auth, firebaseConfig } from '../firebase/firebaseConfig';
import { 
  FiLock, FiUserPlus, FiUsers, 
  FiShield, FiKey, FiEye, FiEyeOff, FiCheckCircle, 
  FiAlertCircle, FiTrash2, FiMail, FiUser 
} from 'react-icons/fi';

export default function Settings() {
  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');

  // Add New Admin State
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('Admin');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminConfirmPassword, setNewAdminConfirmPassword] = useState('');
  const [showNewAdminPw, setShowNewAdminPw] = useState(false);
  const [adminCreating, setAdminCreating] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState('');
  const [adminError, setAdminError] = useState('');

  // Admins List State
  const [adminsList, setAdminsList] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(false);

  useEffect(() => {
    fetchAdminsList();
  }, []);

  const fetchAdminsList = async () => {
    setAdminsLoading(true);
    try {
      const querySnap = await getDocs(collection(db, 'admins'));
      const list = [];
      querySnap.forEach(d => {
        list.push({ id: d.id, ...d.data() });
      });

      // If current logged-in user is not yet in the admins collection, display them as primary Super Admin
      const currentUserEmail = auth?.currentUser?.email?.toLowerCase();
      const exists = list.some(a => (a.email || '').toLowerCase() === currentUserEmail);
      if (!exists && auth?.currentUser) {
        list.unshift({
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName || 'Primary Administrator',
          email: auth.currentUser.email,
          role: 'Super Admin',
          createdAt: new Date().toISOString(),
          isCurrentSession: true
        });
      }

      setAdminsList(list);
    } catch (err) {
      console.error("Error fetching admins list:", err);
    } finally {
      setAdminsLoading(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (!currentPassword) {
      setPwError('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPwError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('New password and confirm password do not match.');
      return;
    }

    setPwLoading(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error("No active authenticated admin session found. Please sign in again.");
      }

      // Re-authenticate user to confirm current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setPwSuccess('Password updated successfully! Use your new password on your next login.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error("Change password error:", err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setPwError('Incorrect current password. Please try again.');
      } else if (err.code === 'auth/weak-password') {
        setPwError('New password is too weak. Please use at least 6 characters.');
      } else {
        setPwError(err.message || 'Failed to update password.');
      }
    } finally {
      setPwLoading(false);
    }
  };

  // Handle Add New Admin (Uses secondary app so current session is never logged out)
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');

    if (!newAdminName.trim()) {
      setAdminError('Please provide the admin full name.');
      return;
    }
    if (!newAdminEmail.trim()) {
      setAdminError('Please provide a valid email address.');
      return;
    }
    if (!newAdminPassword || newAdminPassword.length < 6) {
      setAdminError('Password must be at least 6 characters long.');
      return;
    }
    if (newAdminPassword !== newAdminConfirmPassword) {
      setAdminError('Passwords do not match.');
      return;
    }

    setAdminCreating(true);
    let secondaryApp = null;
    try {
      const secondaryAppName = `AdminCreator-${Date.now()}`;
      secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
      const secondaryAuth = getAuth(secondaryApp);

      // Create new user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        secondaryAuth, 
        newAdminEmail.trim().toLowerCase(), 
        newAdminPassword
      );

      // Set display name
      await updateProfile(userCred.user, { displayName: newAdminName.trim() });

      // Save into 'admins' collection
      await setDoc(doc(db, 'admins', userCred.user.uid), {
        uid: userCred.user.uid,
        name: newAdminName.trim(),
        email: newAdminEmail.trim().toLowerCase(),
        role: newAdminRole,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.email || 'admin'
      });

      // Also record in 'customers' collection with role: 'admin'
      await setDoc(doc(db, 'customers', userCred.user.uid), {
        uid: userCred.user.uid,
        name: newAdminName.trim(),
        email: newAdminEmail.trim().toLowerCase(),
        role: 'admin',
        createdAt: new Date().toISOString()
      }, { merge: true });

      // Clean up secondary auth
      await signOut(secondaryAuth);

      setAdminSuccess(`Admin account for "${newAdminName}" (${newAdminEmail}) created successfully!`);
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminConfirmPassword('');
      setNewAdminRole('Admin');

      fetchAdminsList();
    } catch (err) {
      console.error("Create admin error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setAdminError('An account with this email address already exists.');
      } else if (err.code === 'auth/invalid-email') {
        setAdminError('Please enter a valid email address format.');
      } else {
        setAdminError(err.message || 'Failed to create new admin account.');
      }
    } finally {
      if (secondaryApp) {
        try { await deleteApp(secondaryApp); } catch (e) { /* ignore */ }
      }
      setAdminCreating(false);
    }
  };

  // Handle Remove Admin from list
  const handleDeleteAdmin = async (adminId, adminEmail) => {
    if (adminEmail?.toLowerCase() === auth.currentUser?.email?.toLowerCase()) {
      alert("You cannot remove your own active admin account.");
      return;
    }
    if (!window.confirm(`Are you sure you want to remove admin access for ${adminEmail}?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'admins', adminId));
      setAdminsList(prev => prev.filter(a => a.id !== adminId));
      alert('Admin removed from panel successfully.');
    } catch (err) {
      console.error("Delete admin error:", err);
      alert('Failed to remove admin.');
    }
  };

  return (
    <div className="max-w-4xl space-y-5 sm:space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5 sm:gap-3">
            <FiShield className="text-primary" />
            Security &amp; Admin Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage your admin credentials, change password &amp; create new admin accounts
          </p>
        </div>
      </div>

      {/* ========================================================
          CARD 1: CHANGE PASSWORD (पासवर्ड बदला)
          ======================================================== */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="bg-slate-50 px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-[#d92906] rounded-xl">
              <FiKey size={18} />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-slate-800">Change Password</h2>
              <p className="text-[11px] text-slate-500">
                Logged in as: <strong className="text-slate-700">{auth?.currentUser?.email || 'admin@superbmegacorp.com'}</strong>
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="p-4 sm:p-6 space-y-4">
          {pwSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-600 shrink-0" size={16} />
              <span>{pwSuccess}</span>
            </div>
          )}
          {pwError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-800 flex items-center gap-2">
              <FiAlertCircle className="text-red-600 shrink-0" size={16} />
              <span>{pwError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrentPw ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#d92906]/20 focus:border-[#d92906] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrentPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#d92906]/20 focus:border-[#d92906] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNewPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#d92906]/20 focus:border-[#d92906] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={pwLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#d92906] hover:bg-[#b91c1c] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {pwLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <FiLock size={15} />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================
          CARD 2: ADD NEW ADMIN (नवीन अ‍ॅडमिन जोडा)
          ======================================================== */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="bg-slate-50 px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <FiUserPlus size={18} />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-slate-800">Add New Admin Account</h2>
              <p className="text-[11px] text-slate-500">
                Grant full administrative dashboard access to an authorized partner or staff member
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleCreateAdmin} className="p-4 sm:p-6 space-y-4">
          {adminSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-600 shrink-0" size={16} />
              <span>{adminSuccess}</span>
            </div>
          )}
          {adminError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-800 flex items-center gap-2">
              <FiAlertCircle className="text-red-600 shrink-0" size={16} />
              <span>{adminError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Admin Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text"
                  value={newAdminName}
                  onChange={e => setNewAdminName(e.target.value)}
                  placeholder="e.g. Rahul Patil"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Admin Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address (Login Username) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={e => setNewAdminEmail(e.target.value)}
                  placeholder="admin@superbmegacorp.com"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Role Designation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Role / Designation <span className="text-red-500">*</span>
              </label>
              <select
                value={newAdminRole}
                onChange={e => setNewAdminRole(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white cursor-pointer font-medium"
              >
                <option value="Admin">Administrator (Full Dashboard Access)</option>
                <option value="Super Admin">Super Administrator</option>
                <option value="Store Manager">Store Operations Manager</option>
              </select>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showNewAdminPw ? 'text' : 'password'}
                  value={newAdminPassword}
                  onChange={e => setNewAdminPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm <span className="text-red-500">*</span>
                </label>
                <input
                  type={showNewAdminPw ? 'text' : 'password'}
                  value={newAdminConfirmPassword}
                  onChange={e => setNewAdminConfirmPassword(e.target.value)}
                  placeholder="Re-type"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showNewAdminPw}
                onChange={e => setShowNewAdminPw(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Show password</span>
            </label>

            <button
              type="submit"
              disabled={adminCreating}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {adminCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Admin Account...</span>
                </>
              ) : (
                <>
                  <FiUserPlus size={15} />
                  <span>Create Admin Account</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================
          CARD 3: ACTIVE ADMIN ACCOUNTS LIST (सध्याचे अ‍ॅडमिन)
          ======================================================== */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
        <div className="bg-slate-50 px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <FiUsers size={18} />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base text-slate-800">Active Admin Team ({adminsList.length})</h2>
              <p className="text-[11px] text-slate-500">
                All accounts with administrative access to this dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {adminsLoading ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Loading admin team members...
            </div>
          ) : adminsList.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No additional admins found.
            </div>
          ) : (
            adminsList.map(admin => {
              const isCurrent = admin.email?.toLowerCase() === auth?.currentUser?.email?.toLowerCase();
              const initial = (admin.name?.charAt(0) || admin.email?.charAt(0) || 'A').toUpperCase();

              return (
                <div 
                  key={admin.id || admin.email} 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 text-[#d92906] flex items-center justify-center font-black text-sm shrink-0 shadow-inner">
                      {initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {admin.name || 'Admin User'}
                        </span>
                        {isCurrent && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            You (Active)
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-medium block">
                        {admin.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/70">
                      {admin.role || 'Admin'}
                    </span>

                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove admin access"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
