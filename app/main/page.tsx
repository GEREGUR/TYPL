import Image from "next/image";
import { Block } from "../profile/page";
import Link from "next/link";

const blocks: Block[] = [
  {
    blockID: 101,
    blockName: "Block 1",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-orange-200",
    bgImage: "/public/блок1.png",
  },
  {
    blockID: 102,
    blockName: "Block 2",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-rose-200",
    bgImage: "/public/блок2.png",
  },
  {
    blockID: 103,
    blockName: "Block 3",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-blue-200",
    bgImage: "/public/блок3.png",
  },
  {
    blockID: 104,
    blockName: "Block 4",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-green-200",
    bgImage: "/public/блок4.png",
  },
];

const HeroSection: React.FC = () => {
  return (
    <div className="container flex items-center justify-center md:mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {blocks.map((block) => (
          <Link href={`/test/${block.blockID}`}>
            <div
              key={block.blockID}
              className={`${block.bgColor} shadow-lg rounded-lg p-4 text-white flex flex-col justify-between w-full h-64 relative`}
            >
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-bold mt-2">{block.blockName}</h2>
                <p>{block.blockDescription}</p>
              </div>
              {block.bgImage && (
                <div className="absolute bottom-4 right-4">
                  <Image
                    src={block.bgImage}
                    alt={block.blockName}
                    width={100}
                    height={100}
                    className="rounded-lg"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
