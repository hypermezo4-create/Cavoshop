import prisma from "@/lib/prisma";

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isFeatured?: boolean;
  order?: number;
};

export type ProductMeta = {
  categoryId?: string;
  price?: string;
  badge?: string;
};

const CATEGORIES_KEY = "cavo_categories";
const PRODUCT_META_KEY = "cavo_product_meta";

const defaultCategories: StoreCategory[] = [
  { id: "men", name: "Men", slug: "men", description: "Trending sneakers and everyday essentials for men.", isFeatured: true, order: 1 },
  { id: "women", name: "Women", slug: "women", description: "Elegant, sporty, and street-ready picks for women.", isFeatured: true, order: 2 },
  { id: "kids", name: "Kids", slug: "kids", description: "Comfortable and durable shoes for active kids.", isFeatured: true, order: 3 },
  { id: "offers", name: "Offers", slug: "offers", description: "Limited-time deals and discounted favorites.", isFeatured: true, order: 4 },
];

async function getJsonConfig<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.siteConfig.findUnique({ where: { key } });
  if (!row?.value) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value: JSON.stringify(fallback) },
      create: { key, value: JSON.stringify(fallback) },
    });
    return fallback;
  }

  try {
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
}

async function setJsonConfig<T>(key: string, value: T) {
  return prisma.siteConfig.upsert({
    where: { key },
    update: { value: JSON.stringify(value) },
    create: { key, value: JSON.stringify(value) },
  });
}

export async function getCategories(): Promise<StoreCategory[]> {
  const categories = await getJsonConfig<StoreCategory[]>(CATEGORIES_KEY, defaultCategories);
  return categories.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function setCategories(categories: StoreCategory[]) {
  return setJsonConfig(CATEGORIES_KEY, categories);
}

export async function getProductMeta(): Promise<Record<string, ProductMeta>> {
  return getJsonConfig<Record<string, ProductMeta>>(PRODUCT_META_KEY, {});
}

export async function setProductMeta(meta: Record<string, ProductMeta>) {
  return setJsonConfig(PRODUCT_META_KEY, meta);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
