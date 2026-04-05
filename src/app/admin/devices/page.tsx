"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Package2, Tags } from "lucide-react";

export const dynamic = "force-dynamic";

type Product = {
  id: string;
  name: string;
  codename: string;
  brand: string;
  chipset: string;
  description?: string | null;
  image?: string | null;
  price?: string;
  badge?: string;
  categoryId?: string;
  categoryName?: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const emptyForm = {
  name: "",
  slug: "",
  brand: "Cavo",
  price: "",
  quality: "Premium",
  badge: "Best Seller",
  categoryId: "",
  description: "",
  image: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/devices", { cache: "no-store" }),
        fetch("/api/admin/categories", { cache: "no-store" }),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      (item.categoryName || "").toLowerCase().includes(q)
    );
  }, [products, query]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/admin/devices/${editingId}` : "/api/admin/devices";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to save product");
      return;
    }

    setIsModalOpen(false);
    resetForm();
    fetchData();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.codename,
      brand: product.brand,
      price: product.price || "",
      quality: product.chipset,
      badge: product.badge || "",
      categoryId: product.categoryId || "",
      description: product.description || "",
      image: product.image || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/devices/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-black mb-2">Inventory Management</div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Products</h1>
          <p className="text-zinc-400 mt-2">Add, edit, assign categories, and remove Cavo shoes from the store catalog.</p>
        </div>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="px-6 py-4 rounded-[1.25rem] bg-amber-500 text-black font-black uppercase tracking-widest text-xs inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </header>

      <div className="grid lg:grid-cols-[1fr_auto_auto] gap-4 items-center">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands, or categories..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
        </div>
        <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-zinc-300 text-sm">{filteredProducts.length} products</div>
        <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-zinc-300 text-sm">{categories.length} categories</div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 rounded-[2rem] bg-white/[0.03] animate-pulse" />) : filteredProducts.map((product) => (
          <div key={product.id} className="rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center">
              {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> : <Package2 className="w-14 h-14 text-amber-400/70" />}
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-2">{product.badge || "Featured"}</div>
                  <h3 className="text-white text-xl font-black tracking-tight">{product.name}</h3>
                  <p className="text-zinc-500 text-sm">{product.brand} · {product.chipset}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(product)} className="p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 rounded-xl bg-red-500/10 text-red-300 hover:text-red-200"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300"><Tags className="w-4 h-4 text-amber-400" /> {product.categoryName || "Uncategorized"}</div>
              <p className="text-zinc-400 text-sm min-h-[44px]">{product.description || "No description added yet."}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white">{product.price || "Price on request"}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">/{product.codename}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-3xl rounded-[2rem] bg-[#090b10] border border-white/10 p-8 space-y-5 max-h-[90vh] overflow-auto">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{editingId ? "Edit Product" : "Create Product"}</h2>
              <p className="text-zinc-400 mt-1">Manage catalog items for your Cavo shoe store.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (example: $129)" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input value={form.quality} onChange={(e) => setForm({ ...form, quality: e.target.value })} placeholder="Quality / material" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Badge" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white">
                <option value="">Uncategorized</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
            </div>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={4} className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 rounded-2xl bg-white/5 text-zinc-300">Cancel</button>
              <button type="submit" className="px-5 py-3 rounded-2xl bg-amber-500 text-black font-bold">Save Product</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
