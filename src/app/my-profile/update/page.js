"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/shared/MainLayout";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function UpdateProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/my-profile/update");
    }
    if (session?.user) {
      reset({ name: session.user.name, image: session.user.image || "" });
    }
  }, [session, isPending]);

  const onSubmit = async ({ name, image }) => {
    setLoading(true);
    try {
      await authClient.updateUser({ name, image: image || undefined });
      toast.success("Profile updated successfully!");
      if (refetch) refetch();
      router.push("/my-profile");
    } catch (err) {
      toast.error("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <MainLayout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>
      </MainLayout>
    );
  }

  if (!session) return null;

  return (
    <MainLayout>
      <div className="bg-primary text-white py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-2xl font-bold">Update Profile</h1>
          <p className="text-green-200 text-sm mt-1">Change your name and photo</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/my-profile" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={15} />
          Back to Profile
        </Link>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="input-field"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                {...register("image")}
                className="input-field"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="text-xs text-gray-400 mt-1">Enter a direct link to your profile photo</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Update Information"}
              </button>
              <Link href="/my-profile" className="btn-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
