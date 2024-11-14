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
import { Weather, Tide, ForecastTideDay } from "@/types";

interface Props {
  tideData: ForecastTideDay;
  currentData: Weather;
}

function GetTodaysHighlightsWidget({ tideData, currentData }: Props) {
  const updatedTideData = tideData.day.tides;

  if (!tideData || !currentData) {
    return <div>데이터를 불러오는 중입니다..</div>;
  }

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
                {updatedTideData[0].tide.map((data: Tide, index: number) => (
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
                time={tideData.astro.sunrise}
              />
              <GetSunriseAndSunset
                imgUrl="src/assets/icons/1000n.svg"
                label="Sunset"
                time={tideData.astro.sunset}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full grid grid-cols-4 gap-5">
          <GetWaveWidget
            labelKo="습도"
            labelEn="Humidity"
            imgUrl="src/assets/icons/Humidity.svg"
            value={currentData.current.humidity}
          />
          <GetWaveWidget
            labelKo="기압"
            labelEn="Pressure"
            imgUrl="src/assets/icons/Wind.svg"
            value={currentData.current.pressure_mb}
          />
          <GetWaveWidget
            labelKo="가시거리"
            labelEn="Visibility"
            imgUrl="src/assets/icons/fog.svg"
            value={currentData.current.vis_km}
          />
          <GetWaveWidget
            labelKo="체감온도"
            labelEn="Feels Like"
            imgUrl="src/assets/icons/Hot.svg"
            value={currentData.current.feelslike_c}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { GetTodaysHighlightsWidget };
