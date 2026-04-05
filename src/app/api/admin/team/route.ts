import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, role, country, image, bio, instagram, whatsapp, twitter, website } = body;

        // Custom ordering based on role
        let order = 100; // Default for Staff
        const lowerRole = role.toLowerCase();
        if (lowerRole.includes("founder") && !lowerRole.includes("co")) order = 0;
        else if (lowerRole.includes("co-founder") || lowerRole.includes("cofounder")) order = 1;
        else if (lowerRole.includes("lead")) order = 2;
        else if (lowerRole.includes("developer")) order = 3;
        else if (lowerRole.includes("moderator")) order = 4;

        const member = await (prisma.staffMember as any).create({
            data: {
                name,
                role,
                country,
                image,
                bio,
                instagram,
                whatsapp,
                twitter,
                website,
                order
            },
        });

        revalidatePath("/staff");
        revalidatePath("/api/team");

        return NextResponse.json(member);
    } catch (error) {
        console.error("Failed to create staff member:", error);
        return NextResponse.json({ error: "Failed to create staff member" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const staff = await prisma.staffMember.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(staff);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch staff members" }, { status: 500 });
    }
}
