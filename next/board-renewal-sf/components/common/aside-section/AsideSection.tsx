"use client";

import { Button, SearchBar } from "@/components/ui";
import { useCreateTask, useGetTasks } from "@/hooks/api";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Task } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavUser } from "./NavUser";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/atom";

function AsideSection() {
  const { id } = useParams();
  const { tasks, setTasks, getTasks } = useGetTasks();
  const handleCreateTasks = useCreateTask();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const user = useAtomValue(userAtom); // useAtomValue: read

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const { data, status, error } = await supabase
          .from("tasks")
          .select("*")
          .ilike("title", `%${searchTerm}%`);

        if (data && status === 200) {
          setTasks(data); // jotai의 tasksAtom 상태를 업데이트
        }

        if (error) {
          toast({
            variant: "destructive",
            title: "ERROR 발생",
            description: `supabase 오류: ${error.message || "알 수 없는 오류"}`,
          });
        }
      } catch (error) {
        console.log("error: ", error);
        toast({
          title: "ERROR 발생",
          description: "콘솔 확인.",
          variant: "destructive",
        });
      }
    }
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
          <small className="text-sm font-medium leading-none text-neutral-800">
            {"Yoonstar's"}
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
