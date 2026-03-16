"use client";

import {
    IconArrowRight,
    IconCheck,
    IconCopy,
    IconDownload,
    IconExternalLink,
    IconLink,
    IconPencil,
    IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { LinkData } from "@/app/(dashboard)/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";
import { QrCode } from "./qr-code";

type LinkCardProps = {
    link: LinkData;
    baseUrl: string;
};

export function LinkCard({ link, baseUrl }: LinkCardProps) {
    const router = useRouter();
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const qrRef = useRef<HTMLCanvasElement>(null);

    const shortUrl = `${baseUrl}/${link.slug}`;
    const createdLabel = new Date(link.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const updatedLabel = new Date(link.updated_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const slugLength = `${link.slug.length} chars`;

    async function handleCopy() {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleOpenAnalytics() {
        router.push(`/links/${link.id}`);
    }

    function downloadQrCode() {
        const canvas = qrRef.current;
        if (!canvas) return;

        const objectUrl = canvas.toDataURL("image/png");
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = `${link.slug}-qr.png`;
        anchor.click();
    }

    return (
        <>
            <Card className="group border border-white/10 bg-card py-0">
                <CardContent className="grid gap-5 p-4 sm:grid-cols-[152px_minmax(0,1fr)] sm:p-5">
                    <div className="h-fit justify-self-start rounded-xl border border-white/10 bg-white p-0 text-black shadow-[0_22px_40px_rgba(0,0,0,0.24)]">
                        <QrCode
                            ref={qrRef}
                            url={shortUrl}
                            size={128}
                            className="rounded-[1rem]"
                        />
                    </div>

                    <div className="min-w-0">
                        <CardHeader className="space-y-3 px-0 pb-0">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <CardTitle className="font-mono text-base text-white sm:text-lg">
                                            /{link.slug}
                                        </CardTitle>
                                        <Badge
                                            variant="secondary"
                                            className="bg-white/8 text-white tabular-nums"
                                        >
                                            {link.click_count.toLocaleString()}{" "}
                                            {link.click_count === 1
                                                ? "click"
                                                : "clicks"}
                                        </Badge>
                                    </div>

                                    <div>
                                        <p className="font-medium text-lg text-white leading-tight">
                                            {link.title || "Untitled link"}
                                        </p>
                                        <CardDescription className="mt-1 max-w-3xl truncate text-sm text-white/62">
                                            {shortUrl}
                                        </CardDescription>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-white/12 bg-white/4 text-white hover:bg-white/8"
                                        onClick={() => setEditOpen(true)}
                                    >
                                        <IconPencil data-icon="inline-start" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-white/12 bg-white/4 text-white hover:bg-white/8"
                                        onClick={() => setDeleteOpen(true)}
                                    >
                                        <IconTrash data-icon="inline-start" />
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <a
                                href={link.original_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex max-w-full items-center gap-2 truncate rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-white/78 text-xs transition-colors hover:border-white/20 hover:text-white"
                            >
                                <IconLink className="size-3.5 shrink-0" />
                                <span className="truncate">
                                    {link.original_url}
                                </span>
                            </a>
                        </CardHeader>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="grid gap-2.5 sm:grid-cols-3">
                            <StatPill
                                label="Created"
                                value={createdLabel}
                                tone="default"
                            />
                            <StatPill
                                label="Updated"
                                value={updatedLabel}
                                tone="default"
                            />
                            <StatPill
                                label="Slug length"
                                value={slugLength}
                                tone="accent"
                            />
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <Button
                                                variant="outline"
                                                className="border-white/12 bg-white/4 text-white hover:bg-white/8"
                                                onClick={() => {
                                                    void handleCopy();
                                                }}
                                            >
                                                {copied ? (
                                                    <IconCheck data-icon="inline-start" />
                                                ) : (
                                                    <IconCopy data-icon="inline-start" />
                                                )}
                                                {copied
                                                    ? "Copied"
                                                    : "Copy short URL"}
                                            </Button>
                                        }
                                    />
                                    <TooltipContent>
                                        Copy the short link
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <Button
                                variant="outline"
                                className="border-white/12 bg-white/4 text-white hover:bg-white/8"
                                onClick={downloadQrCode}
                            >
                                <IconDownload data-icon="inline-start" />
                                Download QR
                            </Button>

                            <Button
                                variant="outline"
                                className="border-white/12 bg-white/4 text-white hover:bg-white/8"
                                nativeButton={false}
                                render={
                                    <a
                                        href={shortUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IconExternalLink data-icon="inline-start" />
                                        Open short link
                                    </a>
                                }
                            />

                            <Button
                                className="ml-auto bg-white text-black hover:bg-white/88"
                                onClick={handleOpenAnalytics}
                            >
                                View analytics
                                <IconArrowRight data-icon="inline-end" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <EditLinkDialog
                link={link}
                open={editOpen}
                onOpenChange={setEditOpen}
            />

            <DeleteLinkDialog
                linkId={link.id}
                slug={link.slug}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />

            <Dialog open={qrOpen} onOpenChange={setQrOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="font-mono text-sm">
                            /{link.slug}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                        <div className="mx-auto aspect-square w-full max-w-[260px] rounded-[1.5rem] bg-white p-5 text-black">
                            <QrCode
                                url={shortUrl}
                                size={220}
                                className="rounded-[1rem]"
                            />
                        </div>
                        <div className="space-y-2 text-center">
                            <p className="font-medium text-sm text-white">
                                This QR encodes the full absolute short URL.
                            </p>
                            <p className="truncate text-muted-foreground text-xs">
                                {shortUrl}
                            </p>
                        </div>
                        <Button className="w-full" onClick={downloadQrCode}>
                            <IconDownload data-icon="inline-start" />
                            Download PNG
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function StatPill({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "default" | "accent";
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border px-3 py-2.5",
                tone === "accent"
                    ? "border-white/14 bg-white/6"
                    : "border-white/10 bg-white/4",
            )}
        >
            <p className="text-[11px] text-white/48 uppercase tracking-[0.18em]">
                {label}
            </p>
            <p className="mt-1 truncate font-medium text-sm text-white">
                {value}
            </p>
        </div>
    );
}
