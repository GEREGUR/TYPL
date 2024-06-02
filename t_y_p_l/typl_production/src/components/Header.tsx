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

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <header className="bg-base-100 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <a className="text-3xl font-extrabold text-black">TYPL</a>
        </div>
        <div className="flex-none">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfile}
                className="mx-2 border-none text-black transition duration-300 ease-in-out hover:bg-gray-200"
              >
                Account
              </button>
              <button
                onClick={handleSignOut}
                className="mx-2 border-none text-black transition duration-300 ease-in-out hover:bg-gray-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="mx-2 border-none text-black transition duration-300 ease-in-out hover:bg-gray-200"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="mx-2 border-none text-black transition duration-300 ease-in-out hover:bg-gray-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
