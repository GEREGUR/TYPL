"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const AdminHeader = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/admin/auth/sign-in");
    console.log("Logout clicked");
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-2xl font-bold">Панель Администратора</h1>
      <nav>
        <button className="px-4 py-2 hover:underline" onClick={handleSignOut}>
          Выйти
        </button>
      </nav>
    </header>
  );
};

export default AdminHeader;
