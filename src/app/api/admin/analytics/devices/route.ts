import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProductStats = {
  id: string;
  name: string;
  brand: string;
  orders: { id: string }[];
};

type ChartItem = {
  productId: string;
  productName: string;
  orders: number;
};

export async function GET() {
  try {
    const productStats = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        orders: { select: { id: true } },
      },
    });

    const popularProducts: ChartItem[] = (productStats as ProductStats[])
      .map((product) => ({
        productId: product.id,
        productName: `${product.brand} ${product.name}`,
        orders: product.orders.length,
      }))
      .filter((product) => product.orders > 0)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 10);

    const total = popularProducts.reduce((sum, product) => sum + product.orders, 0);

    const chartData = popularProducts.map((product) => ({
      ...product,
      percentage: total > 0 ? Math.round((product.orders / total) * 1000) / 10 : 0,
    }));

    return NextResponse.json({ data: chartData, total });
  } catch (error) {
    console.error("Product popularity fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch product stats" }, { status: 500 });
  }
}
