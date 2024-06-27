"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

interface User {
  _id: string;
  secondName: string;
  name: string;
  surname: string;
  studyGroup: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Не удалось загрузить пользователей:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto pt-4">
      <h1 className="mb-4 text-2xl font-bold">Пользователи</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell>Учебная группа</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.secondName}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.studyGroup}</TableCell>
              <TableCell>
                <Link
                  href={`test-results/${user._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Просмотр результатов
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
