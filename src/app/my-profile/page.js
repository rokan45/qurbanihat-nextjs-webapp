"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { User, Mail, Edit, LogOut } from "lucide-react";
import { useEffect } from "react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/my-profile");
    }
  }, [session, isPending]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <MainLayout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>
      </MainLayout>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <MainLayout>
      <div className="bg-primary text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-2xl font-bold">My Profile</h1>
          <p className="text-green-200 text-sm mt-1">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Avatar banner */}
          <div className="bg-gradient-to-r from-primary to-primary-light h-24" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-5">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover shadow"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white bg-accent flex items-center justify-center text-2xl font-bold text-white shadow">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex gap-2">
                <Link
                  href="/my-profile/update"
                  className="inline-flex items-center gap-1.5 text-sm border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  <Edit size={14} />
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-sm border border-red-200 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>

            <h2 className="font-heading text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">Member at QurbaniHat</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-surface rounded-lg">
                <User size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surface rounded-lg">
                <Mail size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="text-sm font-medium text-gray-800">{user.email}</p>
                </div>
              </div>
              {user.image && (
                <div className="flex items-center gap-3 p-4 bg-surface rounded-lg">
                  <div className="w-5 h-5 shrink-0 text-primary text-center">🖼️</div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-400">Photo URL</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{user.image}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
