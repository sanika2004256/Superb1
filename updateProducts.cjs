const fs = require('fs');
let code = fs.readFileSync('src/pages/Products.jsx', 'utf8');

// 1. Update initial formData state
code = code.replace(/name: '', category: '', description: '', price: '', imageUrl: '', status: 'active'/g, "name: '', category: '', description: '', price: '', sku: '', packSize: '', imageUrl: '', status: 'active'");

// 2. Update setFormData inside openModal (when editing existing product)
const oldSetForm = `setFormData({
          name: product.name || '',
          category: product.category || '',
          description: product.description || '',
          price: product.price || '',
          imageUrl: product.imageUrl || '',
          status: product.status || 'active'
        });`;
const newSetForm = `setFormData({
          name: product.name || '',
          category: product.category || '',
          description: product.description || '',
          price: product.price || '',
          sku: product.sku || '',
          packSize: product.packSize || '',
          imageUrl: product.imageUrl || '',
          status: product.status || 'active'
        });`;
code = code.replace(oldSetForm, newSetForm);

// 3. Add SKU and PackSize inputs to the form JSX
const descriptionBlock = `<div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Description</label>
                  <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Enter product details..."></textarea>
                </div>`;

const newInputsBlock = `${descriptionBlock}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">SKU Code</label>
                    <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. S-CHAI-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Pack Size</label>
                    <input type="text" value={formData.packSize} onChange={e => setFormData({...formData, packSize: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. 1 kg / 500g" />
                  </div>
                </div>`;

code = code.replace(descriptionBlock, newInputsBlock);

fs.writeFileSync('src/pages/Products.jsx', code);
console.log('Products.jsx updated with SKU and PackSize fields.');
