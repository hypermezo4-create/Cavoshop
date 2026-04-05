import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { getCategories, getProductMeta, setProductMeta, slugify } from "@/lib/store-config";

export async function GET() {
    try {
        const [products, productMeta, categories] = await Promise.all([
            prisma.product.findMany({
                include: {
                    _count: {
                        select: { collections: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            getProductMeta(),
            getCategories()
        ]);

        const categoryMap = new Map<string, Awaited<ReturnType<typeof getCategories>>[number]>(categories.map((item: Awaited<ReturnType<typeof getCategories>>[number]) => [item.id, item]));
        const result = products.map((product: (typeof products)[number]) => {
            const meta = productMeta[product.id] || {};
            const category = meta.categoryId ? categoryMap.get(meta.categoryId) : undefined;
            return {
                ...product,
                price: meta.price || "",
                badge: meta.badge || "",
                categoryId: meta.categoryId || "",
                categoryName: category?.name || "Uncategorized",
            };
        });

        return NextResponse.json(result);
    } catch {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = String(body.name || "").trim();
        const codename = slugify(body.slug || body.codename || name);

        if (!name || !codename) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                codename,
                brand: String(body.brand || "Cavo").trim() || "Cavo",
                chipset: String(body.quality || body.chipset || "Premium").trim() || "Premium",
                description: String(body.description || "").trim(),
                image: String(body.image || body.imageUrl || "").trim() || null,
            }
        });

        const meta = await getProductMeta();
        meta[product.id] = {
            categoryId: body.categoryId ? String(body.categoryId) : undefined,
            price: body.price ? String(body.price) : undefined,
            badge: body.badge ? String(body.badge) : undefined,
        };
        await setProductMeta(meta);

        return NextResponse.json(product);
    } catch {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
