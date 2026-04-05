import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/collections - List all Collections
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: any = {};

    if (productId) {
      where.productId = productId;
    }

    if (type) {
      where.type = type.toUpperCase();
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const collections = await prisma.rom.findMany({
      where,
      include: {
        product: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { releaseDate: "desc" },
    });

    return NextResponse.json({ success: true, data: collections });
  } catch (error) {
    console.error("Error fetching Collections:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Collections" },
      { status: 500 }
    );
  }
}

// POST /api/collections - Create a new Collection
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
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

    // Validate required fields
    if (!productId || !name || !version || !androidVersion || !orderUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const rom = await prisma.rom.create({
      data: {
        productId,
        name,
        version,
        androidVersion,
        type: type?.toUpperCase() || "FREE",
        orderUrl,
        fileSize: fileSize || "Unknown",
        changelog: changelog || "",
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        gallery: gallery || [],
        installationGuide,
        status: status?.toUpperCase() || "ACTIVE",
        isVipOnly: isVipOnly || false,
      },
    });

    return NextResponse.json(
      { success: true, data: rom },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Collection:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Collection" },
      { status: 500 }
    );
  }
}
