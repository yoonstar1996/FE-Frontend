import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
} from "@/components/ui";
import { addBookmark } from "@/components/utils";
import { useToast } from "@/hooks/use-toast";
import { Image } from "@/types";
import {
  AlignLeft,
  ClipboardPenLine,
  FolderOpen,
  Heart,
  Pin,
} from "lucide-react";

interface Props {
  data: Image;
  pathname?: string;
  handleClickRemoveBookmark?: (id: React.MouseEvent<HTMLButtonElement>) => void;
}

function ImageCard({ data, pathname, handleClickRemoveBookmark }: Props) {
  const {
    urls,
    description,
    alt_description,
    created_at,
    likes,
    liked_by_user,
    user,
  } = data;

  const { toast } = useToast();

  const formattedDate = created_at?.split("T")[0] || "알 수 없음";
  const formattedLikes =
    likes?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";

  const handleClickAddBookmark = () => {
    const result = addBookmark(data);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
  };

  return (
    <div className="flex flex-col justify-between space-y-3 w-64 h-64 cursor-pointer">
      <div className="relative flex flex-col gap-3">
        {/* 이미지 상세보기 다이얼로그 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="absolute top-2 right-4 z-10 bg-neutral-500 bg-opacity-50 hover:bg-opacity-50"
            >
              <FolderOpen className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>이미지 상세정보</DialogTitle>
              <DialogDescription>
                선택한 이미지의 상세정보를 확인하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-3">
              {urls?.regular ? (
                <img
                  src={urls.regular}
                  className="h-80 w-full rounded-xl"
                  alt={alt_description}
                />
              ) : (
                <Skeleton className="h-80 w-full rounded-xl" />
              )}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile_image?.small}
                      alt={user?.username || "Unknown"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <small className="text-sm font-medium">
                    {user?.username || "unknown"}
                  </small>
                </div>
                <Button
                  variant="secondary"
                  onClick={
                    pathname
                      ? handleClickRemoveBookmark
                      : handleClickAddBookmark
                  }
                >
                  북마크 {pathname ? "삭제" : "추가"}
                </Button>
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center">
                  <Pin className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                  <span className="text-sm">
                    {user?.location || "위치 정보 없음"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClipboardPenLine className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                  <span className="text-sm">
                    {alt_description || "설명 없음"}
                  </span>
                </div>
                <div className="flex items-start">
                  <AlignLeft className="h-4 w-4 mt-[2px] mr-1 min-w-4" />
                  <span className="text-sm">
                    {description || "등록된 설명글이 없습니다."}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end w-full gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <p className="leading-7">게시일:</p>
                  {formattedDate}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Heart
                    className="h-[14px] w-[14px] mt-[2px] text-rose-600"
                    fill={liked_by_user ? "#e11d48" : "#fff"}
                  />
                  {formattedLikes}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 이미지 썸네일 */}
        {urls?.thumb ? (
          <img
            src={urls.thumb}
            className="w-[256px] h-[150px]"
            alt={alt_description}
          />
        ) : (
          <Skeleton className="w-[256px] h-[150px] rounded-xl" />
        )}
        <small className="w-full text-sm font-medium line-clamp-2">
          {description || "등록된 설명글이 없습니다."}
        </small>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1 text-sm">
            <span className="leading-7">게시일:</span>
            {formattedDate}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Heart
              className="h-[14px] w-[14px] mt-[2px] text-rose-600"
              fill={liked_by_user ? "#e11d48" : "#fff"}
            />
            {formattedLikes}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ImageCard };
