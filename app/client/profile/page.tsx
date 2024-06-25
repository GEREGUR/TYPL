"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
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
  bgImage?: string;
}

const ExtraBlock = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="w-2/3 rounded-md bg-[#FAFAFA] p-4 shadow-md">
      <h2 className="mb-4 text-start font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
};

const Profile = () => {
  const [selected, setSelected] = useState<"Пройденные" | "В процессе">(
    "Пройденные",
  );

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

  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div>Loading...</div>;
  }

  const user = session.user;

  console.log(session);

  console.log(user);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <ul className="flex flex-col gap-5 text-center text-xl font-bold">
        <li className="flex flex-col">
          <span className="text-[#5595F5]">Имя пользователя: </span>
          {user.secondName} {user.name} {user.surname}
        </li>
        <li className="flex flex-col">
          <span className="text-[#5595F5]">Учебная группа: </span>
          {user.studyGroup}
        </li>
      </ul>
      <div className="w-full text-center">
        <p className="p-4 text-xl font-bold text-[#5595F5]">Тесты</p>
        <ul className="mb-8 flex flex-wrap items-center justify-center gap-4">
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
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {testsByBlocks.map(({ block, tests }) => (
            <ExtraBlock key={block.blockID} title={block.blockName}>
              {tests.map((test) => (
                <div key={test.testID} className="rounded bg-white p-2 shadow">
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
