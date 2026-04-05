import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CountryGroup = { country: string | null; _count: { id: number } };
type CityGroup = { city: string | null; _count: { id: number } };

export async function GET() {
  try {
    const orders = await prisma.order.groupBy({
      by: ['country'],
      _count: { id: true },
      where: { country: { not: null } },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    });

    const typedOrders = orders as CountryGroup[];
    const total = typedOrders.reduce((sum, item) => sum + item._count.id, 0);

    const chartData = typedOrders.map((item) => ({
      country: item.country,
      orders: item._count.id,
      percentage: total > 0 ? Math.round((item._count.id / total) * 1000) / 10 : 0,
    }));

    const topCountry = typedOrders[0]?.country;
    let topCities: Array<{ city: string | null; orders: number }> = [];

    if (topCountry) {
      const cities = await prisma.order.groupBy({
        by: ['city'],
        _count: { id: true },
        where: { country: topCountry, city: { not: null } },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      });

      topCities = (cities as CityGroup[]).map((item) => ({
        city: item.city,
        orders: item._count.id,
      }));
    }

    return NextResponse.json({ countries: chartData, topCities, totalWithLocation: total });
  } catch (error) {
    console.error("Geographic data fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch geographic data" }, { status: 500 });
  }
}
