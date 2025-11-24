import { caveatBrush } from "@/fonts";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
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

    tl.to({}, { duration: 2 });

    timelineRef.current = tl;

    return () => {
      tl.kill(); // Cleanup
    };
  }, []);
  return (
    <>
      <div
        id="greeting"
        className="text-center h-full w-full center flex-col relative"
      >
        <Image
          src="/images/notePaper.webp"
          alt="sonali"
          width={550}
          height={401}
          className="w-[95%] mx-auto max-w-[550px] absolute -z-10 rotate-[-10deg]"
        />
        <h1
          className={`flex flex-col gap-[0x]font-light w-full  text-[3rem] rotate-[-10deg] textShadow ${caveatBrush.className}`}
        >
          <span className="text-text-main font-bold">Hey</span>
          <span className="  text-white font-semibold rounded w-full">
            Sonali 🌸
          </span>
        </h1>
        <p className="text-text-main rotate-[-10deg]">
          I really like your this name btw!
        </p>
      </div>
    </>
  );
};

export default Greeting;
