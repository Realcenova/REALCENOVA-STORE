import React, { useState, useEffect } from 'react';
import { ShoppingBag, QrCode, Lock, LogOut, Plus, Trash2, X, User, CheckCircle, Building, Truck, Bell, PackageCheck, Eye, Edit2, Check } from 'lucide-react';

// Custom Self-Contained SVG Renderers for Guaranteed Image Display (No Broken Links)
const GolfPoloSVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full bg-neutral-900">
    <rect width="400" height="400" fill="#0d0d0d" />
    {/* Polo Base */}
    <path d="M120 100 L160 70 L240 70 L280 100 L330 140 L290 180 L270 160 L270 340 L130 340 L130 160 L110 180 L70 140 Z" fill="#f8f9fa" />
    {/* Collar & Buttons */}
    <path d="M160 70 L200 130 L240 70 L220 70 L200 100 L180 70 Z" fill="#e9ecef" stroke="#ced4da" strokeWidth="2" />
    <path d="M185 110 L215 110 L215 170 L185 170 Z" fill="#ffffff" stroke="#adb5bd" strokeWidth="1" />
    <circle cx="200" cy="125" r="3" fill="#495057" />
    <circle cx="200" cy="145" r="3" fill="#495057" />
    {/* Chest Brand Emblem & Text */}
    <path d="M235 180 L245 165 L255 180 Z M240 180 L240 195" stroke="#b59410" strokeWidth="2" fill="none" />
    <text x="245" y="210" fill="#b59410" fontSize="11" fontFamily="serif" fontWeight="bold">REALCENOVA</text>
  </svg>
);

const CowboyFrontBackSVG = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full bg-neutral-900">
    <rect width="800" height="400" fill="#0a0a0a" />
    {/* FRONT SIDE */}
    <g transform="translate(20, 10)">
      <text x="180" y="45" fill="#6c757d" fontSize="14" letterSpacing="4" textAnchor="middle">FRONT</text>
      <path d="M70 90 L110 60 L250 60 L290 90 L340 130 L300 170 L280 150 L280 350 L80 350 L80 150 L60 170 L20 130 Z" fill="#ffffff" />
      <text x="180" y="210" fill="#b59410" fontSize="18" fontFamily="serif" letterSpacing="3" textAnchor="middle" fontWeight="bold">REALCENOVA</text>
    </g>
    {/* BACK SIDE */}
    <g transform="translate(420, 10)">
      <text x="180" y="45" fill="#6c757d" fontSize="14" letterSpacing="4" textAnchor="middle">BACK</text>
      <path d="M70 90 L110 60 L250 60 L290 90 L340 130 L300 170 L280 150 L280 350 L80 350 L80 150 L60 170 L20 130 Z" fill="#ffffff" />
      {/* Cowboy Graphic Silhouette */}
      <circle cx="180" cy="180" r="55" fill="#1a1a1a" />
      <path d="M140 160 Q180 130 220 160 Q180 150 140 160 Z" fill="#b59410" />
      <path d="M145 175 C145 160 215 160 215 175 L205 220 L155 220 Z" fill="#2b2b2b" />
      <path d="M130 140 L210 220 M140 130 L220 210" stroke="#b59410" strokeWidth="4" strokeLinecap="round" />
    </g>
  </svg>
);

const RoundNeckSVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full bg-neutral-900">
    <rect width="400" height="400" fill="#0d0d0d" />
    <path d="M100 100 Q200 130 300 100 L340 140 L300 180 L280 160 L280 340 L120 340 L120 160 L100 180 L60 140 Z" fill="#f8f9fa" />
    <path d="M160 100 Q200 135 240 100 Q200 115 160 100 Z" fill="#e9ecef" stroke="#ced4da" strokeWidth="1" />
    <text x="200" y="210" fill="#b59410" fontSize="16" fontFamily="serif" letterSpacing="2" textAnchor="middle" fontWeight="bold">REALCENOVA</text>
  </svg>
);

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'REALCENOVA Leather Slides (Gold Emblem)',
    price: 750.00,
    category: 'Footwear',
    imageType: 'slides-gold',
    image: 'https://lh3.googleusercontent.com/d/11fJbgsvzLFUpPv977OHwq98gN_ns6b5z',
    hasOptions: true,
    sizes: ['5', '6', '7', '8', '9', '10', '11']
  },
  {
    id: 2,
    name: 'REALCENOVA Leather Slides (Stitched Patch)',
    price: 750.00,
    category: 'Footwear',
    imageType: 'slides-patch',
    image: 'https://lh3.googleusercontent.com/d/1INdiML6Z7pslhVyYN6kBFMqH2Rs--54S',
    hasOptions: true,
    sizes: ['5', '6', '7', '8', '9', '10', '11']
  },
  {
    id: 3,
    name: 'REALCENOVA Golf T-Shirt (Buttoned Polo)',
    price: 559.99,
    category: 'Apparel',
    imageType: 'golf-polo',
    hasOptions: true,
    colors: ['White', 'Black', 'Navy', 'Off-White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 4,
    name: 'REALCENOVA Round Neck T-Shirt',
    price: 449.99,
    category: 'Apparel',
    imageType: 'round-neck',
    hasOptions: true,
    colors: ['White', 'Black', 'Navy', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 8,
    name: 'REALCENOVA "Cowboy" Front & Back T-Shirt',
    price: 449.99,
    category: 'Apparel',
    imageType: 'cowboy-front-back',
    hasOptions: true,
    colors: ['White'],
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
    price: 1300.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/d/1v1nmaNrfAp7ZDZZU2cG2T6kNyzuTyN7u',
    hasOptions: true,
    colors: ['Blue'],
    sizes: ['28', '30', '32', '34', '36']
  },
  {
    id: 7,
    name: 'REALCENOVA Classic Denim Jeans (Black)',
    price: 1300.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/d/1pdUt7tFp7aGNI37vUG5gPXcEt9d7eZ9u',
    hasOptions: true,
    colors: ['Black'],
    sizes: ['28', '30', '32', '34', '36']
  }
];

function ProductDisplayImage({ product }) {
  if (product.imageType === 'golf-polo') return <GolfPoloSVG />;
  if (product.imageType === 'cowboy-front-back') return <CowboyFrontBackSVG />;
  if (product.imageType === 'round-neck') return <RoundNeckSVG />;

  return (
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
    />
  );
}

export default function App() {
  const [view, setView] = useState('store');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [storeUrl, setStoreUrl] = useState('https://realcenova-store.vercel.app');
  const [adminTab, setAdminTab] = useState('orders');

  // Clear stale local storage once to force clean sync
  const [products, setProducts] = useState(() => {
    localStorage.removeItem('realcenova_products');
    return INITIAL_PRODUCTS;
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
                      <ProductDisplayImage product={p} />
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

        {/* Admin Dashboard: Orders Notification Center & Inventory Price Editor */}
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
                  Inventory & Live Price Editor
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
                            className="bg-neutral-800 text-neutral-200 px-4 py-2 text-xs tracking-wider uppercase hover:bg-neutral-700 transition flex items-center gap-1.5"
                          >
                            <Eye size={14} /> Mark as Inspected
                          </button>
                        )}
                        <button 
                          onClick={() => deleteOrder(order.orderId)} 
                          className="text-red-400 hover:text-red-300 p-2 text-xs flex items-center gap-1"
                        >
                          <Trash2 size={14}/> Clear Order
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: Inventory & Live Price Editor Slot */}
            {adminTab === 'inventory' && (
              <div>
                <div className="mb-6 bg-neutral-900/50 border border-neutral-800 p-4 text-xs text-neutral-300">
                  <p><strong>Admin Price Control:</strong> Click <strong>"Edit Price"</strong> on any product below to instantly update its store price right from your browser without modifying any code files!</p>
                </div>

                <form onSubmit={addProduct} className="border border-neutral-900 p-6 bg-neutral-950 mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Product Name</label>
                    <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="Product Name" required />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Price (R)</label>
                    <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="0.00" required />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Category</label>
                    <input type="text" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="Category" />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Image URL</label>
                    <input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" placeholder="https://..." />
                  </div>
                  <button type="submit" className="bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition flex items-center justify-center gap-2 col-span-full md:col-span-1"><Plus size={16}/> Add Product</button>
                </form>

                <div className="space-y-4">
                  {products.map(p => (
                    <div key={p.id} className="border border-neutral-900 p-4 flex justify-between items-center bg-neutral-950">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-neutral-900 overflow-hidden">
                          <ProductDisplayImage product={p} />
                        </div>
                        <div>
                          <h4 className="font-light tracking-wide">{p.name}</h4>
                          
                          {/* Live Price Editor */}
                          {editingProductId === p.id ? (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-neutral-400">R</span>
                              <input 
                                type="number" 
                                value={editingPriceInput} 
                                onChange={e => setEditingPriceInput(e.target.value)} 
                                className="w-24 bg-black border border-white px-2 py-1 text-xs text-emerald-400 font-mono focus:outline-none"
                                autoFocus
                              />
                              <button onClick={() => savePrice(p.id)} className="bg-emerald-600 hover:bg-emerald-500 text-white p-1 rounded transition">
                                <Check size={14} />
                              </button>
                              <button onClick={() => setEditingProductId(null)} className="text-neutral-500 hover:text-white p-1">
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs text-emerald-400 font-medium font-mono">R {p.price.toFixed(2)}</p>
                              <button onClick={() => startEditingPrice(p)} className="text-[11px] text-neutral-400 hover:text-white underline flex items-center gap-1">
                                <Edit2 size={12} /> Edit Price
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button onClick={() => deleteProduct(p.id)} className="text-neutral-500 hover:text-red-400 p-2 transition"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  <div key={item.cartItemId} className="flex gap-4 border-b border-neutral-900 pb-4 items-center">
                    <div className="w-16 h-16 bg-neutral-900 overflow-hidden shrink-0">
                      <ProductDisplayImage product={item} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-light">{item.name}</h4>
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {item.selectedColor && `Color: ${item.selectedColor}`} {item.selectedSize && `| Size: ${item.selectedSize}`}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400 mt-1">R {item.price.toFixed(2)} x {item.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartItemId)} className="text-neutral-500 hover:text-red-400"><Trash2 size={16}/></button>
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
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); setCheckoutStep(1); }} 
                  className="w-full bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition"
                >
                  Proceed to Delivery & Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout, Delivery & EFT Payment Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full bg-neutral-950 border border-neutral-900 p-8 my-8 relative">
            <button onClick={() => { setIsCheckoutOpen(false); setOrderComplete(false); setCheckoutStep(1); }} className="absolute top-6 right-6 text-neutral-400 hover:text-white"><X size={20}/></button>

            {orderComplete ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto text-emerald-400 mb-4" />
                <h3 className="text-2xl font-light tracking-widest mb-2">ORDER PLACED SUCCESSFULLY</h3>
                <p className="text-neutral-400 text-sm mb-4">Order Reference Number: <strong className="text-white">{recentOrder?.orderId}</strong></p>
                <div className="bg-neutral-900/60 p-4 border border-neutral-800 text-xs text-neutral-300 text-left mb-6 space-y-1 font-mono">
                  <p><strong>Recipient:</strong> {recentOrder?.customer} ({recentOrder?.phone})</p>
                  <p><strong>Address:</strong> {recentOrder?.address}</p>
                  <p><strong>Payment Ref:</strong> {recentOrder?.ref}</p>
                  <p><strong>Estimated Delivery:</strong> 5–7 Working Days</p>
                </div>
                <button onClick={() => { setIsCheckoutOpen(false); setOrderComplete(false); setCheckoutStep(1); setView('store'); }} className="bg-white text-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">Return to Store</button>
              </div>
            ) : checkoutStep === 1 ? (
              <div>
                <h3 className="text-xl font-light tracking-widest uppercase mb-4">Step 1: Delivery Details</h3>
                
                <div className="flex items-center gap-3 bg-neutral-900/80 border border-neutral-800 p-3 mb-6 text-xs text-neutral-300">
                  <Truck size={18} className="text-white shrink-0" />
                  <span><strong>Standard Delivery:</strong> Delivered within <strong>5 to 7 Working Days</strong> via door-to-door courier.</span>
                </div>

                <form onSubmit={handleProceedToPayment} className="space-y-6">
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

                  <button type="submit" className="w-full bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-light tracking-widest uppercase mb-4">Step 2: Payment (Direct EFT Transfer)</h3>
                
                <div className="border border-neutral-900 bg-neutral-900/40 p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4 text-neutral-300">
                    <Building size={18} />
                    <span className="text-sm uppercase tracking-wider font-medium">REALCENOVA Banking Details</span>
                  </div>
                  <div className="space-y-2 text-xs text-neutral-400 font-mono">
                    <p><strong className="text-neutral-200">Bank Name:</strong> Capitec Bank</p>
                    <p><strong className="text-neutral-200">Account Name:</strong> REALCENOVA STORE</p>
                    <p><strong className="text-neutral-200">Account Number:</strong> 2419862631</p>
                    <p><strong className="text-neutral-200">Reference:</strong> {shippingAddress.phone || 'Your Phone Number'}</p>
                    <p className="text-white text-sm font-sans mt-3 border-t border-neutral-800 pt-2 font-light">
                      Total Payable: <strong className="text-emerald-400">R {cartTotal.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleFinalizeOrder} className="space-y-6">
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Payment Reference / Transaction ID</label>
                    <input 
                      type="text" 
                      value={paymentRef} 
                      onChange={e => setPaymentRef(e.target.value)} 
                      className="w-full bg-black border border-neutral-800 p-3 text-sm focus:outline-none focus:border-white" 
                      placeholder="Enter EFT Ref or Payment Confirmation No." 
                      required 
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setCheckoutStep(1)} className="w-1/3 border border-neutral-800 text-neutral-400 py-4 text-xs tracking-[0.2em] uppercase hover:text-white transition">
                      Back
                    </button>
                    <button type="submit" className="w-2/3 bg-white text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-neutral-200 transition">
                      Confirm & Complete Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
