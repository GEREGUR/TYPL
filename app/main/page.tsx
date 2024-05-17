import { Block } from "../profile/page";
const blocks: Block[] = [
  {
    blockID: 101,
    blockName: "Block 1",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-red-200",
  },
  {
    blockID: 102,
    blockName: "Block 2",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-blue-200",
  },
  {
    blockID: 103,
    blockName: "Block 3",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-green-200",
  },
  {
    blockID: 104,
    blockName: "Block 4",
    blockDescription: "Lorem ipsum ada love react with all my heart",
    bgColor: "bg-yellow-200",
  },
];

const HeroSection: React.FC = () => {
  return (
    <div className="container flex items-center justify-center md:mt-24">
      <div className="grid grid-cols-1 align-middle md:grid-cols-2 gap-4 p-4">
        {blocks.map((block) => (
          <div
            key={block.blockID}
            className={`${block.bgColor} shadow-lg rounded-lg p-4 flex flex-col items-center w-full h-64`}
          >
            <h2 className="text-xl font-bold mt-2">{block.blockName}</h2>
            <p className="text-gray-700 text-center">
              {block.blockDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
