// Simple password login for /admin. The password is the ADMIN_PASSWORD
// environment variable; changing it logs everyone out.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "mist_admin";

const sign = (value: string) =>
    createHmac("sha256", process.env.ADMIN_PASSWORD ?? "").update(value).digest("hex");

const same = (a: string, b: string) => {
    const x = Buffer.from(sign(a));
    const y = Buffer.from(sign(b));
    return timingSafeEqual(x, y);
};

export const sessionToken = () => sign("mist-admin-session");

export const checkPassword = (password: string) =>
    Boolean(process.env.ADMIN_PASSWORD) && same(password, process.env.ADMIN_PASSWORD!);

export async function isAdmin() {
    if (!process.env.ADMIN_PASSWORD) return false;
    const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
    return Boolean(cookie) && same(cookie!, sessionToken());
}
