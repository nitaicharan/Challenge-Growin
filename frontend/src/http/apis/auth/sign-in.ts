import { api } from "@/http/api-client";
import type {
  SignInRequestBody,
  SignInResponse,
} from "@/http/models/auth.model";

export async function signIn(body: SignInRequestBody): Promise<SignInResponse> {
  return await api
    .post("auth/sign-in", {
      json: body,
    })
    .json();
}
