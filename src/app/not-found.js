import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <div className="text-7xl mb-6">🐄</div>
          <h1 className="font-heading text-4xl font-bold text-gray-900 mb-3">404 – Page Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for has wandered off the farm. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link href="/animals" className="btn-outline">
              Browse Animals
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
