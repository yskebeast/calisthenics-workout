"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function useChangePasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("current_password") as string;
    const newPassword = formData.get("new_password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (newPassword !== confirmPassword) {
      setError("新しいパスワードが一致しません");
      setLoading(false);
      return;
    }

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
    });

    if (error) {
      setError(error.message ?? "パスワードの変更に失敗しました");
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }

    setLoading(false);
  }

  return { error, success, loading, handleSubmit };
}
