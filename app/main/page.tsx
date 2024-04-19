const Main = () => {
  return (
    <main className="flex flex-col h-full w-full justify-between items-center py-6 pt-20">
      <h2 className="text-xl sm:text-2xl text-center font-bold p-4 text-[#606060]">
        Выберите блок тестирования
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 p-4 text-lg w-full h-full text-white">
        <li className="w-full h-full rounded-lg bg-[#FFD370] p-4">
          <h3>Название блока</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicinguri nostrum
            consequuntur necessitatibus?
          </span>
        </li>
        <li className="w-full h-full rounded-lg bg-[#FFBBD4] p-4">
          <h3>Название блока</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicinguri nostrum
            consequuntur necessitatibus?
          </span>
        </li>
        <li className="w-full h-full rounded-lg bg-[#C6E3F1] p-4">
          <h3>Название блока</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicinguri nostrum
            consequuntur necessitatibus?
          </span>
        </li>
        <li className="w-full h-full rounded-lg bg-[#93DFAC] p-4">
          <h3>Название блока</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicinguri nostrum
            consequuntur necessitatibus?
          </span>
        </li>
      </ul>
    </main>
  );
};

export default Main;
