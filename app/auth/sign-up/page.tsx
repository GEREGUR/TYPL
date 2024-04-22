"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

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
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-200">
      <div className="bg-white p-4 rounded-lg flex flex-col gap-3 shadow-xl w-96 mt-4">
        <h1 className="text-[#606060] font-bold text-center text-2xl">
          Регистрация
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-2 bg-indigo-600 hover:bg-red-500 rounded text-white duration-200"
        >
          Зарегистрироваться
        </button>
        <Button
          variant={"ghost"}
          onClick={() => {
            router.push("/auth/sign-in");
          }}
          className="my-2 duration-300 hover:bg-indigo-600 text-indigo-600 hover:text-white"
        >
          Авторизация
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
