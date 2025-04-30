"use server";

import { createUser } from "@/http/apis/user/create-user";
import type { CreateUserRequestBody } from "@/http/models/user.model";
import { HTTPError } from "ky";

export async function signUpAction(data: CreateUserRequestBody) {
  try {
    await createUser(data);

    return {
      ok: true,
      message: "Success",
    };
  } catch (err) {
    if (!(err instanceof HTTPError)) {
      return {
        ok: false,
        message: "Error",
      };
    }

    const { message } = await err.response.json();

    return {
      ok: false,
      message,
    };
  }
}
