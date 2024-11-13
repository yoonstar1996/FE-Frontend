import {
  Header,
  GetTodayWidget,
  GetHourlyWidget,
  GetKakaoMapWidget,
  GetTodaysHighlightsWidget,
  Get7DaysWidget,
} from "@/components";

export default function HomePage() {
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <div className="w-full h-full bg-black flex flex-col items-center justify-start pb-6 px-6 gap-6">
          {/** 상단의 3개 위젯 */}
          <div className="w-full flex items-center gap-6">
            <GetTodayWidget />
            <GetHourlyWidget />
            <GetKakaoMapWidget />
          </div>
          {/** 하단의 2개 위젯 */}
          <div className="w-full flex items-center gap-6">
            <GetTodaysHighlightsWidget />
            <Get7DaysWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
