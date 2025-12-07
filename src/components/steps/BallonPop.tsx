import { getAge } from "@/utils/date";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const TOTAL_BALLOONS = getAge("2003-06-12");
// Helper to generate random bright radial gradient
const getRandomGradient = () => {
  const colors = [
    ["#f66", "#b30000"],
    ["#6cf", "#0033b3"],
    ["#fc6", "#b36d00"],
    ["#6f6", "#007300"],
    ["#f6f", "#b300b3"],
    ["#6ff", "#00b3b3"],
  ];
  const random = colors[Math.floor(Math.random() * colors.length)];
  return `radial-gradient(circle at 30% 30%, ${random[0]}, ${random[1]})`;
};

const BalloonPop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const brustAudioRef = useRef<HTMLAudioElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 400, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    brustAudioRef.current = new Audio();
    brustAudioRef.current.src = "/audio/ballon_brust.mp3";
  }, []);

  const onBurst = () => {
    if (!balloonRef.current || !containerRef.current) return;

    const balloon = balloonRef.current;
    const container = containerRef.current;

    balloon.style.opacity = "0";
    if (brustAudioRef.current) {
      brustAudioRef.current.play();
    }
    const balloonStringSegments =
      containerRef.current?.querySelectorAll(".stringSegment");

    if (balloonStringSegments) {
      balloonStringSegments.forEach((segment, index) => {
        gsap.fromTo(
          segment,
          { rotation: 0, y: 0, opacity: 1 },
          {
            rotation: (Math.random() - 0.5) * 60, // bend randomly
            y: 20 + index * 5, // stagger downward
            opacity: 0, // fade out
            duration: 0.4, // faster
            ease: "power2.out",
            delay: index * 0.03, // very small stagger
            onComplete: () => {
              gsap.set(segment, { rotation: 0, y: 0, opacity: 1 });
            },
          }
        );
      });
    }

    // GSAP burst pieces
    for (let i = 0; i < 14; i++) {
      const piece = document.createElement("div");
      piece.classList.add("piece");
      container.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 80;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.fromTo(
        piece,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        {
          x,
          y,
          scale: 0.2,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => piece.remove(),
        }
      );
    }

    // Next balloon after pop
    setTimeout(() => {
      balloon.style.opacity = "1";

      if (currentIndex < TOTAL_BALLOONS - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 400);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="relative flex flex-col items-center">
        <div
          ref={balloonRef}
          onClick={onBurst}
          style={{ background: getRandomGradient() }}
          className="balloon w-[140px] h-[180px] cursor-pointer center"
        >
          {currentIndex + 1}
        </div>
        <div className="balloonStringContainer absolute top-[180px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="stringSegment w-[2px] h-[12px] bg-gray-700 origin-top"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalloonPop;
