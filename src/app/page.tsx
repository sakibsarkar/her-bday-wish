"use client";
import BirthdayGreeting from "@/components/Birthday";
import EnterPassword from "@/components/EnterPassword";
import { useState } from "react";
const Page = () => {
  const [shouldStart, setShouldStart] = useState(false);
  return (
    <>
      {shouldStart ? (
        <BirthdayGreeting />
      ) : (
        <main className="min-h-dvh bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-4">
          <EnterPassword
            onVerified={() => {
              setShouldStart(true);
            }}
          />
        </main>
      )}
    </>
  );
};

export default Page;
