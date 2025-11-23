"use client";
import { useEffect, useRef, useState } from "react";
import MessageInbox from "./MessageInbox";
import BallonWish from "./steps/BallonWish";
import BeforeShow from "./steps/BeforeShow";
import Ending from "./steps/Ending";
import Greeting from "./steps/Greeting";
import ItsHBD from "./steps/ItsHBD";
import Memories from "./steps/Memories";
import Reason from "./steps/Reason";

const BirthdayGreeting = () => {
  const [step, setStep] = useState(0);

  const handleComplete = () => {
    setTimeout(() => setStep((prev) => prev + 1), 500);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/main.mp3");
    audioRef.current
      .play()
      .catch((err) => console.log("Audio play failed:", err));
  }, []);
  return (
    <div className="max-w-[425px] mx-auto h-[100dvh] overflow-hidden bg-[#0a0a23] text-white font-sans">
      {/* Step 0 */}
      {step === 0 && <Greeting onComplete={handleComplete} />}

      {/* Step 1 */}
      {step === 1 && <Memories onComplete={handleComplete} />}

      {/* Step 2 */}
      {step === 2 && <ItsHBD onComplete={handleComplete} />}

      {/* Step 3 */}
      {step === 3 && <MessageInbox onComplete={handleComplete} />}

      {/* Step 4 – MULTIPLE CONTENT */}
      {step === 4 && <Reason onComplete={handleComplete} />}
      {step === 5 && <BeforeShow onComplete={handleComplete} />}
      {step === 6 && <BallonWish onComplete={handleComplete} />}

      {/* Step 7 – MULTIPLE CONTENT */}
      {step === 7 && <Ending onComplete={handleComplete} />}
    </div>
  );
};

export default BirthdayGreeting;
