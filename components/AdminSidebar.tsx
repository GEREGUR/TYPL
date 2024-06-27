import Link from "next/link";

const AdminSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4"></div>
      <nav className="mt-8">
        <ul>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/students"
            >
              Пользователи
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/tests"
            >
              Редактор тестов
            </Link>
          </li>
          {/* <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/groups"
            >
              Группы
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/tech-map"
            >
              Техч. карта
            </Link>
          </li> */}
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/test-list"
            >
              Список тестов
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
