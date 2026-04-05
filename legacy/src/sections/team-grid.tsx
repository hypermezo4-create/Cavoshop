"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, MessageCircle, Globe, Crown, ShoppingBag, Truck, Palette, User, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { StaffMember } from "@/types";

interface StaffGridProps {
  members: StaffMember[];
}

// تغيير الأدوار لتناسب متجر كافو
const roleConfig: Record<string, { icon: any; color: string; label: string }> = {
  OWNER: { icon: Crown, color: "from-amber-500/20 to-amber-600/20 text-amber-400", label: "Founder & CEO" },
  MANAGER: { icon: ShoppingBag, color: "from-zinc-500/20 to-zinc-600/20 text-zinc-300", label: "Store Manager" },
  SALES: { icon: User, color: "from-yellow-500/20 to-yellow-600/20 text-yellow-400", label: "Sales Expert" },
  DESIGNER: { icon: Palette, color: "from-pink-500/20 to-pink-600/20 text-pink-400", label: "Creative Director" },
  MARKETING: { icon: Globe, color: "from-green-500/20 to-green-600/20 text-green-400", label: "Marketing" },
};

function StaffCard({ member, index }: { member: any; index: number }) {
  const role = roleConfig[member.role as keyof typeof roleConfig] || roleConfig.OWNER;
  const RoleIcon = role.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group glass border-white/5 hover:border-amber-500/20 transition-all duration-500 overflow-hidden h-full bg-zinc-900/40 backdrop-blur-md rounded-[2rem]">
        <CardContent className="p-0">
          {/* Avatar Section */}
          <div className={`relative h-56 bg-gradient-to-br ${role.color} overflow-hidden flex items-center justify-center`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="w-28 h-28 rounded-[2rem] object-cover border-4 border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-28 h-28 rounded-[2rem] bg-zinc-950/50 flex items-center justify-center border-4 border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <span className="text-4xl font-black text-white">{member.name[0]}</span>
                </div>
              )}
            </div>
            
            {/* Role Badge */}
            <div className="absolute top-6 right-6">
              <Badge className={`bg-zinc-950/80 text-white border-white/10 backdrop-blur-md py-1 px-3 rounded-full font-black uppercase text-[10px] tracking-widest`}>
                <RoleIcon className="w-3 h-3 mr-2 text-amber-500" />
                {role.label}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-amber-400 transition-colors">
              {member.name}
            </h3>
            
            {member.bio && (
              <p className="text-sm text-zinc-500 font-medium mb-6 line-clamp-3 leading-relaxed">
                {member.bio}
              </p>
            )}

            {/* Social Media */}
            <div className="flex gap-3">
              {/* استبدلنا الروابط التقنية بروابط تواصل تجارية */}
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black transition-all" asChild>
                <Link href={`https://wa.me/${member.whatsapp || ''}`} target="_blank">
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black transition-all" asChild>
                <Link href={`https://instagram.com/${member.instagram || ''}`} target="_blank">
                  <Instagram className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StaffGrid({ members }: StaffGridProps) {
  if (members.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-20 bg-zinc-900/20 rounded-[3rem] border border-white/5 backdrop-blur-md">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Meet Our Elite Staff</h3>
            <p className="text-zinc-500 font-medium">
              We are currently finalizing our staff profiles for Cavo Store.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <StaffCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
