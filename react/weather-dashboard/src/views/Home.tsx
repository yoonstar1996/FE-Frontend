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
import { ForecastDay, ForecastTideDay, Weather } from "@/types";

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

const defaultTideData: ForecastTideDay = {
  astro: {
    is_moon_up: 0,
    is_sun_up: 0,
    moon_illumination: 0,
    moon_phase: "",
    moonrise: "",
    moonset: "",
    sunrise: "",
    sunset: "",
  },
  date: "",
  date_epoch: 0,
  day: {
    avghumidity: 0,
    avgtemp_c: 0,
    avgtemp_f: 0,
    avgvis_km: 0,
    avgvis_miles: 0,
    condition: { text: "", icon: "", code: 0 },
    daily_chance_of_rain: 0,
    daily_chance_of_snow: 0,
    daily_will_it_rain: 0,
    daily_will_it_snow: 0,
    maxtemp_c: 0,
    maxtemp_f: 0,
    maxwind_kph: 0,
    maxwind_mph: 0,
    mintemp_c: 0,
    mintemp_f: 0,
    totalprecip_in: 0,
    totalprecip_mm: 0,
    totalsnow_cm: 0,
    uv: 0,
    tides: [
      {
        tide: [],
      },
    ],
  },
  hour: [],
};

const API_KEY = "679ced49a6f542d4a7004717241411";
const BASE_URL = "https://api.weatherapi.com/v1";

export default function HomePage() {
  const [weatherData, setWeatherData] = useState<Weather>(defaultWeatherData);
  const [tideData, setTideData] = useState<ForecastTideDay>(defaultTideData);
  const [oneWeek, setOneWeek] = useState([]);

  const fetchForecastApi = async () => {
    try {
      // Promise 인스턴스 방법을 사용했을 땐, resolve에 해당
      const res = await axios.get(
        `${BASE_URL}/forecast.json?q=seoul&days=7&key=${API_KEY}`
      );
      if (res.status === 200) {
        setWeatherData(res.data);
        // console.log("fetchForecastApi: ", res);
      }
    } catch (error) {
      // Promise 인스턴스 방법을 사용했을 땐, reject에 해당
      console.log("error: ", error);
    } finally {
      // 비동기 로직이 성공 or 실패 여부와 상관없이 무조건 실행되는 코드
      // console.log("fetchForecastApi 호출은 되었습니다.");
    }
  };

  const fetchTideApi = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/marine.json?q=seoul&days=1&key=${API_KEY}`
      );
      if (res.status === 200) {
        setTideData(res.data.forecast.forecastday[0]);
        // console.log("fetchTideApi: ", res.data.forecast.forecastday[0]);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchWeatherApi = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/forecast.json?q=seoul&days=7&key=${API_KEY}`
      );
      if (res.status === 200 && res.data) {
        const newData = res.data.forecast.forecastday.map(
          (item: ForecastDay) => {
            return {
              maxTemp: Math.round(item.day.maxtemp_c),
              minTemp: Math.round(item.day.mintemp_c),
              date: item.date,
              iconCode: item.day.condition.code,
              isDay: item.day.condition.icon.includes("day"),
            };
          }
        );
        setOneWeek(newData);
        // console.log("fetchWeatherApi: ", res.data.forecast);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchForecastApi();
    fetchTideApi();
    fetchWeatherApi();
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
            {tideData && (
              <GetTodaysHighlightsWidget
                tideData={tideData}
                currentData={weatherData}
              />
            )}
            <Get7DaysWidget data={oneWeek} />
          </div>
        </div>
      </div>
    </div>
  );
}
