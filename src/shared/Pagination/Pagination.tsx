import { FC, useState, useEffect } from "react";
import twFocusClass from "../../utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number; // Number of pages to show at once (defaults to 5)
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 3, // Default to showing 3 pages at a time
}) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // Track the current group of pages

  const totalPageGroups = Math.ceil(totalPages / pageSize); // Total number of page groups

  useEffect(() => {
    const currentGroup = Math.floor((currentPage - 1) / pageSize);
    setCurrentPageGroup(currentGroup);
  }, [currentPage, pageSize]);

  // Generate the range of page numbers to display in the current group
  const generatePageNumbers = () => {
    const startPage = currentPageGroup * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleNextGroup = () => {
    if (currentPageGroup < totalPageGroups - 1) {
      const nextGroupFirstPage = (currentPageGroup + 1) * pageSize + 1;
      setCurrentPageGroup(currentPageGroup + 1);
      onPageChange(nextGroupFirstPage); // Move to the first page of the next group
    }
  };

  const handlePreviousGroup = () => {
    if (currentPageGroup > 0) {
      const previousGroupFirstPage = (currentPageGroup - 1) * pageSize + 1;
      setCurrentPageGroup(currentPageGroup - 1);
      onPageChange(previousGroupFirstPage); // Move to the first page of the previous group
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageItem = (pageNumber: number) => {
    const isActive = currentPage === pageNumber;
    if (isActive) {
      return (
        <span
          key={pageNumber}
          className={`inline-flex w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pageNumber}
        </span>
      );
    }

    return (
      <button
        key={pageNumber}
        className={`inline-flex w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <nav
      className={`nc-Pagination flex flex-wrap space-x-1 text-sm md:text-base font-medium ${className}`}
    >
      {/* Conditionally render Previous group button */}
      {totalPages > pageSize && (
        <button
          className={`inline-flex w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          onClick={handlePreviousGroup}
          disabled={currentPageGroup === 0}
        >
          {"<<"}
        </button>
      )}

      {/* Previous page button */}
      <button
        className={`inline-flex w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {/* Render current group of page numbers */}
      {generatePageNumbers().map(renderPageItem)}

      {/* Next page button */}
      <button
        className={`inline-flex w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>

      {/* Conditionally render Next group button */}
      {totalPages > pageSize && (
        <button
          className={`inline-flex w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          onClick={handleNextGroup}
          disabled={currentPageGroup === totalPageGroups - 1}
        >
          {">>"}
        </button>
      )}
    </nav>
  );
};

export default Pagination;
