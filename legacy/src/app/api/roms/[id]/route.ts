import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/collections/[id] - Get a specific Collection
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rom = await prisma.rom.findUnique({
      where: { id: params.id },
      include: {
        product: true,
        _count: {
          select: { orders: true },
        },
      },
    });

    if (!rom) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rom });
  } catch (error) {
    console.error("Error fetching Collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Collection" },
      { status: 500 }
    );
  }
}

// PUT /api/collections/[id] - Update a Collection
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      version,
      androidVersion,
      type,
      orderUrl,
      fileSize,
      changelog,
      releaseDate,
      gallery,
      installationGuide,
      status,
      isVipOnly,
    } = body;

    const rom = await prisma.rom.update({
      where: { id: params.id },
      data: {
        name,
        version,
        androidVersion,
        type: type?.toUpperCase(),
        orderUrl,
        fileSize,
        changelog,
        releaseDate: releaseDate ? new Date(releaseDate) : undefined,
        gallery,
        installationGuide,
        status: status?.toUpperCase(),
        isVipOnly,
      },
    });

    return NextResponse.json({ success: true, data: rom });
  } catch (error) {
    console.error("Error updating Collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Collection" },
      { status: 500 }
    );
  }
}

// DELETE /api/collections/[id] - Delete a Collection
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.rom.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "Collection deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete Collection" },
      { status: 500 }
    );
  }
}
