"use client";

import { ChangeEvent, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
// 고유 ID 라이브러리
import { nanoid } from "nanoid";
// UI
import { Button, DatePicker, Progress } from "@/components/ui";
// FSD
import { BoardCard, NoBoard } from "@/features";
// 스타일
import styles from "./page.module.scss";
// DB
import { supabase } from "@/lib/supabase";
import { useAtom } from "jotai";
import { currentPageAtom } from "@/store";
import { BoardData } from "@/app/types";

function BoardPage() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const { id } = useParams();

  const fetchPage = async () => {
    try {
      const { data, status } = await supabase
        .from("todos")
        .select()
        .eq("id", id);

      console.log("페이지 이동 후 데이터 받기", data);

      if (status === 200 && data) {
        setCurrentPage(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentPage((prev) => ({ ...prev, title: input }));
  };

  const onSelectDate = (label: "from" | "to", date: Date) => {
    const page = { ...currentPage };

    // 시간 오프셋 계산
    const offsetInMinutes = date.getTimezoneOffset();
    const koreaTime = new Date(date.getTime() - offsetInMinutes * 60 * 1000);

    page[label] = koreaTime;
    setCurrentPage(page);
  };

  const onSave = async () => {
    try {
      const { data, status } = await supabase
        .from("todos")
        .update(currentPage)
        .eq("id", id)
        .select();
      if (status === 200 && data) {
        setCurrentPage(data[0]);
        fetchPage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddBoard = async () => {
    const newBoards: BoardData[] = [...(currentPage.boards || [])];
    const boardContent = {
      id: nanoid(8),
      isCompleted: false,
      title: "",
      from: null,
      to: null,
      contents: "",
    };
    newBoards.push(boardContent);
    setCurrentPage({ ...currentPage, boards: newBoards });
  };

  const onDeleteBoard = async () => {
    try {
      await supabase.from("todos").update({ boards: [] }).eq("id", id).select();
      fetchPage();
    } catch (error) {
      console.log(error);
    }
  };

  const boardsCount = useMemo(() => {
    return currentPage.boards ? currentPage.boards.length : 0;
  }, [currentPage]);

  const completedCount = useMemo(() => {
    return currentPage.boards
      ? currentPage.boards.reduce(
          (acc, cur) => (cur.isCompleted ? acc + 1 : acc),
          0
        )
      : 0;
  }, [currentPage]);

  const progressRate =
    boardsCount === 0 ? 0 : (completedCount / boardsCount) * 100;

  useEffect(() => {
    fetchPage();
  }, [id, setCurrentPage]);

  return (
    <main className="page__main">
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} onClick={onSave}>
              저장
            </Button>
            <Button
              variant={"secondary"}
              className="text-rose-600 hover:bg-rose-50"
              onClick={onDeleteBoard}
            >
              삭제
            </Button>
          </div>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 Input 섹션 */}
          <input
            type="text"
            placeholder="Enter Title Here!"
            className={styles.header__top__input}
            value={currentPage.title}
            onChange={onChangeTitle}
          />
          {/* 진행상황 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6D6D6D]">
              {completedCount}/{boardsCount} Completed
            </small>
            <Progress className="w-60 h-[10px]" value={progressRate} />
          </div>
        </div>
        {/* 캘린더 + Add New Board 버튼 섹션 */}
        <div className={styles.header__bottom}>
          <div className="flex items-center gap-5">
            <DatePicker
              label={"From"}
              value={currentPage.from}
              onSelect={onSelectDate}
            />
            <DatePicker
              label={"To"}
              value={currentPage.to}
              onSelect={onSelectDate}
            />
          </div>
          <Button
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={onAddBoard}
          >
            Add New Board
          </Button>
        </div>
      </div>

      <div className="w-full h-full py-7 px-4 flex flex-col gap-5">
        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
        {currentPage && currentPage.boards.length ? (
          currentPage.boards.map((board) => (
            <BoardCard key={board.id} data={board} />
          ))
        ) : (
          // <div className="h-full">
          <NoBoard />
          // </div>
        )}
      </div>
    </main>
  );
}

export default BoardPage;
