
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SortingState } from "@tanstack/react-table";

export const useTableQueryParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ---------- SORTING ----------
    const sortingState: SortingState = useMemo(() => {
        const sortBy = searchParams.get("sortBy");
        const sortOrder = searchParams.get("sortOrder");
        if (!sortBy) return [];
        return [{ id: sortBy, desc: sortOrder === "desc" }];
    }, [searchParams]);

    // ---------- PAGINATION ----------
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // ---------- SEARCH (debounced local state, URL sync) ----------
    const [searchValue, setSearchValue] = useState(
        searchParams.get("search") || "",
    );

    // useEffect(() => {
    //     const search = searchParams.get("search") || "";

    //     if (search !== searchValue) {
    //         setSearchValue(search);
    //     }
    // }, [searchParams, searchValue]);

    // ---------- generic updater ----------
    const updateParams = useCallback(
        (updates: Record<string, string | number | undefined | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value === undefined || value === null || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            });
            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams],
    );

    const handleSortingChange = useCallback(
        (newSorting: SortingState) => {
            const sort = newSorting[0];
            updateParams({
                sortBy: sort?.id,
                sortOrder: sort ? (sort.desc ? "desc" : "asc") : undefined,
                page: 1,
            });
        },
        [updateParams],
    );

    const handlePageChange = useCallback(
        (newPage: number) => updateParams({ page: newPage }),
        [updateParams],
    );

    const handleLimitChange = useCallback(
        (newLimit: number) => updateParams({ limit: newLimit, page: 1 }),
        [updateParams],
    );

    // debounce করে URL এ search বসানো, প্রতি keystroke এ নয়
    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchValue(value); // input তাৎক্ষণিক আপডেট হবে
        },
        [],
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentSearch = searchParams.get("search") || "";
            if (searchValue !== currentSearch) {
                updateParams({ search: searchValue || undefined, page: 1 });
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const clearFilterKeys = useCallback(
        (keys: string[]) => {
            const updates: Record<string, undefined> = {};
            keys.forEach((k) => (updates[k] = undefined));
            updateParams({ ...updates, page: 1 });
        },
        [updateParams],
    );

    return {
        sortingState,
        handleSortingChange,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        searchValue,
        handleSearchChange,
        clearFilterKeys,
        updateParams,
    };
};