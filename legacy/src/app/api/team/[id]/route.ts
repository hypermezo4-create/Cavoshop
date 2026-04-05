import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/staff/[id] - Get a specific staff member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await prisma.staffMember.findUnique({
      where: { id: params.id },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Staff member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error fetching staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch staff member" },
      { status: 500 }
    );
  }
}

// PUT /api/staff/[id] - Update a staff member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, role, image, bio, instagram, whatsapp, twitter, website, order } = body;

    const member = await prisma.staffMember.update({
      where: { id: params.id },
      data: {
        name,
        role: role?.toUpperCase(),
        image,
        bio,
        instagram,
        whatsapp,
        twitter,
        website,
        order,
      },
    });

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error updating staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update staff member" },
      { status: 500 }
    );
  }
}

// DELETE /api/staff/[id] - Delete a staff member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.staffMember.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "Staff member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting staff member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete staff member" },
      { status: 500 }
    );
  }
}
