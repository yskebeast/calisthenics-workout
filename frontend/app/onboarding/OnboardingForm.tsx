"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { userId: string };

export default function OnboardingForm({ userId }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/user-profile", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const body = await res.json();
      router.push("/profile");
    } else {
      const body = await res.json();
      setError(body.error ?? "登録に失敗しました");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            姓 *
          </label>
          <input
            name="last_name"
            type="text"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            名 *
          </label>
          <input
            name="first_name"
            type="text"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            身長 (cm)
          </label>
          <input
            name="height"
            type="number"
            min={50}
            max={300}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            体重 (kg)
          </label>
          <input
            name="weight"
            type="number"
            min={10}
            max={500}
            step="0.1"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          生年月日
        </label>
        <input
          name="date_of_birth"
          type="date"
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          プロフィール画像
        </label>
        <input
          name="avatar"
          type="file"
          accept="image/*"
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-600 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-full bg-zinc-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {loading ? "登録中..." : "はじめる"}
      </button>
    </form>
  );
}
