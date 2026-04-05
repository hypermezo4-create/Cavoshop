// تعريف المنتج (الحذاء) بدلاً من الجهاز
export interface Product {
  id: string;
  name: string;
  slug: string; // رابط المنتج
  brand: 'NIKE' | 'ADIDAS' | 'JORDAN' | 'NB' | 'LV' | 'OTHER';
  category: 'MEN' | 'WOMEN' | 'KIDS' | 'UNISEX';
  quality: 'MIRROR' | 'TOP_QUALITY' | 'ORIGINAL_MATERIAL';
  price: number;
  description?: string;
  images: string[]; // مصفوفة لصور الحذاء
  sizes: string[]; // مصفوفة للمقاسات المتاحة (مثلاً: 40, 41, 42)
  status: 'IN_STOCK' | 'OUT_OF_STOCK' | 'PRE_ORDER';
  createdAt: string;
  updatedAt: string;
}

// تعريف الطلب (Order) بدلاً من الـ Rom
export interface Order {
  id: string;
  productId: string;
  product?: Product;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  selectedSize: string;
  quantity: number;
  totalPrice: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}

// تعريف فريق العمل (كما هو مع تعديل الأدوار)
export interface TeamMember {
  id: string;
  name: string;
  role: 'OWNER' | 'MANAGER' | 'SALES' | 'MARKETING' | 'DESIGNER';
  image?: string;
  bio?: string;
  whatsapp?: string; // أضفنا واتساب بدلاً من تليجرام لسهولة التواصل
  instagram?: string;
  website?: string;
  order: number;
}

// إحصائيات المتجر
export interface StoreStats {
  id: string;
  totalSales: number;
  totalProducts: number;
  totalCustomers: number;
  updatedAt: string;
}

// المستخدم (الأدمن)
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'MANAGER';
}

// مميزات المنتج (لعرضها في صفحة المميزات)
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// مقارنة الجودة (بين جودة Cavo وجودة السوق)
export interface ComparisonFeature {
  name: string;
  marketQuality: boolean | string;
  cavoMirrorQuality: boolean | string;
}
