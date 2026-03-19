/**
 * Detects the device type from a user agent string.
 * Returns "mobile", "tablet", or "desktop".
 */
export function detectDeviceType(userAgent: string | null): string {
    if (!userAgent) return "unknown";
    const ua = userAgent.toLowerCase();

    // Check tablet patterns first (iPad, Android tablet)
    if (
        ua.includes("ipad") ||
        (ua.includes("android") && !ua.includes("mobile"))
    ) {
        return "tablet";
    }

    // Check mobile patterns
    if (
        ua.includes("mobile") ||
        ua.includes("android") ||
        ua.includes("iphone")
    ) {
        return "mobile";
    }

    return "desktop";
}
