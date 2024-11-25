"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { taskAtom } from "@/stores/atom";
import { Board } from "@/types";
import { useAtom } from "jotai";
import { useGetTaskById } from "./useGetTaskById";

const useDeleteBoard = (taskId: number, boardId: string) => {
  const { toast } = useToast();
  const [task] = useAtom(taskAtom);
  const { getTaskById } = useGetTaskById(taskId);

  const deleteBoard = async () => {
    try {
      const { status, error } = await supabase
        .from("tasks")
        .update({
          boards: task?.boards.filter((board: Board) => board.id !== boardId),
        })
        .eq("id", taskId);

      if (status === 204) {
        toast({
          title: "해당 board 삭제",
          description: "새로운 board를 생성하세요.",
        });
        getTaskById();
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

  return deleteBoard;
};

export { useDeleteBoard };
