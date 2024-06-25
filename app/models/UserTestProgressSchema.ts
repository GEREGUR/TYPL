import mongoose, { Schema, models } from "mongoose";

const userTestProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    currentBlockIndex: { type: Number, default: 0 },
    currentQuestionIndex: { type: Number, default: 0 },
    answers: [
      {
        blockIndex: Number,
        questionIndex: Number,
        answer: String,
        score: Number,
      },
    ],
    status: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
    totalScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const UserTestProgress =
  models.UserTestProgress ||
  mongoose.model("UserTestProgress", userTestProgressSchema);
export default UserTestProgress;
