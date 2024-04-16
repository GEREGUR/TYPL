const Main = () => {
  return (
    <main className="flex flex-col h-full w-full justify-between items-center pt-20">
      <h2 className="text-xl sm:text-2xl text-center font-bold p-4 text-[#606060]">
        Выберите блок тестирования
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 p-4 w-full h-full">
        <li className="w-full h-full rounded-lg bg-[#FFD370]"></li>
        <li className="w-full h-full rounded-lg bg-[#FFBBD4]"></li>
        <li className="w-full h-full rounded-lg bg-[#C6E3F1]"></li>
        <li className="w-full h-full rounded-lg bg-[#93DFAC]"></li>
      </ul>
    </main>
  );
};

export default Main;
