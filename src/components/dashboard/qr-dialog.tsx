"use client";

import { IconDownload } from "@tabler/icons-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { QrCode } from "./qr-code";

type QrDialogProps = {
    slug: string;
    shortUrl: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

/**
 * Shared QR code dialog with large preview and high-res PNG download.
 * The visible QR is 260px but the hidden download canvas renders at 1024px for crisp exports.
 */
export function QrDialog({
    slug,
    shortUrl,
    open,
    onOpenChange,
}: QrDialogProps) {
    const displayRef = useRef<HTMLCanvasElement>(null);
    const downloadRef = useRef<HTMLCanvasElement>(null);

    /** Downloads the high-res (1024px) QR code as a PNG file. */
    function downloadQrCode() {
        const canvas = downloadRef.current;
        if (!canvas) return;

        const objectUrl = canvas.toDataURL("image/png");
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = `${slug}-qr.png`;
        anchor.click();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="font-mono text-sm">
                        /{slug}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-5 py-4">
                    {/* Visible preview QR */}
                    <div className="mx-auto aspect-square w-full max-w-[260px] rounded-[1.5rem] bg-white p-5 text-black">
                        <QrCode
                            ref={displayRef}
                            url={shortUrl}
                            size={220}
                            className="rounded-[1rem]"
                        />
                    </div>

                    {/* Hidden high-res QR for download (1024px) */}
                    <div className="hidden">
                        <QrCode ref={downloadRef} url={shortUrl} size={1024} />
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
                        Download PNG (1024x1024)
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
