import confetti from "canvas-confetti";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ICompleteOption } from "../Birthday";
import BirthdayCake from "../BirthdayCake";
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
const BallonWish = ({
  onComplete,
  onCandleBlow,
}: {
  onComplete: (options?: ICompleteOption) => void;
  onCandleBlow?: () => void;
}) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isCandleBlowed, setIsCandleBlowed] = useState(false);

  useEffect(() => {
    if (!isCandleBlowed) return;
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({});
    tl.staggerTo(
      ".baloons img",
      2.5,
      {
        y: () => -window.innerHeight * 2 - 200, // animate way above screen
        // x: () => "-50%", // slight random horizontal drift
        rotation: () => Math.random() * 30 - 15, // random rotation
        opacity: 1,
        ease: "power1.out",
      },
      0.2
    );

    tl.staggerFrom(
      ".baloons img",
      0,
      {
        y: () => window.innerHeight + Math.random() * 200, // start offscreen below
        opacity: 0.8,
      },
      0.2
    );

    timelineRef.current = tl;

    return () => {
      tl.kill(); // Cleanup
    };
  }, [isCandleBlowed]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      "#bunting",
      { y: -100, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
    ).fromTo(
      ".cake",
      { y: 50, scale: 0.8, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);
  const blowAudio = new Audio("/audio/blow.mp3");

  const handleCandleBlow = () => {
    setIsCandleBlowed(true);
    onCandleBlow?.();
    blowAudio.play();
    const crowdAudio = new Audio("/audio/hbd_clapping.mp3");

    const clapping = new Audio("/audio/clapp.mp3");
    setTimeout(() => {
      clapping.play();
      crowdAudio.play();

      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          onComplete({ audioVolume: 1 });
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      intervalRef.current = interval;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="w-full h-dvh bg-[#faecef] relative">
      <Image
        src="/images/bunting.png"
        alt=""
        className="w-full max-w-[600px] absolute top-0 left-[50%] translate-x-[-50%]"
        width={600}
        height={400}
        id="bunting"
      />

      <div className="w-full h-full center flex-col">
        <BirthdayCake
          isCandleBlowed={isCandleBlowed}
          onCanldeBlow={handleCandleBlow}
        />
        {/* baloons */}
        <div className="baloons top-0 left-0 absolute w-full h-full flex items-center flex-col z-20">
          {Array.from({ length: 36 }).map((_, idx) => (
            <img key={idx} src={`/images/ballon${(idx % 3) + 1}.svg`} alt="" />
          ))}
        </div>{" "}
      </div>
    </div>
  );
};

export default BallonWish;
