import { Metadata } from "next";
import { StaffGrid } from "@/sections/staff-grid";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Staff | Cavo Store",
  description: "Meet the talented staff behind Cavo Store and Cavo.",
};

async function getStaffMembers() {
  try {
    const members = await prisma.staffMember.findMany({
      orderBy: [
        { role: "asc" },
        { order: "asc" },
      ],
    });
    return members;
  } catch (error) {
    console.error("Error fetching staff members:", error);
    return [];
  }
}

export default async function StaffPage() {
  const members = await getStaffMembers();

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-yellow-400 font-medium mb-4 block">Our Staff</span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Meet the Minds Behind Cavo
          </h1>
          <p className="text-lg text-muted-foreground">
            A passionate group of developers, designers, and enthusiasts dedicated to 
            creating the best fashion experience for modern lifestyle products.
          </p>
        </div>
      </div>

      <StaffGrid members={members} />
    </div>
  );
}
