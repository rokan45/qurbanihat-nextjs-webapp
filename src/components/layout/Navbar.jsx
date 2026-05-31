"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/animals", label: "All Animals" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <h2><span className="font-heading font-bold text-primary text-2xl">Qurbani</span> <span className="text-green-600 font-bold text-2xl">Hat</span></h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-orange-300"
                    : "text-green-100 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-white hover:text-green-100 transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-accent"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium">{user.name?.split(" ")[0]}</span>
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <Link
                      href="/my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-surface"
                    >
                      <User size={14} />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-green-100 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-dark transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-dark border-t border-green-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium py-2 ${
                pathname === link.href ? "text-accent" : "text-green-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-green-800 space-y-2">
            {user ? (
              <>
                <Link
                  href="/my-profile"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-green-100 py-2"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-300 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-green-100 py-2">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="block text-sm text-green-100 py-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
