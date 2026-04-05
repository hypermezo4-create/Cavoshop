import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Get current date boundaries
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - 7);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Total orders
        const totalOrders = await prisma.order.count();

        // Orders today
        const ordersToday = await prisma.order.count({
            where: {
                orderedAt: {
                    gte: startOfToday,
                },
            },
        });

        // Orders this week
        const ordersThisWeek = await prisma.order.count({
            where: {
                orderedAt: {
                    gte: startOfWeek,
                },
            },
        });

        // Orders this month
        const ordersThisMonth = await prisma.order.count({
            where: {
                orderedAt: {
                    gte: startOfMonth,
                },
            },
        });

        // Active products (products with at least one order)
        const activeProducts = await prisma.product.count({
            where: {
                orders: {
                    some: {},
                },
            },
        });

        // Calculate growth percentages (compare with previous period)
        const yesterday = new Date(startOfToday);
        yesterday.setDate(yesterday.getDate() - 1);

        const ordersYesterday = await prisma.order.count({
            where: {
                orderedAt: {
                    gte: yesterday,
                    lt: startOfToday,
                },
            },
        });

        const todayGrowth = ordersYesterday > 0
            ? ((ordersToday - ordersYesterday) / ordersYesterday) * 100
            : 0;

        return NextResponse.json({
            totalOrders,
            ordersToday,
            ordersThisWeek,
            ordersThisMonth,
            activeProducts,
            growth: {
                today: Math.round(todayGrowth * 10) / 10, // Round to 1 decimal
            },
        });
    } catch (error) {
        console.error("Analytics overview failed:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
