"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        login,
        password,
        redirect: false,
      });

      router.push("/");
    } catch (error) {
      alert: "Неверные данные";
      return;
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-200">
      <form
        className="bg-white p-10 rounded-lg shadow-xl w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[#606060] font-bold text-center text-4xl mb-10">
          Авторизация
        </h1>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full p-3 mb-4 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <button
          type="submit"
          className="w-full p-3 text-md my-4 bg-indigo-600 hover:bg-red-500 rounded text-white duration-200"
        >
          Войти
        </button>
        <Button
          variant={"ghost"}
          onClick={() => {
            router.push("/auth/sign-up");
          }}
          className="duration-300 hover:bg-indigo-600 text-indigo-600 hover:text-white"
        >
          Регистрация
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
