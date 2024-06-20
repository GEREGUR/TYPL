import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import { useSession } from "next-auth/react";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for managing tests and students",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
