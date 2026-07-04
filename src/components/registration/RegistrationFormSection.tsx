import { RegistrationHeader } from "@/src/components/registration/RegistrationHeader";
import { SocialAuthButton } from "@/src/components/shared/SocialAuthButton";
import { OrDivider } from "@/src/components/shared/OrDivider";
import { RegistrationForm } from "@/src/components/registration/RegistrationForm";
import { LoginRedirectLink } from "@/src/components/registration/LoginRedirectLink";

export function RegistrationFormSection() {
  return (
    <div className="w-full max-w-[416px] h-[900px] bg-white p-[48px] rounded-md">
      <div className="space-y-[10px]">
        <RegistrationHeader />
        <SocialAuthButton label="Register with Google" />
        <OrDivider />
        <RegistrationForm />
        <LoginRedirectLink />
      </div>
    </div>
  );
}
