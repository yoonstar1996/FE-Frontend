import { Header, Nav, PaginationFooter } from "@/components/common";
import { SearchBox } from "@/components/common/searchBox/SearchBox";
import { ImageCard } from "@/components/home";
import { useCallback, useEffect, useState } from "react";
import { Image } from "@/types";
import { useAtom } from "jotai";
import { fetchApi, pageAtom, searchValueAtom } from "@/store";

function HomePage() {
  const [images, setImages] = useState<Image[]>([]);

  const [page] = useAtom<number>(pageAtom);
  const [searchValue] = useAtom<string>(searchValueAtom);

  const newFetchApi = useCallback(async () => {
    try {
      const res = await fetchApi(searchValue, page);

      if (res.status === 200 && res.data) {
        setImages(res.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchValue, page]);

  useEffect(() => {
    newFetchApi();
  }, [newFetchApi]);

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Nav />
        <SearchBox />
        <div className="page__container__contents">
          {images.map((image) => (
            <ImageCard key={image.id} data={image} />
          ))}
        </div>
        {/* 새로 생성한 Pagination 컴포넌트 */}
        {/* <Pagination /> */}

        {/* shardcn ui pagination 컴포넌트 */}
        <PaginationFooter />
      </div>
    </div>
  );
}

export default HomePage;
