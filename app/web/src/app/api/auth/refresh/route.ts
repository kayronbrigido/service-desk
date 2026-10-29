import { refreshtoken } from "@src/http/auth-refresh.service";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!refresh_token) {
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await refreshtoken(refresh_token)

  if (response.expired) {
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    return Response.json({ ok: true });
  }
  
  if (response.access_token) {
    cookieStore.set("access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: response.expires_in,
    });
  }

  if (response.refresh_token) {
    cookieStore.set("refresh_token", response.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }



  return Response.json({ ok: true });
}