import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/rails-api";
import { EditProfileForm } from "./EditProfileForm";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const profile = await getUserProfile(session.user.id);
  if (!profile) redirect("/onboarding");

  return (
    <div className="flex min-h-full items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          プロフィール編集
        </h1>
        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
}
