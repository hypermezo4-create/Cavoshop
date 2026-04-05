"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Clock3, Globe, Smartphone } from "lucide-react";

export const dynamic = "force-dynamic";

type OrderItem = {
  id: string;
  country?: string | null;
  city?: string | null;
  orderedAt: string;
  product?: { name?: string | null } | null;
  rom?: { name?: string | null } | null;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header>
        <div className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-black mb-2">Orders Control</div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Orders</h1>
        <p className="text-zinc-400 mt-2">Track order requests and product demand coming from the storefront and WhatsApp flow.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"><div className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2">Total Orders</div><div className="text-4xl font-black text-white">{loading ? "..." : orders.length}</div></div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"><div className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2">Latest Product</div><div className="text-xl font-black text-white">{orders[0]?.product?.name || "No orders yet"}</div></div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"><div className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2">Latest Location</div><div className="text-xl font-black text-white">{orders[0]?.city || orders[0]?.country || "Unknown"}</div></div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/10 text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
          <div>Product</div><div>Offer</div><div>Location</div><div>Ordered At</div>
        </div>
        {loading ? <div className="p-6 text-zinc-400">Loading orders...</div> : orders.length === 0 ? <div className="p-10 text-center text-zinc-400">No orders tracked yet.</div> : orders.map((order) => (
          <div key={order.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-5 border-b border-white/5 text-sm">
            <div className="flex items-center gap-3 text-white font-semibold"><ShoppingBag className="w-4 h-4 text-amber-400" /> {order.product?.name || "Catalog product"}</div>
            <div className="flex items-center gap-3 text-zinc-300"><Smartphone className="w-4 h-4 text-amber-400" /> {order.rom?.name || "Direct order"}</div>
            <div className="flex items-center gap-3 text-zinc-300"><Globe className="w-4 h-4 text-amber-400" /> {[order.city, order.country].filter(Boolean).join(", ") || "Unknown"}</div>
            <div className="flex items-center gap-3 text-zinc-300"><Clock3 className="w-4 h-4 text-amber-400" /> {new Date(order.orderedAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
