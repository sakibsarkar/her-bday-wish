import { getAge } from "@/utils/date";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ICompleteOption } from "../Birthday";

const TOTAL_BALLOONS = getAge("2004-06-12");
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

const Balloon = ({
  x,
  y,
  index,
  onBurstEnd,
  color,
}: {
  x: number;
  y: number;
  index: number;
  total: number;
  onBurstEnd?: (index: number) => void;
  color: string;
}) => {
  const brustAudioRef = useRef<HTMLAudioElement>(null);

  const [isPoped, setIsPoped] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 400, opacity: 1 },
        { y: 0, opacity: 1, duration: 1 * (index * 0.1), ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    brustAudioRef.current = new Audio();
    brustAudioRef.current.src = "/audio/ballon_brust.mp3";
  }, []);

  const onBurst = () => {
    if (!balloonRef.current || !containerRef.current || isPoped) return;
    setIsPoped(true);

    const balloon = balloonRef.current;
    const container = containerRef.current;

    balloon.style.display = "none";
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

    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.display = "none";
        onBurstEnd?.(index);
      }
    }, 400);
  };

  return (
    <div
      style={{ left: x, top: y }}
      ref={containerRef}
      className="absolute flex flex-col items-center"
    >
      <div
        ref={balloonRef}
        onClick={onBurst}
        style={{ background: color }}
        className="balloon w-[140px] h-[180px] cursor-pointer center"
      >
        {/* {total - index} */}
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
  );
};

const BalloonPop = ({
  onComplete,
  onRender,
}: {
  onComplete: (options?: ICompleteOption) => void;
  onRender?: () => void;
}) => {
  const [, setPopCount] = useState(0);
  const allPoppedRef = useRef(false);

  const [balloons, setBalloons] = useState<
    { x: number; y: number; color: string }[]
  >([]);
  const ballonsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ballonsContainerRef.current) return;

    const w = ballonsContainerRef.current.clientWidth;
    const h = ballonsContainerRef.current.clientHeight;

    const created = Array.from({ length: TOTAL_BALLOONS }).map(() => ({
      x: Math.random() * (w - 140), // subtract balloon width
      y: Math.random() * (h - 180), // subtract balloon height
      color: getRandomGradient(),
    }));

    setBalloons(created);

    onRender?.();
  }, []);

  const handlePop = () => {
    setPopCount((prev) => {
      const newCount = prev + 1;

      if (newCount >= TOTAL_BALLOONS && !allPoppedRef.current) {
        allPoppedRef.current = true;
        onComplete();
      }

      return newCount;
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden p-[10px]">
      <div
        ref={ballonsContainerRef}
        className="w-full max-w-[400px] max-h-[500px] h-full relative border border-gray-300 rounded"
      >
        {balloons.map((b, i) => (
          <Balloon
            onBurstEnd={handlePop}
            total={balloons.length}
            index={i}
            key={i}
            color={b.color}
            x={b.x}
            y={b.y}
          />
        ))}
      </div>
    </div>
  );
};

export default BalloonPop;
