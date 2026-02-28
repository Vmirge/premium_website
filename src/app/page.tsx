"use client";

import React, { useState, useRef } from 'react';

import { supabase } from '@/lib/supabaseClient';

import { Fredoka } from 'next/font/google';

// Fredoka is much rounder and 'bubbly' than Comfortaa
const googeeStyle = Fredoka({ 
  subsets: ['latin'], 
  weight: '700', // Using 700 (Bold) makes it look even rounder
});



// --- INTERFACE FOR DATA TYPES ---

interface Product {
  id: number;
  name: string;
  price: string | number; // This allows BOTH "Best Price" and 299
  cat: string;
  img: string;
  desc: string;
  ingredients?: string;
  origin?: string;
  size?: string;
  medicated?: string;
  fragrance?: string;
  shelfLife?: string;
  features?: string;
  moq?: string;
  services?: string;
stock?: number;  // <--- ADD THIS LINE
  badge?: string;  // <--- ADD THIS LINE
  // ADD THESE FOUR LINES TO FIX THE RED ERRORS:
  brand?: string;
  ageGroup?: string;
  colour?: string;
}



export default function VortiaLP() {

  // --- CORE STATE ---

  const [activeTab, setActiveTab] = useState('home'); 

  const [adminTab, setAdminTab] = useState('Products');

  const [filter, setFilter] = useState('All');

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

  const [formState, setFormState] = useState({ 
  name: '', price: '', cat: 'Soaps', stock: '10', badge: '', desc: '', img: '',
  ingredients: '', origin: '', size: '', medicated: 'No', fragrance: '', 
  shelfLife: '', brand: 'Vortia LP (customizable)', features: '', 
  ageGroup: 'Adults', colour: 'Natural', moq: '', services: '' 
});




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
{ 
  id: 4, 
  name: "Handmade Haldichandan Soap", 
  price: "Best Price", 
  cat: "Soaps", 
  img: "/haldi chandan soap.jpeg", 
  desc: "Traditional glow-enhancing turmeric and sandalwood.",
  ingredients: "Turmeric, Chandan, Vegetable Oils",
  origin: "Maharashtra, India",
  size: "80 gm (customizable)",
  medicated: "No", // <--- Added
  fragrance: "Natural Herbal",
  shelfLife: "12 Months",
  brand: "Vortia LP (customizable)", // <--- Added
  features: "Gentle Deep Cleansing | Moisturizing & Nourishing",
  ageGroup: "Adults", // <--- Added
  colour: "Natural", // <--- Added
  moq: "1000",
  services: "Private Label | Customized Packaging | Bulk Supply"
}, // <--- The essential comma
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



  

  const handleSaveProduct = () => {
  
    const finalPrice = formState.price || "Best Price";
    

    if (editingProduct) {
      setHerbalProducts(herbalProducts.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              ...formState, 
              price: finalPrice, 
              stock: Number(formState.stock) // Convert string to Number
            } 
          : p
      ));
    } else {
      const id = herbalProducts.length > 0 ? Math.max(...herbalProducts.map(p => p.id)) : 0;
      setHerbalProducts([
        ...herbalProducts, 
        { 
          ...formState, 
          id: id + 1, 
          price: finalPrice, 
          stock: Number(formState.stock), // Convert string to Number
          img: formState.img || "/placeholder.jpg" 
        } as Product
      ]);
    }
    setShowAddModal(false);
  }
 
  // Checking the state we just created
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "ADMIN" && loginData.password === "ADMIN@123") {
      setIsAdminDashboard(true);
      setIsLoginOpen(false);
      setLoginData({ username: '', password: '' });
    } else {
      alert("Invalid Username or Password!");
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => { setActiveTab('home'); setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth' }), 100); }

  const filteredProducts = herbalProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && (filter === 'All' || p.cat === filter));


  // ... your state variables (cart, customerInfo, etc.)



// --- HANDLERS ---


  // --- ADMIN VIEW ---
// --- ADMIN VIEW ---
  if (isAdminDashboard) {
    return (
      <div className="flex h-screen bg-[#FDFDFB] font-sans text-[#0A2619]">
        <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');` }} />
        
        <aside className="w-72 bg-[#14532d] text-white flex flex-col shadow-2xl">
          <div className="p-10 flex flex-col items-center border-b border-white/10 text-center font-bold">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-[#D4AF37]">
              <img src="/logo.JPEG" alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <p className="text-xl text-[#D4AF37]" style={googeeFont}>Vortia LP</p>
          </div>

          <nav className="flex-1 p-6 space-y-3 mt-4 text-[11px] font-black uppercase tracking-widest text-white/40">
            <button onClick={() => setAdminTab('Products')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Products' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Products</button>
            <button onClick={() => setAdminTab('Settings')} className={`w-full text-left p-4 rounded-xl ${adminTab === 'Settings' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Settings</button>
            <button onClick={() => setAdminTab('Enquiries')} className={`w-full text-left p-4 rounded-xl transition-all ${adminTab === 'Enquiries' ? 'bg-white/10 text-white border-l-4 border-[#D4AF37]' : ''}`}>Enquiries</button>
          </nav>

          <div className="p-8 border-t border-white/10 space-y-2">
            <button onClick={() => setIsAdminDashboard(false)} className="w-full text-left p-3 text-[#D4AF37] uppercase text-[10px] font-black">← View Store</button>
            <button onClick={() => {setIsAdminDashboard(false); setIsLoginOpen(false);}} className="w-full text-left p-3 text-red-400 uppercase text-[10px] font-black">Logout</button>
          </div>
        </aside>

        <main className="flex-1 p-16 overflow-y-auto bg-slate-50/50">
          <h1 className="text-2xl font-bold mb-6">{adminTab} Dashboard</h1>
          
          {/* --- PRODUCTS TAB --- */}
          {adminTab === 'Products' && (
  <div className="space-y-8 animate-in fade-in font-bold">
    <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase">Inventory</h2>
    <div className="flex justify-between items-center">
      <p className="text-slate-400 uppercase text-[10px] tracking-widest">{herbalProducts.length} Items Listed</p>
      <button 
        onClick={() => { 
          setEditingProduct(null); 
          setFormState({ 
            name: '', price: '', cat: 'Soaps', stock: '10', badge: '', desc: '', img: '',
            ingredients: '', origin: '', size: '', medicated: 'No', fragrance: '',
            shelfLife: '', brand: 'Vortia LP (customizable)', features: '',
            ageGroup: 'Adults', colour: 'Natural', moq: '', services: ''
          }); 
          setShowAddModal(true); 
        }} 
        className="bg-[#14532d] text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] shadow-lg"
      >
        + Add Product
      </button>
    </div>

    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left font-black">
        <thead className="bg-[#FAF9F6] text-[10px] uppercase text-slate-400 border-b">
          <tr>
            <th className="p-6">Image</th>
            <th className="p-6">Name</th>
            <th className="p-6">Category</th>
            <th className="p-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {herbalProducts.map((p) => (
            <tr key={p.id} className="border-b hover:bg-slate-50">
              <td className="p-6"><img src={p.img} className="w-16 h-16 rounded-2xl object-cover" alt={p.name} /></td>
              <td className="p-6 text-[#14532d] font-bold">{p.name}</td>
              <td className="p-6 uppercase text-[10px] text-slate-400 font-black">{p.cat}</td>
              <td className="p-6 text-center">
                <button 
                  onClick={() => { 
                    setEditingProduct(p); 
                    // FIXED: This now pulls EVERY attribute into the form for editing
                    setFormState({ 
                      name: p.name,
                      price: p.price.toString(), 
                      cat: p.cat,
                      stock: (p.stock ?? 10).toString(),
                      badge: p.badge || "", 
                      desc: p.desc,
                      img: p.img,
                      ingredients: p.ingredients || "",
                      origin: p.origin || "",
                      size: p.size || "",
                      medicated: p.medicated || "No",
                      fragrance: p.fragrance || "",
                      shelfLife: p.shelfLife || "",
                      brand: p.brand || "Vortia LP (customizable)",
                      features: p.features || "",
                      ageGroup: p.ageGroup || "Adults",
                      colour: p.colour || "Natural",
                      moq: p.moq || "",
                      services: p.services || ""
                    }); 
                    setShowAddModal(true); 
                  }} 
                  className="mr-4 underline text-[#14532d] font-black uppercase text-[10px]"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

          {/* --- ENQUIRIES TAB --- */}
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
                          <td className="p-6 font-black text-[#14532d] uppercase">{enq.full_name}</td>
                          <td className="p-6 font-bold">{enq.email}</td>
                          <td className="p-6 text-slate-500 italic">"{enq.message}"</td>
                          <td className="p-6 text-center">
                            <button 
                              onClick={async () => {
                                if(confirm("Delete this inquiry?")) {
                                  await supabase.from('enquiries').delete().eq('id', enq.id);
                                  setEnquiries(prev => prev.filter(e => e.id !== enq.id));
                                  alert("Enquiry deleted.");
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
                      <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-black">No enquiries found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- SETTINGS TAB --- */}
          {adminTab === 'Settings' && (
            <div className="max-w-4xl space-y-12 font-bold">
              <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm space-y-10">
                <h3 className="text-2xl font-serif font-bold text-[#14532d] border-b pb-6 uppercase tracking-widest">Store Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2"><label className="text-[11px] font-black uppercase text-slate-400">Business Name</label><input type="text" defaultValue="Vortia LP" className="w-full p-4 bg-slate-50 rounded-xl border font-black text-[#14532d]" /></div>
                  <div className="space-y-2"><label className="text-[11px] font-black uppercase text-slate-400">WhatsApp Number</label><input type="text" defaultValue="+91 95940 66615" className="w-full p-4 bg-slate-50 rounded-xl border font-black text-[#14532d]" /></div>
                </div>
                <button className="bg-[#14532d] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase shadow-lg">Save Changes</button>
              </div>
            </div>
          )}

          {/* --- ADD PRODUCT MODAL --- */}
         {showAddModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
    <div className="bg-white w-full max-w-5xl rounded-[50px] p-10 shadow-2xl font-black overflow-y-auto max-h-[95vh]">
      <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-8 uppercase">
        {editingProduct ? 'Edit Product Details' : 'Add New Product'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 text-left">
        {/* Basic Fields */}
        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Name</label>
          <input value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>
        
        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Category</label>
          <select value={formState.cat} onChange={(e) => setFormState({...formState, cat: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm">
            <option value="Soaps">Soaps</option><option value="Face Wash">Face Wash</option><option value="Hair Care">Hair Care</option>
          </select></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Price/MOQ Price</label>
          <input value={formState.price} onChange={(e) => setFormState({...formState, price: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" placeholder="e.g. 299 or Best Price" /></div>

        {/* Detailed Attributes */}
        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Ingredients</label>
          <input value={formState.ingredients} onChange={(e) => setFormState({...formState, ingredients: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>
        
        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Origin</label>
          <input value={formState.origin} onChange={(e) => setFormState({...formState, origin: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Size/Weight</label>
          <input value={formState.size} onChange={(e) => setFormState({...formState, size: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Medicated</label>
          <input value={formState.medicated} onChange={(e) => setFormState({...formState, medicated: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Fragrance</label>
          <input value={formState.fragrance} onChange={(e) => setFormState({...formState, fragrance: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Shelf Life</label>
          <input value={formState.shelfLife} onChange={(e) => setFormState({...formState, shelfLife: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Brand</label>
          <input value={formState.brand} onChange={(e) => setFormState({...formState, brand: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Age Group</label>
          <input value={formState.ageGroup} onChange={(e) => setFormState({...formState, ageGroup: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Colour</label>
          <input value={formState.colour} onChange={(e) => setFormState({...formState, colour: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">MOQ</label>
          <input value={formState.moq} onChange={(e) => setFormState({...formState, moq: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1 md:col-span-2"><label className="text-[9px] uppercase text-slate-400 ml-2">Features</label>
          <input value={formState.features} onChange={(e) => setFormState({...formState, features: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="space-y-1 md:col-span-3"><label className="text-[9px] uppercase text-slate-400 ml-2">Services (Private Label etc.)</label>
          <input value={formState.services} onChange={(e) => setFormState({...formState, services: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm" /></div>

        <div className="col-span-3 space-y-1"><label className="text-[9px] uppercase text-slate-400 ml-2">Description</label>
          <textarea value={formState.desc} onChange={(e) => setFormState({...formState, desc: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border outline-none text-sm h-20" /></div>

        {/* Image Upload Area */}
        <div className="col-span-3">
          <label className="text-[9px] uppercase text-slate-400 ml-2">Product Image</label>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-20 h-20 bg-slate-100 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden">
              {formState.img ? <img src={formState.img} className="w-full h-full object-cover" /> : "🖼️"}
            </div>
            <label className="flex-1 border-2 border-dashed border-[#14532d]/20 rounded-xl p-6 text-center cursor-pointer uppercase text-[10px]">
              Upload Image <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setFormState({...formState, img: reader.result as string});
                  reader.readAsDataURL(file);
                }
              }} />
            </label>
          </div>
        </div>
      </div>
                <div className="flex justify-end gap-4 border-t pt-6">
        <button onClick={() => setShowAddModal(false)} className="px-6 text-slate-400 uppercase text-[10px]">Cancel</button>
        <button onClick={handleSaveProduct} className="px-10 py-3 bg-[#14532d] text-white rounded-full font-black uppercase text-[10px] shadow-lg">Save Product</button>
      </div>
    </div>
  </div>
)}
        </main>
      </div>
    );
  } // <--- THIS BRACKET IS CRITICAL: It closes the Admin check completely.




// --- PUBLIC UI ---
  return (
    <div className="min-h-screen bg-[#FCFDFB] text-[#0A2619] selection:bg-[#fbbf24] selection:text-[#14532d]">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');` }} />
      
      <div className="bg-[#14532d] text-[#D4AF37] py-3 px-10 text-[10px] font-black uppercase tracking-[0.4em] flex justify-center items-center relative font-bold">
          <button onClick={() => setActiveTab('home')} className="absolute left-10 text-[#D4AF37] hover:scale-125 transition-transform text-lg font-black">←</button>
          <span>Vortia LP • International Quality Standards</span>
      </div>

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 md:px-10 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img src="/logo.JPEG" alt="Logo" className="h-10 md:h-16 w-auto object-contain" />
          <span className={`${googeeStyle.className} text-[#D4AF37] text-xl md:text-2xl hidden sm:block`}>
            Vortia LP
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <button onClick={() => setActiveTab('home')} className="hover:text-[#14532d] transition-colors">Home</button>
          <button onClick={() => scrollToSection(aboutRef)} className="hover:text-[#14532d] transition-colors">About</button>
          <button onClick={() => setActiveTab('shop')} className="hover:text-[#14532d] transition-colors">Products</button>
          <button onClick={() => setActiveTab('services')} className="hover:text-[#14532d] transition-colors">Services</button>
          <button onClick={() => { setActiveTab('home'); setTimeout(() => contactRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#14532d] transition-colors">Contact Us</button>
        </div>

        <div className="flex lg:hidden items-center">
          <a href="https://wa.me/919594066615" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] p-2 rounded-full text-white shadow-md">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>
        </div>
      </nav>

      {/* --- HOME TAB CONTENT --- */}
      {activeTab === 'home' && (
        <>
          <section className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20 text-left grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-[#14532d]">Botanical <br /><span className="text-[#D4AF37] italic">Excellence</span></h1>
              <p className="text-sm md:text-lg font-semibold text-[#14532d] uppercase tracking-[0.2em]">Premium Herbal Products Exporter</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button onClick={() => setActiveTab('shop')} className="bg-[#14532d] text-white px-10 py-5 rounded-2xl shadow-xl font-bold uppercase text-[12px] hover:bg-[#D4AF37] transition-all">Our Products</button>
                <button onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-[#14532d] text-[#14532d] px-10 py-5 rounded-2xl shadow-lg font-bold uppercase text-[12px] hover:bg-[#14532d] hover:text-white transition-all">Enquiry Now</button>
              </div>
            </div>
            <div className="relative shadow-2xl rounded-[60px] overflow-hidden"><img src="/homepage.png" alt="Hero" className="w-full h-auto" /></div>
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

         {/* RESTORED: ABOUT US, MISSION & VISION */}
          <section ref={aboutRef} className="bg-white py-16 md:py-32 border-t border-slate-100 font-sans">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="text-center mb-16 md:mb-24">
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-tighter">About Us</h2>
                <p className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.3em] max-w-4xl mx-auto font-black leading-relaxed">
                  Vortia LP is a premium herbal products exporter specializing in natural and handmade herbal products. 
                  We focus on quality, purity, and global standards to deliver trusted herbal solutions to international markets.
                </p>
                <p className="text-[#14532d] text-[10px] md:text-xs uppercase tracking-[0.3em] mt-12 font-bold italic opacity-80">
                  While nature provides the raw purity, our mission and vision elevate those standards into world-class botanical excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto mb-20">
                <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-widest">Mission</h3>
                  <p className="text-slate-500 leading-relaxed text-md md:text-lg italic font-bold">To provide high-quality botanical products and exceed every customer expectation daily.</p>
                </div>
                <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#14532d] mb-6 uppercase tracking-widest">Vision</h3>
                  <p className="text-slate-500 leading-relaxed text-md md:text-lg italic font-bold">To become the most trusted leading brand globally through sustainable practices.</p>
                </div>
              </div>

              {/* RESTORED: WHY CHOOSE US & KEY CATEGORIES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-7xl mx-auto">
                <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] border border-slate-100 shadow-sm">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#14532d] mb-8 uppercase tracking-widest">Why Choose Us</h3>
                  <ul className="space-y-4 text-slate-500 text-xs md:text-sm tracking-wider uppercase font-black">
                    <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">✔</span> <span>Herbal and Natural Ingredient-Based Products</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">✔</span> <span>Handcrafted herbal soaps made with selected natural ingredients</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">✔</span> <span>Export-Quality Packaging & Consistency</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">✔</span> <span>Trusted Manufacturing Partners</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">✔</span> <span>Competitive Global Pricing</span></li>
                    <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">✔</span> <span>Reliable Bulk Supply for International Buyers</span></li>
                  </ul>
                </div>

                <div className="p-8 md:p-12 bg-[#FAF9F6] rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#14532d] mb-8 uppercase tracking-widest">Key Product Categories</h3>
                    <ul className="space-y-4 text-slate-500 text-xs md:text-sm tracking-wider uppercase font-black">
                      <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✔</span> Handmade Herbal Soaps</li>
                      <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✔</span> Natural Face Wash & Skincare</li>
                      <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✔</span> Herbal Hair Care Products</li>
                      <li className="flex items-center gap-3"><span className="text-[#D4AF37] font-bold">✔</span> Botanical Wellness Products</li>
                    </ul>
                  </div>
                  <div className="border-t border-slate-200 mt-10 pt-6">
                    <h4 className="text-[10px] font-black text-[#14532d] mb-2 uppercase">Pricing & Supply</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-bold">We offer competitive bulk export prices based on quantity and destination country.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- CONTACT SECTION ONLY ON HOME PAGE --- */}
          <section ref={contactRef} className="bg-white py-24 border-t border-slate-50">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 font-bold text-left">
                <h2 className="text-5xl md:text-6xl font-serif text-[#14532d] uppercase tracking-tighter leading-tight font-black">Get in touch <br /> with us</h2>
                <div className="space-y-6 pt-4 text-sm tracking-widest font-bold text-[#14532d]">
                  <p className="flex items-center gap-3">📞 Phone: +91 95940 66615</p>
                  <p className="normal-case flex items-center gap-3">✉️ Email: info@vortialp.com</p>
                  <p className="flex items-start gap-3">📍 Mulekhand, Uran, Navi Mumbai, MH 400702</p>
                </div>
              </div>
              <div className="bg-[#FAF9F6] p-10 md:p-14 rounded-[60px] shadow-sm border border-slate-100">
                <form className="grid grid-cols-1 gap-6 uppercase text-[10px] tracking-widest" onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const form = e.currentTarget; 
                  const formData = new FormData(form); 
                  const { error } = await supabase.from('enquiries').insert([{ 
                    full_name: formData.get('fullName'), 
                    email: formData.get('email'), 
                    message: formData.get('message') 
                  }]); 
                  if (!error) { alert('Success! Enquiry Sent.'); form.reset(); } else { alert('Error sending enquiry.'); console.log(error.message); } 
                }}>
                  <div className="space-y-2 text-left"><label className="ml-2 font-black text-[#14532d]">Full Name</label><input name="fullName" placeholder="YOUR NAME" className="w-full p-5 bg-white rounded-2xl border border-slate-100 outline-none focus:border-[#D4AF37] font-bold" required /></div>
                  <div className="space-y-2 text-left"><label className="ml-2 font-black text-[#14532d]">Email Address</label><input name="email" type="email" placeholder="EMAIL@DOMAIN.COM" className="w-full p-5 bg-white rounded-2xl border border-slate-100 outline-none focus:border-[#D4AF37] font-bold" required /></div>
                  <div className="space-y-2 text-left"><label className="ml-2 font-black text-[#14532d]">Message</label><textarea name="message" placeholder="HOW CAN WE HELP?" className="w-full p-5 bg-white rounded-2xl border border-slate-100 h-32 outline-none focus:border-[#D4AF37] font-bold resize-none" required /></div>
                  <button type="submit" className="w-full py-5 rounded-full bg-[#14532d] text-white uppercase text-xs font-black shadow-lg hover:bg-[#D4AF37] transition-all">Send Message</button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- SHOP TAB CONTENT --- */}
      {activeTab === 'shop' && (
        <section className="py-20 px-8 max-w-7xl mx-auto text-center font-bold">
          <span className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Vortia Standards</span>
          <h2 className="text-6xl font-serif font-bold text-[#14532d] mb-12 uppercase tracking-tighter">Herbal Standard Products</h2>
          <div className="max-w-xl mx-auto mb-10"><input type="text" placeholder="Search products..." className="w-full p-6 bg-white border border-slate-200 rounded-[24px] text-sm outline-none shadow-sm focus:border-[#D4AF37] text-center font-bold" onChange={(e) => setSearchQuery(e.target.value)} /></div>
          <div className="flex flex-wrap justify-center gap-4 mb-20 uppercase font-black text-[10px]">
            {['All', 'Soaps', 'Face Wash', 'Hair Care'].map((btn) => (<button key={btn} onClick={() => setFilter(btn)} className={`px-8 py-3 rounded-full transition-all ${filter === btn ? 'bg-[#14532d] text-white' : 'bg-white border text-slate-500'}`}>{btn}</button>))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 font-black">
            {filteredProducts.map((p) => (
              <div key={p.id} onClick={() => setSelectedProduct(p)} className="group bg-white p-5 md:p-7 rounded-[32px] md:rounded-[48px] border border-slate-50 hover:shadow-2xl transition-all cursor-pointer">
                <img src={p.img} alt={p.name} className="w-full h-[200px] md:h-[300px] object-cover rounded-[24px] md:rounded-[36px] mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-[#14532d] mb-4">{p.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- SERVICES TAB CONTENT --- */}
      {activeTab === 'services' && (
        <section className="pt-10 pb-32 font-bold">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-[#0A2619] rounded-[80px] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center min-h-[500px]">
              <div className="p-20 flex-1 text-left">
                <h1 className="text-6xl font-serif font-bold text-white mb-6 leading-tight">Professional Data <br /> Entry Services</h1>
                <p className="text-[#D4AF37] text-lg font-black uppercase tracking-widest mb-10">Accurate • Secure • On Time</p>
                <button onClick={() => scrollToSection(contactRef)} className="bg-[#D4AF37] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest">Connect Now</button>
              </div>
              <div className="flex-1 h-full w-full p-10 flex justify-center items-center">
                <div className="relative h-[400px] w-full rounded-[60px] overflow-hidden shadow-2xl border-4 border-white/10"><img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6" alt="Data Services" className="w-full h-full object-cover" /></div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-2 gap-24 text-left">
            <h2 className="text-4xl font-serif font-bold text-[#14532d] uppercase tracking-tighter mb-4 font-black">*About our services*</h2>
            <div className="bg-[#FAF9F6] p-16 rounded-[80px] shadow-sm font-black">
              <h3 className="text-3xl font-serif font-bold text-[#14532d] mb-10 border-b pb-6 uppercase tracking-widest font-black">*Why Choose Us?*</h3>
              <div className="space-y-6 text-[#14532d] font-bold text-lg font-sans">
                {["100% Accurate Data", "Fast Delivery", "Confidential & Secure", "Worldwide Support", "Professional Communication"].map(i => (<div key={i} className="flex items-center gap-4"><span className="text-[#D4AF37] text-2xl">✔</span><span>{i}</span></div>))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- GLOBAL FOOTER --- */}
      <footer className="bg-[#14532d] text-white py-20 px-6 md:px-12 font-sans border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">
          <div className="lg:col-span-4 space-y-6">
            <h2 className={`${googeeStyle.className} text-3xl md:text-4xl text-[#D4AF37] uppercase m-0 p-0`}>Vortia LP</h2>
            <p className="text-slate-300 text-[10px] leading-relaxed uppercase font-black tracking-[0.2em] max-w-sm">Premium Herbal Products Exporter. Global Standards. Nature's Purity.</p>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-serif text-[#D4AF37] text-sm uppercase tracking-[0.2em] font-bold">Explore</h4>
            <ul className="text-[10px] space-y-3 uppercase font-black tracking-widest text-slate-400">
              <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('home')}>Home</li>
              <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection(aboutRef)}>About Us</li>
              <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('shop')}>Our Products</li>
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-serif text-[#D4AF37] text-sm uppercase tracking-[0.2em] font-bold">Legal</h4>
            <ul className="text-[10px] space-y-3 uppercase font-black tracking-widest text-slate-400">
              <li className="cursor-pointer hover:text-white">Privacy Policy</li>
              <li className="cursor-pointer text-slate-500 hover:text-[#D4AF37]" onClick={() => setIsLoginOpen(true)}>Admin</li>
            </ul>
          </div>
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-[#D4AF37] text-sm uppercase tracking-[0.2em] font-bold">Contact</h4>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-loose">Mulekhand, Uran, Navi Mumbai, MH 400702<br /><span className="text-white">+91 95940 66615</span></p>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-center"><p className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black italic">© 2026 Vortia LP. All Rights Reserved. Crafted for Purity.</p></div>
      </footer>

      {/* --- PRODUCT MODAL --- */}
      {/* --- DETAILED PRODUCT MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[500] bg-white overflow-y-auto animate-in fade-in">
          {/* Sticky Header */}
          <nav className="sticky top-0 bg-white border-b p-6 flex justify-between items-center shadow-sm z-50">
            <button onClick={() => setSelectedProduct(null)} className="text-[#14532d] font-black uppercase text-xs flex items-center gap-2">
              ← Back to Catalogue
            </button>
            <h2 className={`${googeeStyle.className} text-[#D4AF37] text-2xl uppercase`}>Vortia LP</h2>
          </nav>

          <div className="max-w-6xl mx-auto p-6 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE: Product Image */}
            <div className="lg:sticky lg:top-24">
              <img 
                src={selectedProduct.img} 
                alt={selectedProduct.name} 
                className="w-full rounded-[40px] shadow-2xl border-4 border-[#FAF9F6] object-cover aspect-square" 
              />
            </div>

            {/* RIGHT SIDE: Full Attribute Table */}
            <div className="space-y-8">
              <h1 className="text-4xl font-serif font-bold text-[#14532d] uppercase text-left">{selectedProduct.name}</h1>
              
              <div className="border-2 border-[#14532d]/10 rounded-3xl overflow-hidden font-sans shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#14532d] text-white text-[10px] uppercase tracking-widest">
                    <tr>
                      <th className="p-4 border-r border-white/10 w-1/3">Specification</th>
                      <th className="p-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { label: "Product Name", value: selectedProduct.name },
                      { label: "Ingredients", value: selectedProduct.ingredients },
                      { label: "Origin", value: selectedProduct.origin },
                      { label: "Size/Weight", value: selectedProduct.size },
                      { label: "Medicated", value: selectedProduct.medicated },
                      { label: "Fragrance", value: selectedProduct.fragrance },
                      { label: "Shelf Life", value: selectedProduct.shelfLife },
                      { label: "Brand", value: selectedProduct.brand },
                      { label: "Age Group", value: selectedProduct.ageGroup },
                      { label: "Colour", value: selectedProduct.colour },
                      { label: "MOQ", value: selectedProduct.moq },
                      { label: "Price", value: selectedProduct.price }
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-[#FAF9F6]" : "bg-white border-b border-[#14532d]/5"}>
                        <td className="p-4 font-black text-[#14532d] uppercase text-[10px] border-r border-[#14532d]/5 w-1/3">
                          {row.label}
                        </td>
                        <td className="p-4 text-slate-700 font-bold">
                          {row.value || "Contact for Details"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Features & Services */}
              <div className="bg-[#FAF9F6] p-8 rounded-[40px] border border-slate-100 space-y-4 text-left">
                 <p className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.2em]">Features & Services</p>
                 <p className="text-[#14532d] font-bold text-sm leading-relaxed">{selectedProduct.features}</p>
                 <p className="text-slate-400 text-xs italic font-medium">{selectedProduct.services}</p>
              </div>

              {/* Fixed Enquiry Action */}
              <button 
                onClick={() => { 
                  setSelectedProduct(null); 
                  setActiveTab('home'); 
                  setTimeout(() => contactRef.current?.scrollIntoView({ behavior: 'smooth' }), 150); 
                }} 
                className="w-full py-5 rounded-full bg-[#14532d] text-white font-black uppercase text-xs shadow-xl hover:bg-[#D4AF37] transition-all"
              >
                Enquire About Bulk Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LOGIN MODAL --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-[#0A2619]/95 backdrop-blur-2xl">
          <div className="bg-white/95 w-full max-w-sm rounded-[60px] p-16 shadow-2xl relative border border-white/20 text-left">
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-10 right-10 text-slate-300 text-3xl font-black">×</button>
            <div className="mb-12 text-center"><img src="/logo.JPEG" className="h-12 w-auto mx-auto mb-6 opacity-80" /><h2 className="text-3xl font-serif font-bold text-[#14532d] uppercase tracking-widest">Login</h2></div>
            <form className="space-y-6" onSubmit={handleLogin}>
              <input placeholder="Username" className="w-full p-5 bg-slate-100 rounded-3xl outline-none text-sm font-bold uppercase" required value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
              <input type="password" placeholder="Password" className="w-full p-5 bg-slate-100 rounded-3xl outline-none text-sm font-bold uppercase" required value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
              <button type="submit" className="w-full py-5 rounded-full bg-[#14532d] text-white font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-[#D4AF37] transition-all">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  ); 
}