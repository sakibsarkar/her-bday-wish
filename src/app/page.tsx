"use client";
import BirthdayGreeting from "@/components/Birthday";
import { useState } from "react";
const Page = () => {
  const [shouldStart, setShouldStart] = useState(false);
  return (
    <>
      {shouldStart ? (
        <BirthdayGreeting />
      ) : (
        <button onClick={() => setShouldStart(true)}>Start</button>
      )}
    </>
  );
};

export default Page;
