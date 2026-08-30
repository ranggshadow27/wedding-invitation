// app/dashboard/layout.tsx
"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast"; // <-- Import dari ui/toaster
import { LogOut, Heart } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
            <span className="text-lg font-bold tracking-tight text-slate-800">
              Wedding Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-slate-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>

      {/* Standard Toast Component */}
      <Toaster />
    </div>
  );
}
