"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";

import {
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

type User = {
  name: string;
  email: string;
};

type Props = {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function Navbar({
  mobileOpen,
  setMobileOpen,
}: Props) {

  const [user, setUser] =
    useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("User parse error:", error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      localStorage.removeItem("accessToken");

      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <header
      className="
        fixed top-0 right-0 left-0 lg:left-64
        h-16 bg-white border-b
        flex items-center justify-between
        px-4 md:px-6 z-30
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          className="lg:hidden"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>

        <h1 className="text-lg md:text-xl font-semibold">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={70}
            height={30}
            loading="lazy"
          />
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm"
          />
        </div>

        {/* Notification */}
        <button className="relative" onClick={() => router.push("/notifications")}>
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold">
            {user?.name || "Admin"}
          </p>

          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
          {user?.name?.charAt(0) || "A"}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            bg-black text-white
            px-3 md:px-4 py-2
            rounded-lg text-sm
            hover:bg-gray-800
            transition
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}