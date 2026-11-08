import React, { useState, useEffect } from 'react';
import { ShoppingBag, QrCode, Lock, LogOut, Plus, Trash2, X, User, CheckCircle, Building, Truck, Bell, PackageCheck, Eye, Edit2, Check } from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'REALCENOVA Leather Slides (Gold Emblem)',
    price: 949.99,
    category: 'Footwear',
    image: 'https://lh3.googleusercontent.com/d/11fJbgsvzLFUpPv977OHwq98gN_ns6b5z',
    hasOptions: true,
    sizes: ['5', '6', '7', '8', '9', '10', '11']
  },
  {
    id: 2,
    name: 'REALCENOVA Leather Slides (Stitched Patch)',
    price: 949.99,
    category: 'Footwear',
    image: 'https://lh3.googleusercontent.com/d/1INdiML6Z7pslhVyYN6kBFMqH2Rs--54S',
    hasOptions: true,
    sizes: ['5', '6', '7', '8', '9', '10', '11']
  },
  {
    id: 3,
    name: 'REALCENOVA Golf T-Shirt',
    price: 1200.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/d/1hmgg66mxILONx9NFJkLP2AZirxfaO4NP',
    hasOptions: true,
    colors: ['White', 'Black', 'Navy', 'Off-White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 4,
    name: 'REALCENOVA Round Neck T-Shirt',
    price: 799.99,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/d/1hmgg66mxILONx9NFJkLP2AZirxfaO4NP',
    hasOptions: true,
    colors: ['White', 'Black', 'Navy', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 5,
    name: 'REALCENOVA Gold Watch',
    price: 1900.00,
    category: 'Watches',
    image: 'https://lh3.googleusercontent.com/d/1zbZzfsA1LQzxO005N93aYLjuLiSKnhHK',
    hasOptions: false
  },
  {
    id: 6,
    name: 'REALCENOVA Classic Denim Jeans (Blue)',
    price: 2799.99,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/d/1v1nmaNrfAp7ZDZZU2cG2T6kNyzuTyN7u',
    hasOptions: true,
    colors: ['Blue'],
    sizes: ['28', '30', '32', '34', '36']
  },
  {
    id: 7,
    name: 'REALCENOVA Classic Denim Jeans (Black)',
    price: 2799.99,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/d/1pdUt7tFp7aGNI37vUG5gPXcEt9d7eZ9u',
    hasOptions: true,
    colors: ['Black'],
    sizes: ['28', '30', '32', '34', '36']
  }
];

export default function App() {
  const [view, setView] = useState('store');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [storeUrl, setStoreUrl] = useState('https://realcenova-store.vercel.app');
  const [adminTab, setAdminTab] = useState('orders');

  // Persistent Products with LocalStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('realcenova_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('realcenova_products', JSON.stringify(products));
  }, [products]);

  // Inline Price Editing State
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingPriceInput, setEditingPriceInput] = useState('');

  // Persistent Orders & Notification State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('realcenova_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('realcenova_orders', JSON.stringify(orders));
  }, [orders]);

  const unreadCount = orders.filter(o => !o.read).length;

  // Customer Auth State
  const [customer, setCustomer] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  // Options State for Apparel & Footwear Selection
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  // Cart & Checkout State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [recentOrder, setRecentOrder] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    suburb: '',
    city: '',
    province: 'KwaZulu-Natal',
    postalCode: ''
  });

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '' });

  // Cart Handlers
  const addToCart = (product) => {
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : '');
    const color = selectedColors[product.id] || (product.colors ? product.colors[0] : '');
    const cartItemId = `${product.id}-${size}-${color}`;

    const existing = cart.find(item => item.cartItemId === cartItemId);
    if (existing) {
      setCart(cart.map(item => item.cartItemId === cartItemId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, cartItemId, selectedSize: size, selectedColor: color, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Customer Auth Handlers
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

  // Admin Login & Management
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

  const startEditingPrice = (product) => {
    setEditingProductId(product.id);
    setEditingPriceInput(product.price.toString());
  };

  const savePrice = (id) => {
    const numericPrice = parseFloat(editingPriceInput);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert('Please enter a valid price amount.');
      return;
    }
    setProducts(products.map(p => p.id === id ? { ...p, price: numericPrice } : p));
    setEditingProductId(null);
  };

  const markOrderAsRead = (id) => {
    setOrders(orders.map(o => o.orderId === id ? { ...o, read: true } : o));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(o => o.orderId !== id));
  };

  const markAllAsRead = () => {
    setOrders(orders.map(o => ({ ...o, read: true })));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  const handleFinalizeOrder = (e) => {
    e.preventDefault();
    const orderData = {
      orderId: 'RC-' + Math.floor(100000 + Math.random() * 900000),
      customer: customer ? customer.name : shippingAddress.fullName,
      phone: shippingAddress.phone,
      address: `${shippingAddress.street}, ${shippingAddress.suburb}, ${shippingAddress.city}, ${shippingAddress.postalCode}`,
      items: [...cart],
      total: cartTotal,
      ref: paymentRef,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setOrders(prev => [orderData, ...prev]);
    setRecentOrder(orderData);
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
            <button onClick={() => setView('admin')} className="relative flex items-center gap-2 text-amber-400">
              <Lock size={16}/> Admin
              {unreadCount > 0 && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </button>
          ) : (
            <button onClick={() => setView('admin')} className="relative flex items-center gap-1.5 hover:text-neutral-400 transition">
              <Lock size={16}/> Admin
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </button>
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
                <div key={p.id} className="border border-neutral-900 bg-neutral-950/50 group overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-80 overflow-hidden bg-neutral-900">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-neutral-500 tracking-widest uppercase">{p.category}</span>
                      <h3 className="text-lg font-light tracking-wide mt-1">{p.name}</h3>
                      <p className="text-neutral-300 mt-2 font-medium">R {p.price.toFixed(2)}</p>

                      {/* Customization Options */}
                      {p.hasOptions && (
                        <div className="mt-4 space-y-3 pt-4 border-t border-neutral-900">
                          {p.colors && (
                            <div>
                              <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">Color</label>
                              <div className="flex gap-2 flex-wrap">
                                {p.colors.map(c => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() => setSelectedColors({ ...selectedColors, [p.id]: c })}
                                    className={`px-2 py-1 text-xs border ${ (selectedColors[p.id] || p.colors[0]) === c ? 'border-white text-white bg-neutral-800' : 'border-neutral-800 text-neutral-500'}`}
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {p.sizes && (
                            <div>
                              <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                                {p.category === 'Footwear' ? 'Shoe Size (UK)' : 'Size'}
                              </label>
                              <div className="flex gap-1.5 flex-wrap">
                                {p.sizes.map(s => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => setSelectedSizes({ ...selectedSizes, [p.id]: s })}
                                    className={`px-2 py-1 text-xs border ${ (selectedSizes[p.id] || p.sizes[0]) === s ? 'border-white text-white bg-neutral-800' : 'border-neutral-800 text-neutral-500'}`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button onClick={() => addToCart(p)} className="w-full bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">Add to Bag</button>
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

        {/* Admin Dashboard: Orders Notification Center & Inventory */}
        {view === 'admin' && isAdmin && (
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-neutral-900 pb-4">
              <div className="flex gap-4">
                <button 
                  onClick={() => setAdminTab('orders')} 
                  className={`flex items-center gap-2 pb-2 text-sm tracking-widest uppercase border-b-2 transition ${adminTab === 'orders' ? 'border-white text-white font-medium' : 'border-transparent text-neutral-500'}`}
                >
                  <Bell size={18} />
                  Customer Orders
                  {unreadCount > 0 && (
                    <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                      {unreadCount} NEW
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setAdminTab('inventory')} 
                  className={`flex items-center gap-2 pb-2 text-sm tracking-widest uppercase border-b-2 transition ${adminTab === 'inventory' ? 'border-white text-white font-medium' : 'border-transparent text-neutral-500'}`}
                >
                  <PackageCheck size={18} />
                  Inventory Management
                </button>
              </div>

              <button onClick={() => setIsAdmin(false)} className="text-xs text-neutral-500 hover:text-red-400 uppercase tracking-widest">
                Log Out Admin
              </button>
            </div>

            {/* TAB 1: Customer Orders Slot */}
            {adminTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-neutral-400">
                    Total Received Orders: <strong className="text-white">{orders.length}</strong> | Unread Notifications: <strong className="text-red-400">{unreadCount}</strong>
                  </p>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-neutral-400 hover:text-white underline">
                      Mark All as Read
                    </button>
                  )}
                </div>

                {orders.length === 0 ? (
                  <div className="border border-neutral-900 bg-neutral-950 p-12 text-center text-neutral-500 tracking-wide text-sm">
                    No orders have been placed yet.
                  </div>
                ) : (
                  orders.map(order => (
                    <div 
                      key={order.orderId} 
                      className={`border p-6 relative transition ${order.read ? 'border-neutral-900 bg-neutral-950/40' : 'border-red-900/60 bg-red-950/10'}`}
                    >
                      {!order.read && (
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-950 border border-red-800 text-red-300 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest font-semibold">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          NEW UNREAD ORDER
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-4 border-b border-neutral-900 pb-3">
                        <div>
                          <span className="text-xs text-neutral-500 font-mono">{order.date}</span>
                          <h3 className="text-lg font-medium text-white tracking-wider mt-0.5">
                            Order ID: <span className="font-mono text-emerald-400">{order.orderId}</span>
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-neutral-400 block">Total Amount</span>
                          <span className="text-lg font-medium text-emerald-400">R {order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 font-mono mb-4">
                        <div className="bg-neutral-900/60 p-3 border border-neutral-900">
                          <strong className="text-neutral-400 block uppercase font-sans tracking-wider mb-1">Customer Details</strong>
                          <p><strong>Name:</strong> {order.customer}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                        </div>

                        <div className="bg-neutral-900/60 p-3 border border-neutral-900">
                          <strong className="text-neutral-400 block uppercase font-sans tracking-wider mb-1">Shipping Address</strong>
                          <p>{order.address}</p>
                        </div>

                        <div className="bg-neutral-900/60 p-3 border border-neutral-900">
                          <strong className="text-neutral-400 block uppercase font-sans tracking-wider mb-1">Payment Reference</strong>
                          <p className="text-emerald-400 font-semibold">{order.ref}</p>
                        </div>
                      </div>

                      <div className="border-t border-neutral-900 pt-3 mb-4">
                        <strong className="text-xs text-neutral-400 uppercase tracking-wider block mb-2 font-sans">Purchased Items</strong>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs text-neutral-300 bg-black p-2 border border-neutral-900">
                              <div>
                                <span className="font-medium text-white">{item.name}</span>
                                {(item.selectedColor || item.selectedSize) && (
                                  <span className="text-neutral-500 ml-2">
                                    ({item.selectedColor ? `Color: ${item.selectedColor}` : ''} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''})
                                  </span>
                                )}
                              </div>
                              <span>Qty: {item.qty} &times; R {item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        {!order.read && (
                          <button 
                            onClick={() => markOrderAsRead(order.orderId)} 
                            className="bg-neutral-800 text-neutral-200 px-4 py-2 text-xs tracking-wider uppercase hover:bg-neutral-7
