"use client";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const Ending = ({ onComplete }: { onComplete: () => void }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // Animate each line from bottom
      tl.from(".final-line", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.8,
        ease: "power2.out",
      });

      // Rotate the smile from 90° → 0°
      tl.fromTo(
        "#last_smile",
        { rotate: 0 },
        { rotate: 90, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5" // overlap slightly with staggered text
      );

      tl.to({}, { duration: 5 }); // hold for a bit
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      id="final"
      className="flex flex-col gap-[10px] justify-center items-center h-dvh"
    >
      <h3 className="final-line text-[20px] font-bold">
        Once again, Happy birthday
      </h3>

      <p className="final-line text-[30px] text-white p-[10px] bg-[#ff0b91] w-full text-center ">
        Miss Beautiful{" "}
        <span id="last_smile" className="inline-block">
          :)
        </span>
      </p>

      <p className="final-line text-lg">Thank you so much for reading this</p>
    </div>
  );
};

export default Ending;
