"use client";

import type React from "react";

import { useState } from "react";
import { BiLock } from "react-icons/bi";
import { FiEyeOff } from "react-icons/fi";

const tempPassword = "1234";
const EnterPassword = ({ onVerified }: { onVerified: () => void }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.length) return;
    if (password !== tempPassword) return;
    setIsSubmitted(true);
    setPassword("");
    setTimeout(() => {
      onVerified?.();
    }, 2000);
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
                onKeyDown={() => {
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
                {showPassword ? <FiEyeOff size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-b-4 border-pink-600 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitted ? (
                <>
                  <span className="text-xl">✨</span>
                  Welcome!
                </>
              ) : (
                <>
                  <span>Unlock</span>
                  <span className="text-xl">🔓</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
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
        <div className="mt-6 text-center animate-bounce">
          <p className="text-pink-600 font-bold text-lg">
            🎉 Password accepted! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default EnterPassword;
