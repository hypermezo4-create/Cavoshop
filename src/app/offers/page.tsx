"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { StoreGrid } from "@/components/store-grid";

export default function OffersPage() {
  return <main className="min-h-screen relative"><Starfield /><Navbar /><StoreGrid title="Offers" description="Discover discounted favorites, limited-time bundles, and standout deals from Cavo." category="offers" /><Footer /></main>;
}
