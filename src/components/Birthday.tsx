"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import MessageInbox from "./MessageInbox";

const BirthdayGreeting = () => {
  const [step, setStep] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    // Clear existing timeline
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setStep((prev) => prev + 1), 1000);
      },
    });

    switch (step) {
      case 0: // Greeting
        tl.fromTo(
          "#greeting",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        break;

      case 1: // Memory Images (sequential scale animation)
        tl.fromTo(
          "#memory1Img",
          { autoAlpha: 0, scale: 2 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
        ).fromTo(
          "#memory2Img",
          { autoAlpha: 0, scale: 2 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
          "+=0.5" // starts 0.5s after previous animation ends
        );
        break;

      case 2: // Birthday
        tl.fromTo(
          "#birthday",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1 }
        );
        break;
      case 3: // Chat
        tl.from("#chat", 0.7, {
          scale: 0.2,
          opacity: 0,
        })
          .staggerTo(
            ".input-char",
            0.5,
            {
              display: "inline",
            },
            0.05
          )
          .to(
            "#chat",
            0.5,
            {
              scale: 0.2,
              opacity: 0,
              y: -150,
            },
            "+=0.7"
          );
        break;
    }

    timelineRef.current = tl;

    return () => {
      tl.kill(); // Cleanup
    };
  }, [step]);

  return (
    <div className="max-w-[425px] mx-auto h-[100dvh] overflow-hidden bg-[#0a0a23] text-white font-sans">
      {/* Greeting */}
      {step === 0 && (
        <div
          id="greeting"
          className="text-center h-full w-full center flex-col"
        >
          <h1 className="flex flex-col gap-[10px] text-[20px] font-light w-full">
            <span>Hey</span>
            <span className="text-[#ff0cae] bg-white  p-[10px] text-2xl font-semibold rounded w-full">
              Sonali 🌸
            </span>
          </h1>
          <p className="mt-2">I really like your this name btw!</p>
        </div>
      )}

      {/* Memory */}
      {step === 1 && (
        <div id="memory" className="text-center mt-8">
          <h2 className="text-3xl font-bold text-gray-200 max-w-[500px] mx-auto transition-opacity duration-700">
            Here's the two old conversations of us together that you may like
          </h2>
          <div className="mt-4 gap-6 justify-center items-center max-w-[300px] w-full aspect-[9/16] mx-auto relative">
            <img
              src="/images/herStory1.jfif"
              alt="Memory 1"
              id="memory1Img"
              className="w-full h-full object-contain rounded-lg shadow-lg absolute"
            />
            <img
              id="memory2Img"
              src="/images/herStory2.jpg"
              alt="Memory 2"
              className="w-full h-full object-contain rounded-lg shadow-lg absolute rotate-[-20deg]"
            />
          </div>
        </div>
      )}

      {/* Birthday Message */}
      {step === 2 && (
        <div id="birthday" className="mt-10 text-center">
          <p className="text-xl">It's your birthday!!! :D</p>
        </div>
      )}

      {/* Chat Section */}
      {step === 3 && <MessageInbox />}
    </div>
  );
};

export default BirthdayGreeting;
