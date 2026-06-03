import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐄</span>
              <span className="font-heading font-bold text-white text-xl">QurbaniHat</span>
            </div>
            <p className="text-sm text-green-200 leading-relaxed">
              Bangladesh's trusted online livestock marketplace for Eid ul-Adha. Browse, compare, and book your Qurbani animals from verified sellers across the country.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-green-200">
                <MapPin size={15} className="shrink-0 text-accent" />
                Sherpur, Bogura, Bangladesh
              </li>
              <li className="flex items-center gap-2 text-green-200">
                <Phone size={15} className="shrink-0 text-accent" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2 text-green-200">
                <Mail size={15} className="shrink-0 text-accent" />
                info@qurbanihat.com.bd
              </li>
            </ul>
          </div>

          {/* Social + Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-5">
              <a href="#" className="w-9 h-9 rounded-md bg-green-800 hover:bg-accent flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-green-800 hover:bg-accent flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-green-800 hover:bg-accent flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-green-300 hover:text-white transition-colors">Home</Link>
              <Link href="/animals" className="block text-green-300 hover:text-white transition-colors">All Animals</Link>
              <Link href="/login" className="block text-green-300 hover:text-white transition-colors">Login</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-10 pt-6 text-center text-sm text-green-400">
          © {new Date().getFullYear()} QurbaniHat. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
