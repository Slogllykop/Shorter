"use client";

import { useRedirect } from "@/hooks/use-redirect";

type RedirectClientProps = {
    slug: string;
};

/**
 * Client component for the redirect page.
 * Uses the useRedirect hook for all fetching, tracking, and navigation logic.
 */
export function RedirectClient({ slug }: RedirectClientProps) {
    const { error } = useRedirect(slug);

    if (error) {
        return (
            <div className="flex flex-col items-center gap-4 px-6 text-center">
                <div className="rounded-full bg-red-500/10 p-4">
                    <svg
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <div role="alert">
                    <h2 className="font-semibold text-white text-xl">
                        Redirect stuck
                    </h2>
                    <p className="mt-2 text-white/70">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section
            className="flex flex-col items-center gap-6"
            aria-label="Loading destination"
        >
            <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 animate-spin rounded-full border-white border-t-4 border-l-4" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h2 className="font-semibold text-white text-xl">
                    Just a moment, taking you there
                </h2>
            </div>
        </section>
    );
}
