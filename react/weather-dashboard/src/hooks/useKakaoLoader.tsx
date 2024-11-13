import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "3220b5f525c7225179c494b609f8dc41",
    libraries: ["clusterer", "drawing", "services"],
  });
}
