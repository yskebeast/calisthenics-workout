"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-gray-600 hover:text-gray-900 underline"
    >
      ログアウト
    </button>
  );
}
