import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton loading state for the dashboard route. Mirrors the dashboard layout. */
export default function Loading() {
    return (
        <div className="min-h-dvh">
            {/* Header skeleton */}
            <header className="border-border/40 border-b">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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

            {/* Main content skeleton */}
            <main className="mx-auto max-w-5xl px-6 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-16 bg-white/10" />
                        <Skeleton className="h-4 w-24 bg-white/10" />
                    </div>
                    <Skeleton className="h-9 w-28 rounded-md bg-white/10" />
                </div>

                {/* Link cards skeleton */}
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-11 w-full rounded-2xl bg-white/10" />

                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-white/8 p-5"
                        >
                            <div className="flex gap-5">
                                <Skeleton className="hidden size-[100px] shrink-0 rounded-xl bg-white/10 sm:block" />
                                <div className="flex flex-1 flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-5 w-40 bg-white/10" />
                                            <Skeleton className="h-4 w-20 bg-white/10" />
                                        </div>
                                        <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
                                    </div>
                                    <Skeleton className="h-4 w-48 bg-white/10" />
                                    <Skeleton className="h-3 w-64 bg-white/10" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 border-white/6 border-t pt-3">
                                <Skeleton className="h-8 w-24 rounded-md bg-white/10" />
                                <Skeleton className="h-8 w-24 rounded-md bg-white/10" />
                                <Skeleton className="ml-auto h-8 w-32 rounded-md bg-white/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
