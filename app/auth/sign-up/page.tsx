"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [surname, setSurname] = useState("");
  const [studyGroup, setStudyGroup] = useState(1);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!secondName || !name || !studyGroup || !login || !password) {
      alert("Заполните обязательные поля");
      return;
    }
    try {
      const resUserExists = await fetch("/api/userExists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        alert("Пользователь с таким логином уже зарегистрирован");
        return;
      }

      const res = await fetch("/api/register/", {
        method: "POST",
        body: JSON.stringify({
          secondName,
          name,
          surname,
          studyGroup,
          login,
          password,
        }),
      });
      if (res.ok) {
        formRef.current?.reset();
        console.log("Registration completed");
        router.push("/auth/sign-in");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-200">
      <form
        className="bg-white p-4 rounded-lg flex flex-col gap-3 shadow-xl w-96 mt-4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h1 className="text-[#606060] font-bold text-center text-2xl">
          Регистрация
        </h1>
        <input
          type="text"
          placeholder="Фамилия"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] focus:placeholder-opacity-0 rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] focus:placeholder-opacity-0 rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Отчество"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] focus:placeholder-opacity-0 rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="number"
          placeholder="Учебная группа"
          value={studyGroup}
          onChange={(e) => setStudyGroup(e.target.valueAsNumber)}
          className="w-full p-2 bg-[#EAEAEA] focus:placeholder-opacity-0 rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] focus:placeholder-opacity-0 rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#EAEAEA] focus:placeholder-opacity-0 rounded outline-none text-slate-700 placeholder-gray-500"
        />
        <button
          // onClick={handleSignUp}
          type="submit"
          className="w-full p-2 bg-indigo-600 hover:bg-red-500 rounded text-white duration-200"
        >
          Зарегистрироваться
        </button>
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => {
            router.push("/auth/sign-in");
          }}
          className=" duration-300 hover:bg-indigo-600 text-indigo-600 hover:text-white"
        >
          Авторизация
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
