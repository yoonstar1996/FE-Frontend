import { useAtom } from "jotai";
import { pageAtom } from "@/store";

const ITEMS_PER_PAGE = 30; // 한 페이지당 항목 수
const TOTAL_ITEMS = 10000; // 전체 데이터 수
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE); // 전체 페이지 수
const PAGE_GROUP_SIZE = 5; // 한 번에 보여줄 페이지 버튼 개수

export function Pagination() {
  const [currentPage, setPage] = useAtom(pageAtom);

  // 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      setPage(page);
    }
  };

  // 이전 그룹으로 이동
  const handlePreviousGroup = () => {
    const newPage = (currentGroup - 1) * PAGE_GROUP_SIZE;
    setPage(newPage);
  };

  // 다음 그룹으로 이동
  const handleNextGroup = () => {
    const newPage = currentGroup * PAGE_GROUP_SIZE + 1;
    setPage(newPage);
  };

  // 현재 그룹에 해당하는 페이지 버튼 생성
  const renderPageButtons = () => {
    const buttons = [];
    const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(currentGroup * PAGE_GROUP_SIZE, TOTAL_PAGES);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`pagination__button ${
            page === currentPage ? "active" : ""
          }`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePreviousGroup}
        disabled={currentGroup === 1}
        className="pagination__button"
      >
        Previous
      </button>
      {renderPageButtons()}
      <button
        onClick={handleNextGroup}
        disabled={currentGroup * PAGE_GROUP_SIZE >= TOTAL_PAGES}
        className="pagination__button"
      >
        Next
      </button>
    </div>
  );
}
