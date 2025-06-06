// wedding-invitation-app/src/pages/Home.tsx
import React, { useEffect, useState } from "react";

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const WEDDING_LAT = Number(import.meta.env.VITE_WEDDING_LAT);
const WEDDING_LNG = Number(import.meta.env.VITE_WEDDING_LNG);

const galleryThumbs = Array.from({ length: 15 }, (_, i) => `/assets/images/thumb/photo${i + 1}.webp`);
const galleryFull = Array.from({ length: 15 }, (_, i) => `/assets/images/full/photo${i + 1}.jpg`);

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
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
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
        <img
          src={galleryFull[activeImageIndex!]}
          alt="갤러리 이미지"
          className="w-full rounded-lg touch-none select-none"
          style={{ touchAction: "none" }}
        />
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
        {activeImageIndex! < galleryThumbs.length - 1 && (
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
      {/* 이하 동일 */}
    </div>
  );
};
