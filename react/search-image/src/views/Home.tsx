import { Header, Nav, PaginationFooter } from "@/components/common";
import { SearchBox } from "@/components/common/searchBox/SearchBox";
import { ImageCard } from "@/components/home";

function HomePage() {
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Nav />
        <SearchBox />
        <div className="page__container__contents">
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </div>
        <PaginationFooter />
      </div>
    </div>
  );
}

export default HomePage;
