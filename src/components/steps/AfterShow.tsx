"use client";
import { patrickHand } from "@/fonts";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const AfterShow = ({ onComplete }: { onComplete: () => void }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      // 1️⃣ Animate each line in
      tl.from(linesRef.current!.children, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 1.2,
        ease: "power2.out",
      })
        // Pause to read
        .to({}, { duration: 2 })
        // 2️⃣ Fade out each line upwards one by one
        .to(linesRef.current!.children, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.4,
          ease: "power2.in",
        })
        // 3️⃣ Fade out the main container after all lines
        .to(linesRef.current!, {
          opacity: 0,
          y: -10,
          duration: 0.6,
        })
        .set(linesRef.current!, { display: "none" })
        // 4️⃣ Show final text
        .fromTo(
          finalRef.current!,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
        )
        // 5️⃣ Hold for a bit
        .to(
          {},
          {
            duration: 5,
          }
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`mt-10 h-dvh flex items-center justify-center flex-col gap-2 px-2 ${patrickHand.className}`}
    >
      <div
        ref={linesRef}
        className="bg-text-main px-4 py-6 rounded-2xl w-full max-w-[600px] space-y-2 text-center"
      >
        <p className="text-2xl">Cake to kata holo</p>
        <p className="text-2xl">Birthday er dine to ballon futano lage</p>
        <p className="text-2xl">Cholo futai.</p>
      </div>

      <div
        ref={finalRef}
        className="text-4xl text-center mt-4 opacity-0 text-text-main"
      >
        Suru kora jak, Naki?
      </div>
    </div>
  );
};

export default AfterShow;
