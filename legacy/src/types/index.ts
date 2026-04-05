// src/types/index.ts

export type Role = "OWNER" | "MANAGER" | "SALES" | "DESIGNER" | "MARKETING";

export interface StaffMember {
  id: string;
  name: string;
  role: Role;
  bio?: string;
  image?: string;
  whatsapp?: string;
  instagram?: string;
  instagram?: string; // خليناها عشان ميعملش Error لو مستخدمة في مكان تاني
  twitter?: string;
  whatsapp?: string;
  website?: string;
}

export interface Rom {
  id: string;
  name: string;
  version: string;
  androidVersion: string;
  releaseDate: string;
  fileSize: string;
  orderUrl: string;
  changelog: string;
  isVipOnly: boolean;
  status: "ACTIVE" | "INACTIVE";
}

// تعريف المنتج (الحذاء) لـ Cavo Store
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  quality: string;
  description?: string;
  slug: string;
  image?: string;
  status: "ACTIVE" | "INACTIVE";
  collections?: Rom[]; // بنسيب دي عشان لو الكود القديم بيعتمد عليها ميعطلش
}

// بنخلي Product هي هي Product عشان الكود القديم يفضل شغال
export type Product = Product;

export interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: string;
  salesPerDay: any[];
  topSellingShoes: any[];
  // المسميات القديمة عشان ميعملش Error
  totalProducts?: number;
  totalRoms?: number;
  totalOrders?: number;
  totalStaffMembers?: number;
}
