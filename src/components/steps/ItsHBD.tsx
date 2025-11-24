import gsap from "gsap";
import { useEffect, useRef } from "react";
const ItsHBD = ({ onComplete }: { onComplete: () => void }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.fromTo(
      "#birthday",
      { autoAlpha: 0, y: 0 },
      { autoAlpha: 1, y: 0, duration: 1 }
    );

    timelineRef.current = tl;

    return () => {
      tl.kill(); // Cleanup
    };
  }, []);
  return (
    <div
      id="birthday"
      className="text-center center w-full h-full bg-[#ee4848]"
    >
      <p className="text-xl">It&apos;s your birthday!!! :D</p>
    </div>
  );
};

export default ItsHBD;
