"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-200">
      <div className="bg-white p-10 rounded-lg shadow-xl w-96">
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
          // onClick={handleSignIn}
          className="w-full p-3 text-md my-4 bg-indigo-600 hover:bg-red-500 rounded text-white duration-200"
        >
          Войти
        </button>
        <Button
          variant={"ghost"}
          onClick={() => {
            router.push("/auth/sign-up");
          }}
          className="my-2 duration-300 hover:bg-indigo-600 text-indigo-600 hover:text-white"
        >
          Регистрация
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
