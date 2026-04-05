import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProductDetail } from "@/sections/product-detail";

interface ProductPageProps {
  params: {
    codename: string;
  };
}

async function getProduct(codename: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        codename,
      },
      include: {
        collections: {
          orderBy: {
            releaseDate: "desc",
          },
        },
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.codename);
  
  if (!product) {
    return {
      title: "Product Not Found | Cavo Store",
    };
  }

  return {
    title: `${product.name} | Order | Cavo Store`,
    description: `Order Cavo for ${product.name} (${product.codename}). Latest Collection versions and installation guides.`,
  };
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: {
        codename: true,
      },
    });
    return products.map((product) => ({
      codename: product.codename,
    }));
  } catch (error) {
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.codename);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <ProductDetail product={product} />
    </div>
  );
}
