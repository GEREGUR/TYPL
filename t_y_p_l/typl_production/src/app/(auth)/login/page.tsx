"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/login", { login, password });
      const token = response.data.token;
      console.log("Token received from API:", token); // Debug log

      localStorage.setItem("token", token);
      router.push("/profile");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="bg-base-100 flex min-h-screen flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-zinc-900">Login</CardTitle>
          <CardDescription className="text-zinc-600">
            Enter your login below to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="login" className="text-zinc-500">
                Login
              </Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="bg-zinc-100 text-zinc-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-zinc-500">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-100 text-zinc-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-transparent text-zinc-500 hover:text-blue-500"
              variant="outline"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-zinc-500 underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
