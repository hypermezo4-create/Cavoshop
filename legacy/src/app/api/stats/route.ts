import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/stats - Get overall statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    // Get counts
    const [
      totalProducts,
      totalRoms,
      totalOrders,
      totalStaffMembers,
      activeProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.rom.count(),
      prisma.order.count(),
      prisma.staffMember.count(),
      prisma.product.count({ where: { status: "ACTIVE" } }),
    ]);

    // Get recent orders
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const recentOrders = await prisma.order.count({
      where: {
        timestamp: {
          gte: startDate,
        },
      },
    });

    // Get orders by product
    const ordersByProduct = await prisma.product.findMany({
      select: {
        name: true,
        codename: true,
        collections: {
          select: {
            _count: {
              select: { orders: true },
            },
          },
        },
      },
      take: 5,
    });

    // Get latest Collections
    const latestRoms = await prisma.rom.findMany({
      include: {
        product: {
          select: {
            name: true,
            codename: true,
          },
        },
      },
      orderBy: {
        releaseDate: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          totalProducts,
          totalRoms,
          totalOrders,
          totalStaffMembers,
          activeProducts,
        },
        recentOrders,
        ordersByProduct,
        latestRoms,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
