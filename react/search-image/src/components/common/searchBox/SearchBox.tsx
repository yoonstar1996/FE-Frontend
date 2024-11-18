import { SearchBar } from "@/components/ui";
import { searchValueAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";

function SearchBox() {
  const [, setSearchValue] = useAtom<string>(searchValueAtom);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(inputValue);

      setInputValue("");
    }
  };

  const handleChangeSearchbar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="page__container__wallpaper">
      <img
        className="bg-image"
        src="src/assets/wallpaper.png"
        alt="wallpaper"
      />
      <div className="search-box">
        <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight">
          프로젝트02: 오픈 API를 활용한 이미지 검색 사이트 만들기
        </h1>
        <div className="flex flex-col w-full mt-5 mb-2">
          <h4 className="scroll-m-20 text-md text-white font-semibold tracking-tight">
            인터넷 시각자료 출처입니다.
          </h4>
          <h4 className="scroll-m-20 text-md text-white font-semibold tracking-tight">
            모든 지역에 있는 크리에이터들의 지원을 받습니다.
          </h4>
          <SearchBar
            placeholder="원하는 이미지를 검색하세요."
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleChangeSearchbar}
          />
        </div>
      </div>
    </div>
  );
}

export { SearchBox };
