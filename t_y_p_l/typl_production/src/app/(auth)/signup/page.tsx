"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Sign Up</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Surname
          </label>
          <input
            name="surname"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Name</label>
          <input
            name="name"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Second Name
          </label>
          <input
            name="secondName"
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Study Group
          </label>
          <input
            name="studyGroup"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">Login</label>
          <input
            name="login"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
