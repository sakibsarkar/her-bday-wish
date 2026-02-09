"use client";

import { saveGiftAction } from "@/app/actions/choice.action";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface GiftBoxProps {
  id: number;
  onClick: () => void;
}
const GiftBox = ({ id, onClick }: GiftBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    "from-blue-400 to-blue-500",
    "from-purple-400 to-purple-500",
    "from-red-400 to-red-500",
  ];

  const ribbonColors = ["bg-yellow-300", "bg-pink-300", "bg-green-300"];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
      cursor-pointer transition-all duration-300
      hover:scale-110
      animate-[float_3s_ease-in-out_infinite]
    `}
      style={{ animationDelay: `${id * 0.2}s` }} // Stagger float
    >
      {/* Main gift box */}
      <div
        className={`
        relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br
        ${colors[id - 1]}
        rounded-2xl shadow-lg transition-all duration-300
        ${
          isHovered
            ? "rotate-6 shadow-2xl animate-[wiggle_0.4s_ease-in-out]"
            : ""
        }
      `}
      >
        {/* Ribbon vertical */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full ${
            ribbonColors[id - 1]
          } rounded-full`}
        />

        {/* Ribbon horizontal */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-full h-4 ${
            ribbonColors[id - 1]
          } rounded-full`}
        />

        {/* Bow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
          <div
            className={`w-4 h-4 sm:w-6 sm:h-6 ${
              ribbonColors[id - 1]
            } rounded-full -rotate-45`}
          />
          <div
            className={`w-4 h-4 sm:w-6 sm:h-6 ${
              ribbonColors[id - 1]
            } rounded-full rotate-45`}
          />
        </div>

        {/* Sparkles on hover */}
        {isHovered && (
          <>
            <div className="absolute top-2 right-2 text-sm animate-[sparkle_1.3s_linear_infinite]">
              ✨
            </div>
            <div
              className="absolute bottom-2 left-2 text-sm animate-[sparkle_1.3s_linear_infinite]"
              style={{ animationDelay: "0.4s" }}
            >
              ✨
            </div>
          </>
        )}
      </div>

      {/* Label */}
      <div className="text-center mt-4">
        <p className="text-sm sm:text-base font-bold text-pink-700">
          Gift {id}
        </p>
        <p className="text-xs text-pink-600">Click me!</p>
      </div>
    </div>
  );
};

const ChooseGift = ({ onComplete }: { onComplete: () => void }) => {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [processCompleted, setProcessCompleted] = useState({
    animation: false,
    giftSet: false,
  });

  const handleSelectGift = async (giftId: number) => {
    try {
      setSelectedGift(giftId);

      const giftObjId = localStorage.getItem("giftObjId") || undefined;
      const gift = await saveGiftAction(`gift-${giftId}`, giftObjId);
      setProcessCompleted((prev) => ({ ...prev, giftSet: true }));

      if (gift) {
        localStorage.setItem("giftObjId", gift._id.toString());
      }
      setTimeout(() => {
        setRevealed(true);
      }, 1000);
    } catch {
      setTimeout(() => {
        setRevealed(true);
      }, 1000);
    }
  };

  console.log(revealed);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();
    if (!revealed) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setProcessCompleted((prev) => ({
          ...prev,
          animation: true,
        }));
      },
    });

    tl.from(".reveal-emoji", {
      autoAlpha: 0,
      y: -50,
      duration: 0.8,
      ease: "back.out(1.7)",
    })

      .from(
        ".reveal-title",
        {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )

      .from(".reveal-text", {
        autoAlpha: 0,
        duration: 0.7,
        ease: "power1.out",
      })

      .from(
        ".reveal-gif",
        {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    tl.to({}, { duration: 4 });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [revealed]);

  useEffect(() => {
    if (processCompleted.giftSet && processCompleted.animation) {
      onComplete();
    }
  }, [processCompleted]);

  return (
    <div className="w-full mx-auto h-dvh flex-col center">
      {!revealed ? (
        <>
          <div className="text-center mb-12 animate-in fade-in duration-700">
            <h1
              className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
            >
              Pick Your Gift!
            </h1>
            <p className="text-lg text-pink-700 font-medium">
              Choose one of the surprise boxes 🎁
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 md:gap-12 px-4">
            {[1, 2, 3].map((id) => (
              <div
                key={id + "gift"}
                className={`flex justify-center transition-all duration-[1s] ${
                  selectedGift === id
                    ? "scale-150 -translate-y-10 opacity-0 rotate-12"
                    : selectedGift
                    ? "scale-50 opacity-20"
                    : "opacity-100"
                }`}
              >
                <GiftBox id={id} onClick={() => handleSelectGift(id)} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-8 reveal-emoji">
            <div className="inline-block text-7xl mb-4">🎊</div>
          </div>

          <h2 className="text-4xl font-bold text-pink-600 mb-4 reveal-title">
            You selected Gift {selectedGift}!
          </h2>

          <p className="text-pink-700 text-lg mb-8 reveal-text">
            Your surprise is being prepared... 🎉
          </p>

          <Image
            src="/images/manufacture_gift.gif"
            alt=""
            width={300}
            height={300}
            className="max-w-[300px] w-full mx-auto reveal-gif"
          />
        </div>
      )}
    </div>
  );
};

export default ChooseGift;
