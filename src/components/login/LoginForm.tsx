"use client";

import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "../ui/input";
import { FormField } from "@/src/components/shared/FormField";
import { PasswordInput } from "@/src/components/shared/PasswordInput";
import { RememberMeAndForgotPassword } from "@/src/components/login/RememberMeAndForgotPassword";
import { useLoginForm } from "../hooks/useLoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { form, onSubmit, isSuccess, isSubmitting } = useLoginForm();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (isSuccess) {
      router.push("/feed");
    }
  }, [isSuccess, router])

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>

      <FormField id="password" label="Password" error={errors.password?.message}>
        <PasswordInput
          id="password"
          autoComplete="password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>

      <RememberMeAndForgotPassword control={control} />

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 text-base"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {isSubmitting ? "Logging in..." : "Login now"}
      </Button>
    </form>
  );
}
