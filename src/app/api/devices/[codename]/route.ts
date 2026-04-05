import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { codename: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                codename: params.codename,
            },
            include: {
                collections: {
                    orderBy: {
                        releaseDate: "desc",
                    },
                },
            },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Product fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
