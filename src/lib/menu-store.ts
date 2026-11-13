// Where the live menu is stored: an Upstash Redis database (connected in
// Vercel → Storage). Without one, the site falls back to the menu in mist.ts.
import { cacheLife, cacheTag } from "next/cache";
import { menu as defaultMenu, type MenuTab } from "@/lib/mist";

const KEY = "mist:menu";
export const MENU_TAG = "menu";

// Vercel's Upstash integration uses either naming, depending on how it was added.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const hasDatabase = Boolean(url && token);

async function redis(command: string[]) {
    const res = await fetch(url!, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(command),
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Redis ${command[0]} failed: ${res.status}`);
    return (await res.json()).result as string | null;
}

// Cached until the admin saves (saveMenu clears the "menu" tag).
export async function getMenu(): Promise<MenuTab[]> {
    "use cache";
    cacheTag(MENU_TAG);
    cacheLife("max");

    if (!hasDatabase) return defaultMenu;
    try {
        const stored = await redis(["GET", KEY]);
        return stored ? (JSON.parse(stored) as MenuTab[]) : defaultMenu;
    } catch (err) {
        console.error(err);
        return defaultMenu;
    }
}

export async function writeMenu(menu: MenuTab[]) {
    if (!hasDatabase) throw new Error("No database connected");
    await redis(["SET", KEY, JSON.stringify(menu)]);
}
