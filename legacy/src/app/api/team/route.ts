import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/staff - List all staff members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    const where: any = {};

    if (role) {
      where.role = role.toUpperCase();
    }

    const members = await prisma.staffMember.findMany({
      where,
      orderBy: [{ role: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error fetching staff members:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch staff members" },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create a new staff member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, image, bio, instagram, whatsapp, twitter, website, order } = body;

    // Validate required fields
    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const member = await prisma.staffMember.create({
      data: {
        name,
        role: role.toUpperCase(),
        image,
        bio,
        instagram,
        whatsapp,
        twitter,
        website,
        order: order || 0,
      },
    });

    return NextResponse.json(
      { success: true, data: member },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create staff member" },
      { status: 500 }
    );
  }
}
