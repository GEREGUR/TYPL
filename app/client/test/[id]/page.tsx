"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

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
  title: string;
  description: string;
  questions: Question[];
}

export default function TestPage({ params }: { params: { id: string } }) {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Загрузка...
      </div>
    );
  }

  if (!test) {
    return notFound();
  }

  return (
    <div
      className={`${test} flex min-h-screen w-full flex-col items-center justify-start gap-12 p-48 text-center text-white`}
    >
      <p className="text-2xl text-white">{test.description}</p>
      <h1 className="text-5xl font-bold tracking-tight">{test.title}</h1>
      <Button
        className="hovere:border-black/25 w-48 bg-black/15 text-2xl shadow-md duration-300 hover:border-2 hover:text-black/15 hover:shadow-xl"
        variant={"ghost"}
        onClick={() => router.push(`${params.id}/inProgress`)}
      >
        Пройти
      </Button>
      {/* <p className="pb-24 text-2xl font-semibold">
        Пройдите тест и узнайте, насколько хорошо вы организованы в быту, умеете
        управлять финансами и ресурсами, а также заботиться о своем окружении.
        Этот тест поможет вам оценить вашу способность эффективно управлять
        своими делами и ресурсами, а также выявить области, в которых вы можете
        улучшить свои навыки хозяйственности.
      </p> */}
    </div>
  );
}
