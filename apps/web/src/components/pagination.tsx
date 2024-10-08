'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IPagination {
  totalPages: number;
}

export default function Pagination({ totalPages }: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="flex  justify-between space-x-1">
        <button className="h-8 w-8">
          <Link
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ''
            }
          >
            <ChevronLeft />
          </Link>
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button className="h-8 w-8">
          <Link
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages ? `pointer-events-none opacity-50` : ''
            }
          >
            <ChevronRight />
          </Link>
        </button>
      </div>
    </>
  );
}
