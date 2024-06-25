"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Test {
  _id: string;
  title: string;
  description: string;
  questions: {
    questionType: string;
    questionText: string;
    options?: string[];
    correctAnswer?: string;
    correctAnswerText?: string;
  }[];
}

const AdminTestsPage = () => {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("/api/admin/tests");
        setTests(response.data);
      } catch (error) {
        console.error("Не удалось получить список тестов:", error);
      }
    };

    fetchTests();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/admin/tests/${id}`);
      setTests(tests.filter((test) => test._id !== id));
    } catch (error) {
      console.error("Не удалось удалить тест:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Управление тестами</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test._id}>
              <TableCell>{test.title}</TableCell>
              <TableCell>{test.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(test._id)}
                  variant="outline"
                  className="text-red-500"
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTestsPage;
