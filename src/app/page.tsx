"use client";
import BirthdayGreeting from "@/components/Birthday";
import EnterPassword from "@/components/EnterPassword";
import { ISong } from "@/components/MusicSelection/MusicPlayer";
import MusicSelector from "@/components/MusicSelection/MusicSelector";
import { useState } from "react";
type TStep = "auth" | "music-selection" | "main";
const Page = () => {
  const [shouldStart, setShouldStart] = useState<TStep>("auth");
  const [song, setSong] = useState<ISong | undefined>();
  return (
    <>
      {shouldStart === "auth" ? (
        <main className="bg-[url('/images/auth_bg.jpg')] bg-cover bg-no-repeat min-h-dvh bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-4">
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
        <BirthdayGreeting song={song} onEnd={() => setShouldStart("auth")} />
      ) : (
        ""
      )}
    </>
  );
};

export default Page;
