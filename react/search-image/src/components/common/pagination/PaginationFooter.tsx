import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAtom } from "jotai";
import { pageAtom } from "@/store";

const ITEMS_PER_PAGE = 30; // 한 페이지당 항목 수
const TOTAL_ITEMS = 10000; // 전체 데이터 수
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE); // 전체 페이지 수
const PAGE_GROUP_SIZE = 5; // 한 번에 표시할 페이지 버튼 개수

function PaginationFooter() {
  const [page, setPage] = useAtom(pageAtom);

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(currentGroup * PAGE_GROUP_SIZE, TOTAL_PAGES);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setPage(newPage);
    }
  };

  const handlePreviousGroup = () => handlePageChange(startPage - 1);
  const handleNextGroup = () => handlePageChange(endPage + 1);

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 그룹 이동 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousGroup}
            // isDisabled={startPage === 1}
          />
        </PaginationItem>

        {/* 동적 페이지 버튼 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={page === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 그룹 이동 */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextGroup}
            // isDisabled={endPage === TOTAL_PAGES}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationFooter };
