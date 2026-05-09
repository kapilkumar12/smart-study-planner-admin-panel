"use client";

import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main */}
      <div className="flex-1 lg:ml-64">

        {/* Navbar */}
        <Navbar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Page Content */}
        <main className="p-4 md:p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}