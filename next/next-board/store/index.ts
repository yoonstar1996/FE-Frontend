import { BoardData, Page } from "@/app/types";
import { atom } from "jotai";

export const defaultPage: Page = {
  id: 0,
  title: "",
  from: null,
  to: null,
  boards: [],
};

export const defaultBoard: BoardData = {
  id: "",
  title: "",
  from: null,
  to: null,
  contents: "",
  isCompleted: false,
};

export const pagesAtom = atom<Page[]>([]);
export const currentPageAtom = atom<Page>(defaultPage);
