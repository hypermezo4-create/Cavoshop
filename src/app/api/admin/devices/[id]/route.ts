import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getProductMeta, setProductMeta, slugify } from "@/lib/store-config";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
            include: { collections: true }
        });
        return NextResponse.json(product);
    } catch {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
}

async function updateProduct(req: Request, params: { id: string }) {
    try {
        const body = await req.json();
        const data: Record<string, unknown> = {};

        if (body.name !== undefined) data.name = String(body.name).trim();
        if (body.slug !== undefined || body.codename !== undefined) data.codename = slugify(body.slug || body.codename || body.name || "");
        if (body.brand !== undefined) data.brand = String(body.brand).trim() || "Cavo";
        if (body.quality !== undefined || body.chipset !== undefined) data.chipset = String(body.quality || body.chipset).trim() || "Premium";
        if (body.description !== undefined) data.description = String(body.description).trim();
        if (body.image !== undefined || body.imageUrl !== undefined) data.image = String(body.image || body.imageUrl).trim() || null;

        const product = await prisma.product.update({
            where: { id: params.id },
            data
        });

        const meta = await getProductMeta();
        meta[params.id] = {
            ...(meta[params.id] || {}),
            categoryId: body.categoryId !== undefined ? (body.categoryId ? String(body.categoryId) : undefined) : meta[params.id]?.categoryId,
            price: body.price !== undefined ? (body.price ? String(body.price) : undefined) : meta[params.id]?.price,
            badge: body.badge !== undefined ? (body.badge ? String(body.badge) : undefined) : meta[params.id]?.badge,
        };
        await setProductMeta(meta);

        return NextResponse.json(product);
    } catch {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
    return updateProduct(req, ctx.params);
}

export async function PUT(req: Request, ctx: { params: { id: string } }) {
    return updateProduct(req, ctx.params);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.product.delete({
            where: { id: params.id }
        });
        const meta = await getProductMeta();
        delete meta[params.id];
        await setProductMeta(meta);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
