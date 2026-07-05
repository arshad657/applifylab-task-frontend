"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../lib/validations/loginSchema";
import { useAuth } from "../shared/AuthContext";
import { useLoginMutation } from "../../redux/api/authApi";
import { handleError } from "../../lib/handleError";

export function useLoginForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const [loginApi] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await loginApi({
        email: values.email,
        password: values.password,
      }).unwrap();

      setIsSuccess(true);

      // Save session inside AuthContext (synced to Redux store)
      const { user, tokens } = response.data;
      login(tokens.accessToken, tokens.refreshToken, user);
    } catch (error: any) {
      handleError(error);
    }
  });

  return {
    form,
    onSubmit,
    isSuccess,
    isSubmitting: form.formState.isSubmitting,
  };
}
