import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Courses", path: "/admin/courses" },
  ];

  return (
    <div className={`bg-gray-800 text-white h-full p-4 ${isOpen ? "w-64" : "w-16"} transition-width duration-300`}>
      <h2 className="text-xl font-bold mb-6">{isOpen ? "Admin" : "A"}</h2>
      <nav>
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-2 px-2 rounded hover:bg-gray-700 ${
              location.pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
