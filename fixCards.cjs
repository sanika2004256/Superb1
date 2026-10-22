const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

const startStr = '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">';
const endStr = '</div>          {/* Charts Row */}';

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find the block.');
  process.exit(1);
}

const replacement = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Revenue Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-900/20 border border-slate-700 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500 ease-out z-0"></div>
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-[#d92906] text-white flex items-center justify-center shadow-lg shadow-[#d92906]/40">
                    <FiDollarSign className="text-xl" />
                  </div>
                  <span className="flex items-center text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg border border-emerald-400/20 backdrop-blur-sm"><FiTrendingUp className="mr-1"/> +12.5%</span>
                </div>
                <div className="relative z-10 mt-2">
                  <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Total Revenue</p>
                  <p className="text-4xl font-black text-white tracking-tight">₹{stats.totalRevenue?.toLocaleString('en-IN') || 0}</p>
                </div>
              </div>

              {/* Orders Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-xl shadow-purple-500/20 border border-indigo-400/30 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500 ease-out z-0"></div>
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-inner border border-white/20">
                    <FiShoppingCart className="text-xl" />
                  </div>
                  <span className="flex items-center text-[10px] font-black text-white bg-white/20 px-2 py-1 rounded-lg border border-white/10 backdrop-blur-sm"><FiTrendingUp className="mr-1"/> +8.2%</span>
                </div>
                <div className="relative z-10 mt-2">
                  <p className="text-[10px] font-bold text-indigo-100 mb-1 uppercase tracking-widest">Total Orders</p>
                  <p className="text-4xl font-black text-white tracking-tight">{stats.orders || 0}</p>
                </div>
              </div>

              {/* Products Card */}
              <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl p-6 shadow-xl shadow-emerald-500/20 border border-teal-300/30 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500 ease-out z-0"></div>
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-inner border border-white/20">
                    <FiBox className="text-xl" />
                  </div>
                </div>
                <div className="relative z-10 mt-2">
                  <p className="text-[10px] font-bold text-teal-50 mb-1 uppercase tracking-widest">Total Products</p>
                  <p className="text-4xl font-black text-white tracking-tight">{stats.products || 0}</p>
                </div>
              </div>

              {/* Enquiries Card */}
              <div className="bg-gradient-to-br from-rose-400 to-orange-500 rounded-3xl p-6 shadow-xl shadow-orange-500/20 border border-rose-300/30 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500 ease-out z-0"></div>
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-inner border border-white/20">
                    <FiMessageSquare className="text-xl" />
                  </div>
                </div>
                <div className="relative z-10 mt-2">
                  <p className="text-[10px] font-bold text-rose-50 mb-1 uppercase tracking-widest">Customer Enquiries</p>
                  <p className="text-4xl font-black text-white tracking-tight">{stats.enquiries || 0}</p>
                </div>
              </div>

            \n`;

const newCode = code.substring(0, startIndex) + replacement + code.substring(endIndex);
fs.writeFileSync('src/pages/Dashboard.jsx', newCode);
console.log('Cards updated!');
