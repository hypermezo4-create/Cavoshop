"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Settings,
  LogOut,
  TrendingUp,
  Activity,
  DollarSign,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AdminDashboardProps {
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: string;
    salesPerDay: any[];
    topSellingShoes: any[];
  };
}

const statCards = [
  { key: "totalProducts", label: "Total Shoes", icon: Package, color: "from-amber-500/20 to-amber-600/20" },
  { key: "totalOrders", label: "Total Orders", icon: ShoppingBag, color: "from-green-500/20 to-green-600/20" },
  { key: "totalRevenue", label: "Revenue", icon: DollarSign, color: "from-blue-500/20 to-blue-600/20" },
  { key: "totalCustomers", label: "Customers", icon: Users, color: "from-purple-500/20 to-purple-600/20" },
];

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Cavo <span className="text-amber-400">Admin</span></h1>
            <p className="text-zinc-500 font-medium">Manage your premium sneaker store</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, index) => (
            <Card key={stat.key} className="glass border-white/5 bg-zinc-900/40">
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-black text-white">
                  {stat.key === 'totalRevenue' ? `$${stats[stat.key as keyof typeof stats]}` : stats[stat.key as keyof typeof stats]?.toLocaleString()}
                </p>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Management Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="glass mb-6 bg-zinc-900/50 p-1 border-white/5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass border-white/5 bg-zinc-900/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white uppercase text-sm font-black tracking-widest">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/admin/products/new">
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-amber-500/10 hover:text-amber-400">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Shoe
                        </Button>
                      </Link>
                      <Link href="/admin/orders">
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-amber-500/10 hover:text-amber-400">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          View Orders
                        </Button>
                      </Link>
                      <Link href="/admin/shipping">
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-amber-500/10 hover:text-amber-400">
                          <Truck className="w-4 h-4 mr-2" />
                          Shipping
                        </Button>
                      </Link>
                      <Link href="/admin/settings">
                        <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-amber-500/10 hover:text-amber-400">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-white/5 bg-zinc-900/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white uppercase text-sm font-black tracking-widest">
                      <Activity className="w-4 h-4 text-amber-400" />
                      Recent Sales Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <span className="text-sm font-bold">New order #1204</span>
                        <span className="text-[10px] text-zinc-500 uppercase font-black">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <span className="text-sm font-bold">Product out of stock</span>
                        <span className="text-[10px] text-zinc-500 uppercase font-black">5 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <span className="text-sm font-bold">New customer registered</span>
                        <span className="text-[10px] text-zinc-500 uppercase font-black">1 day ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <Card className="glass border-white/5 bg-zinc-900/40">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Product Inventory</CardTitle>
                  <Link href="/admin/products/new">
                    <Button size="sm" className="bg-amber-500 text-black font-black">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-500 text-center py-12 font-bold uppercase tracking-widest text-xs">
                    Inventory management interface coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* تم تغيير المسميات في باقي الـ Tabs لـ Orders و Customers */}
            <TabsContent value="orders">
              <Card className="glass border-white/5 bg-zinc-900/40 text-center py-12">
                 <ShoppingBag className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                 <p className="text-zinc-500 font-black uppercase text-xs tracking-[0.2em]">Orders Tracking System Coming Soon</p>
              </Card>
            </TabsContent>

            <TabsContent value="customers">
              <Card className="glass border-white/5 bg-zinc-900/40 text-center py-12">
                 <Users className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                 <p className="text-zinc-500 font-black uppercase text-xs tracking-[0.2em]">Customer Database Coming Soon</p>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
