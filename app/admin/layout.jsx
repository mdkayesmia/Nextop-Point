"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCog,
  CreditCard,
  Plane,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Clients", href: "/admin/clients", icon: Users },
    { name: "Documents", href: "/admin/documents", icon: Users },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Employees", href: "/admin/employees", icon: UserCog },
    { name: "Revenue", href: "/admin/revenue", icon: CreditCard },
    { name: "Message", href: "/admin/message", icon: Plane },
    { name: "Role", href: "/admin/roles", icon: Users },
  ];

  useEffect(() => {
    // 🔒 ADMIN PROTECTION
    const user = JSON.parse(
      localStorage.getItem("nextopUser")
    );

    if (!user) {
      router.replace("/auth");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/auth");
      return;
    }

    setLoading(false);

    fetchMessageCount();

    const channel = supabase
      .channel("message-count")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_messages",
        },
        () => {
          fetchMessageCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  async function fetchMessageCount() {
    const { count, error } = await supabase
      .from("contact_messages")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (!error) {
      setMessageCount(count || 0);
    }
  }

  function logout() {
    localStorage.removeItem("nextopUser");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-blue-900">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-gradient-to-b from-blue-950 to-blue-900 text-white p-6 shadow-2xl relative">

        <h1 className="text-xl font-bold mb-8 tracking-wide">
          ✈ Nextop Admin
        </h1>

        <nav className="space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "bg-white text-blue-900 font-semibold shadow-lg"
                      : "hover:bg-blue-800 text-white"
                  }`}
              >
                <Icon size={20} />

                <div className="flex items-center w-full justify-between">
                  <span>{item.name}</span>

                  {item.name === "Message" &&
                    messageCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold min-w-[24px] text-center">
                        {messageCount}
                      </span>
                    )}
                </div>
              </Link>
            );
          })}

        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 text-xs text-blue-200">
          © 2026 Nextop CRM System
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

    </div>
  );
}