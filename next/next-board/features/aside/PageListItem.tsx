"use client";

import { Page } from "@/app/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  data: Page;
}

function PageListItem({ data }: Props) {
  const { id } = useParams();
  return (
    <li>
      <Link
        className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm"
        href={`/board/${data.id}`}
      >
        <div
          className={`h-[6px] w-[6px] rounded-full ${
            data.id === Number(id) ? "bg-[#00F38D]" : "bg-slate-800"
          }`}
        ></div>
        {data.title ? data.title : "등록된 Title이 없습니다."}
      </Link>
    </li>
  );
}
export { PageListItem };
