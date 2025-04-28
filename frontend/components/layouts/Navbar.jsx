import React, { useState, useEffect } from "react";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Router from "next/router";

const Navbar = () => {
  // const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // Assuming your useAuth returns logout function

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    Router.push("/"); // Redirect to login page after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between flex-wrap">
      {/* Left */}
      <Link href="/" className="text-xl font-bold text-white bg-blue-600 leading-5 tracking-wide p-1 px-4 rounded-br-3xl rounded-tl-3xl"><div>Healthy</div><div>Habitat</div></Link>

      {/* Center */}
      <div className="flex space-x-4 text-gray-700 text-sm md:text-base">
      </div>

      {/* Right */}
      <div className="relative flex items-center space-x-3 text-sm md:text-base">
        {user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gray-100 px-1 py-1 rounded-3xl shadow cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center uppercase">
                {user.name.charAt(0)}
              </div>
              {/* <span className="text-gray-700">{user.name}</span> */}
              {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 w-max bg-gray-100 rounded shadow-lg px-1 py-2 z-20">
                <div className="px-4 py-2 font-semibold text-gray-700">{user.name}</div>
                <hr className="text-gray-300 mx-2 mb-1"></hr>
                <Link
                  href={`/${user.role}/`}
                  onClick={toggleDropdown}
                  className="block px-4 py-2 hover:bg-gray-200 hover:rounded-2xl text-gray-700"
                >
                  {user.role === "admin" ? "Admin Pannel" : user.role === "business" ? "My Products" : "My votes"}
                </Link>
                <Link
                  href={`/${user.role}/profile`}
                  onClick={toggleDropdown}
                  className="block px-4 py-2 hover:bg-gray-200 hover:rounded-2xl text-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200  hover:rounded-2xl text-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/auth/login" className="hover:text-blue-600 p-1 shadow-md">
              Login
            </Link>
            <Link href="/auth/register" className="hover:text-blue-600 shadow-md p-1">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
