"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  console.log({ user });

  if (!user && !userSession) {
    router.push("/auth/sign-up");
  }
  return (
    <section className="w-[100vh] h-screen bg-slate-200 flex items-center justify-center">
      <button onClick={() => signOut(auth)}>Выйти</button>
    </section>
  );
}
