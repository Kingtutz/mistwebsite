"use client";

import { useActionState } from "react";
import { login } from "./actions";

const LoginForm = () => {
    const [error, action, pending] = useActionState(login, null);

    return (
        <form action={action} className="mt-10 space-y-4">
            <label className="block text-xs uppercase tracking-widest text-mist-muted">
                Password
                <input
                    type="password"
                    name="password"
                    required
                    autoFocus
                    className="mt-2 block w-full border border-mist-line bg-transparent px-3 py-2 text-base text-mist-text outline-none focus:border-mist-accent"
                />
            </label>
            {error && <p className="text-sm text-red-300">{error}</p>}
            <button
                type="submit"
                disabled={pending}
                className="border border-mist-accent px-6 py-2 text-sm uppercase tracking-widest text-mist-accent hover:bg-mist-accent hover:text-mist-bg disabled:opacity-50">
                {pending ? "Logging in…" : "Log in"}
            </button>
        </form>
    );
};

export default LoginForm;
