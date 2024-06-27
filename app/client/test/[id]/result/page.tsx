import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center text-4xl">
      Тест завершен!
    </div>
  );
};

export default page;
