"use client";

import React, { useState, useRef } from 'react';

import { supabase } from '@/lib/supabaseClient';



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

  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '',screenshot: '' });

  const [showAddModal, setShowAddModal] = useState(false);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false); 

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const [enquiries, setEnquiries] = React.useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // 1. We need a place to store the orders we get from the database

const [orders, setOrders] = useState<any[]>([]);
const [isQrOpen, setIsQrOpen] = useState(false);



// 2. This is the "Trigger" (useEffect)
// 2. This is the "Trigger" (useEffect)
React.useEffect(() => {
  const fetchAdminData = async () => {
    // Only run if we are actually in the Admin Dashboard
    if (!isAdminDashboard) return;

    // Fetch Orders if the Orders tab is active
    if (adminTab === 'Orders') {
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert("Error fetching from Supabase: " + error.message);
    } else {
      console.log("Data received from Supabase:", data); // Check F12 Console
      
      if (data && data.length > 0) {
        setOrders(data);
      } else {
        // If this pops up, the policy is still blocking or the table name is wrong
        alert("Supabase returned 0 orders. Check your table name and policies.");
      }
    }
  };
  fetchOrders();
}

    // Fetch Enquiries if the Enquiries tab is active
    if (adminTab === 'Enquiries') {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Enquiry Fetch Error:", error.message);
      } else {
        setEnquiries(data || []);
      }
    }
  };

  fetchAdminData();
}, [adminTab, isAdminDashboard]);// This ensures it runs when you switch tabs // IMPORTANT: adminTab must be here// This means: "Run this every time the tab changes"

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



  // --- PRODUCT LIST ---

  const [herbalProducts, setHerbalProducts] = useState<Product[]>([

    { id: 1, name: "Almond Milk Soap", price: 299, cat: "Soaps", img: "/almond milk soap.jpeg", desc: "Creamy almond milk for soft, moisturized skin." },

    { id: 2, name: "Charcoal Soap", price: 249, cat: "Soaps", img: "/charcol soap.jpeg", desc: "Deeply cleanses pores and removes toxins." },

    { id: 3, name: "Goat Milk Soap", price: 299, cat: "Soaps", img: "/goat milk soap.jpeg", desc: "Gentle exfoliation with natural lactic acid." },

    { id: 4, name: "Haldi Chandan Soap", price: 249, cat: "Soaps", img: "/haldi chandan soap.jpeg", desc: "Traditional glow-enhancing turmeric and sandalwood." },

    { id: 5, name: "Honey Milk Soap", price: 279, cat: "Soaps", img: "/honey milk soap.jpeg", desc: "Nourishing honey base for soft, supple skin." },

    { id: 6, name: "Neem Soap", price: 225, cat: "Soaps", img: "/neem soap.jpeg", desc: "Antibacterial protection for clear, healthy skin." },

    { id: 7, name: "Papaya Soap", price: 249, cat: "Soaps", img: "/papaya soap.jpeg", desc: "Skin brightening enzymes for a fresh look." },

    { id: 8, name: "Rice Potato Soap", price: 259, cat: "Soaps", img: "/rice patato soap.jpeg", desc: "Reduces dark spots and improves skin texture." },

    { id: 9, name: "Rose Milk Soap", price: 299, cat: "Soaps", img: "/rose milk soap.jpeg", desc: "Fragrant rose and milk for deep hydration." },

    { id: 10, name: "Saffron Milk Soap", price: 349, cat: "Soaps", img: "/saffron milk soap.jpeg", desc: "Premium saffron for a luxury bathing experience." },

    { id: 11, name: "Charcoal Face Wash", price: 349, cat: "Face Wash", img: "/charcol facewash.jpeg", desc: "Pollution detox for deeply cleaned skin." },

    { id: 12, name: "Coffee Face Wash", price: 325, cat: "Face Wash", img: "/coffee facewash.jpeg", desc: "Energizing caffeine boost for dull skin." },

    { id: 13, name: "Haldi Chandan Face Wash", price: 349, cat: "Face Wash", img: "/haldi chandan facewash.jpeg", desc: "Daily brightness and acne protection." },

    { id: 14, name: "Neem Face Wash", price: 325, cat: "Face Wash", img: "/neem face wash.jpeg", desc: "Purifying neem to prevent breakouts." },

    { id: 15, name: "Herbal Hair Oil", price: 550, cat: "Hair Care", img: "/hair oil.jpeg", desc: "Promotes hair growth and reduces fall." },

    { id: 16, name: "Hair Shampoo", price: 450, cat: "Hair Care", img: "/hair sampoo.jpeg", desc: "Botanical cleansing for strong, shiny hair." },

    { id: 17, name: "Hair Conditioner", price: 425, cat: "Hair Care", img: "/hair conditioner.jpeg", desc: "Smooths frizz and adds natural shine." }

  ]);



  // --- HANDLERS ---

  const handleSaveProduct = () => {

    if (editingProduct) {

      setHerbalProducts(herbalProducts.map(p => 

        p.id === editingProduct.id ? { ...p, ...formState, price: Number(formState.price), stock: Number(formState.stock) } : p

      ));

    } else {

      const id = herbalProducts.length > 0 ? Math.max(...herbalProducts.map(p => p.id)) : 0;

      setHerbalProducts([...herbalProducts, { ...formState, id: id + 1, price: Number(formState.price), stock: Number(formState.stock), img: formState.img || "/placeholder.jpg" } as Product]);

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

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Checking the state we just created
  if (loginData.username === "admin" && loginData.password === "admin@123") {
    setIsAdminDashboard(true);
    setIsLoginOpen(false);
    setLoginData({ username: '', password: '' }); // Clear form
  } else {
    alert("Invalid Username or Password!");
  }
};
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => { setActiveTab('home'); setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 100); };

  const filteredProducts = herbalProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && (filter === 'All' || p.cat === filter));

  // ... your state variables (cart, customerInfo, etc.)



// --- HANDLERS ---


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

          <nav className="flex-1 p-6 space-y-3 mt-4 text-[11px] font-black uppercase tracking-widest text-white/40">

            <button onClick={() => setAdminTab('Products')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Products' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Products</button>

            <button onClick={() => setAdminTab('Orders')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Orders' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Orders</button>

            <button onClick={() => setAdminTab('Settings')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Settings' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Settings</button>

            <button 

  onClick={() => setAdminTab('Enquiries')} 

  className={`w-full text-left p-4 rounded-xl transition-all ${adminTab === 'Enquiries' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}

>

  Enquiries

</button>

          </nav>

          <div className="p-8 border-t border-white/10 space-y-2">

            <button onClick={() => setIsAdminDashboard(false)} className="w-full text-left p-3 text-[#D4AF37] uppercase text-[10px] font-black">← View Store</button>

            <button onClick={() => {setIsAdminDashboard(false); setIsLoginOpen(false);}} className="w-full text-left p-3 text-red-400 uppercase text-[10px] font-black">Logout</button>

          </div>

        </aside>



        <main className="flex-1 p-16 overflow-y-auto bg-slate-50/50">

          {adminTab === 'Products' && (

            <div className="space-y-8 animate-in fade-in font-bold">

              <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase">Inventory</h2>

              <div className="flex justify-between items-center">

                <p className="text-slate-400 uppercase text-[10px] tracking-widest">{herbalProducts.length} Items Listed</p>

                <button onClick={() => { setEditingProduct(null); setFormState({ name: '', price: '', cat: 'Soaps', stock: '10', badge: '', desc: '', img: '' }); setShowAddModal(true); }} className="bg-[#14532d] text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] shadow-lg">+ Add Product</button>

              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">

                <table className="w-full text-left font-black">

                  <thead className="bg-[#FAF9F6] text-[10px] uppercase text-slate-400 border-b">

                    <tr><th className="p-6">Image</th><th className="p-6">Name</th><th className="p-6">Category</th><th className="p-6">Price</th><th className="p-6 text-center">Actions</th></tr>

                  </thead>

                  <tbody className="text-sm">

                    {herbalProducts.map((p) => (

                      <tr key={p.id} className="border-b hover:bg-slate-50">

                        <td className="p-6"><img src={p.img} className="w-16 h-16 rounded-2xl object-cover" /></td>

                        <td className="p-6 text-[#14532d]">{p.name}</td>

                        <td className="p-6 uppercase text-[10px] text-slate-400">{p.cat}</td>

                        <td className="p-6 font-black">₹{p.price}</td>

                        <td className="p-6 text-center">

                          <button onClick={() => { setEditingProduct(p); setFormState({ ...p, price: p.price.toString(), stock: (p.stock ?? 10).toString() }); setShowAddModal(true); }} className="mr-4 underline text-[#14532d]">Edit</button>

                          <button onClick={() => setHerbalProducts(herbalProducts.filter(x => x.id !== p.id))} className="text-red-500 underline">Delete</button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}



         {adminTab === 'Orders' && (

  <div className="space-y-8 animate-in fade-in font-bold">

    <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase">Manage Orders</h2>

    <div className="bg-white rounded-[40px] border-4 border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">

      

      {/* WRAPPING THE ENTIRE LIST IN A TABLE */}

      <table className="w-full text-left border-collapse">

        <thead className="bg-[#FAF9F6] text-[10px] uppercase text-slate-400 border-b-4 border-black">

          <tr>

            <th className="p-6">Date</th>

            <th className="p-6">Customer</th>

            <th className="p-6">Items</th>

            <th className="p-6">Total</th>

            <th className="p-6 text-center">Status</th>
            <th className="p-6 text-center">Proof</th>

            <th className="p-6 text-center">Actions</th>

          </tr>

        </thead>

        

        <tbody className="text-sm">

          {orders.length > 0 ? (

            orders.map((order) => (

              <tr key={order.id} className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors">

                <td className="p-6 text-[10px]">

                  {new Date(order.created_at).toLocaleDateString()}

                </td>

                <td className="p-6">

                  <div className="flex flex-col">

                    <span className="font-black text-[#14532d] uppercase">{order.customer_name}</span>

                    <span className="text-[10px] text-slate-400">{order.phone}</span>

                  </div>

                </td>

                <td className="p-6 max-w-[200px]">

                  <div className="text-[10px] space-y-1">

                    {/* Checking if items is an array before mapping */}

                    {Array.isArray(order.items) ? order.items.map((item: any, i: number) => (

                      <div key={i}>• {item.name} (x{item.quantity || item.qty})</div>

                    )) : "No items listed"}

                  </div>

                </td>

                <td className="p-6 font-black italic">₹{order.total_amount}</td>

                <td className="p-6 text-center">

                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border-2 border-black ${

                    order.payment_status === 'Paid' ? 'bg-green-400' : 

                    order.payment_status === 'Finished' ? 'bg-slate-200' : 'bg-amber-400'

                  }`}>

                    {order.payment_status}

                  </span>

                </td>

                {/* ADD THIS CELL HERE */}
  <td className="p-6 text-center">
    {order.screenshot_url ? (
      <img 
  src={order.screenshot_url} 
  onClick={() => setPreviewImage(order.screenshot_url)}
  className="w-12 h-12 object-cover rounded-lg border-2 border-black cursor-pointer mx-auto"
/>
    ) : (
      <span className="text-slate-300 text-[10px]">No Image</span>
    )}
  </td>

                <td className="p-6 text-center space-x-2">
  <button 
    onClick={async () => {
      // 1. Update Status to 'Paid' or 'Finished'
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'Paid' }) // Change to 'Paid' when you verify the QR payment
        .eq('id', order.id);

      if (!error) {
        setOrders(orders.map(o => o.id === order.id ? { ...o, payment_status: 'Paid' } : o));
        alert("Order marked as Paid!");
      }
    }}
    className="text-green-600 underline font-black text-[10px] uppercase"
  >
    Mark Paid
  </button>

  <button 
    onClick={async () => {
      if(confirm("Delete this order?")) {
        const { error } = await supabase
          .from('orders')
          .delete()
          .eq('id', order.id);

        if (!error) {
          setOrders(orders.filter(o => o.id !== order.id));
        } else {
          alert("Error: Check your Supabase Delete Policy for the orders table.");
        }
      }
    }}
    className="text-red-500 underline font-black text-[10px] uppercase"
  >
    Delete
  </button>
</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan={6} className="p-10 text-center text-slate-400 uppercase text-[10px]">

                No orders found.

              </td>

            </tr>

          )}

        </tbody>

      </table>



    </div>

  </div>

)}



          {adminTab === 'Enquiries' && (

  <div className="space-y-8 animate-in fade-in">

    <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase">Customer Enquiries</h2>

    <div className="bg-white rounded-[40px] border-4 border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">

      <table className="w-full text-left">

        <thead className="bg-[#FAF9F6] text-[10px] uppercase text-slate-400 border-b-4 border-black">

          <tr>

            <th className="p-6">Name</th>

            <th className="p-6">Email</th>

            <th className="p-6">Message</th>

            <th className="p-6 text-center">Actions</th>

          </tr>

        </thead>

        <tbody className="text-sm">

          {enquiries.length > 0 ? (

            enquiries.map((enq) => (

              <tr key={enq.id} className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors">

                {/* CHECK THESE NAMES: full_name, email, message must match your SQL table */}

                <td className="p-6 font-black text-[#14532d] uppercase">{enq.full_name}</td>

                <td className="p-6 font-bold">{enq.email}</td>

                <td className="p-6 text-slate-500 italic">"{enq.message}"</td>

                <td className="p-6 text-center">

                  <button 
  onClick={async () => {
    if(confirm("Delete this inquiry?")) {
      // 1. Delete from Supabase Database
      const { error } = await supabase
        .from('enquiries')
        .delete()
        .eq('id', enq.id);

      if (error) {
        console.error("Error deleting from database:", error.message);
        alert("Failed to delete from server. Check your Supabase permissions.");
      } else {
        // 2. ONLY if database delete was successful, update the UI state
        setEnquiries(prev => prev.filter(e => e.id !== enq.id));
        alert("Enquiry permanently deleted.");
      }
    }
  }} 
  className="text-red-500 underline text-[10px] uppercase font-black"
>
  Delete
</button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan={4} className="p-10 text-center text-slate-400 uppercase text-[10px] font-black">

                No enquiries found in the database.

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>

)}





          {adminTab === 'Settings' && (

            <div className="max-w-4xl space-y-12 animate-in slide-in-from-bottom-5 font-bold">

              <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm space-y-10">

                <h3 className="text-2xl font-serif font-bold text-[#14532d] border-b pb-6 uppercase tracking-widest">Store Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2"><label className="text-[11px] font-black uppercase text-slate-400">Business Name</label><input type="text" defaultValue="Vortia LP" className="w-full p-4 bg-slate-50 rounded-xl border font-black text-[#14532d]" /></div>

                  <div className="space-y-2"><label className="text-[11px] font-black uppercase text-slate-400">WhatsApp Number</label><input type="text" defaultValue="+91 95940 66615" className="w-full p-4 bg-slate-50 rounded-xl border font-black text-[#14532d]" /></div>

                </div>

                <button className="bg-[#14532d] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase shadow-lg">Save Changes</button>

              </div>

          <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm space-y-10">
  <h3 className="text-2xl font-serif font-bold text-[#14532d] border-b pb-6 uppercase tracking-widest">Security</h3>
  <div className="grid grid-cols-1 gap-6">
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase text-slate-400">Current Password</label>
      <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 rounded-xl border font-black" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase text-slate-400">New Password</label>
        <input type="password" placeholder="New" className="w-full p-4 bg-slate-50 rounded-xl border font-black" />
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase text-slate-400">Confirm New Password</label>
        <input type="password" placeholder="Confirm" className="w-full p-4 bg-slate-50 rounded-xl border font-black" />
      </div>
    </div>
    
    <button className="bg-[#14532d] w-fit text-white px-10 py-4 rounded-full text-[10px] font-black uppercase shadow-lg hover:bg-[#D4AF37] transition-all">
  Update Password
</button>
  </div>
</div>

              <div className="bg-red-50 p-12 rounded-[50px] border border-red-100 text-center space-y-6">

                <h3 className="text-xl font-serif font-bold text-red-900 uppercase">Danger Zone</h3>

                <button 
  className="bg-red-600 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase shadow-lg hover:bg-red-700 transition-all"
>
  Reset All Data
</button>

              </div>

            </div>

          )}
          </main>

        



        

        {/* THE MODAL (Inside the Admin Return) */}

{showAddModal && (

  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">

    <div className="bg-white w-full max-w-2xl rounded-[50px] p-12 shadow-2xl animate-in zoom-in-95 font-black">

      <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-10 uppercase">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>

      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="space-y-2"><label className="text-[10px] uppercase text-slate-400">Name</label><input value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none" /></div>

        <div className="space-y-2"><label className="text-[10px] uppercase text-slate-400">Price</label><input value={formState.price} onChange={(e) => setFormState({...formState, price: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none" /></div>

        <div className="space-y-2"><label className="text-[10px] uppercase text-slate-400">Category</label><select value={formState.cat} onChange={(e) => setFormState({...formState, cat: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none"><option value="Soaps">Soaps</option><option value="Face Wash">Face Wash</option><option value="Hair Care">Hair Care</option></select></div>

        <div className="space-y-2"><label className="text-[10px] uppercase text-slate-400">Stock</label><input type="number" value={formState.stock} onChange={(e) => setFormState({...formState, stock: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none" /></div>

        <div className="col-span-2 space-y-2"><label className="text-[10px] uppercase text-slate-400">Description</label><textarea value={formState.desc} onChange={(e) => setFormState({...formState, desc: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl h-24 outline-none" /></div>

        

        {/* RESTORED: Image Upload Block */}

        <div className="col-span-2 space-y-2">

          <label className="text-[10px] font-black uppercase text-slate-400">Product Image</label>

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">

              {formState.img ? <img src={formState.img} className="w-full h-full object-cover" /> : <span className="text-2xl">🖼️</span>}

            </div>

            <label className="flex-1 border-2 border-dashed border-[#14532d]/20 rounded-3xl p-8 text-center bg-slate-50/50 cursor-pointer font-black uppercase text-[10px] tracking-widest hover:border-[#14532d] transition-all">

              <span className="text-xl block mb-2">📤</span> {formState.img ? "Change Image" : "Upload Image from Device"}

              <input type="file" accept="image/*" className="hidden" onChange={(e) => {

                  const file = e.target.files?.[0];

                  if (file) {

                    const reader = new FileReader();

                    reader.onloadend = () => setFormState({ ...formState, img: reader.result as string });

                    reader.readAsDataURL(file);

                  }

              }} />

            </label>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-4">

        <button onClick={() => setShowAddModal(false)} className="px-8 py-3 text-slate-400 font-black uppercase text-[10px]">Cancel</button>

        <button onClick={handleSaveProduct} className="px-10 py-3 bg-[#14532d] text-white rounded-full font-black uppercase text-[10px] shadow-xl hover:bg-[#D4AF37]">Save Changes</button>

      </div>

    </div>

  </div>

)}
{previewImage && (
  <div 
    className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
    onClick={() => setPreviewImage(null)}
  >
    <img 
      src={previewImage} 
      className="max-w-full max-h-full rounded-xl shadow-2xl border-4 border-white"
      alt="Payment Verification"
    />
    <button className="absolute top-10 right-10 text-white text-4xl font-black">&times;</button>
  </div>
)}

      </div>

    );

  }



  // --- PUBLIC UI ---

  return (

    <div className="min-h-screen bg-[#FCFDFB] text-[#0A2619] selection:bg-[#fbbf24] selection:text-[#14532d]">

      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');` }} />

      <div className="bg-[#14532d] text-[#D4AF37] py-3 px-10 text-[10px] font-black uppercase tracking-[0.4em] flex justify-center items-center relative font-bold">

          <button onClick={() => setActiveTab('home')} className="absolute left-10 text-[#D4AF37] hover:scale-125 transition-transform text-lg font-black">←</button>

          <span>Vortia LP • International Quality Standards</span>

      </div>

      

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-10 py-4 flex justify-between items-center shadow-sm">

        <div className="flex-shrink-0"><img src="/logo.JPEG" alt="Logo" className="h-10 md:h-20 w-auto object-contain cursor-pointer" onClick={() => setActiveTab('home')} /></div>

        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">

          <button onClick={() => setActiveTab('home')}>Home</button>

          <button onClick={() => scrollToSection(aboutRef)}>About</button>

          <button onClick={() => setActiveTab('shop')}>Products</button>

          <button onClick={() => setActiveTab('services')}>Services</button>

          <button onClick={() => scrollToSection(contactRef)}>Contact Us</button>

          <button onClick={() => setIsCartOpen(true)}>Cart ({cart.length})</button>

        </div>

        <div className="flex lg:hidden items-center gap-4">

          <button onClick={() => setIsCartOpen(true)} className="text-[10px] font-black uppercase text-[#14532d]">Cart ({cart.length})</button>

          <a href="https://wa.me/919594066615" target="_blank" className="bg-[#25D366] p-1.5 rounded-full text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>

        </div>

      </nav>



      <main>

        {activeTab === 'home' && (

          <>

            <section className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20 text-left grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-in fade-in duration-1000">

              <div className="space-y-6">

                <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight text-[#14532d]">Botanical <br /><span className="text-[#D4AF37] italic">Excellence</span></h1>

                <p className="text-sm md:text-lg font-semibold text-[#14532d] uppercase tracking-[0.2em] leading-relaxed">Premium Herbal Products Exporter & Global Service Provider</p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button onClick={() => setActiveTab('shop')} className="w-full sm:w-auto bg-[#14532d] text-white px-10 py-5 rounded-2xl shadow-xl font-bold uppercase text-[12px]">Our Products</button>

                    <button onClick={() => scrollToSection(contactRef)} className="w-full sm:w-auto border-2 border-[#14532d] text-[#14532d] px-10 py-5 rounded-2xl shadow-lg font-bold uppercase text-[12px]">Enquiry Now</button>

                </div>

              </div>

              <div className="relative shadow-2xl rounded-[40px] md:rounded-[60px] overflow-hidden"><img 
  src="/homepage.png" 
  alt="Homepage Hero" 
  className="w-full h-auto rounded-[60px] shadow-2xl"
/></div>

            </section>

            

            <section className="max-w-7xl mx-auto px-8 py-20 border-t">

                <h2 className="text-5xl font-serif font-medium text-[#14532d] mb-12 uppercase tracking-widest">Shop by collection</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {categoryTiles.map((cat) => (

                    <div key={cat.name} onClick={() => {setActiveTab('shop'); setFilter(cat.name);}} className="relative group h-[400px] rounded-[30px] overflow-hidden cursor-pointer shadow-lg active:scale-95">

                      <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      <div className="absolute bottom-10 left-10 text-white uppercase"><h3 className="text-2xl font-bold mb-1">{cat.name}</h3><p className="text-xs opacity-80">{cat.desc}</p></div>

                    </div>

                    ))}

                </div>

            </section>



            <section ref={aboutRef} className="bg-white py-16 md:py-32 px-6 md:px-8 text-center font-sans">

  <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-tighter">About Us</h2>

  

  <p className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.3em] mb-12 max-w-4xl mx-auto font-black leading-relaxed">

    Vortia LP is a premium herbal products exporter specializing in natural and handmade herbal products. 

    We focus on quality, purity, and global standards to deliver trusted herbal solutions to international markets.

  </p>



  {/* SCREENSHOT 1: Botanical Excellence Text above Mission/Vision */}

  <p className="text-[#14532d] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-20 max-w-3xl mx-auto font-bold italic">

    While nature provides the raw purity, our mission and vision elevate those standards into world-class botanical excellence.

  </p>



  {/* SCREENSHOT 3: Mission & Vision Cards */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto mb-24 text-left">

      <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] md:rounded-[60px] border border-slate-100 shadow-sm">

        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-widest">Mission</h3>

        <p className="text-slate-500 leading-relaxed text-md md:text-lg italic font-bold">To provide high-quality botanical products and exceed every customer expectation daily.</p>

      </div>

      <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] md:rounded-[60px] border border-slate-100 shadow-sm">

        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-widest">Vision</h3>

        <p className="text-slate-500 leading-relaxed text-md md:text-lg italic font-bold">To become the most trusted leading brand globally through sustainable practices.</p>

      </div>

  </div>



  {/* SCREENSHOT 1 & 2: Why Choose Us & Key Categories */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-7xl mx-auto text-left font-bold">

    <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] md:rounded-[60px] border border-slate-100 shadow-sm">

      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#14532d] mb-8 uppercase tracking-widest">Why Choose Us</h3>

      <ul className="space-y-4 text-slate-500 text-xs md:text-sm tracking-wider uppercase font-black">

        <li><span className="text-[#D4AF37] mr-2">✔</span> Herbal and Natural Ingredient-Based Products</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Handcrafted herbal soaps made with carefully selected natural ingredients</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Export-Quality Packaging & Consistency</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Trusted Manufacturing Partners</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Competitive Global Pricing</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Reliable Bulk Supply for International Buyers</li>

      </ul>

    </div>



    <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] md:rounded-[60px] border border-slate-100 shadow-sm">

      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#14532d] mb-8 uppercase tracking-widest">Key Product Categories</h3>

      <ul className="space-y-4 text-slate-500 text-xs md:text-sm tracking-wider uppercase font-black mb-10">

        <li><span className="text-[#D4AF37] mr-2">✔</span> Handmade Herbal Soaps</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Natural Face Wash & Skincare Products</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Herbal Hair Care Products</li>

        <li><span className="text-[#D4AF37] mr-2">✔</span> Botanical Wellness Products</li>

      </ul>

      <div className="border-t pt-6">

        <h4 className="text-[10px] font-black text-[#14532d] mb-2 uppercase">Pricing & Supply</h4>

        <p className="text-[11px] text-slate-400 leading-relaxed uppercase">We offer competitive bulk export prices based on quantity, packaging, and destination country.</p>

      </div>

    </div>

  </div>



  {/* SCREENSHOT 2: Footer text of About Section */}

  <div className="mt-24 text-[#14532d] italic font-serif text-lg md:text-xl tracking-widest opacity-80">

    <p>NATURE-INSPIRED PRODUCTS. GLOBAL QUALITY STANDARDS.</p>

    <p className="text-xs md:text-sm mt-2 font-black tracking-[0.2em] uppercase">Trusted herbal export partner.</p>

  </div>

</section>



            <section ref={contactRef} className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-20 items-start border-t border-slate-100 font-sans text-left font-black uppercase">

              <div className="space-y-10 font-bold">

                <h2 className="text-5xl font-serif font-light text-[#14532d] uppercase tracking-tighter leading-tight font-black">Get in touch <br /> with us</h2>

                <div className="space-y-6 pt-4 text-sm tracking-widest font-bold">

                  <p>📞 Phone: +91 95940 66615</p>

                  <p>✉️ Email: info@vortialp.com</p>

                  <p>📍 Address: Mulekhand, Uran, Navi Mumbai, MH 400702</p>

                </div>

              </div>

              <div className="bg-[#FAF9F6] p-12 rounded-[60px] shadow-sm uppercase text-[10px]">

                <form 

  className="grid grid-cols-1 gap-6" 

  onSubmit={async (e) => {

    e.preventDefault();

    

    // THE FIX: Capture the form reference immediately

    const form = e.currentTarget; 

    const formData = new FormData(form);

    

    const { error } = await supabase.from('enquiries').insert([{

      full_name: formData.get('fullName'),

      email: formData.get('email'),

      message: formData.get('message')

    }]);



    if (!error) {

      alert('Thank you! Your enquiry has been saved.');

      form.reset(); // Uses the fixed reference

    } else {

      alert('Error saving enquiry. Please try again.');

    }

  }}

>

  {/* I have kept the classNames simple so they use your project's default fonts */}

  <input 

    name="fullName" 

    placeholder="Full Name" 

    className="w-full p-5 bg-white rounded-2xl border border-slate-100 outline-none focus:border-[#D4AF37] font-bold" 

    required 

  />

  <input 

    name="email" 

    type="email"

    placeholder="Email" 

    className="w-full p-5 bg-white rounded-2xl border border-slate-100 outline-none focus:border-[#D4AF37] font-bold" 

    required 

  />

  <textarea 

    name="message" 

    placeholder="Message" 

    className="w-full p-5 bg-white rounded-2xl border border-slate-100 h-32 outline-none focus:border-[#D4AF37] font-bold" 

    required 

  />

  

  <button 

    type="submit" 

    className="w-full py-5 rounded-full bg-[#14532d] text-white uppercase text-xs font-black shadow-lg hover:bg-[#D4AF37] transition-all"

  >

    Send Message

  </button>

</form>

              </div>

            </section>

          </>

        )}



        {activeTab === 'services' && (

          <section className="pt-10 pb-32 font-bold">

              <div className="max-w-7xl mx-auto px-8">

                  <div className="bg-[#0A2619] rounded-[80px] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center min-h-[500px]">

                      <div className="p-20 flex-1 text-left">

                          <span className="text-[#D4AF37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Professional Solutions</span>

                          <h1 className="text-6xl font-serif font-bold text-white mb-6 leading-tight">Professional Data <br /> Entry Services</h1>

                          <p className="text-[#D4AF37] text-lg font-black uppercase tracking-widest mb-10">Accurate • Secure • On Time</p>

                          <p className="text-white/60 text-lg font-medium leading-relaxed italic mb-8">"We provide reliable and affordable data entry solutions for businesses worldwide."</p>

                          <button onClick={() => scrollToSection(contactRef)} className="bg-[#D4AF37] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest">Connect Now</button>

                      </div>

                      <div className="flex-1 h-full w-full p-10 flex justify-center items-center">

                         <div className="relative h-[400px] w-full rounded-[60px] overflow-hidden shadow-2xl border-4 border-white/10"><img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6" alt="Data Services" className="w-full h-full object-cover" /></div>

                      </div>

                  </div>

              </div>



              {/* ABOUT SERVICES & WHY CHOOSE US GRID */}

              <div className="max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-2 gap-24 text-left">

                  <div className="space-y-12">

                      <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase tracking-tighter mb-4 font-black">*About our services*</h2>

                      <p className="text-slate-500 text-lg leading-relaxed italic font-medium">We are a professional service provider offering high-quality data entry and management solutions.</p>

                  </div>

                  <div className="bg-[#FAF9F6] p-16 rounded-[80px] shadow-sm font-black">

                    <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-10 border-b pb-6 uppercase tracking-widest font-black">*Why Choose Us?*</h3>

                    <div className="space-y-6 text-[#14532d] font-bold text-lg font-sans">

                      {["100% Accurate Data", "Fast Delivery", "Affordable pricing", "Confidential & Secure", "Worldwide Support", "Professional Communication"].map(i => (<div key={i} className="flex items-center gap-4"><span className="text-[#D4AF37] text-2xl">✔</span><span>{i}</span></div>))}

                    </div>

                  </div>

              </div>



              {/* SERVICE INCLUDE GRID */}

              <div className="max-w-7xl mx-auto px-8">

                  <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-16 text-center uppercase tracking-widest underline decoration-[#D4AF37] underline-offset-8">Our Data Entry Services Include:</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {serviceItems.map(item => (

                      <div key={item} className="p-8 bg-white rounded-[40px] shadow-lg border-t-8 border-[#14532d] hover:scale-105 transition-transform flex items-center justify-center text-center font-black text-[11px] uppercase text-[#14532d] tracking-widest">

                        {item}

                      </div>

                    ))}

                  </div>

              </div>

          </section>

        )}



        {activeTab === 'shop' && (

            <section className="py-20 px-8 max-w-7xl mx-auto text-center font-bold">

                <span className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Vortia Standards</span>

                <h2 className="text-6xl font-serif font-bold text-[#14532d] mb-12 uppercase tracking-tighter">Herbal Standard Products</h2>

                <div className="max-w-xl mx-auto mb-10"><input type="text" placeholder="Search herbal products..." className="w-full p-6 bg-white border border-slate-200 rounded-[24px] text-sm outline-none shadow-sm focus:border-[#D4AF37] text-center font-bold" onChange={(e) => setSearchQuery(e.target.value)} /></div>

                <div className="flex flex-wrap justify-center gap-4 mb-20 uppercase font-black text-[10px]">

                    {['All', 'Soaps', 'Face Wash', 'Hair Care'].map((btn) => (<button key={btn} onClick={() => setFilter(btn)} className={`px-8 py-3 rounded-full transition-all ${filter === btn ? 'bg-[#14532d] text-white' : 'bg-white border text-slate-500'}`}>{btn}</button>))}

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 font-black">

                  {filteredProducts.map((p) => (

                    <div key={p.id} onClick={() => setSelectedProduct(p)} className="group bg-white p-5 md:p-7 rounded-[32px] md:rounded-[48px] border border-slate-50 hover:shadow-2xl transition-all cursor-pointer">

                      <img src={p.img} alt={p.name} className="w-full h-[200px] md:h-[300px] object-cover rounded-[24px] md:rounded-[36px] mb-6" />

                      <h3 className="text-xl md:text-2xl font-bold text-[#14532d] mb-4">{p.name}</h3>

                      <p className="font-serif font-bold text-[#D4AF37] text-xl md:text-2xl mb-8">₹{p.price}</p>

                      <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="w-full py-4 md:py-5 rounded-2xl bg-[#14532d] text-white font-black uppercase text-[10px]">Add to Cart</button>

                    </div>

                  ))}

                </div>

            </section>

        )}

      </main>



      <footer className="bg-[#14532d] text-white py-16 px-6 md:px-10 font-sans border-t border-white/10">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-left">

          <div className="space-y-6">

            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter bg-transparent m-0 p-0">Vortia LP</h2>

            <p className="text-slate-300 text-[10px] leading-relaxed uppercase font-black tracking-[0.2em]">Premium Herbal Products Exporter. Global Standards. Nature's Purity.</p>

          </div>

          <div className="space-y-4">

            <h4 className="font-serif text-[#D4AF37] text-lg uppercase tracking-widest">Explore</h4>

            <ul className="text-[10px] space-y-3 uppercase font-black tracking-widest text-slate-400">

              <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('home')}>Home</li>

              <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection(aboutRef)}>About Us</li>

              <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('shop')}>Our Products</li>

            </ul>

          </div>

         <div className="space-y-6">
  <h4 className="font-serif text-[#D4AF37] text-lg uppercase tracking-widest">Follow Us</h4>
  <div className="flex gap-5">
    {/* Facebook */}
    <a href="https://www.facebook.com/share/14UixUnQDkw/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>

    {/* Instagram */}
    <a href="https://www.instagram.com/vortialp?igsh=eHQ1YnFrcDF5YWNs" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.267-.07-1.646-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </a>

    {/* LinkedIn */}
    <a href="https://www.linkedin.com/company/111736971/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </a>

    {/* WhatsApp */}
    <a href="https://wa.me/919594066615" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#25D366] transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>
  </div>
</div>

          <div className="space-y-4">

            <h4 className="font-serif text-[#D4AF37] text-lg uppercase tracking-widest">Legal</h4>

            <ul className="text-[10px] space-y-3 uppercase font-black tracking-widest text-slate-400">

              <li className="cursor-pointer hover:text-white">Privacy Policy</li>

              <li className="cursor-pointer hover:text-white">Terms of Service</li>

              <li className="cursor-pointer text-slate-500 hover:text-[#D4AF37]" onClick={() => setIsLoginOpen(true)}>Admin</li>

            </ul>

          </div>

          <div className="space-y-4">

            <h4 className="font-serif text-[#D4AF37] text-lg uppercase tracking-widest">Contact</h4>

            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-relaxed">Mulekhand, Uran, Navi Mumbai, MH 400702<br />+91 95940 66615</p>

          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center">

          <p className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black">© 2026 Vortia LP. All Rights Reserved.</p>

        </div>

      </footer>



      {/* MODALS */}

      {isEnquiryOpen && (

        <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">

          <div className="bg-white w-full max-w-lg rounded-[60px] p-12 shadow-2xl relative text-left font-black">

            <button onClick={() => setIsEnquiryOpen(false)} className="absolute top-10 right-10 text-slate-300 text-3xl">×</button>

            <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-8 uppercase tracking-tighter">Enquiry Form</h3>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Sent!'); setIsEnquiryOpen(false); }}>

              <input placeholder="Full Name" className="w-full p-5 bg-slate-50 rounded-3xl outline-none border border-slate-100 font-bold" required />

              <textarea placeholder="Message..." className="w-full p-5 bg-slate-50 rounded-3xl border border-slate-100 h-32 outline-none font-bold" required />

              <button type="submit" className="w-full py-5 rounded-full bg-[#14532d] text-white font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-[#D4AF37]">Submit Enquiry</button>

            </form>

          </div>

        </div>

      )}



      {selectedProduct && (

        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">

          <div className="bg-white w-full max-w-4xl rounded-[60px] overflow-hidden flex flex-col md:flex-row relative shadow-2xl font-black">

            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-4xl hover:text-red-500 z-10">×</button>

            <div className="md:w-1/2 bg-slate-50 flex items-center justify-center"><img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" /></div>

            <div className="md:w-1/2 p-16 flex flex-col justify-center space-y-8 text-left font-bold">

              <span className="text-[#D4AF37] font-black uppercase tracking-widest text-[10px]">{selectedProduct.cat}</span>

              <h2 className="text-5xl font-serif font-bold text-[#14532d] leading-tight uppercase tracking-tighter">{selectedProduct.name}</h2>

              <p className="text-slate-500 leading-relaxed text-lg font-medium italic">"{selectedProduct.desc}"</p>

              <p className="text-4xl font-serif font-bold text-[#14532d]">₹{selectedProduct.price}</p>

              <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="bg-[#14532d] text-white py-5 px-12 rounded-full font-black uppercase text-xs shadow-xl tracking-widest">Add To Cart</button>

            </div>

          </div>

        </div>

      )}



      {isLoginOpen && (

        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#0A2619]/95 backdrop-blur-2xl">

          <div className="bg-white/95 w-full max-w-sm rounded-[60px] p-16 shadow-2xl relative border border-white/20">

            <button onClick={() => setIsLoginOpen(false)} className="absolute top-10 right-10 text-slate-300 text-3xl font-black">×</button>

            <div className="mb-12 text-center"><img src="/logo.JPEG" className="h-12 w-auto mx-auto mb-6 opacity-80" /><h2 className="text-3xl font-serif font-bold text-[#14532d] uppercase tracking-widest">Login</h2></div>

            <form className="space-y-6" onSubmit={handleLogin}>
  <input 
    placeholder="Username" 
    className="w-full p-5 bg-slate-100 rounded-3xl outline-none text-sm font-bold uppercase" 
    required 
    value={loginData.username} // Keeps the login logic
    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
  />

  <input 
    type="password" 
    placeholder="Password" 
    className="w-full p-5 bg-slate-100 rounded-3xl outline-none text-sm font-bold uppercase" 
    required 
    value={loginData.password} // Keeps the login logic
    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
  />

  <button 
    type="submit" 
    className="w-full py-5 rounded-full bg-[#14532d] text-white font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-[#D4AF37] transition-all"
  >
    Login
  </button>
</form>

          </div>

        </div>

      )}



      {isCartOpen && (

        <div className="fixed inset-0 z-[300] flex justify-end font-black">

          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />

          <div className="relative w-[90%] md:w-full md:max-w-md bg-white h-full shadow-2xl p-6 md:p-12 flex flex-col overflow-y-auto text-left">

            <div className="flex justify-between items-center mb-8 md:mb-12 font-serif font-bold text-3xl md:text-4xl text-[#14532d]">

              <h2>Cart</h2>

              <button onClick={() => setIsCartOpen(false)} className="text-4xl font-light hover:text-red-500">×</button>

            </div>

            <div className="space-y-6 md:space-y-10 mb-10">

              {cart.length === 0 ? (

                <div className="text-center py-10"><p className="text-slate-400 uppercase text-[10px] tracking-widest mb-4">Your cart is empty</p></div>

              ) : (

                cart.map((item) => (

                  <div key={item.id} className="flex gap-4 md:gap-6 border-b border-slate-100 pb-6 md:pb-8 items-center">

                    <img src={item.img} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl object-cover shadow-sm" />

                    <div className="flex-1 space-y-1 md:space-y-2">

                      <p className="font-bold text-md md:text-lg text-[#14532d]">{item.name}</p>

                      <p className="text-[#D4AF37] font-bold text-sm">₹{item.price} x {item.qty}</p>

                      <div className="flex items-center gap-3 md:gap-4 pt-2">

                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">-</button>

                        <span className="text-sm">{item.qty}</span>

                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">+</button>

                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500 text-[10px] uppercase underline">Remove</button>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

            <div className="mt-4 pt-6 md:pt-8 border-t border-slate-100 space-y-4">

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#14532d] mb-2 font-bold">Shipping Details</p>

              <input type="text" placeholder="Full Name" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} className="w-full p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 outline-none text-sm font-bold" />

              <input type="text" placeholder="Phone Number" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} className="w-full p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 outline-none text-sm font-bold" />

              <textarea placeholder="Delivery Address" value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} className="w-full p-4 md:p-5 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 outline-none text-sm font-bold h-24 md:h-28" />

                <div className="mt-4 space-y-2">
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#14532d] font-bold">Payment Proof (Screenshot)</p>
  <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-[#14532d] transition-all bg-slate-50">
    <span className="text-[10px] uppercase font-black text-slate-400">
      {customerInfo.screenshot ? "✅ Image Selected" : "📸 Upload GPay Screenshot"}
    </span>
    <input 
      type="file" 
      accept="image/*" 
      className="hidden" 
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setCustomerInfo({ ...customerInfo, screenshot: reader.result as string });
          reader.readAsDataURL(file);
        }
      }} 
    />
  </label>
</div>

            </div>

          {/* --- TOTAL AND CHECKOUT BUTTONS --- */}
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-6 pb-10">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase text-[10px] font-bold">Total</span>
                <span className="text-3xl md:text-5xl font-serif text-[#14532d]">₹{totalPrice}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. WHATSAPP ORDER BUTTON */}
                <button 
  onClick={async () => {
    // 1. Validation: Ensure details and screenshot are present
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please enter shipping details first!");
      return;
    }
    if (!customerInfo.screenshot) {
      alert("Please upload your payment screenshot first!");
      return;
    }

    // 2. Save to Supabase (Database Record)
    const orderItems = cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.qty
    }));

    const { error: dbError } = await supabase.from('orders').insert([{
  customer_name: customerInfo.name,
  phone: customerInfo.phone,
  address: customerInfo.address,
  items: cart,
  total_amount: totalPrice,
  payment_method: 'WhatsApp',
  payment_status: 'Placed',
  screenshot_url: customerInfo.screenshot 
}]);

if (dbError) {
  // THIS ALERT IS THE MOST IMPORTANT PART
  alert("DATABASE ERROR: " + dbError.message); 
  console.error(dbError);
  return; // Stop here so WhatsApp doesn't open if the save fails
}

    // 3. Generate WhatsApp Message
    const itemDetails = cart
      .map((item) => `• ${item.name} (x${item.qty}) - ₹${item.price * item.qty}`)
      .join('\n');

    const whatsappMessage = 
`*NEW ORDER: VORTIA LP* 🌿
--------------------------
*Customer:* ${customerInfo.name}
*Phone:* ${customerInfo.phone}
*Address:* ${customerInfo.address}

*Items Ordered:*
${itemDetails}

*Total Amount:* ₹${totalPrice}
--------------------------
✅ _I have uploaded the payment screenshot on the website._
_Please confirm my order._`;

    // 4. Redirect to WhatsApp
    window.open(`https://wa.me/919594066615?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    // 5. Cleanup
    setCart([]);
    setIsCartOpen(false);
    setCustomerInfo({ name: '', phone: '', address: '', screenshot: '' });
  }} 
  className="w-full py-5 rounded-2xl bg-[#25D366] text-white font-black uppercase text-[12px] shadow-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
  Order via WhatsApp
</button>

                {/* 2. GPAY / QR BUTTON */}
             <button 
  onClick={() => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert("Please enter shipping details first!");
      return;
    }
    setIsQrOpen(true); 
  }}
  className="w-full py-5 rounded-2xl bg-[#14532d] text-white font-black uppercase text-[10px] shadow-xl flex items-center justify-center hover:bg-[#D4AF37] transition-all"
>
  Pay via GPay / UPI
</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- QR PAYMENT MODAL --- */}
      {isQrOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[50px] p-10 shadow-2xl relative text-center font-black">
            <button onClick={() => setIsQrOpen(false)} className="absolute top-8 right-8 text-slate-300 text-3xl hover:text-red-500">×</button>
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-2 block">Scan to Pay</span>
            <h3 className="text-2xl font-serif font-bold text-[#14532d] mb-6 uppercase">₹{totalPrice}</h3>
            
            <div className="bg-slate-50 p-6 rounded-[40px] border-2 border-dashed border-slate-200 mb-8">
              <img src="/company-qr.JPEG" alt="Company QR" className="w-full h-auto rounded-2xl shadow-sm" />
            </div>

            <div className="space-y-4">
              <button 
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      const response = await fetch('/company-qr.JPEG');
                      const blob = await response.blob();
                      const file = new File([blob], 'payment-qr.jpg', { type: 'image/jpeg' });
                      await navigator.share({ files: [file], title: 'Payment QR', text: `Pay ₹${totalPrice} for Vortia LP` });
                    } catch (e) { console.error(e); }
                  } else { alert("Please take a screenshot!"); }
                }}
                className="w-full py-4 bg-[#14532d] text-white rounded-full uppercase text-[10px] font-black"
              >
                Share QR Code
              </button>
              <button onClick={() => setIsQrOpen(false)} className="w-full py-4 bg-slate-100 text-slate-500 rounded-full uppercase text-[10px] font-black">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}