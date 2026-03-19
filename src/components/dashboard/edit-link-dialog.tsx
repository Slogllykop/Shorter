"use client";

import { IconRefresh } from "@tabler/icons-react";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import type { LinkData } from "@/app/(dashboard)/actions";
import { updateLink } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateSlug, isValidSlug } from "@/lib/slug";

type EditLinkDialogProps = {
    link: LinkData;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

/** Dialog for editing a link's URL, slug, and title. Closes immediately on valid submit. */
export function EditLinkDialog({
    link,
    open,
    onOpenChange,
}: EditLinkDialogProps) {
    const [url, setUrl] = useState(link.original_url);
    const [slug, setSlug] = useState(link.slug);
    const [title, setTitle] = useState(link.title ?? "");
    const [error, setError] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const handleRandomize = useCallback(() => {
        setSlug(generateSlug());
    }, []);

    /** Validates input, closes the dialog immediately, and fires the update action. */
    const handleSubmit = useCallback(() => {
        setError(null);

        if (!url.trim()) {
            setError("URL is required.");
            return;
        }

        if (!slug.trim() || !isValidSlug(slug.trim())) {
            setError(
                "Slug must be alphanumeric (dashes and underscores allowed).",
            );
            return;
        }

        try {
            new URL(url.trim());
        } catch {
            setError("Please enter a valid URL.");
            return;
        }

        const submitSlug = slug.trim();
        const submitUrl = url.trim();
        const submitTitle = title.trim() || null;

        // Close dialog immediately for instant feel
        onOpenChange(false);

        toast.promise(
            new Promise<void>((resolve, reject) => {
                startTransition(async () => {
                    const result = await updateLink(
                        link.id,
                        submitSlug,
                        submitUrl,
                        submitTitle,
                        link.slug,
                    );
                    if (result.success) {
                        resolve();
                    } else {
                        reject(
                            new Error(result.error ?? "Failed to update link."),
                        );
                    }
                });
            }),
            {
                loading: "Updating link...",
                success: "Link updated successfully.",
                error: (err: Error) => err.message,
            },
        );
    }, [url, slug, title, link.id, link.slug, onOpenChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Link</DialogTitle>
                    <DialogDescription>
                        Update the destination URL, slug, or title.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-url">Destination URL</Label>
                        <Input
                            id="edit-url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-slug">Slug</Label>
                        <div className="flex gap-2">
                            <Input
                                id="edit-slug"
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={handleRandomize}
                                            >
                                                <IconRefresh aria-hidden="true" />
                                            </Button>
                                        }
                                    />
                                    <TooltipContent>
                                        Generate random slug
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-title">
                            Title{" "}
                            <span className="text-muted-foreground">
                                (optional)
                            </span>
                        </Label>
                        <Input
                            id="edit-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {error ? (
                        <p className="text-destructive text-sm">{error}</p>
                    ) : null}

                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
