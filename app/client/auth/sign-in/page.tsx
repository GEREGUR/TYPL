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

      router.push("/client/profile");
    } catch (error) {
      alert: "Неверные данные";
      return;
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-200">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96 flex flex-col">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[#606060] font-bold text-center text-4xl mb-10">
            Авторизация
          </h1>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-3 mb-4 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full p-3 text-md my-4 bg-[#FE7777] hover:bg-[#399ED8] rounded text-white duration-300"
          >
            Войти
          </button>
        </form>
        <Button
          variant={"ghost"}
          onClick={() => {
            router.push("/client/auth/sign-up");
          }}
          className="duration-300 text-[#399ED8] self-center hover:bg-transparent hover:underline hover:text-[#FE7777]"
        >
          Регистрация
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
