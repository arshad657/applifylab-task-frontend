import { DecorativeShapes } from "@/src/components/shared/DecorativeShapes";
import { RegistrationFormSection } from "@/src/components/registration/RegistrationFormSection";
import RegistrationImage from "@/src/assets/images/auth/registration.png";
import Image from "next/image";

export function RegistrationLayout() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <DecorativeShapes />

      <div className="flex items-end h-[calc(100vh-2px)]">
        <div className="containers relative z-10 flex flex-col md:flex-row items-center justify-end">
          <Image
            src={RegistrationImage}
            alt="Buddy Script"
            className="mx-auto max-w-[856px]"
          />
          <RegistrationFormSection />
        </div>
      </div>
    </section>
  );
}
