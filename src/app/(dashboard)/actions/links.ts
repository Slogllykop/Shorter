"use server";

import { revalidatePath } from "next/cache";
import { cacheLink, invalidateLink } from "@/lib/redis/cache";
import { createClient } from "@/lib/supabase/server";

export type LinkData = {
    id: number;
    slug: string;
    original_url: string;
    title: string | null;
    created_at: string;
    updated_at: string;
    click_count: number;
};

export type LinkResult = {
    success: boolean;
    error?: string;
    data?: LinkData;
};

/** Fetches all links for the authenticated user via Supabase RPC. */
export async function getLinks(): Promise<LinkData[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_all_links");

    if (error) {
        console.error("Failed to fetch links:", error.message);
        return [];
    }

    return (data ?? []) as LinkData[];
}

/** Creates a new short link and caches it in Redis. */
export async function createLink(
    slug: string,
    originalUrl: string,
    title: string | null,
): Promise<LinkResult> {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("create_link", {
        p_slug: slug,
        p_original_url: originalUrl,
        p_title: title,
    });

    if (error) {
        if (
            error.message.includes("unique") ||
            error.message.includes("duplicate")
        ) {
            return { success: false, error: "This slug is already taken." };
        }
        return { success: false, error: error.message };
    }

    const link = data?.[0];
    if (link) {
        await cacheLink(slug, originalUrl, link.id);
    }

    revalidatePath("/");
    return { success: true };
}

/** Updates an existing link's slug, URL, and title. Manages Redis cache invalidation. */
export async function updateLink(
    id: number,
    slug: string,
    originalUrl: string,
    title: string | null,
    oldSlug: string,
): Promise<LinkResult> {
    const supabase = await createClient();

    // Invalidate old slug from cache if slug changed
    if (oldSlug !== slug) {
        await invalidateLink(oldSlug);
    }

    const { error } = await supabase.rpc("update_link", {
        p_id: id,
        p_slug: slug,
        p_original_url: originalUrl,
        p_title: title,
    });

    if (error) {
        if (
            error.message.includes("unique") ||
            error.message.includes("duplicate")
        ) {
            return { success: false, error: "This slug is already taken." };
        }
        return { success: false, error: error.message };
    }

    // Update cache with new slug
    await cacheLink(slug, originalUrl, id);

    revalidatePath("/");
    return { success: true };
}

/** Deletes a link and invalidates its Redis cache entry. */
export async function deleteLink(
    id: number,
    slug: string,
): Promise<LinkResult> {
    const supabase = await createClient();

    await invalidateLink(slug);

    const { error } = await supabase.rpc("delete_link", { p_id: id });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/");
    return { success: true };
}
