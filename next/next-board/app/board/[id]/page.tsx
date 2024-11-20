"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
// 고유 ID 라이브러리
import { nanoid } from "nanoid";
// UI
import { Button, Progress, LabelDatePicker } from "@/components/ui";
// FSD
import { CardBoard } from "@/features";
// 스타일
import styles from "./page.module.scss";
// DB
import { supabase } from "@/lib/supabase";
import { useAtom } from "jotai";
import { currentPageAtom } from "@/store";

interface Task {
  id: number;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  boards: BoardContent[];
}

interface BoardContent {
  boardId: string | number;
  isCompleted: boolean;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  content: string;
}

function BoardPage() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const { id } = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data, status } = await supabase
          .from("todos")
          .select()
          .eq("id", id);

        if (status === 200 && data) {
          setCurrentPage(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPage();
  }, [id, setCurrentPage]);

  // Supabase 'todos' 테이블에서 사용될 각 ROW 데이터 COLUMN
  const [task, setTask] = useState<Task>();

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [boards, setBoards] = useState<BoardContent[]>([]);

  const getTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching todo:", error);
    } else {
      console.log("Fetched Task:", data); // 데이터 확인
      setTask(data);
    }
  };

  const onSave = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("todos")
      .update({
        title: title,
      })
      .eq("id", parseInt(id as string));

    console.log("Data:", data);
    if (error) {
      console.error("Error saving data:", error);
    } else {
      console.log("Title updated successfully!");
      // 데이터가 변경된 후 바로 업데이트된 데이터를 fetch
      getTodo(); // 업데이트 후 데이터 다시 불러오기
    }
  };

  const createBoard = () => {
    let newBoards: BoardContent[] = [];
    const boardContent = {
      boardId: nanoid(8),
      isCompleted: false,
      title: "",
      startDate: "",
      endDate: "",
      content: "",
    };

    // supabase에 데이터가 있을 때
    if (task && task.boards.length > 0) {
      newBoards = [...task.boards, boardContent];
      // supabase에 데이터가 없을 때
    } else {
      newBoards.push(boardContent);
    }
  };

  useEffect(() => {
    if (!id) return;
    getTodo();
  }, [id]);

  return (
    <main className="page__main">
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
          <Button variant={"secondary"} onClick={onSave}>
            저장
          </Button>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 Input 섹션 */}
          <input
            type="text"
            placeholder="Enter Title Here!"
            className={styles.header__top__input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* 진행상황 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6D6D6D]">
              1/10 Completed
            </small>
            <Progress className="w-60 h-[10px]" value={33} />
          </div>
        </div>
        {/* 캘린더 + Add New Board 버튼 섹션 */}
        <div className={styles.header__bottom}>
          <div className="flex items-center gap-5">
            <LabelDatePicker
              label={"From"}
              date={startDate}
              setDate={setStartDate}
            />
            <LabelDatePicker label={"To"} date={endDate} setDate={setEndDate} />
          </div>
          <Button
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={createBoard}
          >
            Add New Board
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
        {currentPage && currentPage.boards.length ? (
          currentPage.boards.map((board) => (
            <CardBoard key={board.id} data={board} />
          ))
        ) : (
          // <div className={styles.body__isData}>
          //   <CardBoard />
          // </div>
          <div className={styles.body__noData}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              There is no board yet.
            </h3>
            <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">
              Click the button and start flashing!
            </small>
            <button
              onClick={() => {
                console.log("클릭");
              }}
            >
              <Image
                src="/assets/images/button.svg"
                width={74}
                height={74}
                alt="rounded-button"
              />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default BoardPage;
