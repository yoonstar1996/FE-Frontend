interface Props {
  data: {
    label: string;
    time: string;
    symbol: string;
  };
  number: number;
}

function GetMarineAndSailingWidget({ data, number }: Props) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted-foreground">
        {number}회 {data.label}
      </p>
      <p className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight">
        {data.time}
        <span className="ml-[1px]">{data.symbol}</span>
      </p>
    </div>
  );
}

export { GetMarineAndSailingWidget };
