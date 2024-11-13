import { SearchBar } from "@/components";

function Header() {
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
        />
      </div>
    </header>
  );
}

export { Header };
