"use client";

// components/HeroSection.tsx
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// const blocks = [
//   {
//     id: 101,
//     blockName: "Блок 1",
//     blockDescription: "Формирование мировоззренческих основ личности",
//     bgColor: "bg-orange-200",
//     // bgImage: "/public/блок1.png",
//   },
//   // {
//   //   id: 102,
//   //   blockName: "Block 2",
//   //   blockDescription: "Lorem ipsum ada love react with all my heart",
//   //   bgColor: "bg-rose-200",
//   //   bgImage: "/public/блок2.png",
//   // },
//   // {
//   //   id: 103,
//   //   blockName: "Block 3",
//   //   blockDescription: "Lorem ipsum ada love react with all my heart",
//   //   bgColor: "bg-blue-200",
//   //   bgImage: "/public/блок3.png",
//   // },
//   // {
//   //   id: 104,
//   //   blockName: "Block 4",
//   //   blockDescription: "Lorem ipsum ada love react with all my heart",
//   //   bgColor: "bg-green-200",
//   //   bgImage: "/public/блок4.png",
//   // },
// ];

interface Option {
  text: string;
  score: number;
}

interface Question {
  question: string;
  type: "multiple_choice" | "open";
  options: Option[];
}

interface Test {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

const HeroSection: React.FC = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/tests");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch tests");
      }
    },
  });

  if (isPending) return <div>Loading</div>;
  const tests = data.data;
  console.log(tests);
  return (
    <div className="flex flex-col items-center justify-center text-[#606060] md:mt-24">
      <h2 className="py-4 text-4xl font-bold">Список тестов</h2>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {tests?.map((test: Test) => (
          <Link href={`test/${test._id}`} key={test._id}>
            <div
              className={`relative flex h-fit w-80 flex-col justify-between rounded-lg bg-white p-4 shadow-lg`}
            >
              <div className="text-center">
                <h2 className="mt-2 text-xl">{test.title}</h2>
                {/* <p>{test.description}</p> */}
              </div>
            </div>
          </Link>
        ))}
        {/* {<div>{data}</div>} */}
      </div>
    </div>
  );
};

export default HeroSection;
