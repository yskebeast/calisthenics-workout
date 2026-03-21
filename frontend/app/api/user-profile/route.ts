import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  createUserProfile,
  type CreateUserProfileRequest,
} from "@/lib/rails-api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();

  const body: CreateUserProfileRequest = {
    last_name: formData.get("last_name") as string,
    first_name: formData.get("first_name") as string,
  };

  const height = formData.get("height");
  if (height) body.height = Number(height);

  const weight = formData.get("weight");
  if (weight) body.weight = Number(weight);

  const date_of_birth = formData.get("date_of_birth");
  if (date_of_birth) body.date_of_birth = date_of_birth as string;

  const avatar = formData.get("avatar");

  try {
    const profile = await createUserProfile(
      session.user.id,
      body,
      avatar instanceof File && avatar.size > 0 ? avatar : undefined,
    );
    return NextResponse.json(profile, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 422 });
  }
}
