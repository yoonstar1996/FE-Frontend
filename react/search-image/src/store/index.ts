import axios from "axios";
import { atom } from "jotai";

export const pageAtom = atom<number>(1);
export const searchValueAtom = atom<string>("korea");

const API_KEY = "YrHkArsioOCeTbnLoKaLWx4xqjRZRRszEN4xx_fWIA0";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const fetchApi = async (searchValue: string, page: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}?query=${searchValue}&page=${page}&per_page=30&client_id=${API_KEY}`
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
