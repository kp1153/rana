import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const SANITY_EMAIL = process.env.SANITY_AUTH_EMAIL;
    const SANITY_PASSWORD = process.env.SANITY_AUTH_PASSWORD;

    if (email === SANITY_EMAIL && password === SANITY_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json({ error: "गलत ईमेल या पासवर्ड" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "सर्वर एरर" }, { status: 500 });
  }
}
