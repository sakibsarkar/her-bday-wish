import { useEffect, useRef } from "react";
import gsap from "gsap";
const Greeting = ({ onComplete }: { onComplete: () => void }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });
    tl.fromTo(
      "#greeting",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    timelineRef.current = tl;

    return () => {
      tl.kill(); // Cleanup
    };
  }, []);
  return (
    <div id="greeting" className="text-center h-full w-full center flex-col">
      <h1 className="flex flex-col gap-[10px] text-[20px] font-light w-full">
        <span>Hey</span>
        <span className="text-[#ff0cae] bg-white  p-[10px] text-2xl font-semibold rounded w-full">
          Sonali 🌸
        </span>
      </h1>
      <p className="mt-2">I really like your this name btw!</p>
    </div>
  );
};

export default Greeting;
