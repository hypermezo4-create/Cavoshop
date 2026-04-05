import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type OrderPoint = { orderedAt: Date };

export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await prisma.order.findMany({
      where: { orderedAt: { gte: thirtyDaysAgo } },
      select: { orderedAt: true },
      orderBy: { orderedAt: 'asc' },
    });

    const ordersByDate: Record<string, number> = {};
    (orders as OrderPoint[]).forEach((order) => {
      const date = order.orderedAt.toISOString().split('T')[0];
      ordersByDate[date] = (ordersByDate[date] || 0) + 1;
    });

    const chartData: Array<{ date: string; count: number; label: string }> = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      chartData.push({
        date: dateStr,
        count: ordersByDate[dateStr] || 0,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });
    }

    return NextResponse.json({ data: chartData });
  } catch (error) {
    console.error("Order trends fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch order trends" }, { status: 500 });
  }
}
