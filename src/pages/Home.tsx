// wedding-invitation-app/src/pages/Home.tsx
import React, { useEffect, useState } from "react";

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const WEDDING_LAT = Number(import.meta.env.VITE_WEDDING_LAT);
const WEDDING_LNG = Number(import.meta.env.VITE_WEDDING_LNG);

const galleryImages = Array.from({ length: 15 }, (_, i) => `/assets/images/photo${i + 1}.jpg`);

export const Home = () => {
  const [guestbook, setGuestbook] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [rsvpName, setRsvpName] = useState("");
  const [attending, setAttending] = useState(true);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [showGroomAccount, setShowGroomAccount] = useState(false);
  const [showBrideAccount, setShowBrideAccount] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(WEDDING_LAT, WEDDING_LNG),
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

  const handleGuestbookSubmit = () => {
    if (message.trim()) {
      setGuestbook([...guestbook, message]);
      setMessage("");
    }
  };

  const handleRSVPSubmit = () => {
    setRsvpConfirmed(true);
  };

  const Modal = ({ title, content, onClose }: { title: string; content: React.ReactNode; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-lg">×</button>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-sm text-gray-700">{content}</div>
      </div>
    </div>
  );

  const GalleryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg">
        <img src={galleryImages[activeImageIndex!]} alt="갤러리 이미지" className="w-full rounded-lg" />
        <button
          onClick={() => setActiveImageIndex(null)}
          className="absolute top-2 right-2 text-white text-2xl"
        >×</button>
        {activeImageIndex! > 0 && (
          <button
            onClick={() => setActiveImageIndex(activeImageIndex! - 1)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >‹</button>
        )}
        {activeImageIndex! < galleryImages.length - 1 && (
          <button
            onClick={() => setActiveImageIndex(activeImageIndex! + 1)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >›</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="text-center py-8 w-full max-w-[420px] mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">김지현 ❤️ 윤선영</h1>
      <p className="text-lg mb-2">2025년 09월 28일 토요일 오후 1시 30분</p>
      <p className="text-base text-gray-600 mb-6">WI컨벤션 (수원 팔달구)</p>

      <div className="w-full max-w-xs mx-auto mb-6">
        <img
          src="/assets/images/main-photo.jpg"
          alt="신랑 신부 사진"
          className="rounded-xl shadow-md w-full"
        />
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        함께하는 모든 순간이 축복이 되길 바라며,<br />
        저희 두 사람이 하나 되는 날에<br />
        소중한 발걸음으로 축복해 주세요.
      </p>

      <hr className="my-8" />

      <h2 className="text-lg font-semibold mb-2">사진 갤러리</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {galleryImages.map((src, index) => (
          <img
            key={index}
            src={src}
            className="rounded cursor-pointer object-cover h-28"
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
      {activeImageIndex !== null && <GalleryModal />}

      {/* 이후는 기존 코드 그대로 유지 */}

      <h2 className="text-lg font-semibold mb-2">오시는 길</h2>
      <p className="text-sm text-gray-600 mb-4">WI컨벤션 (경기 수원시 팔달구 인계로 123)</p>
      <div id="map" className="w-full h-80 rounded-lg shadow mb-6"></div>

      <div className="text-left text-sm text-gray-700 leading-relaxed mb-8 px-4">
        <p className="mb-2">🚘 주차 안내: 건물 내 지하 주차장 이용 가능</p>
        <p className="mb-2">🚉 지하철: 수원시청역 4번 출구 도보 5분</p>
        <p>📍 주소: 경기 수원시 팔달구 인계로 123 (WI컨벤션)</p>
      </div>

      <hr className="my-8" />

      <h2 className="text-lg font-semibold mb-2">마음 전하실 곳</h2>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setShowGroomAccount(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
        >
          신랑측 계좌
        </button>
        <button
          onClick={() => setShowBrideAccount(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
        >
          신부측 계좌
        </button>
      </div>

      {showGroomAccount && (
        <Modal
          title="신랑측 계좌"
          content={<p>💳 김기석 / 국민은행 123456-78-901234</p>}
          onClose={() => setShowGroomAccount(false)}
        />
      )}

      {showBrideAccount && (
        <Modal
          title="신부측 계좌"
          content={<p>💳 윤선영 / 신한은행 987654-32-109876</p>}
          onClose={() => setShowBrideAccount(false)}
        />
      )}

      <hr className="my-8" />

      <h2 className="text-lg font-semibold mb-2">RSVP</h2>
      <div className="px-4 mb-12">
        <input
          className="w-full border rounded p-2 text-sm mb-2"
          type="text"
          placeholder="이름을 입력해주세요"
          value={rsvpName}
          onChange={(e) => setRsvpName(e.target.value)}
        />
        <div className="flex items-center gap-4 text-sm mb-4">
          <label>
            <input
              type="radio"
              checked={attending === true}
              onChange={() => setAttending(true)}
            /> 참석함
          </label>
          <label>
            <input
              type="radio"
              checked={attending === false}
              onChange={() => setAttending(false)}
            /> 참석하지 않음
          </label>
        </div>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          onClick={handleRSVPSubmit}
        >
          확인
        </button>
        {rsvpConfirmed && (
          <Modal
            title="참석 확인"
            content={<p>감사합니다, {rsvpName || "손님"}님. 참석 여부가 접수되었습니다.</p>}
            onClose={() => setRsvpConfirmed(false)}
          />
        )}
      </div>
    </div>
  );
};
