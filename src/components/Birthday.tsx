"use client";
import { useEffect, useRef, useState } from "react";
import { ISong } from "./MusicSelection/MusicPlayer";
import AfterShow from "./steps/AfterShow";
import BallonPop from "./steps/BallonPop";
import BallonWish from "./steps/BallonWish";
import BeforeShow from "./steps/BeforeShow";
import ChooseGift from "./steps/ChooseGift";
import Ending from "./steps/Ending";
import Greeting from "./steps/Greeting";
import ItsHBD from "./steps/ItsHBD";
import Memories from "./steps/Memories";
import MessageInbox from "./steps/MessageInbox";
import Reason from "./steps/Reason";

export interface ICompleteOption {
  audioVolume?: number;
}

const BirthdayGreeting = ({
  onEnd,
  song,
}: {
  onEnd: () => void;
  song?: ISong;
}) => {
  const [step, setStep] = useState(9);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleComplete = (options?: ICompleteOption) => {
    setTimeout(() => setStep((prev) => prev + 1), 500);
    if (options?.audioVolume !== undefined && audioRef.current) {
      audioRef.current.volume = options.audioVolume;
    }
  };

  useEffect(() => {
    audioRef.current = new Audio(song?.src || "/audio/musics/main.mp3");
    audioRef.current.currentTime = song?.playTime || 0;
    audioRef.current
      .play()
      .catch((err) => console.log("Audio play failed:", err));

    return () => audioRef.current?.pause();
  }, []);
  return (
    <div className="ma2x-w-[425px] mx-auto h-[100dvh] overflow-hidden text-white font-sans">
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
      {step === 6 && (
        <BallonWish
          onComplete={handleComplete}
          onCandleBlow={() => {
            if (audioRef.current) {
              audioRef.current.volume = 0.4;
            }
          }}
        />
      )}
      {step === 7 && <AfterShow onComplete={handleComplete} />}
      {step === 8 && (
        <BallonPop
          onRender={() => {
            if (audioRef.current) {
              audioRef.current.volume = 0.5;
            }
          }}
          onComplete={handleComplete}
        />
      )}

      {step === 9 && <ChooseGift onComplete={handleComplete} />}
      {step === 10 && (
        <Ending
          onComplete={() => {
            if (audioRef.current) {
              audioRef.current?.pause();
              audioRef.current = null;
            }
            onEnd();
          }}
        />
      )}
    </div>
  );
};

export default BirthdayGreeting;
