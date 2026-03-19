import type { LinkAnalytics } from "@/app/(dashboard)/links/[id]/actions";
import { redis } from "./client";

type CachedLink = {
    original_url: string;
    link_id: number;
};

const LINK_PREFIX = "link:";
const CLICKS_PREFIX = "clicks:";

export async function cacheLink(
    slug: string,
    originalUrl: string,
    linkId: number,
): Promise<void> {
    await redis.set<CachedLink>(`${LINK_PREFIX}${slug}`, {
        original_url: originalUrl,
        link_id: linkId,
    });
}

export async function getCachedLink(slug: string): Promise<CachedLink | null> {
    return redis.get<CachedLink>(`${LINK_PREFIX}${slug}`);
}

export async function invalidateLink(slug: string): Promise<void> {
    await redis.del(`${LINK_PREFIX}${slug}`);
}

export async function incrementClickCount(linkId: number): Promise<number> {
    return redis.incr(`${CLICKS_PREFIX}${linkId}`);
}

export async function getCachedClickCount(
    linkId: number,
): Promise<number | null> {
    return redis.get<number>(`${CLICKS_PREFIX}${linkId}`);
}

// ---- Analytics Cache ----

const ANALYTICS_PREFIX = "analytics:";
const ANALYTICS_TTL = 60; // seconds

/** Cache analytics data in Redis with a 60-second TTL for fast reads. */
export async function cacheAnalytics(
    linkId: number,
    period: string,
    data: LinkAnalytics,
): Promise<void> {
    await redis.set(
        `${ANALYTICS_PREFIX}${linkId}:${period}`,
        JSON.stringify(data),
        { ex: ANALYTICS_TTL },
    );
}

/** Retrieve cached analytics data from Redis if available. */
export async function getCachedAnalytics(
    linkId: number,
    period: string,
): Promise<LinkAnalytics | null> {
    const raw = await redis.get<string>(
        `${ANALYTICS_PREFIX}${linkId}:${period}`,
    );
    if (!raw) return null;
    try {
        return typeof raw === "string"
            ? JSON.parse(raw)
            : (raw as unknown as LinkAnalytics);
    } catch {
        return null;
    }
}
