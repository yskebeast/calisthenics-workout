import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function MyPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          マイページ
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          ようこそ、{session.user.email} さん
        </p>
        <SignOutButton />
      </div>
    </div>
  );
}
