"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { Board } from "@/types";
import { AlertPopup, BoardCard } from "@/components/common";
import { Button, Progress, LabelDatePicker } from "@/components/ui";
import styles from "./page.module.scss";
import { ChevronLeft } from "lucide-react";
import { useCreateBoard, useGetTaskById, useGetTasks } from "@/hooks/api";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

function BoardPage() {
  const { id } = useParams();
  const { getTasks } = useGetTasks();
  const { task } = useGetTaskById(Number(id));
  const router = useRouter();

  const { toast } = useToast();
  const createBoard = useCreateBoard();

  // board의 상태 값
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [count, setCount] = useState(0);
  const [boards, setBoards] = useState<Board[]>([]);

  const handleAddBoard = () => {
    const newBoard: Board = {
      id: nanoid(),
      title: "",
      startDate: undefined,
      endDate: undefined,
      content: "",
      isCompleted: false,
    };
    const newBoards = [...boards, newBoard];

    setBoards(newBoards);
    createBoard(Number(id), "boards", newBoards);
  };

  const handleSave = async () => {
    if (!title || !startDate || !endDate) {
      toast({
        title: "기입되지 않은 값이 있습니다.",
        description: "모든 값을 입력해주세요.",
      });
      return;
    }

    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .update({
          title,
          start_date: startDate,
          end_date: endDate,
        })
        .eq("id", id)
        .select();

      if (data !== null && status === 200) {
        toast({
          title: "task 저장 완료",
          description: "마감일을 지켜주세요.",
        });
        getTasks();
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
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setStartDate(task.start_date ? new Date(task.start_date) : undefined);
      setEndDate(task.end_date ? new Date(task.end_date) : undefined);
      setBoards(task.boards);
    }
  }, [task]);

  useEffect(() => {
    if (task?.boards) {
      const completedCount = task.boards.filter(
        (board: Board) => board.isCompleted
      ).length;
      setCount(completedCount);
    }
  }, [task?.boards]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => router.push("/")}
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} onClick={handleSave}>
              저장
            </Button>
            <AlertPopup>
              <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">
                삭제
              </Button>
            </AlertPopup>
          </div>
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
              {count}/{task?.boards.length} Completed
            </small>
            <Progress
              className="w-60 h-[10px]"
              value={
                task && task.boards.length > 0
                  ? (count / task.boards.length) * 100
                  : 0
              }
            />
          </div>
        </div>
        {/* 캘린더 + Add New Board 버튼 섹션 */}
        <div className={styles.header__bottom}>
          <div className="flex items-center gap-5">
            <LabelDatePicker
              label={"From"}
              value={startDate}
              onChange={setStartDate}
            />
            <LabelDatePicker
              label={"To"}
              value={endDate}
              onChange={setEndDate}
            />
          </div>
          <Button
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={handleAddBoard}
          >
            Add New Board
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        {boards.length !== 0 ? (
          <div className={styles.body__isData}>
            {boards.map((board: Board) => {
              return <BoardCard key={board.id} board={board} />;
            })}
          </div>
        ) : (
          <div className={styles.body__noData}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              There is no board yet.
            </h3>
            <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">
              Click the button and start flashing!
            </small>
            <button onClick={handleAddBoard}>
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
    </>
  );
}

export default BoardPage;
