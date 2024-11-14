import { Card, CardHeader, CardDescription, CardContent } from "@/components";

interface Props {
  labelKo: string;
  labelEn: string;
  imgUrl: string;
  value: number;
}

function GetWaveWidget({ labelKo, labelEn, imgUrl, value }: Props) {
  return (
    <Card className="w-full h-fit bg-neutral-50">
      <CardHeader>
        <CardDescription className="font-semibold text-neutral-700">
          {labelKo}
          <span className="text-neutral-400 font-normal ml-1">{labelEn}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <img className="w-10 h-10" src={imgUrl} alt={labelKo} />
        <p className="poppins-medium scroll-m-20 text-3xl font-semibold tracking-tight">
          {value}
          {labelEn && labelEn === "Humidity" && (
            <span className="text-lg ml-1">%</span>
          )}
          {labelEn && labelEn === "Pressure" && (
            <span className="text-lg ml-1">hPa</span>
          )}
          {labelEn && labelEn === "Visibility" && (
            <span className="text-lg ml-1">km</span>
          )}
          {labelEn && labelEn === "Feels Like" && (
            <span className="text-lg ml-1">&#8451;</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}

export { GetWaveWidget };
