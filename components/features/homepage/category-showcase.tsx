import Link from "next/link";
import Image from "next/image";
import { INITIAL_CATEGORIES } from "@/constants/seedData";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ArrowUpRight } from "lucide-react";

export function CategoryShowcase() {
  return (
    <section className="py-20 bg-[#050505] border-b border-[#26262A]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <Heading
            badgeText="CATALOG MATRIX"
            dotMatrix
            size="lg"
            subtext="Discover our full line of transparent smartphones, audio systems, and custom modular tech."
          >
            PRODUCT CATEGORIES
          </Heading>
          <Link
            href="/products"
            className="font-mono text-xs uppercase tracking-widest text-[#D71921] hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative h-96 bg-[#0F0F10] border border-[#26262A] hover:border-[#D71921] transition-all duration-300 overflow-hidden flex flex-col justify-between p-6"
            >
              {/* Background Image Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.heroImage}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
              </div>

              {/* Top Tag */}
              <div className="relative z-10 flex justify-between items-center">
                {category.badge && (
                  <span className="font-mono text-[9px] uppercase font-bold tracking-widest bg-[#D71921] text-white px-2 py-0.5">
                    {category.badge}
                  </span>
                )}
                <div className="p-2 rounded-full bg-black/60 border border-[#26262A] text-white group-hover:border-[#D71921] group-hover:text-[#D71921] transition-colors ml-auto">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-white group-hover:text-[#D71921] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
