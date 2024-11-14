import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  GetHourWidget,
} from "@/components";
import { ForecastDay, HourlyData } from "@/types";

interface Props {
  data: ForecastDay;
}

function GetHourlyWidget({ data }: Props) {
  if (!data || !data.hour) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  return (
    <Card className="flex-1 max-w-[calc(50%-48px)] h-full">
      <CardHeader>
        <CardTitle className="text-xl">Hourly</CardTitle>
        <CardDescription>
          오늘의 시간대별 날씨를 조회하고 있습니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex items-center gap-4 overflow-x-auto">
        {data.hour.map((item: HourlyData) => (
          <GetHourWidget key={item.time} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}

export { GetHourlyWidget };
