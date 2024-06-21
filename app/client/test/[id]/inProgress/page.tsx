"use client";

import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useState } from "react";

interface Question {
  question: string;
  type: "open" | "binary" | "multiple";
  options?: string[];
  answer?: string;
}

interface Block {
  name: string;
  title: string;
  description: string;
  questions: Question[];
  color: string;
}

const mockData: { [key: string]: Block } = {
  101: {
    name: "Block 1",
    title: "Формирование культурно-бытовых ценностей",
    description: "Организованный ли вы человек?",
    questions: [
      {
        question:
          "Умеете ли вы доводить начатое дело до конца, несмотря на возникающие препятствия?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Умеете ли вы настоять на принятом решении или вас можно легко переубедить?",
        type: "binary",
        answer: "",
      },
      {
        question: "Любите ли вы брать на себя ответственность, руководить?",
        type: "open",
      },
      {
        question: "Пользуетесь ли вы уважением и доверием своих товарищей?",
        type: "multiple",
        options: ["да", "нет", "не уверен"],
      },
      { question: "Вы здоровы?", type: "binary", answer: "" },
      {
        question:
          "Готовы ли вы трудиться от зари до зари, не получая немедленной отдачи?",
        type: "binary",
        answer: "",
      },
      {
        question: "Любите ли вы общаться и работать с людьми?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Умеете ли вы убеждать других в правильности избранного пути?",
        type: "binary",
        answer: "",
      },
      {
        question: "Понятны ли вам идеи и мысли других?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Есть ли у вас опыт работы в той области, в которой вы хотите начать собственное дело?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Знакомы ли вы с действующими правилами налогообложения, калькуляции заработной платы, ведения бухгалтерского учёта?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Будет ли в вашем городе или области спрос на товар или услугу, которые вы собираетесь предложить?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Есть ли у вас начальная подготовка в области маркетинга и финансов?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Хорошо ли идут дела в вашем городе (области) у других предпринимателей вашего профиля?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Есть ли у вас на примете помещение, которое можно арендовать?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Располагаете ли вы достаточными финансовыми средствами, чтобы поддержать своё предприятие в течение первого года его существования?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Есть ли у вас возможность привлечь к финансированию создаваемого вами предприятия родных и знакомых?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Есть ли у вас на примете поставщики необходимых вам материалов?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Есть ли у вас на примете толковые специалисты, обладающие опытом и знаниями, которых вам не хватает?",
        type: "binary",
        answer: "",
      },
      {
        question:
          "Уверены ли вы в том, что иметь собственное дело - это главная ваша мечта?",
        type: "binary",
        answer: "",
      },
    ],
    color: "bg-[#FED7AA]",
  },
  // Additional blocks can be added similarly
};

export default function TestPage({ params }: { params: { id: string } }) {
  const block = mockData[params.id];

  if (!block) {
    notFound();
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const currentQuestion = block.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setUserAnswers([...userAnswers, currentAnswer]);
    setCurrentAnswer("");
    if (currentQuestionIndex < block.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(userAnswers[currentQuestionIndex - 1] || "");
      setUserAnswers(userAnswers.slice(0, currentQuestionIndex - 1));
    }
  };

  return (
    <div
      className={`${block.color} min-h-screen w-full flex flex-col items-center justify-start text-white p-6 md:p-12 lg:p-24 text-center gap-6 md:gap-8 lg:gap-12`}
    >
      <p className="text-xl md:text-2xl text-white">{block.title}</p>
      {currentQuestionIndex === 0 && (
        <h1 className="text-3xl md:text-5xl tracking-tight font-bold">
          {block.description}
        </h1>
      )}

      <div className="bg-white/10 p-4 md:p-6 lg:p-8 rounded-lg shadow-xl border border-black/15 w-full md:w-3/4 lg:w-2/3 text-left">
        <p className="text-xl md:text-2xl lg:text-3xl">
          {currentQuestion.question}
        </p>
        {currentQuestion.type === "binary" && (
          <div className="mt-4 flex flex-col gap-4 items-center">
            <Button
              className={`w-full md:w-1/2 text-xl ${
                currentAnswer === "да" ? "bg-green-700" : "bg-green-500"
              } duration-300`}
              variant={"ghost"}
              onClick={() => setCurrentAnswer("да")}
            >
              Да
            </Button>
            <Button
              className={`w-full md:w-1/2 text-xl ${
                currentAnswer === "нет" ? "bg-red-700" : "bg-red-500"
              } duration-300`}
              variant={"ghost"}
              onClick={() => setCurrentAnswer("нет")}
            >
              Нет
            </Button>
          </div>
        )}
        {currentQuestion.type === "open" && (
          <textarea
            className="mt-4 w-full p-2 md:p-4 lg:p-6 rounded-md text-black"
            placeholder="Введите ваш ответ"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
        )}
        {currentQuestion.type === "multiple" && (
          <div className="mt-4 flex flex-col items-center gap-4">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                className={`w-1/2 text-xl ${
                  currentAnswer === option ? "bg-blue-700" : "bg-blue-500"
                } duration-300`}
                variant={"ghost"}
                onClick={() => setCurrentAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between w-full px-4 md:px-24 mt-8">
        <Button
          className="bg-black/35 shadow-md w-24 md:w-48 text-xl md:text-2xl hover:text-black/15 hover:shadow-xl duration-300 hover:border-2 hovere:border-black/25"
          variant={"ghost"}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Назад
        </Button>
        <Button
          className="bg-black/35 shadow-md w-24 md:w-48 text-xl md:text-2xl hover:text-black/55 hover:shadow-xl duration-300 hover:border-2 hovere:border-black/25"
          variant={"ghost"}
          onClick={handleNextQuestion}
          disabled={!currentAnswer}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
