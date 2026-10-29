import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { access_token, refresh_token, expires_in } = await req.json();

  const cookieStore = await cookies();

  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: expires_in,
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return Response.json({ ok: true });
}
