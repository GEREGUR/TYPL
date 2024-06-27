"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Option {
  text: string;
  score: number;
}

interface Question {
  question: string;
  type: "multiple_choice" | "open";
  options: Option[];
}

interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function TestInProgressPage({
  params,
}: {
  params: { id: string };
}) {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { answer: string; score: number }[]
  >([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false); // Track if it's the last question

  const router = useRouter();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/tests/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setTest(data.test);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to fetch test:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [params.id]);

  const handleNextQuestion = () => {
    setUserAnswers([
      ...userAnswers,
      { answer: currentAnswer, score: currentScore },
    ]);
    setCurrentAnswer("");
    setCurrentScore(0);
    if (currentQuestionIndex < test!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLastQuestion(true); // Mark that we're on the last question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = userAnswers[currentQuestionIndex - 1] || {
        answer: "",
        score: 0,
      };
      setCurrentAnswer(previousAnswer.answer);
      setCurrentScore(previousAnswer.score);
      setUserAnswers(userAnswers.slice(0, currentQuestionIndex - 1));
    }
  };

  const { data: session } = useSession();
  const user = session?.user;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!test) {
    return notFound();
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  console.log(userAnswers);

  const handleSubmit = async () => {
    const result = {
      userId: user.id, // Replace with actual user ID
      testId: params.id,
      answers: userAnswers.map((answer, index) => ({
        questionId: index.toString(),
        answer: answer.answer,
        score: answer.score,
      })),
    };
    const res = await fetch("/api/test-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    if (res.ok) {
      alert("Test results saved successfully!");
      router.push(`/client/test/${params.id}/result`);
    } else {
      alert("Error saving test results.");
    }
  };

  const handleOptionSelect = (option: Option) => {
    setCurrentAnswer(option.text);
    setCurrentScore(option.score);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 px-4 pt-4">
      <h1 className="mb-4 text-2xl font-bold">{test.title}</h1>
      <div className="w-full rounded-lg border border-black/15 bg-white/10 p-4 text-center shadow-xl md:w-3/4 md:p-6 lg:w-2/3 lg:p-8">
        <p className="text-xl md:text-2xl lg:text-3xl">
          {currentQuestion.question}
        </p>
        {currentQuestion.type === "multiple_choice" && (
          <div className="mt-4 flex flex-col items-center gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                className={`w-1/2 text-xl ${
                  currentAnswer === option.text
                    ? "bg-gray-400 text-white"
                    : "bg-white"
                } duration-300`}
                variant={"ghost"}
                onClick={() => handleOptionSelect(option)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        )}
        {currentQuestion.type === "open" && (
          <textarea
            className="mt-4 w-full rounded-md p-2 text-black md:p-4 lg:p-6"
            placeholder="Введите ваш ответ"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        )}
      </div>

      <div className="mt-8 flex w-full justify-between px-4 md:px-24">
        <Button
          className="hovere:border-black/25 w-24 bg-black/35 text-xl shadow-md duration-300 hover:border-2 hover:text-black/15 hover:shadow-xl md:w-48 md:text-2xl"
          variant={"ghost"}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Назад
        </Button>
        <Button
          className="hovere:border-black/25 w-24 bg-black/35 text-xl shadow-md duration-300 hover:border-2 hover:text-black/55 hover:shadow-xl md:w-48 md:text-2xl"
          variant={"ghost"}
          onClick={handleNextQuestion}
          disabled={!currentAnswer}
        >
          Далее
        </Button>
      </div>
      {isLastQuestion ? (
        <div className="absolute top-1 mt-24 flex h-[80%] w-[80%] items-center justify-center rounded-xl bg-white">
          <button
            className="text-center text-3xl hover:underline"
            onClick={handleSubmit}
          >
            Завершить
          </button>
        </div>
      ) : null}
    </div>
  );
}
