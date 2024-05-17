"use client";

import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

interface User {
  name: string;
  secondName: string;
  surname?: string;
  studyGroup: number;
  login: string;
}

interface Test {
  testID: number;
  status: "Пройденные" | "В процессе";
  name: string;
  blockID: number;
}

export interface Block {
  blockID: number;
  blockName: string;
  blockDescription?: string;
  bgColor?: string;
}

const ExtraBlock = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="bg-[#FAFAFA] p-4 rounded-md shadow-md w-2/3">
      <h2 className="font-bold mb-4 text-start">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
};

const Profile = () => {
  const [selected, setSelected] = useState<"Пройденные" | "В процессе">(
    "Пройденные"
  );

  let user: User = {
    name: "Егор",
    secondName: "Рубайло",
    surname: "Васильевич",
    studyGroup: 11,
    login: "geregur",
  };

  const mockTests: Test[] = [
    { testID: 1, status: "Пройденные", name: "Test 1", blockID: 101 },
    { testID: 2, status: "В процессе", name: "Test 2", blockID: 102 },
    { testID: 3, status: "Пройденные", name: "Test 3", blockID: 103 },
    { testID: 4, status: "В процессе", name: "Test 4", blockID: 104 },
    { testID: 5, status: "Пройденные", name: "Test 5", blockID: 105 },
  ];

  const blocks: Block[] = [
    { blockID: 101, blockName: "Block 1" },
    { blockID: 102, blockName: "Block 2" },
    { blockID: 103, blockName: "Block 3" },
    { blockID: 104, blockName: "Block 4" },
    { blockID: 105, blockName: "Block 5" },
  ];

  const filteredTests = mockTests.filter((test) => test.status === selected);

  const testsByBlocks = blocks
    .map((block) => ({
      block,
      tests: filteredTests.filter((test) => test.blockID === block.blockID),
    }))
    .filter(({ tests }) => tests.length > 0); // Filter out blocks with no tests

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-12 p-4">
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
      <div className="text-center w-full">
        <p className="font-bold text-xl p-4">Тесты</p>
        <ul className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <li>
            <Button
              variant={"ghost"}
              onClick={() => setSelected("Пройденные")}
              className={` ${
                selected === "Пройденные" ? "bg-[#FAFAFA]" : "bg-[#ECECEC]"
              } w-36`}
            >
              <p>Пройденные</p>
            </Button>
          </li>
          <li>
            <Button
              variant={"ghost"}
              onClick={() => setSelected("В процессе")}
              className={` ${
                selected === "В процессе" ? "bg-[#FAFAFA]" : "bg-[#ECECEC]"
              } w-36`}
            >
              <p>В процессе</p>
            </Button>
          </li>
        </ul>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {testsByBlocks.map(({ block, tests }) => (
            <ExtraBlock key={block.blockID} title={block.blockName}>
              {tests.map((test) => (
                <div key={test.testID} className="p-2 bg-white shadow rounded">
                  {test.name}
                </div>
              ))}
            </ExtraBlock>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
