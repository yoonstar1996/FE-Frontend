import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "your-api-base-url";
const API_KEY = "your-api-key";

// 공통 fetch 함수 훅
const useApi = (url: string, setData: Function) => {
  const fetchApi = async () => {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  return fetchApi;
};

// 날씨 데이터 가져오는 훅
export const useWeatherApi = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useApi(
    `${BASE_URL}/forecast.json?q=seoul&days=7&key=${API_KEY}`,
    setWeatherData
  );

  return weatherData;
};

// 조수 데이터 가져오는 훅
export const useTideApi = () => {
  const [tideData, setTideData] = useState<any>(null);

  useApi(`${BASE_URL}/marine.json?q=seoul&days=1&key=${API_KEY}`, (data) => {
    setTideData(data.forecast.forecastday[0]);
  });

  return tideData;
};

// 일주일 예보 데이터 가져오는 훅
export const useOneWeekWeather = () => {
  const [oneWeek, setOneWeek] = useState<any[]>([]);

  useApi(`${BASE_URL}/forecast.json?q=seoul&days=7&key=${API_KEY}`, (data) => {
    const newData = data.forecast.forecastday.map((item: any) => {
      return {
        maxTemp: Math.round(item.day.maxtemp_c),
        minTemp: Math.round(item.day.mintemp_c),
        date: item.date,
        iconCode: item.day.condition.code,
        isDay: item.day.condition.icon.includes("day"),
      };
    });
    setOneWeek(newData);
  });

  return oneWeek;
};
