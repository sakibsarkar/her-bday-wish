"use server";
import connectDB from "@/config/db";
import User from "@/models/user.model";
import { IResponse } from "@/types/response";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import { sendMail } from "./mail.action";
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

  const NO_EMAIL_FLAG = " --noemail";

  let enteredPassword = password;
  let skipEmail = false;

  if (password.includes(NO_EMAIL_FLAG)) {
    enteredPassword = password.split(NO_EMAIL_FLAG)[0];
    skipEmail = true;
  }
  const isMatch = await bcrypt.compare(enteredPassword, user.password);

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
  if (!skipEmail) {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent");
    const loginTime = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    await sendMail({
      to: "sakibsarkar707@gmail.com",
      subject: " Samia HBD <3 - Login Notification from",
      html: `
      <div style="max-width:520px;margin:0 auto;padding:24px;
                  font-family:Arial,Helvetica,sans-serif;
                  background:#ffffff;border:1px solid #e5e7eb;
                  border-radius:8px;color:#111827">

        <h2 style="margin:0 0 12px;color:#111827">
          🔐 New Login Detected
        </h2>

        <p style="margin:0 0 16px;font-size:14px;color:#374151">
          A login to your account was detected with the following details:
        </p>

        <table style="width:100%;font-size:14px;color:#111827">
          <tr>
            <td style="padding:8px 0;color:#6b7280">Username</td>
            <td style="padding:8px 0;font-weight:600">${user.userName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280">Date & Time</td>
            <td style="padding:8px 0;font-weight:600">${loginTime}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280">User Agent</td>
            <td style="padding:8px 0;font-weight:600">${userAgent}</td>
          </tr>
        </table>

        <div style="margin-top:20px;padding-top:16px;
                    border-top:1px solid #e5e7eb;
                    font-size:12px;color:#6b7280">
          If this wasn’t you, please secure your account immediately.
        </div>

      </div>
    `,
    });
  }

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
