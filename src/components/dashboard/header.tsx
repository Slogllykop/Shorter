"use client";

import { IconLogout, IconSettings } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

type HeaderProps = {
    email: string;
};

/** Dashboard header with logo, user email, settings link, and sign-out button. */
export function Header({ email }: HeaderProps) {
    const { signOut: signOutUser, isSigningOut: isPending } = useAuth();

    return (
        <header className="border-border/40 border-b">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                {/* Logo + Name */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                        src="/logo.png"
                        alt="Breve Logo"
                        width={30}
                        height={30}
                        className="rounded-sm shadow-md"
                    />
                    <span className="font-semibold text-lg text-white tracking-tight">
                        Breve
                    </span>
                </div>

                {/* Right Side: Email + Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Email - truncated on mobile */}
                    <span
                        className="hidden max-w-[120px] truncate text-sm text-white/44 sm:inline sm:max-w-[200px] md:max-w-none"
                        title={email}
                    >
                        {email}
                    </span>

                    <Link
                        href="/settings"
                        prefetch
                        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-3 text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white sm:gap-2"
                    >
                        <IconSettings className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Settings</span>
                    </Link>

                    <button
                        type="button"
                        onClick={signOutUser}
                        disabled={isPending}
                        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-3 text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white disabled:opacity-50 sm:gap-2"
                    >
                        <IconLogout className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
