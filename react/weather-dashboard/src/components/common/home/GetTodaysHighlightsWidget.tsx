import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  GetSunriseAndSunset,
  GetWaveWidget,
  GetMarineAndSailingWidget,
} from "@/components";

const MarineDatas = [
  {
    label: "만조",
    time: "05:48",
    symbol: "am",
  },
  {
    label: "간조",
    time: "11:56",
    symbol: "am",
  },
  {
    label: "만조",
    time: "18:04",
    symbol: "pm",
  },
  {
    label: "간조",
    time: "00:12",
    symbol: "pm",
  },
];

const weatherDatas = [
  {
    labelKo: "습도",
    labelEn: "Humidity",
    imgUrl: "src/assets/icons/Humidity.svg",
    num: 64,
  },
  {
    labelKo: "기압",
    labelEn: "Pressure",
    imgUrl: "src/assets/icons/Wind.svg",
    num: 1024,
  },
  {
    labelKo: "가시거리",
    labelEn: "Visibility",
    imgUrl: "src/assets/icons/Fog.svg",
    num: 10,
  },
  {
    labelKo: "체감온도",
    labelEn: "Feels Like",
    imgUrl: "src/assets/icons/Hot.svg",
    num: 19,
  },
];

function GetTodaysHighlightsWidget() {
  return (
    <Card className="flex-1 h-full">
      <CardHeader>
        <CardTitle className="text-xl">Today's Highlights</CardTitle>
        <CardDescription>
          오늘 날씨 중 주의깊게 살펴보아야 할 이벤트를 조회하고 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <Card className="w-full bg-neutral-100">
            <CardHeader>
              <CardDescription className="font-semibold text-neutral-700">
                해양 및 조수 데이터
                <span className="text-neutral-400 font-normal ml-1">
                  Marine and Sailing
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex items-center justify-between">
              <img
                className="h-14"
                src="src/assets/icons/Waves.png"
                alt="highlights-image"
              />
              <div className="w-fit grid grid-cols-4 gap-3">
                {MarineDatas.map((data, index) => (
                  <GetMarineAndSailingWidget
                    key={index}
                    data={data}
                    number={index + 1}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="w-full bg-neutral-100">
            <CardHeader>
              <CardDescription className="font-semibold text-neutral-700">
                일출/일몰
                <span className="text-neutral-400 font-normal ml-1">
                  Sunrise and Sunset
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              <GetSunriseAndSunset
                imgUrl="src/assets/icons/1000d.svg"
                label="Sunrise"
                time="07:00 AM"
              />
              <GetSunriseAndSunset
                imgUrl="src/assets/icons/1000n.svg"
                label="Sunset"
                time="05:34 PM"
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full grid grid-cols-4 gap-5">
          {weatherDatas.map((data, idx) => (
            <GetWaveWidget key={idx} data={data} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { GetTodaysHighlightsWidget };
