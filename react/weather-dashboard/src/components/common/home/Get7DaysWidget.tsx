import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Get7DaysList,
} from "@/components";
import { WeatherInfo } from "@/types";

interface Props {
  data: WeatherInfo[];
}

function Get7DaysWidget({ data }: Props) {
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>7 Days</CardTitle>
        <CardDescription>이번주 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {data.map((item: WeatherInfo, index: number) => (
          <Get7DaysList key={index} data={item} />
        ))}
      </CardContent>
    </Card>
  );
}

export { Get7DaysWidget };
