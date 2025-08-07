"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <div className="flex flex-col items-start gap-y-3 px-4 py-6 bg-white/5 rounded-lg shadow-sm text-sm text-black">
      <p className="text-sm font-medium tracking-wide">
        Logged in as <span className="font-semibold text-black">{session.user.name}</span>
      </p>

      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in"),
            },
          })
        }
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-md transition-all shadow-md"
      >
        Sign out
      </Button>
    </div>

  )
};

export default HomeView;

