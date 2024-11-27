"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "@/public/assets/icons/index";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/atom";
import useEmailCheck from "@/hooks/use-email";
import { FindPasswordPopup } from "@/components/common";

function LoginPage() {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();
  const { checkEmail } = useEmailCheck();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [, setUser] = useAtom(userAtom);

  const signInWithEmail = async () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "기입되지 않은 값이 있습니다.",
      });
      return;
    }

    if (!checkEmail(email)) {
      toast({
        variant: "destructive",
        title: "이메일 양식에 맞지 않습니다.",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast({
          variant: "destructive",
          title: "ERROR 발생",
          description: `supabase 오류: ${error.message || "알 수 없는 오류"}`,
        });
        return;
      } else if (data && !error) {
        toast({
          title: "로그인 성공!",
        });
        const userData = {
          id: data.user?.id || "",
          email: data.user?.email || "",
          phoneNumber: data.user?.user_metadata.phoneNumber || "",
          nickname: data.user?.user_metadata.nickname || "",
          imgUrl: "/assets/images/profile.jpg",
        };
        document.cookie = `user=${JSON.stringify(
          userData
        )}; path=/; max-age=3600`;

        router.push("/board");
        setUser(userData);
      }
    } catch (error) {
      console.error("error: ", error);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: `서버와 연결할 수 없습니다. 다시 시도해주세요.`,
      });
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickShowPasswordButton = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    /** 로컬스토리지에 user 데이터 유무 체크 후 리다이렉션 */
    const user = localStorage.getItem("user");
    if (user) router.push("/board");
  }, [router]);

  return (
    <div className="page">
      <div className="page__container">
        {/* 소개 문구 */}
        <div className="flex flex-col items-center mt-10">
          <h4 className="text-lg font-semibold">안녕하세요🖐️</h4>
          <div className="flex flex-col items-center justify-center mt-2 mb-4">
            <div className="text-sm text-muted-foreground">
              <small className="text-sm text-[#e79067] font-medium leading-none">
                TASK 관리 앱
              </small>
              에 방문해주셔서 감사합니다.
            </div>
            <p className="text-sm text-muted-foreground">
              서비스를 이용하려면 로그인을 진행해주세요.
            </p>
          </div>
        </div>
        <Card className="w-[400px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              로그인을 위한 정보를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요."
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div className="relative grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <FindPasswordPopup>
                  <p className="ml-auto inline-block text-sm underline cursor-pointer">
                    비밀번호를 잊으셨나요?
                  </p>
                </FindPasswordPopup>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={handleChangePassword}
                required
              />
              <Button
                onClick={handleClickShowPasswordButton}
                size={"icon"}
                className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </CardContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <CardFooter className="flex flex-col mt-6">
            <Button
              onClick={signInWithEmail}
              className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
            >
              로그인
            </Button>
            <div className="mt-4 text-center text-sm">
              계정이 없으신가요?
              <Link href={"/signup"} className="underline text-sm ml-1">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
