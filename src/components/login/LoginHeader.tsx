import Logo from "@/src/assets/icons/Logo";

export function LoginHeader() {
  return (
    <div className="mb-12 text-center">
      <div className="mb-7 mx-auto w-fit">
        <Logo />
      </div>
      <p className="mb-1 font-normal text-color1">Welcome back</p>
      <h1 className="text-[28px] font-medium tracking-tight text-color2">
        Login to your account
      </h1>
    </div>
  );
}
