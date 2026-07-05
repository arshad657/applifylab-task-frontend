"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../lib/validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../shared/AuthContext";
import { useRegisterMutation } from "../../redux/api/authApi";
import { handleError } from "../../lib/handleError";

export function useRegisterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const [registerApi] = useRegisterMutation();

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
    try {
      const { email, firstName, lastName, password } = values;
      const response = await registerApi({ email, firstName, lastName, password }).unwrap();

      setIsSuccess(true);

      // Save session inside AuthContext
      const { user, tokens } = response.data;
      login(tokens.accessToken, tokens.refreshToken, user);
    } catch (error: any) {
      const errMsg = handleError(error);
      const errorJson = error?.data || {};

      if (errorJson.errors) {
        for (const [field, message] of Object.entries(errorJson.errors)) {
          form.setError(field as any, {
            type: "server",
            message: message as string,
          });
        }
      }
    }
  });

  return {
    form,
    onSubmit,
    isSuccess,
    isSubmitting: form.formState.isSubmitting,
  };
}
