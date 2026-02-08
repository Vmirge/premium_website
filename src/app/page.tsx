"use client";
import React, { useState, useRef } from 'react';

// --- INTERFACE FOR DATA TYPES ---
interface Product {
  id: number;
  name: string;
  price: number;
  cat: string;
  stock?: number;
  badge?: string;
  img: string;
  desc: string;
  qty?: number; 
}

export default function VortiaLP() {
  // --- CORE STATE ---
  const [activeTab, setActiveTab] = useState('home'); 
  const [adminTab, setAdminTab] = useState('Products');
  const [filter, setFilter] = useState('All');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminDashboard, setIsAdminDashboard] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- ADMIN STATE ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formState, setFormState] = useState({ name: '', price: '', cat: 'Soaps', stock: '10', badge: '', desc: '', img: '' });

  // --- REFS ---
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // --- STYLE CONSTANTS ---
  const googeeFont = { fontFamily: '"Varela Round", sans-serif', letterSpacing: '-0.01em' };

  // --- DATA ---
  const categoryTiles = [
    { name: "Soaps", desc: "Handcrafted & Natural", img: "https://images.unsplash.com/photo-1605264964528-06403738d6dc?auto=format&fit=crop&q=80&w=800" },
    { name: "Face Wash", desc: "Deep Cleansing Care", img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800" },
    { name: "Hair Care", desc: "Nourishing Vitality", img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800" } 
  ];

  const serviceItems = [
    "Excel & Spreadsheet Data Entry", "PDF to Excel / Excel to PDF Conversion", 
    "Online & Offline Data Entry", "Web Research & Data Collection", 
    "CRM Data Management", "Product Listing for E-commerce", 
    "Copy Paste & Typing Work", "Data Cleaning & Formatting"
  ];

  const [herbalProducts, setHerbalProducts] = useState<Product[]>([
    { id: 1, name: "Haldi Chandan Soap", price: 249, cat: "Soaps", img: "/haldi soap.JPEG", desc: "Handcrafted turmeric soap for glowing skin." },
    { id: 2, name: "Rose Milk Soap", price: 299, cat: "Soaps", img: "/rose soap.JPEG", desc: "Luxurious milk cream soap with rose extracts." },
    { id: 3, name: "Charcoal Detox Soap", price: 249, cat: "Soaps", img: "/charcol soap.JPEG", desc: "Activated charcoal for deep pore cleansing." },
    { id: 4, name: "Honey Milk Soap", price: 279, cat: "Soaps", img: "/honey soap.JPEG", desc: "Nourishing honey base for soft skin." },
    { id: 5, name: "Haldi Chandan Face Wash", price: 349, cat: "Face Wash", img: "/haldi face wash.JPEG", desc: "Daily face wash for natural brightness." },
    { id: 6, name: "Neem Face Wash", price: 325, cat: "Face Wash", img: "/neem face wash.JPEG", desc: "Acne control neem." },
    { id: 7, name: "Charcoal Face Wash", price: 349, cat: "Face Wash", img: "/charcol face wash.JPEG", desc: "Pollution detox wash." },
    { id: 8, name: "Herbal Hair Oil", price: 550, cat: "Hair Care", img: "/herbal oil.JPEG", desc: "Strength and growth oil." }
  ]);

  // --- LOGIC ---
  const handleSaveProduct = () => {
    if (editingProduct) {
      setHerbalProducts(herbalProducts.map(p => p.id === editingProduct.id ? { ...p, ...formState, price: Number(formState.price) } : p));
    } else {
      const id = herbalProducts.length > 0 ? Math.max(...herbalProducts.map(p => p.id)) : 0;
      setHerbalProducts([...herbalProducts, { ...formState, id: id + 1, price: Number(formState.price), img: "/placeholder.jpg" } as Product]);
    }
    setShowAddModal(false);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: (i.qty || 0) + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item));
  const removeItem = (id: number) => setCart(cart.filter(item => item.id !== id));
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); setIsLoginOpen(false); setIsAdminDashboard(true); };
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => { setActiveTab('home'); setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 100); };
  const filteredProducts = herbalProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && (filter === 'All' || p.cat === filter));

  // --- ADMIN VIEW ---
  if (isAdminDashboard) {
    return (
      <div className="flex h-screen bg-[#FDFDFB] font-sans text-[#0A2619]">
        <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');` }} />
        <aside className="w-72 bg-[#14532d] text-white flex flex-col shadow-2xl">
          <div className="p-10 flex flex-col items-center border-b border-white/10 text-center font-bold">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-[#D4AF37]"><img src="/logo.JPEG" alt="Logo" className="w-12 h-12 object-contain" /></div>
            <p className="text-xl text-[#D4AF37]" style={googeeFont}>Vortia LP</p>
          </div>
          <nav className="flex-1 p-6 space-y-3 mt-4 text-[11px] font-black uppercase tracking-widest text-white/40 font-bold">
            <button onClick={() => setAdminTab('Products')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Products' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Products</button>
            <button onClick={() => setAdminTab('Settings')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Settings' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Settings</button>
          </nav>
          <div className="p-8 border-t border-white/10 space-y-2">
            <button onClick={() => setIsAdminDashboard(false)} className="w-full text-left p-3 text-[#D4AF37] hover:text-white uppercase text-[10px] font-black font-bold font-black tracking-widest">← View Store</button>
            <button onClick={() => setIsAdminDashboard(false)} className="w-full text-left p-3 text-red-400 hover:text-red-300 uppercase text-[10px] font-black font-bold tracking-widest">← Logout</button>
          </div>
        </aside>
        <main className="flex-1 p-16 overflow-y-auto bg-slate-50/50">
            {adminTab === 'Products' && (
                <div className="space-y-8 animate-in fade-in font-bold">
                    <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase">Inventory</h2>
                    <div className="flex justify-between items-center"><p className="text-slate-400 uppercase text-[10px] tracking-widest">{herbalProducts.length} Items Listed</p><button onClick={() => {setEditingProduct(null); setFormState({ name: '', price: '', cat: 'Soaps', stock: '10', badge: '', desc: '', img: '' }); setShowAddModal(true);}} className="bg-[#14532d] text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#D4AF37] shadow-lg">+ Add Product</button></div>
                    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left font-black">
                            <thead className="bg-[#FAF9F6] text-[10px] font-black uppercase text-slate-400 border-b"><tr><th className="p-6">Image</th><th className="p-6">Name</th><th className="p-6">Category</th><th className="p-6">Price</th><th className="p-6 text-center">Actions</th></tr></thead>
                            <tbody className="text-sm">
                                {herbalProducts.map((p) => (
                                    <tr key={p.id} className="border-b hover:bg-slate-50 transition-colors"><td className="p-6"><img src={p.img} className="w-16 h-16 rounded-2xl object-cover" /></td><td className="p-6">{p.name}</td><td className="p-6 uppercase text-[10px] text-slate-400">{p.cat}</td><td className="p-6 font-black">₹{p.price}</td><td className="p-6 text-center"><button onClick={() => { setEditingProduct(p); setFormState({...p, price: p.price.toString()}); setShowAddModal(true); }} className="mr-4 underline font-black text-[#14532d]">Edit</button><button onClick={() => setHerbalProducts(herbalProducts.filter(x => x.id !== p.id))} className="text-red-500 underline font-black">Delete</button></td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {adminTab === 'Settings' && (
                <div className="max-w-2xl space-y-12 animate-in slide-in-from-bottom-5 font-bold font-black">
                    <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm space-y-10"><h3 className="text-2xl font-serif font-bold text-[#14532d] border-b pb-6 uppercase tracking-widest">Store Settings</h3>
                        <div className="space-y-6">
                            <div className="space-y-2"><label className="text-[11px] font-black uppercase text-slate-400">Store Name</label><input type="text" defaultValue="Vortia LP" className="w-full p-4 bg-slate-50 rounded-xl border outline-none" /></div>
                            <div className="space-y-2"><label className="text-[11px] font-black uppercase text-slate-400 font-black">WhatsApp Number</label><input type="text" defaultValue="919594066615" className="w-full p-4 bg-slate-50 rounded-xl border outline-none font-black" /></div>
                            <button className="bg-[#14532d] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase shadow-lg">Save Changes</button>
                        </div>
                    </div>
                    <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm space-y-10 font-bold"><h3 className="text-2xl font-serif font-bold text-[#14532d] border-b pb-6 uppercase tracking-widest font-black">Security</h3><div className="space-y-6 font-black"><input type="password" placeholder="Old Password" className="w-full p-4 bg-slate-50 rounded-xl border" /><input type="password" placeholder="New Password" className="w-full p-4 bg-slate-50 rounded-xl border" /><input type="password" placeholder="Confirm Password" className="w-full p-4 bg-slate-50 rounded-xl border" /><button className="bg-[#14532d] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase shadow-lg tracking-widest">Update</button></div></div>
                    <div className="bg-red-50 p-12 rounded-[50px] border border-red-100 space-y-6 text-center"><h3 className="text-xl font-serif font-bold text-red-900 uppercase tracking-widest font-black">Danger Zone</h3><button className="bg-red-500 text-white px-10 py-4 rounded-full text-[10px] font-black shadow-lg uppercase tracking-widest">Reset All Things</button></div>
                </div>
            )}
        </main>
        {showAddModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
                <div className="bg-white w-full max-w-2xl rounded-[50px] p-12 shadow-2xl animate-in zoom-in-95 font-bold font-black">
                    <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-10 uppercase tracking-tighter">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <div className="space-y-2 font-black"><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Name</label><input value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none font-black" /></div>
                        <div className="space-y-2 font-black"><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Price</label><input value={formState.price} onChange={(e) => setFormState({...formState, price: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none font-black" /></div>
                        <div className="space-y-2 font-black"><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Category</label><select value={formState.cat} onChange={(e) => setFormState({...formState, cat: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none font-bold font-black"><option value="Soaps">Soaps</option><option value="Face Wash">Face Wash</option><option value="Hair Care">Hair Care</option></select></div>
                        <div className="space-y-2 font-black"><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Stock</label><input type="number" value={formState.stock} onChange={(e) => setFormState({...formState, stock: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none font-bold" /></div>
                        <div className="col-span-2 space-y-2 font-black"><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description</label><textarea value={formState.desc} onChange={(e) => setFormState({...formState, desc: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl h-24 outline-none font-black" /></div>
                        <div className="col-span-2 border-2 border-dashed border-[#14532d]/20 rounded-3xl p-8 text-center bg-slate-50/50 cursor-pointer font-black uppercase text-[10px] tracking-widest hover:border-[#14532d] transition-all"><span className="text-4xl block mb-2">📤</span>Upload Image</div>
                    </div>
                    <div className="flex justify-end gap-4"><button onClick={() => setShowAddModal(false)} className="px-8 py-3 text-slate-400 font-black uppercase text-[10px]">Cancel</button><button onClick={handleSaveProduct} className="px-10 py-3 bg-[#14532d] text-white rounded-full font-black uppercase text-[10px] shadow-xl hover:bg-[#D4AF37]">Save Changes</button></div>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- PUBLIC UI ---
  return (
    <div className="min-h-screen bg-[#FCFDFB] text-[#0A2619] selection:bg-[#fbbf24] selection:text-[#14532d]">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');` }} />
      <div className="bg-[#14532d] text-[#D4AF37] py-3 px-10 text-[10px] font-black uppercase tracking-[0.4em] flex justify-center items-center relative font-black font-bold">
          <button onClick={() => setActiveTab('home')} className="absolute left-10 text-[#D4AF37] hover:scale-125 transition-transform text-lg font-black">←</button>
          <span>Vortia LP • International Quality Standards</span>
      </div>

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-10 py-5 flex justify-between items-center shadow-sm font-sans font-bold">
        <img src="/logo.JPEG" alt="Logo" className="h-24 w-auto object-contain cursor-pointer" onClick={() => setActiveTab('home')} />
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500 font-bold">
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-[#D4AF37]' : ''}>Home</button>
          <button onClick={() => scrollToSection(aboutRef)}>About</button>
          <button onClick={() => setActiveTab('shop')} className={activeTab === 'shop' ? 'text-[#D4AF37]' : ''}>Products</button>
          <button onClick={() => setActiveTab('services')} className={activeTab === 'services' ? 'text-[#D4AF37]' : ''}>Services</button>
          <button onClick={() => scrollToSection(contactRef)}>Contact Us</button>
          <button onClick={() => setIsCartOpen(true)} className="font-black">CART {cart.length > 0 && <span className="bg-[#D4AF37] text-white px-2 py-0.5 rounded-full text-[9px] font-black font-bold">{cart.length}</span>}</button>
          <a href="https://wa.me/919594066615" target="_blank" className="bg-[#25D366] p-2 rounded-full text-white shadow-lg ml-2"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
        </div>
      </nav>

      <main>
        {activeTab === 'home' && (
          <>
            <section className="max-w-7xl mx-auto px-8 py-20 font-bold text-left grid lg:grid-cols-2 gap-10 items-center animate-in fade-in duration-1000">
              <div className="space-y-8 font-black font-bold">
                <h1 className="text-8xl font-serif font-bold leading-[0.9] text-[#14532d]">Botanical <br /><span className="text-[#D4AF37] italic">Excellence</span></h1>
                <p className="text-xl text-slate-500 max-w-lg italic font-bold">Vortia LP is a premium herbal products and business services venture led by Bhavesh Dipak Patil.</p>
                <div className="flex gap-4 mt-10 font-black uppercase text-xs">
                    <button onClick={() => setActiveTab('shop')} className="bg-[#14532d] text-white px-10 py-5 rounded-2xl shadow-xl hover:bg-[#D4AF37] transition-all font-black font-bold tracking-widest">Our Products</button>
                    {/* ENQUIRY NOW TRIGGER RESTORED */}
                    <button onClick={() => setIsEnquiryOpen(true)} className="border-2 border-[#14532d] text-[#14532d] px-10 py-5 rounded-2xl font-black uppercase shadow-lg font-bold tracking-widest hover:bg-[#14532d] hover:text-white transition-all">Enquiry Now</button>
                </div>
              </div>
              <div className="relative shadow-2xl rounded-[60px] overflow-hidden"><img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000" alt="Hero" /></div>
            </section>
            
            <section className="max-w-7xl mx-auto px-8 py-20 text-left font-bold border-t font-black">
                <h2 className="text-5xl font-serif font-medium text-[#14532d] mb-12 uppercase tracking-widest">Shop by collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-black font-bold font-black tracking-widest font-black">
                    {categoryTiles.map((cat) => (
                    <div key={cat.name} onClick={() => {setActiveTab('shop'); setFilter(cat.name);}} className="relative group h-[400px] rounded-[30px] overflow-hidden cursor-pointer shadow-lg active:scale-95 text-left font-serif font-bold font-black tracking-widest"><img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-10 left-10 text-white uppercase"><h3 className="text-2xl font-bold mb-1 font-black">{cat.name}</h3><p className="text-xs opacity-80 font-black">{cat.desc}</p></div></div>
                    ))}
                </div>
                <div className="flex justify-center mt-12"><button onClick={() => setActiveTab('shop')} className="bg-[#14532d] text-white px-14 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#D4AF37] shadow-xl">Explore Products</button></div>
            </section>

            <section ref={aboutRef} className="bg-white py-32 px-8 text-center font-sans font-bold font-black tracking-widest">
                <h2 className="text-6xl font-serif font-bold text-[#14532d] mb-24 uppercase tracking-tighter font-black font-bold">Nature’s Standard.</h2>
                <div className="grid md:grid-cols-2 gap-16 text-left max-w-6xl mx-auto font-medium font-bold font-black">
                    <div className="p-12 bg-[#FAF9F6] rounded-[60px] shadow-sm border border-transparent hover:border-[#D4AF37]/30 transition-all tracking-widest"><h3 className="text-4xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-widest">Mission</h3><p className="text-slate-500 leading-relaxed text-lg italic font-bold">To provide high-quality botanical products and exceed every customer expectation daily.</p></div>
                    <div className="p-12 bg-[#FAF9F6] rounded-[60px] shadow-sm border border-transparent hover:border-[#D4AF37]/30 transition-all tracking-widest"><h3 className="text-4xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-widest">Vision</h3><p className="text-slate-500 leading-relaxed text-lg italic font-bold">To become the most trusted leading brand globally through sustainable practices.</p></div>
                </div>
            </section>

            <section ref={contactRef} className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-20 items-start border-t border-slate-100 font-sans text-left font-black uppercase font-bold font-black">
                <div className="space-y-10 font-bold"><h2 className="text-5xl font-serif font-light text-[#14532d] uppercase tracking-tighter leading-tight font-black font-bold font-black">Get in touch <br /> with us</h2><div className="space-y-6 pt-4 text-sm tracking-widest font-sans font-bold font-black font-black"><p>📞 Phone: +91 95940 66615</p><p>✉️ Email: bhavupatil1992@gmail.com</p><p>📍 Raigad 400702</p></div></div>
                <div className="bg-[#FAF9F6] p-12 rounded-[60px] shadow-sm font-medium font-bold font-black uppercase text-[10px] font-black"><form className="grid grid-cols-1 gap-6" onSubmit={(e) => {e.preventDefault(); alert('Sent!');}}><input placeholder="Full Name" className="w-full p-5 bg-white rounded-2xl outline-none focus:border-[#D4AF37] border border-slate-100 font-bold font-black" required /><input placeholder="Email" className="w-full p-5 bg-white rounded-2xl outline-none focus:border-[#D4AF37] border border-slate-100 font-bold font-black" required /><textarea placeholder="Message" className="w-full p-5 bg-white rounded-2xl h-32 outline-none focus:border-[#D4AF37] border border-slate-100 font-bold font-black" required /><button type="submit" className="w-full py-5 rounded-full bg-[#14532d] text-white uppercase text-xs font-black shadow-lg hover:bg-[#D4AF37] transition-all font-black font-bold font-black">Send Message</button></form></div>
            </section>
          </>
        )}

        {activeTab === 'services' && (
          <section className="animate-in slide-in-from-bottom-5 duration-700 font-sans pt-10 pb-32 font-bold font-black">
              <div className="max-w-7xl mx-auto px-8">
                  <div className="bg-[#0A2619] rounded-[80px] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center min-h-[500px]">
                      <div className="p-20 flex-1 text-left">
                          <span className="text-[#D4AF37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block font-sans">Professional Solutions</span>
                          <h1 className="text-6xl font-serif font-bold text-white mb-6 leading-tight font-black">Professional Data <br /> Entry Services</h1>
                          <p className="text-[#D4AF37] text-lg font-black uppercase tracking-widest mb-10 font-sans font-black font-bold">Accurate • Secure • On Time</p>
                          <p className="text-white/60 text-lg font-medium leading-relaxed italic mb-8 font-sans font-black">"We provide reliable and affordable data entry solutions for businesses worldwide."</p>
                          <button onClick={() => scrollToSection(contactRef)} className="bg-[#D4AF37] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest font-sans font-bold font-black">Connect Now</button>
                      </div>
                      <div className="flex-1 h-full w-full p-10 flex justify-center items-center">
                         <div className="relative h-[400px] w-full rounded-[60px] overflow-hidden shadow-2xl border-4 border-white/10 font-black"><img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1000" alt="Data Services" className="w-full h-full object-cover" /></div>
                      </div>
                  </div>
              </div>

              <div className="max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-2 gap-24 font-bold text-left font-sans font-black">
                  {/* ABOUT IS UPSIDE */}
                  <div className="space-y-12 font-black">
                      <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase tracking-tighter mb-4 font-black">*About our services*</h2>
                      <p className="text-slate-500 text-lg leading-relaxed italic font-medium font-black">We are a professional service provider offering high-quality data entry and data management solutions. Our goal is to help businesses save time, reduce errors, and focus on growth.</p>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium font-black font-bold">With experience in Excel, Google Sheets, and online research, we ensure accurate, fast, and secure data handling.</p>
                  </div>
                  <div className="bg-[#FAF9F6] p-16 rounded-[80px] shadow-sm font-black"><h3 className="text-3xl font-serif font-bold text-[#14532d] mb-10 border-b pb-6 uppercase tracking-widest font-black font-bold font-black font-black font-bold">*Why Choose Us?*</h3><div className="space-y-6 text-[#14532d] font-bold text-lg font-sans font-bold font-black font-black font-black font-bold">{["100% Accurate Data", "Fast Delivery", "Affordable pricing", "Confidential & Secure", "Worldwide Support", "Professional Communication"].map(i => (<div key={i} className="flex items-center gap-4"><span className="text-[#D4AF37] text-2xl font-black font-black">✔</span><span>{i}</span></div>))}</div></div>
              </div>

              {/* SERVICE INCLUDE SEPARATE BOXES FIXED AT DOWNSIDE */}
              <div className="max-w-7xl mx-auto px-8 font-black font-black">
                  <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-16 text-center uppercase tracking-widest font-black underline underline-offset-8 decoration-[#D4AF37] font-black">Our Data Entry Services Include:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-black font-black font-black">
                    {serviceItems.map(item => (
                      <div key={item} className="p-8 bg-white rounded-[40px] shadow-lg border-t-8 border-[#14532d] hover:scale-105 transition-transform flex items-center justify-center text-center font-black font-bold text-[11px] uppercase text-[#14532d] tracking-widest font-black">
                        {item}
                      </div>
                    ))}
                  </div>
              </div>
          </section>
        )}

        {/* HERBAL STANDARD PRODUCTS RESTORED WITH SEARCH & FILTER */}
        {activeTab === 'shop' && (
            <section className="py-20 px-8 max-w-7xl mx-auto text-center font-bold font-black font-black">
                <span className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block font-black font-black">Vortia Standards</span>
                <h2 className="text-6xl font-serif font-bold text-[#14532d] mb-12 uppercase tracking-tighter font-black font-black">Herbal Standard Products</h2>
                
                {/* SEARCH BAR RESTORED */}
                <div className="max-w-xl mx-auto mb-10 font-bold font-black"><input type="text" placeholder="Search herbal products..." className="w-full p-6 bg-white border border-slate-200 rounded-[24px] text-sm outline-none shadow-sm focus:border-[#D4AF37] text-center font-bold font-black" onChange={(e) => setSearchQuery(e.target.value)} /></div>

                {/* CATEGORY TABS RESTORED */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 uppercase font-black text-[10px] font-black font-black font-black">
                    {['All', 'Soaps', 'Face Wash', 'Hair Care'].map((btn) => (<button key={btn} onClick={() => setFilter(btn)} className={`px-8 py-3 rounded-full transition-all ${filter === btn ? 'bg-[#14532d] text-white font-black font-black font-black' : 'bg-white border text-slate-500 font-black font-black font-black'}`}>{btn}</button>))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 font-black font-bold font-black">
                    {filteredProducts.map((p) => (<div key={p.id} onClick={() => setSelectedProduct(p)} className="group bg-white p-7 rounded-[48px] border border-slate-50 hover:shadow-2xl transition-all cursor-pointer text-left font-sans font-bold font-black font-black font-black"><img src={p.img} alt={p.name} className="w-full h-[300px] object-cover rounded-[36px] mb-10 shadow-sm transition-transform duration-700 group-hover:scale-105 font-black font-black" /><h3 className="text-2xl font-bold text-[#14532d] mb-4 leading-none font-black font-black">{p.name}</h3><p className="font-serif font-bold text-[#D4AF37] text-2xl mb-8 font-black font-black">₹{p.price}</p><button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="w-full py-5 rounded-2xl bg-[#14532d] text-white font-black uppercase text-[11px] hover:bg-[#D4AF37] transition-all font-black font-black font-black font-black">Add to Cart</button></div>))}
                </div>
            </section>
        )}
      </main>

      {/* FOOTER */}
      <footer ref={footerRef} className="bg-[#14532d] text-[#D4AF37] pt-32 pb-16 px-12 rounded-t-[100px] shadow-2xl mt-20 font-sans font-bold font-black font-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-[#D4AF37]/20 pb-24 text-left font-black font-black font-black font-black">
          <div className="space-y-6"><p className="text-4xl font-bold tracking-tight font-black" style={googeeFont}>Vortia LP</p><p className="text-[10px] text-[#D4AF37]/80 italic underline font-bold uppercase tracking-widest font-black font-black font-black">Trust Beyond Borders</p></div>
          <div className="space-y-8 text-xs font-black uppercase font-sans font-bold font-black font-black font-black"><p className="tracking-widest text-[11px] font-black font-black font-black">Contact Us</p><div className="space-y-2 font-black font-black font-black font-bold font-black font-black font-black"><p>+91 95940 66615</p><p>bhavupatil1992@gmail.com</p><p>Mulekhand, Uran, MH 400702</p></div></div>
          <div className="space-y-8 text-right md:text-left font-black uppercase font-sans font-bold font-black font-black font-black tracking-widest font-black font-black font-black"><p className="text-[11px] font-black font-black font-black font-black">Legal</p><div className="flex flex-col gap-4 text-[10px] font-black font-black"><button className="text-left hover:underline">Privacy Policy</button><button onClick={() => setIsLoginOpen(true)} className="text-left font-black hover:underline uppercase font-black font-black font-black font-black font-black font-black font-black font-black">Admin</button></div></div>
          <div className="space-y-8 text-right md:text-left uppercase font-black font-bold font-sans font-black tracking-widest font-black font-black font-black font-black font-black"><p className="text-[11px] font-black font-black font-black font-black font-black">Follow Us</p><a href="https://www.instagram.com/bhavupatil?igsh=eHQ1YnFrcDF5YWNs" target="_blank" className="inline-flex w-10 h-10 rounded-full border border-[#D4AF37]/30 items-center justify-center hover:bg-[#D4AF37] hover:text-[#14532d] transition-all font-black font-black font-black font-black font-black">IG</a></div>
        </div>
      </footer>

      {/* ENQUIRY MODAL (FIXED) */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300 font-sans text-left font-bold font-black font-black font-black">
            <div className="bg-white w-full max-w-lg rounded-[60px] p-12 shadow-2xl relative animate-in zoom-in-95 text-left font-black font-black font-black"><button onClick={() => setIsEnquiryOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 text-3xl font-light font-bold font-black font-black">×</button><h3 className="text-3xl font-serif font-bold text-[#14532d] mb-8 uppercase tracking-tighter font-sans font-bold font-black font-black font-black">Enquiry Form</h3><form className="space-y-6 font-black font-black font-black" onSubmit={(e) => { e.preventDefault(); alert('Sent!'); setIsEnquiryOpen(false); }}><input placeholder="Full Name" className="w-full p-5 bg-slate-50 rounded-3xl outline-none border border-slate-100 font-bold font-black font-black" required /><textarea placeholder="Message..." className="w-full p-5 bg-slate-50 rounded-3xl border border-slate-100 h-32 outline-none font-bold font-black font-black" required /><button type="submit" className="w-full py-5 rounded-full bg-[#14532d] text-white font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-[#D4AF37] font-black font-black font-black">Submit Enquiry</button></form></div>
        </div>
      )}

      {/* PRODUCT DETAIL VIEW (FIXED) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 font-black">
            <div className="bg-white w-full max-w-4xl rounded-[60px] overflow-hidden flex flex-col md:flex-row relative shadow-2xl animate-in zoom-in-95 font-black"><button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-4xl font-light hover:text-red-500 z-10 font-black">×</button><div className="md:w-1/2 bg-slate-50 flex items-center justify-center font-black"><img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover shadow-2xl font-black" /></div><div className="md:w-1/2 p-16 flex flex-col justify-center space-y-8 text-left font-sans font-bold font-black"><span className="text-[#D4AF37] font-black uppercase tracking-widest text-[10px] font-black">{selectedProduct.cat}</span><h2 className="text-5xl font-serif font-bold text-[#14532d] leading-tight uppercase tracking-tighter font-black">{selectedProduct.name}</h2><p className="text-slate-500 leading-relaxed text-lg font-medium italic font-black">"{selectedProduct.desc}"</p><p className="text-4xl font-serif font-bold text-[#14532d] font-black">₹{selectedProduct.price}</p><button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="bg-[#14532d] text-white py-5 px-12 rounded-full font-black uppercase text-xs shadow-xl hover:bg-[#D4AF37] tracking-widest font-black font-black">Add To Cart</button></div></div>
        </div>
      )}

      {/* LOGIN MODAL (FIXED) */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#0A2619]/95 backdrop-blur-2xl animate-in fade-in duration-500 font-sans text-center font-black">
            <div className="bg-white/95 w-full max-w-sm rounded-[60px] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative border border-white/20 font-black"><button onClick={() => setIsLoginOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-red-500 text-3xl font-black font-black">×</button><div className="mb-12 font-black font-black"><img src="/logo.JPEG" className="h-12 w-auto mx-auto mb-6 opacity-80 font-black font-black" /><h2 className="text-3xl font-serif font-bold text-[#14532d] uppercase tracking-widest underline decoration-[#D4AF37] decoration-4 underline-offset-8 font-black font-black">Login</h2></div><form className="space-y-6 font-black font-black" onSubmit={handleLogin}><input placeholder="Username" className="w-full p-5 bg-slate-100 rounded-3xl outline-none text-sm font-bold uppercase tracking-widest font-black font-black" required /><input type="password" placeholder="Password" className="w-full p-5 bg-slate-100 rounded-3xl outline-none text-sm font-bold uppercase tracking-widest font-black font-black" required /><button type="submit" className="w-full py-5 rounded-full bg-[#14532d] text-white font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-[#D4AF37] transform active:scale-95 transition-all font-black font-black">Login</button></form></div>
        </div>
      )}

      {/* CART DRAWER (FIXED) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[300] flex justify-end font-sans font-bold font-black">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm font-sans font-bold font-black font-black" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-12 flex flex-col overflow-y-auto border-l border-slate-100 animate-in slide-in-from-right duration-500 text-[#14532d] font-black font-black">
            <div className="flex justify-between items-center mb-12 font-serif font-bold text-4xl font-black font-black"><h2>Cart</h2><button onClick={() => setIsCartOpen(false)} className="text-4xl font-light font-black font-black">×</button></div>
            <div className="flex-1 space-y-10 font-black font-black">{cart.map((item) => (<div key={item.id} className="flex gap-6 border-b border-slate-50 pb-8 items-center text-left font-black font-black"><img src={item.img} className="w-24 h-24 rounded-3xl object-cover shadow-sm font-black font-black" /><div className="flex-1 space-y-2 font-black font-black"><p className="font-bold text-lg font-black font-black">{item.name}</p><p className="text-[#D4AF37] font-bold text-sm font-black font-black">₹{item.price} x {item.qty}</p><div className="flex items-center gap-4 pt-2 font-black font-black"><button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-slate-200">-</button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full border border-slate-200">+</button><button onClick={() => removeItem(item.id)} className="ml-auto text-red-500 text-xs uppercase underline font-black">Remove</button></div></div></div>))}</div>
            {cart.length > 0 && (<div className="mt-12 pt-10 border-t border-slate-100 space-y-6 font-black font-black"><h3 className="text-xs uppercase tracking-widest font-black font-bold font-black font-black">Checkout</h3><div className="space-y-4 font-black font-black"><input placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-xl outline-none" /><input placeholder="Phone" className="w-full p-4 bg-slate-50 rounded-xl outline-none" /><textarea placeholder="Address" className="w-full p-4 bg-slate-50 rounded-xl h-24 outline-none" /></div><div className="flex justify-between items-center mb-8 border-t pt-6 font-black font-bold font-black font-black"><span className="text-slate-400 uppercase text-[10px] font-black font-black">Total</span><span className="text-5xl font-serif font-black font-black font-black">₹{totalPrice}</span></div><button onClick={() => alert(`Processing ₹${totalPrice}`)} className="w-full py-6 rounded-[24px] bg-[#fbbf24] font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl hover:bg-[#D4AF37] font-black font-black">Pay via Google Pay</button></div>)}
          </div>
        </div>
      )}
    </div>
  );
}