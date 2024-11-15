import { SearchBar } from "@/components";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { cityNameAtom } from "@/stores";

function Header() {
  const [, setCityName] = useAtom(cityNameAtom);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCityName(inputValue);
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header className="w-full h-20 flex items-center p-6 gap-6 bg-black text-white">
      <div className="w-1/2 flex items-center justify-start gap-6">
        <div className="h-full flex items-center justify-center gap-2 cursor-pointer">
          <img src="src/assets/icons/logo.svg" alt="logo" className="h-10" />
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight poppins-bold">
            Weather.io
          </h3>
        </div>
        <SearchBar
          className="flex-1 text-black"
          placeholder="검색할 지역 이름을 영어로 입력하세요."
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
    </header>
  );
}

export { Header };
