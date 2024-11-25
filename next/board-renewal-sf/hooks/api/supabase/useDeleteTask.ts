"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

const useDeleteTask = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const router = useRouter();

  const deleteTask = async () => {
    try {
      const { status, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (status === 204) {
        router.push("/");
        toast({
          title: "삭제 완료",
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
      console.log("error: ", error);
      toast({
        title: "에러 발생",
        variant: "destructive",
      });
    }
  };

  return deleteTask;
};

export { useDeleteTask };
