"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { StoreGrid } from "@/components/store-grid";

export default function ShopPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar /><StoreGrid title="Shop Cavo" description="Explore the latest Cavo shoes across every category, from everyday essentials to premium statement pairs." /><Footer /></main>;
}
