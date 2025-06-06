// wedding-invitation-app/src/pages/Location.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Location = () => {
	
  const navigate = useNavigate();
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=09f3d7d98b475b44cced01505e4295e9&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.286437618626884, 127.03586907476142),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        new window.kakao.maps.Marker({
          map,
          position: options.center,
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="px-4 py-8 text-center">
      <h2 className="text-xl font-semibold mb-2">오시는 길</h2>
      <p className="text-sm text-gray-600 mb-4">WI컨벤션 (경기 수원시 팔달구 월드컵로 310 수원월드컵경기장)</p>
      <div id="map" className="w-full h-80 rounded-lg shadow mb-6"></div>

      <div className="text-left text-sm text-gray-700 leading-relaxed">
        <p className="mb-2">🚘 주차 안내: 수원월드컵경기장 4/7 주차장 이용 가능</p>
        <p className="mb-2">🚉 지하철: 수원시청역 9번 출구 </p>
        <p>📍 주소: 경기 수원시 팔달구 월드컵로 310 수원월드컵경기장 (WI컨벤션)</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-gray-200 text-sm rounded-full hover:bg-gray-300"
      >
        ← 메인으로 돌아가기
      </button>
    </div>
  );
};
