"use client";

import { MarkdownEditorDialog } from "@/features";
import {
  Button,
  Card,
  Checkbox,
  CustomButton,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

interface Props {
  id?: number;
}

function CardBoard({ id }: Props) {
  const [todos, setTodos] = useState([]);

  const handleClickAddNewBoard = async () => {
    const { data } = await supabase
      .from("todos")
      .update({
        boards: [
          {
            // id: pathname,
            // title: "",
            // start_date: startDate,
            // end_date: endDate,
          },
        ],
      })
      .eq("id", id)
      .select();
  };

  return (
    <div className="w-full bg-white flex flex-col gap-3 p-5 shadow-lg border border-neutral-100 rounded">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* 체크박스 */}
          <Checkbox
            className="w-5 h-5 border-neutral-400"
            onCheckedChange={(checked) => onCheck(checked)}
            checked={boardData.isCompleted}
          />
          <input
            type="text"
            placeholder="Board Title Here..."
            className="font-semibold text-2xl outline-none"
            value={boardData.title}
            onChange={onChangeTitle}
          />
        </div>
        <ChevronUp className="w-5 text-neutral-400" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatePicker
            label="From"
            value={boardData.from}
            onSelect={onSelectDate}
          />
          <DatePicker label="To" value={boardData.to} onSelect={onSelectDate} />
        </div>
        <div className="flex items-center">
          <CustomButton onClick={onClickDuplicate}>Duplicate</CustomButton>
          <CustomButton
            onClick={onClickDelete}
            className="text-red-500 hover:bg-red-100"
          >
            Delete
          </CustomButton>
        </div>
      </div>
      <Separator orientation="horizontal" />
      {/* 컨텐츠 영역 */}
      <div>
        <MarkdownEditor.Markdown source={boardData.contents} />
      </div>
      {/* Add contents 버튼 */}
      <MarkdownEditorDialog data={boardData} setData={setBoardData}>
        <CustomButton className="w-full" type="text">
          Add Contents
        </CustomButton>
      </MarkdownEditorDialog>
    </div>
  );
}

export { CardBoard };
