import { getProfile } from "@/http/apis/auth/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated() {
  const cookieStore = await cookies();

  return !!cookieStore.get("access_token")?.value;
}

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const data = await getProfile();

    return {
      user: data,
    };
  } catch {}

  redirect("/api/auth/sign-out");
}
