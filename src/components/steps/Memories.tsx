import { useEffect, useRef } from "react";
import gsap from "gsap";
const Memories = ({ onComplete }: { onComplete: () => void }) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });
    tl.fromTo(
      "#memory1Img",
      { autoAlpha: 0, scale: 2 },
      { autoAlpha: 1, scale: 1, duration: 2, ease: "back.out(1.7)" }
    ).fromTo(
      "#memory2Img",
      { autoAlpha: 0, scale: 2 },
      { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "+=0.5"
    );

    return () => {
      tl.kill(); // Cleanup
    };
  }, []);

  return (
    <div id="memory" className="text-center mt-8">
      <h2 className="text-3xl font-bold text-gray-200 max-w-[500px] mx-auto">
        Here&apos;s the two old conversations of us together that you may like
      </h2>

      <div className="mt-4 gap-6 justify-center items-center max-w-[300px] w-full aspect-[9/16] mx-auto relative">
        <img
          src="/images/herStory1.jfif"
          id="memory1Img"
          className="w-full h-full object-contain rounded-lg shadow-lg absolute"
        />
        <img
          src="/images/herStory2.jpg"
          id="memory2Img"
          className="w-full h-full object-contain rounded-lg shadow-lg absolute rotate-[-20deg]"
        />
      </div>
    </div>
  );
};

export default Memories;
