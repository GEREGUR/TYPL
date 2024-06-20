import Link from "next/link";

const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <nav>
        <Link className="px-4 py-2 hover:underline" href="/profile">
          Profile
        </Link>
        <Link className="px-4 py-2 hover:underline" href="/logout">
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
