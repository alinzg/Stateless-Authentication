import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
import { decrypt } from "./session";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userEmail) {
    redirect("/login");
  }

  return { isAuth: true, userEmail: session.userEmail };
});
