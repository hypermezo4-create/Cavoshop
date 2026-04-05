import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getClientIP, detectLocation } from "@/lib/analytics";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { romId, productId } = body;

        if (!romId) {
            return NextResponse.json({ error: "Collection ID is required" }, { status: 400 });
        }

        // Extract tracking data
        const clientIP = getClientIP(req);
        const userAgent = req.headers.get('user-agent');

        // Detect geographic location (async, non-blocking)
        const { country, city } = await detectLocation(clientIP);

        // Create order record with full analytics data
        const order = await prisma.order.create({
            data: {
                romId,
                productId: productId || null,
                ipAddress: clientIP,
                userAgent,
                country,
                city,
            },
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Order tracking failed:", error);
        return NextResponse.json({ error: "Failed to track order" }, { status: 500 });
    }
}
