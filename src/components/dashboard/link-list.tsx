"use client";

import { IconLink, IconSearch, IconX } from "@tabler/icons-react";
import Fuse from "fuse.js";
import { useDeferredValue, useState } from "react";
import type { LinkData } from "@/app/(dashboard)/actions";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkCard } from "./link-card";

type LinkListProps = {
    links: LinkData[];
    baseUrl: string;
};

export function LinkList({ links, baseUrl }: LinkListProps) {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query.trim());

    if (links.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16">
                <IconLink
                    aria-hidden="true"
                    className="size-8 text-muted-foreground"
                />
                <p className="text-muted-foreground text-sm">
                    No links yet. Create your first short link.
                </p>
            </div>
        );
    }

    const fuse = new Fuse(links, {
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
        keys: [
            { name: "slug", weight: 0.45 },
            { name: "title", weight: 0.3 },
            { name: "original_url", weight: 0.25 },
        ],
    });

    const filteredLinks = deferredQuery
        ? fuse.search(deferredQuery).map((result) => result.item)
        : links;

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/4 p-3 sm:p-4">
                <div className="flex flex-row items-center gap-2">
                    <div className="relative flex-1">
                        <IconSearch
                            aria-hidden="true"
                            className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3.5 size-4 text-white/44"
                        />
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search links..."
                            aria-label="Search links"
                            className="h-10 rounded-xl border-white/12 bg-black/24 pl-10 text-white placeholder:text-white/40 sm:h-11 sm:rounded-2xl"
                        />
                        <TooltipProvider>
                            {query ? (
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <button
                                                type="button"
                                                onClick={() => setQuery("")}
                                                aria-label="Clear search"
                                                className="-translate-y-1/2 absolute top-1/2 right-2 inline-flex size-6 items-center justify-center rounded-full text-white/48 transition-colors hover:bg-white/8 hover:text-white sm:right-3 sm:size-7"
                                            >
                                                <IconX
                                                    aria-hidden="true"
                                                    className="size-3.5 sm:size-4"
                                                />
                                            </button>
                                        }
                                    />
                                    <TooltipContent>
                                        Clear search
                                    </TooltipContent>
                                </Tooltip>
                            ) : null}
                        </TooltipProvider>
                    </div>

                    <div className="flex h-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/24 px-3 font-medium text-[11px] text-white/60 tabular-nums sm:h-11 sm:rounded-2xl sm:text-xs">
                        <span>
                            {filteredLinks.length}/{links.length}
                        </span>
                    </div>
                </div>
            </div>

            {filteredLinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-white/12 border-dashed bg-white/4 py-16 text-center">
                    <IconSearch
                        aria-hidden="true"
                        className="size-8 text-white/40"
                    />
                    <p className="font-medium text-white">No matching links</p>
                    <p className="max-w-sm text-sm text-white/56">
                        Try a slug, title, or part of the destination URL.
                    </p>
                </div>
            ) : null}

            {filteredLinks.map((link) => (
                <LinkCard key={link.id} link={link} baseUrl={baseUrl} />
            ))}
        </div>
    );
}
