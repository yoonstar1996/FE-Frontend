import axios from "axios";

import {
  Header,
  GetTodayWidget,
  GetHourlyWidget,
  GetKakaoMapWidget,
  GetTodaysHighlightsWidget,
  Get7DaysWidget,
} from "@/components";
import { useEffect, useState } from "react";
import { Weather } from "@/types";

const defaultWeatherData: Weather = {
  current: {
    cloud: 0,
    condition: { text: "", icon: "", code: 0 },
    dewpoint_c: 0,
    dewpoint_f: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    gust_kph: 0,
    gust_mph: 0,
    heatindex_c: 0,
    heatindex_f: 0,
    humidity: 0,
    is_day: 1,
    last_updated: "",
    last_updated_epoch: 0,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0,
    uv: 0,
    vis_km: 0,
    vis_miles: 0,
    wind_degree: 0,
    wind_dir: "",
    wind_kph: 0,
    wind_mph: 0,
    windchill_c: 0,
    windchill_f: 0,
  },
  location: {
    country: "",
    lat: 0,
    localtime: "",
    localtime_epoch: 0,
    lon: 0,
    name: "",
    region: "",
    tz_id: "",
  },
  forecast: { forecastday: [] },
};
const API_KEY = "679ced49a6f542d4a7004717241411";
const BASE_URL = "http://api.weatherapi.com/v1";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(defaultWeatherData);

  const fetchApi = async () => {
    try {
      // Promise 인스턴스 방법을 사용했을 땐, resolve에 해당
      const res = await axios.get(
        `${BASE_URL}/forecast.json?q=seoul&days=7&key=${API_KEY}`
      );
      console.log(res);
      if (res.status === 200) {
        setWeatherData(res.data);
      }
    } catch (error) {
      // Promise 인스턴스 방법을 사용했을 땐, reject에 해당
      console.log("error: ", error);
    } finally {
      // 비동기 로직이 성공 or 실패 여부와 상관없이 무조건 실행되는 코드
      console.log("fetchApi 호출은 되었습니다.");
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <div className="w-full h-full bg-black flex flex-col items-center justify-start pb-6 px-6 gap-6">
          {/** 상단의 3개 위젯 */}
          <div className="w-full flex items-center gap-6">
            <GetTodayWidget data={weatherData} />
            <GetHourlyWidget data={weatherData.forecast.forecastday[0]} />
            <GetKakaoMapWidget />
          </div>
          {/** 하단의 2개 위젯 */}
          <div className="w-full flex items-center gap-6">
            <GetTodaysHighlightsWidget />
            <Get7DaysWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
