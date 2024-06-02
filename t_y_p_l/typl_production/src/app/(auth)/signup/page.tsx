"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [form, setForm] = useState({
    surname: "",
    name: "",
    secondName: "",
    studyGroup: "",
    login: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("/api/auth", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/profile");
      }
    } catch (error: unknown) {
      console.error("Sign up failed:", error);
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("Sign up failed, please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-base-100 flex min-h-screen flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-zinc-900">Регистрация</CardTitle>
          <CardDescription className="text-zinc-600">
            Предоставьте информацию для регистрации
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="surname" className="text-zinc-500">
                Фамилия
              </Label>
              <Input
                id="surname"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                className="bg-zinc-100 text-zinc-800 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-500">
                Имя
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-zinc-100 text-zinc-800 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondName" className="text-zinc-500">
                Отчество
              </Label>
              <Input
                id="secondName"
                name="secondName"
                value={form.secondName}
                onChange={handleChange}
                className="bg-zinc-100 text-zinc-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studyGroup" className="text-zinc-500">
                Учебная группа
              </Label>
              <Input
                id="studyGroup"
                name="studyGroup"
                value={form.studyGroup}
                onChange={handleChange}
                className="bg-zinc-100 text-zinc-800 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login" className="text-zinc-500">
                Логин
              </Label>
              <Input
                id="login"
                name="login"
                value={form.login}
                onChange={handleChange}
                className="bg-zinc-100 text-zinc-800 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-zinc-500">
                Пароль
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="bg-zinc-100 text-zinc-800 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full text-zinc-500 hover:text-blue-500"
              variant="outline"
            >
              Регистрация
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-zinc-500">
            Уже зарегестрированы?{" "}
            <Link href="/login" className="text-zinc-500 underline">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
