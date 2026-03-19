"use client";

/**
 * Copies the given text to the clipboard.
 * Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        console.error("Failed to copy to clipboard", e);
        return false;
    }
}

/**
 * Downloads a canvas element as a PNG file.
 * @param canvas The canvas element to download
 * @param filename The name of the file to download (e.g. 'qr-code.png')
 */
export function downloadCanvasAsPng(
    canvas: HTMLCanvasElement,
    filename: string,
): void {
    const objectUrl = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
