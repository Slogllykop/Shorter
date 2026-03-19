"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import {
    addWhitelistedEmail,
    removeWhitelistedEmail,
} from "@/app/(dashboard)/settings/actions";

type WhitelistedEmail = { email: string; created_at: string };

/**
 * Hook for managing whitelisted emails with optimistic UI updates.
 * Immediately updates the UI on add/remove, then syncs with the server.
 * Reverts on error and shows toast notifications.
 */
export function useWhitelistedEmails(initialEmails: WhitelistedEmail[]) {
    const [isPending, startTransition] = useTransition();

    const [emails, dispatch] = useOptimistic(
        initialEmails,
        (
            state: WhitelistedEmail[],
            action: { type: "add" | "remove"; email: string },
        ) => {
            if (action.type === "add") {
                return [
                    ...state,
                    {
                        email: action.email,
                        created_at: new Date().toISOString(),
                    },
                ];
            }
            return state.filter((e) => e.email !== action.email);
        },
    );

    /** Optimistically adds an email to the whitelist. Reverts + toasts on error. */
    const addEmail = async (email: string) => {
        startTransition(async () => {
            dispatch({ type: "add", email });

            const result = await addWhitelistedEmail(email);
            if (result.success) {
                toast.success("Email added to whitelist");
            } else {
                toast.error(result.error || "Failed to add email");
            }
        });
    };

    /** Optimistically removes an email from the whitelist. Blocks removing the last one. */
    const removeEmail = async (email: string) => {
        if (emails.length === 1) {
            toast.error("Cannot remove the last whitelisted email");
            return;
        }

        startTransition(async () => {
            dispatch({ type: "remove", email });

            const result = await removeWhitelistedEmail(email);
            if (result.success) {
                toast.success("Email removed from whitelist");
            } else {
                toast.error(result.error || "Failed to remove email");
            }
        });
    };

    return {
        emails,
        isPending,
        addEmail,
        removeEmail,
    };
}
