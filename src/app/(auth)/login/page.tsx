import type { Metadata } from "next";
import { LoginLayout } from "@/src/components/login/LoginLayout";

export const metadata: Metadata = {
  title: "Log in | Buddy Script",
  description: "Log in to your Buddy Script account with email or Google.",
};

export default function LoginPage() {
  return <LoginLayout />;
}
