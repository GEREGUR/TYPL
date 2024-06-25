export type CreateTestDto = {
  title: string;
  description: string;
  questions: {
    question: string;
    type: "multiple_choice" | "open";
    options: {
      text: string;
      score: number;
    }[];
  }[];
};
