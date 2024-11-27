"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { tasksAtom } from "@/stores/atom";
import { useAtom } from "jotai";

const useGetTasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useAtom(tasksAtom);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const getTasks = async () => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true })
        .eq("user_id", user?.id);

      if (data && status === 200) setTasks(data);

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
        variant: "destructive",
        title: "네트워크 오류",
        description: `서버와 연결할 수 없습니다. 다시 시도해주세요.`,
      });
    }
  };

  return { tasks, setTasks, getTasks };
};

export { useGetTasks };
