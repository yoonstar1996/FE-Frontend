import { Header } from "@/components/common";
import { ImageCard } from "@/components/home";
import { removeBookmark } from "@/components/utils";
import { Image } from "@/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function BookmarkPage() {
  const { pathname } = useLocation();
  const [bookmarks, setBookmarks] = useState<Image[]>([]);

  const getBookmarks = () => {
    const bookmarks = localStorage.getItem("bookmark");
    return bookmarks ? JSON.parse(bookmarks) : [];
  };

  const handleRemoveBookmark = (id: number) => {
    const confirm = window.confirm("북마크를 삭제하시겠습니까?");

    if (confirm) {
      const updatedBookmarks = removeBookmark(id);
      setBookmarks(updatedBookmarks);
    }
  };

  useEffect(() => {
    const bookmarkStorage = getBookmarks();
    setBookmarks(bookmarkStorage);
  }, []);

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        {bookmarks ? (
          <div className="page__container__contents">
            {bookmarks.map((bookmark) => (
              <ImageCard
                key={bookmark.id}
                data={bookmark}
                pathname={pathname}
                handleClickRemoveBookmark={() =>
                  handleRemoveBookmark(bookmark.id)
                }
              />
            ))}
          </div>
        ) : (
          <div>
            <div>등록된 북마크가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookmarkPage;
