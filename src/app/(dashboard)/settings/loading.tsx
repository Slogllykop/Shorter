import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton loading state for the settings page. Mirrors the settings layout. */
export default function SettingsLoading() {
    return (
        <div className="flex min-h-dvh flex-col bg-black">
            {/* Header skeleton */}
            <header className="border-border/40 border-b">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Skeleton className="size-[30px] rounded-sm bg-white/10" />
                        <Skeleton className="h-6 w-20 bg-white/10" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Skeleton className="hidden h-4 w-32 bg-white/10 sm:block" />
                        <Skeleton className="h-8 w-8 rounded-md bg-white/10 sm:w-24" />
                        <Skeleton className="h-8 w-8 rounded-md bg-white/10 sm:w-24" />
                    </div>
                </div>
            </header>

            {/* Settings content skeleton */}
            <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">
                <div className="mb-8">
                    <Skeleton className="mb-4 h-4 w-28 bg-white/10" />
                    <Skeleton className="mb-2 h-9 w-32 bg-white/10 sm:h-10" />
                    <Skeleton className="h-5 w-64 bg-white/10" />
                </div>

                {/* Card skeleton */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                    <Skeleton className="mb-3 h-6 w-48 bg-white/10" />
                    <Skeleton className="mb-8 h-4 w-72 bg-white/10" />

                    {/* Add email form skeleton */}
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-24 bg-white/10" />
                            <Skeleton className="h-10 w-full rounded-md bg-white/10" />
                        </div>
                        <Skeleton className="h-10 w-full rounded-md bg-white/10 sm:w-24" />
                    </div>

                    {/* Email list skeleton */}
                    <div className="space-y-0 overflow-hidden rounded-md border border-zinc-800">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border-zinc-800 border-b p-4 last:border-b-0"
                            >
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-48 bg-white/10" />
                                    <Skeleton className="h-3 w-24 bg-white/10" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
