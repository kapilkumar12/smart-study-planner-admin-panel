"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  Target,
  ClipboardList,
  Bell,
  BarChart3,
  X
} from "lucide-react";

type Props = {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: Props) {

  const path = usePathname();

  // ✅ By default closed
  const [openMenu, setOpenMenu] =
    useState("");

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Users",
      path: "/users",
      icon: <Users size={20} />,
    },

    {
      name: "Goals",
      path: "/goals",
      icon: <Target size={20} />,
    },

    {
      name: "Plans",
      path: "/plans",
      icon: <ClipboardList size={20} />,
    },

    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell size={20} />,
    },

    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,

      submenu: [
        {
          title: "Overview",
          path: "/analytics",
        },

        {
          title: "Users",
          path: "/analytics/users",
        },

        {
          title: "Study",
          path: "/analytics/study",
        },

        {
          title: "Subjects",
          path: "/analytics/subjects",
        },

        {
          title: "Activity",
          path: "/analytics/activity",
        },

        {
          title: "Usages",
          path: "/analytics/usages",
        },
        {
          title: "Leaderboard",
          path: "/analytics/streak-leaderboard",
        },
      ],
    },
  ];

  const toggleMenu = (name: string) => {
    setOpenMenu(
      openMenu === name ? "" : name
    );
  };

  return (
    <>
      {/* ================= OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="
            fixed inset-0 bg-black/50
            z-30 lg:hidden
          "
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          w-64 h-screen bg-black text-white
          transition-transform duration-300
          overflow-y-auto

          ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* ================= LOGO ================= */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">

          <h2 className="text-2xl font-bold">
            Admin Panel
          </h2>

          {/* Close button (mobile only) */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>

        </div>

        {/* ================= MENU ================= */}
        <div className="p-4">

          <ul className="space-y-2">

            {menu.map((item, index) => (
              <li key={index}>

                {/* ================= NORMAL MENU ================= */}
                {!item.submenu ? (
                  <Link
                    href={item.path}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={`
                      flex items-center gap-3
                      p-3 rounded-xl
                      transition-all duration-200

                      ${path === item.path
                        ? "bg-white text-black"
                        : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {item.icon}

                    <span className="font-medium">
                      {item.name}
                    </span>
                  </Link>
                ) : (
                  <>
                    {/* ================= PARENT MENU ================= */}
                    <button
                      onClick={() =>
                        toggleMenu(item.name)
                      }
                      className="
                        w-full flex items-center
                        justify-between
                        p-3 rounded-xl
                        hover:bg-gray-800
                        transition-all duration-200
                      "
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}

                        <span className="font-medium">
                          {item.name}
                        </span>
                      </div>

                      {openMenu === item.name ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>

                    {/* ================= SUBMENU ================= */}
                    {openMenu === item.name && (
                      <ul className="ml-6 mt-2 space-y-1">

                        {item.submenu.map(
                          (subItem, subIndex) => (

                            <li key={subIndex}>

                              <Link
                                href={subItem.path}
                                onClick={() =>
                                  setMobileOpen(false)
                                }
                                className={`
                                  block p-2.5
                                  rounded-lg text-sm
                                  transition-all duration-200

                                  ${path ===
                                    subItem.path
                                    ? "bg-white text-black"
                                    : "hover:bg-gray-800 text-gray-300"
                                  }
                                `}
                              >
                                {subItem.title}
                              </Link>

                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}