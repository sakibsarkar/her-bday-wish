import gsap from "gsap";
import { useEffect, useRef } from "react";
const BallonWish = ({ onComplete }: { onComplete: () => void }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
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
