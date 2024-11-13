interface Props {
  imgUrl: string;
  label: string;
  time: string;
}

function GetSunriseAndSunset({ imgUrl, label, time }: Props) {
  return (
    <div className="w-full flex items-center gap-2">
      <img className="h-14" src={imgUrl} alt={label} />
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="poppins-medium scroll-m-20 text-3xl font-semibold tracking-tight">
          {time}
        </p>
      </div>
    </div>
  );
}

export { GetSunriseAndSunset };
