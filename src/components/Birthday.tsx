"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import MessageInbox from "./MessageInbox";

const max_steps = 7;
const BirthdayGreeting = () => {
  const [step, setStep] = useState(6);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        if (step < max_steps) {
          setTimeout(() => setStep((prev) => prev + 1), 1000);
        }
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

      case 1: // Memory Images
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
        break;

      case 2: // Birthday
        tl.fromTo(
          "#birthday",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1 }
        );
        break;

      case 3: // Chat
        tl.from("#chat", 0.7, { scale: 0.2, opacity: 0 })
          .staggerTo(".input-char", 0.5, { display: "inline" }, 0.05)
          .to("#chat", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7");

        break;

      case 4:
        tl.from(".reason-line", {
          y: 40,
          autoAlpha: 0,
          duration: 1, // slower entrance
          stagger: 0.8, // each line waits longer before the next one
          ease: "power2.out",
        });

        // Wait extra time before auto-moving to next step
        tl.to({}, { duration: 2 });
        break;
      case 5:
        tl.from(".idea-6 span", {
          scale: 0,
          rotation: 90,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.4, // S first, then O
        })

          // HOLD for 1–2 seconds
          .to({}, { duration: 0.5 })

          // DISAPPEAR with custom positions
          .to(".idea-6 span:first-child", {
            scale: 0,
            rotation: -120,
            opacity: 0,
            x: -200, // S moves left
            y: -100, // S moves up
            duration: 1.3,
            ease: "expo.inOut",
          })

          .to(
            ".idea-6 span:last-child",
            {
              scale: 0,
              rotation: 160,
              opacity: 0,
              x: 250, // O moves right
              y: 120, // O moves down
              duration: 1.3,
              ease: "expo.inOut",
            },
            "-=1" // overlap with S disappearing, looks smoother
          );
        break;

      case 6:
        tl.staggerTo(
          ".baloons img",
          2.5,
          {
            y: () => -window.innerHeight * 2 - 200, // animate way above screen
            x: () => Math.random() * 200 - 100, // slight random horizontal drift
            rotation: () => Math.random() * 30 - 15, // random rotation
            opacity: 1,
            ease: "power1.out",
          },
          0.2
        );

        tl.staggerFrom(
          ".baloons img",
          0,
          {
            y: () => window.innerHeight + Math.random() * 200, // start offscreen below
            opacity: 0.8,
          },
          0.2
        );

        break;
      case 8:
        tl.from(".final-line", {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.8,
          ease: "power2.out",
        });

        // Rotate the smiley so it becomes straight
        tl.from(
          "#last_smile",
          {
            rotate: 0, // starting angle
            duration: 0.8,
            delay: 0.7,
            ease: "back.out(1.7)",
          },
          "-=0.5" // overlaps slightly with final-line animation
        );

        tl.to({}, { duration: 5 });
        break;
    }

    timelineRef.current = tl;

    return () => {
      tl.kill(); // Cleanup
    };
  }, [step]);

  return (
    <div className="max-w-[425px] mx-auto h-[100dvh] overflow-hidden bg-[#0a0a23] text-white font-sans">
      {/* Step 0 */}
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

      {/* Step 1 */}
      {step === 1 && (
        <div id="memory" className="text-center mt-8">
          <h2 className="text-3xl font-bold text-gray-200 max-w-[500px] mx-auto">
            Here&apos;s the two old conversations of us together that you may
            like
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
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div id="birthday" className="mt-10 text-center">
          <p className="text-xl">It&apos;s your birthday!!! :D</p>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && <MessageInbox />}

      {/* Step 4 – MULTIPLE CONTENT */}
      {step === 4 && (
        <div
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
      )}
      {step === 5 && (
        <div className="flex items-center justify-center w-full h-dvh">
          <p className="idea-6">
            <span className="text-[15rem] inline-block">S</span>
            <span className="text-[15rem] inline-block">O</span>
          </p>
        </div>
      )}
      {step === 6 && (
        <div className="ballons_wish">
          <div className="baloons w-full h-dvh">
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon3.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
            <img src="images/ballon2.svg" alt="" />
            <img src="images/ballon1.svg" alt="" />
          </div>
        </div>
      )}

      {/* Step 7 – MULTIPLE CONTENT */}
      {step === 7 && (
        <div
          id="final"
          className="flex flex-col gap-[10px] justify-center items-center h-dvh"
        >
          <h3 className="final-line text-[20px] font-bold">
            Once again, Happy birthday
          </h3>
          <p className="final-line text-[30px] text-white p-[10px] bg-[#ff0b91] w-full text-center ">
            Miss Beautiful{" "}
            <span id="last_smile" className="inline-block rotate-90">
              :)
            </span>
          </p>
          <p className="final-line text-lg">
            Thank you so much for reading this
          </p>
        </div>
      )}
    </div>
  );
};

export default BirthdayGreeting;
