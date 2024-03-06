import { PaginationData } from '@/api';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const ArtworkPagination = ({ current_page, total_pages, siblings = 1 }: Props) => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const nextPage = total_pages > current_page ? current_page + 1 : null;
  const prevPage = current_page - 1 || null;

  const paginationRange = useMemo(() => {
    // total pagination items is determined as siblings + firstPage + lastPage + current_page + 2*DOTS
    const totalPaginationItems = siblings + 5;
    if (totalPaginationItems >= total_pages) {
      return range(1, total_pages);
    }
    /*
    	Calculate left and right sibling index and make sure they are within range 1 and total_pages
    */
    const leftSiblingIndex = Math.max(current_page - siblings, 1);
    const rightSiblingIndex = Math.min(current_page + siblings, total_pages);

    /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and total_pages. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < total_pages - 2
      */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < total_pages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = total_pages;

    /*
        Case 2: No left dots to show, but rights dots to be shown
      */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, total_pages];
    }

    /*
        Case 3: No right dots to show, but left dots to be shown
      */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = range(total_pages - rightItemCount + 1, total_pages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
        Case 4: Both left and right dots to be shown
      */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [current_page, siblings, total_pages]);

  return (
    <Pagination className="my-3">
      <PaginationContent>
        {prevPage && (
          <PaginationItem>
            <PaginationPrevious to={`?q=${q}&page=${prevPage}`} />
          </PaginationItem>
        )}
        {paginationRange?.map((p, i) => {
          const key = `${i}-${p}`;
          if (p === DOTS) return <PaginationEllipsis key={key} />;
          return (
            <PaginationItem key={`${i}-${p}`}>
              <PaginationLink to={`?q=${q}&page=${p}`} isActive={p === current_page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {nextPage && (
          <PaginationItem>
            <PaginationNext to={`?q=${q}&page=${nextPage}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

const DOTS = '...';

function range(start: number, end: number) {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
}

type Props = PaginationData & { siblings?: number };

export default ArtworkPagination;
