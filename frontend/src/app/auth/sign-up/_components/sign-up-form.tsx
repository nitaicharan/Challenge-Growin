"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  createUserSchema,
  type CreateUserRequestBody,
} from "@/http/models/user.model";
import { signUpAction } from "@/http/actions/auth/sign-up-action";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserRequestBody>({
    resolver: zodResolver(createUserSchema),
  });

  async function handleSubmitFunction(data: CreateUserRequestBody) {
    const res = await signUpAction(data);

    if (res.ok) {
      toast.success(res.message);
      push("/auth/sign-in");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFunction)}
      className="flex flex-col gap-5 border p-5 rounded-md"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} type="text" id="email" />
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} type="text" id="name" />
            {errors.name?.message && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-full">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              {...register("licenseNumber")}
              type="text"
              minLength={16}
              maxLength={16}
              id="licenseNumber"
            />
            {errors.licenseNumber?.message && (
              <span className="text-xs text-red-500">
                {errors.licenseNumber.message}
              </span>
            )}
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="licenseValidUntil">License Valid Until</Label>
            <Input
              {...register("licenseValidUntil")}
              type="date"
              id="licenseValidUntil"
            />
            {errors.licenseValidUntil?.message && (
              <span className="text-xs text-red-500">
                {errors.licenseValidUntil.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input {...register("password")} type="password" id="password" />
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
            />
            {errors.confirmPassword?.message && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/auth/sign-in">Back</Link>
        </Button>

        <Button
          type="submit"
          className="cursor-pointer flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {!isSubmitting && "Sign up"}
        </Button>
      </div>
    </form>
  );
}
