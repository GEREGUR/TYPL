"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const session = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // console.log(session);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).closest(".dropdown") === null &&
        (event.target as HTMLElement).closest(".dropdown-button") === null
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    router.push("/client/profile");
    console.log("Profile clicked");
    setDropdownOpen(false);
  };

  const handleLogoutClick = async () => {
    await signOut({ redirect: false });
    router.push("/client/auth/sign-in");
    setDropdownOpen(false);
    console.log("Logout clicked");
  };

  console.log(pathname);

  return (
    <nav className="h-18 relative flex w-full items-center justify-between bg-white px-4 text-xl font-bold text-[#606060] shadow-md md:h-16">
      {!pathname.includes("/auth") ? (
        <button onClick={() => router.back()} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      ) : (
        <div></div>
      )}
      <Link href="/">
        <span className="text-2xl">TYPL: Test your psychological level</span>
      </Link>
      {session.status === "authenticated" ? (
        <div className="dropdown-button relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="dropdown absolute right-0 z-10 mt-2 mt-4 w-48 rounded-md bg-gray-100 font-normal shadow-lg">
              <button
                onClick={handleProfileClick}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
              >
                Профиль
              </button>
              <button
                onClick={handleLogoutClick}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
};
