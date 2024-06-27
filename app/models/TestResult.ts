import mongoose, { Schema, Document } from "mongoose";

interface ITestResult extends Document {
  userId: string;
  testId: string;
  answers: {
    questionId: string;
    answer: string;
    score: number;
  }[];
  createdAt: Date;
}

const TestResultSchema: Schema = new Schema({
  userId: { type: String, required: true },
  testId: { type: String, required: true },
  answers: [
    {
      questionId: { type: String, required: true },
      answer: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TestResult ||
  mongoose.model<ITestResult>("TestResult", TestResultSchema);
