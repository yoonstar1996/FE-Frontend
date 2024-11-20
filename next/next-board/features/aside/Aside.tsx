import { Button, SearchBar } from "@/components/ui";
import { useCreatePages } from "@/hooks/useCreatePages";
import React from "react";

function Aside() {
  const { createPage } = useCreatePages();

  return (
    <aside className="page__aside">
      {/* 검색창 UI */}
      <SearchBar placeholder="검색어를 입력하세요." />
      {/* Add New Page 버튼 UI */}
      <Button
        className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]"
        onClick={createPage}
      >
        Add New Page
      </Button>
      {/* TODO 목록 UI 하나 */}
      <div className="flex flex-col mt-4 gap-2">
        <small className="text-sm font-medium leading-none text-[#A6A6A6]">
          {"Yoonstar's"}
        </small>
        <ul className="flex flex-col">
          <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
            Enter Title
          </li>
          <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
            Enter Title
          </li>
        </ul>
      </div>
    </aside>
  );
}

export { Aside };
