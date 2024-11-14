import { useMemo } from "react";

export default function useFormattedTime(time: string) {
  return useMemo(() => {
    const [, hourString] = time.split(" ");
    const [hour] = hourString.split(":").map(Number);

    let formattedTime;

    if (hour === 0) {
      formattedTime = "오전 0시";
    } else if (hour === 12) {
      formattedTime = "낮 12시";
    } else {
      const isAM = hour < 12;
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // 12시간 형식으로 변환
      const period = isAM ? "오전" : "오후";

      formattedTime = `${period} ${formattedHour}시`;
    }

    return formattedTime;
  }, [time]);
}
