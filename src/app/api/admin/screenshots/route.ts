import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, imageUrl, description, category, order } = body;

        const screenshot = await (prisma.screenshot as any).create({
            data: {
                title,
                imageUrl,
                description,
                category,
                order: order || 0,
            },
        });

        revalidatePath("/gallery");
        revalidatePath("/api/screenshots");

        return NextResponse.json(screenshot, { status: 201 });
    } catch (error) {
        console.error("Error creating screenshot:", error);
        return NextResponse.json({ error: "Failed to create screenshot" }, { status: 500 });
    }
}
