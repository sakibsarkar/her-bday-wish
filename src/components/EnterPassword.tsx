"use client";

import { loginAction } from "@/app/actions/auth.action";
import Image from "next/image";
import type React from "react";

import { useState } from "react";
import { BiLock } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

const EnterPassword = ({ onVerified }: { onVerified: () => void }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.length) return;

    setIsLoading(true);
    const res = await loginAction({ userName: "samia_khan", password });
    setIsLoading(false);

    if (!res.success) {
      toast.error(res.message);
      setPassword("");
      return;
    }

    setAnimating(true);
    setPassword("");
    setIsSubmitted(true);

    setTimeout(() => {
      setAnimating(false);
      onVerified?.();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      {/* Decorative elements */}
      <div
        className="absolute top-8 left-12 text-3xl animate-bounce"
        style={{ animationDelay: "0s" }}
      >
        ✨
      </div>
      <div
        className="absolute top-32 right-16 text-2xl animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        🎈
      </div>
      <div
        className="absolute bottom-32 left-8 text-2xl animate-bounce"
        style={{ animationDelay: "0.3s" }}
      >
        🎉
      </div>

      {/* Main form card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
        {/* Top decoration */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-4 h-8 bg-pink-400 rounded-full transform -rotate-12"></div>
          <div className="w-4 h-8 bg-pink-500 rounded-full"></div>
          <div className="w-4 h-8 bg-pink-400 rounded-full transform rotate-12"></div>
        </div>

        {/* Content */}
        <div className="text-center mb-8 mt-4">
          <div className="inline-block bg-gradient-to-br from-pink-200 to-pink-300 p-4 rounded-2xl mb-4">
            <BiLock className="w-8 h-8 text-pink-700" />
          </div>
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600 mb-2"
            style={{ textShadow: "2px 2px 0px rgba(236, 72, 153, 0.3)" }}
          >
            Secret Access
          </h1>
          <p className="text-pink-600 text-sm font-medium">
            Enter your magical password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password input */}
          <div className="space-y-2">
            <div
              className={`space-y-2 transition-all duration-700 ${
                animating ? "opacity-0 -translate-y-6" : "opacity-100"
              }`}
            >
              {" "}
              <label
                htmlFor="password"
                className="block text-pink-700 font-bold text-sm"
              >
                🔐 Password
              </label>
              <div className="relative duration-75">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={() => {
                    const audio = new Audio("/audio/key.mp3");
                    audio.play();
                  }}
                  placeholder="Enter your secret..."
                  className="w-full px-6 py-4 bg-pink-50 border-3 border-pink-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-400 text-pink-900 placeholder-pink-300 font-medium transition-all duration-200 hover:border-pink-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-700 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                <Image
                  src="/images/mewmew.gif"
                  alt=""
                  width={100}
                  height={100}
                  className="absolute top-[-97px] right-0 w-[100p]"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={` w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-[0.3s] transform border-b-4 border-pink-600 relative overflow-hidden group shadow-lg cursor-pointer active:scale-[0.5] ${
              animating ? "translate-y-[-40px] scale-110" : ""
            } ${isSubmitted ? "scale-125 bg-pink-500 shadow-2xl" : ""}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitted ? (
                <>
                  <span className="text-xl">✨</span>
                  Welcome!
                </>
              ) : (
                <>
                  <span>{isLoading ? "Unlocking..." : "Unlock"}</span>
                  <span className="text-xl">{isLoading ? "🤔" : "🔓"}</span>
                </>
              )}
            </span>

            {/* Cute glow */}
            {animating && (
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-2xl"></div>
            )}
          </button>

          {/* Password strength indicator */}
          <div className="flex gap-1 h-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors duration-300 ${
                  password.length > i * 3
                    ? "bg-gradient-to-r from-pink-400 to-pink-500"
                    : "bg-pink-100"
                }`}
              ></div>
            ))}
          </div>
        </form>

        {/* Bottom decoration */}
        <div
          className="absolute -bottom-4 right-8 text-3xl animate-bounce"
          style={{ animationDelay: "0.7s" }}
        >
          😊
        </div>
      </div>

      {/* Success message */}
      {isSubmitted && (
        <div
          className="mt-6 text-center text-pink-600 font-bold text-lg
               animate-[fadein_1s_ease-in-out]"
        >
          🎉 Password accepted! 🎉
        </div>
      )}
    </div>
  );
};

export default EnterPassword;
