import { cn } from '@/helpers/styles';
import React from 'react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  className,
  onPageChange,
}: PaginationProps) {
  return (
    <div className={cn('join', className)}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={cn('join-item btn btn-md', {
            'btn-active': index + 1 === currentPage,
          })}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

