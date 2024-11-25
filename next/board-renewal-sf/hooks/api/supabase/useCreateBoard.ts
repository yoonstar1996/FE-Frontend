"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { taskAtom } from "@/stores/atom";
import { useAtom } from "jotai";

const useCreateBoard = () => {
  const { toast } = useToast();
  const [, setTask] = useAtom(taskAtom);
  const createBoard = async (
    taskId: number,
    column: string,
    newValue: unknown
  ) => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .update({ [column]: newValue })
        .eq("id", taskId)
        .select();

      if (data && status === 200) {
        toast({
          title: "새로운 board 생성 완료",
          description: "생성한 board를 잘 작성해보세요.",
        });
        setTask(data[0]);
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "ERROR 발생",
          description: `supabase 오류: ${error.message || "알 수 없는 오류"}`,
        });
      }
    } catch (error) {
      console.error("error: ", error);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: `서버와 연결할 수 없습니다. 다시 시도해주세요.`,
      });
    }
  };

  return createBoard;
};

export { useCreateBoard };
