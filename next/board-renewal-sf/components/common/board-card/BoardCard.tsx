"use client";

import {
  Button,
  Card,
  Checkbox,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { ChevronUp } from "@/public/assets/icons";
import { MarkdownEditorDialog } from "@/components/common";
import { useDeleteBoard } from "@/hooks/api";
import { useParams } from "next/navigation";
import { Board } from "@/types";

interface Props {
  board: Board;
}

function BoardCard({ board }: Props) {
  const { id } = useParams();
  const handleDeleteBoard = useDeleteBoard(Number(id), board.id);

  return (
    <Card className="w-full flex flex-col items-center p-5">
      {/* 게시물 카드 제목 영역*/}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="w-full flex items-center justify-start gap-2">
          <Checkbox className="h-5 w-5" checked={board.isCompleted} />
          <input
            type="text"
            placeholder="등록된 제목이 없습니다."
            className="w-full text-xl outline-none bg-transparent"
            disabled={true}
            value={board.title}
          />
        </div>
        <Button variant={"ghost"} size={"icon"}>
          <ChevronUp className="text-[#6d6d6d]" />
        </Button>
      </div>
      {/* 캘린더 및 버튼 박스 영역 */}
      <div className="w-full flex items-center justify-between">
        {/* 캘린더 박스 */}
        <div className="flex items-center gap-5">
          <LabelDatePicker
            label={"From"}
            isReadOnly={true}
            value={board.startDate}
          />
          <LabelDatePicker
            label={"To"}
            isReadOnly={true}
            value={board.endDate}
          />
        </div>
        {/* 버튼 박스 */}
        <div className="flex items-center">
          <Button variant={"ghost"} className="font-normal text-[#6D6D6D]">
            Duplicate
          </Button>
          <Button
            className="font-normal text-rose-600 hover:text-rose-600 hover:bg-red-50"
            variant={"ghost"}
            onClick={handleDeleteBoard}
          >
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-3" />
      {/* Add Contents 버튼 영역 */}
      <MarkdownEditorDialog board={board}>
        <Button variant={"ghost"} className="font-normal text-[#6D6D6D]">
          {board.title ? "Update Contents" : "Add Contents"}
        </Button>
      </MarkdownEditorDialog>
    </Card>
  );
}

export { BoardCard };
