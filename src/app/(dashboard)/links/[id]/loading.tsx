import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton loading state for the analytics page. Mirrors the analytics layout. */
export default function AnalyticsLoading() {
    return (
        <div className="min-h-dvh">
            {/* Header skeleton */}
            <header className="border-border/40 border-b">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-[30px] rounded-sm bg-white/10" />
                        <Skeleton className="h-5 w-16 bg-white/10" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="hidden h-4 w-32 bg-white/10 sm:block" />
                        <Skeleton className="h-8 w-20 rounded-md bg-white/10" />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
                {/* Back link + Title skeleton */}
                <div className="mb-8">
                    <Skeleton className="mb-2 h-4 w-28 bg-white/10" />
                    <Skeleton className="mb-1 h-7 w-48 bg-white/10" />
                    <Skeleton className="h-4 w-64 bg-white/10" />
                </div>

                {/* Action bar card skeleton */}
                <div className="rounded-xl border border-white/10 bg-white/4 p-4 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <Skeleton className="size-16 rounded-xl bg-white/10" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40 bg-white/10" />
                                <Skeleton className="h-4 w-48 bg-white/10" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full rounded-md bg-white/10 sm:w-80" />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 border-white/8 border-t pt-4">
                        <Skeleton className="h-8 w-28 rounded-md bg-white/10" />
                        <Skeleton className="h-8 w-28 rounded-md bg-white/10" />
                        <Skeleton className="h-8 w-28 rounded-md bg-white/10" />
                        <div className="ml-auto flex gap-2">
                            <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
                            <Skeleton className="h-8 w-20 rounded-md bg-white/10" />
                        </div>
                    </div>
                </div>

                {/* Stats grid skeleton */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="col-span-1 row-span-2 rounded-[1.25rem] border border-white/10 bg-white/4 p-6 sm:col-span-2">
                        <Skeleton className="mb-6 h-4 w-24 bg-white/10" />
                        <Skeleton className="mb-2 h-12 w-32 bg-white/10" />
                        <Skeleton className="h-4 w-40 bg-white/10" />
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="rounded-[1.25rem] border border-white/10 bg-white/4 p-5"
                        >
                            <Skeleton className="mb-4 h-4 w-24 bg-white/10" />
                            <Skeleton className="mb-2 h-9 w-20 bg-white/10" />
                            <Skeleton className="h-4 w-32 bg-white/10" />
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
            </main>
        </div>
    );
}
