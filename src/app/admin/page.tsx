import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { isAdmin } from "@/lib/admin-auth";
import { getMenu, hasDatabase } from "@/lib/menu-store";
import LoginForm from "./LoginForm";
import MenuEditor from "./MenuEditor";
import { logout } from "./actions";

export const metadata: Metadata = {
    title: "Admin — Mist",
    robots: { index: false, follow: false },
};

const AdminPage = () => {
    return (
        <main className="min-h-svh bg-mist-bg px-4 py-12 text-mist-text">
            <div className="mx-auto max-w-2xl">
                <h1 className="font-display text-3xl uppercase tracking-[0.3em]">Mist admin</h1>
                <Suspense fallback={<p className="mt-10 text-mist-muted">Loading…</p>}>
                    <AdminContent />
                </Suspense>
            </div>
        </main>
    );
};

async function AdminContent() {
    if (!(await isAdmin())) return <LoginForm />;

    const menu = await getMenu();
    return (
        <>
            <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <Link href="/#menu" className="text-mist-muted hover:text-mist-accent">
                    ← View site
                </Link>
                <form action={logout}>
                    <button type="submit" className="text-mist-muted hover:text-mist-accent">
                        Log out
                    </button>
                </form>
            </div>
            {!hasDatabase && (
                <p className="mt-6 border border-mist-accent/40 p-4 text-sm text-mist-accent">
                    No database connected, so changes can&apos;t be saved yet. Connect Upstash
                    Redis in Vercel → Storage.
                </p>
            )}
            <MenuEditor initialMenu={menu} />
        </>
    );
}

export default AdminPage;
