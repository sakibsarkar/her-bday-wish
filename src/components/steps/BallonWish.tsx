import confetti from "canvas-confetti";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ICompleteOption } from "../Birthday";
const BallonWish = ({
  onComplete,
}: {
  onComplete: (options?: ICompleteOption) => void;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete({ audioVolume: 1 });
      },
    });
    tl.staggerTo(
      ".baloons img",
      2.5,
      {
        y: () => -window.innerHeight * 2 - 200, // animate way above screen
        x: () => "-50%", // slight random horizontal drift
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
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/hbd_clapping.mp3");
    }
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
    }
  }, []);

  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
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
  return (
    <div className="ballons_wish">
      <div className="baloons w-full h-dvh">
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
