"use client";

import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tasksAtom } from "@/stores/atom";

const useCreateTask = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [, setTasks] = useAtom(tasksAtom);

  const createTask = async () => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .insert([{ title: null, start_date: null, end_date: null, boards: [] }])
        .select();

      if (data && status === 201) {
        // store에 분리해둔 tasks에 할당하기(기존에 존재하는 tasks는 유지해야함)
        setTasks((prevTask) => [...prevTask, data[0]]);

        router.push(`/board/${data[0].id}`);
        toast({
          title: "새로운 TASK가 생성",
          description: "나만의 TODO-BOARD를 생성하세요.",
        });
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

  return createTask;
};

export { useCreateTask };
