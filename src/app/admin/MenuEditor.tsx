"use client";

import { useState, useTransition } from "react";
import type { MenuItem, MenuSection, MenuTab } from "@/lib/mist";
import { saveMenu } from "./actions";

const input =
    "w-full border border-mist-line bg-transparent px-2 py-1.5 text-mist-text outline-none focus:border-mist-accent";
const smallButton = "px-2 text-mist-muted hover:text-mist-accent disabled:opacity-30";

// Returns a copy of the list with item i moved by `by` (-1 = up, 1 = down).
function move<T>(list: T[], i: number, by: number) {
    const next = [...list];
    const j = i + by;
    if (j < 0 || j >= next.length) return next;
    [next[i], next[j]] = [next[j], next[i]];
    return next;
}

const MenuEditor = ({ initialMenu }: { initialMenu: MenuTab[] }) => {
    const [menu, setMenu] = useState(initialMenu);
    const [activeIndex, setActiveIndex] = useState(0);
    const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
    const [dirty, setDirty] = useState(false);
    const [saving, startSaving] = useTransition();

    const tab = menu[activeIndex];

    const update = (fn: (tab: MenuTab) => MenuTab) => {
        setMenu((m) => m.map((t, i) => (i === activeIndex ? fn(t) : t)));
        setDirty(true);
        setStatus(null);
    };
    const setSections = (fn: (sections: MenuSection[]) => MenuSection[]) =>
        update((t) => ({ ...t, sections: fn(t.sections) }));
    const setSection = (s: number, fn: (section: MenuSection) => MenuSection) =>
        setSections((sections) => sections.map((sec, i) => (i === s ? fn(sec) : sec)));
    const setItems = (s: number, fn: (items: MenuItem[]) => MenuItem[]) =>
        setSection(s, (sec) => ({ ...sec, items: fn(sec.items) }));
    const setItem = (s: number, n: number, patch: Partial<MenuItem>) =>
        setItems(s, (items) => items.map((it, i) => (i === n ? { ...it, ...patch } : it)));

    const save = () =>
        startSaving(async () => {
            const result = await saveMenu(menu);
            setStatus(result);
            if (result.ok) setDirty(false);
        });

    return (
        <div className="mt-10 pb-24">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-widest">
                {menu.map((t, i) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={
                            i === activeIndex
                                ? "text-mist-accent underline underline-offset-8"
                                : "text-mist-muted hover:text-mist-text"
                        }>
                        {t.label || "Untitled"}
                    </button>
                ))}
            </div>

            <label className="mt-8 block text-xs uppercase tracking-widest text-mist-muted">
                Tab name
                <input
                    className={`${input} mt-2 text-base normal-case tracking-normal`}
                    value={tab.label}
                    onChange={(e) => update((t) => ({ ...t, label: e.target.value }))}
                />
            </label>

            <div className="mt-10 space-y-12">
                {tab.sections.map((section, s) => (
                    <fieldset key={s} className="border border-mist-line p-4">
                        <div className="flex items-center gap-2">
                            <input
                                className={`${input} text-xs uppercase tracking-widest`}
                                value={section.title}
                                placeholder="Section title"
                                aria-label="Section title"
                                onChange={(e) => setSection(s, (sec) => ({ ...sec, title: e.target.value }))}
                            />
                            <button
                                type="button"
                                className={smallButton}
                                title="Delete section"
                                onClick={() => {
                                    if (confirm(`Delete the section "${section.title}" and all its items?`))
                                        setSections((secs) => secs.filter((_, i) => i !== s));
                                }}>
                                ✕
                            </button>
                        </div>

                        <ul className="mt-4 space-y-4">
                            {section.items.map((item, n) => (
                                <li key={n} className="grid grid-cols-[1fr_5rem_auto] gap-2 sm:grid-cols-[1fr_1.5fr_5rem_auto]">
                                    <input
                                        className={`${input} font-display text-lg`}
                                        value={item.name}
                                        placeholder="Name"
                                        aria-label="Name"
                                        onChange={(e) => setItem(s, n, { name: e.target.value })}
                                    />
                                    <input
                                        className={`${input} col-span-3 row-start-2 text-sm sm:col-span-1 sm:row-start-auto`}
                                        value={item.description ?? ""}
                                        placeholder="Description (optional)"
                                        aria-label="Description"
                                        onChange={(e) => setItem(s, n, { description: e.target.value })}
                                    />
                                    <input
                                        className={`${input} text-mist-accent`}
                                        value={item.price}
                                        placeholder="Price"
                                        aria-label="Price"
                                        onChange={(e) => setItem(s, n, { price: e.target.value })}
                                    />
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            className={smallButton}
                                            title="Move up"
                                            disabled={n === 0}
                                            onClick={() => setItems(s, (items) => move(items, n, -1))}>
                                            ↑
                                        </button>
                                        <button
                                            type="button"
                                            className={smallButton}
                                            title="Move down"
                                            disabled={n === section.items.length - 1}
                                            onClick={() => setItems(s, (items) => move(items, n, 1))}>
                                            ↓
                                        </button>
                                        <button
                                            type="button"
                                            className={smallButton}
                                            title="Delete item"
                                            onClick={() => setItems(s, (items) => items.filter((_, i) => i !== n))}>
                                            ✕
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            className="mt-4 text-sm text-mist-muted hover:text-mist-accent"
                            onClick={() => setItems(s, (items) => [...items, { name: "", price: "" }])}>
                            + Add item
                        </button>
                    </fieldset>
                ))}
            </div>

            <button
                type="button"
                className="mt-8 text-sm text-mist-muted hover:text-mist-accent"
                onClick={() => setSections((secs) => [...secs, { title: "", items: [{ name: "", price: "" }] }])}>
                + Add section
            </button>

            {/* Save bar stays at the bottom of the screen while editing */}
            <div className="fixed inset-x-0 bottom-0 border-t border-mist-line bg-mist-bg/95 px-4 py-3 backdrop-blur-sm">
                <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
                    <p className={`text-sm ${status && !status.ok ? "text-red-300" : "text-mist-muted"}`}>
                        {status?.message ?? (dirty ? "Unsaved changes" : "All changes saved")}
                    </p>
                    <button
                        type="button"
                        onClick={save}
                        disabled={saving || !dirty}
                        className="border border-mist-accent px-6 py-2 text-sm uppercase tracking-widest text-mist-accent hover:bg-mist-accent hover:text-mist-bg disabled:opacity-40">
                        {saving ? "Saving…" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuEditor;
