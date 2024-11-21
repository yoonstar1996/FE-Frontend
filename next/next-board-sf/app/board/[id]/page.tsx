"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
/** FSD 컴포넌트 */
import { AlertPopup, CardBoard } from "@/features";
import { Button, SearchBar, Progress, LabelDatePicker } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
/** 스타일 */
import styles from "./page.module.scss";
/** 타입 */
import { Task, BoardContent } from "@/features/board/types";

function BoardPage() {
    const pathname = usePathname();
    const { toast } = useToast();
    /** Supabase 'todos' 테이블에서 사용될 각 ROW 데이터 COLUMN */
    const [title, setTitle] = useState<string>(""); // 필수 값 처리 예정
    const [startDate, setStartDate] = useState<Date>(new Date()); // 필수 값 처리 예정
    const [endDate, setEndDate] = useState<Date>(new Date()); // 필수 값 처리 예정
    const [task, setTask] = useState<Task | null>(null); // 필수 값으로 처리할 지 안할 지 추후 고민

    /** 저장 버튼 클릭 시 */
    const onSave = async () => {
        try {
            if (!title || startDate || endDate) {
                toast({
                    variant: "destructive",
                    title: "기입되지 않은 데이터(값)가 있습니다.",
                    description: "수정한 TODO-LIST의 마감일을 꼭 지켜주세요!",
                });
            } else {
                const { status } = await supabase
                    .from("todos")
                    .update({ title: title, start_date: startDate, end_date: endDate })
                    .eq("id", Number(pathname.split("/")[2]));

                if (status === 204) {
                    toast({
                        title: "TODO-LIST 수정을 완료하였습니다.",
                        description: "수정한 TODO-LIST의 마감일을 꼭 지켜주세요!",
                    });
                    getData(); // 데이터 갱신
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    /** Add New Board 버튼을 클릭 시 */
    const createBoard = () => {
        let newBoards: BoardContent[] = [];
        const boardContent = {
            boardId: nanoid(),
            isCompleted: false,
            title: "",
            startDate: "",
            endDate: "",
            content: "",
        };

        /** Supabase에 만약 데이터가 있을 때 */
        if (task !== null && task.boards.length > 0) {
            newBoards = [...task.boards];
            newBoards.push(boardContent);
            updateBoards(newBoards);
        } else if (task !== null && task?.boards.length === 0) {
            /** Supabase에 만약 데이터가 없을 때 */
            newBoards.push(boardContent);
            updateBoards(newBoards);
        }
    };

    const updateBoards = async (newBoards: BoardContent[]) => {
        try {
            const { status, error } = await supabase
                .from("todos")
                .update({ boards: newBoards })
                .eq("id", Number(pathname.split("/")[2]));

            if (status === 204) {
                toast({
                    title: "새로운 TODO-BOARD가 생성되었습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
                });
                getData(); // 데이터 갱신
            }

            if (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: "개발자 도구창을 확인하세요.",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    /** Supabase 데이터베이스의(기존에 생성한 페이지에) 데이터 유무 체크 */
    const getData = async () => {
        const { data } = await supabase.from("todos").select("*"); // 전체 조회

        if (data !== null) {
            data.forEach((task: Task) => {
                if (task.id === Number(pathname.split("/")[2])) {
                    setTask(task);
                    setTitle(task.title);
                }
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="page">
            <aside className="page__aside">
                {/* 검색창 UI */}
                <SearchBar placeholder="검색어를 입력하세요." />
                {/* Add New Page 버튼 UI */}
                <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]">Add New Page</Button>
                {/* TODO 목록 UI 하나 */}
                <div className="flex flex-col mt-4 gap-2">
                    <small className="text-sm font-medium leading-none text-[#A6A6A6]">9Diin의 TODO-LIST</small>
                    <ul className="flex flex-col">
                        <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm">
                            <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
                            Enter Title
                        </li>
                        <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm text-sm">
                            <div className="h-[6px] w-[6px] rounded-full bg-[#00F38D]"></div>
                            Enter Title
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="page__main">
                <div className={styles.header}>
                    <div className={styles[`header__btn-box`]}>
                        <Button variant={"outline"} size={"icon"}>
                            <ChevronLeft />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button variant={"secondary"} onClick={onSave}>
                                저장
                            </Button>
                            <AlertPopup>
                                <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">삭제</Button>
                            </AlertPopup>
                        </div>
                    </div>
                    <div className={styles.header__top}>
                        {/* 제목 입력 Input 섹션 */}
                        <input
                            type="text"
                            placeholder="Enter Title Here!"
                            className={styles.header__top__input}
                            onChange={(event) => setTitle(event.target.value)} // title 상태값 갱신
                            value={title}
                        />
                        {/* 진행상황 척도 그래프 섹션 */}
                        <div className="flex items-center justify-start gap-4">
                            <small className="text-sm font-medium leading-none text-[#6D6D6D]">1/10 Completed</small>
                            <Progress className="w-60 h-[10px]" value={33} />
                        </div>
                    </div>
                    {/* 캘린더 + Add New Board 버튼 섹션 */}
                    <div className={styles.header__bottom}>
                        <div className="flex items-center gap-5">
                            <LabelDatePicker label={"From"} />
                            <LabelDatePicker label={"To"} />
                        </div>
                        <Button className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg" onClick={createBoard}>
                            Add New Board
                        </Button>
                    </div>
                </div>
                <div className={styles.body}>
                    {task?.boards.length === 0 ? (
                        <div className={styles.body__noData}>
                            {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 없을 경우 */}
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
                            <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
                            <button onClick={createBoard}>
                                <Image src="/assets/images/button.svg" width={74} height={74} alt="rounded-button" />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.body__isData}>
                            {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
                            {task?.boards.map((board: BoardContent) => {
                                return <CardBoard key={board.boardId} data={board} handleBoards={setTask} />;
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default BoardPage;
