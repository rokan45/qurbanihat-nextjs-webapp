"use client";

import { useState, useEffect } from "react";
import AnimalCard from "@/components/ui/AnimalCard";
import { ArrowUpDown, Search } from "lucide-react";
import MainLayout from "../../components/layout/MainLayout";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/animals.json")
      .then((r) => r.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      });
  }, []);

  const filtered = animals
    .filter((a) => filterType === "All" || a.type === filterType)
    .filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.breed.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return a.id - b.id;
    });

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold mb-2">All Animals</h1>
          <p className="text-green-200 text-sm">Browse our full collection of Qurbani animals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search animals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field w-auto min-w-[130px]"
          >
            <option value="All">All Types</option>
            <option value="Cow">Cow</option>
            <option value="Goat">Goat</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="input-field w-auto min-w-[160px]"
          >
            <option value="default">Default Order</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p>No animals found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{filtered.length} animals found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((animal) => (
                <AnimalCard  key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
