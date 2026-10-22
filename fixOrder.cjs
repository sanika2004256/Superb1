const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');

const startStr = '<div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7 flex flex-col">';
const endStr = '</div>\n            </div>\n\n            {/* Recent Orders Table */}';

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf('{/* Recent Orders Table */}');

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find the block.');
  process.exit(1);
}

const replacement = `<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-7 flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
                
                <h3 className="font-extrabold text-slate-800 text-lg mb-6 relative z-10 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner"><FiShoppingCart size={16}/></span>
                  Order Status
                </h3>
                
                <div className="flex flex-col items-center gap-8 flex-1 relative z-10">
                  {/* Left: Pie Chart */}
                  <div className="h-52 w-52 relative shrink-0 mt-2">
                    {/* Glowing effect behind chart */}
                    <div className="absolute inset-4 bg-indigo-400/20 rounded-full blur-2xl animate-pulse"></div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={pieData} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={68} 
                          outerRadius={95} 
                          paddingAngle={6} 
                          dataKey="value"
                          stroke="none"
                          cornerRadius={12}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={\`cell-\${index}\`} fill={entry.color} style={{ filter: \`drop-shadow(0px 4px 6px \${entry.color}40)\` }} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                          itemStyle={{fontWeight: '900', color: '#1e293b'}}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-black text-slate-800">{stats.orders}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</span>
                    </div>
                  </div>

                  {/* Right: Legend Rows */}
                  <div className="flex flex-col gap-3 w-full">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110" style={{backgroundColor: \`\${entry.color}15\`}}>
                            <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{backgroundColor: entry.color}}></div>
                          </div>
                          <span className="text-sm font-bold text-slate-600 capitalize group-hover:text-slate-900 transition-colors">{entry.name}</span>
                        </div>
                        <span className="text-lg font-black bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-100 group-hover:bg-white transition-colors" style={{color: entry.color}}>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            `;

const newCode = code.substring(0, startIndex) + replacement + code.substring(endIndex - 31);
fs.writeFileSync('src/pages/Dashboard.jsx', newCode);
console.log('Order Status updated!');
