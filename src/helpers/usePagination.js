import { useState, useCallback } from 'react';

const usePagination = (initialPage = 0, initialPageSize = 10) => {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const nextPage = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, []);

    const previousPage = useCallback(() => {
        setPage(prevPage => Math.max(0, prevPage - 1));
    }, []);

        const onPageChange = (newPage) => {
        setPage(newPage);
      };

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    const lastPage = useCallback((totalCount) => {
        setPage(Math.max(0, Math.ceil(totalCount / pageSize) - 1));
    }, [pageSize]);

    const firstPage = useCallback(() => {
        setPage(0);
    }, []);

    const handlePageSizeChange = useCallback((newPageSize, totalCount) => {
        setPageSize(newPageSize);
        const newTotalPages = Math.ceil(totalCount / newPageSize);
        if (page >= newTotalPages) {
            setPage(0);
        }
    }, [page]);

    return {
        page,
        setPage,
        pageSize,
        sortConfig,
        handleSort,
        setPageSize,
        onPageChange,
        lastPage,
        firstPage,
        handlePageSizeChange,
    };
};

export default usePagination;