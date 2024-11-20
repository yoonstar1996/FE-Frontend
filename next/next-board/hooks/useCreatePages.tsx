"use client";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { pagesAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export const useCreatePages = () => {
  const [pages, setPages] = useAtom(pagesAtom);
  const router = useRouter();
  const { toast } = useToast();

  const createPage = async () => {
    try {
      const { data, status, error } = await supabase
        .from("todos")
        .insert([
          {
            title: "",
            from: null,
            to: null,
            boards: [],
          },
        ])
        .select();

      if (status === 201 && data) {
        setPages([...pages, data[0]]);
        toast({
          title: "새로운 TODO-LIST 생성되었습니다.",
          description: "supabase 데이터베이스를 참고해보세요.",
        });
        router.push(`/board/${data[0].id}`);
      }

      if (error) {
        console.error("Error inserting data:", error);
        toast({
          variant: "destructive",
          title: "에러 발생",
          description: "에러 발생",
        });
        return;
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return { createPage };
};
