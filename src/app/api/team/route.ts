import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const staff = await prisma.staffMember.findMany({
            orderBy: [
                { order: "asc" },
                { createdAt: "desc" }
            ]
        });
        return NextResponse.json(staff);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch staff members" }, { status: 500 });
    }
}
