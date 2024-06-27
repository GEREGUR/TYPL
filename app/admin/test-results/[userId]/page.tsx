"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

interface Answer {
  questionId: string;
  answer: string;
  score: number;
}

interface TestResult {
  _id: string;
  userId: string;
  testId: string;
  answers: Answer[];
  createdAt: string;
}

interface Test {
  _id: string;
  title: string;
  description: string;
  questions: string[]; // Assuming questions are string IDs or titles
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const TestResultsPage = () => {
  const { userId } = useParams();
  const [resultsByTestId, setResultsByTestId] = useState<{
    [key: string]: TestResult[];
  }>({});
  const [tests, setTests] = useState<{ [key: string]: Test }>({});

  useEffect(() => {
    if (!userId) return;

    const fetchResultsAndTests = async () => {
      try {
        // Fetch results
        const resultsResponse = await axios.get(`/api/test-results/${userId}`);
        const fetchedResults = resultsResponse.data.results;

        // Group results by testId
        const groupedResults: { [key: string]: TestResult[] } = {};
        fetchedResults.forEach((result: TestResult) => {
          if (!groupedResults[result.testId]) {
            groupedResults[result.testId] = [];
          }
          groupedResults[result.testId].push(result);
        });

        setResultsByTestId(groupedResults);

        // Fetch tests to get titles
        const testIds = Object.keys(groupedResults);
        const testsResponse = await Promise.all(
          testIds.map((testId) => axios.get(`/api/tests/${testId}`)),
        );
        const fetchedTests = testsResponse.reduce(
          (acc, response) => {
            const test = response.data.test;
            acc[test._id] = test;
            return acc;
          },
          {} as { [key: string]: Test },
        );

        setTests(fetchedTests);
      } catch (error) {
        console.error("Failed to fetch test results and tests:", error);
      }
    };

    fetchResultsAndTests();
  }, [userId]);

  const calculateSum = (answers: any[]) => {
    return answers.reduce((sum, answer) => sum + answer.score, 0);
  };

  return (
    <div className="container mx-auto pt-4">
      <h1 className="mb-4 text-2xl font-bold">Результаты тестов</h1>
      {Object.keys(resultsByTestId).map((testId) => (
        <div key={testId}>
          {tests[testId] && (
            <h2 className="text-xl font-bold">
              Тест: &quot;{tests[testId].title}&quot;
            </h2>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>ID Вопроса</TableCell>
                <TableCell>Ответ</TableCell>
                <TableCell>Очки</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultsByTestId[testId].map((result) =>
                result.answers.map((answer) => (
                  <TableRow key={answer.questionId}>
                    <TableCell>{answer.questionId}</TableCell>
                    <TableCell>{answer.answer}</TableCell>
                    <TableCell>{answer.score}</TableCell>
                  </TableRow>
                )),
              )}
              <TableRow>
                <TableCell>
                  Итого:&nbsp;
                  <strong>
                    {calculateSum(resultsByTestId[testId][0].answers)}
                  </strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default TestResultsPage;
