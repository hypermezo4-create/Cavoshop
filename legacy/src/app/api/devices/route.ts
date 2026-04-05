import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products - List all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};

    if (brand && brand !== "all") {
      where.brand = brand.toUpperCase();
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { codename: { contains: search, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        collections: {
          where: { status: "ACTIVE" },
          orderBy: { releaseDate: "desc" },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, codename, brand, chipset, status, image, description } = body;

    // Validate required fields
    if (!name || !codename || !brand || !chipset) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if codename already exists
    const existingProduct = await prisma.product.findUnique({
      where: { codename },
    });

    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product with this codename already exists" },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        codename,
        brand: brand.toUpperCase(),
        chipset,
        status: status?.toUpperCase() || "ACTIVE",
        image,
        description,
      },
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
