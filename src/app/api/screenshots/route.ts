import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const gallery = await prisma.screenshot.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });
        return NextResponse.json(gallery);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
    }
}
