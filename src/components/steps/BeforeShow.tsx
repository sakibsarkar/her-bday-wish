"use client";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const BeforeShow = ({ onComplete }: { onComplete: () => void }) => {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.from(".idea-6 span", {
        scale: 0,
        rotation: 90,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.4, // S appears, then O
      })
        // hold 1 second
        .to({}, { duration: 1 })

        // S disappears
        .to(".idea-6 span:first-child", {
          scale: 0,
          rotation: -120,
          opacity: 0,
          x: -200,
          y: -120,
          duration: 1.3,
          ease: "expo.inOut",
        })

        // O disappears
        .to(
          ".idea-6 span:last-child",
          {
            scale: 0,
            rotation: 150,
            opacity: 0,
            x: 250,
            y: 130,
            duration: 1.3,
            ease: "expo.inOut",
          },
          "-=1" // overlap S animation for smooth timing
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="flex items-center justify-center w-full h-dvh">
      <p className="idea-6">
        <span className="text-[15rem] inline-block">S</span>
        <span className="text-[15rem] inline-block">O</span>
      </p>
    </div>
  );
};

export default BeforeShow;
