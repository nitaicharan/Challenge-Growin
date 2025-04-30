import { api } from "@/http/api-client";
import type { CreateUserRequestBody, User } from "@/http/models/user.model";

export async function createUser(body: CreateUserRequestBody): Promise<User> {
  return await api
    .post("users", {
      json: {
        name: body.name,
        email: body.email,
        password: body.password,
        licenseNumber: body.licenseNumber,
        licenseValidUntil: body.licenseValidUntil,
      },
    })
    .json();
}
