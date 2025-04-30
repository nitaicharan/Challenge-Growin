import { z } from "zod";

export const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInRequestBody = z.infer<typeof authSchema>;

export type SignInResponse = {
  access_token: string;
};
