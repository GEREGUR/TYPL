"use client";

import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  answer: string;
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
      { question: "Is this a test question?", answer: "да" && "нет" },
    ],
    color: "bg-[#FED7AA]",
  },
  102: {
    name: "Block 2",
    title: "Формирование культурно-бытовых ценностей",
    description: "Организованный ли вы человек?",
    questions: [{ question: "Is this a test question?", answer: "нет" }],
    color: "bg-[#FECDD3]",
  },
  103: {
    name: "Block 3",
    title: "Формирование культурно-бытовых ценностей",
    description: "Организованный ли вы человек?",
    questions: [{ question: "Is this a test question?", answer: "да" }],
    color: "bg-[#BFDBFE]",
  },
  104: {
    name: "Block 4",
    title: "Формирование культурно-бытовых ценностей",
    description: "Организованный ли вы человек?",
    questions: [{ question: "Is this a test question?", answer: "нет" }],
    color: "bg-[#BBF7D0]",
  },
};

// export async function generateStaticParams() {
//   return Object.keys(mockData).map((id) => ({ id }));
// }

export default function TestPage({ params }: { params: { id: string } }) {
  const block = mockData[params.id];
  const router = useRouter();

  if (!block) {
    notFound();
  }

  const handleStartTest = () => {
    router.push(`${params.id}/inProgress`);
  };

  return (
    <div
      className={`${block.color} min-h-screen w-full flex flex-col items-center justify-start text-white p-48 text-center gap-12`}
    >
      <p className="text-2xl text-white">{block.title}</p>
      <h1 className="text-5xl tracking-tight font-bold">{block.description}</h1>
      <Button
        className="bg-black/15 shadow-md w-48 text-2xl hover:text-black/15 hover:shadow-xl duration-300 hover:border-2 hovere:border-black/25"
        variant={"ghost"}
        onClick={handleStartTest}
      >
        Пройти
      </Button>
      <p className="pb-24 font-semibold text-2xl">
        Пройдите тест и узнайте, насколько хорошо вы организованы в быту, умеете
        управлять финансами и ресурсами, а также заботиться о своем окружении.
        Этот тест поможет вам оценить вашу способность эффективно управлять
        своими делами и ресурсами, а также выявить области, в которых вы можете
        улучшить свои навыки хозяйственности.
      </p>
    </div>
  );
}
