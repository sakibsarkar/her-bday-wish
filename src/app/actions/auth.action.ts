"use server";
import connectDB from "@/config/db";
import User from "@/models/user.model";
import { IResponse } from "@/types/response";
import bcrypt from "bcrypt";
interface ILogin {
  userName: string;
  password: string;
}
export const loginAction = async ({
  userName,
  password,
}: ILogin): Promise<IResponse> => {
  await connectDB();

  const user = await User.findOne({ userName });

  if (!user)
    return {
      message: "User not found",
      status: 404,
      success: false,
      data: null,
    };
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      message: "Invalid credentials",
      status: 401,
      data: null,
      success: false,
    };
  }

  return {
    message: "Login successful",
    status: 200,
    data: null,
    success: true,
  };
};
