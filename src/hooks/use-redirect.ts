"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { getLinkBySlug } from "@/app/[slug]/actions";
import { detectDeviceType } from "@/hooks/use-device-type";

type RedirectState = {
    error: string | null;
};

/**
 * Hook that encapsulates the entire redirect flow:
 * 1. Resolves the short link via server action + Redis cache
 * 2. Fetches user geo-location from ipapi.co via axios
 * 3. Tracks the click via /api/track
 * 4. Redirects to the destination URL
 *
 * Returns an error string if any step fails fatally.
 */
export function useRedirect(slug: string): RedirectState {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function processRedirect() {
            try {
                // Parallel: resolve link + fetch geo data
                const [linkResult, geoResult] = await Promise.allSettled([
                    getLinkBySlug(slug),
                    axios
                        .get<{ country_name?: string; country?: string }>(
                            "https://ipapi.co/json/",
                        )
                        .then((res) => res.data),
                ]);

                if (!isMounted) return;

                // Handle link resolution
                let linkId: number | null = null;
                let originalUrl: string | null = null;

                if (linkResult.status === "fulfilled") {
                    if (linkResult.value.error) {
                        setError(linkResult.value.error);
                        return;
                    }
                    if (linkResult.value.data) {
                        linkId = linkResult.value.data.link_id;
                        originalUrl = linkResult.value.data.original_url;
                    }
                } else {
                    setError("Failed to resolve link");
                    return;
                }

                if (!linkId || !originalUrl) {
                    setError("Link not found");
                    return;
                }

                // Handle geo resolution
                let country = "unknown";
                if (geoResult.status === "fulfilled" && geoResult.value) {
                    country =
                        geoResult.value.country_name ||
                        geoResult.value.country ||
                        "unknown";
                }

                // Detect device and referrer client-side
                const deviceType = detectDeviceType(navigator.userAgent);
                const referrer = document.referrer || "";

                // Track analytics via axios (fire-and-forget, don't block redirect)
                axios
                    .post("/api/track", {
                        link_id: linkId,
                        country,
                        deviceType,
                        referrer,
                    })
                    .catch((trackErr) => {
                        console.error("Failed to track analytics:", trackErr);
                    });

                // Redirect to destination
                window.location.replace(originalUrl);
            } catch (err) {
                console.error("Redirect processing error:", err);
                if (isMounted) {
                    setError("An unexpected error occurred");
                }
            }
        }

        processRedirect();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    return { error };
}
