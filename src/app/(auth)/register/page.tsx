import type { Metadata } from "next";
import { RegistrationLayout } from "@/src/components/registration/RegistrationLayout";

export const metadata: Metadata = {
  title: "Create an account | Buddy Script",
  description: "Sign up for Buddy Script in seconds with email or Google.",
};

export default function RegisterPage() {
  return <RegistrationLayout />;
}
