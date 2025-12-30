"use server";
import connectDB from "@/config/db";
import User from "@/models/user.model";
import { IResponse } from "@/types/response";
import bcrypt from "bcrypt";

interface ILogin {
  userName: string;
  password: string;
}

type TRateLimit = {
  attempts: number;
  coolDown: number | null;
};

const rateLimitStore: Map<string, TRateLimit> = new Map();

const WINDOW = 60 * 1000 * 3; // 3 minutes
const MAX_ATTEMPTS = 5;

export const loginAction = async ({
  userName,
  password,
}: ILogin): Promise<IResponse> => {
  await connectDB();

  const now = Date.now();
  const entry = rateLimitStore.get(userName) || { attempts: 0, coolDown: null };

  if (entry.coolDown) {
    if (now < entry.coolDown) {
      return {
        message: "Too many attempts. Try again after some time.",
        status: 429,
        data: null,
        success: false,
      };
    }
    if (now >= entry.coolDown) {
      rateLimitStore.set(userName, { attempts: 0, coolDown: null });
    }
  }

  const user = await User.findOne({ userName });

  if (!user) {
    return {
      message: "User not found",
      status: 404,
      success: false,
      data: null,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    entry.attempts += 1;

    if (entry.attempts >= MAX_ATTEMPTS) {
      entry.coolDown = now + WINDOW;
    }

    rateLimitStore.set(userName, entry);

    return {
      message: "Invalid credentials",
      status: 401,
      data: null,
      success: false,
    };
  }

  rateLimitStore.set(userName, { attempts: 0, coolDown: null });

  return {
    message: "Login successful",
    status: 200,
    data: {
      _id: user._id?.toString(),
      userName: user.userName,
    },
    success: true,
  };
};
