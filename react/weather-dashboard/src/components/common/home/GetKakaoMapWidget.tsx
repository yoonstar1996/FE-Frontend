import { Card } from "@/components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/hooks/useKakaoLoader";
import { useAtom } from "jotai";
import { cityNameAtom } from "@/stores";

const positions = [
  {
    cityName: "seoul",
    latlng: { lat: 37.5683, lng: 126.9778 },
  },
  {
    cityName: "incheon",
    latlng: { lat: 37.4562557, lng: 126.7052062 },
  },
  {
    cityName: "gwangju",
    latlng: { lat: 35.1599785, lng: 126.8513072 },
  },
  {
    cityName: "daejeon",
    latlng: { lat: 36.3504567, lng: 127.3848187 },
  },
  {
    cityName: "cheongju",
    latlng: { lat: 36.6358093, lng: 127.4913338 },
  },
  {
    cityName: "daegu",
    latlng: { lat: 35.8715411, lng: 128.601505 },
  },
  {
    cityName: "ulsan",
    latlng: { lat: 35.5396224, lng: 129.3115276 },
  },
  {
    cityName: "busan",
    latlng: { lat: 35.179665, lng: 129.0747635 },
  },
];

function GetKakaoMapWidget() {
  useKakaoLoader();
  const [, setCityName] = useAtom(cityNameAtom);

  return (
    <Card className="w-1/4 min-w-[25%] h-full">
      <Map
        id="map"
        center={{ lat: 37.5683, lng: 126.9778 }}
        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
        level={13}
      >
        {positions.map((position) => (
          <MapMarker
            key={`${position.cityName}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기입니다
            }}
            title={position.cityName} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            clickable={true}
            onClick={(marker) => {
              setCityName(marker.getTitle());
            }}
          />
        ))}
      </Map>
    </Card>
  );
}

export { GetKakaoMapWidget };
