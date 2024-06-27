"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Option = {
  text: string;
  score: number;
};

type Question = {
  question: string;
  type: "multiple_choice" | "open";
  options: Option[];
};

type Block = {
  id: string;
  title: string;
  description: string;
};

const CreateTest = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        type: "multiple_choice",
        options: [{ text: "", score: 0 }],
      },
    ]);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tests", {
        title,
        description,
        questions,
      });
      router.push("tests"); // Redirect to the list of tests or another appropriate page
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <div className="container mx-auto pt-4">
      <h1 className="mb-4 text-2xl font-bold">Создание Теста</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Название
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Введите название теста"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Введите описание теста"
          />
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold">Вопросы</h2>
          {questions.map((question, index) => (
            <div
              key={index}
              className="mb-4 space-y-2 rounded-md border border-gray-200"
            >
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Текст вопроса"
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].question = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(index)}
                  className="text-red-500"
                >
                  Удалить
                </button>
              </div>
              <select
                value={question.type}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].type = e.target.value as
                    | "multiple_choice"
                    | "open";
                  setQuestions(newQuestions);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="multiple_choice">Выбор вариантов</option>
                <option value="open">Открытый ответ</option>
              </select>
              {question.type === "multiple_choice" && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Варианты ответов
                  </h3>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="mb-2 flex space-x-2">
                      <input
                        type="text"
                        placeholder="Текст варианта"
                        value={option.text}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].options[optIndex].text =
                            e.target.value;
                          setQuestions(newQuestions);
                        }}
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Очки"
                        value={option.score}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].options[optIndex].score =
                            parseFloat(e.target.value);
                          setQuestions(newQuestions);
                        }}
                        className="block w-24 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newQuestions = [...questions];
                      newQuestions[index].options.push({ text: "", score: 0 });
                      setQuestions(newQuestions);
                    }}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white"
                  >
                    Добавить вариант
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="rounded-md bg-green-500 px-4 py-2 text-white"
          >
            Добавить вопрос
          </button>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold">Блоки</h2>
          {blocks.map((block, index) => (
            <div
              key={index}
              className="mb-4 space-y-2 rounded-md border border-gray-200"
            >
              <input
                type="text"
                placeholder="Заголовок блока"
                value={block.title}
                onChange={(e) => {
                  const newBlocks = [...blocks];
                  newBlocks[index].title = e.target.value;
                  setBlocks(newBlocks);
                }}
                className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <textarea
                placeholder="Описание блока"
                value={block.description}
                onChange={(e) => {
                  const newBlocks = [...blocks];
                  newBlocks[index].description = e.target.value;
                  setBlocks(newBlocks);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-4 py-2 text-white"
        >
          Создать Тест
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
