"use server";

import { signIn } from "@/http/apis/auth/sign-in";
import type { SignInRequestBody } from "@/http/models/auth.model";
import { HTTPError } from "ky";
import { cookies } from "next/headers";

export async function signInAction(data: SignInRequestBody) {
  try {
    const { access_token } = await signIn(data);

    const cookieStore = await cookies();

    cookieStore.set("access_token", access_token, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return {
      ok: true,
      message: "Success",
    };
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return {
        ok: false,
        message,
      };
    }

    return {
      ok: false,
      message: "Error",
    };
  }
}
