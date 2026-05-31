"use client";

import { useForm } from "react-hook-form";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // to handle on form submit
  const onSubmit = async ({ name, email, photoUrl, password }) => {
    setLoading(true);
    const res = await signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
    });
    setLoading(false);

    // toast and error message
    if (res?.error) {
      toast.error(res.error.message || "Registration failed. Try again.");
    } else {
      toast.success("Account created! Please login.");
      router.push("/login");
    }
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center">
            <h2><span className="font-heading font-bold text-primary text-4xl">Qurbani</span> <span className="text-green-600 font-bold text-4xl">Hat</span></h2>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 mt-4">Create an account</h1>
          <p className="text-sm text-gray-500 mt-1">Join thousands of happy customers</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
                })}
                className="input-field"
                placeholder="Enter your email here"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                {...register("photoUrl")}
                className="input-field"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className="input-field pr-10"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="flex items-center my-5">
            <hr className="flex-1 border-gray-200" />
            <span className="px-3 text-xs text-gray-400">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 2.9l6-6C34.3 3.2 29.4 1 24 1 14.8 1 7 6.7 3.6 14.6l7 5.4C12.3 13.9 17.6 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.3-4 6.8-9.9 6.8-17z"/>
              <path fill="#FBBC05" d="M10.6 28.1A14.5 14.5 0 0 1 9.5 24c0-1.4.2-2.8.6-4.1l-7-5.4A23.4 23.4 0 0 0 .5 24c0 3.8.9 7.4 2.6 10.5l7.5-6.4z"/>
              <path fill="#34A853" d="M24 46.5c5.4 0 10-1.8 13.3-4.8l-7.5-5.8c-1.9 1.3-4.3 2.1-7 2.1-6.4 0-11.8-4.3-13.7-10.1l-7.5 6.4C6.7 41.3 14.8 46.5 24 46.5z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
