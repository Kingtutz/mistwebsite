"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, checkPassword, isAdmin, sessionToken } from "@/lib/admin-auth";
import { MENU_TAG, writeMenu } from "@/lib/menu-store";
import type { MenuTab } from "@/lib/mist";

export async function login(_prev: string | null, formData: FormData) {
    if (!process.env.ADMIN_PASSWORD) return "ADMIN_PASSWORD is not set on the server.";
    if (!checkPassword(String(formData.get("password") ?? ""))) return "Wrong password.";

    (await cookies()).set(SESSION_COOKIE, sessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/admin");
}

export async function logout() {
    (await cookies()).delete(SESSION_COOKIE);
    redirect("/admin");
}

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Keeps only the fields we expect and drops items without a name.
function clean(input: unknown): MenuTab[] {
    if (!Array.isArray(input)) throw new Error("Invalid menu");
    return input.map((tab, i) => ({
        id: text(tab?.id) || `tab-${i}`,
        label: text(tab?.label) || "Untitled",
        sections: (Array.isArray(tab?.sections) ? tab.sections : []).map((section: unknown) => {
            const s = section as { title?: unknown; items?: unknown };
            return {
                title: text(s?.title),
                items: (Array.isArray(s?.items) ? s.items : [])
                    .map((item: { name?: unknown; description?: unknown; price?: unknown }) => ({
                        name: text(item?.name),
                        description: text(item?.description) || undefined,
                        price: text(item?.price),
                    }))
                    .filter((item: { name: string }) => item.name),
            };
        }),
    }));
}

export async function saveMenu(menu: MenuTab[]) {
    if (!(await isAdmin())) return { ok: false, message: "You are logged out. Reload and log in again." };
    try {
        await writeMenu(clean(menu));
    } catch (err) {
        console.error(err);
        return { ok: false, message: "Could not save. Is the database connected?" };
    }
    updateTag(MENU_TAG);
    return { ok: true, message: "Saved — the live menu is updated." };
}
