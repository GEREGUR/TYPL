interface Block {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

const blocks: Block[] = [
  {
    id: 1,
    title: "Block 1",
    description: "Description of Block 1",
    imageUrl: "/images/block1.jpg",
  },
  {
    id: 2,
    title: "Block 2",
    description: "Description of Block 2",
    imageUrl: "/images/block2.jpg",
  },
  {
    id: 3,
    title: "Block 3",
    description: "Description of Block 3",
    imageUrl: "/images/block3.jpg",
  },
  {
    id: 4,
    title: "Block 4",
    description: "Description of Block 4",
    imageUrl: "/images/block4.jpg",
  },
];

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
      {blocks.map((block) => (
        <div
          key={block.id}
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
        >
          {block.imageUrl && (
            <img
              src={block.imageUrl}
              alt={block.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          )}
          <h2 className="text-xl font-bold mt-2">{block.title}</h2>
          <p className="text-gray-600">{block.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
