import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AdminDashboard } from "@/sections/admin-dashboard";
// تم تعطيل Prisma مؤقتاً لضمان عمل الـ Build على Vercel
// import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Cavo Admin | Dashboard",
};

async function getStats() {
  try {
    // هذي بيانات تجريبية (Mock Data) عشان لوحة التحكم تفتح معاك وتشوف شكلها
    // أول ما نربط قاعدة البيانات هنرجع نستخدم الأوامر الحقيقية
    return {
      totalProducts: 124,      // إجمالي الأحذية
      totalOrders: 45,        // إجمالي الطلبات
      totalCustomers: 89,      // عدد الزبائن
      totalRevenue: "15,400",  // إجمالي الأرباح
      salesPerDay: [],
      topSellingShoes: [],
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: "0",
      salesPerDay: [],
      topSellingShoes: [],
    };
  }
}

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // لو مفيش جلسة دخول، يحولك لصفحة تسجيل الدخول
  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  // بنمرر البيانات للوحة التحكم لتنسيقها وعرضها
  return <AdminDashboard stats={stats} />;
}
