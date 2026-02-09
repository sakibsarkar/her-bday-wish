"use server";
import connectDB from "@/config/db";
import Gift from "@/models/gift.model";
import { isValidObjectId } from "mongoose";
export const saveGiftAction = async (giftId: string, giftObjId?: string) => {
  await connectDB();

  const isVaildObjId = giftObjId ? isValidObjectId(giftObjId) : false;

  if (isVaildObjId) {
    const gift = await Gift.findOneAndUpdate(
      { _id: giftObjId },
      { giftId },
      { upsert: true }
    );
    return gift?.toObject();
  } else {
    const gift = await Gift.create({ giftId });
    return gift.toObject();
  }
};
