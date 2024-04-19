"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-96">
        <h1 className="text-[#606060] font-bold text-center text-4xl mb-10">
          Авторизация
        </h1>
        <input
          type="email"
          placeholder="Логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-lg p-3 mb-4 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-lg p-3 mb-4 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full text-lg p-3 my-4 bg-indigo-600 hover:bg-red-500 rounded text-white duration-300"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default SignIn;
