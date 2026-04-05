import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/orders - Get order statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const romId = searchParams.get("romId");
    const days = parseInt(searchParams.get("days") || "7");

    // Get total orders
    const totalOrders = await prisma.order.count();

    // Get orders per day
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const ordersPerDay = await prisma.order.groupBy({
      by: ["timestamp"],
      where: {
        timestamp: {
          gte: startDate,
        },
        ...(romId && { romId }),
      },
      _count: {
        id: true,
      },
    });

    // Get orders per Collection
    const ordersPerRom = await prisma.rom.findMany({
      select: {
        id: true,
        name: true,
        version: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalOrders,
        ordersPerDay,
        ordersPerRom,
      },
    });
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order statistics" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Record a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { romId } = body;

    if (!romId) {
      return NextResponse.json(
        { success: false, error: "Collection ID is required" },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const order = await prisma.order.create({
      data: {
        romId,
        ip: ip.split(",")[0].trim(),
        userAgent,
      },
    });

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error recording order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record order" },
      { status: 500 }
    );
  }
}
