"use client";

import {
    IconBarcode,
    IconCheck,
    IconCopy,
    IconDownload,
    IconExternalLink,
    IconPencil,
    IconTrash,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import type { LinkData } from "@/app/(dashboard)/actions";
import { QrCode } from "@/components/dashboard/qr-code";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Period } from "@/hooks/use-analytics";
import { copyToClipboard, downloadCanvasAsPng } from "@/lib/client-utils";
import { ANALYTICS_PERIODS } from "@/lib/constants";

type AnalyticsActionBarProps = {
    link: LinkData;
    shortUrl: string;
    period: Period;
    onPeriodChange: (period: Period) => void;
    onEditOpen: () => void;
    onDeleteOpen: () => void;
    onQrOpen: () => void;
};

/**
 * Top action bar for the analytics page.
 * Contains QR code preview, title, period selector, and action buttons.
 */
export function AnalyticsActionBar({
    shortUrl,
    period,
    onPeriodChange,
    onEditOpen,
    onDeleteOpen,
    onQrOpen,
}: AnalyticsActionBarProps) {
    const [copied, setCopied] = useState(false);
    const qrRef = useRef<HTMLCanvasElement>(null);
    const downloadQrRef = useRef<HTMLCanvasElement>(null);

    /** Copies the short URL to clipboard with visual feedback. */
    async function handleCopy() {
        const success = await copyToClipboard(shortUrl);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    /** Downloads the high-res (1024px) QR code as a PNG file. */
    function downloadQrCode() {
        const canvas = downloadQrRef.current;
        if (!canvas) return;
        downloadCanvasAsPng(canvas, "qr-code.png");
    }

    return (
        <TooltipProvider>
            {/* Hidden high-res QR for download (1024px) */}
            <div className="hidden">
                <QrCode ref={downloadQrRef} url={shortUrl} size={1024} />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <button
                                    type="button"
                                    onClick={onQrOpen}
                                    className="group/qr relative shrink-0 cursor-pointer rounded-xl border border-white/10 bg-white p-0 shadow-[0_22px_40px_rgba(0,0,0,0.24)] transition-transform duration-200 hover:scale-105"
                                >
                                    <QrCode
                                        ref={qrRef}
                                        url={shortUrl}
                                        size={64}
                                        className="rounded-2xl"
                                    />
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 transition-opacity group-hover/qr:opacity-100">
                                        <IconBarcode className="size-4 text-white" />
                                    </div>
                                </button>
                            }
                        />
                        <TooltipContent>View QR code</TooltipContent>
                    </Tooltip>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-white text-xl tracking-tight sm:text-2xl">
                            Analytics Overview
                        </h3>
                        <p className="mt-0.5 truncate text-sm text-white/56">
                            {shortUrl}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Tabs
                        value={period}
                        onValueChange={(value) =>
                            onPeriodChange(value as Period)
                        }
                        className="w-full sm:w-[320px]"
                    >
                        <TabsList className="grid w-full grid-cols-4 bg-black/28">
                            {ANALYTICS_PERIODS.map((p) => (
                                <TabsTrigger key={p.value} value={p.value}>
                                    {p.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 border-white/8 border-t pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                {/* Primary Actions */}
                <div className="flex flex-wrap items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-white/12 bg-white/4 text-white hover:bg-white/8 sm:flex-initial"
                                    onClick={() => {
                                        void handleCopy();
                                    }}
                                >
                                    {copied ? (
                                        <IconCheck data-icon="inline-start" />
                                    ) : (
                                        <IconCopy data-icon="inline-start" />
                                    )}
                                    {copied ? "Copied" : "Copy short URL"}
                                </Button>
                            }
                        />
                        <TooltipContent>Copy the short link</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-white/12 bg-white/4 text-white hover:bg-white/8 sm:flex-initial"
                                    onClick={downloadQrCode}
                                >
                                    <IconDownload data-icon="inline-start" />
                                    Download QR
                                </Button>
                            }
                        />
                        <TooltipContent>Download QR code</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-white/12 bg-white/4 text-white hover:bg-white/8 sm:flex-initial"
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
                            }
                        />
                        <TooltipContent>Open link in new tab</TooltipContent>
                    </Tooltip>
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center gap-2 sm:ml-auto">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-white/12 bg-white/4 text-white hover:bg-white/8 sm:flex-initial"
                                    onClick={onEditOpen}
                                >
                                    <IconPencil data-icon="inline-start" />
                                    Edit
                                </Button>
                            }
                        />
                        <TooltipContent>Edit link</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 sm:flex-initial"
                                    onClick={onDeleteOpen}
                                >
                                    <IconTrash data-icon="inline-start" />
                                    Delete
                                </Button>
                            }
                        />
                        <TooltipContent>Delete link</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
}
