import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Get7DaysList,
} from "@/components";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const sampleDatas = [
  {
    imgUrl: "src/assets/icons/1000d.svg",
    highTemperature: 20,
    lowTemperature: 10,
  },
  {
    imgUrl: "src/assets/icons/1000n.svg",
    highTemperature: 15,
    lowTemperature: 3,
  },
  {
    imgUrl: "src/assets/icons/1003d.svg",
    highTemperature: 25,
    lowTemperature: 11,
  },
  {
    imgUrl: "src/assets/icons/1003n.svg",
    highTemperature: 32,
    lowTemperature: 12,
  },
  {
    imgUrl: "src/assets/icons/1006d.svg",
    highTemperature: 28,
    lowTemperature: 14,
  },
  {
    imgUrl: "src/assets/icons/1006n.svg",
    highTemperature: 10,
    lowTemperature: 5,
  },
  {
    imgUrl: "src/assets/icons/1030d.svg",
    highTemperature: 13,
    lowTemperature: 9,
  },
];

function Get7DaysWidget() {
  const sevenDaysDatas = Array.from({ length: 7 }, (_, i) => {
    // 오늘 날짜를 기준으로 `i`일 후의 날짜를 계산
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      ...sampleDatas[i % sampleDatas.length],
      date: `${date.getDate()} ${months[date.getMonth()]}`, // 날짜와 월
      day: days[date.getDay()], // 요일
    };
  });

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>7 Days</CardTitle>
        <CardDescription>이번주 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {sevenDaysDatas.map((data, index) => (
          <Get7DaysList key={index} data={data} />
        ))}
      </CardContent>
    </Card>
  );
}

export { Get7DaysWidget };
