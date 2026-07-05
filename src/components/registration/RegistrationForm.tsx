"use client";

import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { FormField } from "@/src/components/shared/FormField";
import { PasswordInput } from "@/src/components/shared/PasswordInput";
import { TermsCheckbox } from "@/src/components/registration/TermsCheckbox";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RegistrationForm() {
  const router = useRouter();
  const { form, onSubmit, isSuccess, isSubmitting } =
    useRegisterForm();

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (isSuccess) {
      router.push("/feed");
    }
  }, [isSuccess, router])


  const agreeToTerms = watch("agreeToTerms");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField id="firstName" label="First Name" error={errors.firstName?.message}>
          <Input
            id="firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
          />
        </FormField>

        <FormField id="lastName" label="Last Name" error={errors.lastName?.message}>
          <Input
            id="lastName"
            type="text"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
          />
        </FormField>
      </div>

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

      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
      >
        <PasswordInput
          id="password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>

      <FormField
        id="confirmPassword"
        label="Repeat password"
        error={errors.confirmPassword?.message}
      >
        <PasswordInput
          id="confirmPassword"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          {...register("confirmPassword")}
        />
      </FormField>

      <TermsCheckbox control={control} errors={errors} />

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 text-base"
        disabled={isSubmitting || !agreeToTerms}
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
