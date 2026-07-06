import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const hasUser = cookieStore.has("refreshToken");

  if (hasUser) {
    redirect("/feed");
  } else {
    redirect("/login");
  }
}
