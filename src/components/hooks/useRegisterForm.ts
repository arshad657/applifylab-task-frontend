"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../lib/validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterApiResponse } from "../types/auth";

export function useRegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: RegisterApiResponse = await res.json();

      if (!data.success) {
        if (data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors)) {
            if (messages?.[0]) {
              form.setError(field as keyof RegisterFormValues, {
                type: "server",
                message: messages[0],
              });
            }
          }
        }
        setServerError(data.message);
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  });

  return {
    form,
    onSubmit,
    serverError,
    isSuccess,
    isSubmitting: form.formState.isSubmitting,
  };
}
