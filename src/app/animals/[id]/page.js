"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/shared/MainLayout";
import { useSession } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { MapPin, Weight, Calendar, Tag, ArrowLeft, Lock } from "lucide-react";

export default function AnimalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("/animals.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        setAnimal(found || null);
        setLoading(false);
      });
  }, [id]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Booking confirmed for ${animal.name}! We'll contact you soon.`);
    reset();
    setSubmitting(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto px-4 py-16 animate-pulse space-y-4">
          <div className="h-72 bg-gray-200 rounded-xl" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </MainLayout>
    );
  }

  if (!animal) {
    return (
      <MainLayout>
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🐄</p>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Animal not found</h2>
          <Link href="/animals" className="text-primary text-sm hover:underline">← Back to all animals</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link href="/animals" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={15} />
          Back to Animals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left – Image & Details */}
          <div>
            <div className="rounded-xl overflow-hidden h-80 md:h-96 shadow-sm border border-gray-100">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6">
              <div className="flex items-start justify-between mb-2">
                <h1 className="font-heading text-2xl font-bold text-gray-900">{animal.name}</h1>
                <span className="text-xl font-bold text-accent">৳{animal.price.toLocaleString()}</span>
              </div>
              <span className="inline-block text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full mb-4">
                {animal.category}
              </span>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: <Tag size={14} />, label: "Breed", value: animal.breed },
                  { icon: <Tag size={14} />, label: "Type", value: animal.type },
                  { icon: <Weight size={14} />, label: "Weight", value: `${animal.weight} kg` },
                  { icon: <Calendar size={14} />, label: "Age", value: `${animal.age} years` },
                  { icon: <MapPin size={14} />, label: "Location", value: animal.location },
                ].map((item) => (
                  <div key={item.label} className="bg-surface rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <span className="text-primary">{item.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{animal.description}</p>
            </div>
          </div>

          {/* Right – Booking Form */}
          <div>
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm sticky top-20">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-1">Book This Animal</h2>
              <p className="text-sm text-gray-500 mb-5">Fill in your details to reserve</p>

              {isPending ? (
                <div className="py-8 text-center text-gray-400 text-sm">Checking session...</div>
              ) : !session ? (
                <div className="text-center py-10">
                  <Lock className="mx-auto text-gray-300 mb-3" size={36} />
                  <p className="text-gray-600 font-medium mb-1">Login Required</p>
                  <p className="text-sm text-gray-400 mb-5">You must be logged in to place a booking.</p>
                  <Link
                    href={`/login?redirect=/animals/${id}`}
                    className="btn-primary inline-block"
                  >
                    Login to Book
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="input-field"
                      placeholder="Your full name"
                      defaultValue={session.user.name}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      {...register("email", { required: "Email is required" })}
                      className="input-field"
                      placeholder="your@email.com"
                      defaultValue={session.user.email}
                      readOnly
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9+\s-]{10,15}$/, message: "Enter a valid phone number" },
                      })}
                      className="input-field"
                      placeholder="+880 1XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <textarea
                      {...register("address", { required: "Address is required" })}
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Your full delivery address"
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="bg-surface rounded-lg p-3 text-xs text-gray-500">
                    Booking: <strong>{animal.name}</strong> — ৳{animal.price.toLocaleString()}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Placing Booking..." : "Confirm Booking"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
