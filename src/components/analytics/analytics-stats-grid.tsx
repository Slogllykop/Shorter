"use client";

import {
    IconActivityHeartbeat,
    IconMapPin,
    IconMouse,
    IconTrendingUp,
} from "@tabler/icons-react";
import type { LinkAnalytics } from "@/app/(dashboard)/links/[id]/actions";
import type { Period } from "@/hooks/use-analytics";
import { StatCard } from "./stat-card";

type AnalyticsStatsGridProps = {
    totalClicks: number;
    data: LinkAnalytics | null;
    period: Period;
    isLoading: boolean;
};

/**
 * Bento-style stats grid for the analytics page.
 * Displays all-time clicks, period clicks, top device, avg per active day, and top location.
 */
export function AnalyticsStatsGrid({
    totalClicks,
    data,
    period,
    isLoading,
}: AnalyticsStatsGridProps) {
    const periodClicks = data
        ? data.timeSeries.reduce((acc, curr) => acc + curr.clicks, 0)
        : 0;
    const activeDays =
        data?.timeSeries.filter((item) => item.clicks > 0).length ?? 0;
    const avgPerActiveDay =
        activeDays > 0 ? Math.round((periodClicks / activeDays) * 10) / 10 : 0;

    const topDevice = data?.devices.reduce(
        (prev, current) => (prev.clicks > current.clicks ? prev : current),
        { device_type: "N/A", clicks: 0 },
    );

    const topCountry = data?.countries.reduce(
        (prev, current) => (prev.clicks > current.clicks ? prev : current),
        { country: "N/A", clicks: 0 },
    );

    return (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* All-time clicks - large card */}
            <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/4 p-6 sm:col-span-2">
                <div>
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-white/56 text-xs uppercase tracking-[0.18em]">
                            All-time clicks
                        </p>
                        <div className="rounded-full border border-white/10 bg-white/6 p-2 text-white/72">
                            <IconMouse className="size-4" />
                        </div>
                    </div>
                    <p className="mt-6 font-semibold text-4xl text-white tracking-tight sm:text-5xl lg:text-6xl">
                        {totalClicks.toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm text-white/56">
                        Confirmed link visits
                    </p>
                </div>
            </div>

            <StatCard
                label="Selected Period"
                icon={<IconTrendingUp className="size-4" />}
                isLoading={isLoading}
                value={periodClicks.toLocaleString()}
                subtitle={
                    period === "all"
                        ? "All recorded history"
                        : `Traffic in the last ${period}`
                }
            />

            <StatCard
                label="Top Device"
                icon={<IconTrendingUp className="size-4" />}
                isLoading={isLoading}
                value={topDevice?.device_type || "N/A"}
                subtitle={`${topDevice?.clicks || 0} clicks`}
                className="capitalize"
            />

            <StatCard
                label="Avg / Active Day"
                icon={<IconActivityHeartbeat className="size-4" />}
                isLoading={isLoading}
                value={avgPerActiveDay.toLocaleString()}
                subtitle={`Across ${activeDays} active days`}
            />

            <StatCard
                label="Locations"
                icon={<IconMapPin className="size-4" />}
                isLoading={isLoading}
                value={topCountry?.country || "N/A"}
                subtitle={`${topCountry?.clicks || 0} clicks - ${data?.countries.length ?? 0} countries total`}
                truncateValue
            />
        </div>
    );
}
