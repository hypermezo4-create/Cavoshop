"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShoppingBag, Search, MoreVertical, Edit2, Trash2, DollarSign, X, Loader2, Globe, Crown, Activity, Layers, Tag } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

// السطر السحري عشان الـ Build يعدي في Vercel
export const dynamic = 'force-dynamic';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal & Form State - تم تعديل الحقول لتناسب الأحذية
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        brand: "",
        price: "",
        quality: "1:1 Mirror Quality",
        description: "",
        image: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            // ملاحظة: تأكد من تعديل الـ API لاحقاً ليدعم هذا المسار
            const res = await fetch("/api/admin/devices"); 
            const data = await res.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/devices/${editingId}` : "/api/admin/devices";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ name: "", slug: "", brand: "", price: "", quality: "1:1 Mirror Quality", description: "", image: "" });
                fetchProducts();
            } else {
                const errData = await res.json();
                alert(`Failed: ${errData.error}`);
            }
        } catch (err) {
            console.error(err);
            alert("Database connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`/api/admin/devices/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProducts();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 space-y-10 bg-zinc-950 min-h-screen">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Crown className="w-3 h-3" />
                        Inventory Hub
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Sneaker <span className="text-amber-500">Vault</span></h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage your premium mirror quality collection.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-amber-500/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add Product
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-400 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by shoe name or brand..."
                        className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem]">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">In Stock:</span>
                    <span className="text-sm font-black text-amber-500">{filteredProducts.length} Pairs</span>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-64 bg-zinc-900/50 rounded-[2.5rem] animate-pulse border border-white/5" />
                    ))
                ) : filteredProducts.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-zinc-900/20 border border-white/5 rounded-[2.5rem]">
                        <ShoppingBag className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-500">Inventory Empty</h3>
                        <p className="text-sm text-zinc-600">Start adding your premium sneakers to the vault.</p>
                    </div>
                ) : (
                    filteredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 group hover:border-amber-500/30 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ShoppingBag className="w-32 h-32 rotate-[-15deg]" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-xl shadow-black/50">
                                        <Tag className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(product.id);
                                                setFormData({
                                                    name: product.name,
                                                    slug: product.slug || product.codename, // دعم المسميين
                                                    brand: product.brand,
                                                    price: product.price || product.chipset,
                                                    quality: product.quality || "1:1 Mirror Quality",
                                                    description: product.description || "",
                                                    image: product.image || "",
                                                });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-amber-400 transition-colors uppercase">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{product.brand}</span>
                                        <div className="w-1 bg-amber-500 h-1 rounded-full" />
                                        <code className="text-[10px] font-mono text-amber-500 font-bold tracking-tighter">{product.slug || product.codename}</code>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <DollarSign className="w-3 h-3" /> Price
                                        </div>
                                        <div className="text-[11px] font-black text-amber-400 truncate">${product.price || product.chipset}</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Layers className="w-3 h-3" /> Quality
                                        </div>
                                        <div className="text-[10px] font-bold text-zinc-300 truncate uppercase">Mirror</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                        product.status === 'ACTIVE'
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                                            : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                                    )}>
                                        {product.status || 'ACTIVE'}
                                    </span>
                                    <button className="flex items-center gap-2 p-2 px-4 rounded-xl hover:bg-white/5 transition-colors text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">
                                        History <MoreVertical className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Modal Redesign - إضافة وتعديل الأحذية */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingId(null);
                                setFormData({ name: "", slug: "", brand: "", price: "", quality: "1:1 Mirror Quality", description: "", image: "" });
                            }}
                            className="absolute inset-0 bg-[#030406]/95 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                                        <Globe className="w-3 h-3" /> Cavo Protocol
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{editingId ? "Modify Product" : "New Collection"}</h2>
                                </div>
                                <button
                                    onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-focus-within:text-amber-400 transition-all">Shoe Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Jordan 4 Retro"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-focus-within:text-amber-400 transition-all">URL Slug / ID</label>
                                        <input
                                            required
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="e.g. jordan-4-black"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/30 transition-all font-mono font-bold tracking-tighter"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-focus-within:text-amber-400 transition-all">Brand</label>
                                        <input
                                            required
                                            value={formData.brand}
                                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                            placeholder="e.g. NIKE"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-focus-within:text-amber-400 transition-all">Retail Price ($)</label>
                                        <input
                                            required
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="e.g. 150"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/30 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-focus-within:text-amber-400 transition-all">Product Story / Details</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Materials, original SKU, or history of this pair..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/30 transition-all font-medium resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 text-black rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-4"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>{editingId ? "Update Product" : "Add to Collection"} <Crown className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
