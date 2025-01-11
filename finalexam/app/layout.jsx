// layout.jsx
"use client";

import { SessionProvider } from "next-auth/react"; // Importing SessionProvider from next-auth
import "./globals.css"; // Ensure globals.css is correctly imported
import { usePathname } from "next/navigation"; // You may use this later for pathname logic

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrapping the children with SessionProvider */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
