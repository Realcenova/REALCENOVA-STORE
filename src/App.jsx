import React, { useState } from 'react';
import { ShoppingBag, QrCode, Lock, LogOut, Plus, Trash2, X, User, CheckCircle } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('store');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [storeUrl, setStoreUrl] = useState('https://realcenova-store.vercel.app');
  
  // Customer Auth State
  const [customer, setCustomer] = useState(null); // { name, email }
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  // Cart & Checkout State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    suburb: '',
    city: '',
    province: 'KwaZulu-Natal',
    postalCode: ''
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'REALCENOVA Leather Slides (Gold Emblem)',
      price: 949.99,
      category: 'Footwear',
      image: 'https://lh3.googleusercontent.com/d/11fJbgsvzLFUpPv977OHwq98gN_ns6b5z'
    },
    {
      id: 2,
      name: 'REALCENOVA Leather Slides (Stitched Patch)',
      price: 949.99,
      category: 'Footwear',
      image: 'https://lh3.googleusercontent.com/d/1INdiML6Z7pslhVyYN6kBFMqH2Rs--54S'
    },
    {
      id: 3,
      name: 'REALCENOVA Golf T-Shirt',
      price: 1200.00,
      category: 'Apparel',
      image: 'https://lh3.googleusercontent.com/d/1hmgg66mxILONx9NFJkLP2AZirxfaO4NP'
    },
    {
      id: 4,
      name: 'REALCENOVA Round Neck T-Shirt',
      price: 799.99,
      category: 'Apparel',
      image: 'https://lh3.googleusercontent.com/d/1hmgg66mxILONx9NFJkLP2AZirxfaO4NP'
    },
    {
      id: 5,
      name: 'REALCENOVA Gold Watch',
      price: 1900.00,
      category: 'Watches',
      image: 'https://lh3.googleusercontent.com/d/1zbZzfsA1LQzxO005N93aYLjuLiSKnhHK'
    },
    {
      id: 6,
      name: 'REALCENOVA Classic Denim Jeans (Blue)',
      price: 2799.99,
      category: 'Apparel',
      image: 'https://lh3.googleusercontent.com/d/1v1nmaNrfAp7ZDZZU2cG2T6kNyzuTyN7u'
    },
    {
      id: 7,
      name: 'REALCENOVA Classic Denim Jeans (Black)',
      price: 2799.99,
      category: 'Apparel',
      image: 'https://lh3.googleusercontent.com/d/1pdUt7tFp7aGNI37vUG5gPXcEt9d7eZ9u'
    }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '' });

  // Cart Handlers
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Customer Authentication Handlers
  const handleAuth = (e) => {
    e.preventDefault();
    if (authMode === 'signup') {
      if (!authForm.name || !authForm.email || !authForm.password) return;
      setCustomer({ name: authForm.name, email: authForm.email });
      setShippingAddress(prev => ({ ...prev, fullName: authForm.name }));
    } else {
      if (!authForm.email || !authForm.password) return;
      const userName = authForm.email.split('@')[0];
      setCustomer({ name: userName.charAt(0).toUpperCase() + userName.slice(1), email: authForm.email });
    }
    setView('store');
  };

  // Admin Login
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderComplete(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neutral-800 relative">
      {/* Navigation Header */}
      <header className="border-b border-neutral-900 sticky top-0 z-40 bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-light tracking-[0.3em] cursor-pointer" onClick={() => setView('store')}>REALCENOVA</h1>
        <nav className="flex items-center gap-6 text-sm tracking-widest uppercase">
          <button onClick={() => setView('store')} className="hover:text-neutral-400 transition">Store</button>
          
          {customer ? (
            <div className="flex items-center gap-2 text-xs border border-neutral-800 px-3 py-1.5 rounded-full">
              <User size={14} className="text-neutral-400" />
              <span>{customer.name}</span>
              <button onClick={() => setCustomer(null)} className="ml-2 text-neutral-500 hover:text-red-400">Logout</button>
            </div>
          ) : (
            <button onClick={() => setView('account')} className="hover:text-neutral-400 transition flex items-center gap-1.5"><User size={16}/> Account</button>
          )}

          <button onClick={() => setIsCartOpen(true)} className="relative hover:text-neutral-400 transition flex items-center gap-1.5">
            <ShoppingBag size={18}/>
            {cartCount > 0 && (
              <span className="bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>

          <button onClick={() => setView('qr')} className="flex items-center gap-1.5 hover:text-neutral-400 transition"><QrCode size={16}/> Store QR</button>
          
          {isAdmin ? (
            <button onClick={() => setIsAdmin(false)} className="flex items-center gap-1 text-red-400"><LogOut size={16}/> Exit Admin</button>
          ) : (
            <button onClick={() => setView('admin')} className="flex items-center gap-1.5 hover:text-neutral-400 transition"><Lock size={16}/> Admin</button>
          )}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Store Catalog View */}
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
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-neutral-500 tracking-widest uppercase">{p.category}</span>
                    <h3 className="text-lg font-light tracking-wide mt-1">{p.name}</h3>
                    <p className="text-neutral-300 mt-2">R {p.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(p)} className="w-full mt-6 bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">Add to Bag</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Account Sign In / Sign Up */}
        {view === 'account' && (
          <div className="max-w-md mx-auto border border-neutral-900 p-8 bg-neutral-950">
            <h2 className="text-xl font-light tracking-widest mb-2 text-center uppercase">
              {authMode === 'login' ? 'Customer Sign In' : 'Create Account'}
            </h2>
            <p className="text-xs text-neutral-400 text-center mb-6">
              {authMode === 'login' ? 'Access your orders and saved shipping addresses.' : 'Join REALCENOVA for exclusive order tracking.'}
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Full Name</label>
                  <input type="text" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="Lwandile Gumede" required />
                </div>
              )}
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Email Address</label>
                <input type="email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="name@domain.co.za" required />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Password</label>
                <input type="password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="••••••••" required />
              </div>

              <button type="submit" className="w-full bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition mt-4">
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-neutral-400">
              {authMode === 'login' ? (
                <p>New to REALCENOVA? <button onClick={() => setAuthMode('signup')} className="text-white underline ml-1">Create an account</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-white underline ml-1">Sign in</button></p>
              )}
            </div>
          </div>
        )}

        {/* Store QR View */}
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

        {/* Admin Login Portal */}
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
            </form>
          </div>
        )}

        {/* Admin Inventory Management */}
        {view === 'admin' && isAdmin && (
          <div>
            <h2 className="text-2xl font-light tracking-widest mb-8">INVENTORY MANAGEMENT</h2>
            <form onSubmit={addProduct} className="border border-neutral-900 p-6 bg-neutral-950 mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Product Name</label>
                <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="Product Name" required />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Price (R)</label>
                <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="0.00" required />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Category</label>
                <input type="text" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="Category" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Image URL</label>
                <input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm" placeholder="https://..." />
              </div>
              <button type="submit" className="bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition flex items-center justify-center gap-2 col-span-full md:col-span-1"><Plus size={16}/> Add Product</button>
            </form>

            <div className="space-y-4">
              {products.map(p => (
                <div key={p.id} className="border border-neutral-900 p-4 flex justify-between items-center bg-neutral-950">
                  <div className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" />
                    <div>
                      <h4 className="font-light tracking-wide">{p.name}</h4>
                      <p className="text-xs text-neutral-500">R {p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-950 h-full border-l border-neutral-900 flex flex-col p-6">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
              <h3 className="text-lg font-light tracking-widest uppercase">Shopping Bag ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-neutral-500 text-center py-12 tracking-wide text-sm">Your shopping bag is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-neutral-900 pb-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-neutral-900" />
                    <div className="flex-1">
                      <h4 className="text-sm font-light">{item.name}</h4>
                      <p className="text-xs text-neutral-400 mt-1">R {item.price.toFixed(2)} x {item.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-400"><Trash2 size={16}/></button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-900 pt-6">
                <div className="flex justify-between text-sm tracking-wider mb-6">
                  <span>Subtotal</span>
                  <span>R {cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} 
                  className="w-full bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition"
                >
                  Proceed to Delivery & Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout & Shipping Address Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full bg-neutral-950 border border-neutral-900 p-8 my-8 relative">
            <button onClick={() => { setIsCheckoutOpen(false); setOrderComplete(false); }} className="absolute top-6 right-6 text-neutral-400 hover:text-white"><X size={20}/></button>

            {orderComplete ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto text-emerald-400 mb-4" />
                <h3 className="text-2xl font-light tracking-widest mb-2">ORDER PLACED SUCCESSFULLY</h3>
                <p className="text-neutral-400 text-sm mb-6">Thank you for your order with REALCENOVA. A confirmation and tracking link will be sent to your email.</p>
                <button onClick={() => { setIsCheckoutOpen(false); setOrderComplete(false); setView('store'); }} className="bg-white text-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">Return to Store</button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-light tracking-widest uppercase mb-6">Delivery Details & Checkout</h3>
                
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Recipient Full Name</label>
                      <input type="text" value={shippingAddress.fullName} onChange={e => setShippingAddress({...shippingAddress, fullName: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" required />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Phone Number</label>
                      <input type="tel" value={shippingAddress.phone} onChange={e => setShippingAddress({...shippingAddress, phone: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="+27 ..." required />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Street Address</label>
                    <input type="text" value={shippingAddress.street} onChange={e => setShippingAddress({...shippingAddress, street: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="123 Luxury Way" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Suburb</label>
                      <input type="text" value={shippingAddress.suburb} onChange={e => setShippingAddress({...shippingAddress, suburb: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="Morningside" required />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">City</label>
                      <input type="text" value={shippingAddress.city} onChange={e => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="Durban" required />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Postal Code</label>
                      <input type="text" value={shippingAddress.postalCode} onChange={e => setShippingAddress({...shippingAddress, postalCode: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="4001" required />
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-6 mt-6">
                    <h4 className="text-xs text-neutral-400 tracking-widest uppercase mb-3">Order Summary</h4>
                    <div className="space-y-2 text-sm mb-4">
                      {cart.map(i => (
                        <div key={i.id} className="flex justify-between text-neutral-300">
                          <span>{i.name} (x{i.qty})</span>
                          <span>R {(i.price * i.qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-light text-base border-t border-neutral-900 pt-3">
                      <span>Total Due</span>
                      <span>R {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">
                    Complete Order
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
