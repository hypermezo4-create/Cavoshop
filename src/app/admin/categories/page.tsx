"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Tags, Star, Search } from "lucide-react";

export const dynamic = "force-dynamic";

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isFeatured?: boolean;
  order?: number;
};

const emptyForm = { name: "", slug: "", description: "", isFeatured: false, order: 1 };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories", { cache: "no-store" });
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = useMemo(() => categories.filter((item) => {
    const q = query.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q);
  }), [categories, query]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, order: categories.length + 1 });
    setIsModalOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      isFeatured: Boolean(category.isFeatured),
      order: category.order || 1,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/admin/categories/${editing.id}` : "/api/admin/categories";
    const method = editing ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to save category");
      return;
    }

    setIsModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products in it will become uncategorized.")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) fetchCategories();
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-black mb-2">Catalog Control</div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Categories</h1>
          <p className="text-zinc-400 mt-2">Create and manage sections like Men, Women, Kids, and Offers.</p>
        </div>
        <button onClick={openCreate} className="px-6 py-4 rounded-[1.25rem] bg-amber-500 text-black font-black uppercase tracking-widest text-xs inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </header>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search categories..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-52 rounded-[2rem] bg-white/[0.03] animate-pulse" />) : filtered.map((category) => (
          <div key={category.id} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Tags className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(category)} className="p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(category.id)} className="p-2 rounded-xl bg-red-500/10 text-red-300 hover:text-red-200"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white text-xl font-black tracking-tight">{category.name}</h3>
                {category.isFeatured && <Star className="w-4 h-4 text-amber-400" />}
              </div>
              <p className="text-zinc-500 text-sm mb-3">/{category.slug}</p>
              <p className="text-zinc-400 text-sm leading-6 min-h-[72px]">{category.description || "No description added yet."}</p>
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">Display Order: {category.order || 1}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-[2rem] bg-[#090b10] border border-white/10 p-8 space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">{editing ? "Edit Category" : "Create Category"}</h2>
              <p className="text-zinc-400 mt-1">This section will appear across the store and admin panel.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Category name" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug (example: offers)" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} placeholder="Display order" className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
              <label className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                Featured category
              </label>
            </div>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" rows={4} className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white" />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 rounded-2xl bg-white/5 text-zinc-300">Cancel</button>
              <button type="submit" className="px-5 py-3 rounded-2xl bg-amber-500 text-black font-bold">Save Category</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
