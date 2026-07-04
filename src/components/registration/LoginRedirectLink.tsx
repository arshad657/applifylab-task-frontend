import Link from "next/link";

export function LoginRedirectLink() {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-medium text-primary underline-offset-2 hover:underline"
      >
        Log in
      </Link>
    </p>
  );
}
