import {
  getUserProfileShowUrl,
  getUserProfileCreateUrl,
} from "@/lib/api/default/default";
import type {
  UserProfileModelUserProfile,
  UserProfileModelCreateUserProfileRequest,
} from "@/lib/api/calisthenicsWorkout.schemas";

export type { UserProfileModelUserProfile as UserProfile };
export type { UserProfileModelCreateUserProfileRequest as CreateUserProfileRequest };

const BACKEND_URL = `http://localhost:${process.env.BACKEND_PORT ?? 3001}`;

function internalHeaders(userId: string): HeadersInit {
  return {
    "X-Internal-Secret": process.env.INTERNAL_SECRET!,
    "X-User-Id": userId,
  };
}

export async function getUserProfile(
  userId: string,
): Promise<UserProfileModelUserProfile | null> {
  const res = await fetch(`${BACKEND_URL}${getUserProfileShowUrl()}`, {
    headers: internalHeaders(userId),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}

export async function createUserProfile(
  userId: string,
  data: UserProfileModelCreateUserProfileRequest,
  avatar?: File,
): Promise<UserProfileModelUserProfile> {
  const formData = new FormData();
  formData.append("user_profile[last_name]", data.last_name);
  formData.append("user_profile[first_name]", data.first_name);
  if (data.height != null) formData.append("user_profile[height]", String(data.height));
  if (data.weight != null) formData.append("user_profile[weight]", String(data.weight));
  if (data.date_of_birth) formData.append("user_profile[date_of_birth]", data.date_of_birth);
  if (avatar) formData.append("user_profile[avatar]", avatar);

  const res = await fetch(`${BACKEND_URL}${getUserProfileCreateUrl()}`, {
    method: "POST",
    headers: internalHeaders(userId),
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.errors?.join(", ") ?? "Failed to create user profile");
  }
  return res.json();
}
