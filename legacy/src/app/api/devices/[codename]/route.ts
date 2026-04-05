import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[codename] - Get a specific product
export async function GET(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { codename: params.codename },
      include: {
        collections: {
          orderBy: { releaseDate: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[codename] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    const body = await request.json();
    const { name, brand, chipset, status, image, description } = body;

    const product = await prisma.product.update({
      where: { codename: params.codename },
      data: {
        name,
        brand: brand?.toUpperCase(),
        chipset,
        status: status?.toUpperCase(),
        image,
        description,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[codename] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    await prisma.product.delete({
      where: { codename: params.codename },
    });

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
