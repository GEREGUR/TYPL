import Link from "next/link";

const AdminSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4"></div>
      <nav className="mt-8">
        <ul>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/students"
            >
              Учащиеся
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-700"
              href="/admin/test-editor"
            >
              Редактор тестов
            </Link>
          </li>
          <li>
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
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
