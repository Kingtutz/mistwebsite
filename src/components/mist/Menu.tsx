"use client";

import { useState } from "react";
import type { MenuTab } from "@/lib/mist";

// Tabs come from the page, which loads them from the menu store (editable at /admin).
const Menu = ({ menu }: { menu: MenuTab[] }) => {
    const [activeId, setActiveId] = useState(menu[0].id);
    const active = menu.find((tab) => tab.id === activeId) ?? menu[0];

    return (
        <section
            id="menu"
            className="scroll-mt-16 bg-mist-bg px-4 py-24 text-mist-text">
            <div className="mx-auto max-w-2xl">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm uppercase tracking-widest">
                    {menu.map((tab, i) => (
                        <span key={tab.id} className="flex items-center gap-4">
                            {i > 0 && (
                                <span className="text-mist-muted">/</span>
                            )}
                            <button
                                type="button"
                                onClick={() => setActiveId(tab.id)}
                                className={
                                    tab.id === activeId
                                        ? "text-mist-accent underline underline-offset-8"
                                        : "text-mist-muted hover:text-mist-text"
                                }>
                                {tab.label}
                            </button>
                        </span>
                    ))}
                </div>

                <div className="mt-16 space-y-14">
                    {active.sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="border-b border-mist-line pb-2 text-xs uppercase tracking-widest text-mist-muted">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-4">
                                {section.items.map((item) => (
                                    <li
                                        key={item.name}
                                        className="flex items-baseline justify-between gap-6">
                                        <div>
                                            <span className="font-display text-xl font-light tracking-wide text-mist-text/80">
                                                {item.name}
                                            </span>
                                            {item.description && (
                                                <span className="ml-2 text-sm text-mist-muted">
                                                    {item.description}
                                                </span>
                                            )}
                                        </div>
                                        <span className="shrink-0 text-mist-accent">
                                            {item.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Menu;
