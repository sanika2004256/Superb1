const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

// Replace recharts import
code = code.replace(
  /import \{ LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell \} from 'recharts';/,
  'import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from \'recharts\';'
);

// Replace Total Revenue card
code = code.replace(
  /<div className=\"bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative overflow-hidden group\">\s*<div className=\"absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0\"><\/div>\s*<div className=\"relative z-10 flex justify-between items-start mb-4\">\s*<div className=\"w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500\/30\">\s*<FiDollarSign className=\"text-xl\" \/>\s*<\/div>\s*<span className=\"flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100\"><FiTrendingUp className=\"mr-1\"\/> \+12\.5%<\/span>\s*<\/div>\s*<div className=\"relative z-10\">\s*<p className=\"text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider\">Total Revenue<\/p>\s*<p className=\"text-3xl font-black text-slate-800 tracking-tight\">,1\{stats\.totalRevenue\?\.toLocaleString\(\) \|\| 0\}<\/p>\s*<\/div>\s*<\/div>/g,
  `<div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-900/20 border border-slate-700 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500 ease-out z-0"></div>
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-[#d92906] text-white flex items-center justify-center shadow-lg shadow-[#d92906]/40">
                    <FiDollarSign className="text-xl" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20 backdrop-blur-sm"><FiTrendingUp className="mr-1"/> +12.5%</span>
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Revenue</p>
                  <p className="text-4xl font-black text-white tracking-tight">₹{stats.totalRevenue?.toLocaleString('en-IN') || 0}</p>
                </div>
              </div>`
);

// Replace LineChart with AreaChart
code = code.replace(
  /<LineChart data=\{displaySalesData\} margin=\{\{ top: 5, right: 20, bottom: 5, left: 0 \}\}>\s*<CartesianGrid strokeDasharray=\"3 3\" vertical=\{false\} stroke=\"#f1f5f9\" \/>\s*<XAxis dataKey=\"name\" axisLine=\{false\} tickLine=\{false\} tick=\{\{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'\}\} \/>\s*<YAxis axisLine=\{false\} tickLine=\{false\} tick=\{\{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'\}\} tickFormatter=\{\(val\) => \`,1\$\{val\}\`\} \/>\s*<Tooltip \s*contentStyle=\{\{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb\(0 0 0 \/ 0\.1\)', padding: '12px'\}\}\s*formatter=\{\(value\) => \[\`,1\$\{value\}\`, 'Revenue'\]\}\s*\/>\s*<Line type=\"monotone\" dataKey=\"sales\" stroke=\"#3b82f6\" strokeWidth=\{4\} dot=\{\{r: 5, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff'\}\} activeDot=\{\{r: 8\}\} \/>\s*<\/LineChart>/g,
  `<AreaChart data={displaySalesData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d92906" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d92906" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} tickFormatter={(val) => \`₹\${val}\`} dx={-10} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px', fontWeight: 'bold'}}
                      formatter={(value) => [\`₹\${value.toLocaleString('en-IN')}\`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#d92906" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" activeDot={{r: 8, fill: '#d92906', stroke: '#fff', strokeWidth: 3}} />
                  </AreaChart>`
);

// fix currency symbols globally where it might be messed up
code = code.replace(/,1/g, '₹');

fs.writeFileSync('src/pages/Dashboard.jsx', code);
console.log('Dashboard UI updated!');
