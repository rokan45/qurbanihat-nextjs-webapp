import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "QurbaniHat – Livestock Booking Platform",
  description: "Book your Qurbani animals online – cows, goats and more from trusted sellers across Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: {
              style: { background: "#1a5c38", color: "#fff" },
            },
            error: {
              style: { background: "#b91c1c", color: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
