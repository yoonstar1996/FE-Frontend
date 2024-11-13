import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  GetHourWidget,
} from "@/components";

const hours = Array.from({ length: 24 }, (_, i) => {
  let time = "";
  if (i <= 11) time = "오전";
  else if (i === 12) time = "오후";
  else {
    time = "오후";
    i -= 12;
  }
  return `${time} ${i}시`;
});

const datas = [
  { imgUrl: "src/assets/icons/1000d.svg", temperature: 5 },
  { imgUrl: "src/assets/icons/1000n.svg", temperature: 6 },
  { imgUrl: "src/assets/icons/1030n.svg", temperature: 7 },
  { imgUrl: "src/assets/icons/1030d.svg", temperature: 10 },
  { imgUrl: "src/assets/icons/1003d.svg", temperature: 11 },
  { imgUrl: "src/assets/icons/1003n.svg", temperature: 12 },
];

const updateDatas = datas.map((data, i) => ({
  ...data,
  time: hours[i % hours.length],
}));

function GetHourlyWidget() {
  console.log(updateDatas);
  return (
    <Card className="flex-1 max-w-[calc(50%-48px)] h-full">
      <CardHeader>
        <CardTitle className="text-xl">Hourly</CardTitle>
        <CardDescription>
          오늘의 시간대별 날씨를 조회하고 있습니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex items-center gap-4 overflow-x-auto">
        {updateDatas.map((data, index) => (
          <GetHourWidget key={index} data={data} />
        ))}
      </CardContent>
    </Card>
  );
}

export { GetHourlyWidget };
