"use client";

import { SONGS } from "@/mock/songs";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import MusicPlayer, { ISong } from "./MusicPlayer";

const MusicSelector = ({
  onComplete,
}: {
  onComplete: (song?: ISong) => void;
}) => {
  const handleContinue = (id: string) => {
    const selectedSong = SONGS.find((song) => song.id === id);
    onComplete(selectedSong);
  };

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      "#ms-header",
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8 }
    )
      .fromTo(
        "#ms-description",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ["#ms-note1", "#ms-note2"],
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.2 },
        "-=0.6"
      );
  }, []);

  return (
    <div className="max-h-dvh h-full flex items-center justify-center p-4 relative overflow-x-hidden overflow-y-auto bg-[url('/images/music_bg.jpg')] bg-no-repeat bg-cover">
      {/* Musical notes */}
      <div
        id="ms-note1"
        className="absolute top-20 right-1/4 text-4xl animate-bounce-gentle"
      >
        ♪
      </div>
      <div
        id="ms-note2"
        className="absolute bottom-1/3 left-10 text-5xl animate-bounce-gentle"
        style={{ animationDelay: "0.3s" }}
      >
        ♫
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div
            id="ms-header"
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2"
          >
            Pick Your Vibe
          </div>
          <div id="ms-description" className="text-gray-600 text-md">
            Choose the soundtrack for your special day
          </div>
        </div>

        <MusicPlayer onContinue={handleContinue} />
      </div>
    </div>
  );
};

export default MusicSelector;
