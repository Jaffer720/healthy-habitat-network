import React, {useState, useEffect} from "react";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between flex-wrap">
      {/* Left */}
      <Link href="/" className="text-xl font-bold text-white bg-blue-600 leading-5 tracking-wide p-1 px-4 rounded-br-3xl rounded-tl-3xl"><div>Healthy</div><div>Habitat</div></Link>

      {/* Center */}
      <div className="flex space-x-4 text-gray-700 text-sm md:text-base">
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 text-sm md:text-base">
        {user ? (
          <span className="text-gray-700">Hi, {user.name}</span>
        ) : (
          <>
            <Link href="/auth/login" className="hover:text-blue-600 p-1 shadow-md ">Login</Link>
            <Link href="/auth/register" className="hover:text-blue-600 shadow-md p-1 ">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
