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
}: {
  onComplete: (options?: ICompleteOption) => void;
}) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isCandleBlowed, setIsCandleBlowed] = useState(false);

  useEffect(() => {
    if (!isCandleBlowed) return;
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        // onComplete({ audioVolume: 1 });
      },
    });
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

  const handleCandleBlow = () => {
    setIsCandleBlowed(true);

    const crowdAudio = new Audio("/audio/hbd_clapping.mp3");
    const blowAudio = new Audio("/audio/blow.mp3");
    const clapping = new Audio("/audio/clapp.mp3");
    blowAudio.currentTime = 2.5;
    clapping.play();
    blowAudio.play();
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
  };
  return (
    <div className="w-full h-dvh bg-[#faecef] relative">
      <Image
        src="/images/bunting.png"
        alt=""
        className="w-full max-w-[600px] absolute top-0 left-[50%] translate-x-[-50%]"
        width={600}
        height={400}
      />

      <div className="w-full h-full center flex-col">
        <BirthdayCake
          isCandleBlowed={isCandleBlowed}
          onCanldeBlow={handleCandleBlow}
        />
      </div>

      {/* baloons */}
      <div className="baloons top-0 left-0 absolute w-full h-full flex items-center flex-col z-2">
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon3.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
        <img src="images/ballon2.svg" alt="" />
        <img src="images/ballon1.svg" alt="" />
      </div>
    </div>
  );
};

export default BallonWish;
