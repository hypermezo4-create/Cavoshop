import { NextResponse } from "next/server";
import { getCategories, setCategories, slugify } from "@/lib/store-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = await getCategories();
    const name = String(body.name || "").trim();
    const slug = slugify(body.slug || name);

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    if (current.some((item) => item.slug === slug)) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 });
    }

    const category = {
      id: body.id || slug,
      name,
      slug,
      description: String(body.description || "").trim(),
      isFeatured: Boolean(body.isFeatured),
      order: Number(body.order || current.length + 1),
    };

    const next = [...current, category];
    await setCategories(next);
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
