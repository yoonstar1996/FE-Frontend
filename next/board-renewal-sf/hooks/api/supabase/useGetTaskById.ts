"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { taskAtom } from "@/stores/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

const useGetTaskById = (taskId: number) => {
  const { toast } = useToast();
  const [task, setTask] = useAtom(taskAtom);
  const getTaskById = async () => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", taskId);

      if (data && status === 200) setTask(data[0]);

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
    if (taskId) getTaskById();
  }, [taskId]);

  return { task, getTaskById };
};

export { useGetTaskById };
