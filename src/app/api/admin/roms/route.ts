import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        const where = productId ? { productId } : {};

        const collections = await prisma.rom.findMany({
            where,
            include: {
                product: true,
                _count: {
                    select: { orders: true }
                }
            },
            orderBy: { releaseDate: 'desc' }
        });
        return NextResponse.json(collections);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch Collections" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, name, version, androidVersion, type, orderUrl, fileSize, changelog, installationGuide, isVipOnly } = body;

        const rom = await prisma.rom.create({
            data: {
                productId,
                name,
                version,
                androidVersion,
                type: type || "FREE",
                orderUrl,
                fileSize,
                changelog,
                installationGuide,
                isVipOnly: isVipOnly || false,
            }
        });

        return NextResponse.json(rom);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create Collection" }, { status: 500 });
    }
}
