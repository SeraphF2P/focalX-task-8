import React from "react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = (key: string) => (
      <span
        key={key}
        className="size-[60px] max-md:size-8 flex justify-center items-center rounded-full bg-white"
      >
        ...
      </span>
    );

    const renderButton = (i: number) => (
      <button
        key={i}
        onClick={() => onPageChange(i)}
        aria-current={i === currentPage ? "page" : undefined}
        className={cn(
          "size-[60px] max-md:size-8 border border-[#F1F1F1] flex justify-center items-center rounded-full bg-white",
          {
            "bg-primary text-white": i === currentPage,
          }
        )}
      >
        {i}
      </button>
    );

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderButton(i));
      }
    } else {
      let leftBound = Math.max(1, currentPage - 1);
      let rightBound = Math.min(totalPages, currentPage + 1);

      if (leftBound === 1) rightBound = 3;
      if (rightBound === totalPages) leftBound = totalPages - 2;

      if (leftBound > 1) {
        pageNumbers.push(renderButton(1));
        if (leftBound > 2) pageNumbers.push(ellipsis("left"));
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(renderButton(i));
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) pageNumbers.push(ellipsis("right"));
        pageNumbers.push(renderButton(totalPages));
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex mx-auto    items-center justify-center gap-[5px]">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="size-[60px] max-md:size-8 border border-[#F1F1F1] flex justify-center items-center rounded-full bg-white disabled:cursor-not-allowed"
      >
        <img
          src="/Icon _ Pagination _ Prev.svg"
          className="w-5 h-5"
          alt="Previous page"
        />
        <span className="sr-only">Previous page</span>
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="size-[60px] max-md:size-8 border border-[#F1F1F1] flex justify-center items-center rounded-full bg-white disabled:cursor-not-allowed"
      >
        <img
          src="/Icon _ Pagination _ Next.svg"
          className="w-5 h-5"
          alt="Next page"
        />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  );
};
