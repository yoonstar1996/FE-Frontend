"use client";

import { Button, SearchBar } from "@/components/ui";
import { useCreateTask, useGetTasks } from "@/hooks/api";
import { Task } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavUser } from "./NavUser";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/atom";
import { useSearch } from "@/hooks/api/supabase/useSearch";

function AsideSection() {
  const { id } = useParams();
  const { tasks, getTasks } = useGetTasks();
  const { search } = useSearch();
  const handleCreateTasks = useCreateTask();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const user = useAtomValue(userAtom); // useAtomValue: read

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") search(searchTerm);
    else return;
  };

  useEffect(() => {
    getTasks();
  }, [id]);

  return (
    <aside className="page__aside">
      <div className="flex flex-col h-full gap-3">
        {/* 검색창 UI */}
        <SearchBar
          placeholder="검색어를 입력하세요."
          onKeyDown={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Add New Page 버튼 UI */}
        <Button
          className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]"
          onClick={handleCreateTasks}
        >
          Add New Page
        </Button>
        {/* TODO 목록 UI 하나 */}
        <div className="flex flex-col mt-4 gap-2">
          <small className="text-sm font-medium leading-none text-[#A6A6A6]">
            <span className="text-neutral-700">
              {user?.nickname ? user?.nickname : "알 수 없음님"}
            </span>
            의 TODO-BOARD
          </small>
          <ul className="flex flex-col">
            {tasks.length === 0 ? (
              <li className="flex items-center">
                <div className={`h-[6px] w-[6px] rounded-full bg-slate-400`} />
                <span className="min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
                  등록된 TASK가 없습니다.
                </span>
              </li>
            ) : (
              tasks.map((task: Task) => (
                <li key={task.id}>
                  <Link
                    href={`/board/${task.id}`}
                    className={`${
                      task.id === Number(id) && "bg-[#F5F5F5]"
                    } min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer hover:bg-[#f5f5f5]`}
                  >
                    <div
                      className={`h-[6px] w-[6px] rounded-full ${
                        task.id === Number(id) ? "bg-[#00F38D]" : "bg-slate-400"
                      }`}
                    />
                    <span
                      className={`${
                        task.id === Number(id) ? "" : "text-neutral-400"
                      } `}
                    >
                      {task.title ? task.title : "타이틀을 입력해주세요."}
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <NavUser user={user} />
    </aside>
  );
}

export { AsideSection };
