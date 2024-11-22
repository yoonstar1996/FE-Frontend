"use client";

/** UI 컴포넌트 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

function AlertPopup({ children }: Props) {
  const { id } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteTask = async () => {
    try {
      const { status } = await supabase.from("tasks").delete().eq("id", id);
      if (status === 204) {
        router.push("/");
        toast({
          title: "삭제 완료",
        });
      }
      console.log(status);
    } catch (error) {
      console.log("error: ", error);
      toast({
        title: "에러 발생",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            해당 TASK를 정말로 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이 작업이 실행되면 다시 취소할 수 없습니다.
            <br /> 삭제가 진행되면 귀하의 게시물은 영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTask}
            className="bg-red-600 hover:bg-rose-600"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertPopup };
