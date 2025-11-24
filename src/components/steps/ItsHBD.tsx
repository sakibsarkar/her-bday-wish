import gsap from "gsap";
import { useEffect, useRef } from "react";

const ItsHBD = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({ onComplete });

    const paragraphs = containerRef.current?.querySelectorAll("p") || [];

    paragraphs.forEach((p) => {
      tl.fromTo(
        p,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: -10, duration: 1, ease: "power2.out" }
      ).to(p, { autoAlpha: 0, y: -30, duration: 1, delay: 1 }); // stays for 1s then fades out
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="birthday"
      className="text-center w-full h-full flex flex-col justify-center items-center bg-[#ee4848]"
    >
      <p className="text-xl">It&apos;s your birthday!!! :D</p>
      <p className="text-xl">I thought I should send u a sweet msg</p>
      <p className="text-xl">Like this one...</p>
    </div>
  );
};

export default ItsHBD;
