import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components";
import { CalendarDays, MapPin } from "lucide-react";

function GetTodayWidget() {
  return (
    <Card className="w-1/4 min-w-[25%]">
      <CardHeader>
        <CardTitle className="text-xl">Today</CardTitle>
        <CardDescription>오늘 현재 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full flex flex-col ">
          <div className="flex items-center gap-4 ">
            {/* 날씨 아이콘 */}
            <img
              className="w-16 h-16"
              src="src/assets/icons/1000d.svg"
              alt="날씨 이미지"
            />
            <div className="w-full flex items-start gap-1">
              <span className="poppins-bold scroll-m-20 text-6xl font-extrabold tracking-tight">
                19
              </span>
              <span className="text-4xl font-extrabold">&#8451;</span>
            </div>
          </div>
          <Separator className="mt-2 mb-3" />
          <div className="w-full flex flex-col">
            {/* 캘린더 영역 */}
            <div className="flex items-center justify-start gap-2">
              <CalendarDays className="w-4 h-4" />
              <p className="leading-6">2024-11-13</p>
            </div>
            {/* 현재 위치 영역 */}
            <div className="flex items-center justify-start gap-2">
              <MapPin className="w-4 h-4" />
              <p className="leading-6">Seoul South Korea</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { GetTodayWidget };
