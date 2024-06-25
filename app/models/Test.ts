import mongoose, { Schema, models } from "mongoose";

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    type: { type: String, enum: ["multiple_choice", "open"], required: true },
    options: [
      {
        text: String,
        score: Number,
      },
    ],
  },
  { timestamps: true },
);

const testSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [questionSchema],
  },
  { timestamps: true },
);

// const blockSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     questions: [testSchema],
//   },
//   { timestamps: true },
// );

const Test = models.Test || mongoose.model("Test", testSchema);
export default Test;
