import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const collections = await prisma.rom.findMany({
            where: {
                productId: params.id,
            },
            orderBy: {
                version: "desc",
            },
        });

        return NextResponse.json(collections);
    } catch (error) {
        console.error("Product Collections fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch Collections" }, { status: 500 });
    }
}
