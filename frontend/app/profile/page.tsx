import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/rails-api";
import Link from "next/link";

const BACKEND_URL = `http://localhost:${process.env.BACKEND_PORT ?? 3001}`;

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const profile = await getUserProfile(session.user.id);
  if (!profile) redirect("/onboarding");

  return (
    <div className="flex min-h-full items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          プロフィール
        </h1>

        {profile.avatar_url && (
          <div className="mb-6 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BACKEND_URL}${profile.avatar_url}`}
              alt="プロフィール画像"
              className="h-24 w-24 object-cover"
            />
          </div>
        )}

        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">氏名</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {profile.last_name} {profile.first_name}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">身長</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {profile.height != null ? `${profile.height} cm` : "未設定"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">体重</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {profile.weight != null ? `${profile.weight} kg` : "未設定"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">生年月日</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {profile.date_of_birth ?? "未設定"}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <Link
            href="/profile/edit"
            className="block w-full rounded-full bg-zinc-900 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            編集
          </Link>
        </div>
      </div>
    </div>
  );
}
