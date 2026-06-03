import Link from "next/link";
import MainLayout from "@/components/shared/MainLayout";
import AnimalCard from "@/components/cards/AnimalCard";
import { CheckCircle, Truck, ShieldCheck, Star } from "lucide-react";
import TopBreads from "@/components/shared/TopBreads";
import QurbaniTips from "@/components/shared/QurbaniTips";
import Quality from "@/components/shared/Quality";

async function getAnimals() {
  const data = await import("../../public/animals.json");
  return data.default;
}

export default async function HomePage() {
  const animals = await getAnimals();
  const featured = animals.slice(0, 4);

  return (
    <MainLayout>
      {/* Banner  Section */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold bg-accent/20 text-[#FFF0E4] border border-accent/30 px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
              Eid ul-Adha Special
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-5">
              Book Your Qurbani <br />
              <span className="text-[#FFF0E4]">Animal Online</span>
            </h1>
            <p className="text-green-100 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Find healthy cows, goats and more from verified sellers across Bangladesh. Safe, simple, and trusted.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/animals"
                className="inline-flex items-center gap-2 bg-[#2FA084] text-white px-6 py-3 rounded-md font-medium hover:bg-accent-dark transition-colors"
              >
                Browse Animals
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        
      </section>

      {/* Stats bar */}
      <section className="bg-[#2FA084]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-amber-600">
            {[
              { num: "500+", label: "Animals Listed" },
              { num: "200+", label: "Verified Sellers" },
              { num: "64", label: "Districts Covered" },
              { num: "10k+", label: "Happy Customers" },
            ].map((s) => (
              <div key={s.label} className="text-center py-4 px-4">
                <div className="text-xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-amber-100 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Animals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Animals</h2>
            <p className="section-subtitle mb-0">Hand-picked for this Eid season</p>
          </div>
          <Link href="/animals" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      {/* Qurbani Tips */}
      <QurbaniTips />

      {/* Top Breeds of all animals */}
      <TopBreads />

      {/* Why choose us */}
      <Quality />
    </MainLayout>
  );
}
