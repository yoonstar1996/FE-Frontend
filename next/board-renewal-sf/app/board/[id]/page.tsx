"use client";

import Image from "next/image";
/** UI 컴포넌트 */
import { AlertPopup, BoardCard } from "@/components/common";
import { Button, Progress, LabelDatePicker } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
/** 스타일 */
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { Board, Task } from "@/types";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";

function BoardPage() {
  const { toast } = useToast();
  const { id } = useParams();
  const [task, setTask] = useState<Task>();
  const [boards, setBoards] = useState<Board[]>(task?.boards || []);

  const getTask = async () => {
    try {
      const { data, status } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id);

      if (data !== null && status === 200) {
        setTask(data[0]);
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

  const handleAddBoard = () => {
    const newBoard: Board = {
      id: nanoid(),
      title: "",
      startDate: null,
      endDate: null,
      content: "",
      isCompleted: false,
    };

    setBoards((prevBoards) => [...prevBoards, newBoard]);
    updateTaskOneColumnById(Number(id), "boards", [...boards, newBoard]);
  };

  const updateTaskOneColumnById = async (
    uid: number,
    column: string,
    newValue: unknown
  ) => {
    try {
      const { data, status } = await supabase
        .from("tasks")
        .update({ [column]: newValue })
        .eq("id", uid)
        .select();

      console.log(data, newValue);

      if (data !== null && status === 200) {
        toast({
          title: "새로운 boards 생성 완료",
        });
        getTask();
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
    getTask();
  }, []);

  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles[`header__btn-box`]}>
          <Button variant={"outline"} size={"icon"}>
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant={"secondary"}>저장</Button>
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
            <LabelDatePicker label={"From"} />
            <LabelDatePicker label={"To"} />
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
              return <BoardCard key={board.id} />;
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
