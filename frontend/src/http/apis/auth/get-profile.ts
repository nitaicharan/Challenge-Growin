import { api } from "@/http/api-client";
import type { User } from "@/http/models/user.model";

export async function getProfile(): Promise<User> {
  return await api
    .get("auth/profile", {
      next: {
        tags: ["profile"],
      },
      cache: "force-cache",
    })
    .json();
}
