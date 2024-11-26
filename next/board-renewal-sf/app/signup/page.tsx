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
import { Eye, EyeOff } from "@/public/assets/icons/index";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import useEmailCheck from "@/hooks/use-email";

function SignUpPage() {
  const router = useRouter();
  const { checkEmail } = useEmailCheck();
  const { toast } = useToast();
  const supabase = createClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const signUpNewUser = async () => {
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

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "비밀번호는 8자리 이상이어야 합니다.",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
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
          title: "회원가입 성공!",
        });
        router.push("/");
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

  const handleClickShowPasswordButton = () => setShowPassword((prev) => !prev);

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
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>
              계정을 생성하기 위해 아래 정보를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {/* <div className="grid gap-2">
              <Label htmlFor="phone_number">휴대폰 번호</Label>
              <Input
                id="phone_number"
                placeholder="휴대폰 번호를 입력하세요."
                required
              />
            </div> */}
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
              <Label htmlFor="password">비밀번호</Label>
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
                className="absolute top-8 right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
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
                간편 회원가입을 원하시면 이전 버튼을 누르세요.
              </span>
            </div>
          </div>
          <CardFooter className="w-full flex flex-col mt-6">
            <div className="w-full flex items-center gap-4">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => router.push("/")}
              >
                이전
              </Button>
              <Button
                onClick={signUpNewUser}
                className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
              >
                회원가입
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              이미 계정이 있으신가요?{" "}
              <Link href={"/"} className="underline text-sm ml-1">
                로그인
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUpPage;
