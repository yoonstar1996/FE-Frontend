import { Image } from "@/types";

// 북마크 가져오기
export const getBookmarks = (): Image[] => {
  const bookmarks = localStorage.getItem("bookmark");
  return bookmarks ? JSON.parse(bookmarks) : [];
};

// 북마크 추가
export const addBookmark = (imageData: Image) => {
  const bookmarks = getBookmarks();
  if (bookmarks.some((item) => item.id === imageData.id)) {
    return { success: false, message: "이미 북마크에 저장되어있습니다." };
  }
  const updatedBookmarks = [...bookmarks, imageData];
  localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
  return { success: true, message: "북마크 저장 완료" };
};

// 북마크 삭제
export const removeBookmark = (id: number): Image[] => {
  const bookmarks = getBookmarks();
  const updatedBookmarks = bookmarks.filter((item) => item.id !== id);
  localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
  return updatedBookmarks;
};
