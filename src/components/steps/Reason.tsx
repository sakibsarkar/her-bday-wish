"use client";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const Reason = ({ onComplete }: { onComplete: () => void }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.from(".reason-line", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.8,
        ease: "power2.out",
      }).to({}, { duration: 2 });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      id="reason"
      className="mt-10 h-dvh flex items-center justify-center flex-col gap-2 px-2"
    >
      <p className="reason-line text-xl text-center">
        Then I thought tumi special,
      </p>
      <p className="reason-line text-xl text-center">
        Tomake keno shobar moto messenger a
      </p>
      <p className="reason-line text-xl text-center">
        Copy-paste wish korbo ❤️
      </p>
    </div>
  );
};

export default Reason;
