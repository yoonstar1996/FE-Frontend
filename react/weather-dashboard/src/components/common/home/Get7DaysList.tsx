interface Props {
  data: {
    imgUrl: string;
    highTemperature: number;
    lowTemperature: number;
    date: string;
    day: string;
  };
}

function Get7DaysList({ data }: Props) {
  return (
    <div className="w-full flex items-center gap-7 bg-neutral-100 py-0 px-3 rounded-sm">
      <div className="w-fit h-10 flex items-center gap-2">
        <img className="w-7 h-7" src={data.imgUrl} alt={data.imgUrl} />
        <div className="flex items-center gap-1 w-20">
          <div className="w-full he-full flex items-start gap-[2px]">
            <span className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight text-red-600">
              {data.highTemperature}
            </span>
            <span className="text-xs font-normal mt-1">&#8451;</span>
          </div>
          <div className="w-full he-full flex items-start gap-[2px]">
            <span className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight text-sky-600">
              {data.lowTemperature}
            </span>
            <span className="text-xs font-normal mt-1">&#8451;</span>
          </div>
          <div></div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-5 mb-1">
        <small className="text-sm leading-none">{data.date}</small>
        <small className="text-sm leading-none">{data.day}</small>
      </div>
    </div>
  );
}

export { Get7DaysList };
