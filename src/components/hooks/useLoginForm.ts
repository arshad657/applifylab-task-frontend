"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues } from "../lib/validations/loginSchema";
import { LoginApiResponse } from "../types/auth";

export function useLoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LoginFormValues>({
    // resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: LoginApiResponse = await res.json();

      if (!data.success) {
        if (data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors)) {
            if (messages?.[0]) {
              form.setError(field as keyof LoginFormValues, {
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
