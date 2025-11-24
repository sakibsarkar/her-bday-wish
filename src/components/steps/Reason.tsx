"use client";
import { patrickHand } from "@/fonts";
import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ICompleteOption } from "../Birthday";

const Reason = ({
  onComplete,
}: {
  onComplete: (options?: ICompleteOption) => void;
}) => {
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
      className={`mt-10 h-dvh flex items-center justify-center flex-col gap-2 px-2 ${patrickHand.className}`}
    >
      <div className="relative w-full max-w-[600px]">
        <Image
          src="/images/heartLetter.gif"
          alt="reason"
          width={100}
          height={100}
          className="absolute top-[-74px] left-[-15px] rotate-[-11deg]"
        />
        <div className="bg-text-main px-1 py-4 rounded-2xl w-full space-y-1">
          <p className="reason-line text-center text-2xl">
            Then I thought tumi special,
          </p>
          <p className="reason-line text-center text-2xl">
            Tmkee kno shobar moto messenger a
          </p>
          <p className="reason-line text-center text-2xl">
            Copy-paste wish korbo ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reason;
