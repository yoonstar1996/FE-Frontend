"use client";

import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { taskAtom } from "@/stores/atom";
import { Board } from "@/types";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCreateBoard } from "@/hooks/api";
import { isDayPickerSingle } from "react-day-picker";

interface Props {
  children: React.ReactNode;
  board: Board;
}

function MarkdownEditorDialog({ children, board }: Props) {
  const { id } = useParams();
  const [task, setTask] = useAtom(taskAtom);
  const { toast } = useToast();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [content, setContent] = useState<string>("**Hello, World**");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const updateBoards = useCreateBoard();

  const handleInsert = async (boardId: string) => {
    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 값이 있습니다.",
        description: "title, content는 필수 입니다.",
      });
      return;
    }

    try {
      const newBoards = task?.boards.map((board: Board) => {
        if (board.id === boardId) {
          return { ...board, isCompleted, title, startDate, endDate, content };
        }
        return board;
      });
      await updateBoards(Number(id), "boards", newBoards);
      handleCloseDialog();
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "에러 발생",
        variant: "destructive",
      });
    }

    console.log(isCompleted, title, startDate, endDate, content);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    initState();
  };

  const initState = () => {
    setIsCompleted(board.isCompleted || false);
    setTitle(board.title || "");
    setStartDate(board.startDate ? new Date(board.startDate) : undefined);
    setEndDate(board.endDate ? new Date(board.endDate) : undefined);
    setContent(board.content || "");
  };

  useEffect(() => {
    initState();
  }, [board]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col">
          <DialogTitle>
            <div className="flex items-center justify-start gap-2">
              <Checkbox
                className="h-5 w-5 min-w-5"
                checked={isCompleted}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") setIsCompleted(checked);
                }}
              />
              <input
                type="text"
                placeholder="게시물의 제목을 입력하세요."
                className="w-full text-xl outline-none bg-transparent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            마크다운 에디터를 사용하여 TODO-BOARD를 예쁘게 꾸며보세요.
          </DialogDescription>
        </DialogHeader>
        {/* 캘린더 박스 */}
        <div className="flex items-center gap-5">
          <LabelDatePicker
            label={"From"}
            value={startDate}
            onChange={setStartDate}
          />
          <LabelDatePicker label={"To"} value={endDate} onChange={setEndDate} />
        </div>
        <Separator />
        {/* 마크다운 에디터 UI 영역 */}
        <MarkdownEditor
          className="h-[320px]"
          value={content}
          onChange={setContent}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              variant={"outline"}
              onClick={handleCloseDialog}
            >
              취소
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            onClick={() => handleInsert(board.id)}
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { MarkdownEditorDialog };
