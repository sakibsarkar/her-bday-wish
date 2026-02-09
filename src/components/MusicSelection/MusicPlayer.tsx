"use client";

import { SONGS } from "@/mock/songs";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";

export interface ISong {
  id: string;
  name: string;
  src: string;
  playTime: number;
}

interface MusicPlayerProps {
  onSelectSong?: (id: string) => void;
  onContinue: (id: string) => void;
}

export default function MusicPlayer({
  onSelectSong,
  onContinue,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayToggle = (song: ISong) => {
    onSelectSong?.(song.id);

    if (selectedSong !== song.id && audioRef.current) {
      audioRef.current.pause();
      setPlayingId(null);
    }

    if (playingId === song.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.src;
        audioRef.current.currentTime = song.playTime;
        audioRef.current.play().catch(() => {
          console.log("Audio playback not available");
        });
        setPlayingId(song.id);
        setSelectedSong(song.id);
      }
    }
  };

  // Animate songs on mount
  useLayoutEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
    });

    SONGS.forEach((song, idx) => {
      tl.fromTo(
        `#song-${song.id}`,
        { y: 30, autoAlpha: 0 }, // start below and invisible
        { y: 0, autoAlpha: 1 }, // move to natural position and fully visible
        idx * 0.3 // stagger
      );
    });
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute -inset-8 bg-gradient-to-br from-pink-200/30 via-purple-200/20 to-blue-200/30 rounded-3xl blur-2xl"></div>

      <audio ref={audioRef} />

      <div className="relative bg-transparent rounded-2xl shadow-2xl py-3 border-2 border-[#fdabae] backdrop-blur-[2px]">
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
          <div className="text-white text-2xl">♪</div>
        </div>

        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full flex items-center justify-center shadow-lg">
          <div className="text-white text-lg">♫</div>
        </div>

        <div className="mb-3 max-h-[400px] overflow-auto smoothBar">
          {SONGS.map((song, index) => {
            const isPlaying = playingId === song.id;
            const isSelected = selectedSong === song.id;
            const isLast = index === SONGS.length - 1;
            return (
              <div
                key={`song-${song.id}`}
                id={`song-${song.id}`} // unique id for animation
                onClick={() => handlePlayToggle(song)}
                className={`flex items-center gap-3 p-3 transition-all duration-300 rounded-[4px] px-3 ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-400/10 to-purple-500/10"
                    : "bg-transparent"
                } ${isLast ? "" : "border-b border-[#ffa3d7]"}`}
              >
                <button
                  className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? "bg-gradient-to-br from-pink-500/70 to-purple-500/70 text-white backdrop-blur-[2px]"
                      : "text-[#5f2d4f] hover:text-purple-500"
                  }`}
                >
                  {isPlaying ? (
                    <BiPause className="text-[20px]" />
                  ) : (
                    <BiPlay className="text-[20px]" />
                  )}
                </button>

                <div className="flex-1 overflow-hidden min-w-0">
                  <p
                    className={`font-semibold text-sm md:text-base ${
                      isSelected
                        ? "text-pink-400 animate-marquee whitespace-nowrap"
                        : "text-[#5f2d4f] line-clamp-1"
                    }`}
                  >
                    {song.name}
                  </p>
                </div>

                {isPlaying && (
                  <div className="flex gap-1 items-end h-4 flex-shrink-0">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"
                        style={{
                          animation: `music-bar 0.4s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                          height: `${6 + i * 3}px`,
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-3">
          <button
            onClick={() => {
              if (!selectedSong) return;
              onContinue(selectedSong);
            }}
            disabled={!selectedSong}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
