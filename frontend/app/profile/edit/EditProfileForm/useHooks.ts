"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserProfile } from "@/lib/rails-api";

export function useEditProfileForm(profile: UserProfile) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/user-profile", {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      router.push("/profile");
      router.refresh();
    } else {
      const body = await res.json();
      setError(body.error ?? "更新に失敗しました");
    }

    setLoading(false);
  }

  return { profile, error, loading, handleSubmit };
}
