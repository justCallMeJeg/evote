import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = ":>";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 mins from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData, voterID: number) {
  // Verify credentials && get the user
  const voter = { voterName: formData.get("voterName"), voterID: voterID };

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ voter, expires });

  // Save the session in a cookie
  (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires instanceof Date ? parsed.expires : new Date(parsed.expires as string | number),
  });
  return res;
}
