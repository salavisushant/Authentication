const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    position: { type: String, required: true },
    age: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("profile", profileSchema);
