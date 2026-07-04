import Link from "next/link";

export function RegisterRedirectLink() {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link
        href="/register"
        className="font-medium text-primary underline-offset-2 hover:underline"
      >
        Create new account
      </Link>
    </p>
  );
}
