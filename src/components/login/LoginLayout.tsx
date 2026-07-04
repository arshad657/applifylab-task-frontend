import { DecorativeShapes } from "@/src/components/shared/DecorativeShapes";
import { LoginFormSection } from "@/src/components/login/LoginFormSection";
import LoginImage from "@/src/assets/images/auth/login.png";
import Image from "next/image";

export function LoginLayout() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <DecorativeShapes />

      <div className="flex items-center h-[calc(100vh-2px)]">
        <div className="containers relative z-10 flex flex-col md:flex-row gap-20 items-center justify-center">
          <Image
            src={LoginImage}
            alt="Buddy Script"
            className="mx-auto max-w-[633px]"
          />
          <LoginFormSection />
        </div>
      </div>
    </section>
  );
}
