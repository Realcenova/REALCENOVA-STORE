import React, { useState } from 'react';
import { ShoppingBag, QrCode, Lock, CheckCircle, ShieldCheck, Sparkles, LogOut, Plus, Trash2 } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('store');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [storeUrl, setStoreUrl] = useState('https://realcenova-store.vercel.app');
  
  const [products, setProducts] = useState([
    { id: 1, name: 'Cenova Royal Timepiece', price: 1499.00, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Aura Velvet Leather Bag', price: 890.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Onyx Signature Perfume', price: 340.00, category: 'Fragrances', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80' }
  ]);

  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '' });

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUser === 'admin' && adminPass === 'realcenova123') {
      setIsAdmin(true);
    } else {
      alert('Invalid credentials. Use admin / realcenova123');
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { id: Date.now(), ...newProduct, price: parseFloat(newProduct.price) }]);
    setNewProduct({ name: '', price: '', category: '', image: '' });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neutral-800">
      <header className="border-b border-neutral-900 sticky top-0 z-50 bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-light tracking-[0.3em] cursor-pointer" onClick={() => setView('store')}>REALCENOVA</h1>
        <nav className="flex items-center gap-6 text-sm tracking-widest uppercase">
          <button onClick={() => setView('store')} className="hover:text-neutral-400 transition">Store</button>
          <button onClick={() => setView('qr')} className="flex items-center gap-1.5 hover:text-neutral-400 transition"><QrCode size={16}/> Store QR</button>
          {isAdmin ? (
            <button onClick={() => setIsAdmin(false)} className="flex items-center gap-1 text-red-400"><LogOut size={16}/> Exit Admin</button>
          ) : (
            <button onClick={() => setView('admin')} className="flex items-center gap-1.5 hover:text-neutral-400 transition"><Lock size={16}/> Admin Login</button>
          )}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'store' && (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-[0.2em] mb-4">EXQUISITE CRAFTSMANSHIP</h2>
              <p className="text-neutral-400 tracking-wider">Discover the pinnacle of modern luxury aesthetics.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map(p => (
                <div key={p.id} className="border border-neutral-900 bg-neutral-950/50 group overflow-hidden">
                  <div className="h-80 overflow-hidden bg-neutral-900">
                    <img src={p.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-neutral-500 tracking-widest uppercase">{p.category}</span>
                    <h3 className="text-lg font-light tracking-wide mt-1">{p.name}</h3>
                    <p className="text-neutral-300 mt-2">${p.price.toFixed(2)}</p>
                    <button onClick={() => alert(`${p.name} added to cart.`)} className="w-full mt-6 bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">Add to Bag</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'qr' && (
          <div className="max-w-xl mx-auto text-center border border-neutral-900 p-8 bg-neutral-950">
            <h2 className="text-2xl font-light tracking-widest mb-4">BRAND STORE QR CODE</h2>
            <p className="text-neutral-400 text-sm mb-6">Generate your official marketing QR code linked directly to your live Vercel store.</p>
            <input type="text" value={storeUrl} onChange={e => setStoreUrl(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-sm text-center mb-6 focus:outline-none focus:border-white" />
            <div className="bg-white p-6 inline-block mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(storeUrl)}`} alt="Store QR Code" className="w-48 h-48 mx-auto" />
            </div>
            <div>
              <a href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(storeUrl)}`} download="realcenova-qr.png" target="_blank" rel="noreferrer" className="inline-block bg-white text-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">Download High-Res PNG</a>
            </div>
          </div>
        )}

        {view === 'admin' && !isAdmin && (
          <div className="max-w-md mx-auto border border-neutral-900 p-8 bg-neutral-950">
            <h2 className="text-xl font-light tracking-widest mb-6 text-center">ADMIN PORTAL</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Username</label>
                <input type="text" value={adminUser} onChange={e => setAdminUser(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="admin" required />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Password</label>
                <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition mt-4">Login</button>
              <p className="text-xs text-neutral-500 text-center mt-4">Default login: admin / realcenova123</p>
            </form>
          </div>
        )}

        {view === 'admin' && isAdmin && (
          <div>
            <h2 className="text-2xl font-light tracking-widest mb-8">INVENTORY MANAGEMENT</h2>
            <form onSubmit={addProduct} className="border border-neutral-900 p-6 bg-neutral-950 mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Product Name</label>
                <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="Gold Watch" required />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Price ($)</label>
                <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="499.00" required />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Category</label>
                <input type="text" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="Watches" />
              </div>
              <button type="submit" className="bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition flex items-center justify-center gap-2"><Plus size={16}/> Add Product</button>
            </form>

            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="border border-neutral-900 p-4 flex justify-between items-center bg-neutral-950">
                  <div className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" />
                    <div>
                      <h4 className="font-light tracking-wide">{p.name}</h4>
                      <p className="text-xs text-neutral-500">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
