"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 bg-blue-500">
      <h1 className="text-2xl font-bold text-white">TYPL</h1>
      <div>
        {isLoggedIn ? (
          <>
            <button
              onClick={handleProfile}
              className="px-4 py-2 mr-2 text-white bg-blue-700 rounded hover:bg-blue-900"
            >
              Account
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
