"use client";
import BirthdayGreeting from "@/components/Birthday";
import EnterPassword from "@/components/EnterPassword";
import { ISong } from "@/components/MusicSelection/MusicPlayer";
import MusicSelector from "@/components/MusicSelection/MusicSelector";
import { useState } from "react";
type TStep = "auth" | "music-selection" | "main";
const Page = () => {
  const [shouldStart, setShouldStart] = useState<TStep>("main");
  const [song, setSong] = useState<ISong | null>(null);
  return (
    <>
      {shouldStart === "auth" ? (
        <main className="min-h-dvh bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-4">
          <EnterPassword
            onVerified={() => {
              setShouldStart("music-selection");
            }}
          />
        </main>
      ) : shouldStart === "music-selection" ? (
        <MusicSelector
          onComplete={(song) => {
            setSong(song);
            setShouldStart("main");
          }}
        />
      ) : shouldStart === "main" ? (
        <BirthdayGreeting
          song={song || undefined}
          onEnd={() => setShouldStart("auth")}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Page;
