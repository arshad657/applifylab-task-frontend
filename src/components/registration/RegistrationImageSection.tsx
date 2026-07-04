import Image from "next/image";

/**
 * Mirrors the original template's large illustrative image column
 * (registration.png / registration1.png light & dark variants).
 * Uses a royalty-free stock photo as a stand-in for the original artwork.
 */
export function RegistrationImageSection() {
  return (
    <div className="relative hidden h-full min-h-[640px] w-full overflow-hidden rounded-3xl lg:block">
      <Image
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        alt="People connecting and collaborating together"
        fill
        priority
        sizes="(min-width: 1024px) 55vw, 0px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-10 text-white">
        <p className="text-sm font-medium uppercase tracking-wide text-white/80">
          Buddy Script
        </p>
        <h2 className="mt-2 max-w-sm text-2xl font-semibold leading-snug">
          Join a community built for real connection.
        </h2>
      </div>
    </div>
  );
}
