interface User {
  name: string;
  secondName: string;
  surname?: string;
  studyGroup: number;
  login: string;
}

const Profile = () => {
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
    </div>
  );
};

export default Profile;
