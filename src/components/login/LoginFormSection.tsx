import { LoginHeader } from "@/src/components/login/LoginHeader";
import { SocialAuthButton } from "@/src/components/shared/SocialAuthButton";
import { OrDivider } from "@/src/components/shared/OrDivider";
import { LoginForm } from "@/src/components/login/LoginForm";
import { RegisterRedirectLink } from "@/src/components/login/RegisterRedirectLink";

export function LoginFormSection() {
  return (
    <div className="w-full max-w-[416px] bg-white p-[48px] rounded-md">
      <div className="space-y-[10px]">
        <LoginHeader />
        <SocialAuthButton label="Sign in with Google" />
        <OrDivider />
        <LoginForm />
        <RegisterRedirectLink />
      </div>
    </div>
  );
}
