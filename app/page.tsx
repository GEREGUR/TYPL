"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center gap-6">
      <button
        onClick={() => {
          router.push("/profile");
        }}
      >
        <span>Профиль</span>
      </button>
      <ul className="flex gap-4">
        <li>
          <button
            className="border-2 border-slate-200 shadow-md px-2 py-1 text-center rounded-md"
            onClick={() => {
              router.push("/auth/sign-in");
            }}
          >
            <span>Войти</span>
          </button>
        </li>
        <li>
          <button
            className="border-2 border-slate-200 shadow-md px-2 py-1 text-center rounded-md"
            onClick={() => {
              router.push("/auth/sign-up");
            }}
          >
            <span>Регистрация</span>
          </button>
        </li>
      </ul>
    </main>
  );
}
