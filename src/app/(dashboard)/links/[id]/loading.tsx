import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton loading state for the analytics page. Mirrors the analytics layout. */
export default function AnalyticsLoading() {
    return (
        <div className="min-h-dvh">
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

            <main className="mx-auto max-w-5xl px-6 py-8">
                {/* Back link + Title skeleton */}
                <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Skeleton className="mb-2 h-4 w-24 bg-white/10" />
                        <Skeleton className="mb-1 h-8 w-48 bg-white/10" />
                        <Skeleton className="h-4 w-64 bg-white/10" />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Action bar card skeleton */}
                    <div className="rounded-xl border border-white/10 bg-white/4">
                        <div className="flex flex-col gap-5 p-4 sm:p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="size-16 rounded-xl bg-white/10" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-7 w-40 bg-white/10 sm:h-8" />
                                        <Skeleton className="h-4 w-48 bg-white/10" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-full rounded-md bg-white/10 sm:w-80" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 border-white/8 border-t pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-28 sm:flex-initial" />
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-28 sm:flex-initial" />
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-28 sm:flex-initial" />
                                </div>
                                <div className="flex items-center gap-2 sm:ml-auto">
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-16 sm:flex-initial" />
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-20 sm:flex-initial" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats grid skeleton */}
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/4 p-6 sm:col-span-2">
                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <Skeleton className="h-4 w-24 bg-white/10" />
                                    <Skeleton className="size-8 rounded-full bg-white/10" />
                                </div>
                                <Skeleton className="mt-6 h-12 w-32 bg-white/10 sm:h-14 lg:h-16" />
                                <Skeleton className="mt-2 h-4 w-40 bg-white/10" />
                            </div>
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/4 p-5"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <Skeleton className="h-4 w-20 bg-white/10" />
                                    <Skeleton className="size-8 rounded-full bg-white/10" />
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Skeleton className="h-9 w-24 bg-white/10" />
                                    <Skeleton className="h-5 w-32 bg-white/10" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts skeleton */}
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-1 rounded-xl border border-white/10 bg-white/4 p-6 lg:col-span-2">
                            <Skeleton className="mb-2 h-5 w-32 bg-white/10" />
                            <Skeleton className="mb-4 h-4 w-56 bg-white/10" />
                            <Skeleton className="h-[300px] w-full rounded-lg bg-white/10" />
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/4 p-6">
                            <Skeleton className="mb-2 h-5 w-24 bg-white/10" />
                            <Skeleton className="mb-4 h-4 w-48 bg-white/10" />
                            <Skeleton className="h-[300px] w-full rounded-lg bg-white/10" />
                        </div>
                        <div className="col-span-1 rounded-xl border border-white/10 bg-white/4 p-6 lg:col-span-3">
                            <Skeleton className="mb-2 h-5 w-28 bg-white/10" />
                            <Skeleton className="mb-4 h-4 w-52 bg-white/10" />
                            <Skeleton className="h-[300px] w-full rounded-lg bg-white/10" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
