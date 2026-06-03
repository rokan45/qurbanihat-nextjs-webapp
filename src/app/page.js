import Link from "next/link";
import MainLayout from "@/components/shared/MainLayout";
import AnimalCard from "@/components/cards/AnimalCard";
import { CheckCircle, Truck, ShieldCheck, Star } from "lucide-react";

async function getAnimals() {
  const data = await import("../../public/animals.json");
  return data.default;
}

export default async function HomePage() {
  const animals = await getAnimals();
  const featured = animals.slice(0, 4);

  return (
    <MainLayout>
      {/* Hero */}
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
        {/* Decorative */}
        {/* <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 hidden lg:block">
          <div className="text-[20rem] leading-none select-none text-right pr-8 pt-4">🐄</div>
        </div> */}
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
      <section className="bg-surface-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Qurbani Tips</h2>
            <p className="section-subtitle">Important guidelines before booking your animal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ShieldCheck className="text-primary" size={28} />,
                title: "Check Animal Health",
                desc: "Always verify the animal is healthy, active, and free from any visible diseases or injuries. Ask for vaccination records.",
              },
              {
                icon: <CheckCircle className="text-primary" size={28} />,
                title: "Age & Weight Verification",
                desc: "Ensure the animal meets the minimum age requirement. Cows must be at least 2 years old, goats at least 1 year.",
              },
              {
                icon: <Truck className="text-primary" size={28} />,
                title: "Arrange Transport Early",
                desc: "Book transportation well in advance as demand spikes near Eid. Many sellers offer delivery for an additional fee.",
              },
            ].map((tip) => (
              <div key={tip.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="mb-4">{tip.icon}</div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Breeds */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">Top Breeds for Qurbani</h2>
          <p className="section-subtitle">Most popular breeds chosen by Bangladeshi families</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Deshi Cow", emoji: "🐄", type: "Cow", note: "Widely available" },
            { name: "Friesian Cross", emoji: "🐂", type: "Cow", note: "Heavy weight" },
            { name: "Black Bengal", emoji: "🐐", type: "Goat", note: "Most popular goat" },
            { name: "Jamuna Pari", emoji: "🐑", type: "Goat", note: "Large body size" },
          ].map((breed) => (
            <div
              key={breed.name}
              className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm hover:border-primary hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">{breed.emoji}</div>
              <h4 className="font-semibold text-gray-900 text-sm">{breed.name}</h4>
              <p className="text-xs text-primary mt-1">{breed.type}</p>
              <p className="text-xs text-gray-400 mt-1">{breed.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold mb-2">Why Choose QurbaniHat?</h2>
            <p className="text-green-200 text-sm">Trusted by thousands of families across Bangladesh</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Star size={22} />, title: "Verified Sellers", desc: "All sellers are verified through our strict screening process." },
              { icon: <ShieldCheck size={22} />, title: "Secure Booking", desc: "Your booking data is protected and your payments are safe." },
              { icon: <CheckCircle size={22} />, title: "Quality Assured", desc: "Every animal listing is reviewed for accuracy and health documentation." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="text-accent shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-green-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
