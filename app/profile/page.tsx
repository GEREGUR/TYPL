"use client";

import { signOut, signIn, useSession } from "next-auth/react";

interface User {
  name: string;
  secondName: string;
  surname?: string;
  studyGroup: number;
  login: string;
}

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    // If the user is not authenticated, redirect them to the sign-in page
    signIn();
    return <div>Redirecting...</div>;
  }

  let user: User = {
    name: "Егор",
    secondName: "Рубайло",
    surname: "Васильевич",
    studyGroup: 11,
    login: "geregur",
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ul className="flex flex-col text-center font-bold gap-5 text-xl">
        <li className="flex flex-col">
          <span className="text-[#5595F5]">Имя пользователя: </span>
          {user.secondName} {user.name} {user.surname}
        </li>
        <li className="flex flex-col">
          <span className="text-[#5595F5]">Учебная группа: </span>
          {user.studyGroup}
        </li>
      </ul>
      <button onClick={() => signOut()} className="size-10">
        Выйти
      </button>
      <div></div>
    </div>
  );
};

export default Profile;
