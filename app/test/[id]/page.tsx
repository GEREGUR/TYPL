// app/test/[id]/page.tsx
import { notFound } from "next/navigation";

const mockData = {
  101: {
    name: "Block 1",
    description: "Lorem ipsum ada love react with all my heart",
  },
  102: {
    name: "Block 2",
    description: "Lorem ipsum ada love react with all my heart",
  },
  103: {
    name: "Block 3",
    description: "Lorem ipsum ada love react with all my heart",
  },
  104: {
    name: "Block 4",
    description: "Lorem ipsum ada love react with all my heart",
  },
};

export async function generateStaticParams() {
  return Object.keys(mockData).map((id) => ({ id }));
}

export default function TestPage({ params }: { params: { id: string } }) {
  const block = mockData[params.id];

  if (!block) {
    notFound();
  }

  return (
    <div>
      <h1>{block.name}</h1>
      <p>{block.description}</p>
    </div>
  );
}
