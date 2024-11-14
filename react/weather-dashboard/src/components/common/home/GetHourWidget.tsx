import { Card } from "@/components";
import useFormattedTime from "@/hooks/useFormattedTime";
import { HourlyData } from "@/types";

interface Props {
  item: HourlyData;
}

function GetHourWidget({ item }: Props) {
  const formattedTime = useFormattedTime(item.time);

  return (
    <Card className="w-24 min-w-24 h-fit flex flex-col items-center pt=[10px] pb-[6px] gap-1 bg-neutral-50">
      <span className="text-small">{formattedTime}</span>
      {item.condition.icon.includes("days") ? (
        <img
          className="w-14 h-14"
          src={`src/assets/icons/${item.condition.code}d.svg`}
        />
      ) : (
        <img
          className="w-14 h-14"
          src={`src/assets/icons/${item.condition.code}n.svg`}
        />
      )}
      <div className="w-full flex items-start justify-center">
        <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
          {item.temp_c}
        </span>
        <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
          &#8451;
        </span>
      </div>
    </Card>
  );
}

export { GetHourWidget };
