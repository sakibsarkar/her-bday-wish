import { Schema, model, models } from "mongoose";

const giftSchema = new Schema(
  {
    giftId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

const Gift = models.Gift || model("Gift", giftSchema);

export default Gift;
