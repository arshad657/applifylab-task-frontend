"use client";

import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "../ui/input";
import { FormField } from "@/src/components/shared/FormField";
import { PasswordInput } from "@/src/components/shared/PasswordInput";
import { RememberMeAndForgotPassword } from "@/src/components/login/RememberMeAndForgotPassword";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const { form, onSubmit, serverError, isSuccess, isSubmitting } = useLoginForm();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  if (isSuccess) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-md border border-success/30 bg-success/10 p-6 text-center"
      >
        <CheckCircle2 className="h-9 w-9 text-success" aria-hidden="true" />
        <p className="font-medium text-foreground">You&apos;re logged in</p>
        <p className="text-sm text-muted-foreground">
          Taking you to your dashboard...
        </p>
      </div>
    );
  }

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
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>

      <RememberMeAndForgotPassword control={control} />

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

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
