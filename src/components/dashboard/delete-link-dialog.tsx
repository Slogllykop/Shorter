"use client";

import { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { deleteLink } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type DeleteLinkDialogProps = {
    linkId: number;
    slug: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

/** Confirmation dialog for deleting a link. Closes immediately and runs deletion in background. */
export function DeleteLinkDialog({
    linkId,
    slug,
    open,
    onOpenChange,
}: DeleteLinkDialogProps) {
    const [, startTransition] = useTransition();

    /** Closes the dialog instantly and fires the delete action with a toast. */
    const handleDelete = useCallback(() => {
        onOpenChange(false);

        toast.promise(
            new Promise<void>((resolve, reject) => {
                startTransition(async () => {
                    const result = await deleteLink(linkId, slug);
                    if (result.success) {
                        resolve();
                    } else {
                        reject(
                            new Error(result.error ?? "Failed to delete link."),
                        );
                    }
                });
            }),
            {
                loading: "Deleting link...",
                success: "Link deleted successfully.",
                error: (err: Error) => err.message,
            },
        );
    }, [linkId, slug, onOpenChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Link</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-mono text-foreground">
                            /{slug}
                        </span>
                        ? This action cannot be undone and all analytics data
                        will be lost.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
