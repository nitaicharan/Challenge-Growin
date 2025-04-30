"use client";

import { authSchema, type SignInRequestBody } from "@/http/models/auth.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/http/actions/auth/sign-in-action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInRequestBody>({
    resolver: zodResolver(authSchema),
  });

  async function handleSubmitFunction(data: SignInRequestBody) {
    const res = await signInAction(data);

    if (!res.ok) return toast.error(res.message);

    toast.success(res.message);
    return push("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFunction)}
      className="flex flex-col gap-5 border p-5 rounded-md"
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} type="text" id="email" />
          {errors.email?.message && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} type="password" id="password" />
          {errors.password?.message && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {!isSubmitting && "Sign in"}
        </Button>

        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </div>
    </form>
  );
}
