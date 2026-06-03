import Link from "next/link";
import { MapPin, Weight, Calendar } from "lucide-react";

export default function AnimalCard ({ animal }) {
  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="relative h-52 overflow-hidden">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 text-xs font-medium bg-primary text-white px-2.5 py-1 rounded-full">
          {animal.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-heading font-semibold text-gray-900 text-base leading-tight">{animal.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{animal.breed} · {animal.type}</p>
          </div>
          <span className="text-accent font-bold text-base whitespace-nowrap">
            ৳{animal.price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 my-3">
          <span className="flex items-center gap-1">
            <Weight size={12} />
            {animal.weight} kg
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {animal.age} yrs
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {animal.location}
          </span>
        </div>

        <Link
          href={`/animals/${animal.id}`}
          className="block w-full text-center text-sm font-medium bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
