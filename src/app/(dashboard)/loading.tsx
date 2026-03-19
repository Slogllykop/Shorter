import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton loading state for the dashboard route. Mirrors the dashboard layout. */
export default function Loading() {
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

            {/* Main content skeleton */}
            <main className="mx-auto max-w-5xl px-6 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-20 bg-white/10" />
                        <Skeleton className="h-4 w-28 bg-white/10" />
                    </div>
                    <Skeleton className="h-10 w-32 rounded-lg bg-white/10" />
                </div>

                {/* Search and Link cards skeleton */}
                <div className="flex flex-col gap-4">
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/4 p-3 sm:p-4">
                        <Skeleton className="h-10 w-full rounded-xl bg-white/10 sm:h-11 sm:rounded-2xl" />
                    </div>

                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-2xl border border-white/8 bg-white/2"
                        >
                            <div className="flex gap-4 p-4 sm:gap-5 sm:p-5">
                                <Skeleton className="hidden size-[100px] shrink-0 rounded-xl bg-white/10 sm:block" />
                                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
                                    <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <Skeleton className="h-5 w-40 bg-white/10" />
                                            <Skeleton className="h-4 w-24 bg-white/10" />
                                        </div>
                                        <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="size-4 rounded-full bg-white/10" />
                                        <Skeleton className="h-4 w-48 bg-white/10" />
                                    </div>
                                    <Skeleton className="h-4 w-full max-w-[280px] bg-white/10" />
                                </div>
                                <div className="hidden shrink-0 items-start gap-1.5 sm:flex">
                                    <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
                                    <Skeleton className="h-8 w-20 rounded-md bg-white/10" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 border-white/6 border-t bg-white/2 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:px-5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-24 sm:flex-initial" />
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-24 sm:flex-initial" />
                                    <Skeleton className="h-8 flex-1 rounded-md bg-white/10 sm:h-8 sm:w-24 sm:flex-initial" />
                                </div>
                                <div className="flex items-center justify-between sm:ml-auto">
                                    <div className="flex items-center gap-2 sm:hidden">
                                        <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
                                        <Skeleton className="h-8 w-16 rounded-md bg-white/10" />
                                    </div>
                                    <Skeleton className="ml-auto h-8 w-32 rounded-md bg-white/10" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
