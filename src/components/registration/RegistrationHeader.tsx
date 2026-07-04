import Logo from "@/src/assets/icons/Logo";

export function RegistrationHeader() {
  return (
    <div className="mb-12 text-center">
      <div className="mb-7 mx-auto w-fit">
        <Logo />
      </div>
      <p className="mb-1 font-normal text-color1">Get started now</p>
      <h1 className="text-[28px] font-medium tracking-tight text-color2">
        Registration
      </h1>
    </div>
  );
}
