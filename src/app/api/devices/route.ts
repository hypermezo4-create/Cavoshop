import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { getCategories, getProductMeta } from "@/lib/store-config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    const [products, productMeta, categories] = await Promise.all([
      prisma.product.findMany({
        include: { collections: { select: { id: true } } },
        orderBy: { createdAt: "desc" },
      }),
      getProductMeta(),
      getCategories(),
    ]);

    const categoryById = new Map<string, Awaited<ReturnType<typeof getCategories>>[number]>(categories.map((item: Awaited<ReturnType<typeof getCategories>>[number]) => [item.id, item]));

    const formatted = products.map((product: (typeof products)[number]) => {
      const meta = productMeta[product.id] || {};
      const category = meta.categoryId ? categoryById.get(meta.categoryId) : undefined;
      return {
        ...product,
        romCount: product.collections.length,
        categoryId: meta.categoryId || "",
        categoryName: category?.name || "Uncategorized",
        categorySlug: category?.slug || "uncategorized",
        price: meta.price || "",
        badge: meta.badge || "",
      };
    });

    const filtered = categorySlug ? formatted.filter((item: (typeof formatted)[number]) => item.categorySlug === categorySlug) : formatted;
    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Public products fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
