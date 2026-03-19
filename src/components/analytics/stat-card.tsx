"use client";

import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
    /** Label text shown above the value */
    label: string;
    /** Icon element displayed in the top-right corner */
    icon: ReactNode;
    /** Whether data is still loading */
    isLoading: boolean;
    /** Main value to display (e.g. "1,234" or "Desktop") */
    value: string;
    /** Secondary text below the value */
    subtitle: string;
    /** Additional CSS classes for the root element */
    className?: string;
    /** Whether to truncate the value text */
    truncateValue?: boolean;
};

/**
 * Reusable analytics stat card with skeleton loading state.
 * Used in the analytics stats grid for all metric cards.
 */
export function StatCard({
    label,
    icon,
    isLoading,
    value,
    subtitle,
    className = "",
    truncateValue = false,
}: StatCardProps) {
    return (
        <div
            className={`flex flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/4 p-5 ${className}`}
        >
            <div className="flex items-center justify-between gap-3">
                <p className="text-white/56 text-xs uppercase tracking-[0.18em]">
                    {label}
                </p>
                <div className="rounded-full border border-white/10 bg-white/6 p-2 text-white/72">
                    {icon}
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-9 w-24 bg-white/10" />
                        <Skeleton className="h-5 w-32 bg-white/10" />
                    </div>
                ) : (
                    <>
                        <p
                            className={`mt-4 font-semibold text-3xl text-white tracking-tight ${truncateValue ? "truncate" : ""}`}
                            title={truncateValue ? value : undefined}
                        >
                            {value}
                        </p>
                        <p className="mt-1 text-sm text-white/56">{subtitle}</p>
                    </>
                )}
            </div>
        </div>
    );
}
