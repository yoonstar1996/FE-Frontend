"use client";

import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useCreateTask = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateTask = async () => {
    try {
      const { data, status, error } = await supabase
        .from("tasks")
        .insert([
          { title: null, start_date: null, end_date: null, boards: null },
        ])
        .select();

      if (status === 201 && data !== null) {
        router.push(`/board/${data[0].id}`);
        toast({
          title: "새로운 TASK가 생성",
          description: "나만의 TODO-BOARD를 생성하세요.",
        });
      } else if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error: ", error);
      toast({
        title: "ERROR 발생",
        description: "콘솔 확인.",
        variant: "destructive",
      });
    }
  };

  return { handleCreateTask };
};
