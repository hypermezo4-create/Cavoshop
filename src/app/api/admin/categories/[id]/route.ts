import { NextResponse } from "next/server";
import { getCategories, getProductMeta, setCategories, setProductMeta, slugify } from "@/lib/store-config";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const categories = await getCategories();
    const index = categories.findIndex((item) => item.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const current = categories[index];
    const nextSlug = body.slug ? slugify(body.slug) : current.slug;

    if (categories.some((item) => item.id !== params.id && item.slug === nextSlug)) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 });
    }

    categories[index] = {
      ...current,
      name: body.name ? String(body.name).trim() : current.name,
      slug: nextSlug,
      description: body.description !== undefined ? String(body.description).trim() : current.description,
      isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : current.isFeatured,
      order: body.order !== undefined ? Number(body.order) : current.order,
    };

    await setCategories(categories);
    return NextResponse.json(categories[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const categories = await getCategories();
    const next = categories.filter((item) => item.id !== params.id);
    if (next.length === categories.length) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const productMeta = await getProductMeta();
    for (const productId of Object.keys(productMeta)) {
      if (productMeta[productId]?.categoryId === params.id) {
        productMeta[productId] = { ...productMeta[productId], categoryId: undefined };
      }
    }

    await Promise.all([setCategories(next), setProductMeta(productMeta)]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
