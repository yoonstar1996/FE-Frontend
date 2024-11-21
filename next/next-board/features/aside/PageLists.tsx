"use client";

import { supabase } from "@/lib/supabase";
import { pagesAtom } from "@/store";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { PageListItem } from "./PageListItem";

function PageLists() {
  const [pages, setPages] = useAtom(pagesAtom);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data, status } = await supabase
          .from("todos")
          .select("*")
          .order("created_at", { ascending: true });
        console.log("페이지 리스트 데이터: ", data);

        if (status === 200 && data) {
          setPages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPages();
  }, []);

  return (
    <div className="flex flex-col mt-4 gap-2">
      <small className="text-sm font-medium leading-none text-[#A6A6A6]">
        {"Yoonstar's"}
      </small>
      <ul className="flex flex-col">
        {pages &&
          pages.map((page) => <PageListItem key={page.id} data={page} />)}
      </ul>
    </div>
  );
}

export { PageLists };
