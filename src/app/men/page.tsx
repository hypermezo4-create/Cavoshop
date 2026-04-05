"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { StoreGrid } from "@/components/store-grid";

export default function CategoryPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar /><StoreGrid title="Men Collection" description="Discover standout pairs from the Cavo Men lineup. Clean design, premium comfort, and versatile styling." category="men" /><Footer /></main>;
}
