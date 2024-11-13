import { Card, CardHeader, CardDescription, CardContent } from "@/components";

interface Props {
  data: {
    labelKo: string;
    labelEn: string;
    imgUrl: string;
    num: number;
  };
}

function GetWaveWidget({ data }: Props) {
  return (
    <Card className="w-full h-fit bg-neutral-50">
      <CardHeader>
        <CardDescription className="font-semibold text-neutral-700">
          {data.labelKo}
          <span className="text-neutral-400 font-normal ml-1">
            {data.labelEn}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <img className="w-10 h-10" src={data.imgUrl} alt={data.labelKo} />
        <p className="poppins-medium scroll-m-20 text-3xl font-semibold tracking-tight">
          {data.num}
          {data && data.labelEn === "Humidity" && (
            <span className="text-lg ml-1">%</span>
          )}
          {data && data.labelEn === "Pressure" && (
            <span className="text-lg ml-1">hPa</span>
          )}
          {data && data.labelEn === "Visibility" && (
            <span className="text-lg ml-1">km</span>
          )}
          {data && data.labelEn === "Feels Like" && (
            <span className="text-lg ml-1">&#8451;</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

export { GetWaveWidget };
