import { Metadata } from "next";
import { ProductSearch } from "@/sections/product-search";
import { ProductList } from "@/sections/product-list";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Order | Cavo Store",
  description: "Order Cavo for your product. Find Collections for streetwear, Redmi, and Poco products.",
};

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        collections: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            releaseDate: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function OrderPage() {
  const products = await getProducts();

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-yellow-400 font-medium mb-4 block">Order</span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Find Your Product
          </h1>
          <p className="text-lg text-muted-foreground">
            Search for your product and order the latest version of Cavo. 
            We support streetwear, Redmi, and Poco products with modern lifestyle chipsets.
          </p>
        </div>
      </div>

      <ProductSearch />
      <ProductList products={products} />
    </div>
  );
}
