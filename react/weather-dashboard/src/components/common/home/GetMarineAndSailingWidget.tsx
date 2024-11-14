import { Tide } from "@/types";

interface Props {
  data: Tide;
  number: number;
}

function GetMarineAndSailingWidget({ data, number }: Props) {
  const type = data.tide_type === "HIGH" ? "만조" : "간조";
  const time = data.tide_time.split(" ")[1];
  const isDay = parseInt(time, 10) < 12 ? "am" : "pm";

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted-foreground">
        {number}회 - {type}
      </p>
      <p className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight">
        {time}
        <span className="ml-[1px]">{isDay}</span>
      </p>
    </div>
  );
}

export { GetMarineAndSailingWidget };
