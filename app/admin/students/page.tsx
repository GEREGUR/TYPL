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

interface User {
  _id: string;
  secondName: string;
  name: string;
  surname: string;
  studyGroup: string;
  login: string;
  role: string;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = async (id: string, data: Partial<User>) => {
    try {
      const response = await axios.put(`/api/admin/users/${id}`, data);
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Manage Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Логин</TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell>Учебная группа</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.login}</TableCell>
              <TableCell>{user.secondName}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
              <TableCell>{user.studyGroup}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleUpdate(user._id, { role: "admin" })}
                  variant="outline"
                  className="mr-2"
                >
                  Make Admin
                </Button>
                <Button
                  onClick={() => handleDelete(user._id)}
                  variant="outline"
                  className="text-red-500"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUsersPage;
